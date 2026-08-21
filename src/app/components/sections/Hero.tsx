"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Github,
  Instagram,
  Linkedin,
  Twitter,
  type LucideIcon,
} from "lucide-react";
import { heroData } from "@/data/portfolio";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { useGpuTier } from "@/app/hooks/useGpuTier";
import { GpuTierProvider } from "@/lib/GpuTierContext";
import { shouldEnableHeroEffects } from "@/lib/heroEffects";
import ErrorBoundary from "../ErrorBoundary";
import styles from "./Hero.module.scss";

const HeroBackground = dynamic(() => import("../three/HeroBackground"), {
  ssr: false,
});

interface HeroNetworkInformation {
  readonly saveData?: boolean;
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
}

declare global {
  interface Navigator {
    readonly connection?: HeroNetworkInformation;
  }
}

const iconMap: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  github: Github,
  twitter: Twitter,
  instagram: Instagram,
};

function useReducedData() {
  const [reducedData, setReducedData] = useState(true);

  useEffect(() => {
    const connection = navigator.connection;
    const syncPreference = () => {
      setReducedData(connection?.saveData === true);
    };

    syncPreference();
    connection?.addEventListener?.("change", syncPreference);
    return () => connection?.removeEventListener?.("change", syncPreference);
  }, []);

  return reducedData;
}

function useMobileViewport() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}

function HeroContent() {
  const reducedMotion = useReducedMotion();
  const reducedData = useReducedData();
  const isMobile = useMobileViewport();
  const gpuTier = useGpuTier();
  const [canvasFailed, setCanvasFailed] = useState(false);
  const handleCanvasFailure = useCallback(() => setCanvasFailed(true), []);
  const enableHeroEffects = shouldEnableHeroEffects({
    reducedMotion,
    reducedData,
    isMobile,
    gpuTier,
  });

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.signalPoster} aria-hidden="true">
        <span className={styles.signalTrace} />
        <span className={styles.signalNode} />
      </div>

      {enableHeroEffects && !canvasFailed && (
        <ErrorBoundary>
          <HeroBackground onFailure={handleCanvasFailure} />
        </ErrorBoundary>
      )}

      <div className={styles.content}>
        <p className={styles.eyebrow}>Founder + AI systems researcher</p>
        <h1 className={styles.name}>{heroData.name}</h1>
        <p className={styles.tagline}>{heroData.tagline}</p>
        <p className={styles.subtitle}>{heroData.subtitle}</p>
      </div>

      <div className={styles.socials}>
        {heroData.socials.map((social) => {
          const Icon = iconMap[social.icon];
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={social.name}
            >
              {Icon && <Icon size={18} aria-hidden="true" />}
            </a>
          );
        })}
      </div>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll</span>
      </div>
    </section>
  );
}

export default function Hero() {
  return (
    <GpuTierProvider>
      <HeroContent />
    </GpuTierProvider>
  );
}
