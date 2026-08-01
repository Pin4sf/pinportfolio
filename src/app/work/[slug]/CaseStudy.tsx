"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  FileText,
  Github,
  Play,
} from "lucide-react";
import type {
  CaseStudy as CaseStudyType,
  CaseStudyNarrative,
} from "@/data/portfolio";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import TransitionLink from "@/app/components/ui/TransitionLink";
import styles from "./CaseStudy.module.scss";

gsap.registerPlugin(ScrollTrigger);

interface CaseStudyProps {
  caseStudy: CaseStudyType;
  prev: CaseStudyType | null;
  next: CaseStudyType | null;
}

interface RichCaseStudyProps {
  caseStudy: CaseStudyType;
  narrative: CaseStudyNarrative;
}

function handleMatrixKeyDown(event: KeyboardEvent<HTMLDivElement>) {
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

  event.preventDefault();
  event.currentTarget.scrollBy({
    left: event.key === "ArrowRight" ? 180 : -180,
  });
}

function RichCaseStudy({ caseStudy, narrative }: RichCaseStudyProps) {
  const videoArtifacts = narrative.artifacts.filter(
    (artifact) => artifact.kind === "video",
  );
  const linkArtifacts = narrative.artifacts.filter(
    (artifact) => artifact.kind === "link",
  );

  return (
    <>
      <header className={styles.richHero} data-reveal>
        <div className={styles.heroCopy}>
          <div className={styles.heroBrandRow}>
            {narrative.brandMark && (
              <div className={styles.brandMark}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={narrative.brandMark.src}
                  alt={narrative.brandMark.alt}
                />
              </div>
            )}
            <div className={styles.heroMeta}>
              <span className={styles.category}>{narrative.heroEyebrow}</span>
              <span className={styles.timeline}>{caseStudy.timeline}</span>
            </div>
          </div>
          <h1 className={styles.richTitle}>{caseStudy.name}</h1>
          <p className={styles.heroStatement}>{narrative.heroStatement}</p>
          <p className={styles.heroBody}>{narrative.heroBody}</p>
          <ul className={styles.statusList} aria-label="Waldo project status">
            {narrative.status.map((status) => (
              <li key={status}>{status}</li>
            ))}
          </ul>
        </div>

        <figure className={styles.heroFigure}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={caseStudy.heroImage} alt={narrative.heroImageAlt} />
          <figcaption>{narrative.heroImageCaption}</figcaption>
        </figure>
      </header>

      <section
        className={clsx(styles.section, styles.overview)}
        aria-label={`${caseStudy.name} project overview`}
        data-reveal
      >
        <div className={styles.overviewItem}>
          <span className={styles.overviewLabel}>Role</span>
          <span className={styles.overviewValue}>{caseStudy.role}</span>
        </div>
        <div className={styles.overviewItem}>
          <span className={styles.overviewLabel}>Timeline</span>
          <span className={styles.overviewValue}>{caseStudy.timeline}</span>
        </div>
        <div className={styles.overviewItem}>
          <span className={styles.overviewLabel}>System</span>
          <div className={styles.tags}>
            {caseStudy.techStack.map((tech) => (
              <span key={tech} className={styles.tag}>
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.overviewItem}>
          <span className={styles.overviewLabel}>Product</span>
          {caseStudy.liveUrl && (
            <a
              href={caseStudy.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              heywaldo.in <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      </section>

      <div className={styles.story}>
        {narrative.sections.map((section) => (
          <section
            id={section.id}
            key={section.id}
            className={clsx(styles.section, styles.storySection)}
            data-reveal
          >
            <div className={styles.storyHeading}>
              <p className={styles.eyebrow}>{section.eyebrow}</p>
              <h2>{section.title}</h2>
            </div>

            <div className={styles.storyBody}>
              <div className={styles.prose}>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {section.cards && (
                <div className={styles.cardGrid}>
                  {section.cards.map((card) => (
                    <article key={card.title} className={styles.storyCard}>
                      {card.label && (
                        <p className={styles.cardLabel}>{card.label}</p>
                      )}
                      <h3>{card.title}</h3>
                      <p>{card.body}</p>
                    </article>
                  ))}
                </div>
              )}

              {section.matrix && (
                <div className={styles.matrixBlock}>
                  <p
                    id={`${section.id}-matrix-hint`}
                    className={styles.matrixHint}
                  >
                    {section.matrix.hint}
                  </p>
                  <div
                    className={styles.matrixWrap}
                    role="region"
                    aria-label={section.matrix.caption}
                    aria-describedby={`${section.id}-matrix-hint`}
                    tabIndex={0}
                    onKeyDown={handleMatrixKeyDown}
                  >
                    <table className={styles.matrix}>
                      <caption>{section.matrix.caption}</caption>
                      <thead>
                        <tr>
                          <th scope="col">{section.matrix.columns.pressure}</th>
                          <th scope="col">
                            {section.matrix.columns.strategicRole}
                          </th>
                          <th scope="col">{section.matrix.columns.fit}</th>
                          <th scope="col">
                            {section.matrix.columns.confidence}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.matrix.rows.map((row) => (
                          <tr key={row.pressure}>
                            <th scope="row">{row.pressure}</th>
                            <td>{row.strategicRole}</td>
                            <td>{row.fit}</td>
                            <td>{row.confidence}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {section.media && (
                <figure
                  className={clsx(
                    styles.storyMedia,
                    section.media.presentation === "poster" &&
                      styles.posterMedia,
                    section.media.presentation === "portrait" &&
                      styles.portraitMedia,
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={section.media.src}
                    alt={section.media.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>
                    <span>{section.media.caption}</span>
                    {section.media.source && (
                      <a
                        href={section.media.source.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {section.media.source.label}
                        <ExternalLink size={11} aria-hidden="true" />
                      </a>
                    )}
                  </figcaption>
                </figure>
              )}
            </div>
          </section>
        ))}
      </div>

      <section className={clsx(styles.section, styles.teamSection)} data-reveal>
        <div className={styles.storyHeading}>
          <p className={styles.eyebrow}>{narrative.teamEyebrow}</p>
          <h2>{narrative.teamTitle}</h2>
        </div>
        <div className={styles.storyBody}>
          <p className={styles.sectionLead}>{narrative.teamIntro}</p>
          <div className={styles.teamGrid}>
            {narrative.team.map((person) => (
              <article key={person.name} className={styles.person}>
                <p className={styles.personRole}>{person.role}</p>
                <h3>{person.name}</h3>
                <p>{person.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="artifacts"
        className={clsx(styles.section, styles.artifactsSection)}
        data-reveal
      >
        <div className={styles.artifactsHeader}>
          <div className={styles.storyHeading}>
            <p className={styles.eyebrow}>{narrative.artifactsEyebrow}</p>
            <h2>{narrative.artifactsTitle}</h2>
          </div>
          <p>{narrative.artifactsIntro}</p>
        </div>

        <div className={styles.videoGrid}>
          {videoArtifacts.map((artifact) => (
            <article key={artifact.href} className={styles.videoCard}>
              <video
                controls
                playsInline
                preload="metadata"
                aria-label={artifact.title}
              >
                <source src={artifact.href} type="video/mp4" />
                Your browser does not support embedded video.{" "}
                <a href={artifact.href}>Open the video directly.</a>
              </video>
              <div className={styles.artifactCopy}>
                <p className={styles.cardLabel}>{artifact.eyebrow}</p>
                <h3>{artifact.title}</h3>
                <p>{artifact.description}</p>
                <a
                  href={artifact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.artifactLink}
                >
                  <Play size={15} aria-hidden="true" />
                  {artifact.cta}
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.resourceGrid}>
          {linkArtifacts.map((artifact) => (
            <a
              key={artifact.href}
              href={artifact.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.resourceCard}
            >
              <div>
                <p className={styles.cardLabel}>{artifact.eyebrow}</p>
                <h3>{artifact.title}</h3>
                <p>{artifact.description}</p>
              </div>
              <span className={styles.resourceCta}>
                <FileText size={15} aria-hidden="true" />
                {artifact.cta}
                <ExternalLink size={13} aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <blockquote className={styles.closing} data-reveal>
        <p>{narrative.closing}</p>
      </blockquote>
    </>
  );
}

function StandardCaseStudy({ caseStudy }: { caseStudy: CaseStudyType }) {
  return (
    <>
      <header className={styles.hero}>
        <div className={styles.heroMeta}>
          <span className={styles.category}>{caseStudy.category}</span>
          <span className={styles.timeline}>{caseStudy.timeline}</span>
        </div>
        <h1 className={styles.title}>{caseStudy.name}</h1>
        <p className={styles.tagline}>{caseStudy.tagline}</p>
      </header>

      <div className={styles.heroImage}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={caseStudy.heroImage} alt={caseStudy.name} />
      </div>

      <div className={clsx(styles.section, styles.overview)}>
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
                <ExternalLink size={14} aria-hidden="true" /> Live
              </a>
            )}
            {caseStudy.githubUrl && (
              <a
                href={caseStudy.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                <Github size={14} aria-hidden="true" /> GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Challenge</h2>
        <p className={styles.sectionText}>{caseStudy.challenge}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Approach</h2>
        <p className={styles.sectionText}>{caseStudy.approach}</p>
      </section>

      {caseStudy.pullQuote && (
        <blockquote className={styles.pullQuote}>
          <p>{caseStudy.pullQuote}</p>
        </blockquote>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Solution</h2>
        <p className={styles.sectionText}>{caseStudy.solution}</p>
        {caseStudy.solutionImages.length > 0 && (
          <div className={styles.solutionImages}>
            {caseStudy.solutionImages.map((img, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={img}
                src={img}
                alt={`${caseStudy.name} screenshot ${index + 1}`}
                className={styles.solutionImg}
              />
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Impact &amp; Results</h2>
        <p className={styles.sectionText}>{caseStudy.impact}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Reflection</h2>
        <p className={styles.sectionText}>{caseStudy.reflection}</p>
      </section>
    </>
  );
}

export default function CaseStudy({ caseStudy, prev, next }: CaseStudyProps) {
  const pageRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (
      reducedMotion ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const page = pageRef.current;
    if (!page) return;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              once: true,
            },
          },
        );
      });
    }, page);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <main
      id="main-content"
      ref={pageRef}
      className={clsx(styles.page, caseStudy.narrative && styles.richPage)}
    >
      <TransitionLink href="/" className={styles.back}>
        <ArrowLeft size={16} aria-hidden="true" />
        Home
      </TransitionLink>

      {caseStudy.narrative ? (
        <RichCaseStudy caseStudy={caseStudy} narrative={caseStudy.narrative} />
      ) : (
        <StandardCaseStudy caseStudy={caseStudy} />
      )}

      <nav className={styles.nav} aria-label="Case studies">
        {prev ? (
          <TransitionLink
            href={`/work/${prev.slug}`}
            className={styles.navLink}
          >
            <ArrowLeft size={16} aria-hidden="true" />
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
            className={clsx(styles.navLink, styles.navRight)}
          >
            <div>
              <span className={styles.navLabel}>Next</span>
              <span className={styles.navName}>{next.name}</span>
            </div>
            <ArrowRight size={16} aria-hidden="true" />
          </TransitionLink>
        ) : (
          <div />
        )}
      </nav>
    </main>
  );
}
