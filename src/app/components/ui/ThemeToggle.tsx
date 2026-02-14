"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.scss";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <button
      className={styles.toggle}
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      data-cursor="Toggle"
    >
      <span className={`${styles.icon} ${theme === "dark" ? styles.active : ""}`}>
        <Moon size={14} />
      </span>
      <span className={`${styles.icon} ${theme === "light" ? styles.active : ""}`}>
        <Sun size={14} />
      </span>
    </button>
  );
}
