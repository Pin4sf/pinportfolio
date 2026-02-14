"use client";

import styles from "./GlitchIcon.module.scss";
import clsx from "clsx";

interface GlitchIconProps {
  iconClass: string;
  href: string;
  className?: string;
}

export default function GlitchIcon({
  iconClass,
  href,
  className,
}: GlitchIconProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      <i className={clsx(`uil ${iconClass}`, styles.coloredIcon)}></i>
    </a>
  );
}
