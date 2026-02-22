"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./SectionProgress.module.scss";
import { scrollToSection } from "@/lib/scrollRestoration";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "hero", label: "Home" },
  { id: "ventures", label: "Work" },
  { id: "about", label: "About" },
  { id: "writing", label: "Writing" },
  { id: "experience", label: "Timeline" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function SectionProgress() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Show progress after scrolling past hero
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.3);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Track which section is in viewport
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleDotClick = (sectionId: string) => {
    scrollToSection(`#${sectionId}`);
  };

  return (
    <nav
      className={`${styles.progress} ${isVisible ? styles.visible : ""}`}
      aria-label="Section navigation"
    >
      <div className={styles.dots}>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleDotClick(section.id)}
            className={`${styles.dot} ${
              activeSection === section.id ? styles.active : ""
            }`}
            aria-label={`Go to ${section.label}`}
            title={section.label}
          >
            <span className={styles.dotInner} />
            <span className={styles.label}>{section.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
