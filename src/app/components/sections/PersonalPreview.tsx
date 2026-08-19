import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { personalInfluences } from "@/data/portfolio";
import styles from "./PersonalPreview.module.scss";

export default function PersonalPreview() {
  const influences = personalInfluences
    .filter((influence) => influence.publicationState === "public")
    .slice(0, 4);

  return (
    <section id="personal" className={styles.section}>
      <div className={styles.header}>
        <span className="section__label">Outside the thesis</span>
        <h2>What keeps the work personal.</h2>
        <Link href="/about" className={styles.allLink}>
          More about me <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>

      <div className={styles.grid}>
        {influences.map((influence) => {
          const content = (
            <>
              {influence.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={influence.image}
                  alt=""
                  className={styles.image}
                  loading="lazy"
                />
              )}
              <span className={styles.kind}>{influence.kind}</span>
              <h3>{influence.title}</h3>
              <p>{influence.summary}</p>
            </>
          );

          return influence.href ? (
            <a key={influence.slug} href={influence.href} className={styles.card}>
              {content}
            </a>
          ) : (
            <article key={influence.slug} className={styles.card}>
              {content}
            </article>
          );
        })}
      </div>
    </section>
  );
}
