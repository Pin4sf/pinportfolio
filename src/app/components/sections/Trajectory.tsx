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
        `.${styles.step}`,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
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
        <span className="section__label">The thread</span>
        <h2 className={styles.heading}>One question led to the next.</h2>
      </header>

      <div className={styles.flow}>
        <div className={styles.line} aria-hidden="true" />
        {trajectoryPhases.map((phase) => (
          <article key={phase.id} className={styles.step}>
            <div className={styles.marker} aria-hidden="true">
              <span>{phase.number}</span>
            </div>
            <p className={styles.context}>{phase.context}</p>
            <h3>{phase.title}</h3>
            <p className={styles.summary}>{phase.summary}</p>
          </article>
        ))}
      </div>

      <p className={styles.compass}>
        More capability should leave people with more agency—not more to manage.
      </p>
    </section>
  );
}
