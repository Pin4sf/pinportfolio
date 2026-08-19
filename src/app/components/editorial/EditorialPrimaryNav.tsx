import { navItems } from "@/data/portfolio";
import styles from "./EditorialPrimaryNav.module.scss";

export default function EditorialPrimaryNav() {
  return (
    <nav className={styles.nav} aria-label="Primary navigation">
      {navItems.map((item) => (
        <a href={item.href} key={item.label}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
