import React, { useEffect, useState } from "react";
import { useGame } from "../context/gameContext";
import { secondsToMmSsMs } from "../lib/functions";

function GameTitle({ data }) {
  const { currentTime } = useGame();
  const [missingItem, setMissingItem] = useState(null);

  useEffect(() => {
    const item = data.find((item) => currentTime <= item.time + 1);

    if (item) {
      setMissingItem(item);
    } else {
      setMissingItem(null);
    }
  }, [currentTime]);

  return (
    <>
      {missingItem ? (
        <span>
          {missingItem.title} - {secondsToMmSsMs(missingItem.time)}
        </span>
      ) : (
        <span>&nbsp;</span>
      )}
    </>
  );
}

export default GameTitle;
