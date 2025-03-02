import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [levelResults, setLevelResults] = useState(
    localStorage.getItem("levelResults")
      ? JSON.parse(localStorage.getItem("levelResults"))
      : []
  );
  const [currentLevel, setCurrentLevel] = useState({});
  const [gameStatus, setGameStatus] = useState("start");
  const [totalLives, setTotalLives] = useState(3);
  const [menuAudio, setMenuAudio] = useState(null);
  const [helpTooltipsVisible, setHelpTooltipsVisible] = useState(false);
  const [helpScreensVisible, setHelpScreensVisible] = useState(false);
  const [helpScreenIndex, setHelpScreenIndex] = useState(0);

  return (
    <GameContext.Provider
      value={{
        levelResults,
        setLevelResults,
        currentLevel,
        setCurrentLevel,
        gameStatus,
        setGameStatus,
        totalLives,
        menuAudio,
        setMenuAudio,
        helpTooltipsVisible,
        setHelpTooltipsVisible,
        helpScreensVisible,
        setHelpScreensVisible,
        helpScreenIndex,
        setHelpScreenIndex,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
