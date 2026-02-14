"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Makes an element subtly pull toward the cursor within a radius.
 * Springs back to origin on mouse leave.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveX = gsap.quickTo(el, "x", {
      duration: 0.4,
      ease: "power3",
    });
    const moveY = gsap.quickTo(el, "y", {
      duration: 0.4,
      ease: "power3",
    });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      moveX((e.clientX - cx) * strength);
      moveY((e.clientY - cy) * strength);
    };

    const onLeave = () => {
      moveX(0);
      moveY(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return ref;
}
