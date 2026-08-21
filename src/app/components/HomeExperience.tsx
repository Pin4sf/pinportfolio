"use client";

import dynamic from "next/dynamic";
import { GpuTierProvider } from "@/lib/GpuTierContext";

const CustomCursor = dynamic(() => import("./ui/CustomCursor"), {
  ssr: false,
});

export default function HomeExperience({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GpuTierProvider>
      <CustomCursor />
      {children}
    </GpuTierProvider>
  );
}
