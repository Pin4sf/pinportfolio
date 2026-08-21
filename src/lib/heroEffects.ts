import type { GpuTier } from "./GpuTierContext";

export type HeroEffectInputs = {
  reducedMotion: boolean;
  reducedData: boolean;
  viewportWidth: number;
  interactionCapable: boolean;
  gpuTier: GpuTier;
};

export function shouldEnableHeroEffects({
  reducedMotion,
  reducedData,
  viewportWidth,
  interactionCapable,
  gpuTier,
}: HeroEffectInputs) {
  return (
    !reducedMotion &&
    !reducedData &&
    viewportWidth >= 1024 &&
    interactionCapable &&
    (gpuTier === "mid" || gpuTier === "high")
  );
}
