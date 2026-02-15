"use client";

import { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import anime from "animejs";
import styles from "./SkillsExperience.module.scss";
import { skillCategories, currentlyExploring } from "@/data/portfolio";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const GRID_COLS = 15;
const GRID_ROWS = 8;

export default function SkillsExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const dots = useMemo(
    () => Array.from({ length: GRID_COLS * GRID_ROWS }, (_, i) => i),
    []
  );

  // GSAP scroll reveals for skill categories
  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

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
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, delay: i * 0.05, ease: "power3.out" }
      ).fromTo(
        pills,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power3.out",
        },
        "-=0.2"
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [reducedMotion]);

  // anime.js dot grid wave animation
  useEffect(() => {
    if (reducedMotion) return;

    const grid = gridRef.current;
    if (!grid) return;

    const dotEls = grid.querySelectorAll(`.${styles.gridDot}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Wave stagger reveal from center
            anime({
              targets: dotEls,
              scale: [0, 1],
              opacity: [0, 0.25],
              delay: anime.stagger(30, {
                grid: [GRID_COLS, GRID_ROWS],
                from: "center",
              }),
              duration: 800,
              easing: "easeOutElastic(1, .6)",
            });

            // Subtle looping pulse
            anime({
              targets: dotEls,
              opacity: [0.12, 0.3],
              scale: [0.8, 1.3],
              delay: anime.stagger(80, {
                grid: [GRID_COLS, GRID_ROWS],
                from: "center",
              }),
              duration: 3000,
              easing: "easeInOutSine",
              direction: "alternate",
              loop: true,
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(grid);

    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* anime.js dot grid background */}
      <div ref={gridRef} className={styles.dotGrid}>
        {dots.map((i) => (
          <span key={i} className={styles.gridDot} />
        ))}
      </div>

      <span className="section__label">Skills &amp; Tools</span>

      <div className={styles.categories}>
        {skillCategories.map((cat) => (
          <div key={cat.name} className={styles.category}>
            <span className={styles.categoryName}>{cat.name}</span>
            <div className={styles.pills}>
              {cat.skills.map((skill) => (
                <span key={skill.name} className={styles.pill}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className={styles.exploring}>
        Currently exploring: {currentlyExploring}
      </p>
    </section>
  );
}
