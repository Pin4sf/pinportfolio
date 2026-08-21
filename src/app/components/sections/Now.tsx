import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  caseStudies,
  getPublicArtifacts,
  nowSectionData,
} from "@/data/portfolio";
import styles from "./Now.module.scss";

export default function Now() {
  const waldo = getPublicArtifacts().find(
    (artifact) => artifact.slug === "waldo",
  );
  const founderVideo = caseStudies
    .find((study) => study.slug === "waldo")
    ?.narrative?.artifacts.find(
      (artifact) => artifact.title === "Why we started Waldo",
    );

  if (!waldo) return null;

  return (
    <section id="now" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.copy}>
          <span className="section__label">{nowSectionData.eyebrow}</span>
          <h2>{nowSectionData.title}</h2>
          <p>{waldo.summary}</p>
          <p className={styles.status}>{nowSectionData.status}</p>

          <div className={styles.links}>
            <Link href={waldo.href}>
              {nowSectionData.links.caseStudy.label}{" "}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <a
              href={nowSectionData.links.product.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {nowSectionData.links.product.label}{" "}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            {founderVideo && (
              <a
                href={founderVideo.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {founderVideo.cta} <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        {waldo.image && (
          <div className={styles.imageWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={waldo.image}
              alt={nowSectionData.imageAlt}
              className={styles.image}
              loading="lazy"
            />
          </div>
        )}
      </div>
    </section>
  );
}
