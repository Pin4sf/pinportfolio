"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Handle hash navigation
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash || !hash.startsWith("#")) return;

      e.preventDefault();
      const el = document.querySelector(hash);
      if (el) lenis.scrollTo(el as HTMLElement);
    };

    document.addEventListener("click", handleClick);

    return () => {
      (window as any).__lenis = null;
      lenis.destroy();
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return <div>{children}</div>;
}
