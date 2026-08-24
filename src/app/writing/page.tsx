import { getAllPosts } from "@/lib/mdx";
import {
  getFeaturedAuthoredPublications,
  siteConfig,
  writingPageData,
} from "@/data/portfolio";
import type { Metadata } from "next";
import Link from "next/link";
import EditorialHeader from "@/app/components/editorial/EditorialHeader";
import EditorialFooter from "@/app/components/editorial/EditorialFooter";
import FeaturedPublication from "@/app/components/editorial/FeaturedPublication";
import WritingArchive from "./WritingArchive";
import styles from "./WritingArchive.module.scss";

export const metadata: Metadata = {
  title: writingPageData.eyebrow,
  description: writingPageData.metadata.description,
  alternates: {
    canonical: "/writing",
  },
  openGraph: {
    title: `${writingPageData.eyebrow} — Shivansh Fulper`,
    description: writingPageData.metadata.openGraphDescription,
    url: `${siteConfig.url}/writing`,
    type: "website",
  },
};

export default function WritingPage() {
  const posts = getAllPosts();
  const featuredPublications = getFeaturedAuthoredPublications(1);

  return (
    <>
      <EditorialHeader
        eyebrow={writingPageData.eyebrow}
        title={writingPageData.title}
        introduction={writingPageData.introduction}
      />

      <main id="main-content" className={styles.page}>
        <Link className={styles.researchLink} href="/research">
          Explore the research questions →
        </Link>
        <Link className={styles.readingLink} href="/reading">
          Read what shapes the work →
        </Link>
        {featuredPublications[0] && (
          <FeaturedPublication
            publication={featuredPublications[0]}
            variant="archive"
            headingLevel="h2"
          />
        )}
        <WritingArchive posts={posts} />
      </main>
      <EditorialFooter />
    </>
  );
}
