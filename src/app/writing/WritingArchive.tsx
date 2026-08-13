"use client";

import { useState } from "react";
import styles from "./WritingArchive.module.scss";
import type { PostMeta } from "@/lib/mdx";
import { ArrowLeft } from "lucide-react";
import TransitionLink from "@/app/components/ui/TransitionLink";

const categories = [
  { key: "all", label: "All" },
  { key: "research", label: "Research" },
  { key: "field-note", label: "Field notes" },
  { key: "founder-note", label: "Founder notes" },
  { key: "historical", label: "Historical" },
];

const categoryColors: Record<string, string> = {
  research: "var(--accent)",
  "field-note": "#8aa9ff",
  "founder-note": "var(--accent-warm)",
  historical: "var(--text-tertiary)",
};

const categoryLabels: Record<string, string> = {
  research: "Research",
  "field-note": "Field note",
  "founder-note": "Founder note",
  historical: "Historical",
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
        <TransitionLink href="/" className={styles.back}>
          <ArrowLeft size={16} />
          Home
        </TransitionLink>
        <h1 className={styles.title}>Writing</h1>
        <p className={styles.subtitle}>
          Research notes, field notes, and older chapters from things I’ve
          built.
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
          <TransitionLink
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
                {categoryLabels[post.category] ?? post.category}
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
              {post.revised && (
                <>
                  <span className={styles.dot}>·</span>
                  <span>
                    Revised{" "}
                    {new Date(post.revised).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </>
              )}
            </div>
            <h2 className={styles.cardTitle}>{post.title}</h2>
            <p className={styles.cardDescription}>{post.description}</p>
          </TransitionLink>
        ))}

        {filteredPosts.length === 0 && (
          <p className={styles.empty}>No posts in this category yet.</p>
        )}
      </div>
    </main>
  );
}
