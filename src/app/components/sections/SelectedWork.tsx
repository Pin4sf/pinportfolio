"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import anime from "animejs";
import styles from "./SelectedWork.module.scss";
import { getVentures } from "@/data/portfolio";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import TransitionLink from "../ui/TransitionLink";

gsap.registerPlugin(ScrollTrigger);

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const projects = getVentures();

  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(`.${styles.card}`);

    cards.forEach((card) => {
      const image = card.querySelector(`.${styles.imageWrap}`);
      const text = card.querySelector(`.${styles.textContent}`);
      const number = card.querySelector(`.${styles.number}`);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        number,
        { opacity: 0, scale: 0.8 },
        { opacity: 0.08, scale: 1, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          image,
          { clipPath: "inset(0 100% 0 0)", scale: 1.1 },
          {
            clipPath: "inset(0 0% 0 0)",
            scale: 1,
            duration: 1,
            ease: "power3.inOut",
          },
          0
        )
        .fromTo(
          text?.children ? Array.from(text.children) : [],
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power3.out",
          },
          0.3
        );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [reducedMotion]);

  // anime.js magnetic card hover
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(
      `.${styles.card}`
    ) as NodeListOf<HTMLElement>;

    const handleMouseMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle shift toward cursor
      const moveX = ((x - centerX) / centerX) * 6;
      const moveY = ((y - centerY) / centerY) * 4;

      anime({
        targets: card,
        translateX: moveX,
        translateY: moveY,
        duration: 400,
        easing: "easeOutQuad",
      });
    };

    const handleMouseLeave = (e: MouseEvent) => {
      anime({
        targets: e.currentTarget,
        translateX: 0,
        translateY: 0,
        duration: 800,
        easing: "easeOutElastic(1, .5)",
      });
    };

    cards.forEach((card) => {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="ventures" className={`${styles.section} section--light`}>
      <span className="section__label">Ventures</span>

      <div className={styles.list}>
        {projects.map((project, i) => (
          <TransitionLink
            key={project.slug}
            href={`/work/${project.slug}`}
            className={styles.card}
            aria-label={`View ${project.name} case study`}
          >
            {/* Per-card project name marquee */}
            <div
              className={`marquee ${i % 2 !== 0 ? "marquee--reverse" : ""}`}
              style={{ top: "50%", transform: "translateY(-50%)" }}
              aria-hidden="true"
            >
              <div className="marquee__inner">
                {Array.from({ length: 4 }, (_, j) => (
                  <span key={j} className="marquee__text marquee__text--giant">
                    {project.name.split(" ")[0].toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            <span className={styles.number}>
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className={styles.imageWrap}>
              <img
                src={project.heroImage}
                alt={project.name}
                className={styles.image}
                loading="lazy"
              />
            </div>

            <div className={styles.textContent}>
              <div className={styles.meta}>
                <span className={styles.role}>{project.role}</span>
                <span className={styles.divider}>·</span>
                <span className={styles.timeline}>{project.timeline}</span>
              </div>

              <h3 className={styles.projectName}>{project.name}</h3>

              <p className={styles.tagline}>{project.tagline}</p>

              <div className={styles.tags}>
                {project.techStack.slice(0, 4).map((tech) => (
                  <span key={tech} className={styles.tag}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className={styles.cardLinks}>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.visitLink}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Visit Website <ExternalLink size={14} />
                  </a>
                )}
                <span className={styles.viewLink}>
                  View Case Study <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          </TransitionLink>
        ))}
      </div>
    </section>
  );
}
