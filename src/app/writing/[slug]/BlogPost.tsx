"use client";

import styles from "./BlogPost.module.scss";
import type { Post } from "@/lib/mdx";
import { ArrowLeft } from "lucide-react";
import TransitionLink from "@/app/components/ui/TransitionLink";
import { MDXRemote } from "next-mdx-remote/rsc";

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

interface BlogPostProps {
  post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <main className={styles.page}>
      <TransitionLink href="/writing" className={styles.back}>
        <ArrowLeft size={16} />
        Back to Writing
      </TransitionLink>

      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.meta}>
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
                month: "long",
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
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </>
            )}
          </div>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.description}>{post.description}</p>
        </header>

        <div className={styles.content}>
          <MDXRemote source={post.content} />
        </div>
      </article>

      <div className={styles.footer}>
        <TransitionLink href="/writing" className={styles.backLink}>
          &larr; All Writing
        </TransitionLink>
      </div>
    </main>
  );
}
