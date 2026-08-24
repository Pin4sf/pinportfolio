import type { GpuTier } from "./GpuTierContext";

export interface FluidRendererProfile {
  framesPerSecond: number;
  damping: number;
}

const BASELINE_FRAMES_PER_SECOND = 30;

export function getFluidRendererProfile(
  gpuTier: GpuTier,
): FluidRendererProfile {
  const framesPerSecond = gpuTier === "high" ? 60 : gpuTier === "mid" ? 45 : 30;
  const baselineDamping =
    gpuTier === "high" ? 0.982 : gpuTier === "mid" ? 0.976 : 0.97;

  return {
    framesPerSecond,
    damping: Math.pow(
      baselineDamping,
      BASELINE_FRAMES_PER_SECOND / framesPerSecond,
    ),
  };
}
