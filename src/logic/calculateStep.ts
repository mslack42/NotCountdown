import { CardData } from "../data/Card";
import { SolutionStep } from "../data/SolutionStep";

export function calculateStep(step: SolutionStep): CardData {
    const card1 = step.arg1
    const card2 = step.arg2
    const compoundLevel = card1.compoundLevel + card2.compoundLevel
    let value;
    switch (step.operation) {
      case "+": {
        value = card1.value + card2.value;
        break
      }
      case "-": {
          value = card1.value - card2.value;
          break
      }
      case "*": {
          value = card1.value * card2.value;
          break
      }
      case "/": {
        value = Math.floor(card1.value / card2.value);
        break
      }
      default: {
        throw Error('invalid op');
      }
    }
    return {
      value,
      compoundLevel
    }
  }