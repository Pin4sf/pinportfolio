"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./CustomCursor.module.scss";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Use quickTo for 60fps tracking
    const moveDotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const moveDotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    const moveRingX = gsap.quickTo(ring, "x", {
      duration: 0.35,
      ease: "power3",
    });
    const moveRingY = gsap.quickTo(ring, "y", {
      duration: 0.35,
      ease: "power3",
    });

    const onMouseMove = (e: MouseEvent) => {
      moveDotX(e.clientX);
      moveDotY(e.clientY);
      moveRingX(e.clientX);
      moveRingY(e.clientY);
    };

    const onMouseEnterInteractive = () => {
      gsap.to(ring, { scale: 1.8, duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 0.5, duration: 0.3, ease: "power2.out" });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    // Track interactive elements
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, [data-hover], input, textarea, [role="button"]'
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
      return interactives;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Initial setup + observe for new elements
    let interactives = addHoverListeners();
    const observer = new MutationObserver(() => {
      // Remove old listeners
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      interactives = addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Show cursor
    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring} />
    </>
  );
}
