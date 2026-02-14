"use client";

import { useState } from "react";
import styles from "./FAQ.module.scss";
import { faqData } from "@/data/portfolio";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useScrollReveal<HTMLDivElement>({
    clipReveal: true,
    stagger: 0.1,
  });

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div ref={sectionRef} className={styles.faq} id="FAQ">
      <div className={styles.faqWrap}>
        <div className={styles.headerTitle} data-reveal>
          FAQ
        </div>
        <div className={styles.headerSubtitle} data-reveal>
          Have any questions?
        </div>
        {faqData.map((item, index) => (
          <div
            key={index}
            data-reveal
            className={`${styles.question} ${
              openIndex === index ? styles.open : ""
            }`}
            onClick={() => toggleQuestion(index)}
          >
            <div className={styles.questionWrap}>
              <div className={styles.questionStatus}></div>
              <h3>{item.question}</h3>
            </div>
            <div className={styles.questionAnswer}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
