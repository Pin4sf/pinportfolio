"use client";

import { useRef, useEffect, useMemo } from "react";
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
        { scale: 1, opacity: 1, borderRadius: "8px", duration: 1.2, ease: "back.out(1.5)" }
      );

      // Left-slide text content stagger
      if (textRef.current) {
        tl.fromTo(
          Array.from(textRef.current.children),
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power2.out" },
          0.2
        );
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Floating geometric shapes — pause when offscreen
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const container = shapesRef.current;
    if (!container || !section) return;

    const els = container.querySelectorAll(`.${styles.floatingShape}`);

    // Staggered entrance
    gsap.fromTo(
      els,
      { opacity: 0, scale: 0 },
      {
        opacity: 0.3,
        scale: 1,
        duration: 1.5,
        stagger: 0.15,
        ease: "expo.out",
      }
    );

    // Continuous gentle float — collected for pausing
    const floatTweens: gsap.core.Tween[] = [];
    Array.from(els).forEach((el) => {
      floatTweens.push(
        gsap.to(el, {
          y: gsap.utils.random(-30, 30),
          x: gsap.utils.random(-20, 20),
          rotation: gsap.utils.random(-25, 25),
          duration: gsap.utils.random(3, 5),
          delay: gsap.utils.random(0, 2),
          yoyo: true,
          repeat: -1,
          ease: "power1.inOut",
        })
      );
    });

    // Pause when about section is offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        floatTweens.forEach((t) => entry.isIntersecting ? t.resume() : t.pause());
      },
      { threshold: 0.05 }
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      floatTweens.forEach((t) => t.kill());
    };
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="about" className={styles.section}>
      <span className="bg-text bg-text--top" aria-hidden="true">自己紹介</span>

      {/* Floating geometric accents */}
      {!reducedMotion && (
        <div ref={shapesRef} className={styles.shapes} aria-hidden="true">
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
