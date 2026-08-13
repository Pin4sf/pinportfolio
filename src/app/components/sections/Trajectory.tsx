"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trajectoryPhases } from "@/data/portfolio";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import styles from "./Trajectory.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Trajectory() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        `.${styles.phase}`,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="trajectory" className={styles.section}>
      <header className={styles.header}>
        <span className="section__label">Trajectory</span>
        <h2 className={styles.heading}>Models → Agents → World</h2>
        <p className={styles.intro}>
          This was not a master plan written in hindsight. Each system changed
          the unit of work—and left a harder question behind.
        </p>
      </header>

      <div className={styles.phases}>
        {trajectoryPhases.map((phase) => (
          <article key={phase.id} className={styles.phase}>
            <div className={styles.phaseHeader}>
              <span className={styles.number}>{phase.number}</span>
              <h3>{phase.title}</h3>
            </div>
            <p className={styles.summary}>{phase.summary}</p>
            <ul className={styles.evidence} aria-label={`${phase.title} evidence`}>
              {phase.evidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.insight}>{phase.insight}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

