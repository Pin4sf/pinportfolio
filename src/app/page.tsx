import dynamic from "next/dynamic";
import {
  heroData,
  aboutData,
  getPublicCaseStudies,
  skillCategories,
  contactData,
  siteConfig,
} from "@/data/portfolio";
import { getFeaturedPosts } from "@/lib/mdx";

// Dynamic imports for client components — avoid SSR for GSAP/Three.js
const SmoothScroll = dynamic(() => import("./components/SmoothScroll"), {
  ssr: false,
});
const Header = dynamic(() => import("./components/layout/Header"), {
  ssr: false,
});
const Hero = dynamic(() => import("./components/sections/Hero"), {
  ssr: false,
});
const SelectedWork = dynamic(
  () => import("./components/sections/SelectedWork"),
  { ssr: false },
);
const About = dynamic(() => import("./components/sections/About"), {
  ssr: false,
});
const Writing = dynamic(() => import("./components/sections/Writing"), {
  ssr: false,
});
const SkillsExperience = dynamic(
  () => import("./components/sections/SkillsExperience"),
  { ssr: false },
);
const Timeline = dynamic(() => import("./components/sections/Timeline"), {
  ssr: false,
});
const Contact = dynamic(() => import("./components/sections/Contact"), {
  ssr: false,
});
const Footer = dynamic(() => import("./components/sections/Footer"), {
  ssr: false,
});
const SectionProgress = dynamic(
  () => import("./components/ui/SectionProgress"),
  { ssr: false },
);

/**
 * SSR content block for search engine crawlers.
 * All interactive sections use ssr:false (required for Three.js/GSAP),
 * so this provides indexable content in the initial HTML response.
 * Visually hidden — replaced by dynamic components once JS loads.
 */
function SeoContent() {
  return (
    <aside
      className="sr-only"
      aria-label="Portfolio summary for search indexing"
      aria-hidden="true"
    >
      <h1>
        {heroData.name} — {heroData.tagline}
      </h1>
      <p>{siteConfig.description}</p>

      <h2>About</h2>
      {aboutData.bio.split("\n\n").map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <ul>
        {aboutData.facts.map((f) => (
          <li key={f.label}>
            {f.label}: {f.value}
          </li>
        ))}
      </ul>

      <h2>Selected Work</h2>
      {getPublicCaseStudies()
        .filter((project) => project.slug === "waldo")
        .map((project) => (
          <article key={project.slug}>
            <h3>{project.name}</h3>
            <p>{project.role}</p>
            <p>{project.tagline}</p>
          </article>
        ))}

      <h2>Skills</h2>
      {skillCategories.map((cat) => (
        <div key={cat.name}>
          <h3>{cat.name}</h3>
          <ul>
            {cat.skills.map((s) => (
              <li key={s.name}>{s.name}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2>Contact</h2>
      <p>Email: {contactData.email}</p>
      <p>Location: {contactData.location}</p>
      {contactData.socials.map((s) => (
        <a key={s.name} href={s.url}>
          {s.name}
        </a>
      ))}
    </aside>
  );
}

export default function Page() {
  const featuredPosts = getFeaturedPosts(3);

  return (
    <>
      <SeoContent />
      <Header />
      <SectionProgress />
      <SmoothScroll>
        <main id="main-content">
          <Hero />
          <SelectedWork />
          <About />
          <Writing featuredPosts={featuredPosts} />
          <Timeline />
          <SkillsExperience />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
