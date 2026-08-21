import Link from "next/link";
import { homepageData } from "@/data/portfolio";
import type { PostMeta } from "@/lib/mdx";
import styles from "./Writing.module.scss";

interface WritingProps {
  featuredPosts: PostMeta[];
}

export default function Writing({ featuredPosts }: WritingProps) {
  return (
    <section id="research" className={styles.section}>
      {/* Notes from the work. Research questions usually arrive after something breaks, surprises me, or refuses to fit the model I had in my head. */}
      <div className={styles.header}>
        <div>
          <span className="section__label">{homepageData.writing.eyebrow}</span>
          <h2>{homepageData.writing.title}</h2>
          <p>{homepageData.writing.introduction}</p>
        </div>
        <Link href={homepageData.writing.cta.href} className={styles.allLink}>
          {homepageData.writing.cta.label} <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <ol className={styles.essays}>
        {featuredPosts.map((post, index) => (
          <li key={post.slug}>
            <Link href={`/writing/${post.slug}`} className={styles.essay}>
              <div className={styles.index}>
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className={styles.meta}>
                <span>{post.format.replaceAll("-", " ")}</span>
                <time dateTime={post.revised ?? post.date}>
                  {post.revised ?? post.date}
                </time>
                <span>{post.readingTime} min</span>
              </div>
              <div className={styles.copy}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </div>
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
