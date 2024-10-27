import { useGame } from "./context/gameContext";
import { AnimatePresence } from "framer-motion";
import GameStart from "./components/GameStart";
import GameLevels from "./components/GameLevels";
import GamePlay from "./components/GamePlay";
import GameLoss from "./components/GameLoss";
import GameWin from "./components/GameWin";

function Game() {
  const { gameStatus } = useGame();

  return (
    <div className="game">
      <AnimatePresence>
        {gameStatus === "start" && <GameStart key="GameStart" />}

        {gameStatus === "levels" && <GameLevels key="GameLevels" />}

        {gameStatus === "play" && <GamePlay key="GamePlay" />}

        {gameStatus === "loss" && <GameLoss key="GameLoss" />}

        {gameStatus === "win" && <GameWin key="GameWin" />}
      </AnimatePresence>
    </div>
  );
}

export default Game;
