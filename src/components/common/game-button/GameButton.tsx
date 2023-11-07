import './GameButton.css'

interface Props {
    children: string,
    isDisabled?: boolean,
    action?: (() => void) | undefined
}

function GameButton({isDisabled = false, action, children}: Props) {
    let className = "game-button"
    if (isDisabled) {
        className = className + ' disabled'
    }
    const onclick = !isDisabled ? action : undefined

    return <div className={className} onClick={onclick}>
        <div>{children}</div>
    </div>
}

export default GameButton