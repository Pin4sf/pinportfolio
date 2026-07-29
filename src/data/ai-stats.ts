/**
 * AI usage snapshots — single source of truth.
 * Provider figures stay separate so the portfolio does not imply a false total.
 * Last updated: 2026-07-29
 */

export interface AiStats {
  lastUpdated: string;
  claude: {
    totalTokens: string;
  };
  codex: {
    totalTokens: string;
    peakTokens: string;
    longestChat: string;
    currentStreak: string;
    longestStreak: string;
  };
  wispr: {
    wordsDictated: string;
    avgSpeed: string;
    streak: string;
    appsUsed: number;
  };
}

const aiStats: AiStats = {
  lastUpdated: "2026-07-29",
  claude: {
    totalTokens: "43.5M",
  },
  codex: {
    totalTokens: "10.1B",
    peakTokens: "1B",
    longestChat: "5h 59m",
    currentStreak: "59d",
    longestStreak: "59d",
  },
  wispr: {
    wordsDictated: "4,73,757",
    avgSpeed: "133wpm",
    streak: "59d",
    appsUsed: 52,
  },
};

export default aiStats;
