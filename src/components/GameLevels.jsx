import React from "react";
import { motion } from "framer-motion";
import { useGame } from "../context/gameContext";
import { fadeAnimation } from "../lib/constants";
import { useInitData } from "../context/initDataContext";
import { MdStar } from "react-icons/md";

function GameLevels() {
  const { initData } = useInitData();
  const { levelResults, setGameStatus, setCurrentLevel, totalLives } =
    useGame();

  return (
    <motion.div
      variants={fadeAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className="game__screen game__levels-screen"
    >
      <div className="game__screen-bg"></div>
      <div className="game__screen-inner">
        <div className="game__levels-screen-content">
          {initData.levels.map((level, index) => {
            let active = levelResults.length >= index;

            return (
              <div
                className="game__lavel-thumb"
                key={index}
                onClick={() => {
                  if (active) {
                    setCurrentLevel({ index, ...level });
                    setGameStatus("play");
                  }
                }}
                data-active={active}
              >
                <img
                  className="game__lavel-image"
                  src={level.image || "assets/images/level-default.jpg"}
                  alt=""
                />
                <div className="game__lavel-header">
                  <div className="game__lavel-title">
                    Transition {index + 1}
                  </div>
                  <div className="game__lavel-name">{level.title}</div>
                </div>
                {levelResults[index] && (
                  <div className="game__lavel-stars">
                    <div className="lives">
                      {[...Array(totalLives)].map((e, i) => (
                        <span
                          className={`lives__item ${
                            i + 1 > levelResults[index] ? "" : "is-active"
                          }`}
                          key={i}
                        >
                          <MdStar />
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default GameLevels;
