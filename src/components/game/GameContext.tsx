import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";
import { CardData } from "../../data/Card";
import { pickTargetNumber } from "../../logic/pickTargetNumber";
import { generateNumbers } from "../../logic/generateNumbers";
import { Challenge } from "../../data/Challenge";

export interface Game {
  originalNumbers: CardData[];
  useExpertNumbers: boolean;
  challenge?: Challenge;
}

const initialGameState: Game = {
  originalNumbers: [],
  useExpertNumbers: false,
};

export type GameActionType = "selectNumbers" | "startGame" | "endGame";

export interface GameAction {
  type: GameActionType;
  numberOfLargeNumbersSelected?: number;
  startTime?: EpochTimeStamp;
}

const GameContext = createContext<Game>(initialGameState);
const GameDispatchContext = createContext<Dispatch<GameAction> | null>(null);

export function useGame() {
  return useContext(GameContext);
}

export function useGameDispatch() {
  return useContext(GameDispatchContext);
}

interface Props {
  children: ReactNode;
}

export function GameContextProvider({ children }: Props) {
  const [game, dispatch] = useReducer(gameContextReducer, initialGameState);
  return (
    <GameContext.Provider value={game}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

function gameContextReducer(game: Game, action: GameAction) {
  let changedState: Game = { ...game };
  switch (action.type) {
    case "selectNumbers": {
      changedState = {
        ...game,
        originalNumbers: generateNumbers(
          action.numberOfLargeNumbersSelected!,
          game.useExpertNumbers
        ),
      };
      break;
    }
    case "startGame": {
      const challenge = pickTargetNumber(game.originalNumbers)
      changedState = {
        ...game,
        challenge
      }
      break;
    }
    default: {
      throw Error("Unexpected error");
    }
  }
  return changedState;
}
