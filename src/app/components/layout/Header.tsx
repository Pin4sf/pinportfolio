"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Header.module.scss";
import CoolLink from "../ui/CoolLink";
import { navItems } from "@/data/portfolio";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  // Scroll-spy: track active section
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Hide on scroll-down, show on scroll-up + glass effect
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 100);
      setHidden(currentY > lastScrollY.current && currentY > 300);
      lastScrollY.current = currentY;

      // Update scroll progress bar
      if (progressRef.current) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const progress = total > 0 ? currentY / total : 0;
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus trap + Escape key for mobile overlay
  useEffect(() => {
    if (!menuOpen) return;

    const overlay = document.querySelector(
      `.${styles.overlay}`
    ) as HTMLElement | null;
    if (!overlay) return;

    const focusable = overlay.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    first?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  // Reveal header after loading screen
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    gsap.fromTo(
      header,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 2, ease: "power3.out" }
    );
  }, []);

  return (
    <>
      {/* Scroll progress indicator */}
      <div ref={progressRef} className={styles.progress} aria-hidden="true" />

      <header
        ref={headerRef}
        className={cn(
          styles.header,
          scrolled && styles.scrolled,
          hidden && styles.hidden
        )}
      >
        <div className={styles.inner}>
          <a href="#" className={styles.logo}>
            SF
          </a>

          <nav className={styles.nav} aria-label="Main navigation">
            {navItems.map((item) => (
              <CoolLink
                key={item.label}
                href={item.href}
                text={item.label}
                className={cn(
                  styles.navLink,
                  activeSection === item.href && styles.active
                )}
              />
            ))}
          </nav>

          <div className={styles.actions}>
            <a href="#contact" className={styles.cta}>
              Let&apos;s Talk
            </a>
          </div>

          <button
            className={cn(styles.menuBtn, menuOpen && styles.menuOpen)}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={cn(styles.overlay, menuOpen && styles.overlayOpen)}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!menuOpen}
      >
        <nav className={styles.overlayNav} aria-label="Mobile navigation">
          {navItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              className={styles.overlayLink}
              style={{ transitionDelay: `${0.1 + i * 0.05}s` }}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className={styles.overlayLink}
            style={{ transitionDelay: `${0.1 + navItems.length * 0.05}s` }}
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
          >
            Let&apos;s Talk
          </a>
        </nav>
      </div>
    </>
  );
}
