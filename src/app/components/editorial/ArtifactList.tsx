import Link from "next/link";
import type { PublicArtifact } from "@/data/portfolio";
import styles from "./ArtifactList.module.scss";

interface ArtifactListProps {
  artifacts: PublicArtifact[];
  headingLevel?: "h2" | "h3";
}

function ArtifactContents({
  artifact,
  headingLevel,
  external,
}: {
  artifact: PublicArtifact;
  headingLevel: "h2" | "h3";
  external: boolean;
}) {
  const isDateRange = /^\d{4}-\d{4}$/.test(artifact.date);
  const Heading = headingLevel;

  return (
    <>
      <div className={styles.meta}>
        <span className={styles.kind}>{artifact.kind.replace("-", " ")}</span>
        <time dateTime={isDateRange ? undefined : artifact.date}>
          {artifact.date}
        </time>
      </div>
      <div className={styles.copy}>
        <Heading>{artifact.title}</Heading>
        <p>{artifact.summary}</p>
        {artifact.annotation && (
          <p className={styles.annotation}>{artifact.annotation}</p>
        )}
      </div>
      <span className={styles.arrow} aria-hidden="true">
        {external ? "↗" : "→"}
      </span>
      {external && <span className="sr-only">Opens in a new tab</span>}
    </>
  );
}

export default function ArtifactList({
  artifacts,
  headingLevel = "h2",
}: ArtifactListProps) {
  return (
    <ol className={styles.list}>
      {artifacts.map((artifact) => (
        <li key={artifact.slug} className={styles.item}>
          {artifact.external ? (
            <a
              href={artifact.href}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArtifactContents
                artifact={artifact}
                headingLevel={headingLevel}
                external
              />
            </a>
          ) : (
            <Link href={artifact.href} className={styles.link}>
              <ArtifactContents
                artifact={artifact}
                headingLevel={headingLevel}
                external={false}
              />
            </Link>
          )}
        </li>
      ))}
    </ol>
  );
}
