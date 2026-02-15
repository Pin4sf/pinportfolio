"use client";

import { useRef, useCallback } from "react";
import styles from "./CoolLink.module.scss";
import clsx from "clsx";
import TransitionLink from "./TransitionLink";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*<>[]{}";

interface CoolLinkProps {
  href: string;
  text: string;
  className?: string;
}

export default function CoolLink({ href, text, className }: CoolLinkProps) {
  const isPageLink = href.startsWith("/") && !href.startsWith("#");
  const Tag = isPageLink ? TransitionLink : "a";
  const spanRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(0 as unknown as ReturnType<typeof setInterval>);

  const scramble = useCallback(() => {
    const el = spanRef.current;
    if (!el) return;

    let iteration = 0;
    clearInterval(intervalRef.current);
    cancelAnimationFrame(rafRef.current);

    // Use setInterval for consistent timing (more visible than rAF)
    intervalRef.current = setInterval(() => {
      el.textContent = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < iteration) return text[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }

      iteration += 1 / 3; // Resolve ~1 char every 3 frames = slower decode
    }, 30); // 30ms per frame = visible scramble
  }, [text]);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    cancelAnimationFrame(rafRef.current);
    if (spanRef.current) spanRef.current.textContent = text;
  }, [text]);

  return (
    <Tag
      href={href}
      className={clsx(styles.coolLinks, className)}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      aria-label={text}
    >
      <span ref={spanRef} aria-hidden="true">{text}</span>
    </Tag>
  );
}
