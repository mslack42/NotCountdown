import { useGame } from "../GameContext";
import BigRedButton from "./big-red-button/BigRedButton";
import TargetDisplay from "./target-display/TargetDisplay";
import Workspace from "./workspace/Workspace";
import { WorkspaceContextProvider } from "./workspace/WorkspaceContext";
import "./TheMaths.css";
import SolveButton from "./solve-button/Solvebutton";

function TheMaths() {
  const game = useGame();


  return (
    <div className="the-maths">
        <WorkspaceContextProvider numbers={game.originalNumbers}>
      <div>
        <div className="gen-machine">
          <SolveButton></SolveButton>
          <TargetDisplay target={game.challenge?.target}></TargetDisplay>
          <BigRedButton></BigRedButton>
        </div>
      </div>
      <div className="workspace-inputs">
          <Workspace isActive={!!game.challenge?.target}></Workspace>
      </div>
        </WorkspaceContextProvider>
    </div>
  );
}

export default TheMaths;
