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
        <div className="game__start-screen-bottom">
          <svg
            viewBox="0 0 23 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.5 0C6.756 0 2.875 3.857 2.875 8.571v2.858H1.437c-.38 0-.746.15-1.016.418S0 12.478 0 12.857v5.714c0 .38.151.743.421 1.01.27.268.635.419 1.016.419h2.875c.382 0 .747-.15 1.017-.418.27-.268.421-.632.421-1.01v-10c0-3.172 2.559-5.715 5.75-5.715s5.75 2.543 5.75 5.714v10c0 .38.151.743.421 1.01.27.268.635.419 1.017.419h2.875c.38 0 .746-.15 1.016-.418s.421-.632.421-1.01v-5.715c0-.379-.151-.742-.421-1.01a1.442 1.442 0 0 0-1.017-.418h-1.437V8.57C20.125 3.857 16.244 0 11.5 0Z" />
          </svg>
          <div>Much Better with Headphones</div>
        </div>
      </div>
    </motion.div>
  );
}

export default GameStart;
