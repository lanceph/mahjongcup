// src/utils/sheetParser.ts
import Papa from "papaparse";

export const fetchAndParseSheet = async <T>(
  url: string,
  mappingFn: (row: any) => T
): Promise<T[]> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("無法讀取試算表");
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = (results.data as any[])
          .filter((row) => Object.values(row).some((v) => v)) // 過濾完全空白行
          .map(mappingFn);
        resolve(parsedData);
      },
      error: (err: Error) => reject(err),
    });
  });
};

// 讀取二維陣列的通用函式
const fetchGrid = async (url: string): Promise<string[][]> => {
  const response = await fetch(url);
  if (!response.ok) return [];
  const csvText = await response.text();
  return new Promise((resolve) => {
    Papa.parse(csvText, {
      header: false,
      skipEmptyLines: false, // 保留空行以確保座標正確
      complete: (results) => resolve(results.data as string[][]),
    });
  });
};
// 安全取值函式;
const getVal = (grid: string[][], r: number, c: number) => grid[r]?.[c] || "";

// 解析第一階段與第二階段的共用邏輯
const parseGroupStage = (
  grid: string[][],
  seriesStarts: number[],
  gameRowsCount: number,
  totalScoreRowOffset: number,
  pointsRowOffset: number
) => {
  return seriesStarts
    .map((startRow) => {
      const seriesId = getVal(grid, startRow, 0);

      // 新增：提取該賽次的參賽組別名稱
      const groupNames = [2, 6, 10]
        .map((colOffset) => getVal(grid, startRow, colOffset))
        .filter((name) => name && name.trim() !== "");

      const games = Array.from({ length: gameRowsCount })
        .map((_, gameIdx) => {
          const r = startRow + 2 + gameIdx;
          const gameId = getVal(grid, r, 0);
          const magicCard = getVal(grid, r, 1);

          const groups = [2, 6, 10]
            .map((colOffset) => {
              const groupName = getVal(grid, startRow, colOffset);
              return {
                groupName,
                totalScore: getVal(
                  grid,
                  startRow + totalScoreRowOffset,
                  colOffset + 1
                ),
                points: getVal(grid, startRow + pointsRowOffset, colOffset + 2),
                results: [
                  {
                    playerName: getVal(grid, r, colOffset),
                    scoreInfo: getVal(grid, r, colOffset + 1),
                    rank: getVal(grid, r, colOffset + 2),
                    remaining: getVal(grid, r, colOffset + 3),
                  },
                ].filter((res) => res.playerName), // 僅過濾有打過該場的結果
              };
            })
            .filter((g) => g.groupName);

          return { gameId, magicCard, groups };
        })
        .filter((g) => g.gameId);

      // 回傳時多夾帶 groupNames
      return { seriesId, groupNames, games };
    })
    .filter((s) => s.seriesId);
};

// 解析決賽邏輯 (格式不同)
const parseFinals = (grid: string[][]) => {
  const seriesId = getVal(grid, 0, 0);

  const playerCols = [2, 4, 6];

  const groupNames = playerCols
    .map((colOffset) => getVal(grid, 0, colOffset))
    .filter((name) => name && name.trim() !== "");

  const games = Array.from({ length: 3 })
    .map((_, gameIdx) => {
      const r = 2 + gameIdx;
      const gameId = getVal(grid, r, 0);
      const magicCard = getVal(grid, r, 1);

      const groups = playerCols
        .map((colOffset) => {
          const name = getVal(grid, 0, colOffset); // 決賽名字在首列
          return {
            groupName: name,
            totalScore: getVal(grid, 6, colOffset), // 總分列 (Row 6)
            points: "",
            results: [
              {
                playerName: name,
                scoreInfo: getVal(grid, r, colOffset),
                rank: getVal(grid, r, colOffset + 1),
                remaining: "",
              },
            ].filter((res) => res.playerName), // 💡 重要：改用 playerName 判定，確保沒分數時也能顯示名單
          };
        })
        .filter((g) => g.groupName);

      return { gameId, magicCard, groups };
    })
    .filter((g) => g.gameId);

  return [{ seriesId, groupNames, games }];
};

export const fetchAllSchedules = async (urls: {
  stage1: string;
  stage2: string;
  finals: string;
}) => {
  const [grid1, grid2, gridF] = await Promise.all([
    urls.stage1 ? fetchGrid(urls.stage1) : Promise.resolve([]),
    urls.stage2 ? fetchGrid(urls.stage2) : Promise.resolve([]),
    urls.finals ? fetchGrid(urls.finals) : Promise.resolve([]),
  ]);

  return {
    stage1: parseGroupStage(grid1, [0, 12, 24, 36], 7, 10, 10), // 第一階段參數
    stage2: parseGroupStage(grid2, [0, 9, 18], 4, 7, 7), // 第二階段參數
    finals: parseFinals(gridF),
  };
};
