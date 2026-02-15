"use client";

import { useEffect, useState } from "react";
import styles from "./ViewportFrame.module.scss";

export default function ViewportFrame() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${styles.frame} ${visible ? styles.visible : ""}`}
      aria-hidden="true"
    />
  );
}
