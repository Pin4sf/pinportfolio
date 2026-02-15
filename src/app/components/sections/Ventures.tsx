"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Ventures.module.scss";
import { getProjects } from "@/data/portfolio";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { ArrowUpRight, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Ventures() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const projects = getProjects();
  const featured = projects[0];
  const others = projects.slice(1);

  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll(`.${styles.card}`);
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Tag pill hover wobble
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const tags = section.querySelectorAll(
      `.${styles.tag}`
    ) as NodeListOf<HTMLElement>;

    const handleEnter = (e: MouseEvent) => {
      gsap.to(e.currentTarget, {
        scale: 1.1,
        rotation: gsap.utils.random(-3, 3),
        duration: 0.3,
        ease: "back.out(2)",
        overwrite: true,
      });
    };

    const handleLeave = (e: MouseEvent) => {
      gsap.to(e.currentTarget, {
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: "elastic.out(1, 0.6)",
        overwrite: true,
      });
    };

    tags.forEach((tag) => {
      tag.addEventListener("mouseenter", handleEnter);
      tag.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      tags.forEach((tag) => {
        tag.removeEventListener("mouseenter", handleEnter);
        tag.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="projects" className={styles.section}>
      {/* Viewport-filling PROJECTS marquee */}
      <div className="marquee" style={{ top: "50%", transform: "translateY(-50%)" }}>
        <div className="marquee__inner">
          <span className="marquee__text marquee__text--giant">PROJECTS</span>
          <span className="marquee__text marquee__text--giant">PROJECTS</span>
          <span className="marquee__text marquee__text--giant">PROJECTS</span>
          <span className="marquee__text marquee__text--giant">PROJECTS</span>
        </div>
      </div>
      <span className="section__label">Projects</span>
      <h2 className={styles.heading}>What I&apos;m Building</h2>

      {/* Featured venture */}
      {featured && (
        <div className={`${styles.card} ${styles.featured}`}>
          <div className={styles.featuredImage}>
            <img
              src={featured.heroImage}
              alt={featured.name}
              loading="lazy"
            />
          </div>
          <div className={styles.featuredContent}>
            <div className={styles.statusBadge}>
              <span className={styles.statusDot} />
              {featured.category === "experiment" ? "Experiment" : "Side Project"}
            </div>
            <h3 className={styles.ventureName}>{featured.name}</h3>
            <p className={styles.ventureTagline}>{featured.tagline}</p>
            <p className={styles.ventureChallenge}>{featured.challenge}</p>
            <div className={styles.tags}>
              {featured.techStack.map((tech) => (
                <span key={tech} className={styles.tag}>
                  {tech}
                </span>
              ))}
            </div>
            <div className={styles.links}>
              {featured.liveUrl && (
                <a
                  href={featured.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Visit <ExternalLink size={14} />
                </a>
              )}
              <a
                href={`/work/${featured.slug}`}
                className={styles.linkSecondary}
              >
                Read Case Study <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Other ventures */}
      {others.length > 0 && (
        <div className={styles.grid}>
          {others.map((project) => (
            <div key={project.slug} className={styles.card}>
              <div className={styles.cardImage}>
                <img
                  src={project.heroImage}
                  alt={project.name}
                  loading="lazy"
                />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.statusBadge}>
                  <span className={`${styles.statusDot} ${project.category === "experiment" ? styles.previous : ""}`} />
                  {project.category === "experiment" ? "Experiment" : "Side Project"}
                </div>
                <h3 className={styles.cardName}>{project.name}</h3>
                <p className={styles.cardTagline}>{project.tagline}</p>
                <div className={styles.tags}>
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className={styles.tag}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className={styles.links}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkSecondary}
                    >
                      Visit <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
