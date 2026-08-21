import type { AnchorHTMLAttributes, ReactNode } from "react";

type ExternalLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "target"
> & {
  href: string;
  children: ReactNode;
};

export default function ExternalLink({
  children,
  href,
  rel = "noopener noreferrer",
  "aria-label": accessibleLabel,
  ...props
}: ExternalLinkProps) {
  return (
    <a {...props} href={href} target="_blank" rel={rel}>
      {accessibleLabel && <span className="sr-only">{accessibleLabel}</span>}
      {children} <span aria-hidden="true">↗</span>
      <span className="sr-only">Opens in a new tab</span>
    </a>
  );
}
