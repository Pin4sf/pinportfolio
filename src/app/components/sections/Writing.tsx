import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PostMeta } from "@/lib/mdx";
import { researchAreas } from "@/data/portfolio";
import styles from "./Writing.module.scss";

const featuredResearch = researchAreas.filter((area) =>
  [
    "Agent runtimes and harnesses",
    "Persistent memory and current state",
    "Long-horizon outcome evaluation",
    "Agents in the world",
  ].includes(area.title),
);

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
      <div className={styles.researchGrid}>
        <header className={styles.intro}>
          <span className="section__label">Research + Writing</span>
          <h2>What I’m trying to understand.</h2>
          <p>
            I’m interested in what happens after a model becomes a system: what
            it remembers, how it acts, where authority lives, and how we know
            its work changed anything real.
          </p>
        </header>

        <ol className={styles.areas}>
          {featuredResearch.map((area, index) => (
            <li key={area.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{area.title}</h3>
                <p>{area.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.notesHeader}>
        <div>
          <span>Research notes</span>
          <h3>Ideas worked out in public.</h3>
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
            <h4>{post.title}</h4>
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
