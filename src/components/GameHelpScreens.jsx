import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeAnimation } from "../lib/constants";
import { useGame } from "../context/gameContext";

function GameHelpScreenBg() {
  return (
    <motion.div
      variants={fadeAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className="game-help-screens__bg"
    ></motion.div>
  );
}

function GameHelpScreen({ id }) {
  const { setHelpScreensVisible, helpScreenIndex, setHelpScreenIndex } =
    useGame();
  const [activeButtonCenter, setActiveButtonCenter] = useState(0);

  useEffect(() => {
    let activeButton = document.querySelector(".panel-row.is-visible");
    if (activeButton) {
      const activeButtonHandler = activeButton.querySelector(
        ".panel-fader__handler"
      );
      if (activeButtonHandler) {
        activeButton = activeButtonHandler;
      }

      setActiveButtonCenter(
        activeButton.getBoundingClientRect().top +
          activeButton.getBoundingClientRect().height / 2
      );
    }
  }, []);

  return (
    <motion.div
      variants={fadeAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className="game-help-screen"
      data-index={id}
    >
      {id === 1 && (
        <div className="game-help-screen__content">
          <div className="game-help-screen__content-image">
            <img src="assets/images/help-screen-img-1.svg" alt="" />
          </div>
          <div className="game-help-screen__content-title">
            BeDJ Mini – DJ симулятор
          </div>
        </div>
      )}

      {id === 2 && (
        <div className="game-help-screen__content">
          <div className="game-help-screen__content-image">
            <img src="assets/images/help-screen-img-2.svg" alt="" />
          </div>
          <div className="game-help-screen__content-title">
            Это симулятор
            <br /> DJ пульта
          </div>
          <button className="link" onClick={() => setHelpScreenIndex(3)}>
            <span>Дальше</span>
          </button>
        </div>
      )}

      {id === 3 && (
        <>
          <div
            className="game-help-screen__tooltip-row"
            style={{ top: activeButtonCenter }}
          >
            <div className="game-help-screen__tooltip">
              <div className="game-help-screen__tooltip-title">
                Эквалайзер – регулирует уровень высоких частот в треке
                (больше/меньше)
              </div>
              <button className="link" onClick={() => setHelpScreenIndex(4)}>
                <span>Дальше</span>
              </button>
            </div>
          </div>

          <div className="game-help-screen__footer">
            <button
              className="link"
              onClick={() => setHelpScreensVisible(false)}
            >
              <span>Пропустить</span>
            </button>
          </div>
        </>
      )}

      {id === 4 && (
        <>
          <div
            className="game-help-screen__tooltip-row"
            style={{ top: activeButtonCenter }}
          >
            <div className="game-help-screen__tooltip">
              <div className="game-help-screen__tooltip-title">
                Эквалайзер – регулирует уровень басов в треке (больше/меньше)
              </div>
              <button className="link" onClick={() => setHelpScreenIndex(5)}>
                <span>Дальше</span>
              </button>
            </div>
          </div>

          <div className="game-help-screen__footer">
            <button
              className="link"
              onClick={() => setHelpScreensVisible(false)}
            >
              <span>Пропустить</span>
            </button>
          </div>
        </>
      )}

      {id === 5 && (
        <>
          <div
            className="game-help-screen__tooltip-row"
            style={{ top: activeButtonCenter }}
          >
            <div className="game-help-screen__tooltip">
              <div className="game-help-screen__tooltip-title">
                Фейдер – регулятор громкости трека
              </div>
              <button className="link" onClick={() => setHelpScreenIndex(6)}>
                <span>Дальше</span>
              </button>
            </div>
          </div>

          <div className="game-help-screen__footer">
            <button
              className="link"
              onClick={() => setHelpScreensVisible(false)}
            >
              <span>Пропустить</span>
            </button>
          </div>
        </>
      )}

      {id === 6 && (
        <>
          <div
            className="game-help-screen__tooltip-row"
            style={{ top: activeButtonCenter }}
          >
            <div className="game-help-screen__tooltip">
              <button
                className="btn"
                onClick={() => setHelpScreensVisible(false)}
              >
                Начать
              </button>
              <div className="game-help-screen__tooltip-title">
                Play – запускает трек
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

function GameHelpScreens() {
  const { helpScreenIndex, setHelpScreenIndex } = useGame();

  useEffect(() => {
    setTimeout(() => {
      setHelpScreenIndex(0);
    }, 4000);

    setTimeout(() => {
      setHelpScreenIndex(2);
    }, 5500);
  }, []);

  return (
    <div className="game-help-screens">
      <AnimatePresence>
        {helpScreenIndex !== 0 && <GameHelpScreenBg key={0} />}
        {[1, 2, 3, 4, 5, 6].map((index) =>
          helpScreenIndex === index ? (
            <GameHelpScreen key={index} id={index} />
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
}

export default GameHelpScreens;
