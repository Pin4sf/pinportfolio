"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { getVentures } from "@/data/portfolio";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import styles from "./SelectedWork.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const projects = getVentures();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        `.${styles.card}`,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="ventures" className={styles.section}>
      <div className={styles.header}>
        <span className="section__label">Ventures</span>
        <h2>Things I’m building.</h2>
      </div>

      <div className={styles.list}>
        {projects.map((project, index) => (
          <article key={project.slug} className={styles.card}>
            <Link
              href={`/work/${project.slug}`}
              className={styles.mediaLink}
              aria-label={`View ${project.name} case study`}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={project.homepageImage ?? project.heroImage}
                  alt=""
                  className={styles.image}
                  fill
                  sizes="(max-width: 820px) 100vw, 58vw"
                  priority={index === 0}
                />
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </Link>

            <div className={styles.content}>
              <p className={styles.meta}>
                {project.role} · {project.timeline}
              </p>
              <h3>
                <Link
                  href={`/work/${project.slug}`}
                  className={styles.titleLink}
                >
                  {project.name}
                </Link>
              </h3>
              <p className={styles.tagline}>{project.tagline}</p>
              <ul className={styles.tags} aria-label="Technologies">
                {project.techStack.slice(0, 4).map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <div className={styles.actions}>
                <Link
                  href={`/work/${project.slug}`}
                  className={styles.viewLink}
                >
                  View case study <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.liveLink}
                  >
                    Visit website <ExternalLink size={13} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
