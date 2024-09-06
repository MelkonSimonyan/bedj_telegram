import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useGame } from "../context/gameContext";
import { fadeAnimation } from "../lib/constants";

function GameFinish() {
  const { audio, gameStatus, setGameStatus } = useGame();

  useEffect(() => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  return (
    <motion.div
      variants={fadeAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className="game__screen game__finish-screen"
    >
      <div className="game__finish-screen-content">
        {gameStatus === "complete" && (
          <>
            <h2>WOW!</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <a href="https://bedj.io/" className="btn" target="_blank">
              BeDj
            </a>
            <button
              className="link-btn"
              onClick={() => {
                setGameStatus("play");
              }}
            >
              Play Again
            </button>
          </>
        )}

        {gameStatus === "finish" && (
          <>
            <h2>Don't Worry</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <button
              className="btn"
              onClick={() => {
                setGameStatus("play");
              }}
            >
              Play Again
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default GameFinish;
