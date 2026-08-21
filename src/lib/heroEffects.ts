import type { GpuTier } from "./GpuTierContext";

export type HeroEffectInputs = {
  reducedMotion: boolean;
  reducedData: boolean;
  isMobile: boolean;
  gpuTier: GpuTier;
};

export function shouldEnableHeroEffects({
  reducedMotion,
  reducedData,
  isMobile,
  gpuTier,
}: HeroEffectInputs) {
  return (
    !reducedMotion &&
    !reducedData &&
    !isMobile &&
    (gpuTier === "mid" || gpuTier === "high")
  );
}
