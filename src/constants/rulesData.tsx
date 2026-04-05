import { RuleSection } from "../components/RulesModal";

// --- 前方原本的 NewRules 相關元件保持不變 ---
const NewRulesAttention = () => (
  <div className="bg-[#dcb562]/10 p-4 rounded-lg border border-[#dcb562]/30">
    <p className="font-bold text-[#b8860b] mb-2">
      本次新規則主要有三個需要注意：
    </p>
    <ul className="list-disc list-inside space-y-1 ml-2">
      <li>團體賽規則</li>
      <li>魔法卡效果</li>
      <li>
        <span className="text-red-600 font-bold">負分不擊飛</span>
      </li>
    </ul>
  </div>
);

const NewRulesMagicCards = () => (
  <div>
    <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
      <span>🪄</span> 魔法卡制房間設定
    </h4>
    <div className="overflow-x-auto rounded-lg border border-[#dcb562]/40 shadow-sm">
      <table className="min-w-full text-center border-collapse text-sm md:text-base">
        <thead>
          <tr className="bg-[#dcb562] text-white">
            <th className="p-2 border border-[#dcb562]/50">設定項目</th>
            <th className="p-2 border border-[#dcb562]/50">🪄 束縛</th>
            <th className="p-2 border border-[#dcb562]/50">🪄 直覺</th>
            <th className="p-2 border border-[#dcb562]/50">🪄 全知</th>
          </tr>
        </thead>
        <tbody className="bg-white/50">
          <tr>
            <td className="p-2 border border-[#dcb562]/30 font-bold">局數</td>
            <td className="p-2 border border-[#dcb562]/30">半莊</td>
            <td className="p-2 border border-[#dcb562]/30">半莊</td>
            <td className="p-2 border border-[#dcb562]/30">半莊</td>
          </tr>
          <tr className="bg-[#dcb562]/10">
            <td className="p-2 border border-[#dcb562]/30 font-bold">
              長考時間
            </td>
            <td className="p-2 border border-[#dcb562]/30">5+20</td>
            <td className="p-2 border border-[#dcb562]/30">3+5</td>
            <td className="p-2 border border-[#dcb562]/30">5+10</td>
          </tr>
          <tr>
            <td className="p-2 border border-[#dcb562]/30 font-bold">
              起始點數
            </td>
            <td className="p-2 border border-[#dcb562]/30">50000</td>
            <td className="p-2 border border-[#dcb562]/30">50000</td>
            <td className="p-2 border border-[#dcb562]/30">50000</td>
          </tr>
          <tr className="bg-[#dcb562]/10">
            <td className="p-2 border border-[#dcb562]/30 font-bold">
              1位必要點數
            </td>
            <td className="p-2 border border-[#dcb562]/30">55000</td>
            <td className="p-2 border border-[#dcb562]/30">55000</td>
            <td className="p-2 border border-[#dcb562]/30">55000</td>
          </tr>
          <tr>
            <td className="p-2 border border-[#dcb562]/30 font-bold text-red-600">
              擊飛
            </td>
            <td className="p-2 border border-[#dcb562]/30 text-red-600 font-bold">
              關閉
            </td>
            <td className="p-2 border border-[#dcb562]/30 text-red-600 font-bold">
              關閉
            </td>
            <td className="p-2 border border-[#dcb562]/30 text-red-600 font-bold">
              關閉
            </td>
          </tr>
          <tr className="bg-[#dcb562]/10">
            <td className="p-2 border border-[#dcb562]/30 font-bold">番縛</td>
            <td className="p-2 border border-[#dcb562]/30 font-bold text-blue-600">
              二番縛
            </td>
            <td className="p-2 border border-[#dcb562]/30">一番縛</td>
            <td className="p-2 border border-[#dcb562]/30">一番縛</td>
          </tr>
          <tr>
            <td className="p-2 border border-[#dcb562]/30 font-bold">自摸損</td>
            <td className="p-2 border border-[#dcb562]/30">開啟</td>
            <td className="p-2 border border-[#dcb562]/30">開啟</td>
            <td className="p-2 border border-[#dcb562]/30">開啟</td>
          </tr>
          <tr className="bg-[#dcb562]/10">
            <td className="p-2 border border-[#dcb562]/30 font-bold">
              公開手牌
            </td>
            <td className="p-2 border border-[#dcb562]/30">關閉</td>
            <td className="p-2 border border-[#dcb562]/30">關閉</td>
            <td className="p-2 border border-[#dcb562]/30 font-bold text-blue-600">
              開啟
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const NewRulesTeamKO = () => (
  <div>
    <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
      <span>⚔️</span> 團隊 KO 制賽制介紹
    </h4>
    <div className="space-y-4">
      <div className="bg-white/60 p-4 rounded-lg shadow-sm">
        <h5 className="font-bold text-[#b8860b] mb-2">✎ 賽前隊伍討論</h5>
        <ol className="list-decimal list-inside ml-2">
          <li>
            每隊指定其先鋒隊員出賽第一場{" "}
            <span className="text-gray-500 text-sm">(無任何魔法效果)</span>
          </li>
        </ol>
      </div>
      <div className="bg-white/60 p-4 rounded-lg shadow-sm border-l-4 border-blue-400">
        <h5 className="font-bold text-[#b8860b] mb-2">✎ 每場賽局結束</h5>
        <ol className="list-decimal list-inside ml-2 space-y-1">
          <li>根據該局結果淘汰第三名隊伍的上場成員，第一、二名隊伍成員留下</li>
          <li>第二名隊伍可以自由選擇是否切換其他同隊選手上場</li>
          <li>第三名隊伍需推派下一位成員出場</li>
          <li>
            <span className="font-bold text-red-600">
              第三名隊伍決定下場魔法卡效果
            </span>
          </li>
        </ol>
      </div>
      <div className="bg-white/60 p-4 rounded-lg shadow-sm border-l-4 border-red-400">
        <h5 className="font-bold text-[#b8860b] mb-2">✎ 結束條件</h5>
        <ol className="list-decimal list-inside ml-2 space-y-1">
          <li>任一隊伍淘汰三名成員即比賽結束，依據存活人數決定排名順序</li>
          <li>若存活人數相同，則依每場的正負分加總排序</li>
        </ol>
      </div>
    </div>
  </div>
);

const NewRulesContent = () => (
  <div className="flex flex-col gap-6 w-full">
    <NewRulesAttention />
    <div className="w-full">
      <img
        src="/images/new-rule.webp"
        alt="此次賽事三個新規則示意圖"
        className="w-full h-auto object-cover rounded-lg border-2 border-[#dcb562]/50 shadow-sm"
      />
    </div>
    <NewRulesMagicCards />
    <NewRulesTeamKO />
  </div>
);

// 💡 實作：第一階段規則元件
const Stage1Rules = () => (
  <div className="flex flex-col gap-4 w-full">
    <div className="bg-white/60 p-5 rounded-lg shadow-sm border-l-4 border-[#dcb562]">
      <h4 className="font-bold text-xl text-[#b8860b] mb-3 flex items-center gap-2">
        <span>🚩</span> 第一階段 - 團體賽
      </h4>
      <p className="text-[#5c3a21] leading-relaxed mb-4">
        <span className="inline-block bg-[#dcb562]/20 text-[#b8860b] px-2 py-1 rounded text-sm font-bold mb-2">
          依人數動態調整場次
        </span>
        <br />
        已報名人數進行隨機分隊，每隊伍{" "}
        <span className="font-bold text-blue-700">3~4 人</span>，進行團隊 KO
        魔法卡制。
        <br />
        每場團體賽得分：第一名得{" "}
        <span className="font-bold text-red-600">2 積分</span>、第二名得{" "}
        <span className="font-bold text-red-600">1 積分</span>、第三名得{" "}
        <span className="font-bold text-gray-500">0 積分</span>。
      </p>

      <div className="bg-[#dcb562]/10 p-4 rounded-lg border border-[#dcb562]/30">
        <p className="font-bold text-[#b8860b] mb-2">🏆 晉級條件</p>
        <ul className="list-disc list-inside space-y-2 ml-2 text-[#5c3a21] font-medium">
          <li>
            第一名隊伍取{" "}
            <span className="font-black text-red-600 text-lg">3位</span>{" "}
            隊員晉級複賽
          </li>
          <li>
            第二名隊伍取{" "}
            <span className="font-black text-blue-600 text-lg">2位</span>{" "}
            隊員晉級複賽
          </li>
          <li>
            第三名隊伍僅取{" "}
            <span className="font-black text-gray-600 text-lg">1位</span>{" "}
            隊員晉級複賽
          </li>
        </ul>
      </div>
    </div>
  </div>
);

// 💡 實作：第二階段規則元件
const Stage2Rules = () => (
  <div className="flex flex-col gap-4 w-full">
    <div className="bg-white/60 p-5 rounded-lg shadow-sm border-l-4 border-blue-400">
      <h4 className="font-bold text-xl text-[#b8860b] mb-3 flex items-center gap-2">
        <span>⚔️</span> 第二階段 - 複賽
      </h4>
      <p className="text-[#5c3a21] leading-relaxed mb-4">
        <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-bold mb-2">
          依賽況可能有 2~4 場
        </span>
        <br />
        已晉級的 6 名人員進行隨機分隊，每隊伍{" "}
        <span className="font-bold text-blue-700">2 人</span>，進行團隊 KO
        魔法卡制。
        <br />
        每場團體賽得分：第一名得{" "}
        <span className="font-bold text-red-600">2 積分</span>、第二名得{" "}
        <span className="font-bold text-red-600">1 積分</span>、第三名得{" "}
        <span className="font-bold text-gray-500">0 積分</span>。
      </p>

      <div className="bg-[#dcb562]/10 p-4 rounded-lg border border-[#dcb562]/30">
        <p className="font-bold text-[#b8860b] mb-2">🏆 晉級條件</p>
        <ul className="list-disc list-inside space-y-2 ml-2 text-[#5c3a21] font-medium">
          <li>
            第一名隊伍取{" "}
            <span className="font-black text-red-600 text-lg">2位</span>{" "}
            隊員晉級決賽
          </li>
          <li>
            第二名隊伍僅取{" "}
            <span className="font-black text-blue-600 text-lg">1位</span>{" "}
            隊員晉級決賽
          </li>
          <li>
            第三名隊伍{" "}
            <span className="font-black text-gray-500 text-lg">全員淘汰</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

// 💡 實作：決賽規則元件
const FinalsRules = () => (
  <div className="flex flex-col gap-4 w-full">
    <div className="bg-white/60 p-5 rounded-lg shadow-sm border-l-4 border-red-500">
      <h4 className="font-bold text-xl text-red-600 mb-3 flex items-center gap-2">
        <span>👑</span> 總決賽
      </h4>
      <p className="text-[#5c3a21] leading-relaxed mb-4">
        <span className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-bold mb-2">
          進行三場
        </span>
        <br />
        採每人進行 3 場半莊，進行魔法卡制，
        <span className="font-bold text-blue-700">分別三場使用不同效果</span>。
      </p>

      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <p className="font-bold text-red-700 mb-2">🥇 排名結算</p>
        <p className="text-[#5c3a21] font-medium">
          最終依照三場的{" "}
          <span className="font-black text-red-600 text-lg">
            正負分點數相加
          </span>{" "}
          決定最終冠亞軍排名！
        </p>
      </div>
    </div>
  </div>
);

// 💡 匯出規則資料陣列 (已更新對應內容)
export const TOURNAMENT_RULES: RuleSection[] = [
  {
    id: "new-rules",
    title: "此次的新規則",
    content: <NewRulesContent />,
    imageUrl: undefined,
  },
  {
    id: "stage-1",
    title: "第一階段規則",
    content: <Stage1Rules />,
    imageUrl: undefined, // 設為 undefined 讓文字區塊能 100% 滿版，排版會更大器
  },
  {
    id: "stage-2",
    title: "第二階段規則",
    content: <Stage2Rules />,
    imageUrl: undefined,
  },
  {
    id: "finals",
    title: "決賽規則",
    content: <FinalsRules />,
    imageUrl: undefined,
  },
];
