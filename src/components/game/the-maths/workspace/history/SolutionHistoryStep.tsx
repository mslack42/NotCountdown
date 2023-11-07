import { SolutionStep } from "../../../../../data/SolutionStep"
import { calculateStep } from "../../../../../logic/calculateStep"
import Card from "../../../../common/card/Card"
import './SolutionHistoryStep.css'

function SolutionHistoryStep(props: SolutionStep) {
    const ans = calculateStep(props)
    return <div className='solution-row'>
        <Card data={props.arg1}></Card>
        <div className='sign'>{props.operation}</div>
        <Card data={props.arg2}></Card>
        <div className='sign'>=</div>
        <Card data={ans}></Card>
        </div>
}

export default SolutionHistoryStep