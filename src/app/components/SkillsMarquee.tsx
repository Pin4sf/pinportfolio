"use client";

import styles from "./SkillsMarquee.module.scss";
import { skillsData } from "@/data/portfolio";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

export default function SkillsMarquee() {
  const sectionRef = useScrollReveal<HTMLElement>({ y: 40 });
  const categoriesText = skillsData.categories
    .map((c) => `${c}\u00A0\u00A0\u00A0`)
    .join("");

  return (
    <section ref={sectionRef} className={styles.skills}>
      <div className={styles.header} data-reveal>
        Skills
      </div>
      <div className={`${styles.text} ${styles.textLeft}`} data-reveal>
        {/* Duplicate for seamless loop */}
        <span>{categoriesText}</span>
        <span>{categoriesText}</span>
      </div>
      <div className={`${styles.text} ${styles.textRight}`} data-reveal>
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
