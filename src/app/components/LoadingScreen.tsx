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

      // GSAP animation sequence
      gsap.to(`.${styles.bar}`, {
        duration: 5,
        rotate: "90deg",
        left: "1000%",
      });

      gsap.to(`.${styles.text}, .${styles.counterWrap}`, {
        duration: 1,
        opacity: 0,
      });

      gsap.to(`.${styles.box}`, {
        duration: 1.5,
        height: "500px",
        borderRadius: "50%",
      });

      gsap.to(`.${styles.svg}`, {
        duration: 10,
        opacity: 1,
        rotate: "360deg",
      });

      gsap.to(`.${styles.box}`, {
        delay: 2,
        border: "none",
      });

      // Reveal page
      gsap.to(`.${styles.loading}`, {
        delay: 2,
        duration: 2,
        zIndex: 1,
        background: "transparent",
        opacity: 0,
        pointerEvents: "none",
      });

      // Animate header, socials, scroll indicator
      gsap.to("header, [data-header]", {
        duration: 1,
        delay: 2,
        top: "0.5rem",
      });

      gsap.to("[data-socials]", {
        duration: 1,
        delay: 2.5,
        bottom: "8rem",
      });

      gsap.to("[data-scroll-indicator]", {
        duration: 1,
        delay: 3,
        bottom: "1rem",
      });

      if (onComplete) {
        setTimeout(onComplete, 3000);
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
