"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedEvidence } from "@/data/portfolio";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import styles from "./SelectedWork.module.scss";

gsap.registerPlugin(ScrollTrigger);

const statusLabels = {
  observed: "Observed",
  built: "Built",
  demonstrated: "Demonstrated",
  derived: "Derived",
  hypothesis: "Hypothesis",
  direction: "Long-term direction",
  historical: "Historical",
};

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const records = getFeaturedEvidence();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const context = gsap.context(() => {
      sectionRef.current
        ?.querySelectorAll(`.${styles.card}`)
        .forEach((card) => {
          gsap.fromTo(
            card,
            { y: 48, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                toggleActions: "play none none none",
              },
            },
          );
        });
    }, sectionRef);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="evidence" className={styles.section}>
      <header className={styles.header}>
        <span className="section__label">Selected work</span>
        <h2 className={styles.heading}>What I’ve built.</h2>
        <p className={styles.intro}>
          A few pieces of work that shaped what I care about now.
        </p>
      </header>

      <div className={styles.list}>
        {records.map((record, index) => (
          <article
            key={record.slug}
            id={`evidence-${record.slug}`}
            className={styles.card}
          >
            <div className={styles.visual}>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {record.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={record.image} alt="" className={styles.image} />
              ) : (
                <div className={styles.phaseMark} aria-hidden="true">
                  {record.phase.replace("-", " ")}
                </div>
              )}
            </div>

            <div className={styles.content}>
              <div className={styles.statuses} aria-label="Evidence status">
                {record.status.map((status) => (
                  <span key={status} data-status={status}>
                    {statusLabels[status]}
                  </span>
                ))}
              </div>

              <p className={styles.meta}>
                {record.phase.replace("-", " ")} · {record.role}
              </p>
              <h3>{record.title}</h3>
              <p className={styles.summary}>{record.summary}</p>

              <dl className={styles.details}>
                <div>
                  <dt>My part</dt>
                  <dd>{record.contribution}</dd>
                </div>
                <div>
                  <dt>What exists</dt>
                  <dd>{record.observableResult}</dd>
                </div>
              </dl>

              <div className={styles.question}>
                <span>What it made me ask</span>
                <p>{record.questions[0]}</p>
              </div>

              {record.links.length > 0 && (
                <nav
                  className={styles.links}
                  aria-label={`${record.title} evidence links`}
                >
                  {record.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                    >
                      {link.label}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  ))}
                </nav>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
