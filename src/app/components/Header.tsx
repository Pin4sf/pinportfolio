"use client";

import styles from "./Header.module.scss";
import CoolLink from "./ui/CoolLink";
import BlobButton from "./ui/BlobButton";
import { navItems } from "@/data/portfolio";

export default function Header() {
  return (
    <header className={styles.header} data-header>
      <div className={styles.wrap}>
        <ul className={styles.left}>
          {navItems.map((item) => (
            <li
              key={item.label}
              className={item.hideOnMobile ? styles.sm : undefined}
            >
              <CoolLink href={item.href} text={item.label} />
            </li>
          ))}
        </ul>
        <div className={styles.right}>
          <a href="#contact">
            <BlobButton>Contact</BlobButton>
          </a>
        </div>
      </div>
    </header>
  );
}
