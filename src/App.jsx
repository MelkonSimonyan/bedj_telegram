import { useEffect } from "react";
import axios from "axios";
import { useInitData } from "./context/initDataContext";
import Game from "./Game";
import Popup from "./components/Popup";

function App() {
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
      } else {
        setInitDataError("initData.json is not a valid json file");
      }
    } else {
      setInitDataError("An error occurred, please reload the page.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInitData();
  }, []);

  return (
    <div className="app">
      {initDataError && <Popup type="error">{initDataError}</Popup>}
      {initData && <Game />}
    </div>
  );
}

export default App;
