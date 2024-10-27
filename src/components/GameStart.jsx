import React from "react";
import { motion } from "framer-motion";
import { useGame } from "../context/gameContext";
import { fadeAnimation } from "../lib/constants";

function GameStart() {
  const { setGameStatus } = useGame();

  return (
    <motion.div
      variants={fadeAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className="game__screen game__start-screen"
    >
      <div className="game__screen-bg"></div>
      <div className="game__screen-inner">
        <div className="game__start-screen-content">
          <img src="assets/images/logo.svg" alt="" />
          <h1>
            Learn to DJ
            <br /> Step by Step️
          </h1>
          <button
            className="btn"
            onClick={() => {
              setGameStatus("levels");
            }}
          >
            Play
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default GameStart;
