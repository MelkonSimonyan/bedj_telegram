import React from "react";
import { motion } from "framer-motion";
import { useGame } from "../context/gameContext";
import { fadeAnimation } from "../lib/constants";

function GameWin() {
  const { setGameStatus } = useGame();

  return (
    <motion.div
      variants={fadeAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className="game__screen game__win-screen"
    >
      <div className="game__screen-inner">
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
              setGameStatus("levels");
            }}
          >
            Play Again
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default GameWin;
