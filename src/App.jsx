import { useEffect } from "react";
import axios from "axios";
import { useInitData } from "./context/initDataContext";
import Game from "./Game";
import Popup from "./components/Popup";
import { useGame } from "./context/gameContext";

function App() {
  const { setMenuAudio } = useGame();

  const {
    initData,
    setInitData,
    setInitDataLoading,
    initDataError,
    setInitDataError,
  } = useInitData();

  const fetchInitData = async () => {
    setInitDataLoading(true);

    const response = await axios.get("initData.json?" + new Date().getTime());

    setInitDataLoading(false);

    if (response.data) {
      if (response.data instanceof Object) {
        setInitData(response.data);

        response.data.levels.forEach((level) => {
          if (level.image) {
            const img = new Image();
            img.src = level.image;
          }
        });

        setMenuAudio(new Audio("assets/audio/menu.mp3"));
      } else {
        setInitDataError("Файл initData.json содержит ошибку.");
      }
    } else {
      setInitDataError("Произошла ошибка, пожалуйста, перезагрузите страницу.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInitData();

    const images = [
      "assets/images/logo.svg",
      "assets/images/headphones.svg",
      "assets/images/start-bg.svg",
      "assets/images/level-default.jpg",
      "assets/images/eq-left.png",
      "assets/images/eq-right.png",
      "assets/images/help-bg.svg",
      "assets/images/help-screen-img-1.svg",
      "assets/images/help-screen-img-2.svg",
      "assets/images/win-bg.svg",
      "assets/images/loss-bg.svg",
      "assets/images/win-img.webp",
      "assets/images/loss-img.gif",
      "assets/images/loader-circle.svg",
      "assets/images/loader-icon-0.svg",
      "assets/images/loader-icon-1.svg",
      "assets/images/loader-icon-2.svg",
      "assets/images/loader-icon-3.svg",
      "assets/images/loader-icon-4.svg",
    ];

    images.forEach((item) => {
      const img = new Image();
      img.src = item;
    });
  }, []);

  return (
    <div className="app">
      {initDataError && <Popup type="error">{initDataError}</Popup>}
      {initData && <Game />}
    </div>
  );
}

export default App;
