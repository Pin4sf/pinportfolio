"use client";

import styles from "./SkillsMarquee.module.scss";
import { skillsData } from "@/data/portfolio";

export default function SkillsMarquee() {
  const categoriesText = skillsData.categories
    .map((c) => `${c}\u00A0\u00A0\u00A0`)
    .join("");

  return (
    <section className={styles.skills}>
      <div className={styles.header}>Skills</div>
      <div className={`${styles.text} ${styles.textLeft}`}>
        {/* Duplicate for seamless loop */}
        <span>{categoriesText}</span>
        <span>{categoriesText}</span>
      </div>
      <div className={`${styles.text} ${styles.textRight}`}>
        {/* Tools with icons */}
        {[0, 1].map((dup) => (
          <span key={dup}>
            {skillsData.tools.map((tool, i) => (
              <span key={`${dup}-${i}`}>
                {tool.name}
                {tool.icon && (
                  <>
                    {" "}
                    <i className={tool.icon}></i>
                  </>
                )}
                &nbsp;&nbsp;&nbsp;
              </span>
            ))}
          </span>
        ))}
      </div>
    </section>
  );
}
