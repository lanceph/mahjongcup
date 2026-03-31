import React, { useState, useEffect } from "react";
import { Player } from "../types";

interface PlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
}

export const PlayerModal: React.FC<PlayerModalProps> = ({
  isOpen,
  onClose,
  players,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Hook 1: 處理 Modal 開啟時的重置邏輯
  useEffect(() => {
    if (isOpen) setSelectedIndex(0);
  }, [isOpen]);

  const currentPlayer = players[selectedIndex];

  useEffect(() => {
    if (isOpen && currentPlayer) {
    }
  }, [currentPlayer, isOpen]);

  if (!isOpen || players.length === 0 || !currentPlayer) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-[95%] max-w-[1200px] h-[95vh] lg:h-[85vh] bg-gradient-to-br from-[#1a1b35ef] to-[#0a0a14ef] border-4 border-[#dcb562] rounded-2xl flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 lg:top-3 right-4 lg:right-5 z-[100] text-4xl lg:text-5xl text-[#dcb562] hover:text-white transition-all cursor-pointer drop-shadow-lg"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="w-full text-center py-3 lg:py-4 bg-gradient-to-b from-[#dcb562]/20 to-transparent border-b border-[#dcb562]/30 shrink-0">
          <h2 className="text-[#fcedd8] text-2xl lg:text-3xl font-black tracking-widest drop-shadow-[0_0_10px_#dcb562]">
            參賽選手陣容
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          <div className="h-[55%] lg:h-full lg:w-2/3 flex flex-col relative p-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-[#dcb562]/30 overflow-hidden shrink-0 lg:shrink">
            <div className="absolute inset-0 flex items-center justify-center text-[6rem] lg:text-[10rem] font-black text-white/[0.03] select-none z-0">
              PLAYER
            </div>
            <div className="flex-1 relative flex items-center justify-center z-10 mb-3 overflow-hidden">
              <div
                key={currentPlayer.id}
                className="h-full w-full flex items-center justify-center animate-char-float"
              >
                {currentPlayer.fullImg ? (
                  <img
                    src={currentPlayer.fullImg}
                    alt={currentPlayer.name}
                    className="max-h-full max-w-full object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)]"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center w-32 lg:w-48 h-48 lg:h-72 border-2 border-dashed border-[#dcb562]/50 rounded-xl bg-black/40 text-[#dcb562]">
                    <span className="text-4xl lg:text-5xl mb-2 lg:mb-3">
                      👤
                    </span>
                    <span className="text-lg lg:text-xl">
                      {currentPlayer.name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="shrink-0 bg-black/60 border border-[#dcb562]/50 rounded-xl p-3 lg:p-5 z-20 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row sm:items-end gap-1 sm:gap-4 mb-2 border-b border-[#dcb562]/30 pb-2">
                <h3 className="text-2xl lg:text-4xl font-black text-[#fcedd8]">
                  {currentPlayer.name}
                </h3>
                <span className="text-[#dcb562] text-sm lg:text-xl font-bold mb-1">
                  [{currentPlayer.title}]
                </span>
              </div>
              <p className="text-gray-300 text-sm lg:text-lg leading-relaxed h-14 lg:h-20 overflow-y-auto pr-2 custom-scrollbar">
                {currentPlayer.desc}
              </p>
            </div>
          </div>

          <div className="flex-1 lg:h-full lg:w-1/3 p-4 lg:p-6 flex flex-col bg-black/40 overflow-hidden">
            <h4 className="text-[#dcb562] text-lg lg:text-xl font-bold mb-3 lg:mb-5 flex items-center gap-3 shrink-0">
              <span>✦</span> 選手名單 <span>✦</span>
            </h4>

            {/* 🚀 修正 1：將原本的 pr-2 pb-4 改為 p-2 pb-6。這 2 (8px) 的內距提供了完美的緩衝空間 */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 pb-6">
              <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-3 gap-3 h-max">
                {players.map((player, index) => (
                  <div
                    key={player.id}
                    className={`relative w-full aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-200 group ${
                      index === selectedIndex
                        ? "ring-4 ring-white shadow-[0_0_20px_rgba(220,181,98,0.9)] z-30 scale-[1.02]"
                        : "ring-2 ring-[#444] hover:ring-[#dcb562] hover:-translate-y-1 hover:shadow-[0_5px_10px_rgba(0,0,0,0.5)] hover:z-20 z-0 opacity-75 hover:opacity-100"
                    }`}
                    onClick={() => setSelectedIndex(index)}
                  >
                    {/* 🚀 修正 3：移除 rounded-lg（讓它和外層 div 一樣使用 overflow-hidden 控制圓角） */}
                    <img
                      src={player.avatar}
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                    {index !== selectedIndex && (
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-0"></div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-[10px] lg:text-sm font-bold text-center py-1 truncate px-1 z-10">
                      {player.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
