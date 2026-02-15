"use client";

import { useContext } from "react";
import { GpuTierContext, type GpuTier } from "@/lib/GpuTierContext";

export type { GpuTier };

export function useGpuTier(): GpuTier {
  return useContext(GpuTierContext);
}
