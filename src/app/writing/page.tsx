import { getAllPosts } from "@/lib/mdx";
import type { Metadata } from "next";
import WritingArchive from "./WritingArchive";

export const metadata: Metadata = {
  title: "Writing — Shivansh Fulper",
  description:
    "Notes on shipping products, building AI systems, and figuring it out along the way.",
};

export default function WritingPage() {
  const posts = getAllPosts();

  return <WritingArchive posts={posts} />;
}
