import type { Metadata } from "next";
import Link from "next/link";
import EditorialHeader from "@/app/components/editorial/EditorialHeader";
import {
  aboutPageData,
  compassPrinciples,
  contactData,
  getPublicArtifacts,
  personalInfluences,
  siteConfig,
} from "@/data/portfolio";
import type { PublicArtifact } from "@/data/portfolio";
import styles from "./AboutPage.module.scss";

export const metadata: Metadata = {
  title: aboutPageData.eyebrow,
  description: aboutPageData.metadata.description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `${aboutPageData.eyebrow} — ${siteConfig.author}`,
    description: aboutPageData.metadata.openGraphDescription,
    url: `${siteConfig.url}/about`,
    type: "website",
  },
};

function isPublicArtifact(
  artifact: PublicArtifact | undefined,
): artifact is PublicArtifact {
  return artifact !== undefined;
}

function selectPublicArtifacts(slugs: string[], artifacts: PublicArtifact[]) {
  return slugs
    .map((slug) => artifacts.find((artifact) => artifact.slug === slug))
    .filter(isPublicArtifact);
}

export default function AboutPage() {
  const influences = personalInfluences.filter(
    (influence) =>
      influence.publicationState === "public" && influence.title.trim(),
  );
  const artifacts = getPublicArtifacts();
  const learningArtifacts = selectPublicArtifacts(
    aboutPageData.learningArtifactSlugs,
    artifacts,
  );
  const longerHorizonArtifacts = selectPublicArtifacts(
    aboutPageData.longerHorizonArtifactSlugs,
    artifacts,
  );

  return (
    <>
      <EditorialHeader
        eyebrow={aboutPageData.eyebrow}
        title={aboutPageData.title}
        introduction={aboutPageData.headerIntroduction}
      />

      <main className={styles.page}>
        <section
          className={styles.introduction}
          aria-label={aboutPageData.introductionLabel}
        >
          {aboutPageData.introduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <nav
            className={styles.readingLinks}
            aria-label={aboutPageData.learningArtifactsLabel}
          >
            {learningArtifacts.map((artifact) => (
              <Link
                href={artifact.href}
                key={artifact.slug}
                {...(artifact.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {artifact.title}
              </Link>
            ))}
          </nav>
        </section>

        <section className={styles.section} aria-labelledby="influences-heading">
          <p className={styles.kicker}>{aboutPageData.influencesKicker}</p>
          <h2 id="influences-heading">{aboutPageData.influencesHeading}</h2>
          <div className={styles.influenceGrid}>
            {influences.map((influence) => {
              const content = (
                <>
                  <p className={styles.cardKind}>{influence.kind}</p>
                  <h3>{influence.title}</h3>
                  <p>{influence.summary}</p>
                </>
              );

              return influence.href ? (
                <Link
                  className={styles.influenceCard}
                  href={influence.href}
                  key={influence.slug}
                  {...(influence.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {content}
                </Link>
              ) : (
                <article className={styles.influenceCard} key={influence.slug}>
                  {content}
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="principles-heading">
          <p className={styles.kicker}>{aboutPageData.principlesKicker}</p>
          <h2 id="principles-heading">{aboutPageData.principlesHeading}</h2>
          <ol className={styles.principles}>
            {compassPrinciples.map((principle, index) => (
              <li key={principle.title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.horizon} aria-labelledby="horizon-heading">
          <div>
            <p className={styles.kicker}>{aboutPageData.longerHorizonKicker}</p>
            <h2 id="horizon-heading">{aboutPageData.longerHorizonHeading}</h2>
            {aboutPageData.longerHorizon.map((paragraph) => (
              <p className={styles.horizonCopy} key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
          <aside
            className={styles.artifacts}
            aria-label={aboutPageData.relatedArtifactsLabel}
          >
            {longerHorizonArtifacts.map((artifact) => (
              <Link className={styles.artifact} href={artifact.href} key={artifact.slug}>
                <span>{artifact.kind.replace("-", " ")}</span>
                <strong>{artifact.title}</strong>
                <p>{artifact.summary}</p>
              </Link>
            ))}
          </aside>
        </section>

        <section className={styles.now} aria-labelledby="now-heading">
          <p className={styles.kicker}>
            {aboutPageData.nowKicker} {aboutPageData.now.date}
          </p>
          <h2 id="now-heading">{aboutPageData.nowHeading}</h2>
          <p>{aboutPageData.now.body}</p>
        </section>

        <section className={styles.connect} aria-labelledby="connect-heading">
          <p className={styles.kicker}>{aboutPageData.connectKicker}</p>
          <h2 id="connect-heading">{aboutPageData.connectHeading}</h2>
          <div className={styles.contactLinks}>
            <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
            {contactData.socials.map((social) => (
              <a href={social.url} key={social.name} rel="noreferrer" target="_blank">
                {social.name}
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
