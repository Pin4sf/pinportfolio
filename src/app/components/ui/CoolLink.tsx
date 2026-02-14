"use client";

import styles from "./CoolLink.module.scss";
import clsx from "clsx";

interface CoolLinkProps {
  href: string;
  text: string;
  className?: string;
}

export default function CoolLink({ href, text, className }: CoolLinkProps) {
  return (
    <a
      href={href}
      className={clsx(styles.coolLinks, className)}
      data-text={text}
    >
      <span>{text}</span>
    </a>
  );
}
