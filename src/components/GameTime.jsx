import React from "react";
import { secondsToMmSsMs } from "../lib/functions";

function GameTime({ currentTime, duration }) {
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
