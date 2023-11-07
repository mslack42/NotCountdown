import Card from "../../../common/card/Card";
import "./CardShelf.css";

interface Props {
  cardCount: number;
  selectDispatch: (index: number) => void;
  deselectDispatch: (index: number) => void;
  selectedIndices: number[];
  newCardsSelectable: boolean;
}

function CardShelf({
  cardCount,
  selectDispatch,
  deselectDispatch,
  selectedIndices,
  newCardsSelectable
}: Props) {
  function handleClick(index: number) {
    if (selectedIndices.includes(index)) {
      deselectDispatch(index);
    } else {
      selectDispatch(index);
    }
  }

  return (
    <div className="card-shelf">
      {Array(cardCount)
        .fill(null)
        .map((_, index) => {
          return (
            <Card
              key={index}
              onClick={() => handleClick(index)}
              isSelected={selectedIndices?.includes(index)}
              isSelectable={selectedIndices?.includes(index) || newCardsSelectable}
              isFaceDown={true}
            ></Card>
          );
        })}
    </div>
  );
}

export default CardShelf;
