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
import ExternalLink from "../ui/ExternalLink";
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

function useHeroCapabilities() {
  const [capabilities, setCapabilities] = useState({
    viewportWidth: 0,
    interactionCapable: false,
  });

  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      setCapabilities({
        viewportWidth: window.innerWidth,
        interactionCapable: true,
      });
      return;
    }

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const interactionQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const syncCapabilities = () => {
      setCapabilities({
        viewportWidth: desktopQuery.matches ? window.innerWidth : 0,
        interactionCapable: interactionQuery.matches,
      });
    };

    syncCapabilities();
    desktopQuery.addEventListener("change", syncCapabilities);
    interactionQuery.addEventListener("change", syncCapabilities);
    window.addEventListener("resize", syncCapabilities);
    return () => {
      desktopQuery.removeEventListener("change", syncCapabilities);
      interactionQuery.removeEventListener("change", syncCapabilities);
      window.removeEventListener("resize", syncCapabilities);
    };
  }, []);

  return capabilities;
}

function HeroContent() {
  const reducedMotion = useReducedMotion();
  const reducedData = useReducedData();
  const { viewportWidth, interactionCapable } = useHeroCapabilities();
  const gpuTier = useGpuTier();
  const [canvasFailed, setCanvasFailed] = useState(false);
  const handleCanvasFailure = useCallback(() => setCanvasFailed(true), []);
  const enableHeroEffects = shouldEnableHeroEffects({
    reducedMotion,
    reducedData,
    viewportWidth,
    interactionCapable,
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
        <p className={styles.eyebrow}>{heroData.eyebrow}</p>
        <h1 className={styles.name}>{heroData.name}</h1>
        <p className={styles.tagline}>{heroData.tagline}</p>
        <p className={styles.subtitle}>{heroData.subtitle}</p>
      </div>

      <div className={styles.socials}>
        {heroData.socials.map((social) => {
          const Icon = iconMap[social.icon];
          return (
            <ExternalLink
              key={social.name}
              href={social.url}
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={social.name}
            >
              {Icon && <Icon size={18} aria-hidden="true" />}
            </ExternalLink>
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
