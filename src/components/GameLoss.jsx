import React from "react";
import { motion } from "framer-motion";
import { useGame } from "../context/gameContext";
import { fadeAnimation } from "../lib/constants";

function GameLoss() {
  const { setGameStatus } = useGame();

  return (
    <motion.div
      variants={fadeAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className="game__screen game__loss-screen"
    >
      <div className="game__screen-inner">
        <div className="game__loss-screen-content">
          <div className="game__screen-image">
            <img src="assets/images/loss-img.gif" alt="" />
          </div>
          <h2>Don't Worry</h2>
          <button
            className="btn"
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

export default GameLoss;
