"use client";

import styles from "./BlobButton.module.scss";
import clsx from "clsx";
import { useMagnetic } from "@/app/hooks/useMagnetic";

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
  const magneticRef = useMagnetic<HTMLDivElement>(0.3);

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
      <div ref={magneticRef} style={{ display: "inline-block" }}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {button}
        </a>
      </div>
    );
  }

  return (
    <div ref={magneticRef} style={{ display: "inline-block" }}>
      {button}
    </div>
  );
}
