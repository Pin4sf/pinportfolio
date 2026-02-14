"use client";

import styles from "./BlogPost.module.scss";
import type { Post } from "@/lib/mdx";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";

const categoryColors: Record<string, string> = {
  building: "var(--accent)",
  technical: "#6c9bff",
  thinking: "var(--accent-warm)",
};

interface BlogPostProps {
  post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <main className={styles.page}>
      <a href="/writing" className={styles.back}>
        <ArrowLeft size={16} />
        Back to Writing
      </a>

      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.meta}>
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
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className={styles.dot}>·</span>
            <span>{post.readingTime} min read</span>
          </div>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.description}>{post.description}</p>
        </header>

        <div className={styles.content}>
          <MDXRemote source={post.content} />
        </div>
      </article>

      <div className={styles.footer}>
        <a href="/writing" className={styles.backLink}>
          &larr; All Writing
        </a>
      </div>
    </main>
  );
}
