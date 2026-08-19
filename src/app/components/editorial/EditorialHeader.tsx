import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { navItems } from "@/data/portfolio";
import styles from "./EditorialHeader.module.scss";

interface EditorialHeaderProps {
  eyebrow: string;
  title: string;
  introduction: string;
}

export default function EditorialHeader({
  eyebrow,
  title,
  introduction,
}: EditorialHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.navigation}>
        <Link href="/" className={styles.home}>
          <ArrowLeft size={15} aria-hidden="true" /> Home
        </Link>
        <nav className={styles.primaryNav} aria-label="Primary navigation">
          {navItems.map((item) =>
            item.href.includes("#") ? (
              <a href={item.href} key={item.label}>
                {item.label}
              </a>
            ) : (
              <Link href={item.href} key={item.label}>
                {item.label}
              </Link>
            ),
          )}
        </nav>
      </div>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1>{title}</h1>
      <p className={styles.introduction}>{introduction}</p>
    </header>
  );
}
