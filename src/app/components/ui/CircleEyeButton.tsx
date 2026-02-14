"use client";

import { useId } from "react";
import styles from "./CircleEyeButton.module.scss";
import clsx from "clsx";

interface CircleEyeButtonProps {
  href?: string;
  text?: string;
  className?: string;
}

export default function CircleEyeButton({
  href,
  text = ".Click to see the live version.",
  className,
}: CircleEyeButtonProps) {
  const uniqueId = useId();
  const pathId = `textcircle-${uniqueId.replace(/:/g, "")}`;

  const content = (
    <>
      <svg className={styles.textcircle} viewBox="0 0 500 500">
        <defs>
          <path
            id={pathId}
            d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"
          />
        </defs>
        <text>
          <textPath
            xlinkHref={`#${pathId}`}
            aria-label={text}
            textLength="900"
          >
            {text}
          </textPath>
        </text>
      </svg>
      <svg
        className={styles.eye}
        aria-hidden="true"
        viewBox="0 0 70 70"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={styles.eye__outer}
          d="M10.5 35.308c5.227-7.98 14.248-13.252 24.5-13.252s19.273 5.271 24.5 13.252c-5.227 7.98-14.248 13.253-24.5 13.253s-19.273-5.272-24.5-13.253z"
        />
        <path
          className={styles.eye__lashesUp}
          d="M35 8.802v8.836M49.537 11.383l-3.31 8.192M20.522 11.684l3.31 8.192"
        />
        <path
          className={styles.eye__lashesDown}
          d="M35 61.818v-8.836 8.836zM49.537 59.237l-3.31-8.193 3.31 8.193zM20.522 58.936l3.31-8.193-3.31 8.193z"
        />
        <circle className={styles.eye__iris} cx="35" cy="35.31" r="5.221" />
        <circle className={styles.eye__inner} cx="35" cy="35.31" r="10.041" />
      </svg>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(styles.coolCircleEyeButton, className)}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={clsx(styles.coolCircleEyeButton, className)}>
      {content}
    </div>
  );
}
