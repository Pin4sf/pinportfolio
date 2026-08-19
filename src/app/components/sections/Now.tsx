import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies, getPublicArtifacts } from "@/data/portfolio";
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
          <span className="section__label">Now</span>
          <h2>Waldo is where the questions became a company.</h2>
          <p>{waldo.summary}</p>
          <p>{waldo.caption}</p>
          <p className={styles.status}>
            Working internal foundations; external product and market validation
            remain open.
          </p>

          <div className={styles.links}>
            <Link href={waldo.href}>
              Explore Waldo <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <a
              href="https://www.heywaldo.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Waldo <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            {founderVideo && (
              <a
                href={founderVideo.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {founderVideo.cta}{" "}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        {waldo.image && (
          <div className={styles.imageWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={waldo.image}
              alt="Waldo product system"
              className={styles.image}
              loading="lazy"
            />
          </div>
        )}
      </div>
    </section>
  );
}
