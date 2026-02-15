import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(6rem, 15vw, 12rem)",
          fontWeight: 400,
          color: "var(--text-heading)",
          lineHeight: 1,
          letterSpacing: "-0.03em",
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: "1.125rem",
          color: "var(--text-secondary)",
          marginTop: "1rem",
          maxWidth: "400px",
        }}
      >
        This page doesn&apos;t exist. It might have been moved or deleted.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "2rem",
          fontSize: "0.875rem",
          fontWeight: 500,
          letterSpacing: "0.05em",
          textTransform: "uppercase" as const,
          color: "var(--bg-primary)",
          background: "var(--accent)",
          padding: "0.625rem 1.5rem",
          borderRadius: "var(--radius-full)",
          textDecoration: "none",
          transition: "background 0.3s ease",
        }}
      >
        Back to Home
      </Link>
    </main>
  );
}
