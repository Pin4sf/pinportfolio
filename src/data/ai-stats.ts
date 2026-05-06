/**
 * AI usage stats — single source of truth.
 * Run `npm run update-stats` to update these values interactively.
 * Commit the change → Vercel auto-redeploys.
 * Last updated: 2026-05-06
 */

export interface AiStats {
  lastUpdated: string;
  claude: {
    totalTokens: string;
    sessions: number;
    messages: string;
    activeDays: number;
    longestStreak: string;
    peakHour: string;
    favoriteModel: string;
    tokenMultiplier: string;
    tokenMultiplierRef: string;
    models: { name: string; pct: number; detail: string }[];
  };
  wispr: {
    wordsDictated: string;
    avgSpeed: string;
    streak: string;
    appsUsed: number;
  };
}

const aiStats: AiStats = {
  lastUpdated: "2026-05-06",
  claude: {
    totalTokens: "43.5M",
    sessions: 278,
    messages: "174k",
    activeDays: 85,
    longestStreak: "20d",
    peakHour: "11 AM",
    favoriteModel: "Sonnet 4.6",
    tokenMultiplier: "178×",
    tokenMultiplierRef: "Dune",
    models: [
      { name: "Sonnet 4.6", pct: 40.6, detail: "1.0M in · 16.7M out" },
      { name: "Opus 4.6",   pct: 31.6, detail: "3.6M in · 10.2M out" },
      { name: "Opus 4.7",   pct: 15.3, detail: "137k in · 6.5M out"  },
      { name: "Haiku 4.5",  pct: 10.3, detail: "2.3M in · 2.2M out"  },
    ],
  },
  wispr: {
    wordsDictated: "309,529",
    avgSpeed: "133wpm",
    streak: "59d",
    appsUsed: 52,
  },
};

export default aiStats;
