import React, { useEffect, useState } from "react";
import { FaPlay, FaPause, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useGame } from "../context/gameContext";
import { secondsToMmSsMs } from "../lib/functions";

function GameButtonTimer({ data, currentTime }) {
  return (
    <div className="panel-row__timer-wrapper">
      {data.actions
        .filter(
          (item) => currentTime <= item.time + 1 && currentTime >= item.time - 3
        )
        .map((item) => (
          <div
            className={`panel-row__timer panel-row__timer_${item.value}`}
            key={item.time}
          >
            {secondsToMmSsMs(
              Math.round(Math.max(item.time - currentTime, 0) * 10) / 10
            )}
          </div>
        ))}
    </div>
  );
}

function GameButton({ data, type, text }) {
  const { currentTime, setLives } = useGame();
  const [missingItem, setMissingItem] = useState(null);
  const [value, setValue] = useState(data.default);
  const [error, setError] = useState(false);
  const [clickError, setClickError] = useState(false);

  useEffect(() => {
    const item = data.actions.find((item) => {
      return currentTime <= item.time + 1 && currentTime >= item.time - 1;
    });

    if (
      missingItem &&
      missingItem.time !== item?.time &&
      missingItem.value != value
    ) {
      setError(true);
      setValue(missingItem.value);
      setLives((lives) => lives - 1);
    }

    if (item) {
      setMissingItem(item);
    } else {
      setMissingItem(null);
    }
  }, [currentTime]);

  useEffect(() => {
    if (error) {
      let errorTimeout = setTimeout(() => {
        setError(false);
      }, 1000);

      return () => clearTimeout(errorTimeout);
    }
  }, [error]);

  useEffect(() => {
    if (clickError) {
      let clickErrorTimeout = setTimeout(() => {
        setClickError(false);
      }, 1000);

      return () => clearTimeout(clickErrorTimeout);
    }
  }, [clickError]);

  const handleClick = () => {
    if (!error) {
      if (!missingItem) {
        if (window.navigator.vibrate) {
          window.navigator.vibrate(300);
        }

        setClickError(true);
        setLives((lives) => lives - 1);
      } else {
        if (window.navigator.vibrate) {
          window.navigator.vibrate(1);
        }

        setValue(missingItem.value);
      }
    }
  };

  return (
    <div
      className={`panel-row panel-row_type_${type} ${
        error || clickError ? "is-error" : ""
      }`}
    >
      {type === "rotate" && (
        <button
          className={`panel-eq-btn panel-eq-btn_value_${value}`}
          type="button"
          onClick={handleClick}
        >
          <span className="panel-eq-btn__icon">
            <span className="panel-eq-btn__circle">
              <span></span>
            </span>
            <span className="panel-eq-btn__title">{text}</span>
          </span>
          <GameButtonTimer data={data} currentTime={currentTime} />
        </button>
      )}
      {type === "play" && (
        <button
          className={`panel-play-btn panel-play-btn_value_${value}`}
          type="button"
          onClick={handleClick}
        >
          {value === "on" ? <FaPause /> : <FaPlay />}
          <GameButtonTimer data={data} currentTime={currentTime} />
        </button>
      )}
      {type === "fader" && (
        <button type="button" className="panel-fader" onClick={handleClick}>
          <div className="panel-fader__line"></div>
          <div
            className="panel-fader__handler"
            style={{
              top: (12 - value) * (100 / 12) + "%",
            }}
          >
            <GameButtonTimer data={data} currentTime={currentTime} />
          </div>
        </button>
      )}
    </div>
  );
}

export default GameButton;