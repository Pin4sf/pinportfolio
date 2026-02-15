"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import styles from "./Footer.module.scss";
import { navItems, contactData } from "@/data/portfolio";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { ArrowUp, Github, Linkedin, Twitter, Instagram, type LucideIcon } from "lucide-react";

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

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [footerBgCanvas, setFooterBgCanvas] = useState<HTMLCanvasElement | null>(null);

  // Create a small offscreen canvas filled with the footer bg color
  // FluidBackground uses it as the "background" to refract through water
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Footer entrance — staggered reveal
  useEffect(() => {
    if (reducedMotion) return;
    const footer = footerRef.current;
    if (!footer) return;

    const revealEls = footer.querySelectorAll(`.${styles.reveal}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              revealEls,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.08,
                ease: "power2.out",
              }
            );

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <footer ref={footerRef} className={styles.footer}>
      {/* Large signature name with water effect */}
      <div className={`${styles.signature} ${styles.reveal}`}>
        {!reducedMotion && footerBgCanvas && (
          <FluidBackground backgroundCanvas={footerBgCanvas} />
        )}
        <span className={styles.signatureName}>Shivansh Fulper</span>
      </div>

      {/* Grid: Nav | Status | Socials */}
      <div className={styles.grid}>
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

        <div className={`${styles.col} ${styles.reveal}`}>
          <span className={styles.colLabel}>Status</span>
          <div className={styles.status}>
            <span className={styles.statusDot} />
            <span className={styles.statusText}>Available for collaboration</span>
          </div>
          <span className={styles.location}>{contactData.location}</span>
        </div>

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
                >
                  {Icon && <Icon size={18} />}
                  <span>{social.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={`${styles.bottom} ${styles.reveal}`}>
        <span className={styles.copy}>
          &copy; {new Date().getFullYear()} Shivansh Fulper
        </span>

        <span className={styles.credit}>
          Designed &amp; built by hand <span className={styles.seal} aria-hidden="true">印</span>
        </span>

        <button
          className={styles.backToTop}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp size={14} />
          <span>Back to top</span>
        </button>
      </div>
    </footer>
  );
}
