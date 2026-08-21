"use client";

import { useState } from "react";
import styles from "./WritingArchive.module.scss";
import type { PostMeta } from "@/lib/mdx";
import {
  createWritingArchiveViewModel,
  type PostFormatFilter,
} from "@/lib/postFormats";
import Link from "next/link";

interface WritingArchiveProps {
  posts: PostMeta[];
}

export default function WritingArchive({ posts }: WritingArchiveProps) {
  const [activeFormat, setActiveFormat] = useState<PostFormatFilter>("all");
  const viewModel = createWritingArchiveViewModel(posts, activeFormat);

  return (
    <section aria-label="Writing archive">
      <div className={styles.filters}>
        {viewModel.filters.map((filter) => (
          <button
            key={filter.value}
            aria-pressed={filter.active}
            className={`${styles.filterBtn} ${filter.active ? styles.active : ""}`}
            onClick={() => setActiveFormat(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className={styles.list}>
        {viewModel.cards.map((card) => (
          <Link key={card.post.slug} href={card.href} className={styles.card}>
            <div className={styles.cardMeta}>
              <span className={styles.format}>{card.formatLabel}</span>
              {card.post.evidenceStatus && (
                <>
                  <span className={styles.dot}>·</span>
                  <span className={styles.evidence}>
                    {card.post.evidenceStatus}
                  </span>
                </>
              )}
              <span className={styles.dot}>·</span>
              <span>
                {new Date(card.post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className={styles.dot}>·</span>
              <span>{card.post.readingTime} min read</span>
              {card.post.revised && (
                <>
                  <span className={styles.dot}>·</span>
                  <span>
                    Revised{" "}
                    {new Date(card.post.revised).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </>
              )}
            </div>
            <h2 className={styles.cardTitle}>{card.title}</h2>
            <p className={styles.cardDescription}>{card.post.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
