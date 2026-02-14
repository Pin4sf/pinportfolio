import { notFound } from "next/navigation";
import { projectsData } from "@/data/portfolio";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = projectsData.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.name} - Shivansh Fulper`,
    description: project.description || project.subtitle,
  };
}

export default function ProjectPage({ params }: Props) {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-v1-dark-bg text-white p-8 md:p-16">
      <a
        href="/"
        className="inline-block mb-8 text-v1-green hover:underline font-poppins"
      >
        &larr; Back to Home
      </a>

      <div className="max-w-4xl mx-auto">
        <span className="text-v1-green font-mono text-sm">
          Project {project.index}/{projectsData.length}
        </span>
        <h1
          className="text-4xl md:text-6xl font-bold mt-2 mb-4"
          style={{ fontFamily: "'Comic Neue', sans-serif" }}
        >
          {project.name}
          {project.abbreviation && (
            <span className="text-2xl md:text-3xl opacity-60 ml-4">
              ({project.abbreviation})
            </span>
          )}
        </h1>

        <p className="text-xl text-gray-300 mb-8">{project.subtitle}</p>

        {project.description && (
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            {project.description}
          </p>
        )}

        <div className="mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.name}
            className="w-full max-h-[500px] object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-6">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
          >
            View on GitHub
          </a>
          {project.live !== "#" && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-v1-green text-v1-green font-bold rounded-lg hover:bg-v1-green hover:text-black transition-colors"
            >
              Live Preview
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
