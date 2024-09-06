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
      <div className="game__start-screen-content">
        <img src="assets/images/logo.svg" alt="" />
        <h1>
          Learn to DJ
          <br /> Step by Step️
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <button
          className="btn"
          onClick={() => {
            setGameStatus("play");
          }}
        >
          Play
        </button>
      </div>
    </motion.div>
  );
}

export default GameStart;
