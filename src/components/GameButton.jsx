import React, { useEffect, useState } from "react";
import { useGame } from "../context/gameContext";

function GameButtonTimerItem({ time, currentTime, hidden }) {
  const [angle, setAngle] = useState(360);

  useEffect(() => {
    let interval = setInterval(() => {
      setAngle((angle) => {
        if (angle > 360 / 35 + 0.001) {
          return angle - 360 / 35;
        } else {
          clearInterval(interval);
          return 0.001;
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`panel-row__timer-wrapper ${hidden ? "is-hidden" : ""}`}>
      <div className="panel-row__timer">
        {Math.floor(Math.max(time - currentTime, 0))}
      </div>
      <div className="panel-row__timer-graph">
        <svg viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="35.5"
            transform="rotate(-90 40 40)"
            fill="none"
            stroke="var(--color)"
            strokeWidth="9"
            strokeMiterlimit="2.241"
            strokeDasharray="1.87 1.87"
          />
          <path
            fill="none"
            stroke="var(--stroke)"
            strokeWidth="10"
            d={[
              "M",
              40 + 35 * Math.cos((-90 * Math.PI) / 180),
              40 + 35 * Math.sin((-90 * Math.PI) / 180),
              "A",
              35,
              35,
              0,
              angle <= 180 ? 1 : 0,
              0,
              40 + 35 * Math.cos(((angle - 90) * Math.PI) / 180),
              40 + 35 * Math.sin(((angle - 90) * Math.PI) / 180),
            ].join(" ")}
          />
        </svg>
      </div>
    </div>
  );
}

function GameButtonTimer({ data, currentTime, value }) {
  return (
    <>
      {data.actions
        .filter(
          (item) => item.time >= currentTime && item.time <= currentTime + 4
        )
        .map((item) => {
          return (
            <GameButtonTimerItem
              key={item.time}
              hidden={item.value == value}
              time={item.time}
              currentTime={currentTime}
            />
          );
        })}
    </>
  );
}

function GameButton({ currentTime, setLives, data, type, text }) {
  const { currentLevel } = useGame();
  const [missingItem, setMissingItem] = useState(null);
  const [timerVisible, setTimerVisible] = useState(false);
  const [value, setValue] = useState(data.default);
  const [error, setError] = useState(false);
  const [clickError, setClickError] = useState(false);
  const [helpVisible, setHelpVisible] = useState(currentLevel.index == 0);

  useEffect(() => {
    const item = data.actions.find(
      (item) => item.time >= currentTime && item.time <= currentTime + 1
    );

    if (
      missingItem &&
      missingItem.time !== item?.time &&
      missingItem.value != value
    ) {
      if (window.navigator.vibrate) {
        window.navigator.vibrate(300);
      }

      setError(true);
      setValue(missingItem.value);
      setLives((lives) => lives - 1);
    }

    if (item) {
      setMissingItem(item);
    } else {
      setMissingItem(null);
    }

    setTimerVisible(
      data.actions.filter(
        (item) =>
          item.time >= currentTime &&
          item.time <= currentTime + 4 &&
          item.value != value
      ).length > 0
    );
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

  const handleClick = (e) => {
    if (!error) {
      if (missingItem) {
        if (window.navigator.vibrate) {
          window.navigator.vibrate(50);
        }

        setValue(missingItem.value);
      } else {
        if (window.navigator.vibrate) {
          window.navigator.vibrate(300);
        }

        setClickError(true);
        setLives((lives) => lives - 1);
      }
    }
  };

  return (
    <>
      {helpVisible && (
        <div
          className={`play-help-bg ${timerVisible ? "is-visible" : ""}`}
        ></div>
      )}
      <div
        className={`panel-row panel-row_type_${type} ${
          error || clickError ? "is-error" : ""
        } ${helpVisible && timerVisible ? "is-visible" : ""}`}
      >
        {type === "rotate" && (
          <>
            <button
              className={`panel-eq-btn panel-eq-btn_value_${value}`}
              type="button"
              onTouchStart={handleClick}
            >
              <GameButtonTimer
                data={data}
                currentTime={currentTime}
                value={value}
              />
              <span className="panel-eq-btn__icon">
                <span className="panel-eq-btn__circle">
                  <span></span>
                </span>
                <span className="panel-eq-btn__title">{text}</span>
              </span>
            </button>

            {helpVisible && (
              <div
                className={`play-help-tooltip ${
                  timerVisible ? "is-visible" : ""
                }`}
              >
                <span>
                  Tap
                  <br /> here
                </span>
              </div>
            )}
          </>
        )}

        {type === "play" && (
          <>
            <button
              className={`panel-play-btn panel-play-btn_value_${value}`}
              type="button"
              onTouchStart={handleClick}
            >
              <GameButtonTimer
                data={data}
                currentTime={currentTime}
                value={value}
              />
              {value === "on" ? (
                <svg
                  viewBox="0 0 37 37"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="23" y="2" width="7" height="33" rx="1" />
                  <rect x="7" y="2" width="7" height="33" rx="1" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 37 37"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M35.5 17.634a1 1 0 0 1 0 1.732l-24.75 14.29a1 1 0 0 1-1.5-.867V4.211a1 1 0 0 1 1.5-.866L35.5 17.634Z" />
                </svg>
              )}
            </button>

            {helpVisible && (
              <div
                className={`play-help-tooltip ${
                  timerVisible ? "is-visible" : ""
                }`}
              >
                <span>
                  Tap
                  <br /> here
                </span>
              </div>
            )}
          </>
        )}

        {type === "fader" && (
          <>
            <button
              type="button"
              className="panel-fader"
              onTouchStart={handleClick}
            >
              <div className="panel-fader__line"></div>
              <div
                className="panel-fader__handler"
                style={{
                  top: (12 - value) * (100 / 12) + "%",
                }}
              >
                {helpVisible && (
                  <div
                    className={`play-help-tooltip ${
                      timerVisible ? "is-visible" : ""
                    }`}
                  >
                    <span>
                      Tap
                      <br /> here
                    </span>
                  </div>
                )}

                <GameButtonTimer
                  data={data}
                  currentTime={currentTime}
                  value={value}
                />
              </div>
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default GameButton;
