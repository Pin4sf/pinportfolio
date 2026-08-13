"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.scss";
import { aboutData } from "@/data/portfolio";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Scale-in image with border-radius morph
      tl.fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0, borderRadius: "50%" },
        {
          scale: 1,
          opacity: 1,
          borderRadius: "8px",
          duration: 1.2,
          ease: "back.out(1.5)",
        },
      );

      // Left-slide text content stagger
      if (textRef.current) {
        tl.fromTo(
          Array.from(textRef.current.children),
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: "power2.out",
          },
          0.2,
        );
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="about" className={styles.section}>
      <span className="bg-text bg-text--top" aria-hidden="true">
        自己紹介
      </span>

      <span className="section__label">About</span>
      <h2 className="sr-only">About Me</h2>

      <div className={styles.grid}>
        <div ref={textRef} className={styles.text}>
          {aboutData.bio.split("\n\n").map((paragraph, i) => (
            <p key={i} className={styles.bio}>
              {paragraph}
            </p>
          ))}

          <div className={styles.facts}>
            {aboutData.facts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <span className={styles.factLabel}>{fact.label}</span>
                <span className={styles.factValue}>{fact.value}</span>
              </div>
            ))}
          </div>

          <div className={styles.interests}>
            <span className={styles.interestsLabel}>
              {aboutData.interestsLabel}
            </span>
            <div className={styles.interestList}>
              {aboutData.interests.map((interest) => (
                <span key={interest} className={styles.interest}>
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div ref={imageRef} className={styles.imageWrap}>
          <img
            src={aboutData.photo}
            alt="Shivansh Fulper"
            className={styles.image}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
