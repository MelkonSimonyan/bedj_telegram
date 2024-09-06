export function secondsToMmSsMs(time) {
  const ms = Math.floor((time % 1) * 10);
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return (
    <span>
      {`${minutes < 10 ? "0" : ""}${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}.`}
      <small>{ms}</small>
    </span>
  );
}

export function mmSsMsToSeconds(time) {
  const [minutes, seconds] = time.split(":");
  const [wholeSeconds, milliseconds] = seconds.split(".");

  return (
    parseInt(minutes) * 60 +
    parseInt(wholeSeconds) +
    parseFloat("0." + milliseconds)
  );
}
