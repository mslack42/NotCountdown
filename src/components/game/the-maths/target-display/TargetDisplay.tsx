import './TargetDisplay.css'

interface Props {
    target?: number
}

function TargetDisplay({target}:Props){
    return <div className='target-display'>{target}</div>
}

export default TargetDisplay