import Link from "next/link";
import { researchDirectionData } from "@/data/portfolio";
import styles from "./CuriosityThread.module.scss";

export default function CuriosityThread() {
  return (
    <section id="curiosity" className={styles.section}>
      <div className={styles.header}>
        <span className="section__label">{researchDirectionData.eyebrow}</span>
        <h2>{researchDirectionData.title}</h2>
        <p>{researchDirectionData.introduction}</p>
      </div>

      <ol className={styles.thread}>
        {researchDirectionData.waypoints.map((waypoint, index) => (
          <li key={waypoint.label} className={styles.cell}>
            <span className={styles.number}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className={styles.labelLine}>
              <h3>{waypoint.label}</h3>
              <span>{waypoint.role}</span>
            </div>
            <p className={styles.question}>{waypoint.question}</p>
            <p className={styles.detail}>{waypoint.evidence}</p>
          </li>
        ))}
      </ol>

      <Link href={researchDirectionData.cta.href} className={styles.cta}>
        {researchDirectionData.cta.label}
        <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
