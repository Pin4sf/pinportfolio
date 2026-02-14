"use client";

import {
  Instrument_Serif,
  Playfair_Display,
  Space_Grotesk,
  DM_Serif_Display,
} from "next/font/google";
import localFont from "next/font/local";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--preview-instrument",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--preview-playfair",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--preview-space-grotesk",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--preview-dm-serif",
  display: "swap",
});

const fonts = [
  {
    name: "Instrument Serif",
    variable: instrumentSerif.variable,
    css: "var(--preview-instrument)",
    style: "Classic elegant serif — warm, editorial, timeless",
  },
  {
    name: "Playfair Display",
    variable: playfairDisplay.variable,
    css: "var(--preview-playfair)",
    style: "Bold transitional serif — high contrast, dramatic, refined",
  },
  {
    name: "DM Serif Display",
    variable: dmSerif.variable,
    css: "var(--preview-dm-serif)",
    style: "Modern display serif — clean, confident, contemporary",
  },
  {
    name: "Space Grotesk",
    variable: spaceGrotesk.variable,
    css: "var(--preview-space-grotesk)",
    style: "Geometric sans — tech-forward, bold, modern",
  },
];

export default function FontExplorationPage() {
  return (
    <div
      className={`${instrumentSerif.variable} ${playfairDisplay.variable} ${spaceGrotesk.variable} ${dmSerif.variable}`}
      style={{
        background: "#090a0e",
        color: "#e0e0e0",
        minHeight: "100vh",
        padding: "4rem 2rem",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "1rem",
          fontWeight: 500,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#8a8a8a",
          marginBottom: "3rem",
        }}
      >
        Font Exploration — Pick Your Display Font
      </h1>

      <p
        style={{
          color: "#555",
          marginBottom: "4rem",
          maxWidth: "600px",
          lineHeight: 1.6,
        }}
      >
        Each option shows how your name, tagline, and section headings will look.
        The body text (Inter) stays the same — only the display font changes.
      </p>

      {fonts.map((font) => (
        <div
          key={font.name}
          style={{
            marginBottom: "6rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            paddingBottom: "4rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#6cff8d",
              }}
            >
              {font.name}
            </span>
            <span style={{ fontSize: "0.8rem", color: "#555" }}>
              {font.style}
            </span>
          </div>

          {/* Hero Name */}
          <h2
            style={{
              fontFamily: font.css,
              fontSize: "clamp(3rem, 10vw, 8rem)",
              lineHeight: 1.05,
              color: "#f0f0f0",
              marginBottom: "1rem",
              fontWeight: 400,
            }}
          >
            Shivansh Fulper
          </h2>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "'Inter', system-ui",
              fontSize: "1.25rem",
              color: "#8a8a8a",
              marginBottom: "2rem",
              fontWeight: 400,
            }}
          >
            Builder. Developer. Thinker.
          </p>

          {/* Section Heading Sample */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2rem",
              marginTop: "2rem",
            }}
          >
            {["Selected Work", "About", "Ventures", "Writing"].map(
              (heading) => (
                <div key={heading}>
                  <h3
                    style={{
                      fontFamily: font.css,
                      fontSize: "2rem",
                      color: "#f0f0f0",
                      fontWeight: 400,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {heading}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "#555" }}>
                    Section heading preview
                  </p>
                </div>
              )
            )}
          </div>

          {/* Mixed Content Preview */}
          <div style={{ marginTop: "2rem", maxWidth: "600px" }}>
            <h3
              style={{
                fontFamily: font.css,
                fontSize: "2.5rem",
                color: "#f0f0f0",
                fontWeight: 400,
                marginBottom: "0.75rem",
              }}
            >
              OneSync
            </h3>
            <p
              style={{
                fontSize: "1.0625rem",
                color: "#e0e0e0",
                lineHeight: 1.6,
              }}
            >
              Real-time collaboration, reimagined. Built with Next.js and
              WebSocket technology for instant synchronization across all
              connected clients.
            </p>
          </div>
        </div>
      ))}

      <div
        style={{
          marginTop: "4rem",
          padding: "2rem",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "8px",
        }}
      >
        <p style={{ color: "#8a8a8a", fontSize: "0.875rem" }}>
          Visit <strong style={{ color: "#e0e0e0" }}>localhost:3000/fonts</strong>{" "}
          to see this page. Tell me which font you prefer and I&apos;ll apply it
          across the entire site.
        </p>
      </div>
    </div>
  );
}
