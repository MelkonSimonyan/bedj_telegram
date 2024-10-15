import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [audio, setAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [totalLives, setTotalLives] = useState(3);
  const [lives, setLives] = useState(totalLives);
  const [gameStatus, setGameStatus] = useState("play");

  return (
    <GameContext.Provider
      value={{
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
