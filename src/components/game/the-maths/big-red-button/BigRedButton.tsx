import { useGameDispatch } from '../../GameContext'
import './BigRedButton.css'

function BigRedButton() {
    const dispatch = useGameDispatch()
    const startGame = () => dispatch!({
        type: "startGame"        
    })

    return <><div id='BIGREDBUTTON' onClick={startGame}></div></>
}

export default BigRedButton