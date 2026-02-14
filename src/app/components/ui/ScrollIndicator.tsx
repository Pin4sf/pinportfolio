"use client";

import styles from "./ScrollIndicator.module.scss";

export default function ScrollIndicator() {
  return (
    <div className={styles.scrollDown}>
      <div className={styles.wheel}>
        <div className={styles.wheelInner}></div>
      </div>
      <div className={styles.arrows}>
        <span className={styles.arrow}></span>
        <span className={styles.arrow}></span>
        <span className={styles.arrow}></span>
      </div>
    </div>
  );
}
