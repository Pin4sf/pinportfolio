import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "v1-green": "#6cff8d",
        "v1-dark-green": "rgba(108, 255, 140, 0.48)",
        "v1-dark-bg": "#090a0e",
        "v1-darkish-blue": "#0b1623",
        "v1-yellow": "#e4e400",
        "v1-tan": "rgba(174, 144, 84, 0.92)",
        "v1-cream": "#ffd9a8",
        "v1-faq-1": "#414345",
        "v1-faq-2": "#232526",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        amatic: ["var(--font-amatic)", "cursive"],
        comic: ["var(--font-comic)", "cursive"],
        rubik: ["var(--font-rubik)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
