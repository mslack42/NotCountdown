import { useWorkspace } from "../WorkspaceContext"
import SolutionHistoryStep from "./SolutionHistoryStep"
import './SolutionHistory.css'

function SolutionHistory() {
    const workspace = useWorkspace()
    console.log(workspace)

    return <div className='solution-history'>{workspace.workingSolution.map((step,i) => {
        console.log(step)
        return <SolutionHistoryStep {...step} key={i}></SolutionHistoryStep>})}</div>
}

export default SolutionHistory