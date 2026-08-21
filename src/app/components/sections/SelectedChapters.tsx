import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homepageData, timelineData } from "@/data/portfolio";
import styles from "./SelectedChapters.module.scss";

export default function SelectedChapters() {
  const chapters = timelineData.filter((entry) =>
    homepageData.chapters.organizationNames.some((organization) =>
      entry.organization.includes(organization),
    ),
  );

  return (
    <section id="chapters" className={styles.section}>
      <div className={styles.header}>
        <span className="section__label">{homepageData.chapters.eyebrow}</span>
        <h2>{homepageData.chapters.title}</h2>
        <Link href={homepageData.chapters.cta.href} className={styles.allLink}>
          {homepageData.chapters.cta.label}{" "}
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>

      <div className={styles.list}>
        {chapters.map((chapter) => (
          <article
            key={`${chapter.year}-${chapter.organization}`}
            className={styles.chapter}
          >
            <span className={styles.year}>{chapter.year}</span>
            <div>
              <p className={styles.organization}>{chapter.organization}</p>
              <h3>{chapter.title}</h3>
              <p className={styles.description}>{chapter.description}</p>
              {chapter.nextQuestion && (
                <p className={styles.question}>
                  {homepageData.chapters.nextQuestionLabel}:{" "}
                  {chapter.nextQuestion}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
