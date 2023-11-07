import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

export interface NumbersSelection {
  selectedLargeNumberIndices: number[];
  selectedSmallNumberIndices: number[];
  hasCompleteSelection: boolean;
}

const initialNumberSelection: NumbersSelection = {
  selectedLargeNumberIndices: [],
  selectedSmallNumberIndices: [],
  hasCompleteSelection: false,
};

export type NumberSelectionActionType =
  | "selectLarge"
  | "selectSmall"
  | "deselectLarge"
  | "deselectSmall";

export interface NumberSelectionAction {
  type: NumberSelectionActionType;
  index: number;
}

const NumberSelectionContext = createContext<NumbersSelection>(
  initialNumberSelection
);
const NumberSelectionDispatchContext =
  createContext<Dispatch<NumberSelectionAction> | null>(null);

interface Props {
  children: ReactNode;
}

export function useNumberSelection() {
  return useContext(NumberSelectionContext);
}

export function useNumberSelectionDispatch() {
  return useContext(NumberSelectionDispatchContext);
}

export function NumberSelectionProvider({ children }: Props) {
  const [numberSelection, dispatch] = useReducer(
    numberSelectionReducer,
    initialNumberSelection
  );

  return (
    <NumberSelectionContext.Provider value={numberSelection}>
      <NumberSelectionDispatchContext.Provider value={dispatch}>
        {children}
      </NumberSelectionDispatchContext.Provider>
    </NumberSelectionContext.Provider>
  );
}

function numberSelectionReducer(
  numberSelection: NumbersSelection,
  { type, index }: NumberSelectionAction
) {
  let changedState: NumbersSelection;
  switch (type) {
    case "selectLarge":
    case "selectSmall": {
      // Guard against too many indices selected
      if (numberSelection.hasCompleteSelection) {
        changedState = { ...numberSelection };
        break;
      }
      switch (type) {
        case "selectLarge": {
          changedState = {
            ...numberSelection,
            selectedLargeNumberIndices: [
              ...numberSelection.selectedLargeNumberIndices,
              index,
            ],
          };
          break;
        }
        case "selectSmall": {
          changedState = {
            ...numberSelection,
            selectedSmallNumberIndices: [
              ...numberSelection.selectedSmallNumberIndices,
              index,
            ],
          };
          break;
        }
        default: {
          throw Error("Unexpected error");
        }
      }
      break;
    }
    case "deselectLarge": {
      changedState = {
        ...numberSelection,
        selectedLargeNumberIndices:
          numberSelection.selectedLargeNumberIndices.filter(
            (ns) => ns !== index
          ),
      };
      break;
    }
    case "deselectSmall": {
      changedState = {
        ...numberSelection,
        selectedSmallNumberIndices:
          numberSelection.selectedSmallNumberIndices.filter(
            (ns) => ns !== index
          ),
      };
      break;
    }
    default: {
      throw Error("Unknown action " + type);
    }
  }
  return applyDeducedStateCalculations(changedState);
}

function applyDeducedStateCalculations(state: NumbersSelection) {
  return {
    ...state,
    hasCompleteSelection:
      state.selectedLargeNumberIndices.length +
        state.selectedSmallNumberIndices.length >=
      6,
  };
}
