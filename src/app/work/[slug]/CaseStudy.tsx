import clsx from "clsx";
import { ArrowLeft, ArrowRight, FileText, Github, Play } from "lucide-react";
import type {
  CaseStudy as CaseStudyType,
  CaseStudyNarrative,
} from "@/data/portfolio";
import EditorialPrimaryNav from "@/app/components/editorial/EditorialPrimaryNav";
import EditorialFooter from "@/app/components/editorial/EditorialFooter";
import ExternalLink from "@/app/components/ui/ExternalLink";
import styles from "./CaseStudy.module.scss";

interface CaseStudyProps {
  caseStudy: CaseStudyType;
  prev: CaseStudyType | null;
  next: CaseStudyType | null;
}

interface RichCaseStudyProps {
  caseStudy: CaseStudyType;
  narrative: CaseStudyNarrative;
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
      <header className={styles.richHero}>
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
          {narrative.heroQuote && (
            <blockquote className={styles.heroQuote}>
              <p>{narrative.heroQuote}</p>
            </blockquote>
          )}
          <p className={styles.heroBody}>{narrative.heroBody}</p>
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
            <ExternalLink
              href={caseStudy.liveUrl}
              rel="noopener noreferrer"
              className={styles.link}
            >
              heywaldo.in
            </ExternalLink>
          )}
        </div>
      </section>

      <div className={styles.story}>
        {narrative.sections.map((section) => (
          <section
            id={section.id}
            key={section.id}
            className={clsx(styles.section, styles.storySection)}
          >
            <div className={styles.storyHeading}>
              <div className={styles.storyMeta}>
                <p className={styles.eyebrow}>{section.eyebrow}</p>
                {section.status && (
                  <span className={styles.sectionStatus}>{section.status}</span>
                )}
              </div>
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

              {section.afterword && (
                <div className={clsx(styles.prose, styles.proseAfter)}>
                  {section.afterword.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
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
                      <ExternalLink
                        href={section.media.source.href}
                        rel="noopener noreferrer"
                      >
                        {section.media.source.label}
                      </ExternalLink>
                    )}
                  </figcaption>
                </figure>
              )}

              {section.link && (
                <ExternalLink
                  href={section.link.href}
                  rel="noopener noreferrer"
                  className={clsx(styles.link, styles.sectionLink)}
                >
                  <FileText size={15} aria-hidden="true" />
                  {section.link.label}
                </ExternalLink>
              )}
            </div>
          </section>
        ))}
      </div>

      <section className={clsx(styles.section, styles.teamSection)}>
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
                <ExternalLink
                  href={artifact.href}
                  rel="noopener noreferrer"
                  className={styles.artifactLink}
                >
                  <Play size={15} aria-hidden="true" />
                  {artifact.cta}
                </ExternalLink>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.resourceGrid}>
          {linkArtifacts.map((artifact) => {
            const content = (
              <>
                <div>
                  <p className={styles.cardLabel}>{artifact.eyebrow}</p>
                  <h3>{artifact.title}</h3>
                  <p>{artifact.description}</p>
                </div>
                <span className={styles.resourceCta}>
                  <FileText size={15} aria-hidden="true" />
                  {artifact.cta}
                  {!artifact.href.startsWith("http") && (
                    <ArrowRight size={13} aria-hidden="true" />
                  )}
                </span>
              </>
            );

            return artifact.href.startsWith("http") ? (
              <ExternalLink
                key={artifact.href}
                href={artifact.href}
                className={styles.resourceCard}
              >
                {content}
              </ExternalLink>
            ) : (
              <a
                key={artifact.href}
                href={artifact.href}
                className={styles.resourceCard}
              >
                {content}
              </a>
            );
          })}
        </div>
      </section>

      <blockquote className={styles.closing}>
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
              <ExternalLink
                href={caseStudy.liveUrl}
                rel="noopener noreferrer"
                className={styles.link}
              >
                Live
              </ExternalLink>
            )}
            {caseStudy.githubUrl && (
              <ExternalLink
                href={caseStudy.githubUrl}
                rel="noopener noreferrer"
                className={styles.link}
              >
                <Github size={14} aria-hidden="true" /> GitHub
              </ExternalLink>
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
  return (
    <>
      <main
        id="main-content"
        className={clsx(styles.page, caseStudy.narrative && styles.richPage)}
      >
        <div className={styles.primaryNavigation}>
          <a href="/" className={styles.back}>
            <ArrowLeft size={16} aria-hidden="true" />
            Home
          </a>
          <EditorialPrimaryNav />
        </div>

        {caseStudy.narrative ? (
          <RichCaseStudy
            caseStudy={caseStudy}
            narrative={caseStudy.narrative}
          />
        ) : (
          <StandardCaseStudy caseStudy={caseStudy} />
        )}

        <nav className={styles.nav} aria-label="Case studies">
          {prev ? (
            <a href={`/work/${prev.slug}`} className={styles.navLink}>
              <ArrowLeft size={16} aria-hidden="true" />
              <div>
                <span className={styles.navLabel}>Previous</span>
                <span className={styles.navName}>{prev.name}</span>
              </div>
            </a>
          ) : (
            <div />
          )}
          {next ? (
            <a
              href={`/work/${next.slug}`}
              className={clsx(styles.navLink, styles.navRight)}
            >
              <div>
                <span className={styles.navLabel}>Next</span>
                <span className={styles.navName}>{next.name}</span>
              </div>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          ) : (
            <div />
          )}
        </nav>
      </main>
      <EditorialFooter />
    </>
  );
}
