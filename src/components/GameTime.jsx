import React from "react";
import { secondsToMmSsMs } from "../lib/functions";
import { useGame } from "../context/gameContext";

function GameTime() {
  const { currentTime, duration } = useGame();

  return (
    <div className="progress">
      <span className="progress__text">{secondsToMmSsMs(currentTime)}</span>
      <span className="progress__row">
        <span
          className="progress__line"
          style={{ width: (currentTime * 100) / duration + "%" }}
        ></span>
      </span>
    </div>
  );
}

export default GameTime;
