import React, { useEffect, useRef, useState } from "react";
import { FiFastForward } from "react-icons/fi";
import { motion } from "framer-motion";
import { useGame } from "../context/gameContext";
import { mmSsMsToSeconds } from "../lib/functions";
import { fadeAnimation } from "../lib/constants";
import GameButton from "./GameButton";
import GameTime from "./GameTime";
import GameLives from "./GameLives";
import GameTitle from "./GameTitle";

function GamePlay() {
  const {
    setLevelResults,
    setGameStatus,
    currentLevel,
    totalLives,
    menuAudio,
  } = useGame();
  const audioRef = useRef(null);
  const [audio, setAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lives, setLives] = useState(totalLives);
  const livesRef = useRef(lives);
  const [buttonsData, setButtonsData] = useState(null);
  const [titleData, setTitleData] = useState(null);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [helpVisible, setHelpVisible] = useState(currentLevel.index == 0);
  const [timerVisible, setTimerVisible] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

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

    for (let idx in currentLevel.default) {
      buttonsTempData[idx].default = currentLevel.default[idx];
    }

    for (let idx in currentLevel.actions) {
      buttonsTempData[currentLevel.actions[idx].button].actions.push({
        time: mmSsMsToSeconds(idx),
        value: currentLevel.actions[idx].value,
      });

      titleTempData.push({
        time: mmSsMsToSeconds(idx),
        title: currentLevel.actions[idx].title,
      });
    }

    setButtonsData(buttonsTempData);
    setTitleData(titleTempData);
  }, []);

  useEffect(() => {
    let interval;
    if (menuAudio) {
      interval = setInterval(() => {
        if (menuAudio.volume >= 0.075) {
          menuAudio.volume -= 0.075;
        } else {
          clearInterval(interval);
        }
      }, 100);
    }

    let timeout = setTimeout(() => {
      setLoaderVisible(false);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (currentLevel.audio) {
      audioRef.current = new Audio(currentLevel.audio);
      setAudio(audioRef.current);
    }
  }, [currentLevel]);

  useEffect(() => {
    if (audio) {
      const updateDuration = () => {
        setDuration(audio.duration);
      };

      const updateCurrentTime = () => {
        setCurrentTime(audio.currentTime);
      };

      const startGame = () => {
        setGameStatus("play");
      };

      const endGame = () => {
        setLevelResults((levelResults) => {
          levelResults[currentLevel.index] = livesRef.current;
          localStorage.setItem("levelResults", JSON.stringify(levelResults));
          return levelResults;
        });
        setGameStatus("win");
      };

      audio.addEventListener("loadedmetadata", updateDuration);
      audio.addEventListener("timeupdate", updateCurrentTime);
      audio.addEventListener("play", startGame);
      audio.addEventListener("ended", endGame);

      return () => {
        audio.removeEventListener("loadedmetadata", updateDuration);
        audio.removeEventListener("timeupdate", updateCurrentTime);
        audio.removeEventListener("play", startGame);
        audio.removeEventListener("ended", endGame);
      };
    }
  }, [audio]);

  useEffect(() => {
    livesRef.current = lives;
    if (lives <= 0 && currentLevel.index != 0) {
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
        setGameStatus("loss");
      }, 500);
    }
  }, [lives]);

  useEffect(() => {
    if (
      buttonsData &&
      titleData &&
      duration &&
      !loaderVisible &&
      audio &&
      !ready
    ) {
      if (menuAudio) {
        menuAudio.pause();
        menuAudio.currentTime = 0;
      }

      setReady(true);
    }
  }, [buttonsData, titleData, duration, loaderVisible, audio]);

  useEffect(() => {
    if (ready) {
      setTimeout(() => {
        audio.play();
      }, 500);
    }
  }, [ready]);

  useEffect(() => {
    console.log(timerVisible);
  }, [timerVisible]);

  return (
    <motion.div
      variants={fadeAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className="game__screen game__play-screen"
      data-ready={ready}
    >
      {!helpVisible && (
        <div className="game__play-screen-loader">
          <div className="game__play-screen-loader-circle">
            <img src="assets/images/loader-circle.svg" alt="" />
          </div>
          <div className="game__play-screen-loader-content">
            <div className="game__play-screen-loader-icon-0">
              <img src="assets/images/loader-icon-0.svg" alt="" />
            </div>
            <div className="game__play-screen-loader-title">
              Mix tracks
              <br /> as top DJs do
            </div>
            <div className="game__play-screen-loader-icon-1">
              <img src="assets/images/loader-icon-1.svg" alt="" />
              <img src="assets/images/loader-icon-1.svg" alt="" />
            </div>
            <div className="game__play-screen-loader-icon-2">
              <img src="assets/images/loader-icon-2.svg" alt="" />
            </div>
          </div>
        </div>
      )}

      <div className="game__play-screen-header">
        <GameTime currentTime={currentTime} duration={duration} />
        <GameLives lives={lives} />
      </div>

      <div className="game__play-equalizer">
        <div className="game__play-equalizer-left"></div>
        <div className="game__play-equalizer-right"></div>
      </div>

      <div className="game__play-screen-title">
        <span className="game__play-screen-title-icon">
          <FiFastForward />
        </span>
        {titleData && <GameTitle data={titleData} currentTime={currentTime} />}
      </div>

      {helpVisible && (
        <div className="play-help-bg">
          {!timerVisible.find((item) => item) && (
            <div className="play-help-bg__content">
              <div className="play-help-bg__icon-1">
                <img src="assets/images/loader-icon-1.svg" alt="" />
              </div>
              <div className="play-help-bg__icon-2">
                <img src="assets/images/loader-icon-3.svg" alt="" />
              </div>
              <div className="play-help-bg__icon-3">
                <img src="assets/images/loader-icon-4.svg" alt="" />
              </div>
              <div className="play-help-bg__title">
                Follow
                <br /> the prompts
              </div>
            </div>
          )}
        </div>
      )}

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
                    currentTime={currentTime}
                    setLives={setLives}
                    data={buttonsData.left_h}
                    type="rotate"
                    text="H"
                    id="0"
                    setParentTimerVisible={setTimerVisible}
                  />
                  <GameButton
                    currentTime={currentTime}
                    setLives={setLives}
                    data={buttonsData.left_l}
                    type="rotate"
                    text="L"
                    id="1"
                    setParentTimerVisible={setTimerVisible}
                  />
                  <GameButton
                    currentTime={currentTime}
                    setLives={setLives}
                    data={buttonsData.left_fader}
                    type="fader"
                    id="2"
                    setParentTimerVisible={setTimerVisible}
                  />
                </div>
                <div className="game-play__column-footer">
                  <GameButton
                    currentTime={currentTime}
                    setLives={setLives}
                    data={buttonsData.left_play}
                    type="play"
                    id="3"
                    setParentTimerVisible={setTimerVisible}
                  />
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
                    currentTime={currentTime}
                    setLives={setLives}
                    data={buttonsData.right_h}
                    type="rotate"
                    text="H"
                    id="4"
                    setParentTimerVisible={setTimerVisible}
                  />
                  <GameButton
                    currentTime={currentTime}
                    setLives={setLives}
                    data={buttonsData.right_l}
                    type="rotate"
                    text="L"
                    id="5"
                    setParentTimerVisible={setTimerVisible}
                  />
                  <GameButton
                    currentTime={currentTime}
                    setLives={setLives}
                    data={buttonsData.right_fader}
                    type="fader"
                    id="6"
                    setParentTimerVisible={setTimerVisible}
                  />
                </div>
                <div className="game-play__column-footer">
                  <GameButton
                    currentTime={currentTime}
                    setLives={setLives}
                    data={buttonsData.right_play}
                    type="play"
                    id="7"
                    setParentTimerVisible={setTimerVisible}
                  />
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
