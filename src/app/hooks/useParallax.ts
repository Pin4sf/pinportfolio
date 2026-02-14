"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface UseParallaxOptions {
  /** Speed multiplier — 1 = no parallax, < 1 = slower, > 1 = faster */
  speed?: number;
  /** Direction of the parallax movement */
  direction?: "vertical" | "horizontal";
}

/**
 * Applies a scroll-based parallax effect to an element.
 * Returns a ref to attach to the element.
 */
export function useParallax<T extends HTMLElement = HTMLElement>(
  options: UseParallaxOptions = {}
) {
  const { speed = 0.5, direction = "vertical" } = options;
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    const distance = (1 - speed) * 100;
    const prop = direction === "vertical" ? "y" : "x";

    const tween = gsap.to(el, {
      [prop]: -distance,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed, direction, reducedMotion]);

  return ref;
}
