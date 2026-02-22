"use client";

import { useRef, useEffect, useMemo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Timeline.module.scss";
import { timelineData } from "@/data/portfolio";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { useGpuTier } from "@/app/hooks/useGpuTier";
import { Rocket, GraduationCap, Briefcase, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ── Static maps ──

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
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim() || "#6cff8d"
  );
}

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const railInnerRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotYearsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(0);

  const reducedMotion = useReducedMotion();
  const gpuTier = useGpuTier();
  const isLowTier = gpuTier === "low";
  const total = timelineData.length;

  // Pre-resolve all type colors once at mount
  const resolvedColors = useMemo(() => {
    return timelineData.map((entry) =>
      resolveColor(typeColors[entry.type] || "var(--accent)")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Imperative dot state update (no React re-renders) ──
  const updateDotStates = useCallback(
    (newIndex: number) => {
      const prevIndex = activeIndexRef.current;
      if (newIndex === prevIndex) return;
      activeIndexRef.current = newIndex;

      if (reducedMotion) return;

      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        const resolved = resolvedColors[i];
        const yearEl = dotYearsRef.current[i];

        if (i === newIndex) {
          gsap.to(dot, {
            scale: 1,
            opacity: 1,
            boxShadow: isLowTier
              ? "none"
              : `0 0 16px ${resolved}40, 0 0 32px ${resolved}20`,
            duration: 0.4,
            ease: "back.out(1.7)",
            overwrite: true,
          });
          if (yearEl) {
            gsap.to(yearEl, {
              opacity: 1,
              x: 0,
              duration: 0.3,
              ease: "power2.out",
              overwrite: true,
            });
          }
        } else {
          gsap.to(dot, {
            scale: 0.7,
            opacity: 0.4,
            boxShadow: "0 0 0 transparent",
            duration: 0.3,
            ease: "power2.out",
            overwrite: true,
          });
          if (yearEl) {
            gsap.to(yearEl, {
              opacity: 0,
              x: -4,
              duration: 0.2,
              ease: "power2.in",
              overwrite: true,
            });
          }
        }
      });
    },
    [reducedMotion, isLowTier, resolvedColors]
  );

  // ── Position dots to align with chapters ──
  useEffect(() => {
    const railInner = railInnerRef.current;
    if (!railInner) return;

    const positionDots = () => {
      const railRect = railInner.getBoundingClientRect();

      chapterRefs.current.forEach((chapter, i) => {
        const dot = dotsRef.current[i];
        if (!chapter || !dot) return;

        const chapterRect = chapter.getBoundingClientRect();
        // Position dot at the top of each chapter relative to the rail
        const offsetTop = chapterRect.top - railRect.top + 16; // 16px = card padding top
        dot.style.top = `${offsetTop}px`;
      });
    };

    // Initial positioning
    positionDots();

    // Re-position on scroll (throttled via ScrollTrigger)
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: positionDots,
    });

    // Also reposition on resize
    window.addEventListener("resize", positionDots);

    return () => {
      st.kill();
      window.removeEventListener("resize", positionDots);
    };
  }, []);

  // ── Line growth (scrub) + active state tracking (IntersectionObserver) ──
  useEffect(() => {
    const section = sectionRef.current;
    const lineFill = lineFillRef.current;
    if (!section || !lineFill) return;

    let ctx: gsap.Context | undefined;

    if (!reducedMotion) {
      ctx = gsap.context(() => {
        gsap.fromTo(
          lineFill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 0.5,
            },
          }
        );
      }, section);
    }

    // Active dot tracking via IntersectionObserver
    const observers: IntersectionObserver[] = [];
    chapterRefs.current.forEach((chapter, i) => {
      if (!chapter) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            updateDotStates(i);
          }
        },
        {
          root: null,
          rootMargin: "-40% 0px -40% 0px",
          threshold: 0,
        }
      );

      observer.observe(chapter);
      observers.push(observer);
    });

    return () => {
      ctx?.revert();
      observers.forEach((obs) => obs.disconnect());
    };
  }, [reducedMotion, updateDotStates]);

  // ── Heading reveal ──
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const heading = section.querySelector(`.${styles.heading}`);
      const label = section.querySelector(".section__label");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      if (label) {
        tl.fromTo(
          label,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          0
        );
      }

      if (heading) {
        tl.fromTo(
          heading,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          0.1
        );
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  // ── Card reveal animations ──
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const ctx = gsap.context(() => {
      chapterRefs.current.forEach((chapter, i) => {
        if (!chapter) return;
        const card = cardsRef.current[i];
        if (!card) return;

        if (isMobile) {
          // Mobile: simple fade-up
          gsap.fromTo(
            card,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: chapter,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
          return;
        }

        // Desktop: clip-path reveal + children stagger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: chapter,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        if (isLowTier) {
          // Low tier: simple fade + y
          tl.fromTo(
            card,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
            0
          );
        } else {
          // Clip-path left-to-right reveal
          tl.fromTo(
            card,
            { clipPath: "inset(0 0 0 100%)", opacity: 0 },
            {
              clipPath: "inset(0 0 0 0%)",
              opacity: 1,
              duration: 1,
              ease: "power4.inOut",
            },
            0
          );

          // Children stagger
          const children = card.children;
          if (children.length) {
            tl.fromTo(
              Array.from(children),
              { y: 12, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.06,
                ease: "power3.out",
              },
              0.35
            );
          }
        }
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, isLowTier]);

  // ── Magnetic hover on cards (desktop, mid/high tier only) ──
  useEffect(() => {
    if (reducedMotion || isLowTier) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    const handleMouseMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 4;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 3;

      gsap.to(card, {
        x,
        y,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = (e: MouseEvent) => {
      gsap.to(e.currentTarget as HTMLElement, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.4)",
        overwrite: true,
      });
    };

    cards.forEach((card) => {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [reducedMotion, isLowTier]);

  // ── Initialize first dot as active ──
  useEffect(() => {
    const firstDot = dotsRef.current[0];
    const firstYear = dotYearsRef.current[0];
    if (firstDot) {
      gsap.set(firstDot, { scale: 1, opacity: 1 });
      if (!isLowTier && resolvedColors[0]) {
        const c = resolvedColors[0];
        gsap.set(firstDot, {
          boxShadow: `0 0 16px ${c}40, 0 0 32px ${c}20`,
        });
      }
    }
    if (firstYear) {
      gsap.set(firstYear, { opacity: 1, x: 0 });
    }
  }, [isLowTier, resolvedColors]);

  return (
    <section ref={sectionRef} id="experience" className={styles.section}>
      {/* Background marquee */}
      <div
        className="marquee"
        style={{ top: "50%", transform: "translateY(-50%)" }}
        aria-hidden="true"
      >
        <div className="marquee__inner">
          <span className="marquee__text marquee__text--giant">JOURNEY</span>
          <span className="marquee__text marquee__text--giant">JOURNEY</span>
          <span className="marquee__text marquee__text--giant">JOURNEY</span>
          <span className="marquee__text marquee__text--giant">JOURNEY</span>
        </div>
      </div>

      {/* Section header */}
      <div className={styles.header}>
        <span className="section__label">Experience</span>
        <h2 className={styles.heading}>Timeline</h2>
      </div>

      {/* Two-column scrollytelling container */}
      <div className={styles.container}>
        {/* LEFT: Sticky rail */}
        <div className={styles.rail}>
          <div ref={railInnerRef} className={styles.railInner}>
            {/* Vertical line */}
            <div className={styles.line}>
              <div ref={lineFillRef} className={styles.lineFill} />
            </div>

            {/* Navigation dots */}
            {timelineData.map((entry, i) => {
              const Icon = typeIcons[entry.type] || Briefcase;
              const color = typeColors[entry.type] || "var(--accent)";

              return (
                <div
                  key={`dot-${i}`}
                  ref={(el) => {
                    dotsRef.current[i] = el;
                  }}
                  className={styles.dot}
                  style={{ borderColor: color }}
                >
                  <Icon size={14} style={{ color }} />
                  <span
                    ref={(el) => {
                      dotYearsRef.current[i] = el;
                    }}
                    className={styles.dotYear}
                    style={{ color }}
                  >
                    {entry.year}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Scrolling chapter cards */}
        <div className={styles.chapters}>
          {timelineData.map((entry, i) => {
            const Icon = typeIcons[entry.type] || Briefcase;
            const color = typeColors[entry.type] || "var(--accent)";

            return (
              <div
                key={`${entry.year}-${entry.organization}`}
                ref={(el) => {
                  chapterRefs.current[i] = el;
                }}
                className={styles.chapter}
              >
                {/* Mobile-only inline dot */}
                <div
                  className={styles.mobileDot}
                  style={{ borderColor: color }}
                >
                  <Icon size={12} style={{ color }} />
                </div>

                {/* Card */}
                <div
                  ref={(el) => {
                    cardsRef.current[i] = el;
                  }}
                  className={styles.card}
                  style={{ borderLeftColor: color }}
                >
                  <div className={styles.cardHeader}>
                    <span className={styles.year} style={{ color }}>
                      {entry.dateRange || entry.year}
                    </span>
                    <span className={styles.typeBadge} style={{ color }}>
                      {typeLabels[entry.type]}
                    </span>
                  </div>

                  <h3 className={styles.title}>{entry.title}</h3>

                  <span className={styles.org}>{entry.organization}</span>

                  <p className={styles.description}>{entry.description}</p>

                  {entry.tags && entry.tags.length > 0 && (
                    <div className={styles.tags}>
                      {entry.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
