"use client";

import { useTransition } from "@/lib/TransitionContext";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { useRouter } from "next/navigation";

interface TransitionLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export default function TransitionLink({
  href,
  onClick,
  children,
  ...rest
}: TransitionLinkProps) {
  const { navigateTo } = useTransition();
  const reducedMotion = useReducedMotion();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let external, hash, mailto, and tel links pass through
    if (
      href.startsWith("http") ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      onClick?.(e);
      return;
    }

    // Allow cmd/ctrl+click for new tab
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;

    e.preventDefault();
    onClick?.(e);

    if (reducedMotion) {
      router.push(href);
      return;
    }

    navigateTo(href);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
