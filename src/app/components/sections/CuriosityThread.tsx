import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./CuriosityThread.module.scss";

const threads = [
  {
    title: "Models",
    question: "How is capability made?",
    detail: "Project EKA · Qwen3 MoE",
    href: "/research#models",
  },
  {
    title: "Agents",
    question: "What happens when capability can act?",
    detail: "Atlan · Waldo · Harnesses",
    href: "/research#agents",
  },
  {
    title: "World",
    question: "What changes when actions have physical consequences?",
    detail: "Smart Manufacturing · Physical AI",
    href: "/research#world",
  },
];

export default function CuriosityThread() {
  return (
    <section id="curiosity" className={styles.section}>
      <div className={styles.header}>
        <span className="section__label">A thread of curiosity</span>
        <h2>Models → Agents → World.</h2>
      </div>

      <ol className={styles.thread}>
        {threads.map((thread, index) => (
          <li key={thread.title} className={styles.cell}>
            <Link href={thread.href}>
              <span className={styles.number}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{thread.title}</h3>
              <p className={styles.question}>{thread.question}</p>
              <p className={styles.detail}>{thread.detail}</p>
              <span className={styles.link}>
                Follow the thread <ArrowUpRight size={14} aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
