import { CardData } from "../../../data/Card";
import "./Card.css";

interface Props {
  data?: CardData;
  isSelectable?: boolean;
  isSelected?: boolean;
  isFaceDown?: boolean;
  onClick?: () => void;
  compoundLevel?: number;
}

const supportedCompoundLevels = [1, 2, 3, 4, 5, 6];

function Card({
  isSelected,
  isSelectable,
  isFaceDown,
  onClick,
  data,
}: Props) {
  const compoundLevel = data?.compoundLevel
  const className = [
    "card",
    isSelected ? "selected" : null,
    isSelectable ? "selectable" : null,
    compoundLevel && supportedCompoundLevels.includes(compoundLevel)
      ? `compound-${compoundLevel}`
      : null,
  ]
    .filter((cl) => cl != null)
    .join(" ");

  return (
    <div className={className} onClick={onClick ?? undefined}>
      {!isFaceDown && <div className="card-value">{data?.value}</div>}
    </div>
  );
}

export default Card;
