"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

    cards.forEach((card, i) => {
      const image = card.querySelector(`.${styles.imageWrap}`);
      const img = card.querySelector(`.${styles.image}`);
      const text = card.querySelector(`.${styles.textContent}`);
      const number = card.querySelector(`.${styles.number}`);
      const isEven = i % 2 === 0;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Alternating L/R clip-path reveal
      tl.fromTo(
        number,
        { opacity: 0, x: isEven ? -20 : 20 },
        { opacity: 0.08, x: 0, duration: 0.8, ease: "expo.out" }
      )
        .fromTo(
          image,
          { clipPath: isEven ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" },
          {
            clipPath: "inset(0 0% 0 0%)",
            duration: 1.2,
            ease: "power4.inOut",
          },
          0
        )
        .fromTo(
          text?.children ? Array.from(text.children) : [],
          { x: isEven ? -30 : 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: "expo.out",
          },
          0.4
        );

      // Scrub parallax on image
      if (img) {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      }
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [reducedMotion]);

  // Magnetic card hover
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

      const moveX = ((x - centerX) / centerX) * 6;
      const moveY = ((y - centerY) / centerY) * 4;

      gsap.to(card, {
        x: moveX,
        y: moveY,
        duration: 0.4,
        ease: "power1.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = (e: MouseEvent) => {
      gsap.to(e.currentTarget as HTMLElement, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        overwrite: true,
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
    <section ref={sectionRef} id="ventures" className={styles.section}>
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
