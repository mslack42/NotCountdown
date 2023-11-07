import { useGame } from "./GameContext";
import NumberSelection from "./number-selection/NumberSelection";
import { NumberSelectionProvider } from "./number-selection/NumberSelectionContext";
import TheMaths from "./the-maths/TheMaths";

function Game() {
  const game = useGame();
  const isPickingNumbers = game.originalNumbers.length === 0;

  return (
    <>
      {isPickingNumbers && (
        <NumberSelectionProvider>
          <NumberSelection></NumberSelection>
        </NumberSelectionProvider>
      )}
      {!isPickingNumbers && (
        <TheMaths></TheMaths>
      )}
    </>
  );
}

export default Game;
