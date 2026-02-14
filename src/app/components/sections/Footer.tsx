"use client";

import { useRef, useEffect } from "react";
import anime from "animejs";
import styles from "./Footer.module.scss";
import { navItems, contactData } from "@/data/portfolio";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { ArrowUp, Github, Linkedin, Twitter, Instagram, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  github: Github,
  twitter: Twitter,
  instagram: Instagram,
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // anime.js footer entrance — staggered reveal
  useEffect(() => {
    if (reducedMotion) return;
    const footer = footerRef.current;
    if (!footer) return;

    const revealEls = footer.querySelectorAll(`.${styles.reveal}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: Array.from(revealEls),
              opacity: [0, 1],
              translateY: [30, 0],
              delay: anime.stagger(80),
              duration: 800,
              easing: "easeOutCubic",
            });

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
      {/* Large signature name */}
      <div className={`${styles.signature} ${styles.reveal}`}>
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
          Designed &amp; built by hand
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
