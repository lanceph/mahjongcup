// src/main.tsx 或 src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// 💡 1. 引入我們的全域資料廣播站
import { TournamentProvider } from "./context/TournamentContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* 💡 2. 把廣播站包在 App 的最外層！這樣 App 裡面的所有按鈕、視窗才拿得到資料 */}
    <TournamentProvider>
      <App />
    </TournamentProvider>
  </React.StrictMode>
);
