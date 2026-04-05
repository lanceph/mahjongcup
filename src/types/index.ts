// src/types/index.ts
export interface Player {
  id: string | number;
  name: string;
  title: string;
  desc: string;
  avatar: string;
  fullImg: string;
}

export interface PlayerMatchResult {
  playerName: string;
  scoreInfo: string;
  rank: string;
  remaining: string;
}

export interface MatchGroup {
  groupName: string;
  totalScore: string;
  points: string;
  results: PlayerMatchResult[];
}

export interface MatchGame {
  gameId: string;
  magicCard: string;
  groups: MatchGroup[];
}

export interface MatchSeries {
  seriesId: string;
  groupNames?: string[]; // 新增：用於提取並顯示對抗的組別名稱 (即使尚未有成績)
  games: MatchGame[];
}

export interface TournamentSchedule {
  stage1: MatchSeries[];
  stage2: MatchSeries[];
  finals: MatchSeries[];
}

export interface TournamentData {
  schedule: string;
  rules: string;
  players: Player[];
  scheduleData?: TournamentSchedule;
}