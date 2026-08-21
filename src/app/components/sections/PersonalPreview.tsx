import Link from "next/link";
import {
  compassPrinciples,
  homepageData,
  personalInfluences,
} from "@/data/portfolio";
import styles from "./PersonalPreview.module.scss";

export default function PersonalPreview() {
  const livedDetail = personalInfluences.find(
    (influence) =>
      influence.slug === homepageData.personal.influenceSlug &&
      influence.publicationState === "public",
  );
  const principle = compassPrinciples[homepageData.personal.principleIndex];

  if (!livedDetail || !principle) return null;

  return (
    <section id="personal" className={styles.section}>
      <div className={styles.header}>
        <span className="section__label">{homepageData.personal.eyebrow}</span>
        <h2>{homepageData.personal.title}</h2>
        <Link href={homepageData.personal.cta.href} className={styles.allLink}>
          {homepageData.personal.cta.label} <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <div className={styles.grid}>
        <article className={styles.card}>
          <span className={styles.kind}>
            {homepageData.personal.livedDetailLabel}
          </span>
          <h3>{livedDetail.title}</h3>
          <p>{livedDetail.summary}</p>
        </article>

        <article className={styles.card}>
          <span className={styles.kind}>
            {homepageData.personal.principleLabel}
          </span>
          <h3>{principle.title}</h3>
          <p>{principle.body}</p>
        </article>
      </div>
    </section>
  );
}
