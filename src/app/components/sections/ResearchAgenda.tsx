"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { researchAreas, researchQuestions } from "@/data/portfolio";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import styles from "./ResearchAgenda.module.scss";

gsap.registerPlugin(ScrollTrigger);

const maturityLabels = {
  practice: "In practice",
  investigating: "Working on now",
  "long-term": "Longer term",
};

const maturities = ["practice", "investigating", "long-term"] as const;

export default function ResearchAgenda() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        `.${styles.band}, .${styles.question}`,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 74%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="research" className={styles.section}>
      <header className={styles.header}>
        <span className="section__label">Research</span>
        <h2 className={styles.heading}>What I’m thinking about.</h2>
      </header>

      <div className={styles.bands}>
        {maturities.map((maturity, bandIndex) => (
          <section key={maturity} className={styles.band}>
            <div className={styles.bandHeading}>
              <span>{String(bandIndex + 1).padStart(2, "0")}</span>
              <h3>{maturityLabels[maturity]}</h3>
            </div>
            <div className={styles.areas}>
              {researchAreas
                .filter((area) => area.maturity === maturity)
                .map((area) => (
                  <article key={area.title} className={styles.area}>
                    <h4>{area.title}</h4>
                    <p>{area.summary}</p>
                    <a href={`#evidence-${area.evidenceSlugs[0]}`}>
                      Evidence: {area.evidenceSlugs.join(" · ")}
                    </a>
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>

      <div className={styles.questionsBlock}>
        <div className={styles.questionsIntro}>
          <p>Current questions</p>
          <h3>Five I keep returning to.</h3>
        </div>
        <ol className={styles.questions}>
          {researchQuestions.map((question, index) => (
            <li key={question} className={styles.question}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{question}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
