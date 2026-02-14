"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CaseStudy.module.scss";
import type { CaseStudy as CaseStudyType } from "@/data/portfolio";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import TransitionLink from "@/app/components/ui/TransitionLink";

gsap.registerPlugin(ScrollTrigger);

interface CaseStudyProps {
  caseStudy: CaseStudyType;
  prev: CaseStudyType | null;
  next: CaseStudyType | null;
}

export default function CaseStudy({ caseStudy, prev, next }: CaseStudyProps) {
  const pageRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const page = pageRef.current;
    if (!page) return;

    const sections = page.querySelectorAll(`.${styles.section}`);
    sections.forEach((section) => {
      gsap.fromTo(
        section.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [reducedMotion]);

  return (
    <main ref={pageRef} className={styles.page}>
      <TransitionLink href="/" className={styles.back}>
        <ArrowLeft size={16} />
        Home
      </TransitionLink>

      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.heroMeta}>
          <span className={styles.category}>{caseStudy.category}</span>
          <span className={styles.timeline}>{caseStudy.timeline}</span>
        </div>
        <h1 className={styles.title}>{caseStudy.name}</h1>
        <p className={styles.tagline}>{caseStudy.tagline}</p>
      </header>

      {/* Hero Image */}
      <div className={styles.heroImage}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={caseStudy.heroImage} alt={caseStudy.name} />
      </div>

      {/* Overview Panel */}
      <div className={`${styles.section} ${styles.overview}`}>
        <div className={styles.overviewItem}>
          <span className={styles.overviewLabel}>Role</span>
          <span className={styles.overviewValue}>{caseStudy.role}</span>
        </div>
        <div className={styles.overviewItem}>
          <span className={styles.overviewLabel}>Timeline</span>
          <span className={styles.overviewValue}>{caseStudy.timeline}</span>
        </div>
        <div className={styles.overviewItem}>
          <span className={styles.overviewLabel}>Stack</span>
          <div className={styles.tags}>
            {caseStudy.techStack.map((tech) => (
              <span key={tech} className={styles.tag}>
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.overviewItem}>
          <span className={styles.overviewLabel}>Links</span>
          <div className={styles.links}>
            {caseStudy.liveUrl && (
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                <ExternalLink size={14} /> Live
              </a>
            )}
            {caseStudy.githubUrl && (
              <a
                href={caseStudy.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                <Github size={14} /> GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Challenge */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>The Challenge</h2>
        <p className={styles.sectionText}>{caseStudy.challenge}</p>
      </div>

      {/* Approach */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>The Approach</h2>
        <p className={styles.sectionText}>{caseStudy.approach}</p>
      </div>

      {/* Solution */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>The Solution</h2>
        <p className={styles.sectionText}>{caseStudy.solution}</p>
        {caseStudy.solutionImages.length > 0 && (
          <div className={styles.solutionImages}>
            {caseStudy.solutionImages.map((img, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={img}
                alt={`${caseStudy.name} screenshot ${i + 1}`}
                className={styles.solutionImg}
              />
            ))}
          </div>
        )}
      </div>

      {/* Impact */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Impact &amp; Results</h2>
        <p className={styles.sectionText}>{caseStudy.impact}</p>
      </div>

      {/* Reflection */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Reflection</h2>
        <p className={styles.sectionText}>{caseStudy.reflection}</p>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        {prev ? (
          <TransitionLink href={`/work/${prev.slug}`} className={styles.navLink}>
            <ArrowLeft size={16} />
            <div>
              <span className={styles.navLabel}>Previous</span>
              <span className={styles.navName}>{prev.name}</span>
            </div>
          </TransitionLink>
        ) : (
          <div />
        )}
        {next ? (
          <TransitionLink
            href={`/work/${next.slug}`}
            className={`${styles.navLink} ${styles.navRight}`}
          >
            <div>
              <span className={styles.navLabel}>Next</span>
              <span className={styles.navName}>{next.name}</span>
            </div>
            <ArrowRight size={16} />
          </TransitionLink>
        ) : (
          <div />
        )}
      </nav>
    </main>
  );
}
