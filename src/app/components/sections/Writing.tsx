"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Writing.module.scss";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import CoolLink from "../ui/CoolLink";
import TransitionLink from "../ui/TransitionLink";
import type { PostMeta } from "@/lib/mdx";

gsap.registerPlugin(ScrollTrigger);

const categoryColors: Record<string, string> = {
  research: "var(--accent)",
  "field-note": "#8aa9ff",
  "founder-note": "var(--accent-warm)",
  historical: "var(--text-tertiary)",
};

const categoryLabels: Record<string, string> = {
  research: "Research",
  "field-note": "Field note",
  "founder-note": "Founder note",
  historical: "Historical",
};

interface WritingProps {
  featuredPosts: PostMeta[];
}

export default function Writing({ featuredPosts }: WritingProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Letter-spacing tighten on heading
      const heading = section.querySelector(`.${styles.heading}`);
      if (heading) {
        gsap.fromTo(
          heading,
          { letterSpacing: "0.1em", opacity: 0 },
          {
            letterSpacing: "-0.03em",
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // Left-slide + 3D rotation on cards
      const cards = section.querySelectorAll(`.${styles.card}`);
      gsap.fromTo(
        cards,
        { x: -60, opacity: 0, rotateY: -8 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  // 3D card tilt on hover
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(
      `.${styles.card}`,
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

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: "power1.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = (e: MouseEvent) => {
      gsap.to(e.currentTarget as HTMLElement, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.6)",
        overwrite: true,
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
      <div
        className="marquee marquee--reverse"
        style={{ bottom: "10%", top: "auto" }}
        aria-hidden="true"
      >
        <div className="marquee__inner">
          <span className="marquee__text">THOUGHTS</span>
          <span className="marquee__text">筆</span>
          <span className="marquee__text">WRITING</span>
          <span className="marquee__text">THOUGHTS</span>
          <span className="marquee__text">筆</span>
          <span className="marquee__text">WRITING</span>
        </div>
      </div>

      <div className={styles.header}>
        <div>
          <span className="section__label">Writing</span>
          <h2 className={styles.heading}>Notes from the work.</h2>
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
              {categoryLabels[post.category] ?? post.category}
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
              {post.revised && (
                <>
                  <span className={styles.dot}>·</span>
                  <span>
                    Revised{" "}
                    {new Date(post.revised).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </>
              )}
            </div>
          </TransitionLink>
        ))}
      </div>
    </section>
  );
}
