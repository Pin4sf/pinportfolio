import Link from "next/link";
import type { PublicArtifact } from "@/data/portfolio";
import styles from "./ArtifactList.module.scss";

interface ArtifactListProps {
  artifacts: PublicArtifact[];
}

function ArtifactContents({ artifact }: { artifact: PublicArtifact }) {
  const isDateRange = /^\d{4}-\d{4}$/.test(artifact.date);

  return (
    <>
      <div className={styles.meta}>
        <span className={styles.kind}>{artifact.kind.replace("-", " ")}</span>
        <time dateTime={isDateRange ? undefined : artifact.date}>
          {artifact.date}
        </time>
      </div>
      <div className={styles.copy}>
        <h2>{artifact.title}</h2>
        <p>{artifact.summary}</p>
        {artifact.annotation && (
          <p className={styles.annotation}>{artifact.annotation}</p>
        )}
      </div>
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </>
  );
}

export default function ArtifactList({ artifacts }: ArtifactListProps) {
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
              <ArtifactContents artifact={artifact} />
            </a>
          ) : (
            <Link href={artifact.href} className={styles.link}>
              <ArtifactContents artifact={artifact} />
            </Link>
          )}
        </li>
      ))}
    </ol>
  );
}
