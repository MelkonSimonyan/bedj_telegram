import { useEffect, useRef, useState } from "react";
import { useInitData } from "../context/initDataContext";
import { FaPlay } from "react-icons/fa";

function Play() {
  const { initData, initDataError } = useInitData();
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);

  const handleClick = () => {
    if (audioRef.current) {
      window.navigator.vibrate(300);
      audioRef.current.play();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    const updateCurrentTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    const start = () => {
      setPlaying(true);
    };

    const end = () => {
      setPlaying(false);
    };

    if (audio) {
      audio.addEventListener("timeupdate", updateCurrentTime);
      audio.addEventListener("loadedmetadata", updateDuration);
      audio.addEventListener("play", start);
      audio.addEventListener("ended", end);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateCurrentTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
        audio.removeEventListener("play", start);
        audio.removeEventListener("ended", end);
      }
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!initData && !initDataError) {
    return null;
  }

  return (
    <div className="app">
      {initDataError ? (
        <div>{initDataError}</div>
      ) : (
        <div className="play">
          <audio ref={audioRef} src={initData.music} />

          {!playing && (
            <button className="play-btn" onClick={handleClick}>
              <FaPlay />
            </button>
          )}

          {playing && (
            <div className="progress">
              <span className="progress__text">{formatTime(currentTime)}</span>
              <span className="progress__row">
                <span
                  className="progress__line"
                  style={{ width: (currentTime * 100) / duration + "%" }}
                ></span>
              </span>
              <span className="progress__text">{formatTime(duration)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Play;
