import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
      <Link href="/" className={styles.home}>
        <ArrowLeft size={15} aria-hidden="true" /> Home
      </Link>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1>{title}</h1>
      <p className={styles.introduction}>{introduction}</p>
    </header>
  );
}
