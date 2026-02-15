"use client";

import { useEffect, useRef, useMemo, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import styles from "./Hero.module.scss";
import { heroData } from "@/data/portfolio";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { Github, Linkedin, Twitter, Instagram, type LucideIcon } from "lucide-react";
import ErrorBoundary from "../ErrorBoundary";

const HeroBackground = dynamic(
  () => import("../three/HeroBackground"),
  { ssr: false }
);

const FluidBackground = dynamic(
  () => import("../three/FluidBackground"),
  { ssr: false }
);

const iconMap: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  github: Github,
  twitter: Twitter,
  instagram: Instagram,
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const reducedMotion = useReducedMotion();
  const [bgCanvas, setBgCanvas] = useState<HTMLCanvasElement | null>(null);

  const handleBgCanvasReady = useCallback((canvas: HTMLCanvasElement) => {
    setBgCanvas(canvas);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 2,
      })),
    []
  );

  // Split name into individual character spans for magnetic effect
  const nameChars = useMemo(() => {
    const name = heroData.name;
    const chars: { char: string; isSpace: boolean }[] = [];
    for (const c of name) {
      chars.push({ char: c, isSpace: c === " " });
    }
    return chars;
  }, []);

  const setCharRef = useCallback((el: HTMLSpanElement | null, idx: number) => {
    if (el) charsRef.current[idx] = el;
  }, []);

  // Entrance animation — stagger characters from bottom
  useEffect(() => {
    if (reducedMotion) return;

    const chars = charsRef.current.filter(Boolean);
    if (chars.length === 0) return;

    // Set initial state
    gsap.set(chars, { y: "110%", opacity: 0 });
    gsap.set(taglineRef.current, { y: 20, opacity: 0 });
    gsap.set(subtitleRef.current, { y: 15, opacity: 0 });

    const tl = gsap.timeline({ delay: 1.8 });

    tl.to(chars, {
      y: "0%",
      opacity: 1,
      duration: 0.8,
      stagger: 0.025,
      ease: "power4.out",
    })
      .to(
        taglineRef.current,
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .to(
        subtitleRef.current,
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        socialsRef.current?.children
          ? Array.from(socialsRef.current.children)
          : [],
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.04,
          ease: "power3.out",
        },
        "-=0.2"
      );
  }, [reducedMotion]);

  // Magnetic text — characters repel from cursor
  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    const chars = charsRef.current.filter(Boolean);
    if (!section || chars.length === 0) return;

    // Skip on mobile
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const RADIUS = 150;
    const STRENGTH = 25;

    // Create quickTo instances for each character (x and y)
    const quickX = chars.map((el) =>
      gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" })
    );
    const quickY = chars.map((el) =>
      gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" })
    );

    const handleMouseMove = (e: MouseEvent) => {
      chars.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;

        const dx = e.clientX - charCenterX;
        const dy = e.clientY - charCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < RADIUS) {
          const force = (1 - dist / RADIUS) * STRENGTH;
          const angle = Math.atan2(dy, dx);
          quickX[i](-Math.cos(angle) * force);
          quickY[i](-Math.sin(angle) * force);
        } else {
          quickX[i](0);
          quickY[i](0);
        }
      });
    };

    const handleMouseLeave = () => {
      chars.forEach((_, i) => {
        quickX[i](0);
        quickY[i](0);
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [reducedMotion]);

  // Cursor-responsive glow (enlarged)
  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;

    const moveGlow = gsap.quickTo(glow, "left", {
      duration: 0.8,
      ease: "power3",
    });
    const moveGlowY = gsap.quickTo(glow, "top", {
      duration: 0.8,
      ease: "power3",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      moveGlow(e.clientX - rect.left);
      moveGlowY(e.clientY - rect.top);
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, [reducedMotion]);

  // Floating particles
  useEffect(() => {
    if (reducedMotion) return;
    const container = particlesRef.current;
    if (!container) return;

    const dots = container.querySelectorAll(`.${styles.particle}`);

    // Staggered entrance from center
    gsap.fromTo(
      dots,
      { opacity: 0, scale: 0 },
      {
        opacity: () => Math.random() * 0.5 + 0.25,
        scale: 1,
        duration: 2.5,
        stagger: { each: 0.12, from: "center" },
        ease: "expo.out",
      }
    );

    // Continuous gentle float per particle
    Array.from(dots).forEach((dot) => {
      gsap.to(dot, {
        y: gsap.utils.random(-60, 60),
        x: gsap.utils.random(-30, 30),
        duration: gsap.utils.random(3, 6),
        delay: gsap.utils.random(0, 2),
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    });
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="home" className={styles.hero}>
      {/* Three.js noise gradient background */}
      {!reducedMotion && (
        <ErrorBoundary>
          <HeroBackground onCanvasReady={handleBgCanvasReady} />
        </ErrorBoundary>
      )}

      {/* Water refraction overlay */}
      {!reducedMotion && (
        <ErrorBoundary>
          <FluidBackground backgroundCanvas={bgCanvas} />
        </ErrorBoundary>
      )}

      {/* Floating particles */}
      {!reducedMotion && (
        <div ref={particlesRef} className={styles.particles} aria-hidden="true">
          {particles.map((p) => (
            <span
              key={p.id}
              className={styles.particle}
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
              }}
            />
          ))}
        </div>
      )}

      {/* Cursor-responsive glow */}
      <div ref={glowRef} className={styles.glow} aria-hidden="true" />

      <div className={styles.content}>
        <h1 className={styles.name}>
          {nameChars.map((c, i) =>
            c.isSpace ? (
              <span key={i} className={styles.charSpace}>
                &nbsp;
              </span>
            ) : (
              <span key={i} className={styles.charWrap}>
                <span
                  ref={(el) => setCharRef(el, i)}
                  className={styles.char}
                >
                  {c.char}
                </span>
              </span>
            )
          )}
        </h1>
        <p ref={taglineRef} className={styles.tagline}>
          {heroData.tagline}
        </p>
        <p ref={subtitleRef} className={styles.subtitle}>
          {heroData.subtitle}
        </p>
      </div>

      <div ref={socialsRef} className={styles.socials}>
        {heroData.socials.map((social) => {
          const Icon = iconMap[social.icon];
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={social.name}
            >
              {Icon && <Icon size={18} />}
            </a>
          );
        })}
      </div>

      <div className={styles.scrollIndicator}>
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll</span>
      </div>
    </section>
  );
}
