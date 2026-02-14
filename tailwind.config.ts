import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#090a0e",
          secondary: "#0d0e13",
          tertiary: "#111215",
        },
        text: {
          primary: "#e0e0e0",
          secondary: "#8a8a8a",
          heading: "#f0f0f0",
          tertiary: "#555555",
        },
        accent: {
          DEFAULT: "#6cff8d",
          hover: "#8affaa",
          muted: "rgba(108, 255, 140, 0.15)",
          warm: "#f0c040",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          visible: "rgba(255, 255, 255, 0.15)",
        },
      },
      fontFamily: {
        display: ["var(--font-instrument-serif)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        hero: "clamp(3rem, 10vw, 10rem)",
      },
    },
  },
  plugins: [],
};
export default config;
