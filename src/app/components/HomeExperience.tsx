"use client";

import dynamic from "next/dynamic";
import { GpuTierProvider } from "@/lib/GpuTierContext";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

const CustomCursor = dynamic(() => import("./ui/CustomCursor"), {
  ssr: false,
});

export default function HomeExperience({
  children,
}: {
  children: React.ReactNode;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <GpuTierProvider>
      {!reducedMotion && <CustomCursor />}
      {children}
    </GpuTierProvider>
  );
}
