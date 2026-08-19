import dynamic from "next/dynamic";
import {
  contactData,
  getPublicArtifacts,
  heroData,
  siteConfig,
  timelineData,
} from "@/data/portfolio";
import { getFeaturedPosts } from "@/lib/mdx";

// Dynamic imports keep the cinematic client surfaces out of initial SSR.
const SmoothScroll = dynamic(() => import("./components/SmoothScroll"), {
  ssr: false,
});
const Header = dynamic(() => import("./components/layout/Header"), {
  ssr: false,
});
const Hero = dynamic(() => import("./components/sections/Hero"), {
  ssr: false,
});
const Now = dynamic(() => import("./components/sections/Now"), {
  ssr: false,
});
const CuriosityThread = dynamic(
  () => import("./components/sections/CuriosityThread"),
  { ssr: false },
);
const Writing = dynamic(() => import("./components/sections/Writing"), {
  ssr: false,
});
const SelectedChapters = dynamic(
  () => import("./components/sections/SelectedChapters"),
  { ssr: false },
);
const PersonalPreview = dynamic(
  () => import("./components/sections/PersonalPreview"),
  { ssr: false },
);
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

const chapterOrganizations = [
  "Atlan",
  "Soket AI Labs",
  "MIRAI-Setu",
  "HackByte",
  "IIITDM Jabalpur",
];

/**
 * SSR content block for search engine crawlers.
 * The visual sections use ssr:false, so this preserves meaningful initial HTML.
 */
function SeoContent({
  featuredPosts,
}: {
  featuredPosts: ReturnType<typeof getFeaturedPosts>;
}) {
  const artifacts = getPublicArtifacts({ featured: true });
  const chapters = timelineData.filter((entry) =>
    chapterOrganizations.some((organization) =>
      entry.organization.includes(organization),
    ),
  );

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

      <h2>Public work</h2>
      {artifacts.map((artifact) => (
        <article key={artifact.slug}>
          <h3>{artifact.title}</h3>
          <p>{artifact.summary}</p>
          <a href={artifact.href}>{artifact.title}</a>
        </article>
      ))}

      <h2>Selected chapters</h2>
      {chapters.map((chapter) => (
        <article key={`${chapter.year}-${chapter.organization}`}>
          <h3>{chapter.organization}</h3>
          <p>{chapter.description}</p>
          {chapter.nextQuestion && <p>{chapter.nextQuestion}</p>}
        </article>
      ))}

      <h2>Writing</h2>
      {featuredPosts.map((post) => (
        <article key={post.slug}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <a href={`/writing/${post.slug}`}>Read {post.title}</a>
        </article>
      ))}

      <p>
        <a href="/about">More about Shivansh Fulper</a>
      </p>

      <h2>Contact</h2>
      <p>Email: {contactData.email}</p>
      <p>Location: {contactData.location}</p>
      {contactData.socials.map((social) => (
        <a key={social.name} href={social.url}>
          {social.name}
        </a>
      ))}
    </aside>
  );
}

export default function Page() {
  const featuredPosts = getFeaturedPosts(3);

  return (
    <>
      <SeoContent featuredPosts={featuredPosts} />
      <Header />
      <SectionProgress />
      <SmoothScroll>
        <main id="main-content">
          <Hero />
          <Now />
          <CuriosityThread />
          <Writing featuredPosts={featuredPosts} />
          <SelectedChapters />
          <PersonalPreview />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
