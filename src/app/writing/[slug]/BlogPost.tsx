import styles from "./BlogPost.module.scss";
import type { Post } from "@/lib/mdx";
import { formatLabels } from "@/lib/postFormats";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import EditorialPrimaryNav from "@/app/components/editorial/EditorialPrimaryNav";
import EditorialFooter from "@/app/components/editorial/EditorialFooter";
import { formatCalendarDate } from "@/lib/dates";

interface BlogPostProps {
  post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <>
      <main id="main-content" className={styles.page}>
        <div className={styles.navigation}>
          <Link href="/writing" className={styles.back}>
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Writing
          </Link>
          <EditorialPrimaryNav />
        </div>

        <article className={styles.article}>
          <header className={styles.header}>
            <div className={styles.meta}>
              <span className={styles.format}>{formatLabels[post.format]}</span>
              {post.evidenceStatus && (
                <>
                  <span className={styles.dot}>·</span>
                  <span className={styles.evidence}>{post.evidenceStatus}</span>
                </>
              )}
              <span className={styles.dot}>·</span>
              <span>{formatCalendarDate(post.date, "long")}</span>
              <span className={styles.dot}>·</span>
              <span>{post.readingTime} min read</span>
              {post.revised && (
                <>
                  <span className={styles.dot}>·</span>
                  <span>
                    Revised {formatCalendarDate(post.revised, "long")}
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
          <Link href="/writing" className={styles.backLink}>
            &larr; All Writing
          </Link>
        </div>
      </main>
      <EditorialFooter />
    </>
  );
}
