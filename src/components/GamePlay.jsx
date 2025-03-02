import React, { useEffect, useRef, useState } from "react";
import { FiFastForward } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useGame } from "../context/gameContext";
import { mmSsMsToSeconds } from "../lib/functions";
import { fadeAnimation } from "../lib/constants";
import GameButton from "./GameButton";
import GameTime from "./GameTime";
import GameLives from "./GameLives";
import GameTitle from "./GameTitle";
import GameHelpScreens from "./GameHelpScreens";
import GamePlayLoader from "./GamePlayLoader";
import GameHelpBg from "./GameHelpBg";

function GameTooltip({ tooltip, setTooltip }) {
  const [tooltipText, setTooltipText] = useState("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (tooltip) {
      setTooltipText(tooltip);

      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setTooltip(null);
      }, 2000);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [tooltip, setTooltip]);

  return (
    <div className={`game-tooltip ${tooltip ? "is-visible" : ""}`}>
      <span>{tooltipText}</span>
    </div>
  );
}

function GamePlay() {
  const {
    setLevelResults,
    setGameStatus,
    currentLevel,
    totalLives,
    menuAudio,
    helpTooltipsVisible,
    setHelpTooltipsVisible,
    helpScreensVisible,
    setHelpScreensVisible,
    setHelpScreenIndex,
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
  const [tooltip, setTooltip] = useState(null);
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
    if (currentLevel.index == 0) {
      setHelpTooltipsVisible(true);
      setHelpScreensVisible(true);
      setHelpScreenIndex(1);
    } else {
      setHelpTooltipsVisible(false);
      setHelpScreensVisible(false);
      setHelpScreenIndex(0);
    }

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
        tooltip: currentLevel.actions[idx].tooltip,
      });

      titleTempData.push({
        time: mmSsMsToSeconds(idx),
        title: currentLevel.actions[idx].title,
      });
    }

    setButtonsData(buttonsTempData);
    setTitleData(titleTempData);

    let interval;
    if (menuAudio) {
      interval = setInterval(() => {
        if (menuAudio.volume >= 0.075) {
          menuAudio.volume -= 0.075;
        } else {
          menuAudio.volume = 0;
          clearInterval(interval);
        }
      }, 100);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!helpScreensVisible) {
      let timeout = setTimeout(() => {
        setLoaderVisible(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [helpScreensVisible]);

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

  return (
    <motion.div
      variants={fadeAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className="game__screen game__play-screen"
      data-ready={ready}
    >
      {helpTooltipsVisible ? (
        <>
          <AnimatePresence>
            {helpScreensVisible && <GameHelpScreens />}
          </AnimatePresence>

          {!helpScreensVisible && <GameHelpBg timerVisible={timerVisible} />}
        </>
      ) : (
        <AnimatePresence>{!ready && <GamePlayLoader />}</AnimatePresence>
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
        {titleData && <GameTitle data={titleData} currentTime={currentTime} />}
      </div>

      <div className="game__play-screen-content">
        {buttonsData && (
          <div className="game-play">
            <GameTooltip tooltip={tooltip} setTooltip={setTooltip} />

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
                    setParentTooltip={setTooltip}
                  />
                  <GameButton
                    currentTime={currentTime}
                    setLives={setLives}
                    data={buttonsData.left_l}
                    type="rotate"
                    text="L"
                    id="1"
                    setParentTimerVisible={setTimerVisible}
                    setParentTooltip={setTooltip}
                  />
                  <GameButton
                    currentTime={currentTime}
                    setLives={setLives}
                    data={buttonsData.left_fader}
                    type="fader"
                    id="2"
                    setParentTimerVisible={setTimerVisible}
                    setParentTooltip={setTooltip}
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
                    setParentTooltip={setTooltip}
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
                    setParentTooltip={setTooltip}
                  />
                  <GameButton
                    currentTime={currentTime}
                    setLives={setLives}
                    data={buttonsData.right_l}
                    type="rotate"
                    text="L"
                    id="5"
                    setParentTimerVisible={setTimerVisible}
                    setParentTooltip={setTooltip}
                  />
                  <GameButton
                    currentTime={currentTime}
                    setLives={setLives}
                    data={buttonsData.right_fader}
                    type="fader"
                    id="6"
                    setParentTimerVisible={setTimerVisible}
                    setParentTooltip={setTooltip}
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
                    setParentTooltip={setTooltip}
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
