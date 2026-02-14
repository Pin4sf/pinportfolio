"use client";

import { useState } from "react";
import styles from "./FAQ.module.scss";
import { faqData } from "@/data/portfolio";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faq} id="FAQ">
      <div className={styles.faqWrap}>
        <div className={styles.headerTitle}>FAQ</div>
        <div className={styles.headerSubtitle}>Have any questions?</div>
        {faqData.map((item, index) => (
          <div
            key={index}
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
