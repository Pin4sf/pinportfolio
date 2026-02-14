"use client";

import styles from "./BlobButton.module.scss";
import clsx from "clsx";

interface BlobButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  darkFill?: boolean;
}

export default function BlobButton({
  children,
  onClick,
  href,
  className,
  darkFill,
}: BlobButtonProps) {
  const button = (
    <button
      className={clsx(styles.coolButton, darkFill && styles.darkFill, className)}
      onClick={onClick}
    >
      <span>{children}</span>
    </button>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {button}
      </a>
    );
  }

  return button;
}
