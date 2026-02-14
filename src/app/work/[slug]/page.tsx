import { notFound } from "next/navigation";
import { caseStudies } from "@/data/portfolio";
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

  return {
    title: `${cs.name} — Shivansh Fulper`,
    description: cs.tagline,
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

  return <CaseStudy caseStudy={cs} prev={prev} next={next} />;
}
