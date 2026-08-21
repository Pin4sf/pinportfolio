"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { isPageCurrent } from "@/lib/navigation";
import styles from "./Header.module.scss";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!menuOpen) return;

    const menuButton = menuButtonRef.current;
    const overlay = overlayRef.current;
    if (!overlay) return;

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = overlay.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    first?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      menuButton?.focus();
    };
  }, [menuOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <a href="/" className={styles.logo} aria-label="Shivansh Fulper home">
            SF
          </a>

          <nav className={styles.nav} aria-label="Main navigation">
            {navItems.map((item) => {
              const active = isPageCurrent(pathname, item.href);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(styles.navLink, active && styles.active)}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className={styles.actions}>
            <a href="/#contact" className={styles.cta}>
              Let&apos;s Talk
            </a>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className={cn(styles.menuBtn, menuOpen && styles.menuOpen)}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        ref={overlayRef}
        id="mobile-navigation"
        className={cn(styles.overlay, menuOpen && styles.overlayOpen)}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!menuOpen}
      >
        <nav className={styles.overlayNav} aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={styles.overlayLink}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
              aria-current={
                isPageCurrent(pathname, item.href) ? "page" : undefined
              }
            >
              {item.label}
            </a>
          ))}
          <a
            href="/#contact"
            className={styles.overlayLink}
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
