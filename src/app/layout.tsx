import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.scss";
import { siteConfig } from "@/data/portfolio";
import ClientShell from "./components/ClientShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Georgia", "serif"], // Explicit fallback to avoid override calculation
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.author}`,
  },
  description: siteConfig.description,
  keywords: [
    "Shivansh Fulper",
    "Founder",
    "AI systems researcher",
    "Waldo",
    "Kennel",
    "Atlan",
    "Persistent agents",
    "Agent harnesses",
    "Agent memory",
    "Long-horizon agents",
    "Agent monitoring",
    "Agent control",
    "Agent evaluation",
    "Physical AI",
    "Project EKA",
    "IIITDM Jabalpur",
  ],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.author,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.author} — Founder & AI Systems Researcher`,
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@FulperShivansh",
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-icon-180x180.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.author,
      description: siteConfig.description,
    },
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: "Shivansh Fulper",
      url: siteConfig.url,
      jobTitle: "Founder & AI Systems Researcher",
      description:
        "Founder of Waldo and AI systems researcher studying persistent agents, memory and state, long-horizon execution, monitoring, control, and evaluation. Previously built and operated production agent systems at Atlan.",
      email: "piyushfulper3210@gmail.com",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "IIITDM Jabalpur",
      },
      worksFor: [
        {
          "@type": "Organization",
          name: "Waldo",
          url: "https://www.heywaldo.in/",
        },
      ],
      knowsAbout: [
        "Artificial Intelligence",
        "Large Language Models",
        "AI Agents",
        "Agent Harnesses",
        "Agent Memory",
        "Long-Horizon Execution",
        "Agent Monitoring and Control",
        "Agent Evaluation",
        "Physical AI",
      ],
      sameAs: [
        "https://www.linkedin.com/in/shivansh-fulper/",
        "https://github.com/Pin4sf",
        "https://x.com/shivanshfulper",
        "https://instagram.com/pin4sf",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 9999,
            padding: "1rem",
            background: "var(--accent)",
            color: "var(--bg-primary)",
          }}
        >
          Skip to content
        </a>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
