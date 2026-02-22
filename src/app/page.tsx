import dynamic from "next/dynamic";
import {
  heroData,
  aboutData,
  caseStudies,
  skillCategories,
  contactData,
  siteConfig,
} from "@/data/portfolio";

// Dynamic imports for client components — avoid SSR for GSAP/Three.js
const LoadingScreen = dynamic(
  () => import("./components/LoadingScreen"),
  { ssr: false }
);
const SmoothScroll = dynamic(
  () => import("./components/SmoothScroll"),
  { ssr: false }
);
const Header = dynamic(
  () => import("./components/layout/Header"),
  { ssr: false }
);
const Hero = dynamic(
  () => import("./components/sections/Hero"),
  { ssr: false }
);
const SelectedWork = dynamic(
  () => import("./components/sections/SelectedWork"),
  { ssr: false }
);
const About = dynamic(
  () => import("./components/sections/About"),
  { ssr: false }
);
const Writing = dynamic(
  () => import("./components/sections/Writing"),
  { ssr: false }
);
const SkillsExperience = dynamic(
  () => import("./components/sections/SkillsExperience"),
  { ssr: false }
);
const Timeline = dynamic(
  () => import("./components/sections/Timeline"),
  { ssr: false }
);
const Contact = dynamic(
  () => import("./components/sections/Contact"),
  { ssr: false }
);
const Footer = dynamic(
  () => import("./components/sections/Footer"),
  { ssr: false }
);
const SectionProgress = dynamic(
  () => import("./components/ui/SectionProgress"),
  { ssr: false }
);

/**
 * SSR content block for search engine crawlers.
 * All interactive sections use ssr:false (required for Three.js/GSAP),
 * so this provides indexable content in the initial HTML response.
 * Visually hidden — replaced by dynamic components once JS loads.
 */
function SeoContent() {
  return (
    <div className="sr-only" aria-hidden="true">
      <h1>{heroData.name} — {heroData.tagline}</h1>
      <p>{heroData.subtitle}</p>
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
      {caseStudies.map((cs) => (
        <article key={cs.slug}>
          <h3>
            <a href={`/work/${cs.slug}`}>{cs.name}</a>
          </h3>
          <p>
            {cs.role} · {cs.timeline}
          </p>
          <p>{cs.tagline}</p>
          <p>{cs.challenge}</p>
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
    </div>
  );
}

export default function Page() {
  return (
    <>
      <SeoContent />
      <LoadingScreen />
      <Header />
      <SectionProgress />
      <SmoothScroll>
        <main id="main-content">
          <Hero />
          <SelectedWork />
          <About />
          <Writing />
          <Timeline />
          <SkillsExperience />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
