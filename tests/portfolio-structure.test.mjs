import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import matter from "gray-matter";

const root = process.cwd();
const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");

const portfolio = read("src/data/portfolio.ts");
const page = read("src/app/page.tsx");
const hero = read("src/app/components/sections/Hero.tsx");
const clientShell = read("src/app/components/ClientShell.tsx");
const reducedMotionHook = read("src/app/hooks/useReducedMotion.ts");
const globals = read("src/app/globals.scss");
const writing = read("src/app/components/sections/Writing.tsx");
const writingStyles = read("src/app/components/sections/Writing.module.scss");
const blogPost = read("src/app/writing/[slug]/BlogPost.tsx");
const caseStudyComponent = read("src/app/work/[slug]/CaseStudy.tsx");
const homepageSources = [portfolio, page, hero].join("\n");
const caseStudiesSource = portfolio.slice(
  portfolio.indexOf("export const caseStudies"),
  portfolio.indexOf("// ==================== SKILLS"),
);
const waldoCaseStudySource = caseStudiesSource.slice(
  caseStudiesSource.indexOf('slug: "waldo"'),
  caseStudiesSource.indexOf('slug: "ecofresh"'),
);

test("homepage restores the personal founder introduction", () => {
  assert.match(portfolio, /agent that stays on your side/i);
  assert.match(portfolio, /Waldo \+ Kennel/i);
  assert.doesNotMatch(homepageSources, /Explore the evidence/i);
  assert.doesNotMatch(hero, /heroData\.actions|actionPrimary/i);
});

test("homepage is a short cinematic overview", () => {
  for (const component of [
    "<Hero />",
    "<Now />",
    "<CuriosityThread />",
    "<Writing featuredPosts={featuredPosts} />",
    "<SelectedChapters />",
    "<PersonalPreview />",
    "<Contact />",
  ]) {
    assert.match(page, new RegExp(component.replace(/[<>/]/g, "\\$&")));
  }
  assert.doesNotMatch(
    page,
    /<About \/>|<Timeline \/>|<SkillsExperience \/>|<SelectedWork \/>/,
  );
  assert.doesNotMatch(page, /SectionProgress/);
});

test("global visual utilities stay homepage-only", () => {
  assert.match(clientShell, /usePathname/);
  assert.match(clientShell, /const isHomepage = pathname === "\/"/);
  assert.ok(
    clientShell.indexOf("if (!isHomepage)") <
      clientShell.indexOf("<GpuTierProvider>"),
    "editorial routes should return before mounting GPU-tier visual utilities",
  );
});

