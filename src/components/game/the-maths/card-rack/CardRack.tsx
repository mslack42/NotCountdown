import { CardData } from "../../../../data/Card";
import Card from "../../../common/card/Card";
import {
  useWorkspace,
  useWorkspaceDispatch,
} from "../workspace/WorkspaceContext";
import "./CardRack.css";

interface Props {
  disabled?: boolean
}

function CardRack({disabled} : Props) {
  const workspace = useWorkspace();
  const workspaceDispatch = useWorkspaceDispatch();

  function displayCardFromData(data: CardData, index: number) {
    const isSelected = workspace.selectedIndices.includes(index);
    const isSelectable = !disabled && ( isSelected || workspace.selectedIndices.length < 2 ); 
    const onClick = !isSelectable
      ? undefined
      : () =>
          workspaceDispatch!({ action: isSelected ? "deselect" : "select", selectedIndex: index });
    return (
      <Card
        key={index}
        data={data}
        isSelected={isSelected}
        isSelectable={isSelectable}
        onClick={onClick}
      ></Card>
    );
  }

  return (
    <div className="card-rack-wrapper">
    <div className="card-rack">
      {workspace.currentCards.map((c, i) => displayCardFromData(c, i))}
    </div>
    </div>
  );
}

export default CardRack;
