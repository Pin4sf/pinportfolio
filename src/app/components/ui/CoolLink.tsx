"use client";

import styles from "./CoolLink.module.scss";
import clsx from "clsx";
import TransitionLink from "./TransitionLink";

interface CoolLinkProps {
  href: string;
  text: string;
  className?: string;
}

export default function CoolLink({ href, text, className }: CoolLinkProps) {
  const isPageLink = href.startsWith("/") && !href.startsWith("#");
  const Tag = isPageLink ? TransitionLink : "a";

  return (
    <Tag
      href={href}
      className={clsx(styles.coolLinks, className)}
      data-text={text}
    >
      <span>{text}</span>
    </Tag>
  );
}
