import CardRack from "../card-rack/CardRack";
import { useWorkspace, useWorkspaceDispatch } from "./WorkspaceContext";
import SolutionHistory from "./history/SolutionHistory";
import Operations, { OperationsPayload } from "./operations/Operations";
import './Workspace.css'

interface Props {
  isActive?: boolean
}

function Workspace({isActive}: Props) {
  const workspace = useWorkspace();
  const workspaceDispatch = useWorkspaceDispatch();
  const args = workspace.selectedIndices.map(
    (ind) => workspace.currentCards[ind].value
  );

  const onOperation = (opPayload: OperationsPayload) => {
    workspaceDispatch!({
      action: opPayload.action,
    });
  };

  return (
    <div className="workspace">
      {isActive && (
        <>
          <SolutionHistory></SolutionHistory>
          <Operations onOperation={onOperation} opArgs={args}></Operations>
        </>
      )}
      <CardRack disabled={!isActive || workspace.workspaceLocked}></CardRack>
    </div>
  );
}

export default Workspace;
