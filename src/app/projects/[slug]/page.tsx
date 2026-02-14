import { notFound } from "next/navigation";
import { caseStudies } from "@/data/portfolio";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const cs = caseStudies.find((p) => p.slug === params.slug);
  if (!cs) return { title: "Project Not Found" };

  return {
    title: `${cs.name} - Shivansh Fulper`,
    description: cs.tagline,
  };
}

export default function ProjectPage({ params }: Props) {
  const cs = caseStudies.find((p) => p.slug === params.slug);

  if (!cs) {
    notFound();
  }

  // Redirect to the new /work/[slug] route
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary p-8 md:p-16">
      <a
        href="/"
        className="inline-block mb-8 text-accent hover:underline"
      >
        &larr; Back to Home
      </a>

      <div className="max-w-4xl mx-auto">
        <span className="text-accent font-mono text-sm">
          {cs.role} · {cs.timeline}
        </span>
        <h1 className="text-4xl md:text-6xl font-display mt-2 mb-4">
          {cs.name}
        </h1>

        <p className="text-xl text-text-secondary mb-8">{cs.tagline}</p>
        <p className="text-lg text-text-secondary mb-8 leading-relaxed">
          {cs.solution}
        </p>

        <div className="mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cs.heroImage}
            alt={cs.name}
            className="w-full max-h-[500px] object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {cs.techStack.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-bg-tertiary border border-border-subtle rounded-full text-sm font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-6">
          {cs.githubUrl && (
            <a
              href={cs.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-accent text-bg-primary font-bold rounded-lg hover:bg-accent-hover transition-colors"
            >
              View on GitHub
            </a>
          )}
          {cs.liveUrl && (
            <a
              href={cs.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-accent text-accent font-bold rounded-lg hover:bg-accent hover:text-bg-primary transition-colors"
            >
              Live Preview
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
