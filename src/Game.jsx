import { useEffect, useRef } from "react";
import { useInitData } from "./context/initDataContext";
import { useGame } from "./context/gameContext";
import GameStart from "./components/GameStart";
import GamePlay from "./components/GamePlay";
import GameLoss from "./components/GameLoss";
import GameWin from "./components/GameWin";
import { AnimatePresence } from "framer-motion";

function Game() {
  const audioRef = useRef(null);
  const { initData } = useInitData();
  const {
    audio,
    setAudio,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    gameStatus,
    setGameStatus,
    totalLives,
    setTotalLives,
    lives,
    setLives,
  } = useGame();

  useEffect(() => {
    audioRef.current = new Audio(initData.audio);
    setAudio(audioRef.current);
  }, []);

  useEffect(() => {
    if (audio) {
      const updateDuration = () => {
        setDuration(audio.duration);
      };

      const updateCurrentTime = () => {
        setCurrentTime(audio.currentTime);
      };

      const startGame = () => {
        setGameStatus("play");
      };

      const endGame = () => {
        setGameStatus("win");
      };

      audio.addEventListener("loadedmetadata", updateDuration);
      audio.addEventListener("timeupdate", updateCurrentTime);
      audio.addEventListener("play", startGame);
      audio.addEventListener("ended", endGame);

      return () => {
        audio.removeEventListener("loadedmetadata", updateDuration);
        audio.removeEventListener("timeupdate", updateCurrentTime);
        audio.removeEventListener("play", startGame);
        audio.removeEventListener("ended", endGame);
      };
    }
  }, [audio]);

  useEffect(() => {
    if (lives <= 0) {
      setTimeout(() => {
        setGameStatus("loss");
      }, 500);
    }
  }, [lives]);

  useEffect(() => {
    if (gameStatus === "play" && lives !== totalLives) {
      setLives(totalLives);
    }
  }, [gameStatus]);

  return (
    <div className="game">
      <AnimatePresence>
        {gameStatus === "start" && <GameStart key="GameStart" />}

        {gameStatus === "play" && <GamePlay key="GamePlay" />}

        {gameStatus === "loss" && <GameLoss key="GameLoss" />}

        {gameStatus === "win" && <GameWin key="GameWin" />}
      </AnimatePresence>
    </div>
  );
}

export default Game;
