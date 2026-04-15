import React, { useState, useEffect, useMemo } from "react";
import { Player, TournamentSchedule } from "../types";

interface PlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  scheduleData?: TournamentSchedule; // 💡 新增傳入資料
}

export const PlayerModal: React.FC<PlayerModalProps> = ({
  isOpen,
  onClose,
  players,
  scheduleData,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Hook 1: 處理 Modal 開啟時的重置邏輯
  useEffect(() => {
    if (isOpen) setSelectedIndex(0);
  }, [isOpen]);

  const currentPlayer = players[selectedIndex];

  // 👑 新增核心：動態計算選手戰績
  const currentPlayerStats = useMemo(() => {
    if (!currentPlayer || !scheduleData) return null;

    let gamesPlayed = 0;
    let totalScore = 0;
    let highestScore = -Infinity;
    let lowestScore = Infinity;
    const rankCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
    const magicCardStats: Record<string, { played: number; won: number }> = {};

    // 遍歷所有階段賽事
    const stages = [
      scheduleData.stage1,
      scheduleData.stage2,
      scheduleData.finals,
    ];

    stages.forEach((stage) => {
      if (!stage) return;
      stage.forEach((series) => {
        series.games.forEach((game) => {
          game.groups.forEach((group) => {
            group.results.forEach((result) => {
              // 確認選手名稱相符
              if (
                result.playerName &&
                result.playerName.includes(currentPlayer.name)
              ) {
                if (result.scoreInfo && result.scoreInfo.trim() !== "") {
                  const score = parseFloat(result.scoreInfo) || 0;
                  const rank = parseInt(result.rank, 10);

                  gamesPlayed++;
                  totalScore += score;
                  if (score > highestScore) highestScore = score;
                  if (score < lowestScore) lowestScore = score;
                  if (rank >= 1 && rank <= 4) {
                    rankCounts[rank as keyof typeof rankCounts]++;
                  }
                  if (game.magicCard && game.magicCard.trim() !== "") {
                    // 過濾掉原本試算表或 parser 可能加入的 '✨' 與空白符號
                    const cardName = game.magicCard.replace(
                      /^[✨\s]+|[✨\s]+$/g,
                      ""
                    );

                    if (!magicCardStats[cardName]) {
                      magicCardStats[cardName] = { played: 0, won: 0 };
                    }

                    magicCardStats[cardName].played++;
                    if (rank === 1) {
                      // 勝率定義為拿 1 位的次數
                      magicCardStats[cardName].won++;
                    }
                  }
                }
              }
            });
          });
        });
      });
    });

    if (gamesPlayed === 0) {
      return {
        gamesPlayed: 0,
        totalScore: 0,
        highestScore: 0,
        lowestScore: 0,
        rankCounts,
        firstPlaceRate: "0.0",
        topTwoRate: "0.0",
        magicCardStats: {}, // 💡 [新增] 沒打過比賽就回傳空物件
      };
    }

    const firstPlaceRate = ((rankCounts[1] / gamesPlayed) * 100).toFixed(1);
    const topTwoRate = (
      ((rankCounts[1] + rankCounts[2]) / gamesPlayed) *
      100
    ).toFixed(1);

    return {
      gamesPlayed,
      totalScore: Math.round(totalScore * 10) / 10,
      highestScore:
        highestScore === -Infinity ? 0 : Math.round(highestScore * 10) / 10,
      lowestScore:
        lowestScore === Infinity ? 0 : Math.round(lowestScore * 10) / 10,
      rankCounts,
      firstPlaceRate,
      topTwoRate,
      magicCardStats,
    };
  }, [currentPlayer, scheduleData]);

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

              <div className="flex flex-col gap-2 max-h-[35vh] overflow-y-auto custom-scrollbar pr-2">
                <p className="text-gray-300 text-sm lg:text-lg leading-relaxed shrink-0">
                  {currentPlayer.desc}
                </p>

                {/* 👑 重構的戰績儀表板 */}
                {currentPlayerStats && (
                  <div className="mt-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3 text-center text-xs lg:text-sm border-t border-[#dcb562]/30 pt-4 shrink-0">
                    <div className="flex flex-col items-center bg-black/40 rounded-lg p-2 border border-white/5 shadow-md">
                      <span className="text-gray-400 mb-1">出賽場次</span>
                      <span className="text-[#dcb562] font-black text-lg lg:text-xl">
                        {currentPlayerStats.gamesPlayed}
                      </span>
                    </div>
                    <div className="flex flex-col items-center bg-white/5 rounded p-1.5 border border-white/10 shadow-inner">
                      <span className="text-gray-400 mb-0.5">總正負分</span>
                      <span
                        className={`font-black text-base ${
                          currentPlayerStats.totalScore > 0
                            ? "text-green-400"
                            : currentPlayerStats.totalScore < 0
                            ? "text-red-400"
                            : "text-gray-400"
                        }`}
                      >
                        {currentPlayerStats.totalScore > 0
                          ? `+${currentPlayerStats.totalScore}`
                          : currentPlayerStats.totalScore}
                      </span>
                    </div>
                    <div className="flex flex-col items-center bg-white/5 rounded p-1.5 border border-white/10 shadow-inner">
                      <span className="text-gray-400 mb-0.5">最高分</span>
                      <span className="text-green-400 font-black text-base">
                        {currentPlayerStats.highestScore}
                      </span>
                    </div>
                    <div className="flex flex-col items-center bg-white/5 rounded p-1.5 border border-white/10 shadow-inner">
                      <span className="text-gray-400 mb-0.5">最低分</span>
                      <span className="text-red-400 font-black text-base">
                        {currentPlayerStats.lowestScore}
                      </span>
                    </div>
                    <div className="flex flex-col items-center bg-white/5 rounded p-1.5 border border-white/10 shadow-inner">
                      <span className="text-gray-400 mb-0.5">一位率</span>
                      <span className="text-[#dcb562] font-black text-base">
                        {currentPlayerStats.firstPlaceRate}%
                      </span>
                    </div>
                    <div className="flex flex-col items-center bg-white/5 rounded p-1.5 border border-white/10 shadow-inner">
                      <span className="text-gray-400 mb-0.5">生存率</span>
                      <span className="text-[#dcb562] font-black text-base">
                        {currentPlayerStats.topTwoRate}%
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-black/40 rounded-lg p-2 border border-white/5 shadow-md col-span-2 sm:col-span-3 lg:col-span-2">
                      <span className="text-gray-400 mb-1">
                        名次分佈 (1位-3位)
                      </span>
                      <span className="text-[#dcb562] font-black text-lg lg:text-xl tracking-widest drop-shadow-md">
                        {currentPlayerStats.rankCounts[1]} /{" "}
                        {currentPlayerStats.rankCounts[2]} /{" "}
                        {currentPlayerStats.rankCounts[3]}
                      </span>
                    </div>
                  </div>
                )}
                {/* 👑 重構的魔法卡勝率區塊 */}
                {currentPlayerStats &&
                  Object.keys(currentPlayerStats.magicCardStats).length > 0 && (
                    <div className="mt-2 flex flex-col gap-2 shrink-0 border-t border-[#dcb562]/30 pt-3">
                      <span className="text-gray-300 text-xs lg:text-sm font-bold flex items-center gap-2">
                        <span className="text-[#dcb562]">✦</span> 魔法卡勝率
                        (1位次數/出賽) <span className="text-[#dcb562]">✦</span>
                      </span>
                      <div className="flex flex-wrap gap-2.5">
                        {Object.entries(currentPlayerStats.magicCardStats)
                          .sort((a, b) => b[1].played - a[1].played)
                          .map(([card, stats]) => {
                            const winRate = (
                              (stats.won / stats.played) *
                              100
                            ).toFixed(0);
                            return (
                              <div
                                key={card}
                                className="flex items-center gap-2 bg-gradient-to-r from-purple-900/60 to-purple-800/40 border border-purple-500/40 rounded-md px-3 py-1.5 shadow-sm transition-transform hover:-translate-y-0.5"
                              >
                                <span
                                  className="text-purple-100 text-xs lg:text-sm font-bold max-w-[120px] truncate drop-shadow-sm"
                                  title={card}
                                >
                                  {card}
                                </span>
                                <div className="h-4 w-[1px] bg-purple-500/50 mx-0.5"></div>{" "}
                                {/* 視覺分隔線 */}
                                <span
                                  className={`text-xs lg:text-sm font-black tracking-wide ${
                                    stats.won > 0
                                      ? "text-[#dcb562]"
                                      : "text-gray-400"
                                  }`}
                                >
                                  {winRate}%{" "}
                                  <span className="text-[10px] lg:text-xs text-gray-400 font-normal ml-0.5">
                                    ({stats.won}/{stats.played})
                                  </span>
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
              </div>
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
