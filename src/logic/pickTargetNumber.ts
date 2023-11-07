import { CardData } from "../data/Card";
import { Challenge } from "../data/Challenge";
import { SolutionStep } from "../data/SolutionStep";
import { applyPerTurnCardChanges } from "./applyPerTurnCardChanges";
import { calculateStep } from "./calculateStep";

type PotentialSolutionMap = Map<number, PotentialSolution>;

export function pickTargetNumber(cards: CardData[]): Challenge {
  let collectedSolutionsMap = new Map<number, PotentialSolution>();
  // If 100 is a card, then we have a 0-step solution
  cards.forEach((c) => {
    if (c.value === 100) {
      collectedSolutionsMap.set(100, {
        stepsTaken: [],
        estimatedDifficulty: 0,
        nextCards: [...cards],
      });
    }
  });
  // Now a recursive collection of all numbers 100 - 999 that we can legally reach
  searchForSolutions(collectedSolutionsMap, cards, []);

  // Map is now populated - pull out those values that take the most steps to reach, favouring 'harder' steps
  const hardestAnswersFirst = Array.from(collectedSolutionsMap.values())
    .sort((a, b) => a.estimatedDifficulty - b.estimatedDifficulty)
    .reverse();
  const hardestDifficulty = hardestAnswersFirst[0].estimatedDifficulty;
  // Adjusting the wriggle-room to allow for sets where you don't _have_ to use every number
  const hardestAnswers = hardestAnswersFirst.filter(
    (a) => a.estimatedDifficulty > hardestDifficulty - 1.5
  ); // wriggle-room - want multiple candidate targets
  const pickedTarget =
    hardestAnswers[Math.floor(Math.random() * hardestAnswers.length)];

  return {
    target: pickedTarget.latestValue!,
    solution: pickedTarget.stepsTaken!,
  };
}

interface PotentialSolution {
  stepsTaken?: SolutionStep[];
  estimatedDifficulty: number;
  nextCards: CardData[];
  latestValue?: number;
}

function buildNextSteps(
  arg1: CardData,
  arg2: CardData
): [SolutionStep, number][] {
  if (arg2.value > arg1.value) {
    return buildNextSteps(arg2, arg1);
  }
  let res: [SolutionStep, number][] = [];
  if (arg1.value + arg2.value < 1000) {
    const step: SolutionStep = {
      operation: "+",
      arg1,
      arg2,
    };
    res.push([step, calculateStep(step).value]);
  }
  if (arg1.value - arg2.value > 0) {
    const step: SolutionStep = {
      operation: "-",
      arg1,
      arg2,
    };
    res.push([step, calculateStep(step).value]);
  }
  if (arg1.value * arg2.value < 1000) {
    const step: SolutionStep = {
      operation: "*",
      arg1,
      arg2,
    };
    res.push([step, calculateStep(step).value]);
  }
  if (arg1.value % arg2.value === 0) {
    const step: SolutionStep = {
      operation: "/",
      arg1,
      arg2,
    };
    res.push([step, calculateStep(step).value]);
  }

  return res;
}

function buildNextPotentialSolutions(
  arg1: CardData,
  arg2: CardData,
  others: CardData[],
  stepsSoFar: SolutionStep[]
): PotentialSolution[] {
  const newCompoundLvl = arg1.compoundLevel + arg2.compoundLevel;
  const nextSolutions = buildNextSteps(arg1, arg2).map((pair) => {
    const [newStep, newVal] = pair;
    const stepsTaken: SolutionStep[] = [...stepsSoFar, newStep];
    const estimatedDifficulty = estimateSolutionDifficulty(stepsTaken);
    const nextCards: CardData[] = applyPerTurnCardChanges([
      ...others,
      {
        value: newVal,
        compoundLevel: newCompoundLvl,
      },
    ])
      .sort((a, b) => a.value - b.value)
      .reverse();
    return {
      estimatedDifficulty,
      nextCards,
      stepsTaken,
      latestValue: newVal,
    };
  });
  return nextSolutions;
}

function searchForSolutions(
  map: PotentialSolutionMap,
  cards: CardData[],
  solutionSteps: SolutionStep[]
) {
  if (cards.length < 2) {
    return;
  }
  for (let i = 0; i < cards.length - 1; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      const arg1 = cards[i];
      const arg2 = cards[j];
      let others = [...cards];
      others.splice(j, 1);
      others.splice(i, 1);
      const nextSteps = buildNextPotentialSolutions(
        arg1,
        arg2,
        others,
        solutionSteps
      );
      for (const sol of nextSteps) {
        const newVal = sol.latestValue!;
        if (100 <= newVal && newVal <= 999) {
          const currentMapVal = map.get(newVal);
          if (
            !currentMapVal ||
            currentMapVal.estimatedDifficulty > sol.estimatedDifficulty
          ) {
            map.set(newVal, sol);
          }
        }
        searchForSolutions(map, sol.nextCards, sol.stepsTaken!);
      }
    }
  }
}

function estimateSolutionDifficulty(steps: SolutionStep[]): number {
  return steps
    .map((s) => estimateOperationDifficulty(s))
    .reduce((s, v) => s + v, 0);
}

function estimateOperationDifficulty(step: SolutionStep) {
  switch (step.operation) {
    case "+": {
      return 1;
    }
    case "-": {
      return 1.1;
    }
    case "*": {
      if (step.arg1.value % 10 === 0 || step.arg2.value % 10 === 0) {
        return 1;
      } else {
        return 1.4;
      }
    }
    case "/": {
      if (step.arg1.value % 10 === 0) {
        return 1;
      } else {
        return 1.8;
      }
    }
  }
}
