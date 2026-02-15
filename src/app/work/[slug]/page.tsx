import { notFound } from "next/navigation";
import { caseStudies, siteConfig } from "@/data/portfolio";
import type { Metadata } from "next";
import CaseStudy from "./CaseStudy";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) return { title: "Not Found" };

  const description = `${cs.tagline} — ${cs.challenge.slice(0, 140)}...`;

  return {
    title: cs.name,
    description,
    alternates: {
      canonical: `/work/${cs.slug}`,
    },
    openGraph: {
      title: `${cs.name} — ${cs.role}`,
      description,
      url: `${siteConfig.url}/work/${cs.slug}`,
      images: [
        {
          url: cs.heroImage,
          width: 1200,
          height: 630,
          alt: `${cs.name} — ${cs.tagline}`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cs.name} — Shivansh Fulper`,
      description,
      images: [cs.heroImage],
    },
  };
}

export default function WorkPage({ params }: Props) {
  const cs = caseStudies.find((c) => c.slug === params.slug);

  if (!cs) {
    notFound();
  }

  // Find adjacent case studies for next/prev navigation
  const currentIndex = caseStudies.findIndex((c) => c.slug === params.slug);
  const prev = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const next =
    currentIndex < caseStudies.length - 1
      ? caseStudies[currentIndex + 1]
      : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.name,
    description: cs.tagline,
    image: `${siteConfig.url}${cs.heroImage}`,
    url: `${siteConfig.url}/work/${cs.slug}`,
    author: {
      "@type": "Person",
      name: "Shivansh Fulper",
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: "Shivansh Fulper",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudy caseStudy={cs} prev={prev} next={next} />
    </>
  );
}
