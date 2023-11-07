import GameButton from "../../../common/game-button/GameButton";
import { useGame } from "../../GameContext";
import { useWorkspaceDispatch } from "../workspace/WorkspaceContext";

function SolveButton() {
    const game = useGame();
    const dispatch = useWorkspaceDispatch()
    const solveAction = () => {
      dispatch!({
        action: 'solve',
        solution: game.challenge?.solution
      })
    }
    return <GameButton action={solveAction}>Solve</GameButton>
}

export default SolveButton