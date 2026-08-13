import { getAllPosts } from "@/lib/mdx";
import { siteConfig } from "@/data/portfolio";
import type { Metadata } from "next";
import WritingArchive from "./WritingArchive";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Research essays and field notes by Shivansh Fulper on persistent agents, memory, harnesses, outcome evaluation, founder judgment, and physical AI.",
  alternates: {
    canonical: "/writing",
  },
  openGraph: {
    title: "Writing — Shivansh Fulper",
    description:
      "Research essays and field notes on persistent agents, memory, harnesses, outcome evaluation, and founder judgment.",
    url: `${siteConfig.url}/writing`,
    type: "website",
  },
};

export default function WritingPage() {
  const posts = getAllPosts();

  return <WritingArchive posts={posts} />;
}
