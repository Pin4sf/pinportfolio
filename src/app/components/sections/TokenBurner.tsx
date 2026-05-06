"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Zap } from "lucide-react";
import styles from "./TokenBurner.module.scss";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import aiStats from "@/data/ai-stats";

gsap.registerPlugin(ScrollTrigger);

const { claude, wispr } = aiStats;

const CLAUDE_STATS = [
  { value: claude.totalTokens,      label: "Tokens burned" },
  { value: String(claude.sessions), label: "Sessions" },
  { value: claude.messages,         label: "Messages" },
  { value: String(claude.activeDays), label: "Active days" },
];

const MODELS = claude.models;

const WISPR = [
  { value: wispr.wordsDictated, key: "Words dictated" },
  { value: wispr.avgSpeed,      key: "Avg speed"      },
  { value: wispr.streak,        key: "Daily streak"   },
  { value: String(wispr.appsUsed), key: "Apps used"   },
];

const RESEARCH = [
  {
    tag: "Agent Harness Design",
    title: "Production-grade agent loop architecture",
    desc: "Studied Claude Code internals (1,905 files), Cursor harness patterns, REASONS Canvas (Fowler SPDD), tool error taxonomy, prompt-builder ordering, and circuit breaker close conditions.",
    sources: ["Claude Code", "Cursor", "Fowler SPDD", "Squad Orchestration"],
  },
  {
    tag: "Persistent Agent Memory",
    title: "5-tier memory architecture for AI agents",
    desc: "Deep research into MemGPT, MemPalace (96.6% recall, 170-token wake budget), Zep temporal graphs, Hermes Agent session compression, and KAIROS tick-and-decide patterns.",
    sources: ["MemPalace 28.5k★", "Hermes Agent 38k★", "Zep Graphiti", "MemGPT/Letta"],
  },
  {
    tag: "Agentic Ecosystem",
    title: "16+ production agent systems studied",
    desc: "Reverse-engineered Claude Code, OpenClaw (171k stars), Hermes, NemoClaw (NVIDIA), OpenFang, AtlanClaw, OpenViking, AutoAgent, PicocClaw, Google ADK, Swarms, SmolAgents, and more.",
    sources: ["OpenClaw 171k★", "NemoClaw", "OpenViking 12k★", "AutoResearch"],
  },
  {
    tag: "Agent Self-Evolution",
    title: "Behavioral evolution without identity mutation",
    desc: "Implemented GEPA (ICLR 2026 Oral) — reads execution traces, proposes targeted mutations, evaluates against golden tests. JiuwenClaw feedback-loop pattern for signal-to-evolution pipeline.",
    sources: ["GEPA ICLR 2026", "JiuwenClaw", "OpenHarness", "Claude Code"],
  },
  {
    tag: "RL for Agents",
    title: "Reinforcement learning signals in production loops",
    desc: "Applied RL principles via rule-based signal detection: thumbs, dismissals, corrections feed into confidence-weighted evolution engine. Per-parameter decay, auto-revert on regression.",
    sources: ["RLHF patterns", "DSPy", "Honcho", "Feedback loop design"],
  },
  {
    tag: "Quantum ML",
    title: "Variational circuits & quantum advantage",
    desc: "Exploring quantum-classical hybrid architectures, VQE for combinatorial optimization, and where quantum speedup may intersect with LLM attention mechanisms and biosignal classification.",
    sources: ["Exploring"],
    exploring: true,
  },
];

function buildHeatmap(rows = 7, cols = 26) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => {
      const r = Math.random();
      if (r < 0.25) return 0;
      if (r < 0.5)  return 1;
      if (r < 0.72) return 2;
      if (r < 0.88) return 3;
      return 4;
    })
  );
}

const HEAT_COLORS = [
  "rgba(255,255,255,0.04)",
  "rgba(108,255,141,0.15)",
  "rgba(108,255,141,0.30)",
  "rgba(108,255,141,0.55)",
  "rgba(108,255,141,0.85)",
];

