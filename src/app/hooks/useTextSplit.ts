"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useReducedMotion } from "./useReducedMotion";

interface UseTextSplitOptions {
  /** Split by 'chars' | 'words' | 'lines' */
  type?: "chars" | "words";
  /** Delay per element in seconds */
  stagger?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Y offset to animate from (in px) */
  yOffset?: number;
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** Whether to trigger automatically when mounted */
  autoPlay?: boolean;
}

/**
 * Splits text into characters or words and animates them with GSAP.
 * Returns a ref to attach to the text container.
 */
export function useTextSplit<T extends HTMLElement = HTMLElement>(
  options: UseTextSplitOptions = {}
) {
  const {
    type = "chars",
    stagger = 0.03,
    duration = 0.5,
    yOffset = 40,
    delay = 0,
    autoPlay = false,
  } = options;

  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();

  const splitAndAnimate = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const text = el.textContent || "";
    el.innerHTML = "";

    const units =
      type === "chars" ? text.split("") : text.split(/(\s+)/);

    units.forEach((unit) => {
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.style.overflow = "hidden";

      if (unit === " " || /^\s+$/.test(unit)) {
        span.innerHTML = "&nbsp;";
      } else {
        const inner = document.createElement("span");
        inner.textContent = unit;
        inner.style.display = "inline-block";
        inner.classList.add("split-unit");

        if (!reducedMotion) {
          inner.style.transform = `translateY(${yOffset}px)`;
          inner.style.opacity = "0";
        }

        span.appendChild(inner);
      }

      el.appendChild(span);
    });

    if (reducedMotion) return;

    const splitUnits = el.querySelectorAll(".split-unit");
    gsap.to(splitUnits, {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: "power4.out",
    });
  }, [type, stagger, duration, yOffset, delay, reducedMotion]);

  useEffect(() => {
    if (autoPlay) {
      splitAndAnimate();
    }
  }, [autoPlay, splitAndAnimate]);

  return { ref, animate: splitAndAnimate };
}
