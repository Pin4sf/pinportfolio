"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Timeline.module.scss";
import { timelineData } from "@/data/portfolio";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { Rocket, GraduationCap, Briefcase, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Horizontal scroll with GSAP ScrollTrigger pin
  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const scrollWidth = track.scrollWidth - window.innerWidth;

    // Pin section and scroll track horizontally
    const st = gsap.to(track, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 0.8,
        end: () => `+=${scrollWidth}`,
        invalidateOnRefresh: true,
      },
    });

    // Animate horizontal line width as we scroll
    const line = lineRef.current;
    if (line) {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            scrub: 0.8,
            start: "top top",
            end: () => `+=${scrollWidth}`,
          },
        }
      );
    }

    // Horizontal slide card reveals (matching the horizontal scroll direction)
    const cards = track.querySelectorAll(`.${styles.card}`);
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: st,
            start: "left 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [reducedMotion]);

  // Dot pulse
  useEffect(() => {
    if (reducedMotion) return;
    const track = trackRef.current;
    if (!track) return;

    const dots = track.querySelectorAll(`.${styles.dot}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Entrance
            gsap.fromTo(
              dots,
              { scale: 0 },
              {
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "elastic.out(1, 0.6)",
              }
            );

            // Continuous pulse
            gsap.fromTo(
              dots,
              { scale: 1 },
              {
                scale: 1.25,
                duration: 1.5,
                stagger: 0.3,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
              }
            );

            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(track);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="experience" className={styles.section}>
      {/* Viewport-filling JOURNEY marquee */}
      <div className="marquee" style={{ top: "50%", transform: "translateY(-50%)" }}>
        <div className="marquee__inner">
          <span className="marquee__text marquee__text--giant">JOURNEY</span>
          <span className="marquee__text marquee__text--giant">JOURNEY</span>
          <span className="marquee__text marquee__text--giant">JOURNEY</span>
          <span className="marquee__text marquee__text--giant">JOURNEY</span>
        </div>
      </div>

      <div className={styles.header}>
        <span className="section__label">Experience</span>
        <h2 className={styles.heading}>Timeline</h2>
      </div>

      <div ref={trackRef} className={styles.track}>
        {/* Horizontal line */}
        <div ref={lineRef} className={styles.line} />

        {timelineData.map((entry) => {
          const Icon = typeIcons[entry.type] || Briefcase;
          const color = typeColors[entry.type] || "var(--accent)";

          return (
            <div
              key={`${entry.year}-${entry.organization}`}
              className={styles.entry}
            >
              {/* Dot */}
              <div className={styles.dot} style={{ borderColor: color }}>
                <Icon size={14} style={{ color }} />
              </div>

              {/* Card */}
              <div className={styles.card}>
                <span className={styles.year} style={{ color }}>
                  {entry.year}
                </span>
                <h3 className={styles.title}>{entry.title}</h3>
                <span className={styles.org}>{entry.organization}</span>
                <p className={styles.description}>{entry.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
