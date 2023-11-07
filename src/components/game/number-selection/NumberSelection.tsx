import {
  useNumberSelection,
  useNumberSelectionDispatch,
} from "./NumberSelectionContext";
import CardShelf from "./card-shelf/CardShelf";
import ConfirmSelection from "./confirm-selection/ConfirmSelection";
import "./NumberSelection.css";
import AdditionalParams from "./additional-params/AdditionalParams";

function NumberSelection() {
  const numberSelection = useNumberSelection();
  const dispatch = useNumberSelectionDispatch();
  const largeNumberProps = {
    cardCount: 4,
    selectDispatch: (index: number) =>
      dispatch!({ type: "selectLarge", index }),
    deselectDispatch: (index: number) =>
      dispatch!({ type: "deselectLarge", index }),
    selectedIndices: numberSelection?.selectedLargeNumberIndices as number[],
    newCardsSelectable: !numberSelection.hasCompleteSelection,
  };
  const smallNumberProps = {
    cardCount: 20,
    selectDispatch: (index: number) =>
      dispatch!({ type: "selectSmall", index }),
    deselectDispatch: (index: number) =>
      dispatch!({ type: "deselectSmall", index }),
    selectedIndices: numberSelection?.selectedSmallNumberIndices as number[],
    newCardsSelectable: !numberSelection.hasCompleteSelection,
  };

  return (
    <div className="number-config">
      <div className="shelves">
        <hr className="shelf-divider"></hr>
        <CardShelf {...largeNumberProps}></CardShelf>
        <hr className="shelf-divider"></hr>
        <CardShelf {...smallNumberProps}></CardShelf>
        <hr className="shelf-divider"></hr>
      </div>
      <ConfirmSelection></ConfirmSelection>
      <hr className="config-divider"></hr>
      <AdditionalParams></AdditionalParams>
    </div>
  );
}

export default NumberSelection;
