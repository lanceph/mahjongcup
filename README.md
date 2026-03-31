Markdown

# 🀄 Mahjong Cup (麻將賽事戰況查詢系統)

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

這是一個專為麻將賽事打造的「遊戲化」戰況查詢 Web 應用程式。透過無後端 (Serverless) 架構，直接橋接 Google Sheets 作為資料庫，提供參賽選手即時的賽程戰況、選手名單與規則查閱功能。

## ✨ 核心功能 (Features)

- **🏆 遊戲化戰況看板**：告別枯燥的表格，提供具備電競質感的對戰卡片，自動計算存活人數、正負分與賽事 TOP 1 領先者。
- **⚡ 即時資料同步**：透過解析 Google Sheets 匯出的 CSV，實現零後端伺服器的即時賽況更新。
- **🔍 選手個人戰績篩選**：內建過濾器，選手輸入名字即可快速高亮並找出自己的所有對戰場次與魔法卡效果。
- **📱 完美響應式設計 (RWD)**：不論是電腦大螢幕還是手機端，皆能提供順暢的觸控與視覺體驗。
- **🌸 動態主題與特效**：專屬的東方奇幻/麻將風格 UI，包含動態背景、毛玻璃效果與精美的選手 Avatar。

## 🛠️ 技術棧 (Tech Stack)

- **前端框架**：React 18 + TypeScript
- **建置工具**：Vite
- **樣式重置與設計**：Tailwind CSS
- **資料解析**：PapaParse (CSV 解析器)
- **套件管理**：pnpm

## 🚀 本地開發指南 (Getting Started)

### 1. 系統需求 (Prerequisites)
- [Node.js](https://nodejs.org/) (建議 v18 以上)
- [pnpm](https://pnpm.io/) (推薦使用的套件管理員)

### 2. 安裝專案 (Installation)

```bash
# 複製專案到本地
git clone [https://github.com/你的帳號/mahjongcup.git](https://github.com/你的帳號/mahjongcup.git)

# 進入專案目錄
cd mahjongcup

# 安裝依賴套件
pnpm install
```

### 3. 環境變數設定 (Environment Variables)

本專案高度依賴 Google Sheets 提供的資料。請在專案根目錄建立一個 .env 檔案（請勿將此檔案提交到版本控制系統），並填入以下環境變數：
程式碼片段
```
# 選手名單 CSV 發布網址
VITE_SHEET_URL_PLAYERS="[https://docs.google.com/spreadsheets/d/你的ID/gviz/tq?tqx=out:csv&sheet=出場選手](https://docs.google.com/spreadsheets/d/你的ID/gviz/tq?tqx=out:csv&sheet=出場選手)"

# --- 第一階段 ---
VITE_SHEET_URL_STAGE1_SCHEDULE="[https://docs.google.com/spreadsheets/d/你的ID/export?format=csv&gid=第一階段賽程分頁ID](https://docs.google.com/spreadsheets/d/你的ID/export?format=csv&gid=第一階段賽程分頁ID)"

# --- 第二階段 ---
VITE_SHEET_URL_STAGE2_SCHEDULE="[https://docs.google.com/spreadsheets/d/你的ID/export?format=csv&gid=第二階段賽程分頁ID](https://docs.google.com/spreadsheets/d/你的ID/export?format=csv&gid=第二階段賽程分頁ID)"

# --- 決賽 ---
VITE_SHEET_URL_FINALS_SCHEDULE="[https://docs.google.com/spreadsheets/d/你的ID/export?format=csv&gid=決賽賽程分頁ID](https://docs.google.com/spreadsheets/d/你的ID/export?format=csv&gid=決賽賽程分頁ID)"

    💡 提示：確保你的 Google Sheet 權限已設定為「知道連結的人皆可檢視」，系統才能順利透過 API 抓取 CSV 資料。
```
### 4. 啟動開發伺服器 (Run Development Server)
```Bash

pnpm run dev
```
伺服器啟動後，請開啟瀏覽器前往 http://localhost:5173/ 預覽應用程式。
#### 📂 專案結構 (Project Structure)
```
mahjongcup/
├── public/                 # 靜態資源 (Images, Icons)
│   └── images/
│       ├── avatars/        # 選手大頭貼
│       └── full/           # 選手全身立繪
├── src/
│   ├── components/         # 共用 React UI 元件 (PlayerModal, ScheduleModal, RulesModal)
│   ├── config/             # 全域設定與映射表 (如角色圖片對應)
│   ├── constants/          # 靜態常數資料 (如大會規則)
│   ├── context/            # React Context 狀態管理 (TournamentContext)
│   ├── hooks/              # Custom Hooks
│   ├── types/              # TypeScript 型別定義
│   ├── utils/              # 工具函式 (Google Sheets 解析邏輯 sheetParser.ts)
│   ├── App.tsx             # 應用程式主入口與版面佈局
│   ├── main.tsx            # React 掛載點
│   └── index.css           # 全域樣式與 Tailwind 指令
├── .env.example            # 環境變數範例檔
├── package.json            # 專案依賴設定
├── tailwind.config.js      # Tailwind CSS 設定檔
├── tsconfig.json           # TypeScript 設定檔
└── vite.config.ts          # Vite 建置設定
```
#### 📜 腳本指令 (Available Scripts)
```
    pnpm run dev: 啟動本地開發伺服器。

    pnpm run build: 進行 TypeScript 型別檢查並打包出 Production Ready 的靜態檔案至 dist 資料夾。

    pnpm run preview: 在本地端預覽打包後的 Production 檔案。

    pnpm run lint: 執行 ESLint 語法檢查。
```
#### 🛡️ 資料安全與版本控制規範
```
    .env 檔案內包含 API URLs，絕對不可被提交 (Commit) 到遠端數據庫。請確保 .gitignore 設定正確生效。

    遵循 Conventional Commits 規範進行 Commit 訊息撰寫 (例如: feat: ..., fix: ..., refactor: ...)。
```
Designed & Developed for Mahjong Tournament Enthusiasts 🀄