export default function TokenBurner() {
  const sectionRef  = useRef<HTMLElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const barsRef     = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();
  const [animated, setAnimated] = useState(false);
  const heatmap = useRef(buildHeatmap()).current;

  useEffect(() => {
    if (reducedMotion) { setAnimated(true); return; }
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Stat cells counter-bounce in
      if (statsRef.current) {
        gsap.fromTo(
          Array.from(statsRef.current.querySelectorAll("[data-stat]")),
          { y: 24, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "back.out(1.4)",
            scrollTrigger: { trigger: section, start: "top 70%", toggleActions: "play none none none" },
          }
        );
      }

      // Model bars
      ScrollTrigger.create({
        trigger: section,
        start: "top 65%",
        onEnter: () => setAnimated(true),
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="token-burner" className={styles.section}>
      <span className="section__label">Signal</span>

      <div className={styles.inner}>
        {/* ── Header ── */}
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          Token Burner
        </div>
        <h2 className={styles.headline}>AI runs in my veins.</h2>
        <p className={styles.sub}>
          Not a vibe. The receipts. <em>178× more tokens than Dune</em> — and still counting.
        </p>

        {/* ── Claude stat cells ── */}
        <div ref={statsRef} className={styles.statsGrid}>
          {CLAUDE_STATS.map((s) => (
            <div key={s.label} className={styles.statCell} data-stat>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Two-col: model bars + heatmap ── */}
        <div className={styles.twoCol}>
          {/* Model breakdown */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Model breakdown</div>
            {MODELS.map((m, i) => (
              <div key={m.name} className={styles.modelRow}>
                <span className={styles.modelName}>{m.name}</span>
                <div className={styles.modelBarTrack}>
                  <div
                    ref={(el) => { barsRef.current[i] = el; }}
                    className={`${styles.modelBar}${animated ? ` ${styles.animate}` : ""}`}
                    style={{ width: `${m.pct}%` }}
                  />
                </div>
                <span className={styles.modelPct}>{m.pct}%</span>
              </div>
            ))}
          </div>

          {/* Heatmap */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Activity heatmap</div>
            <div className={styles.heatmap}>
              {heatmap.map((row, ri) => (
                <div key={ri} className={styles.heatmapRow}>
                  {row.map((level, ci) => (
                    <div
                      key={ci}
                      className={styles.heatCell}
                      style={{ background: HEAT_COLORS[level], opacity: 0.7 + level * 0.075 }}
                      title={`${level} sessions`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className={styles.heatmapMeta}>
              Longest streak: {claude.longestStreak} · Peak hour: {claude.peakHour} · Fav: {claude.favoriteModel}
            </div>
          </div>
        </div>

        {/* ── Wispr Flow ── */}
        <div className={styles.wispRow}>
          <span className={styles.wispLabel}>Wispr Flow</span>
          {WISPR.map((w, i) => (
            <>
              {i > 0 && <div key={`div-${i}`} className={styles.wispDivider} />}
              <div key={w.key} className={styles.wispStat}>
                <span className={styles.wispValue}>{w.value}</span>
                <span className={styles.wispKey}>{w.key}</span>
              </div>
            </>
          ))}
        </div>

        <div className={styles.badge}>
          <Sparkles size={12} />
          &ldquo;You&apos;ve used ~{claude.tokenMultiplier} more tokens than {claude.tokenMultiplierRef}.&rdquo; — Claude.ai
        </div>

        <div className={styles.divider} />

        {/* ── Research ── */}
        <div className={styles.researchHeader}>
          <h3 className={styles.researchTitle}>What I study.</h3>
          <span className={styles.researchSub}>
            16+ agent systems reverse-engineered · 54,000-word research canon
          </span>
        </div>

        <div className={styles.researchGrid}>
          {RESEARCH.map((r) => (
            <div key={r.tag} className={styles.researchCard}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className={styles.researchCardTag}>{r.tag}</span>
                {r.exploring && (
                  <span className={styles.exploringTag}><Zap size={10} />exploring</span>
                )}
              </div>
              <div className={styles.researchCardTitle}>{r.title}</div>
              <div className={styles.researchCardDesc}>{r.desc}</div>
              <div className={styles.researchCardSources}>
                {r.sources.map((s) => (
                  <span key={s} className={styles.sourceChip}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
