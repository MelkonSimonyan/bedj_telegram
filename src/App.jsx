import Play from "./components/Play";
import { useInitData } from "./context/initDataContext";

function App() {
  const { initData, initDataError } = useInitData();

  if (!initData && !initDataError) {
    return null;
  }

  return (
    <div className="app">
      {initDataError ? <div>{initDataError}</div> : <Play />}
    </div>
  );
}

export default App;
