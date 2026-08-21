"use client";

import { useState } from "react";
import styles from "./WritingArchive.module.scss";
import type { PostMeta } from "@/lib/mdx";
import {
  filterPostsByFormat,
  formatLabels,
  getAvailableFormats,
  type PostFormatFilter,
} from "@/lib/postFormats";
import Link from "next/link";

interface WritingArchiveProps {
  posts: PostMeta[];
}

export default function WritingArchive({ posts }: WritingArchiveProps) {
  const [activeFormat, setActiveFormat] = useState<PostFormatFilter>("all");
  const availableFormats = getAvailableFormats(posts);
  const filteredPosts = filterPostsByFormat(posts, activeFormat);

  return (
    <section aria-label="Writing archive">
      <div className={styles.filters}>
        {(["all", ...availableFormats] as const).map((format) => (
          <button
            key={format}
            aria-pressed={activeFormat === format}
            className={`${styles.filterBtn} ${activeFormat === format ? styles.active : ""}`}
            onClick={() => setActiveFormat(format)}
          >
            {format === "all" ? "All" : formatLabels[format]}
          </button>
        ))}
      </div>

      <div className={styles.list}>
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/writing/${post.slug}`}
            className={styles.card}
          >
            <div className={styles.cardMeta}>
              <span className={styles.format}>{formatLabels[post.format]}</span>
              {post.evidenceStatus && (
                <>
                  <span className={styles.dot}>·</span>
                  <span className={styles.evidence}>{post.evidenceStatus}</span>
                </>
              )}
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
          </Link>
        ))}
      </div>
    </section>
  );
}
