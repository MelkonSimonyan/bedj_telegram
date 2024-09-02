import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/css/var.css";
import "./assets/css/style.css";
import { InitDataProvider } from "./context/initDataContext.jsx";

createRoot(document.getElementById("root")).render(
  <InitDataProvider>
    <App />
  </InitDataProvider>
);
