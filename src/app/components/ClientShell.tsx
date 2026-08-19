"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { TransitionProvider, useTransition } from "@/lib/TransitionContext";
import { GpuTierProvider } from "@/lib/GpuTierContext";

const CustomCursor = dynamic(() => import("./ui/CustomCursor"), { ssr: false });
const PageTransition = dynamic(() => import("./ui/PageTransition"), {
  ssr: false,
});
const ViewportFrame = dynamic(() => import("./ui/ViewportFrame"), {
  ssr: false,
});
const ToastContainer = dynamic(() => import("./ui/ToastContainer"), {
  ssr: false,
});

function ShellContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { phase } = useTransition();
  const isHomepage = pathname === "/";
  const keepPageTransitionMounted = isHomepage || phase !== "idle";

  if (!isHomepage) {
    return (
      <>
        {keepPageTransitionMounted && <PageTransition />}
        <ViewportFrame />
        {children}
      </>
    );
  }

  return (
    <>
      {keepPageTransitionMounted && <PageTransition />}
      <ViewportFrame />
      <GpuTierProvider>
        <svg
          style={{ position: "absolute", width: 0, height: 0 }}
          aria-hidden="true"
        >
          <defs>
            <filter id="chromatic" colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                result="red"
              />
              <feOffset in="red" dx="3" dy="0" result="red-shifted" />
              <feColorMatrix
                in="SourceGraphic"
                type="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
                result="blue"
              />
              <feOffset in="blue" dx="-3" dy="0" result="blue-shifted" />
              <feBlend
                in="red-shifted"
                in2="SourceGraphic"
                mode="screen"
                result="rblend"
              />
              <feBlend in="blue-shifted" in2="rblend" mode="screen" />
            </filter>
          </defs>
        </svg>
        <CustomCursor />
        <ToastContainer />
        {children}
      </GpuTierProvider>
    </>
  );
}

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TransitionProvider>
      <ShellContent>{children}</ShellContent>
    </TransitionProvider>
  );
}
