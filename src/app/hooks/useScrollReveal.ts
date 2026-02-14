"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  stagger?: number;
  duration?: number;
  y?: number;
  delay?: number;
  start?: string;
  clipReveal?: boolean;
}

/**
 * Reveals child elements with staggered animation on scroll.
 * Add `data-reveal` to children that should animate in.
 * Add `data-reveal-clip` to the container for a clip-path section reveal.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  const {
    stagger = 0.08,
    duration = 0.8,
    y = 60,
    delay = 0,
    start = "top 85%",
    clipReveal = false,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Clip-path reveal on the section itself
      if (clipReveal) {
        gsap.set(el, { clipPath: "inset(8% 0 8% 0)" });
        gsap.to(el, {
          clipPath: "inset(0% 0 0% 0)",
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none none",
          },
        });
      }

      // Staggered reveal for children
      const items = el.querySelectorAll("[data-reveal]");
      if (items.length > 0) {
        gsap.set(items, { y, opacity: 0 });
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none none",
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [stagger, duration, y, delay, start, clipReveal]);

  return ref;
}
