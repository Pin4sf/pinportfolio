"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "./PageTransition.module.scss";
import { useTransition } from "@/lib/TransitionContext";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

function getRouteLabel(href: string | null): string {
  if (!href) return "";
  if (href === "/") return "Home";
  if (href.startsWith("/work/")) {
    const slug = href.replace("/work/", "");
    return slug.charAt(0).toUpperCase() + slug.slice(1);
  }
  if (href === "/writing") return "Writing";
  if (href.startsWith("/writing/")) return "Article";
  return "";
}

export default function PageTransition() {
  const { phase, targetHref, onExitComplete, onEnterComplete } = useTransition();
  const reducedMotion = useReducedMotion();

  const overlayRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Exit animation
  useEffect(() => {
    if (phase !== "exit") return;

    const curtain = curtainRef.current;
    const overlay = overlayRef.current;
    const line = lineRef.current;
    const label = labelRef.current;
    if (!curtain || !overlay || !line || !label) return;

    if (reducedMotion) {
      onExitComplete();
      return;
    }

    overlay.style.pointerEvents = "all";

    tlRef.current?.kill();
    const tl = gsap.timeline({ onComplete: onExitComplete });
    tlRef.current = tl;

    // Curtain rises from bottom
    tl.fromTo(
      curtain,
      { clipPath: "inset(100% 0 0 0)" },
      { clipPath: "inset(0% 0 0 0)", duration: 0.5, ease: "power4.inOut" }
    );

    // Accent line expands
    tl.fromTo(
      line,
      { width: 0 },
      { width: 80, duration: 0.35, ease: "power2.out" },
      0.25
    );

    // Route label fades in
    tl.to(label, { opacity: 1, duration: 0.15, ease: "power2.out" });
  }, [phase, onExitComplete, reducedMotion]);

  // Enter animation
  useEffect(() => {
    if (phase !== "enter") return;

    const curtain = curtainRef.current;
    const overlay = overlayRef.current;
    const line = lineRef.current;
    const label = labelRef.current;
    if (!curtain || !overlay || !line || !label) return;

    if (reducedMotion) {
      overlay.style.pointerEvents = "none";
      onEnterComplete();
      return;
    }

    tlRef.current?.kill();
    const tl = gsap.timeline({
      onComplete: () => {
        overlay.style.pointerEvents = "none";
        onEnterComplete();
      },
    });
    tlRef.current = tl;

    // Fade out label + shrink line
    tl.to(label, { opacity: 0, duration: 0.1, ease: "power2.in" });
    tl.to(line, { width: 0, duration: 0.2, ease: "power2.in" }, "<");

    // Curtain slides up and off
    tl.to(curtain, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.5,
      ease: "power4.inOut",
    });

    // Reset for next transition
    tl.set(curtain, { clipPath: "inset(100% 0 0 0)" });
  }, [phase, onEnterComplete, reducedMotion]);

  // Cleanup
  useEffect(() => {
    return () => {
      tlRef.current?.kill();
    };
  }, []);

  return (
    <div ref={overlayRef} className={styles.overlay} aria-hidden="true">
      <div ref={curtainRef} className={styles.curtain}>
        <div ref={lineRef} className={styles.accentLine} />
        <span ref={labelRef} className={styles.routeLabel}>
          {getRouteLabel(targetHref)}
        </span>
      </div>
    </div>
  );
}
