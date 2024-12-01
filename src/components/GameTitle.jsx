import React, { useEffect, useState } from "react";
import { secondsToMmSsMs } from "../lib/functions";

function GameTitle({ data, currentTime }) {
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
      {missingItem?.title ? (
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
