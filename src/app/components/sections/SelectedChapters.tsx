import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { timelineData } from "@/data/portfolio";
import styles from "./SelectedChapters.module.scss";

const chapterOrganizations = [
  "Atlan",
  "Soket AI Labs",
  "MIRAI-Setu",
  "HackByte",
  "IIITDM Jabalpur",
];

export default function SelectedChapters() {
  const chapters = timelineData.filter((entry) =>
    chapterOrganizations.some((organization) =>
      entry.organization.includes(organization),
    ),
  );

  return (
    <section id="chapters" className={styles.section}>
      <div className={styles.header}>
        <span className="section__label">Selected chapters</span>
        <h2>The work that changed the next question.</h2>
        <Link href="/experience" className={styles.allLink}>
          See the full experience <ArrowUpRight size={15} aria-hidden="true" />
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
                  Next question: {chapter.nextQuestion}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
