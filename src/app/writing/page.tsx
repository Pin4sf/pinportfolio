import { getAllPosts } from "@/lib/mdx";
import { siteConfig, writingPageData } from "@/data/portfolio";
import type { Metadata } from "next";
import Link from "next/link";
import EditorialHeader from "@/app/components/editorial/EditorialHeader";
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
        <WritingArchive posts={posts} />
      </main>
    </>
  );
}
