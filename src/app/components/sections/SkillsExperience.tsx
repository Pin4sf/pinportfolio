"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight } from "lucide-react";
import { skillCategories, currentlyExploring } from "@/data/portfolio";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import styles from "./SkillsExperience.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        `.${styles.category}`,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 76%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="capabilities" className={styles.section}>
      <header className={styles.header}>
        <span className="section__label">Capabilities with provenance</span>
        <h2>What the work required.</h2>
        <p>
          Technologies matter here only when an artifact, system, or observed
          constraint gives them context.
        </p>
      </header>

      <div className={styles.categories}>
        {skillCategories.map((category, index) => (
          <article key={category.name} className={styles.category}>
            <span className={styles.number}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3>{category.name}</h3>
              <p className={styles.description}>{category.description}</p>
              <ul className={styles.skills}>
                {category.skills.map((skill) => (
                  <li key={skill.name}>{skill.name}</li>
                ))}
              </ul>
              <div className={styles.evidenceLinks}>
                {(category.evidenceSlugs ?? []).map((slug) => (
                  <a key={slug} href={`#evidence-${slug}`}>
                    Evidence: {slug.replace("-", " ")}
                    <ArrowDownRight size={13} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className={styles.exploring}>Currently investigating: {currentlyExploring}</p>
    </section>
  );
}
