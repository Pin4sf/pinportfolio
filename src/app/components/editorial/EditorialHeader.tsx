import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import EditorialPrimaryNav from "./EditorialPrimaryNav";
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
        <EditorialPrimaryNav />
      </div>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1>{title}</h1>
      <p className={styles.introduction}>{introduction}</p>
    </header>
  );
}
