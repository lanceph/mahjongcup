// src/context/TournamentContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
// 💡 修正 1：改用 * as Papa 避免缺少 Default Export 的編譯錯誤
import * as Papa from "papaparse";
import { TournamentData } from "../types";
import { getCharacterAssets } from "../config/characterAssets";
import { fetchAllSchedules } from "../utils/sheetParser";

interface TournamentContextType {
  data: TournamentData | null;
  loading: boolean;
  error: string | null;
}

const TournamentContext = createContext<TournamentContextType | undefined>(
  undefined
);

export const TournamentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<TournamentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllSheets = async () => {
      try {
        setLoading(true);

        const stage1Url = import.meta.env.VITE_SHEET_URL_STAGE1_SCHEDULE || "";
        const stage2Url = import.meta.env.VITE_SHEET_URL_STAGE2_SCHEDULE || "";
        const finalsUrl = import.meta.env.VITE_SHEET_URL_FINALS_SCHEDULE || "";

        const scheduleData = await fetchAllSchedules({
          stage1: stage1Url,
          stage2: stage2Url,
          finals: finalsUrl,
        });

        const playerSheetUrl = import.meta.env.VITE_SHEET_URL_PLAYERS;
        if (!playerSheetUrl) {
          throw new Error(
            "網址是空的！請檢查 .env 檔案與 Vite 伺服器是否重啟。"
          );
        }

        const response = await fetch(playerSheetUrl);

        if (!response.ok)
          throw new Error("無法讀取試算表資料，狀態碼: " + response.status);

        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedPlayers = (results.data as any[])
              .filter(
                (row: any) =>
                  row["名字"] &&
                  String(row["名字"]).trim() !== "" &&
                  row["名字"] !== "名字"
              )
              .map((row: any) => {
                const charNameFromSheet = (row["使用角色"] || "").trim();
                const playerNameFromSheet = (row["雀魂ID"] || "").trim();
                const assets = getCharacterAssets(
                  charNameFromSheet,
                  playerNameFromSheet
                );
                return {
                  id: row["NO."] || String(Math.random()),
                  name: row["名字"],
                  title: row["雀魂ID"] ? `ID: ${row["雀魂ID"]}` : "神秘雀士",
                  desc: row["想說的話"] || "這位選手什麼都沒留下...",
                  avatar: assets.avatar,
                  fullImg: assets.fullImg,
                };
              });

            setData({
              schedule: "請點擊上方頁籤查看詳細賽況",
              rules:
                "1. 本屆賽事採用【雀魂麻將】標準四人半莊戰規則。\n2. 斷線重連時間依系統預設，若無法連回由 AI 代打。\n3. 嚴禁任何代打、開圖之作弊行為。",
              players: parsedPlayers,
              scheduleData: scheduleData,
            });
            setLoading(false);
          },
        });
      } catch (err: any) {
        setError(err.message || "發生未知錯誤");
        setLoading(false);
      }
    };
    fetchAllSheets();
  }, []);

  return (
    <TournamentContext.Provider value={{ data, loading, error }}>
      {children}
    </TournamentContext.Provider>
  );
};

export const useTournament = () => {
  const context = useContext(TournamentContext);
  if (context === undefined)
    throw new Error("useTournament 必須在 TournamentProvider 內使用");
  return context;
};
