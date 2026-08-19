import type { Metadata } from "next";
import Link from "next/link";
import ArtifactList from "@/app/components/editorial/ArtifactList";
import EditorialHeader from "@/app/components/editorial/EditorialHeader";
import {
  getPublicArtifacts,
  researchClusters,
  researchPageData,
  siteConfig,
} from "@/data/portfolio";
import type { PublicArtifact } from "@/data/portfolio";
import { getAllPosts } from "@/lib/mdx";
import styles from "./ResearchPage.module.scss";

export const metadata: Metadata = {
  title: researchPageData.eyebrow,
  description: researchPageData.metadata.description,
  alternates: {
    canonical: "/research",
  },
  openGraph: {
    title: `${researchPageData.eyebrow} — ${siteConfig.author}`,
    description: researchPageData.metadata.openGraphDescription,
    url: `${siteConfig.url}/research`,
    type: "website",
  },
};

function isPublicArtifact(
  artifact: PublicArtifact | undefined,
): artifact is PublicArtifact {
  return artifact !== undefined;
}

export default function ResearchPage() {
  const posts = getAllPosts();
  const artifacts = getPublicArtifacts();

  return (
    <>
      <EditorialHeader
        eyebrow={researchPageData.eyebrow}
        title={researchPageData.title}
        introduction={researchPageData.introduction}
      />

      <main id="main-content" className={styles.page}>
        <nav
          className={styles.thread}
          aria-label={researchPageData.threadLabel}
        >
          {researchPageData.thread.map((item, index) => (
            <Link href={item.href} key={item.href}>
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        {researchClusters.map((cluster, index) => {
          const clusterArtifacts = cluster.artifactSlugs
            .map((slug) => artifacts.find((artifact) => artifact.slug === slug))
            .filter(isPublicArtifact);
          const relatedPosts = clusterArtifacts
            .filter((artifact) => artifact.href.startsWith("/writing/"))
            .map((artifact) =>
              posts.find((post) => `/writing/${post.slug}` === artifact.href),
            )
            .filter((post) => post !== undefined);
          const relatedWritingHrefs = new Set(
            relatedPosts.map((post) => `/writing/${post.slug}`),
          );
          const supportingArtifacts = clusterArtifacts.filter(
            (artifact) => !relatedWritingHrefs.has(artifact.href),
          );

          return (
            <section
              className={styles.cluster}
              id={cluster.slug}
              key={cluster.slug}
            >
              <header className={styles.clusterHeader}>
                <p>{String(index + 1).padStart(2, "0")}</p>
                <h2>{cluster.title}</h2>
              </header>

              <div className={styles.question}>
                <p className={styles.label}>{researchPageData.questionLabel}</p>
                <p>{cluster.question}</p>
              </div>

              <div className={styles.position}>
                <p className={styles.label}>{researchPageData.positionLabel}</p>
                <p>{cluster.position}</p>
              </div>

              <aside className={styles.uncertainty}>
                <p className={styles.label}>
                  {researchPageData.uncertaintyLabel}
                </p>
                <p>{cluster.uncertainty}</p>
              </aside>

              <div className={styles.writing}>
                <p className={styles.label}>{researchPageData.writingLabel}</p>
                {relatedPosts.length > 0 ? (
                  <ul>
                    {relatedPosts.map((post) => (
                      <li key={post.slug}>
                        <Link href={`/writing/${post.slug}`}>
                          <span>{post.title}</span>
                          <span aria-hidden="true">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.empty}>
                    {researchPageData.emptyWriting}
                  </p>
                )}
              </div>

              {supportingArtifacts.length > 0 && (
                <div className={styles.artifacts}>
                  <p className={styles.label}>
                    {researchPageData.artifactsLabel}
                  </p>
                  <ArtifactList
                    artifacts={supportingArtifacts}
                    headingLevel="h3"
                  />
                </div>
              )}
            </section>
          );
        })}
      </main>
    </>
  );
}
