import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.scss";
import { siteConfig } from "@/data/portfolio";
import ClientShell from "./components/ClientShell";
import Script from "next/script";

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
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.author,
    images: [siteConfig.ogImage],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@FulperShivansh",
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
      jobTitle: "AI Engineer & Startup Founder",
      description:
        "AI engineer building cognitive performance wearables (OneSync) and decentralized waste-to-value infrastructure (EcoFresh Greensync). CTO at OneSync, AI Engineer at Atlan.",
      email: "piyushfulper3210@gmail.com",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "IIITDM Jabalpur",
      },
      worksFor: [
        {
          "@type": "Organization",
          name: "OneSync",
          url: "https://onesync-website-zs1p.vercel.app/",
        },
        {
          "@type": "Organization",
          name: "Atlan",
        },
      ],
      knowsAbout: [
        "Artificial Intelligence",
        "Large Language Models",
        "Agentic Systems",
        "Biosignal Processing",
        "Full-Stack Engineering",
        "Startups",
      ],
      sameAs: [
        "https://www.linkedin.com/in/shivanshfulper/",
        "https://github.com/Pin4sf",
        "https://twitter.com/FulperShivansh",
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
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main-content" className="sr-only" style={{ position: 'absolute', top: 0, left: 0, zIndex: 9999, padding: '1rem', background: 'var(--accent)', color: 'var(--bg-primary)' }}>
          Skip to content
        </a>
        <ClientShell>
          {children}
        </ClientShell>
      </body>
    </html>
  );
}
