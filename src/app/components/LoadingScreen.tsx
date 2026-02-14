"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./LoadingScreen.module.scss";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [counter, setCounter] = useState(0);
  const loadingRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (counter === 100 && !completedRef.current) {
      completedRef.current = true;

      const tl = gsap.timeline();

      // 1. Fade out text and counter
      tl.to(`.${styles.text}, .${styles.counterWrap}`, {
        duration: 0.6,
        opacity: 0,
        y: -20,
        ease: "power2.in",
      });

      // 2. Morph box to circle
      tl.to(
        `.${styles.box}`,
        {
          duration: 1,
          height: "300px",
          width: "300px",
          borderRadius: "50%",
          ease: "power3.inOut",
        },
        "-=0.3"
      );

      // 3. Spin loader SVG
      tl.to(
        `.${styles.svg}`,
        { duration: 1.5, opacity: 1, rotate: "360deg", ease: "power2.inOut" },
        "-=0.8"
      );

      // 4. Scale box down and fade
      tl.to(`.${styles.box}`, {
        duration: 0.6,
        scale: 0,
        opacity: 0,
        ease: "power3.in",
      });

      // 5. Clip-path reveal — slide the loading screen upward
      tl.to(
        `.${styles.loading}`,
        {
          duration: 0.8,
          clipPath: "inset(0 0 100% 0)",
          ease: "power3.inOut",
          pointerEvents: "none",
        },
        "-=0.3"
      );

      // 6. Animate hero elements in
      tl.to(
        "header, [data-header]",
        { duration: 0.8, top: "0.5rem", ease: "power3.out" },
        "-=0.4"
      );

      tl.to(
        "[data-socials]",
        { duration: 0.8, bottom: "8rem", ease: "power3.out" },
        "-=0.5"
      );

      tl.to(
        "[data-scroll-indicator]",
        { duration: 0.8, bottom: "1rem", ease: "power3.out" },
        "-=0.5"
      );

      // 7. Clean up loading element after animation
      tl.set(`.${styles.loading}`, { display: "none" });

      if (onComplete) {
        tl.call(onComplete);
      }
    }
  }, [counter, onComplete]);

  return (
    <div ref={loadingRef} className={styles.loading}>
      <div className={styles.box}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/loaders/loader26.svg"
          alt="loader"
          className={styles.svg}
        />
        <div className={styles.text}>
          <div className={styles.textBorder}></div>
          L
          <div className={styles.textDot}></div>
          OADING EXPERIENCE
        </div>
        <div className={styles.bar}>
          <div
            className={styles.barInner}
            style={{ width: `${counter}%` }}
          ></div>
        </div>
        <div className={styles.counterWrap}>
          <span>0%</span>
          <div className={styles.counterNumber}>{counter}%</div>
        </div>
      </div>
    </div>
  );
}
