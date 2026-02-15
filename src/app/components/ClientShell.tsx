"use client";

import dynamic from "next/dynamic";
import { TransitionProvider } from "@/lib/TransitionContext";
import { GpuTierProvider } from "@/lib/GpuTierContext";

const CustomCursor = dynamic(() => import("./ui/CustomCursor"), { ssr: false });
const PageTransition = dynamic(() => import("./ui/PageTransition"), {
  ssr: false,
});
const ViewportFrame = dynamic(() => import("./ui/ViewportFrame"), {
  ssr: false,
});

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GpuTierProvider>
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="chromatic" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
            <feOffset in="red" dx="3" dy="0" result="red-shifted" />
            <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
            <feOffset in="blue" dx="-3" dy="0" result="blue-shifted" />
            <feBlend in="red-shifted" in2="SourceGraphic" mode="screen" result="rblend" />
            <feBlend in="blue-shifted" in2="rblend" mode="screen" />
          </filter>
        </defs>
      </svg>
      <TransitionProvider>
        <CustomCursor />
        <PageTransition />
        <ViewportFrame />
        {children}
      </TransitionProvider>
    </GpuTierProvider>
  );
}
