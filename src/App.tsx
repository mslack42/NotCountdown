import "./App.css";
import { GameContextProvider } from "./components/game/GameContext";
import Game from "./components/game/Game";

function App() {
  return (
    <div className="App">
      <GameContextProvider>
      <Game></Game>
      </GameContextProvider>
    </div>
  );
}

export default App;
