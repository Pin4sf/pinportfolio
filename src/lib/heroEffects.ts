import type { GpuTier } from "./GpuTierContext";

type HeroEffectInputs = {
  reducedMotion: boolean;
  isMobile: boolean;
  gpuTier: GpuTier;
};

export function shouldEnableHeroEffects({
  reducedMotion,
  isMobile,
  gpuTier,
}: HeroEffectInputs) {
  return (
    !reducedMotion && !isMobile && (gpuTier === "mid" || gpuTier === "high")
  );
}
