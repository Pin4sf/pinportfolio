import Link from "next/link";
import { homepageData, type ReadingEntry } from "@/data/portfolio";
import styles from "./ReadingPreview.module.scss";

interface ReadingPreviewProps {
  entries: ReadingEntry[];
}

export default function ReadingPreview({ entries }: ReadingPreviewProps) {
  return (
    <section className={styles.section} aria-labelledby="reading-preview-title">
      {/* Reading · Things I keep returning to. */}
      <div className={styles.header}>
        <div>
          <span className="section__label">{homepageData.reading.eyebrow}</span>
          <h2 id="reading-preview-title">{homepageData.reading.title}</h2>
          <p>{homepageData.reading.introduction}</p>
        </div>
        <Link href={homepageData.reading.cta.href} className={styles.allLink}>
          {homepageData.reading.cta.label} <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <ol className={styles.entries}>
        {entries.map((entry, index) => (
          <li key={entry.slug}>
            <span className={styles.index}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={styles.kind}>{entry.kind}</span>
            <div className={styles.copy}>
              <h3>{entry.title}</h3>
              <p>{entry.annotation}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
