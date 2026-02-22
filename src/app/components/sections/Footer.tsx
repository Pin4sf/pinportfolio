"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import styles from "./Footer.module.scss";
import { navItems, contactData } from "@/data/portfolio";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { useGpuTier } from "@/app/hooks/useGpuTier";
import {
  ArrowUp,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  type LucideIcon,
} from "lucide-react";

const FluidBackground = dynamic(
  () => import("../three/FluidBackground"),
  { ssr: false }
);

const iconMap: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  github: Github,
  twitter: Twitter,
  instagram: Instagram,
};

const CTA_TEXT = "SAY HELLO";
const MARQUEE_BASE = [
  "Follow",
  "Let\u2019s Connect",
  "Say Hello",
  "Follow",
  "Let\u2019s Connect",
  "Say Hello",
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const ctaCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const magneticRefs = useRef<(HTMLElement | null)[]>([]);
  const hasRevealed = useRef(false);

  const reducedMotion = useReducedMotion();
  const gpuTier = useGpuTier();
  const isLowTier = gpuTier === "low";

  const [footerBgCanvas, setFooterBgCanvas] = useState<HTMLCanvasElement | null>(null);
  const [localTime, setLocalTime] = useState("");

  // ── Offscreen canvas for FluidBackground ──
  useEffect(() => {
    const c = document.createElement("canvas");
    c.width = 2;
    c.height = 2;
    const ctx = c.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#090a0e";
      ctx.fillRect(0, 0, 2, 2);
    }
    setFooterBgCanvas(c);
  }, []);

  // ── Local time (updates every minute) ──
  useEffect(() => {
    const update = () => {
      setLocalTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
          hour12: false,
        }) + " IST"
      );
    };
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  // (ResizeObserver removed — footer is now normal flow)

  // ── Scroll to top ──
  const scrollToTop = useCallback(() => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const runRevealAnimation = useCallback(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const revealEls = footer.querySelectorAll(`.${styles.reveal}`);
      const chars = ctaCharsRef.current.filter(Boolean);
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      const tl = gsap.timeline();

      // Signature + reveal elements stagger
      tl.fromTo(
        revealEls,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        },
        0
      );

      // Character-split CTA animation (desktop only)
      if (chars.length > 0 && !isMobile) {
        tl.fromTo(
          chars,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.6,
            stagger: 0.03,
            ease: "power3.out",
          },
          0.3
        );
      } else if (chars.length > 0) {
        // Mobile: simple fade-up for entire heading
        const heading = footer.querySelector(`.${styles.ctaHeading}`);
        if (heading) {
          // Set chars visible immediately on mobile
          gsap.set(chars, { y: "0%", opacity: 1 });
          tl.fromTo(
            heading,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
            0.3
          );
        }
      }
    }, footer);

    // Store context for potential cleanup
    return () => ctx.revert();
  }, []);

  // ── Reveal animation (IntersectionObserver → sequenced GSAP timeline) ──
  useEffect(() => {
    if (reducedMotion) return;
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRevealed.current) {
            hasRevealed.current = true;
            runRevealAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [reducedMotion, runRevealAnimation]);

  // ── Magnetic hover (desktop, mid/high tier) ──
  useEffect(() => {
    if (reducedMotion || isLowTier) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 767px)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const elements = magneticRefs.current.filter(Boolean) as HTMLElement[];
    const quickTos = new Map<HTMLElement, { x: ReturnType<typeof gsap.quickTo>; y: ReturnType<typeof gsap.quickTo> }>();

    elements.forEach((el) => {
      quickTos.set(el, {
        x: gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" }),
        y: gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" }),
      });
    });

    const handleMouseMove = (e: MouseEvent) => {
      const el = (e.currentTarget as HTMLElement);
      const qt = quickTos.get(el);
      if (!qt) return;

      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const dy = (e.clientY - rect.top - rect.height / 2) * 0.3;

      qt.x(dx);
      qt.y(dy);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const qt = quickTos.get(el);
      if (!qt) return;
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.4)",
        overwrite: true,
      });
    };

    elements.forEach((el) => {
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [reducedMotion, isLowTier]);

  // Helper to register magnetic refs
  let magneticIdx = 0;
  const magneticRef = (el: HTMLElement | null) => {
    magneticRefs.current[magneticIdx++] = el;
  };
  // Reset index each render
  magneticIdx = 0;

  // Build CTA chars for split animation
  const ctaChars = CTA_TEXT.split("").map((char, i) => {
    if (char === " ") {
      return <span key={`space-${i}`} className={styles.ctaSpace} />;
    }
    return (
      <span
        key={`char-${i}`}
        ref={(el) => {
          ctaCharsRef.current[i] = el;
        }}
        className={styles.ctaChar}
      >
        {char}
      </span>
    );
  });

  return (
        <footer ref={footerRef} className={styles.footer}>
          {/* Zone 1: Signature Hero with FluidBackground */}
          <div className={`${styles.signature} ${styles.reveal}`}>
            {!reducedMotion && footerBgCanvas && (
              <FluidBackground backgroundCanvas={footerBgCanvas} />
            )}
            <span className={styles.signatureName}>Shivansh Fulper</span>
          </div>

          {/* Zone 2: CTA */}
          <div className={`${styles.cta} ${styles.reveal}`}>
            <span className={styles.ctaHeading}>{ctaChars}</span>

            <a
              href={`mailto:${contactData.email}`}
              className={styles.emailLink}
              ref={magneticRef}
            >
              <span>{contactData.email}</span>
              <ArrowRight size={18} className={styles.emailArrow} />
            </a>
          </div>

          {/* Zone 3: Marquee Band — two identical halves for seamless loop */}
          <div className={styles.marqueeWrap}>
            <div className={styles.marqueeTrack}>
              {[0, 1].map((half) =>
                MARQUEE_BASE.map((text, i) => (
                  <span key={`${half}-${i}`} className={styles.marqueeItem}>
                    {text}
                    <span className={styles.marqueeDot} />
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Zone 4: Grid */}
          <div className={styles.grid}>
            {/* Navigate */}
            <div className={`${styles.col} ${styles.reveal}`}>
              <span className={styles.colLabel}>Navigate</span>
              <nav className={styles.nav}>
                {navItems.map((item) => (
                  <a key={item.label} href={item.href} className={styles.link}>
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Status */}
            <div className={`${styles.col} ${styles.reveal}`}>
              <span className={styles.colLabel}>Status</span>
              <div className={styles.status}>
                <span className={styles.statusDot} />
                <span className={styles.statusText}>
                  Available for collaboration
                </span>
              </div>
              <span className={styles.location}>{contactData.location}</span>
              {localTime && (
                <span className={styles.localTime}>{localTime}</span>
              )}
            </div>

            {/* Connect */}
            <div className={`${styles.col} ${styles.reveal}`}>
              <span className={styles.colLabel}>Connect</span>
              <div className={styles.socials}>
                {contactData.socials.map((social) => {
                  const Icon = iconMap[social.icon];
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={social.name}
                      ref={magneticRef}
                    >
                      <span className={styles.socialIcon}>
                        {Icon && <Icon size={16} />}
                      </span>
                      <span>{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Zone 5: Bottom Bar */}
          <div className={`${styles.bottom} ${styles.reveal}`}>
            <span className={styles.copy}>
              &copy; {new Date().getFullYear()} Shivansh Fulper
            </span>

            <span className={styles.credit}>
              Built by SF{" "}
              <span className={styles.seal} aria-hidden="true">
                印
              </span>
            </span>

            <button
              className={styles.backToTop}
              onClick={scrollToTop}
              aria-label="Back to top"
              ref={magneticRef as React.Ref<HTMLButtonElement>}
            >
              <ArrowUp size={14} />
              <span>Back to top</span>
            </button>
          </div>
        </footer>
  );
}
