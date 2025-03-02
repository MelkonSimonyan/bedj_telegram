import React, { useEffect, useRef, useState } from "react";
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
      <div className="game__screen-bg">
        <video autoPlay={true} muted={true} loop={true} playsInline>
          <source src="assets/video/start.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="game__screen-inner">
        <div className="game__start-screen-content">
          <img src="assets/images/logo.svg" alt="" />
          <h1>
            Стань диджеем <br /> за 1 минуту
          </h1>
          <button
            className="btn"
            onClick={() => {
              setGameStatus("levels");
            }}
          >
            Начать
          </button>
        </div>
        <div className="game__start-screen-bottom">
          <img src="assets/images/headphones.svg" alt="" />
          <div>В наушниках намного лучше</div>
        </div>
      </div>
    </motion.div>
  );
}

export default GameStart;
