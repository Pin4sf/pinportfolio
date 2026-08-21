import type { Metadata } from "next";
import Link from "next/link";
import EditorialHeader from "@/app/components/editorial/EditorialHeader";
import EditorialFooter from "@/app/components/editorial/EditorialFooter";
import ExternalLink from "@/app/components/ui/ExternalLink";
import { experiencePageData, siteConfig, timelineData } from "@/data/portfolio";
import styles from "./ExperiencePage.module.scss";

export const metadata: Metadata = {
  title: experiencePageData.eyebrow,
  description: experiencePageData.metadata.description,
  alternates: {
    canonical: "/experience",
  },
  openGraph: {
    title: `${experiencePageData.eyebrow} — ${siteConfig.author}`,
    description: experiencePageData.metadata.openGraphDescription,
    url: `${siteConfig.url}/experience`,
    type: "website",
  },
};

export default function ExperiencePage() {
  return (
    <>
      <EditorialHeader
        eyebrow={experiencePageData.eyebrow}
        title={experiencePageData.title}
        introduction={experiencePageData.introduction}
      />

      <main id="main-content" className={styles.page}>
        <p className={styles.kicker}>{experiencePageData.chronologyLabel}</p>
        <ol className={styles.timeline}>
          {timelineData.map((entry) => (
            <li key={`${entry.organization}-${entry.title}`}>
              <article className={styles.entry}>
                <div className={styles.marker} aria-hidden="true" />
                <div className={styles.meta}>
                  <p>{entry.year}</p>
                  {entry.dateRange && <p>{entry.dateRange}</p>}
                </div>

                <div className={styles.content}>
                  <p className={styles.organization}>{entry.organization}</p>
                  <h2>{entry.title}</h2>
                  <p className={styles.description}>{entry.description}</p>

                  {entry.evidence && (
                    <div className={styles.detail}>
                      <p className={styles.label}>
                        {experiencePageData.evidenceLabel}
                      </p>
                      <p>{entry.evidence}</p>
                    </div>
                  )}

                  {entry.nextQuestion && (
                    <div className={styles.question}>
                      <p className={styles.label}>
                        {experiencePageData.nextQuestionLabel}
                      </p>
                      <p>{entry.nextQuestion}</p>
                    </div>
                  )}

                  {entry.tags && (
                    <ul
                      className={styles.tags}
                      aria-label={`${entry.title} tags`}
                    >
                      {entry.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  )}

                  {entry.links && (
                    <nav
                      className={styles.links}
                      aria-label={`${entry.title} ${experiencePageData.linksLabel}`}
                    >
                      {entry.links.map((link) =>
                        link.external ? (
                          <ExternalLink
                            href={link.url}
                            key={link.url}
                            rel="noopener noreferrer"
                          >
                            {link.label}
                          </ExternalLink>
                        ) : (
                          <Link href={link.url} key={link.url}>
                            {link.label} <span aria-hidden="true">→</span>
                          </Link>
                        ),
                      )}
                    </nav>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </main>
      <EditorialFooter />
    </>
  );
}
