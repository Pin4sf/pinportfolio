"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./CustomCursor.module.scss";
import { useGpuTier } from "@/app/hooks/useGpuTier";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const gpuTier = useGpuTier();

  useEffect(() => {
    // Skip on touch devices — don't render at all
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const cursor = cursorRef.current;
    const label = labelRef.current;
    const spotlight = spotlightRef.current;
    if (!cursor || !label) return;

    const isLowTier = gpuTier === "low";

    // GSAP quickTo for smooth cursor following (0.2s lag)
    const moveCursorX = gsap.quickTo(cursor, "x", {
      duration: 0.2,
      ease: "power3",
    });
    const moveCursorY = gsap.quickTo(cursor, "y", {
      duration: 0.2,
      ease: "power3",
    });

    // Velocity deformation — skip on low tier (saves 3 quickTo per frame)
    const setScaleX = !isLowTier
      ? gsap.quickTo(cursor, "scaleX", { duration: 0.3, ease: "power3" })
      : null;
    const setScaleY = !isLowTier
      ? gsap.quickTo(cursor, "scaleY", { duration: 0.3, ease: "power3" })
      : null;
    const setRotation = !isLowTier
      ? gsap.quickTo(cursor, "rotation", { duration: 0.3, ease: "power3" })
      : null;

    let prevX = 0;
    let prevY = 0;
    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      moveCursorX(e.clientX);
      moveCursorY(e.clientY);

      // Update spotlight CSS custom properties (skip on low tier)
      if (spotlight && !isLowTier) {
        spotlight.style.setProperty("--cursor-x", `${e.clientX}px`);
        spotlight.style.setProperty("--cursor-y", `${e.clientY}px`);
      }

      // Velocity deformation (skip on low tier and during hover expand)
      if (setScaleX && setScaleY && setRotation && !isHovering) {
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        const speed = Math.sqrt(dx * dx + dy * dy);

        if (speed > 2) {
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          const stretchX = 1 + Math.min(speed * 0.01, 0.3);
          const squashY = 1 - Math.min(speed * 0.005, 0.15);
          setScaleX(stretchX);
          setScaleY(squashY);
          setRotation(angle);
        } else {
          setScaleX(1);
          setScaleY(1);
          setRotation(0);
        }
      }

      prevX = e.clientX;
      prevY = e.clientY;
    };

    // Click effect: squeeze + elastic bounce
    const onMouseDown = () => {
      gsap.to(cursor, {
        scale: isHovering ? 0.9 : 0.7,
        duration: 0.1,
        ease: "power2.in",
      });
    };

    const onMouseUp = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
      });
    };

    // Context-aware hover labels
    const getCursorLabel = (el: Element): string => {
      const dataLabel = el.getAttribute("data-cursor");
      if (dataLabel) return dataLabel;

      const href = el.getAttribute("href") || "";
      if (href.startsWith("/work/")) return "View";
      if (href.startsWith("/writing/")) return "Read";
      if (href.startsWith("http")) return "Open";
      if (el.tagName === "BUTTON" || el.getAttribute("role") === "button")
        return "";
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") return "Type";
      return "";
    };

    const onMouseEnterInteractive = (e: Event) => {
      isHovering = true;
      const el = e.currentTarget as Element;
      const cursorLabel = getCursorLabel(el);

      gsap.to(cursor, {
        width: 80,
        height: 80,
        background: "rgba(255, 255, 255, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        duration: 0.4,
        ease: "power2.out",
      });

      if (setScaleX && setScaleY && setRotation) {
        setScaleX(1);
        setScaleY(1);
        setRotation(0);
      }

      if (cursorLabel) {
        label.textContent = cursorLabel;
        gsap.to(label, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: "power2.out",
        });
      }
    };

    const onMouseLeaveInteractive = () => {
      isHovering = false;

      gsap.to(cursor, {
        width: 12,
        height: 12,
        background: "rgba(255, 255, 255, 0.9)",
        border: "none",
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(label, {
        opacity: 0,
        scale: 0.8,
        duration: 0.15,
        ease: "power2.in",
      });
    };

    // Track interactive elements
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, [data-hover], [data-cursor], input, textarea, [role="button"]'
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
      return interactives;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    let interactives = addHoverListeners();

    // Watch for dynamic elements — debounced to avoid thrashing during GSAP animations
    let mutationTimer: ReturnType<typeof setTimeout>;
    const observer = new MutationObserver(() => {
      clearTimeout(mutationTimer);
      mutationTimer = setTimeout(() => {
        interactives.forEach((el) => {
          el.removeEventListener("mouseenter", onMouseEnterInteractive);
          el.removeEventListener("mouseleave", onMouseLeaveInteractive);
        });
        interactives = addHoverListeners();
      }, 150);
    });
    const main = document.querySelector("main");
    observer.observe(main || document.body, { childList: true, subtree: true });

    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      clearTimeout(mutationTimer);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      observer.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [gpuTier]);

  if (isTouchDevice) return null;

  return (
    <>
      {gpuTier !== "low" && <div ref={spotlightRef} className={styles.spotlight} />}
      <div ref={cursorRef} className={styles.cursor}>
        <span ref={labelRef} className={styles.label} />
      </div>
    </>
  );
}
