import type { AuthoredPublication } from "@/data/portfolio";
import ExternalLink from "@/app/components/ui/ExternalLink";
import styles from "./FeaturedPublication.module.scss";

interface FeaturedPublicationProps {
  publication: AuthoredPublication;
  variant: "home" | "archive";
  headingLevel: "h2" | "h3";
}

export default function FeaturedPublication({
  publication,
  variant,
  headingLevel,
}: FeaturedPublicationProps) {
  const Heading = headingLevel;

  return (
    <article className={`${styles.feature} ${styles[variant]}`}>
      <ExternalLink href={publication.href} className={styles.link}>
        <div className={styles.inner}>
          <div className={styles.meta}>
            <span>{publication.label}</span>
          </div>
          <div className={styles.copy}>
            <Heading>{publication.title}</Heading>
            <p>{publication.summary}</p>
          </div>
          <div className={styles.footer}>
            <span>{publication.detail}</span>
            <span className={styles.cta}>
              {publication.cta} <span aria-hidden="true">↗</span>
            </span>
          </div>
        </div>
      </ExternalLink>
    </article>
  );
}
