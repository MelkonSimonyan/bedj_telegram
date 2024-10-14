import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useGame } from "../context/gameContext";
import { fadeAnimation } from "../lib/constants";

function GameWin() {
  const { audio, setGameStatus } = useGame();

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
      className="game__screen game__win-screen"
    >
      <div className="game__win-screen-content">
        <div className="game__screen-image">
          <img src="assets/images/win-img.webp" alt="" />
        </div>
        <h2>WOW!</h2>
        <a href="https://bedj.io/" className="btn" target="_blank">
          BeDJ
        </a>
        <button
          className="link-btn"
          onClick={() => {
            setGameStatus("play");
          }}
        >
          Play Again
        </button>
      </div>
    </motion.div>
  );
}

export default GameWin;
