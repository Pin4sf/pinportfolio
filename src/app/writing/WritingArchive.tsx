"use client";

import { useState } from "react";
import styles from "./WritingArchive.module.scss";
import type { PostMeta } from "@/lib/mdx";
import { ArrowLeft } from "lucide-react";

const categories = [
  { key: "all", label: "All" },
  { key: "building", label: "Building" },
  { key: "thinking", label: "Thinking" },
  { key: "technical", label: "Technical" },
];

const categoryColors: Record<string, string> = {
  building: "var(--accent)",
  technical: "#6c9bff",
  thinking: "var(--accent-warm)",
};

interface WritingArchiveProps {
  posts: PostMeta[];
}

export default function WritingArchive({ posts }: WritingArchiveProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.back}>
          <ArrowLeft size={16} />
          Home
        </a>
        <h1 className={styles.title}>Writing</h1>
        <p className={styles.subtitle}>
          Notes on shipping products, building AI systems, and figuring it out along the way.
        </p>
      </header>

      <div className={styles.filters}>
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`${styles.filterBtn} ${activeCategory === cat.key ? styles.active : ""}`}
            onClick={() => setActiveCategory(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className={styles.list}>
        {filteredPosts.map((post) => (
          <a
            key={post.slug}
            href={`/writing/${post.slug}`}
            className={styles.card}
          >
            <div className={styles.cardMeta}>
              <span
                className={styles.category}
                style={{
                  color: categoryColors[post.category] || "var(--accent)",
                }}
              >
                {post.category}
              </span>
              <span className={styles.dot}>·</span>
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className={styles.dot}>·</span>
              <span>{post.readingTime} min read</span>
            </div>
            <h2 className={styles.cardTitle}>{post.title}</h2>
            <p className={styles.cardDescription}>{post.description}</p>
          </a>
        ))}

        {filteredPosts.length === 0 && (
          <p className={styles.empty}>No posts in this category yet.</p>
        )}
      </div>
    </main>
  );
}
