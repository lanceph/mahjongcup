// src/components/ScheduleModal.tsx
import React, { useState, useMemo } from "react";
import { TournamentSchedule, MatchSeries } from "../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  scheduleData?: TournamentSchedule;
}

// 計算賽次總結與排名的輔助函式
const getSeriesStandings = (series: MatchSeries, isFinals: boolean) => {
  const groupsMap = new Map<
    string,
    {
      groupName: string;
      players: Set<string>;
      totalScore: number;
      remaining: number;
      hasPlayed: boolean;
    }
  >();

  // 1. 初始建立組別，並從組名提取預設名單 [修改重點]
  if (series.groupNames) {
    series.groupNames.forEach((name) => {
      const defaultPlayers = new Set<string>();
      
      // 使用 Regex 提取括號 ( ) 內容
      // 支援 [組名 (選手A, 選手B)] 或 [組名（選手A、選手B）]
      const match = name.match(/[\(\（](.*?)[\)\）]/);
      if (match && match[1]) {
        // 依照多種可能的逗號進行分割
        const names = match[1].split(/[、,，\s]+/);
        names.forEach(p => {
          const trimmed = p.trim();
          if (trimmed) defaultPlayers.add(trimmed);
        });
      }

      groupsMap.set(name, {
        groupName: name,
        players: defaultPlayers, // 預填提取到的名單
        totalScore: 0,
        remaining: 0,
        hasPlayed: false,
      });
    });
  }

  // 2. 寫入實際賽局結果 (若有實際結果，會自動合併到 Set 中)
  series.games.forEach((game) => {
    game.groups.forEach((g) => {
      if (!g.groupName) return;

      if (!groupsMap.has(g.groupName)) {
        groupsMap.set(g.groupName, {
          groupName: g.groupName,
          players: new Set(),
          totalScore: 0,
          remaining: 0,
          hasPlayed: false,
        });
      }
      const groupData = groupsMap.get(g.groupName)!;

      g.results.forEach((r) => {
        if (r.playerName && r.playerName.trim() !== "") {
          groupData.players.add(r.playerName); // 若賽局已有登錄名單，也會加入

          if (r.scoreInfo && r.scoreInfo.trim() !== "") {
            groupData.hasPlayed = true;
            const scoreNum = parseFloat(r.scoreInfo) || 0;
            groupData.totalScore += scoreNum;
          }

          if (!isFinals && r.remaining && r.remaining.trim() !== "") {
            groupData.remaining = parseInt(r.remaining, 10) || 0;
          }
        }
      });
    });
  });

  const standings = Array.from(groupsMap.values())
    .map((g) => {
      // 新增：去除組別名稱中的括號與其內容 (支援全/半形括號)
      // 例如 "第一組 (A, B)" 會變成 "第一組"
      const cleanName = g.groupName.replace(/\s*[\(\（].*?[\)\）]\s*/g, '').trim();

      return {
        ...g,
        displayGroupName: cleanName, // 供 UI 顯示的乾淨名稱
        players: Array.from(g.players),
        displayScore: Math.round(g.totalScore * 10) / 10,
      };
    })
    .filter((g) => g.groupName);

  standings.sort((a, b) => {
    if (!a.hasPlayed && !b.hasPlayed) return 0;
    if (!isFinals && b.remaining !== a.remaining) {
      return b.remaining - a.remaining;
    }
    return b.totalScore - a.totalScore;
  });

  return standings;
};

