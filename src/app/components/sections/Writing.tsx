import Link from "next/link";
import { homepageData, type AuthoredPublication } from "@/data/portfolio";
import type { PostMeta } from "@/lib/mdx";
import FeaturedPublication from "@/app/components/editorial/FeaturedPublication";
import styles from "./Writing.module.scss";

interface WritingProps {
  featuredPosts: PostMeta[];
  featuredPublication?: AuthoredPublication;
}

export default function Writing({
  featuredPosts,
  featuredPublication,
}: WritingProps) {
  return (
    <section id="research" className={styles.section}>
      <div className={styles.notesHeader}>
        <div>
          <span className="section__label">{homepageData.writing.eyebrow}</span>
          <h2>{homepageData.writing.title}</h2>
          <p>{homepageData.writing.introduction}</p>
        </div>
        <Link
          href={homepageData.writing.cta.href}
          className={styles.allWriting}
        >
          {homepageData.writing.cta.label} <span aria-hidden="true">↗</span>
        </Link>
      </div>

      {featuredPublication && (
        <FeaturedPublication
          publication={featuredPublication}
          variant="home"
          headingLevel="h3"
        />
      )}

      <ol className={styles.essays}>
        {featuredPosts.map((post, index) => (
          <li key={post.slug}>
            <Link href={`/writing/${post.slug}`} className={styles.essay}>
              <div className={styles.essayMeta}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{post.format.replaceAll("-", " ")}</span>
                <time dateTime={post.revised ?? post.date}>
                  {post.revised ?? post.date}
                </time>
                <span>{post.readingTime} min</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <span className={styles.readLink} aria-hidden="true">
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
