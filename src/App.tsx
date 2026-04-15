// src/App.tsx
import React, { useState } from "react";
import "./index.css";
import { TournamentProvider, useTournament } from "./context/TournamentContext";
import { PlayerModal } from "./components/PlayerModal";
import { ScheduleModal } from "./components/ScheduleModal"; // 💡 引入新的賽程元件
import { RulesModal } from "./components/RulesModal";
import { TOURNAMENT_RULES } from "./constants/rulesData";

const MainContent: React.FC = () => {
  const [activeModal, setActiveModal] = useState<
    "none" | "schedule" | "rules" | "players"
  >("none");
  const { data, loading, error } = useTournament();

  if (loading)
    return (
      <div className="flex items-center justify-center w-full h-screen bg-[#1a1b35] text-[#dcb562] text-2xl font-black animate-pulse">
        🌸 賽事資料同步中... 🌸
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-[#1a1b35] text-red-400 text-xl">
        <p>⚠️ 資料載入失敗：{error}</p>
      </div>
    );

  // 💡 已經徹底移除未使用到的 getStandardModalProps 與 stdModalProps

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#1a1b35]">
      {/* 背景與按鈕 UI */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-3xl scale-110 opacity-70"
        style={{
          backgroundImage: "url('/images/main-bg.webp')",
          filter: "blur(40px) brightness(0.4)",
        }}
      ></div>

      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-90 z-10"
        style={{ backgroundImage: "url('/images/main-bg.webp')" }}
      ></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#1a1b35_95%)] z-20"></div>

      <div className="absolute left-3/4 bottom-[30%] -translate-x-1/2 md:left-auto md:bottom-auto md:right-[5%] lg:right-[15%] md:top-1/2 md:-translate-y-1/2 md:-translate-x-0 w-[85%] max-w-[300px] md:w-auto flex flex-col gap-5 md:gap-8 z-30">
        <div className="animate-float-1 w-full">
          <button
            className="oriental-btn group"
            onClick={() => setActiveModal("players")}
          >
            <div className="oriental-btn-inner"></div>選手介紹
          </button>
        </div>
        <div className="animate-float-2 w-full">
          <button
            className="oriental-btn group"
            onClick={() => setActiveModal("schedule")}
          >
            <div className="oriental-btn-inner"></div>賽程規劃
          </button>
        </div>
        <div className="animate-float-3 w-full">
          <button
            className="oriental-btn group"
            onClick={() => setActiveModal("rules")}
          >
            <div className="oriental-btn-inner"></div>規則說明
          </button>
        </div>
      </div>

      {/* 彈出視窗群 */}
      <PlayerModal
        isOpen={activeModal === "players"}
        onClose={() => setActiveModal("none")}
        players={data?.players || []}
        scheduleData={data?.scheduleData} // 💡 新增這行：傳入賽局資料供統計使用
      />

      <ScheduleModal
        isOpen={activeModal === "schedule"}
        onClose={() => setActiveModal("none")}
        scheduleData={data?.scheduleData}
      />

      <RulesModal
        isOpen={activeModal === "rules"}
        onClose={() => setActiveModal("none")}
        rulesData={TOURNAMENT_RULES}
      />
    </div>
  );
};

export default function App() {
  return (
    <TournamentProvider>
      <MainContent />
    </TournamentProvider>
  );
}
