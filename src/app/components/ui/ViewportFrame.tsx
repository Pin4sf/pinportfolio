import styles from "./ViewportFrame.module.scss";

export default function ViewportFrame() {
  return <div className={styles.frame} aria-hidden="true" />;
}
