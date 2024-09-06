import React, { useState, useEffect } from "react";

const gameData = {
  "00:13.0": { button: "button1" },
  "00:19.0": { button: "button2" },
  "00:24.0": { button: "button1" },
  "01:02.0": { button: "button3" },
  "01:30.0": { button: "button4" },
};

// Функция для форматирования времени в "MM:SS.s"
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = (time % 60).toFixed(1).padStart(4, "0"); // добавляем 0 для соответствия формату "SS.s"
  return `${String(minutes).padStart(2, "0")}:${seconds}`;
};

const Game = () => {
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lives, setLives] = useState(2);
  const [message, setMessage] = useState("");
  const [activeButton, setActiveButton] = useState(null);
  const [lastActiveTime, setLastActiveTime] = useState(null);

  useEffect(() => {
    let timer;
    if (isPlaying && lives > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1);
      }, 100);
    }

    return () => clearInterval(timer);
  }, [isPlaying, lives]);

  useEffect(() => {
    const formattedTime = formatTime(time);

    // Проверяем, если текущий момент соответствует одному из моментов в gameData
    if (gameData[formattedTime]) {
      setActiveButton(gameData[formattedTime].button);
      setMessage(`Нажмите ${gameData[formattedTime].button}`);
      setLastActiveTime(time); // Запоминаем время, когда кнопка стала активной
    }

    // Если активная кнопка есть и прошло больше 1 секунды с момента ее активации, отнимаем жизнь
    if (activeButton && time - lastActiveTime >= 1) {
      setLives(lives - 1);
      setActiveButton(null); // Сбрасываем активную кнопку
      setLastActiveTime(null); // Сбрасываем время активации кнопки
      if (lives - 1 <= 0) {
        setIsPlaying(false);
        setMessage("Вы проиграли. Попробуйте снова.");
      } else {
        setMessage("Вы не успели нажать на кнопку! Попробуйте еще раз.");
      }
    }

    if (time >= 120) {
      setIsPlaying(false);
      setMessage("Поздравляем! Вы выиграли!");
    }
  }, [time, activeButton, lastActiveTime, lives]);

  const handleButtonClick = (buttonName) => {
    if (buttonName === activeButton) {
      setMessage("Правильно!");
      setActiveButton(null); // Сбрасываем активную кнопку после правильного нажатия
      setLastActiveTime(null); // Сбрасываем время активации кнопки
    } else {
      setLives(lives - 1);
      if (lives - 1 <= 0) {
        setIsPlaying(false);
        setMessage("Вы проиграли. Попробуйте снова.");
      } else {
        setMessage("Неправильно! Попробуйте еще раз.");
      }
    }
  };

  const startGame = () => {
    setTime(0);
    setLives(2);
    setIsPlaying(true);
    setMessage("");
    setActiveButton(null);
    setLastActiveTime(null);
  };

  return (
    <div>
      <h1>Игра на реакцию</h1>
      <div>
        <button
          onClick={() => handleButtonClick("button1")}
          disabled={!isPlaying}
        >
          Кнопка 1
        </button>
        <button
          onClick={() => handleButtonClick("button2")}
          disabled={!isPlaying}
        >
          Кнопка 2
        </button>
        <button
          onClick={() => handleButtonClick("button3")}
          disabled={!isPlaying}
        >
          Кнопка 3
        </button>
        <button
          onClick={() => handleButtonClick("button4")}
          disabled={!isPlaying}
        >
          Кнопка 4
        </button>
      </div>
      <div>
        <h2>Время: {formatTime(time)} секунд</h2>
        <h2>Жизни: {lives}</h2>
      </div>
      {message && <h3>{message}</h3>}
      {!isPlaying && <button onClick={startGame}>Старт</button>}
    </div>
  );
};

export default Game;
