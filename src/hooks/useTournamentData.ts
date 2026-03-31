// src/hooks/useTournamentData.ts
import { useState, useEffect } from "react";
import Papa from "papaparse";
import { TournamentData } from "../types";
import { getCharacterAssets } from "../config/characterAssets";

export const useTournamentData = () => {
  const [data, setData] = useState<TournamentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        setLoading(true);

        const sheetUrl = import.meta.env.VITE_SHEET_URL_PLAYERS;

        if (!sheetUrl) {
          throw new Error(
            "網址是空的！請檢查 .env 檔案或 Vercel 的環境變數設定。"
          );
        }

        const response = await fetch(sheetUrl);
        if (!response.ok)
          throw new Error("無法讀取試算表資料，狀態碼: " + response.status);

        const csvText = await response.text();

        // 💡 修正 2: 在 Papa.parse 的 complete 回呼中處理資料與設定 State
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedPlayers = (results.data as any[])
              .filter((row) => row["名字"] && row["名字"] !== "名字") // 過濾表頭或空行
              .map((row) => {
                const charName = (row["使用角色"] || "").trim();
                const playerName = (row["雀魂ID"] || "").trim();

                const assets = getCharacterAssets(charName, playerName);

                return {
                  id: row["NO."] || String(Math.random()),
                  name: row["名字"],
                  title: row["雀魂ID"] ? `ID: ${row["雀魂ID"]}` : "神秘雀士",
                  desc: row["想說的話"] || "這位選手什麼都沒留下...",
                  avatar: assets.avatar,
                  fullImg: assets.fullImg,
                };
              });

            // 💡 關鍵：在資料解析「完成後」才執行 setData
            setData({
              schedule:
                "預賽階段：報名截止後立即展開，採線上隨機分組。\n總決賽：冰冰盃最高殿堂，將安排專屬賽評進行全程直播！",
              rules:
                "1. 本屆賽事採用【雀魂麻將】標準四人半莊戰規則。\n2. 斷線重連時間依系統預設，若無法連回由 AI 代打。\n3. 嚴禁任何代打、開圖之作弊行為。",
              players: parsedPlayers,
            });

            setLoading(false); // 資料解析完畢，關閉載入狀態
          },
          error: (err: Error) => {
            throw new Error("CSV 解析失敗: " + err.message);
          },
        });
      } catch (err: any) {
        setError(err.message || "資料讀取失敗");
        setLoading(false);
      }
    };

    fetchSheetData();
  }, []);

  return { data, loading, error };
};
