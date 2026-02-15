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
    window.__lenis = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Velocity-based content skew
    const skew = { current: 0 };

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);

      // Smooth velocity skew
      const velocity = lenis.velocity || 0;
      const target = gsap.utils.clamp(-2, 2, velocity * 0.15);
      skew.current += (target - skew.current) * 0.1;

      if (Math.abs(skew.current) > 0.005) {
        document.documentElement.style.setProperty(
          "--sv",
          skew.current.toFixed(4)
        );
      } else if (skew.current !== 0) {
        skew.current = 0;
        document.documentElement.style.setProperty("--sv", "0");
      }
    });
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
      window.__lenis = null;
      document.documentElement.style.removeProperty("--sv");
      lenis.destroy();
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return <div>{children}</div>;
}
