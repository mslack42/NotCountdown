import GameButton from "../../../common/game-button/GameButton";
import { useGameDispatch } from "../../GameContext";
import {
  NumbersSelection,
  useNumberSelection,
} from "../NumberSelectionContext";
import "./ConfirmSelection.css";

function ConfirmSelection() {
  const numberSelection = useNumberSelection();
  const currentRequest = determineRequest(numberSelection);

  const gameDispatch = useGameDispatch();
  const submitNumbers = () =>
    gameDispatch!({
      type: "selectNumbers",
      numberOfLargeNumbersSelected:
        numberSelection.selectedLargeNumberIndices.length,
    });

  return (
    <div className="selection-bar">
      <div className="selection-confirmation">
        <div className="ask-nicely">{currentRequest}</div>
        <GameButton
          isDisabled={!numberSelection.hasCompleteSelection}
          action={submitNumbers}
        >
          Thank you, Carol
        </GameButton>
      </div>
    </div>
  );
}

function determineRequest(state: NumbersSelection) {
  if (!state.hasCompleteSelection) {
    return '"um..."';
  }
  const large = state.selectedLargeNumberIndices.length;
  const small = state.selectedSmallNumberIndices.length;
  if (state.selectedLargeNumberIndices.length === 0) {
    return '"6 small ones please!';
  }
  return `${large} off the top, and ${small} from anywhere else please!`;
}

export default ConfirmSelection;
