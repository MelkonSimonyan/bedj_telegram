import { createRoot } from "react-dom/client";
import { InitDataProvider } from "./context/initDataContext.jsx";
import { GameProvider } from "./context/gameContext.jsx";
import App from "./App.jsx";
import "./assets/css/var.css";
import "./assets/css/style.css";

createRoot(document.getElementById("root")).render(
  <InitDataProvider>
    <GameProvider>
      <App />
    </GameProvider>
  </InitDataProvider>
);
