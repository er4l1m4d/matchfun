import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/design-system.css";
import "./styles/global.css";
import "./styles/components.css";
import "./styles/landing.css";
import "./styles/home.css";
import "./styles/live.css";
import "./styles/rank.css";
import "./styles/nfts.css";
import "./styles/profile.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
