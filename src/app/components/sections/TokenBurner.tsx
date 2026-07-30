"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Zap } from "lucide-react";
import aiStats from "@/data/ai-stats";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import styles from "./TokenBurner.module.scss";

gsap.registerPlugin(ScrollTrigger);

const { claude, codex, wispr } = aiStats;

const USAGE_STATS = [
  { value: codex.totalTokens, label: "Codex lifetime" },
  { value: claude.totalTokens, label: "Claude tracked" },
  { value: codex.peakTokens, label: "Codex peak" },
  { value: codex.longestChat, label: "Longest Codex chat" },
  { value: codex.currentStreak, label: "Codex current streak" },
  { value: codex.longestStreak, label: "Codex longest streak" },
];

const WISPR = [
  { value: wispr.wordsDictated, key: "Words dictated" },
  { value: wispr.avgSpeed, key: "Avg speed" },
  { value: wispr.streak, key: "Daily streak" },
  { value: String(wispr.appsUsed), key: "Apps used" },
];

const RESEARCH = [
  {
    tag: "Physical AI",
    title: "Consumer bodies for one continuous agent",
    desc: "I’m interested in the forms a personal agent could inhabit—a desk object, wearable, home device, and eventually a robot—without each becoming another disconnected assistant.",
    sources: ["Bodies for AI", "Human-centered robotics", "Permission systems"],
    exploring: true,
  },
  {
    tag: "Industry 4.0",
    title: "Intelligence that crosses into real systems",
    desc: "My Smart Manufacturing background keeps pulling me toward the seam between software, sensing, mechatronics, production systems, and the physical consequences of automation.",
    sources: ["Smart manufacturing", "Cyber-physical systems", "Mechatronics"],
  },
  {
    tag: "Quantum + AI",
    title: "Computation beyond today’s defaults",
    desc: "I’m exploring where quantum-classical systems may become useful for optimization, simulation, learning, and model architectures—without treating speculative advantage as a shipped fact.",
    sources: ["Hybrid systems", "Optimization", "Model architecture"],
    exploring: true,
  },
  {
    tag: "Personal Agents",
    title: "The person behind the task",
    desc: "I study how context, commitments, capacity, corrections, and verified outcomes can make agents care about the person—not only the current prompt.",
    sources: ["Waldo", "Human-agent systems", "Outcome verification"],
  },
  {
    tag: "Agent Infrastructure",
    title: "Durable work with explicit authority",
    desc: "Resumable runs, typed tools, permissions, delivery, memory composition, provenance, and recovery are the foundations beneath trustworthy agent experiences.",
    sources: ["Kennel", "Durable harnesses", "Provider adapters"],
  },
  {
    tag: "Model Internals",
    title: "Understanding systems by rebuilding them",
    desc: "From multilingual data curation to implementing Qwen3 Mixture-of-Experts from scratch, I learn best by tracing routing, attention, caching, and inference all the way down.",
    sources: ["Qwen3 MoE", "Project EKA", "Eka Curator"],
  },
];

export default function TokenBurner() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    if (!section || !statsRef.current) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        Array.from(statsRef.current?.querySelectorAll("[data-stat]") ?? []),
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        },
      );
    }, section);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="token-burner" className={styles.section}>
      <span className="section__label">Signal</span>

      <div className={styles.inner}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          Token Burner
        </div>
        <h2 className={styles.headline}>AI runs in my veins.</h2>

        <div ref={statsRef} className={styles.statsGrid}>
          {USAGE_STATS.map((stat) => (
            <div key={stat.label} className={styles.statCell} data-stat>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.wispRow}>
          <span className={styles.wispLabel}>Wispr Flow</span>
          {WISPR.map((stat, index) => (
            <div key={stat.key} className={styles.wispGroup}>
              {index > 0 && <div className={styles.wispDivider} />}
              <div className={styles.wispStat}>
                <span className={styles.wispValue}>{stat.value}</span>
                <span className={styles.wispKey}>{stat.key}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.badge}>
          <Sparkles size={12} aria-hidden="true" />
          10.1B Codex lifetime · 43.5M Claude tracked ·{" "}
          <time dateTime={aiStats.lastUpdated}>July 29, 2026</time>
        </div>

        <div className={styles.divider} />

        <div className={styles.researchHeader}>
          <h3 className={styles.researchTitle}>What I’m interested in.</h3>
          <span className={styles.researchSub}>
            Physical AI · Industry 4.0 · Quantum + AI
          </span>
        </div>

        <div className={styles.researchGrid}>
          {RESEARCH.map((research) => (
            <article key={research.tag} className={styles.researchCard}>
              <div className={styles.researchCardHeader}>
                <span className={styles.researchCardTag}>{research.tag}</span>
                {research.exploring && (
                  <span className={styles.exploringTag}>
                    <Zap size={10} aria-hidden="true" />
                    exploring
                  </span>
                )}
              </div>
              <h4 className={styles.researchCardTitle}>{research.title}</h4>
              <p className={styles.researchCardDesc}>{research.desc}</p>
              <div className={styles.researchCardSources}>
                {research.sources.map((source) => (
                  <span key={source} className={styles.sourceChip}>
                    {source}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
