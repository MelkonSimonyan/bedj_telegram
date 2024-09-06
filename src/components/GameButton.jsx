import React, { useEffect, useState } from "react";
import { useGame } from "../context/gameContext";
import { secondsToMmSsMs } from "../lib/functions";
import { FaPlay, FaPause, FaChevronUp, FaChevronDown } from "react-icons/fa";

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
      console.log(missingItem.value, value);
      setError(true);
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

  const handleClick = (direction) => {
    if (!missingItem && !error) {
      if (window.navigator.vibrate) {
        window.navigator.vibrate(300);
      }

      setClickError(true);
      setLives((lives) => lives - 1);
    }

    if (!error) {
      if (window.navigator.vibrate) {
        window.navigator.vibrate(10);
      }

      setValue((value) => {
        if (type === "rotate") {
          return value === "up" ? "down" : "up";
        } else if (type === "play") {
          return value === "on" ? "off" : "on";
        } else if (direction) {
          if (direction === "up") {
            return value > 5 ? value : value * 1 + 1;
          } else {
            return value < 1 ? value : value * 1 - 1;
          }
        }

        return value;
      });
    }
  };

  return (
    <div
      className={`panel-row panel-row_type_${type} ${
        error || clickError ? "is-error" : ""
      }`}
    >
      {data.actions
        .filter(
          (item) => currentTime <= item.time + 1 && currentTime >= item.time - 3
        )
        .map((item) => (
          <div
            className={`panel-row__timer panel-row__timer_${item.value}`}
            key={item.time}
            style={{
              top: type === "fader" ? (6 - item.value) * (100 / 6) + "%" : "",
            }}
          >
            {secondsToMmSsMs(
              Math.round(Math.max(item.time - currentTime, 0) * 10) / 10
            )}
          </div>
        ))}

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
        </button>
      )}

      {type === "play" && (
        <button
          className={`panel-play-btn panel-play-btn_value_${value}`}
          type="button"
          onClick={handleClick}
        >
          {value === "on" ? <FaPause /> : <FaPlay />}
        </button>
      )}

      {type === "fader" && (
        <div className="panel-fader">
          <button
            className="panel-fader__up"
            type="button"
            onClick={() => {
              handleClick("up");
            }}
          >
            <FaChevronUp />
          </button>
          <div className="panel-fader__line">
            <div
              className="panel-fader__handler"
              style={{
                top: (6 - value) * (100 / 6) + "%",
              }}
            >
              {value}
            </div>
          </div>
          <button
            className="panel-fader__down"
            type="button"
            onClick={() => {
              handleClick("down");
            }}
          >
            <FaChevronDown />
          </button>
        </div>
      )}
    </div>
  );
}

export default GameButton;
