"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./LoadingScreen.module.scss";

const PRELOADER_SEEN_KEY = "preloader_seen";

// Naruto hand seals — stylized SVG line art
const handSeals = [
  {
    name: "Tora",
    kanji: "寅",
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 12 L28 28 L22 48 L30 60 L40 68 L50 60 L58 48 L52 28 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="40" y1="12" x2="40" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="28" y1="28" x2="52" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <circle cx="34" cy="36" r="2" fill="currentColor" opacity="0.6" />
        <circle cx="46" cy="36" r="2" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: "Mi",
    kanji: "巳",
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 50 Q20 30 40 20 Q60 30 60 50" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M25 48 Q30 35 40 28 Q50 35 55 48" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <path d="M40 20 L40 60" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <circle cx="40" cy="40" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M20 50 Q40 65 60 50" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    name: "Tatsu",
    kanji: "辰",
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 40 L30 20 L50 20 L65 40 L50 60 L30 60 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M30 40 L50 40" stroke="currentColor" strokeWidth="1.5" />
        <path d="M40 25 L40 55" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <circle cx="35" cy="35" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="45" cy="45" r="2" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "Tori",
    kanji: "酉",
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 15 L20 35 L25 55 L40 65 L55 55 L60 35 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M40 15 L32 40 L40 50 L48 40 Z" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <path d="M25 38 L40 50 L55 38" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
  },
  {
    name: "Hitsuji",
    kanji: "未",
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="22" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="40" cy="40" r="10" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="40" y1="18" x2="40" y2="10" stroke="currentColor" strokeWidth="1.5" />
        <line x1="36" y1="18" x2="33" y2="11" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="40" cy="40" r="3" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    name: "Ne",
    kanji: "子",
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 55 Q25 35 35 25 L35 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M55 55 Q55 35 45 25 L45 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M25 55 Q40 65 55 55" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <ellipse cx="40" cy="42" rx="12" ry="8" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="35" y1="12" x2="45" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
  },
];

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [activeSign, setActiveSign] = useState(0);
  const completedRef = useRef(false);
  const signRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasSeenPreloader = useRef(false);
  const canExit = useRef(false);

  // Check if this is a return visit (skip preloader if so)
  useEffect(() => {
    hasSeenPreloader.current = sessionStorage.getItem(PRELOADER_SEEN_KEY) === "true";

    if (hasSeenPreloader.current) {
      // Already seen this session — skip preloader entirely
      setIsLoading(false);
      setCounter(100);
      return;
    }

    // Track when assets are ready (doesn't control counter speed)
    const ANIMATION_DURATION = 2800; // Counter animation duration
    const startTime = performance.now();

    const handleAssetsReady = () => {
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(0, ANIMATION_DURATION - elapsed);

      // Wait for animation to complete before allowing exit
      setTimeout(() => {
        canExit.current = true;
        // If counter already at 100, trigger exit
        if (!completedRef.current) {
          setIsLoading(false);
          sessionStorage.setItem(PRELOADER_SEEN_KEY, "true");
        }
      }, remaining);
    };

    // Listen for all assets loaded
    if (document.readyState === "complete") {
      handleAssetsReady();
    } else {
      window.addEventListener("load", handleAssetsReady);
    }

    return () => {
      window.removeEventListener("load", handleAssetsReady);
    };
  }, []);

  // Counter — smooth fixed-duration animation (independent of load time)
  useEffect(() => {
    if (hasSeenPreloader.current) return; // Skip if already seen

    const DURATION = 2800; // Fixed 2.8s animation for smooth hand seal transitions
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION, 1);

      // Smooth easing curve (slow start, faster middle, slow end)
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const targetCount = Math.round(eased * 100);
      setCounter(targetCount);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Counter reached 100 — wait for assets if needed
        if (canExit.current) {
          setIsLoading(false);
          sessionStorage.setItem(PRELOADER_SEEN_KEY, "true");
        }
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Cycle hand signs based on counter
  useEffect(() => {
    const signIndex = Math.min(
      Math.floor((counter / 100) * handSeals.length),
      handSeals.length - 1
    );

    if (signIndex !== activeSign) {
      setActiveSign(signIndex);
      const signEl = signRefs.current[signIndex];
      if (signEl) {
        gsap.fromTo(
          signEl,
          { scale: 0.6, opacity: 0, rotate: -10 },
          { scale: 1, opacity: 1, rotate: 0, duration: 0.25, ease: "back.out(1.5)" }
        );
      }
    }
  }, [counter, activeSign]);

  // Exit animation — dramatic split-reveal
  useEffect(() => {
    if (counter === 100 && !isLoading && !completedRef.current) {
      completedRef.current = true;

      const tl = gsap.timeline({ delay: 0.3 });

      // Flash seal outward
      tl.to(`.${styles.activeSeal}`, {
        scale: 1.5,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      });

      // Fade counter + UI
      tl.to(
        `.${styles.counter}`,
        { opacity: 0, y: -15, duration: 0.3, ease: "power2.in" },
        "<"
      );
      tl.to(
        [`.${styles.dots}`, `.${styles.bar}`],
        { opacity: 0, duration: 0.2 },
        "<0.1"
      );

      // Split-reveal curtain: top and bottom halves slide apart
      tl.to(`.${styles.loading}`, {
        clipPath: "inset(50% 0 50% 0)",
        duration: 0.8,
        ease: "power4.inOut",
        pointerEvents: "none",
      });

      tl.set(`.${styles.loading}`, { display: "none" });
    }
  }, [counter, isLoading]);

  // Don't render if user has already seen the preloader
  if (hasSeenPreloader.current && !isLoading) {
    return null;
  }

  return (
    <div className={styles.loading} aria-hidden="true" role="presentation">
      <div className={styles.inner}>
        {/* Hand seal display */}
        <div className={styles.sealArea}>
          {handSeals.map((seal, i) => (
            <div
              key={seal.name}
              ref={(el) => {
                signRefs.current[i] = el;
              }}
              className={`${styles.seal} ${i === activeSign ? styles.activeSeal : ""}`}
              style={{ display: i === activeSign ? "flex" : "none" }}
            >
              <div className={styles.sealIcon}>{seal.svg}</div>
              <div className={styles.sealInfo}>
                <span className={styles.sealKanji}>{seal.kanji}</span>
                <span className={styles.sealName}>{seal.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Counter */}
        <div className={styles.counter}>
          <span className={styles.number}>{counter}</span>
        </div>

        {/* Progress bar */}
        <div className={styles.bar}>
          <div className={styles.barFill} style={{ width: `${counter}%` }} />
        </div>

        {/* Seal sequence dots */}
        <div className={styles.dots}>
          {handSeals.map((_, i) => (
            <span
              key={i}
              className={`${styles.dotIndicator} ${i <= activeSign ? styles.dotActive : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
