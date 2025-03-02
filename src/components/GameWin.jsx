import React from "react";
import { motion } from "framer-motion";
import { useGame } from "../context/gameContext";
import { fadeAnimation } from "../lib/constants";
import { useInitData } from "../context/initDataContext";

function GameWin() {
  const { initData } = useInitData();
  const { setGameStatus, levelResults } = useGame();

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
          <button
            className="btn"
            onClick={() => {
              setGameStatus("levels");
            }}
          >
            Дальше
          </button>
          {/*levelResults.length == initData.levels.length && (
            <a href="https://bedj.io/" className="link-btn" target="_blank">
              BeDJ
            </a>
          )*/}
        </div>
      </div>
    </motion.div>
  );
}

export default GameWin;
