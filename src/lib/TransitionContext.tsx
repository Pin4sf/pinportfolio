"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  getSourceSection,
  clearSourceSection,
  scrollToSection,
} from "./scrollRestoration";

type Phase = "idle" | "exit" | "navigate" | "enter";

interface TransitionContextValue {
  phase: Phase;
  targetHref: string | null;
  navigateTo: (href: string) => void;
  onExitComplete: () => void;
  onEnterComplete: () => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useTransition must be used within TransitionProvider");
  return ctx;
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [targetHref, setTargetHref] = useState<string | null>(null);
  const prevPathname = useRef(pathname);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const stopScroll = useCallback(() => {
    const lenis = window.__lenis;
    if (lenis) lenis.stop();
    document.body.style.overflow = "hidden";
  }, []);

  const startScroll = useCallback(() => {
    document.body.style.overflow = "";
    const lenis = window.__lenis;
    if (lenis) lenis.start();
  }, []);

  const navigateTo = useCallback(
    (href: string) => {
      if (phase !== "idle") return;
      if (href === pathname) return;

      stopScroll();
      setTargetHref(href);
      setPhase("exit");
    },
    [phase, pathname, stopScroll]
  );

  // Called by PageTransition after exit animation finishes
  const onExitComplete = useCallback(() => {
    if (!targetHref) return;

    window.scrollTo(0, 0);
    setPhase("navigate");
    router.push(targetHref);

    // Failsafe: if route doesn't resolve in 3s, reveal anyway
    timeoutRef.current = setTimeout(() => {
      setPhase("enter");
    }, 3000);
  }, [targetHref, router]);

  // Called by PageTransition after enter animation finishes
  const onEnterComplete = useCallback(() => {
    startScroll();
    setPhase("idle");
    setTargetHref(null);

    // Restore scroll position if returning to homepage
    if (pathname === "/") {
      const sourceSection = getSourceSection();
      if (sourceSection) {
        // Small delay to ensure DOM is ready and Lenis is initialized
        setTimeout(() => {
          scrollToSection(sourceSection);
          clearSourceSection();
        }, 100);
      }
    }
  }, [startScroll, pathname]);

  // Detect when the route has changed (new page loaded)
  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (phase === "navigate") {
        // Route resolved — let the new page paint, then reveal
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setPhase("enter");
          });
        });
      } else if (phase === "idle") {
        // Back/forward button — play quick enter animation
        stopScroll();
        window.scrollTo(0, 0);
        setPhase("enter");
      }
    }
  }, [pathname, phase, stopScroll]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <TransitionContext.Provider
      value={{ phase, targetHref, navigateTo, onExitComplete, onEnterComplete }}
    >
      {children}
    </TransitionContext.Provider>
  );
}