test("hero effects honor mobile, reduced-motion, and GPU-tier gates", () => {
  assert.match(
    hero,
    /const enableHeroEffects =\s*!reducedMotion && !isMobile && gpuTier !== "low"/,
  );
  assert.match(
    reducedMotionHook,
    /useState\(\s*\(\) =>[\s\S]*matchMedia\("\(prefers-reduced-motion: reduce\)"\)/,
  );
});

test("tertiary text meets AA contrast on the primary background", () => {
  const parseToken = (name) => {
    const match = globals.match(new RegExp(`${name}:\\s*(#[0-9a-f]{6})`, "i"));
    assert.ok(match, `Missing ${name}`);
    return [1, 3, 5].map((index) =>
      Number.parseInt(match[1].slice(index, index + 2), 16),
    );
  };
  const luminance = (rgb) => {
    const channels = rgb.map((value) => {
      const channel = value / 255;
      return channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  };
  const foreground = luminance(parseToken("--text-tertiary"));
  const background = luminance(parseToken("--bg-primary"));
  const ratio =
    (Math.max(foreground, background) + 0.05) /
    (Math.min(foreground, background) + 0.05);

  assert.ok(ratio >= 4.5, `Tertiary text contrast is ${ratio.toFixed(2)}:1`);
});

test("homepage keeps a compact research-writing section", () => {
  assert.match(portfolio, /Research \+ Writing/);
  assert.doesNotMatch(hero, /EcoFresh|Co-founder/i);
  assert.match(writing, /Notes from the work/i);
  assert.match(
    writing,
    /Research questions usually arrive after something breaks/i,
  );
  assert.doesNotMatch(writing, /researchAreas/);
});

test("article reading stays server-rendered and avoids heavy card effects", () => {
  assert.doesNotMatch(blogPost, /^"use client"/);
  assert.match(blogPost, /from "next\/link"/);
  assert.doesNotMatch(
    writing,
    /gsap|ScrollTrigger|TransitionLink|"use client"/,
  );
  assert.doesNotMatch(writingStyles, /backdrop-filter|rotateY|perspective/);
});

test("about keeps the lived personal story on the homepage", () => {
  for (const detail of [
    "Pokédex",
    "jailbreaking",
    "HackByte",
    "Atlan",
    "Japan",
  ]) {
    assert.match(portfolio, new RegExp(detail, "i"));
  }
});

test("homepage removes consumption spectacle and unsupported quantum framing", () => {
  assert.doesNotMatch(
    homepageSources,
    /Token Burner|AI runs in my veins|Quantum \+ AI|Wispr/,
  );
});

test("evidence vocabulary is explicit", () => {
  for (const status of [
    "observed",
    "built",
    "demonstrated",
    "derived",
    "hypothesis",
    "direction",
    "historical",
  ]) {
    assert.match(portfolio, new RegExp(`\\b${status}\\b`, "i"));
  }
});

test("public editorial content has explicit publication boundaries", () => {
  for (const typeName of [
    "PublicationState",
    "PublicArtifact",
    "ResearchCluster",
    "CompassPrinciple",
    "PersonalInfluence",
    "AboutPageData",
  ]) {
    assert.match(portfolio, new RegExp(`(?:type|interface) ${typeName}`));
  }
  assert.match(portfolio, /getPublicArtifacts/);
  assert.match(portfolio, /artifact\.publicationState === "public"/);
  assert.doesNotMatch(
    portfolio,
    /\/Users\/shivanshfulper\/Developer\/Pin4sf\/waldo-brain/,
  );
  assert.doesNotMatch(portfolio, /06-Applications-and-Outreach/);
});

test("personal depth is supported by confirmed content rather than labels", () => {
  assert.match(portfolio, /The kid who wanted a Pokédex/i);
  assert.match(portfolio, /Keep meaningful authority with the person/i);
  assert.match(portfolio, /Let design make complexity quieter/i);
  assert.doesNotMatch(portfolio, /Polymath in Action/i);
});

test("all local writing references resolve to MDX files", () => {
  const sources = [
    portfolio,
    ...fs
      .readdirSync(path.join(root, "src/app/components/sections"))
      .filter((name) => name.endsWith(".tsx"))
      .map((name) => read(`src/app/components/sections/${name}`)),
  ].join("\n");
  const slugs = [...sources.matchAll(/\/writing\/([a-z0-9-]+)/g)].map(
    (match) => match[1],
  );
  for (const slug of new Set(slugs)) {
    assert.ok(
      fs.existsSync(path.join(root, `src/content/writing/${slug}.mdx`)),
      `Missing MDX file for /writing/${slug}`,
    );
  }
  assert.doesNotMatch(sources, /my-stack-2026/);
});

test("three research essays exist with required metadata", () => {
  const slugs = [
    "agent-done-outcome-truth",
    "memory-is-not-storage",
    "harness-is-part-of-the-agent",
  ];
  for (const slug of slugs) {
    const file = path.join(root, `src/content/writing/${slug}.mdx`);
    assert.ok(fs.existsSync(file), `Missing essay ${slug}`);
    const { data, content } = matter(fs.readFileSync(file, "utf8"));
    for (const field of [
      "title",
      "date",
      "revised",
      "category",
      "description",
      "featured",
      "evidenceStatus",
    ]) {
      assert.ok(data[field] !== undefined, `${slug} missing ${field}`);
    }
    assert.equal(data.category, "research");
    const wordCount = content.trim().split(/\s+/).length;
    assert.ok(
      wordCount >= 800 && wordCount <= 1500,
      `${slug} should stay on a concise 800–1500 word path; found ${wordCount}`,
    );
  }
});

test("flagship research essays open from bounded lived events", () => {
  const first120Words = (slug) => {
    const file = path.join(root, `src/content/writing/${slug}.mdx`);
    const { content } = matter(fs.readFileSync(file, "utf8"));
    return content.trim().split(/\s+/).slice(0, 120).join(" ");
  };

  const outcomeOpening = first120Words("agent-done-outcome-truth");
  assert.match(outcomeOpening, /production agent/i);
  assert.match(outcomeOpening, /intended destination/i);
  assert.match(outcomeOpening, /original job/i);

  const memoryOpening = first120Words("memory-is-not-storage");
  assert.match(memoryOpening, /remembered fact/i);
  assert.match(memoryOpening, /world .* changed/i);
  assert.match(memoryOpening, /recall worked.*current truth did not/i);

  const harnessOpening = first120Words("harness-is-part-of-the-agent");
  assert.match(harnessOpening, /more than 40 public agent harnesses/i);
  assert.match(harnessOpening, /dominant architecture/i);
  assert.match(harnessOpening, /recurring control surfaces/i);
  assert.match(harnessOpening, /different tradeoffs/i);
});

test("flagship research essay revisions match the published opening update", () => {
  for (const slug of [
    "agent-done-outcome-truth",
    "memory-is-not-storage",
    "harness-is-part-of-the-agent",
  ]) {
    const file = path.join(root, `src/content/writing/${slug}.mdx`);
    const { data } = matter(fs.readFileSync(file, "utf8"));
    assert.equal(data.revised, "2026-08-19", `${slug} has a stale revision`);
  }
});

test("harness essay leaves its governing thesis open", () => {
  const file = path.join(
    root,
    "src/content/writing/harness-is-part-of-the-agent.mdx",
  );
  const { content } = matter(fs.readFileSync(file, "utf8"));
  assert.match(
    content.trim(),
    /A model provides capability\.[^\n]*\?$/,
    "harness essay should end by reopening how capability meets the world",
  );
});

test("Waldo thesis contains the self-falsifier", () => {
  assert.match(portfolio, /Machine execution is scaling/i);
  assert.match(
    portfolio,
    /sessions or raw artifacts opened per accepted outcome/i,
  );
  assert.match(portfolio, /interruptions per accepted outcome/i);
});

test("Waldo pins current system truth to its actual public data", () => {
  assert.match(
    waldoCaseStudySource,
    /Kennel, a durable harness, and Waldo mobile are working internal foundations\. Their integration, external product behavior, and market validation remain open work\./,
  );
  assert.match(waldoCaseStudySource, /slug: "waldo"[\s\S]*?role: "Founder"/);
  assert.match(
    waldoCaseStudySource,
    /name: "Shivansh Fulper",\s*role: "Founder · AI systems & engineering"/,
  );
  assert.match(
    waldoCaseStudySource,
    /name: "Suyash Pingale",\s*role: "Founder · Product, experience & brand"/,
  );
  assert.doesNotMatch(waldoCaseStudySource, /Founder & CEO|Co-Founder/);
  assert.doesNotMatch(
    waldoCaseStudySource,
    /waldo-pitchdeck\.pdf|Open the pitch deck/,
  );
  assert.doesNotMatch(
    waldoCaseStudySource,
    /AI agent that reads your body and runs your day/i,
  );

  assert.match(waldoCaseStudySource, /founder-video\.mp4/);
  assert.match(waldoCaseStudySource, /waldo-technical-brief\.pages\.dev\//);
  assert.match(waldoCaseStudySource, /https:\/\/www\.heywaldo\.in\//);
});

test("Waldo renders one section-boundary status path and no card status path", () => {
  assert.equal(
    [...caseStudyComponent.matchAll(/styles\.sectionStatus/g)].length,
    1,
  );
  assert.match(caseStudyComponent, /section\.status/);
  assert.doesNotMatch(
    caseStudyComponent,
    /card\.status|narrative\.status|styles\.(?:cardStatus|evidenceStatus)/,
  );
  assert.deepEqual(
    [...waldoCaseStudySource.matchAll(/^\s+status: "([^"]+)",/gm)].map(
      (match) => match[1],
    ),
    ["built"],
  );
});

test("Waldo cards avoid evidence-status labels", () => {
  assert.doesNotMatch(waldoCaseStudySource, /label: "(?:Observed|Derived)"/);
});

test("Waldo keeps rigor jargon exceptional in ordinary prose", () => {
  const repeatedRigorTerms =
    waldoCaseStudySource.match(
      /\b(?:evidence|bounded|verification|verified|verify)\b/gi,
    ) ?? [];
  assert.ok(
    repeatedRigorTerms.length <= 3,
    `Waldo repeats rigor jargon ${repeatedRigorTerms.length} times`,
  );
});

test("machine-readable surfaces share the canonical identity", () => {
  for (const relativePath of [
    "src/app/layout.tsx",
    "public/agents.txt",
    "public/llms-full.txt",
  ]) {
    const source = read(relativePath);
    assert.match(source, /Founder/i, `${relativePath} missing Founder`);
    assert.match(
      source,
      /AI systems researcher/i,
      `${relativePath} missing AI systems researcher`,
    );
  }
});
