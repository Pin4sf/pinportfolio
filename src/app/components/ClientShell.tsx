"use client";

import dynamic from "next/dynamic";
import { TransitionProvider } from "@/lib/TransitionContext";

const CustomCursor = dynamic(() => import("./ui/CustomCursor"), { ssr: false });
const PageTransition = dynamic(() => import("./ui/PageTransition"), {
  ssr: false,
});

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TransitionProvider>
      <CustomCursor />
      <PageTransition />
      {children}
    </TransitionProvider>
  );
}
