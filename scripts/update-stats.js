#!/usr/bin/env node
/**
 * AI stats updater.
 * Usage: npm run update-stats
 *
 * Prompts for each stat value. Press Enter to keep current.
 * Writes to src/data/ai-stats.ts, then commit → Vercel redeploys.
 */

const fs   = require("fs");
const path = require("path");
const rl   = require("readline");

const STATS_FILE = path.join(__dirname, "../src/data/ai-stats.ts");

// ── Read current values ────────────────────────────────────────────
const src = fs.readFileSync(STATS_FILE, "utf8");

// Helper: extract string field value
const str  = (key) => { const m = src.match(new RegExp(`${key}: "(.*?)"`)); return m?.[1] ?? ""; };
// Helper: extract number field value
const num  = (key) => { const m = src.match(new RegExp(`${key}: (\\d+),`)); return m?.[1] ?? "0"; };

const current = {
  lastUpdated:       new Date().toISOString().slice(0, 10),
  totalTokens:       str("totalTokens"),
  sessions:          num("sessions"),
  messages:          str("messages"),
  activeDays:        num("activeDays"),
  longestStreak:     str("longestStreak"),
  peakHour:          str("peakHour"),
  favoriteModel:     str("favoriteModel"),
  tokenMultiplier:   str("tokenMultiplier"),
  tokenMultiplierRef:str("tokenMultiplierRef"),
  wordsDictated:     str("wordsDictated"),
  avgSpeed:          str("avgSpeed"),
  wispStreak:        str("streak"),
  appsUsed:          num("appsUsed"),
};

// ── Model rows ─────────────────────────────────────────────────────
const modelRegex = /\{ name: "(.*?)", pct: ([\d.]+), detail: "(.*?)" \}/g;
const models = [];
let m;
while ((m = modelRegex.exec(src)) !== null) {
  models.push({ name: m[1], pct: parseFloat(m[2]), detail: m[3] });
}

// ── Interactive prompt ─────────────────────────────────────────────
const iface = rl.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q, def) => new Promise((res) =>
  iface.question(`${q} [${def}]: `, (ans) => res(ans.trim() || def))
);

console.log("\n╔══════════════════════════════════════╗");
console.log("║       Waldo Stats Updater ⚡           ║");
console.log("╠══════════════════════════════════════╣");
console.log("║  Press Enter to keep current value   ║");
console.log("╚══════════════════════════════════════╝\n");

(async () => {
  console.log("── Claude stats ──────────────────────");
  const totalTokens       = await ask("Total tokens (e.g. 43.5M)",       current.totalTokens);
  const sessions          = await ask("Sessions",                          current.sessions);
  const messages          = await ask("Messages (e.g. 174k)",             current.messages);
  const activeDays        = await ask("Active days",                       current.activeDays);
  const longestStreak     = await ask("Longest streak (e.g. 20d)",        current.longestStreak);
  const peakHour          = await ask("Peak hour (e.g. 11 AM)",           current.peakHour);
  const favoriteModel     = await ask("Favorite model",                    current.favoriteModel);
  const tokenMultiplier   = await ask("Token multiplier (e.g. 178×)",     current.tokenMultiplier);
  const tokenMultiplierRef= await ask("Token multiplier ref (e.g. Dune)", current.tokenMultiplierRef);

  console.log("\n── Wispr Flow ────────────────────────");
  const wordsDictated = await ask("Words dictated (e.g. 309,529)", current.wordsDictated);
  const avgSpeed      = await ask("Avg speed (e.g. 133wpm)",       current.avgSpeed);
  const wispStreak    = await ask("Daily streak (e.g. 59d)",       current.wispStreak);
  const appsUsed      = await ask("Apps used",                     current.appsUsed);

  console.log("\n── Model breakdown (Enter = keep) ───");
  const updatedModels = [];
  for (const mod of models) {
    const pct    = await ask(`${mod.name} % (e.g. 40.6)`, mod.pct);
    const detail = await ask(`${mod.name} detail`,         mod.detail);
    updatedModels.push({ name: mod.name, pct: parseFloat(pct), detail });
  }

  iface.close();

  // ── Write new file ────────────────────────────────────────────────
  const modelsStr = updatedModels
    .map(({ name, pct, detail }) => `      { name: "${name}", pct: ${pct}, detail: "${detail}" },`)
    .join("\n");

  const output = `/**
 * AI usage stats — single source of truth.
 * Run \`npm run update-stats\` to update these values interactively.
 * Commit the change → Vercel auto-redeploys.
 * Last updated: ${new Date().toISOString().slice(0, 10)}
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
  lastUpdated: "${new Date().toISOString().slice(0, 10)}",
  claude: {
    totalTokens: "${totalTokens}",
    sessions: ${sessions},
    messages: "${messages}",
    activeDays: ${activeDays},
    longestStreak: "${longestStreak}",
    peakHour: "${peakHour}",
    favoriteModel: "${favoriteModel}",
    tokenMultiplier: "${tokenMultiplier}",
    tokenMultiplierRef: "${tokenMultiplierRef}",
    models: [
${modelsStr}
    ],
  },
  wispr: {
    wordsDictated: "${wordsDictated}",
    avgSpeed: "${avgSpeed}",
    streak: "${wispStreak}",
    appsUsed: ${appsUsed},
  },
};

export default aiStats;
`;

  fs.writeFileSync(STATS_FILE, output, "utf8");

  console.log(`\n✓ Stats updated → src/data/ai-stats.ts`);
  console.log(`  Now run: git add src/data/ai-stats.ts && git commit -m "chore: update AI stats" && git push`);
  console.log(`  Vercel will redeploy automatically.\n`);
})();
