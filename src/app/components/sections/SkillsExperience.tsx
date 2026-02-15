"use client";

import { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SkillsExperience.module.scss";
import { skillCategories, currentlyExploring } from "@/data/portfolio";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { useGpuTier } from "@/app/hooks/useGpuTier";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const gpuTier = useGpuTier();

  // Reduced grid on low tier: 10x5=50 vs 15x8=120
  const gridCols = gpuTier === "low" ? 10 : 15;
  const gridRows = gpuTier === "low" ? 5 : 8;

  const dots = useMemo(
    () => Array.from({ length: gridCols * gridRows }, (_, i) => i),
    [gridCols, gridRows]
  );

  // GSAP scroll reveals for skill categories
  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const categories = section.querySelectorAll(`.${styles.category}`);

      categories.forEach((cat, i) => {
        const label = cat.querySelector(`.${styles.categoryName}`);
        const pills = cat.querySelectorAll(`.${styles.pill}`);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cat,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
          label,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, delay: i * 0.05, ease: "back.out(1.7)" }
        ).fromTo(
          pills,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.04,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Dot grid wave animation (skip on mobile — grid hidden via CSS)
  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches) return;

    const grid = gridRef.current;
    if (!grid) return;

    const dotEls = grid.querySelectorAll(`.${styles.gridDot}`);
    const isLowTier = gpuTier === "low";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Wave stagger reveal from center
            gsap.fromTo(
              dotEls,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 0.25,
                duration: 0.8,
                stagger: {
                  each: 0.03,
                  grid: [gridCols, gridRows],
                  from: "center",
                },
                ease: "elastic.out(1, 0.6)",
              }
            );

            // Subtle looping pulse (skip on low tier — saves 120 infinite tweens)
            if (!isLowTier) {
              gsap.fromTo(
                dotEls,
                { opacity: 0.12, scale: 0.8 },
                {
                  opacity: 0.3,
                  scale: 1.3,
                  duration: 3,
                  stagger: {
                    each: 0.08,
                    grid: [gridCols, gridRows],
                    from: "center",
                  },
                  ease: "sine.inOut",
                  yoyo: true,
                  repeat: -1,
                }
              );
            }

            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(grid);

    return () => observer.disconnect();
  }, [reducedMotion, gpuTier, gridCols, gridRows]);

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Dot grid background */}
      <div ref={gridRef} className={styles.dotGrid} aria-hidden="true">
        {dots.map((i) => (
          <span key={i} className={styles.gridDot} />
        ))}
      </div>

      <span className="section__label">Skills &amp; Tools</span>
      <h2 className="sr-only">Skills &amp; Tools</h2>

      <div className={styles.categories}>
        {skillCategories.map((cat) => (
          <div key={cat.name} className={styles.category}>
            <span className={styles.categoryName}>{cat.name}</span>
            <ul className={styles.pills}>
              {cat.skills.map((skill) => (
                <li key={skill.name} className={styles.pill}>
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className={styles.exploring}>
        Currently exploring: {currentlyExploring}
      </p>
    </section>
  );
}