export const ScheduleModal: React.FC<Props> = ({ isOpen, onClose, scheduleData }) => {
  const [activeTab, setActiveTab] = useState<"stage1" | "stage2" | "finals">("stage1");
  const [filterName, setFilterName] = useState("");

  const isFinals = activeTab === "finals";
  const currentData = scheduleData?.[activeTab] || [];

  const filteredSeries = useMemo(() => {
    if (!filterName) return currentData;
    return currentData
      .map((series) => {
        // 過濾賽局
        const filteredGames = series.games.filter((game) =>
          game.groups.some((g) =>
            g.results.some((r) => r.playerName.includes(filterName))
          )
        );
        // 新增：如果搜尋字串符合「組別名稱」，也將此賽次保留下來
        const matchGroupName = series.groupNames?.some((name) =>
          name.includes(filterName)
        );

        return { ...series, games: filteredGames, matchGroupName };
      })
      // 保留有符合對局的賽次，或者名稱符合的賽次
      .filter((series) => series.games.length > 0 || (series as any).matchGroupName);
  }, [currentData, filterName]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-6xl h-[90vh] bg-[#1a1b35] border-2 border-[#dcb562] rounded-xl shadow-[0_0_30px_rgba(220,181,98,0.3)] flex flex-col overflow-hidden">
        {/* Header 區塊 (保持不變) */}
        <div className="flex flex-col md:flex-row justify-between items-center p-5 border-b border-[#dcb562]/30 bg-[#12132b]">
          <h2 className="text-3xl font-black text-[#dcb562] tracking-widest mb-4 md:mb-0 drop-shadow-md">
            🌸 賽程與戰況查詢 🌸
          </h2>
          <div className="flex gap-2">
            {["stage1", "stage2", "finals"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-5 py-2 rounded-lg font-bold transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-[#dcb562] text-[#1a1b35] shadow-[0_0_15px_rgba(220,181,98,0.6)]"
                    : "text-[#dcb562] border border-[#dcb562]/50 hover:bg-[#dcb562]/20"
                }`}
              >
                {tab === "stage1" ? "第一階段" : tab === "stage2" ? "第二階段" : "總決賽"}
              </button>
            ))}
          </div>
        </div>

        {/* 篩選器 (保持不變) */}
        <div className="p-4 bg-[#1a1b35]/80 border-b border-[#dcb562]/20">
          <input
            type="text"
            placeholder="🔍 輸入選手或組別名稱快速尋找對局..."
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="w-full md:w-1/2 px-4 py-3 bg-[#0d0e20] text-[#dcb562] border border-[#dcb562]/50 rounded-lg outline-none focus:border-[#dcb562] focus:ring-1 focus:ring-[#dcb562] placeholder-[#dcb562]/40 text-lg"
          />
        </div>

        {/* 賽程列表 */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1b35] via-[#12132b] to-[#0a0b1a]">
          {filteredSeries.length === 0 ? (
            <div className="text-center text-[#dcb562]/60 mt-32 text-xl font-bold tracking-widest">
              沒有找到符合的賽程資料 🀄
            </div>
          ) : (
            filteredSeries.map((series, sIdx) => {
              const standings = getSeriesStandings(series, isFinals);
              const isStarted = standings.some((g) => g.hasPlayed);
              // 沒開始的話，不特別高亮特定組別做 Winner
              const winner = isStarted && standings.length > 0 ? standings[0] : null;

              return (
                <div key={sIdx} className="mb-10 bg-[#12132b]/80 p-5 rounded-xl border border-[#dcb562]/30 shadow-lg relative">
                  {/* 賽次標題 */}
                  <div className="flex items-center gap-3 mb-6 border-b-2 border-[#dcb562]/50 pb-2">
                    <span className="text-3xl">⚔️</span>
                    <h3 className="text-2xl text-white font-black drop-shadow-md">
                      賽次代號：{series.seriesId}
                    </h3>
                  </div>

                  {/* 👑 賽次對抗隊伍 / 結算看板 */}
                  {standings.length > 0 && (
                    <div className="mb-8 p-5 bg-[#0d0e20]/90 rounded-xl border border-[#dcb562]/40 shadow-[0_0_15px_rgba(220,181,98,0.1)] flex flex-col gap-4">
                      <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-3">
                        <span className="text-2xl animate-bounce">{isStarted ? "👑" : "🎯"}</span>
                        <span className="text-lg text-white font-bold">
                          {isFinals
                            ? isStarted ? "目前領先者：" : "參賽選手名單："
                            : isStarted ? "目前領先組別：" : "對抗組別名單："}
                        </span>
                        {winner && (
                          <span className="text-2xl text-[#dcb562] font-black tracking-widest bg-[#dcb562]/10 px-4 py-1 rounded-md border border-[#dcb562]/30 shadow-inner">
                            {/* 💡 這裡改成 displayGroupName */}
                            {winner.displayGroupName}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {standings.map((grp, idx) => (
                          <div
                            key={idx}
                            className={`p-4 rounded-lg border relative flex flex-col ${
                              idx === 0 && isStarted
                                ? "bg-[#dcb562]/10 border-[#dcb562]/50 shadow-[0_0_10px_rgba(220,181,98,0.2)]"
                                : "bg-white/5 border-white/10"
                            }`}
                          >
                            {isStarted && (
                              <div className={`absolute top-0 right-0 text-xs font-black px-3 py-1 rounded-bl-lg ${
                                idx === 0 ? "bg-[#dcb562] text-[#1a1b35]" : "bg-gray-600 text-white"
                              }`}>
                                TOP {idx + 1}
                              </div>
                            )}

                            <div className="text-[#dcb562] font-black text-xl mb-1">
                              {/* 💡 這裡改成 displayGroupName */}
                              {isFinals ? "決賽選手" : grp.displayGroupName}
                            </div>

                            <div className="text-gray-300 text-sm mb-4">
                              <span className="text-gray-500 text-xs mr-2 border-b border-gray-600 pb-0.5">
                                {isFinals ? "姓名" : "隊員名單"}
                              </span>
                              <div className="mt-1 font-bold leading-relaxed text-white">
                                {grp.players.length > 0 ? (
                                  grp.players.join("、")
                                ) : (
                                  <span className="text-gray-500 text-xs font-normal italic">尚未登錄...</span>
                                )}
                              </div>
                            </div>

                            <div className="flex justify-between items-end border-t border-white/10 pt-3 mt-auto">
                              {!isFinals && (
                                <div className="flex flex-col">
                                  <span className="text-gray-400 text-xs font-bold mb-1">剩餘存活</span>
                                  <span className="text-blue-300 font-black text-2xl drop-shadow-md">
                                    {grp.hasPlayed ? grp.remaining : "-"} <span className="text-sm font-normal">{grp.hasPlayed ? "人" : ""}</span>
                                  </span>
                                </div>
                              )}
                              <div className={`flex flex-col ${isFinals ? "w-full text-center" : "text-right"}`}>
                                <span className="text-gray-400 text-xs font-bold mb-1">總正負分</span>
                                <span className={`font-mono font-black text-2xl drop-shadow-md ${
                                    !grp.hasPlayed ? "text-gray-500" :
                                    grp.displayScore < 0 ? "text-red-400" :
                                    grp.displayScore === 0 ? "text-gray-400" : "text-green-400"
                                  }`}>
                                  {!grp.hasPlayed ? "-" : (grp.displayScore > 0 ? `+${grp.displayScore}` : grp.displayScore)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 各場次詳細戰況 (如果有資料才顯示) */}
                  {series.games.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* 下方 game.map 的部分保留原本的實作，無需修改 */}
                      {series.games.map((game, gIdx) => {
                        const matchPlayers = game.groups
                          .map((g) => g.results[0])
                          .filter((p) => p && p.playerName && p.playerName.trim() !== "");

                        if (matchPlayers.length === 0) return null;

                        return (
                          <div key={gIdx} className="bg-[#1a1b35] rounded-xl border border-[#dcb562]/30 overflow-hidden flex flex-col shadow-md transition-transform hover:-translate-y-1 duration-300">
                             {/* ... 保留原有每場賽局詳細名單的 RENDER ... */}
                             <div className="bg-gradient-to-r from-[#dcb562]/30 to-transparent p-3 flex justify-between items-center border-b border-[#dcb562]/30">
                              <span className="text-[#dcb562] font-black text-xl tracking-wider drop-shadow-md">
                                場次 {game.gameId}
                              </span>
                              {game.magicCard && game.magicCard.trim() !== "" && (
                                <span className="bg-purple-900 text-purple-100 text-sm px-3 py-1.5 rounded-md border border-purple-500 shadow-sm font-bold truncate max-w-[60%]">
                                  ✨ {game.magicCard}
                                </span>
                              )}
                            </div>
                            <div className={`grid ${isFinals ? "grid-cols-10" : "grid-cols-12"} gap-2 px-4 py-2 bg-[#0d0e20] text-[#dcb562]/70 text-sm font-bold`}>
                              <div className="col-span-5 text-left">選手姓名</div>
                              <div className={`${isFinals ? "col-span-3" : "col-span-3"} text-right`}>終局正負分</div>
                              <div className="col-span-2 text-center">名次</div>
                              {!isFinals && <div className="col-span-2 text-center">剩餘人數</div>}
                            </div>
                            <div className="flex flex-col p-2 gap-1">
                              {matchPlayers.map((res, rIdx) => {
                                const isTarget = filterName && res.playerName.includes(filterName);
                                const isEliminated = !isFinals && (res.rank === "3" || res.remaining === "0");
                                return (
                                  <div key={rIdx} className={`grid ${isFinals ? "grid-cols-10" : "grid-cols-12"} gap-2 items-center px-2 py-2.5 rounded-lg transition-colors ${isTarget ? "bg-[#dcb562]/20 border border-[#dcb562]/50" : "bg-transparent hover:bg-white/5"}`}>
                                    <div className={`col-span-5 font-bold text-lg truncate ${isEliminated ? "text-gray-500 line-through" : "text-white"}`}>{res.playerName}</div>
                                    <div className={`col-span-3 text-right font-mono text-lg font-black tracking-wider ${res.scoreInfo.includes("-") ? "text-red-400" : res.scoreInfo === "0" || !res.scoreInfo ? "text-gray-400" : "text-green-400"}`}>{res.scoreInfo}</div>
                                    <div className="col-span-2 text-center text-yellow-500 font-black text-lg">{res.rank}</div>
                                    {!isFinals && <div className="col-span-2 text-center text-blue-300 font-bold text-lg">{res.remaining}</div>}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <button onClick={onClose} className="absolute top-4 right-5 text-[#dcb562] hover:text-white text-4xl z-50 transition-transform hover:rotate-90">
          &times;
        </button>
      </div>
    </div>
  );
};