"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import anime from "animejs";
import styles from "./Writing.module.scss";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import CoolLink from "../ui/CoolLink";
import TransitionLink from "../ui/TransitionLink";

gsap.registerPlugin(ScrollTrigger);

// Placeholder featured posts — will be replaced with MDX data
const featuredPosts = [
  {
    slug: "building-onesync",
    title: "Building OneSync: From Biosignals to Cognitive Readiness",
    category: "building" as const,
    date: "2026-01-15",
    readingTime: 8,
    description:
      "What I learned building a cognitive performance platform — from biosignal processing to making invisible data actionable for high-pressure teams.",
  },
  {
    slug: "my-stack-2026",
    title: "My Stack in 2026: What I Use and Why",
    category: "technical" as const,
    date: "2026-01-05",
    readingTime: 5,
    description:
      "A breakdown of the tools, frameworks, and workflows I use daily — from LLM pipelines to agentic systems — and the reasoning behind each choice.",
  },
  {
    slug: "startup-lessons",
    title: "What Starting Two Companies Taught Me About Building",
    category: "thinking" as const,
    date: "2025-12-20",
    readingTime: 6,
    description:
      "OneSync and EcoFresh Greensync changed how I think about systems, distribution, and execution. Here's what shipping real products teaches you.",
  },
];

const categoryColors: Record<string, string> = {
  building: "var(--accent)",
  technical: "#6c9bff",
  thinking: "var(--accent-warm)",
};

export default function Writing() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(`.${styles.card}`);
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [reducedMotion]);

  // anime.js 3D card tilt on hover
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(
      `.${styles.card}`
    ) as NodeListOf<HTMLElement>;

    const handleMouseMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      anime({
        targets: card,
        rotateX,
        rotateY,
        duration: 400,
        easing: "easeOutQuad",
      });
    };

    const handleMouseLeave = (e: MouseEvent) => {
      anime({
        targets: e.currentTarget,
        rotateX: 0,
        rotateY: 0,
        duration: 600,
        easing: "easeOutElastic(1, .6)",
      });
    };

    cards.forEach((card) => {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="writing" className={styles.section}>
      {/* Background marquee */}
      <div className="marquee marquee--reverse" style={{ bottom: "10%", top: "auto" }}>
        <div className="marquee__inner">
          <span className="marquee__text">THOUGHTS</span>
          <span className="marquee__text">NOTES</span>
          <span className="marquee__text">WRITING</span>
          <span className="marquee__text">THOUGHTS</span>
          <span className="marquee__text">NOTES</span>
          <span className="marquee__text">WRITING</span>
        </div>
      </div>

      <div className={styles.header}>
        <div>
          <span className="section__label">Writing</span>
          <h2 className={styles.heading}>Writing</h2>
        </div>
        <CoolLink href="/writing" text="View all writing" />
      </div>

      <div className={styles.grid}>
        {featuredPosts.map((post) => (
          <TransitionLink
            key={post.slug}
            href={`/writing/${post.slug}`}
            className={styles.card}
          >
            <div
              className={styles.cardBorder}
              style={{
                background: categoryColors[post.category] || "var(--accent)",
              }}
            />

            <span
              className={styles.category}
              style={{
                color: categoryColors[post.category] || "var(--accent)",
              }}
            >
              {post.category}
            </span>

            <h3 className={styles.cardTitle}>{post.title}</h3>
            <p className={styles.cardDescription}>{post.description}</p>

            <div className={styles.cardMeta}>
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className={styles.dot}>·</span>
              <span>{post.readingTime} min read</span>
            </div>
          </TransitionLink>
        ))}
      </div>
    </section>
  );
}
