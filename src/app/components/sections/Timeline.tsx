"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Timeline.module.scss";
import { timelineData } from "@/data/portfolio";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { Rocket, GraduationCap, Briefcase, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const typeIcons: Record<string, LucideIcon> = {
  startup: Rocket,
  education: GraduationCap,
  work: Briefcase,
  achievement: Trophy,
};

const typeColors: Record<string, string> = {
  startup: "var(--accent)",
  education: "var(--accent-warm)",
  work: "#6c9bff",
  achievement: "#ff6cb4",
};

const typeLabels: Record<string, string> = {
  startup: "Startup",
  education: "Education",
  work: "Work",
  achievement: "Achievement",
};

function resolveColor(color: string): string {
  if (!color.startsWith("var(")) return color;
  const varName = color.slice(4, -1);
  if (typeof document === "undefined") return "#6cff8d";
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || "#6cff8d";
}

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const total = timelineData.length;

  // ── Drag state refs ──
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const velocity = useRef(0);
  const lastDragX = useRef(0);
  const lastDragTime = useRef(0);
  const momentumRaf = useRef<number>(0);
  const hasInteracted = useRef(false);

  // ── Magnetic hover (desktop only, 3px max — disabled during drag) ──
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    if (reducedMotion || isDragging.current) return;
    const card = cardsRef.current[idx];
    if (!card || window.matchMedia("(pointer: coarse)").matches) return;

    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 4;

    gsap.to(card, { x, y, duration: 0.3, ease: "power2.out", overwrite: "auto" });
  }, [reducedMotion]);

  const handleMouseLeave = useCallback((idx: number) => {
    const card = cardsRef.current[idx];
    if (!card) return;
    gsap.to(card, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)", overwrite: "auto" });
  }, []);

  // ── Drag-to-scroll ──
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const dismissHint = () => {
      if (!hasInteracted.current) {
        hasInteracted.current = true;
        setShowHint(false);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      isDragging.current = true;
      dragStartX.current = e.clientX;
      dragStartScroll.current = window.scrollY;
      lastDragX.current = e.clientX;
      lastDragTime.current = Date.now();
      velocity.current = 0;
      cancelAnimationFrame(momentumRaf.current);
      dismissHint();

      track.classList.add(styles.dragging);
      track.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;

      const now = Date.now();
      const dt = now - lastDragTime.current;
      const dx = e.clientX - lastDragX.current;

      if (dt > 0) {
        velocity.current = dx / dt;
      }

      lastDragX.current = e.clientX;
      lastDragTime.current = now;

      const totalDx = e.clientX - dragStartX.current;
      window.scrollTo({ top: dragStartScroll.current - totalDx, behavior: "instant" as ScrollBehavior });
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      track.classList.remove(styles.dragging);
      track.releasePointerCapture(e.pointerId);

      let v = -velocity.current * 1000;
      const friction = 0.95;
      const minVelocity = 0.5;

      const step = () => {
        if (Math.abs(v) < minVelocity) return;
        window.scrollBy({ top: v / 60, behavior: "instant" as ScrollBehavior });
        v *= friction;
        momentumRaf.current = requestAnimationFrame(step);
      };

      if (Math.abs(v) > 50) {
        momentumRaf.current = requestAnimationFrame(step);
      }
    };

    track.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Auto-dismiss hint after 4s
    const hintTimer = setTimeout(dismissHint, 4000);

    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      cancelAnimationFrame(momentumRaf.current);
      clearTimeout(hintTimer);
    };
  }, []);

  // ── Main horizontal scroll + animations ──
  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const scrollWidth = track.scrollWidth - window.innerWidth;

      const st = gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.8,
          end: () => `+=${scrollWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (total - 1));
            setActiveIndex(idx);
          },
        },
      });

      // ── Line grows with scroll ──
      const line = lineRef.current;
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              scrub: 0.8,
              start: "top top",
              end: () => `+=${scrollWidth}`,
            },
          }
        );
      }

      // ── Per-entry animations (dot + connector + card in single ST each) ──
      const entries = track.querySelectorAll(`.${styles.entry}`);
      entries.forEach((entry, i) => {
        const dot = entry.querySelector(`.${styles.dot}`);
        const conn = entry.querySelector(`.${styles.connector}`);
        const card = entry.querySelector(`.${styles.card}`);
        if (!dot || !card) return;

        const color = typeColors[timelineData[i]?.type] || "var(--accent)";
        const resolved = resolveColor(color);
        const isAbove = i % 2 === 0;

        // Initial states
        gsap.set(dot, { scale: 0.6, opacity: 0.3 });
        if (conn) gsap.set(conn, { opacity: 0 });

        // Combined dot + connector + glow in single ScrollTrigger
        const dotTl = gsap.timeline({
          scrollTrigger: {
            trigger: entry,
            containerAnimation: st,
            start: "left 90%",
            toggleActions: "play none none reverse",
          },
        });

        dotTl.to(dot, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }, 0);
        dotTl.to(dot, {
          boxShadow: `0 0 20px ${resolved}40, 0 0 40px ${resolved}20`,
          duration: 0.6,
          ease: "power2.out",
        }, 0);
        if (conn) {
          dotTl.to(conn, { opacity: 0.3, duration: 0.5, ease: "power2.out" }, 0);
        }

        // Card clip-path reveal + content stagger in single ScrollTrigger
        const fromClip = isAbove ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)";
        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            containerAnimation: st,
            start: "left 90%",
            toggleActions: "play none none none",
          },
        });

        cardTl.fromTo(card, { clipPath: fromClip, opacity: 0 }, {
          clipPath: "inset(0 0 0 0)",
          opacity: 1,
          duration: 0.8,
          ease: "power4.inOut",
        }, 0);

        const children = card.children;
        if (children.length) {
          cardTl.fromTo(children,
            { y: isAbove ? -12 : 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
            0.15
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, total]);

  return (
    <section ref={sectionRef} id="experience" className={styles.section}>
      {/* Background marquee */}
      <div className="marquee" style={{ top: "50%", transform: "translateY(-50%)" }}>
        <div className="marquee__inner">
          <span className="marquee__text marquee__text--giant">JOURNEY</span>
          <span className="marquee__text marquee__text--giant">JOURNEY</span>
          <span className="marquee__text marquee__text--giant">JOURNEY</span>
          <span className="marquee__text marquee__text--giant">JOURNEY</span>
        </div>
      </div>

      <div className={styles.header}>
        <span className="section__label">Experience</span>
        <h2 className={styles.heading}>Timeline</h2>
      </div>

      <div ref={trackRef} className={styles.track}>
        <div ref={lineRef} className={styles.line} />

        {timelineData.map((entry, i) => {
          const Icon = typeIcons[entry.type] || Briefcase;
          const color = typeColors[entry.type] || "var(--accent)";
          const isAbove = i % 2 === 0;

          return (
            <div
              key={`${entry.year}-${entry.organization}`}
              className={`${styles.entry} ${isAbove ? styles.entryAbove : styles.entryBelow}`}
            >
              {/* Dot — always grid row 3 */}
              <div className={styles.dot} style={{ borderColor: color }}>
                <Icon size={14} style={{ color }} />
              </div>

              {/* Connector stem */}
              <div className={styles.connector} style={{ background: color }} />

              {/* Card */}
              <div
                ref={(el) => { cardsRef.current[i] = el; }}
                className={styles.card}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={() => handleMouseLeave(i)}
              >
                <div className={styles.accentLine} style={{ background: color }} />
                <div className={styles.cardHeader}>
                  <span className={styles.year} style={{ color }}>{entry.year}</span>
                  <span className={styles.typeBadge} style={{ color }}>{typeLabels[entry.type]}</span>
                </div>
                <h3 className={styles.title}>{entry.title}</h3>
                <span className={styles.org}>{entry.organization}</span>
                <p className={styles.description}>{entry.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Drag hint */}
      <div className={`${styles.dragHint} ${!showHint ? styles.dragHintHidden : ""}`}>
        <span className={styles.dragHintArrow}>&larr;</span>
        <span>Drag to explore</span>
        <span className={styles.dragHintArrow}>&rarr;</span>
      </div>

      {/* Progress indicator */}
      <div className={styles.progress}>
        <span className={styles.progressCurrent}>{String(activeIndex + 1).padStart(2, "0")}</span>
        <span className={styles.progressDivider}>/</span>
        <span className={styles.progressTotal}>{String(total).padStart(2, "0")}</span>

        <div className={styles.progressDots}>
          {timelineData.map((_, i) => (
            <div
              key={i}
              className={`${styles.progressDot} ${i === activeIndex ? styles.progressDotActive : ""} ${i < activeIndex ? styles.progressDotPassed : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
