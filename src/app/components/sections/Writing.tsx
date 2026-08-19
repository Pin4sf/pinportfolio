import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PostMeta } from "@/lib/mdx";
import styles from "./Writing.module.scss";

const categoryLabels: Record<string, string> = {
  research: "Research",
  "field-note": "Field note",
  "founder-note": "Founder note",
  historical: "Historical",
};

interface WritingProps {
  featuredPosts: PostMeta[];
}

export default function Writing({ featuredPosts }: WritingProps) {
  return (
    <section id="research" className={styles.section}>
      <div className={styles.notesHeader}>
        <div>
          <span className="section__label">Research + Writing</span>
          <h2>Notes from the work.</h2>
          <p>
            Research questions usually arrive after something breaks, surprises
            me, or refuses to fit the model I had in my head.
          </p>
        </div>
        <Link href="/writing" className={styles.allWriting}>
          View all writing <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>

      <div className={styles.essays}>
        {featuredPosts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/writing/${post.slug}`}
            className={styles.essay}
          >
            <div className={styles.essayMeta}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{categoryLabels[post.category] ?? post.category}</span>
              <span>{post.readingTime} min</span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <span className={styles.readLink}>
              Read essay <ArrowUpRight size={14} aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
