import { getAllPosts } from "@/lib/mdx";
import { siteConfig } from "@/data/portfolio";
import type { Metadata } from "next";
import WritingArchive from "./WritingArchive";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on shipping products, building AI systems, and figuring it out along the way. By Shivansh Fulper — AI engineer, startup founder, and builder.",
  alternates: {
    canonical: "/writing",
  },
  openGraph: {
    title: "Writing — Shivansh Fulper",
    description:
      "Notes on shipping products, building AI systems, and figuring it out along the way.",
    url: `${siteConfig.url}/writing`,
    type: "website",
  },
};

export default function WritingPage() {
  const posts = getAllPosts();

  return <WritingArchive posts={posts} />;
}
