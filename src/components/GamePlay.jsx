import React, { useEffect, useState } from "react";
import { FiFastForward } from "react-icons/fi";
import { motion } from "framer-motion";
import { useInitData } from "../context/initDataContext";
import { useGame } from "../context/gameContext";
import { mmSsMsToSeconds } from "../lib/functions";
import { fadeAnimation } from "../lib/constants";
import GameButton from "./GameButton";
import GameTime from "./GameTime";
import GameLives from "./GameLives";
import GameTitle from "./GameTitle";

function GamePlay() {
  const { initData } = useInitData();
  const { audio } = useGame();
  const [buttonsData, setButtonsData] = useState(null);
  const [titleData, setTitleData] = useState(null);

  useEffect(() => {
    const buttonsTempData = {
      left_h: {
        default: "",
        actions: [],
      },
      left_l: {
        default: "",
        actions: [],
      },
      left_play: {
        default: "",
        actions: [],
      },
      left_fader: {
        default: "",
        actions: [],
      },
      right_h: {
        default: "",
        actions: [],
      },
      right_l: {
        default: "",
        actions: [],
      },
      right_play: {
        default: "",
        actions: [],
      },
      right_fader: {
        default: "",
        actions: [],
      },
    };

    const titleTempData = [];

    for (let idx in initData.default) {
      buttonsTempData[idx].default = initData.default[idx];
    }

    for (let idx in initData.actions) {
      buttonsTempData[initData.actions[idx].button].actions.push({
        time: mmSsMsToSeconds(idx),
        value: initData.actions[idx].value,
      });

      titleTempData.push({
        time: mmSsMsToSeconds(idx),
        title: initData.actions[idx].title,
      });
    }

    setButtonsData(buttonsTempData);
    setTitleData(titleTempData);
  }, []);

  useEffect(() => {
    if (buttonsData && titleData) {
      setTimeout(() => {
        if (audio) {
          audio.play();
        }
      }, 350);
    }
  }, [buttonsData, titleData]);

  return (
    <motion.div
      variants={fadeAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className="game__screen game__play-screen"
    >
      <div className="game__play-screen-header">
        <GameTime />
        <GameLives />
      </div>
      <div className="game__play-equalizer">
        <div className="game__play-equalizer-left"></div>
        <div className="game__play-equalizer-right"></div>
      </div>
      <div className="game__play-screen-title">
        <span className="game__play-screen-title-icon">
          <FiFastForward />
        </span>
        {titleData && <GameTitle data={titleData} />}
      </div>
      <div className="game__play-screen-content">
        {buttonsData && (
          <div className="game-play">
            <div className="game-play__column game-play__column_left">
              <div className="game-play__column-inner">
                <div className="game-play__column-header">
                  <div className="game-play__column-title">Left Deck</div>
                </div>
                <div className="game-play__column-content">
                  <GameButton
                    data={buttonsData.left_h}
                    type="rotate"
                    text="H"
                  />
                  <GameButton
                    data={buttonsData.left_l}
                    type="rotate"
                    text="L"
                  />
                  <GameButton data={buttonsData.left_fader} type="fader" />
                </div>
                <div className="game-play__column-footer">
                  <GameButton data={buttonsData.left_play} type="play" />
                </div>
              </div>
            </div>
            <div className="game-play__column game-play__column_right">
              <div className="game-play__column-inner">
                <div className="game-play__column-header">
                  <div className="game-play__column-title">Right Deck</div>
                </div>
                <div className="game-play__column-content">
                  <GameButton
                    data={buttonsData.right_h}
                    type="rotate"
                    text="H"
                  />
                  <GameButton
                    data={buttonsData.right_l}
                    type="rotate"
                    text="L"
                  />
                  <GameButton data={buttonsData.right_fader} type="fader" />
                </div>
                <div className="game-play__column-footer">
                  <GameButton data={buttonsData.right_play} type="play" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default GamePlay;
