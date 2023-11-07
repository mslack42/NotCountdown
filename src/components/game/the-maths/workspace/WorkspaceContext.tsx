import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { CardData } from "../../../../data/Card";
import { SolutionStep } from "../../../../data/SolutionStep";
import { calculateStep } from "../../../../logic/calculateStep";
import { applyPerTurnCardChanges } from "../../../../logic/applyPerTurnCardChanges";

export interface WorkspaceState {
  currentCards: CardData[];
  originalCards: CardData[];
  selectedIndices: number[];
  workingSolution: SolutionStep[];
  workspaceLocked: boolean
}

const initialWorkspace: WorkspaceState = {
  originalCards: [],
  currentCards: [],
  selectedIndices: [],
  workingSolution: [],
  workspaceLocked: true
};

export type WorkspaceActionType =
  | "select"
  | "deselect"
  | "+"
  | "-"
  | "*"
  | "/"
  | "C"
  | "reset"
  | "solve";

export interface WorkspaceAction {
  action: WorkspaceActionType;
  selectedIndex?: number;
  cards?: CardData[];
  solution?: SolutionStep[];
}

interface Props {
  children: ReactNode;
  numbers: CardData[];
}

const WorkspaceContext = createContext<WorkspaceState>(initialWorkspace);
const WorkspaceDispatchContext =
  createContext<Dispatch<WorkspaceAction> | null>(null);

export function useWorkspace() {
  return useContext(WorkspaceContext);
}

export function useWorkspaceDispatch() {
  return useContext(WorkspaceDispatchContext);
}

export function WorkspaceContextProvider({ children, numbers }: Props) {
  const [workspace, dispatch] = useReducer(workspaceReducer, initialWorkspace);
  useEffect(() => {
    dispatch({ action: "reset", cards: numbers });
  }, [dispatch, numbers]);
  return (
    <WorkspaceContext.Provider value={workspace}>
      <WorkspaceDispatchContext.Provider value={dispatch}>
        {children}
      </WorkspaceDispatchContext.Provider>
    </WorkspaceContext.Provider>
  );
}

function workspaceReducer(
  workspace: WorkspaceState,
  dispatched: WorkspaceAction
) {
  let changedState: WorkspaceState = { ...workspace };
  switch (dispatched.action) {
    case "reset": {
      changedState = {
        ...changedState,
        originalCards: dispatched.cards ?? changedState.originalCards,
        currentCards: dispatched.cards ?? changedState.originalCards,
        workingSolution: [],
        workspaceLocked: true
      };
      break;
    }
    case "select": {
      if (changedState.selectedIndices.length < 2) {
        changedState = {
          ...changedState,
          selectedIndices: [
            ...changedState.selectedIndices,
            dispatched.selectedIndex!,
          ],
        };
      }
      break;
    }
    case "deselect": {
      changedState = {
        ...changedState,
        selectedIndices: changedState.selectedIndices.filter(
          (i) => i !== dispatched.selectedIndex!
        ),
      };
      break;
    }
    case "C": {
      changedState = {
        ...changedState,
        selectedIndices: [],
        currentCards: changedState.originalCards,
        workingSolution: [],
        workspaceLocked: false
      };
      break;
    }
    case "+":
    case "-":
    case "*":
    case "/": {
      if (changedState.selectedIndices.length === 2) {
        const selectedCards = changedState.selectedIndices.map(i => changedState.currentCards[i]).sort((a,b) => b.value - a.value)
        const newStep: SolutionStep = {
          operation: dispatched.action,
          arg1: selectedCards[0],
          arg2: selectedCards[1]
        }
        const newCard = calculateStep(newStep)
        changedState = {
          ...changedState,
          currentCards: [
            ...changedState.currentCards.filter(
              (_, i) => !changedState.selectedIndices.includes(i)
            ),
            newCard,
          ].sort((a, b) => a.value - b.value),
          selectedIndices: [],
          workingSolution: [
            ...changedState.workingSolution,
            newStep
          ]
        };
        changedState = applyPerTurnStateChanges(changedState)
      }
      break;
    }
    case 'solve' : {
      changedState = {
        ...changedState,
        workingSolution: dispatched.solution!,
        workspaceLocked: true
      }
      break;
    }
    default: {
      throw Error("unexpected action");
    }
  }

  return changedState;
}
function applyPerTurnStateChanges(changedState: WorkspaceState): WorkspaceState {
  const updatedCards = applyPerTurnCardChanges(changedState.currentCards)
  return {
    ...changedState,
    currentCards: updatedCards
  }
}

