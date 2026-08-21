import type { Metadata } from "next";
import EditorialFooter from "@/app/components/editorial/EditorialFooter";
import EditorialHeader from "@/app/components/editorial/EditorialHeader";
import {
  getPublicReadingEntries,
  readingPageData,
  siteConfig,
} from "@/data/portfolio";
import styles from "./ReadingPage.module.scss";

export const metadata: Metadata = {
  title: readingPageData.eyebrow,
  description: readingPageData.metadata.description,
  alternates: {
    canonical: "/reading",
  },
  openGraph: {
    title: `${readingPageData.eyebrow} — ${siteConfig.author}`,
    description: readingPageData.metadata.openGraphDescription,
    url: `${siteConfig.url}/reading`,
    type: "website",
  },
};

export default function ReadingPage() {
  const entries = getPublicReadingEntries();

  return (
    <>
      <EditorialHeader
        eyebrow={readingPageData.eyebrow}
        title={readingPageData.title}
        introduction={readingPageData.introduction}
      />

      <main id="main-content" className={styles.page}>
        <p className={styles.kicker}>Annotated record</p>
        <ol className={styles.entries}>
          {entries.map((entry, index) => (
            <li key={entry.slug}>
              <article className={styles.entry}>
                <div className={styles.meta}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{entry.kind}</span>
                  {entry.date && <time dateTime={entry.date}>{entry.date}</time>}
                </div>
                <div>
                  <p className={styles.creator}>{entry.creator}</p>
                  <h2>{entry.title}</h2>
                  <p className={styles.annotation}>{entry.annotation}</p>
                  <p className={styles.question}>{entry.lastingQuestion}</p>
                  {entry.connection && (
                    <p className={styles.connection}>{entry.connection}</p>
                  )}
                  {entry.externalUrl && (
                    <a
                      href={entry.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Source <span aria-hidden="true">↗</span>
                      <span className="sr-only">Opens in a new tab</span>
                    </a>
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
