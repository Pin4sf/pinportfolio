"use client";

import { createContext, useState, useEffect, type ReactNode } from "react";

export type GpuTier = "low" | "mid" | "high";

export const GpuTierContext = createContext<GpuTier>("mid");

export function GpuTierProvider({ children }: { children: ReactNode }) {
  const [tier, setTier] = useState<GpuTier>("mid");

  useEffect(() => {
    import("detect-gpu")
      .then(({ getGPUTier }) => getGPUTier())
      .then((result) => {
        if (result.tier <= 1) setTier("low");
        else if (result.tier === 2) setTier("mid");
        else setTier("high");
      })
      .catch(() => {
        // Default to mid on failure
      });
  }, []);

  return (
    <GpuTierContext.Provider value={tier}>{children}</GpuTierContext.Provider>
  );
}
