import styles from "./ViewportFrame.module.scss";

export default function ViewportFrame() {
  return (
    <div className={`${styles.frame} ${styles.visible}`} aria-hidden="true" />
  );
}
