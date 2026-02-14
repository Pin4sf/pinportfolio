"use client";

import { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import anime from "animejs";
import styles from "./About.module.scss";
import { aboutData } from "@/data/portfolio";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const shapes = useMemo(
    () => [
      { id: 0, type: "circle", left: "88%", top: "12%", size: 14 },
      { id: 1, type: "circle", left: "92%", top: "50%", size: 10 },
      { id: 2, type: "square", left: "85%", top: "75%", size: 12 },
      { id: 3, type: "circle", left: "3%", top: "85%", size: 8 },
      { id: 4, type: "square", left: "8%", top: "25%", size: 11 },
      { id: 5, type: "circle", left: "45%", top: "8%", size: 6 },
      { id: 6, type: "square", left: "60%", top: "90%", size: 9 },
      { id: 7, type: "circle", left: "35%", top: "65%", size: 7 },
    ],
    []
  );

  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    // Image mask wipe
    tl.fromTo(
      imageRef.current,
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.inOut" }
    );

    // Text content stagger
    if (textRef.current) {
      tl.fromTo(
        Array.from(textRef.current.children),
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        0.3
      );
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [reducedMotion]);

  // anime.js floating geometric shapes
  useEffect(() => {
    if (reducedMotion) return;
    const container = shapesRef.current;
    if (!container) return;

    const els = container.querySelectorAll(`.${styles.floatingShape}`);

    // Staggered entrance
    anime({
      targets: els,
      opacity: [0, 0.3],
      scale: [0, 1],
      delay: anime.stagger(150),
      duration: 1500,
      easing: "easeOutExpo",
    });

    // Continuous gentle float
    anime({
      targets: els,
      translateY: () => anime.random(-30, 30),
      translateX: () => anime.random(-20, 20),
      rotate: () => anime.random(-25, 25),
      duration: () => anime.random(3000, 5000),
      delay: () => anime.random(0, 2000),
      direction: "alternate",
      loop: true,
      easing: "easeInOutQuad",
    });
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="about" className={styles.section}>
      <span className="bg-text bg-text--top">ABOUT ME</span>

      {/* Floating geometric accents */}
      {!reducedMotion && (
        <div ref={shapesRef} className={styles.shapes}>
          {shapes.map((s) => (
            <span
              key={s.id}
              className={`${styles.floatingShape} ${
                s.type === "square" ? styles.square : ""
              }`}
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
              }}
            />
          ))}
        </div>
      )}
      <span className="section__label">About</span>

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
