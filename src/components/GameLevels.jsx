import React, { forwardRef, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "../context/gameContext";
import { fadeAnimation } from "../lib/constants";
import { useInitData } from "../context/initDataContext";
import { MdStar } from "react-icons/md";

const GameLevelThumb = forwardRef(({ index, level }, ref) => {
  const { levelResults, setGameStatus, setCurrentLevel, totalLives } =
    useGame();
  const [isActive, setIsActive] = useState(levelResults.length >= index);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    let timeout;
    if (isClicked) {
      timeout = setTimeout(() => {
        setIsClicked(false);
      }, 500);
    }
    return () => clearTimeout(timeout);
  }, [isClicked]);

  return (
    <div
      className="game__lavel-thumb"
      ref={ref}
      onClick={() => {
        if (isActive) {
          setCurrentLevel({ index, ...level });
          setGameStatus("play");
        } else {
          setIsClicked(true);
        }
      }}
      data-active={isActive}
      data-clicked={isClicked}
    >
      <img
        className="game__lavel-image"
        src={level.image || "assets/images/level-default.jpg"}
        alt=""
      />
      <div className="game__lavel-header">
        <div className="game__lavel-title">Transition {index + 1}</div>
        <div
          className="game__lavel-name"
          dangerouslySetInnerHTML={{ __html: level.title }}
        />
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
});

function GameLevels() {
  const { initData } = useInitData();
  const { levelResults, menuAudio } = useGame();
  const parentRef = useRef(null);
  const cardRefs = useRef([]);
  const [lastActiveIndex, setLastActiveIndex] = useState(
    levelResults.length < initData.levels.length ? levelResults.length : 0
  );

  useEffect(() => {
    if (menuAudio) {
      menuAudio.loop = true;
      menuAudio.volume = 1;
      menuAudio.play();
    }
  }, [menuAudio]);

  useEffect(() => {
    if (cardRefs.current[lastActiveIndex]) {
      cardRefs.current[lastActiveIndex].scrollIntoView({
        block: "center",
      });
    }
  }, [lastActiveIndex]);

  return (
    <motion.div
      variants={fadeAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className="game__screen game__levels-screen"
    >
      <div className="game__screen-bg"></div>
      <div className="game__screen-inner" ref={parentRef}>
        <div className="game__levels-screen-content">
          {initData.levels.map((level, index) => (
            <GameLevelThumb
              level={level}
              index={index}
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default GameLevels;
