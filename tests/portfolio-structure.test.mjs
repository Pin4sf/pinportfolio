import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import matter from "gray-matter";

const root = process.cwd();
const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");

const stripSourceComments = (source) => {
  let result = "";
  let quote = null;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    const nextCharacter = source[index + 1];

    if (quote) {
      result += character;
      if (character === "\\") {
        result += nextCharacter ?? "";
        index += 1;
      } else if (character === quote) {
        quote = null;
      }
      continue;
    }

    if (character === '"' || character === "'" || character === "`") {
      quote = character;
      result += character;
      continue;
    }

    if (character === "/" && nextCharacter === "/") {
      while (index < source.length && source[index] !== "\n") index += 1;
      result += "\n";
      continue;
    }

    if (character === "/" && nextCharacter === "*") {
      index += 2;
      while (
        index < source.length &&
        !(source[index] === "*" && source[index + 1] === "/")
      ) {
        if (source[index] === "\n") result += "\n";
        index += 1;
      }
      index += 1;
      continue;
    }

    result += character;
  }

  return result;
};

const findMarkupPosition = (source, markup) =>
  stripSourceComments(source).indexOf(markup);

const portfolio = read("src/data/portfolio.ts");
const page = read("src/app/page.tsx");
const hero = read("src/app/components/sections/Hero.tsx");
const header = read("src/app/components/layout/Header.tsx");
const reducedMotionHook = read("src/app/hooks/useReducedMotion.ts");
const gpuTierContext = read("src/lib/GpuTierContext.tsx");
const globals = read("src/app/globals.scss");
const writing = read("src/app/components/sections/Writing.tsx");
const writingStyles = read("src/app/components/sections/Writing.module.scss");
const blogPost = read("src/app/writing/[slug]/BlogPost.tsx");
const caseStudyComponent = read("src/app/work/[slug]/CaseStudy.tsx");
const homepageSources = [portfolio, page, hero].join("\n");
const nowSectionSource = portfolio.slice(
  portfolio.indexOf("export const nowSectionData"),
  portfolio.indexOf("export const researchDirectionData"),
);
const researchDirectionSource = portfolio.slice(
  portfolio.indexOf("export const researchDirectionData"),
  portfolio.indexOf("export const homepageData"),
);
const homepageDataSource = portfolio.slice(
  portfolio.indexOf("export const homepageData"),
  portfolio.indexOf("// ==================== ABOUT"),
);
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

test("homepage restores the original portfolio sections while keeping detailed routes", () => {
  assert.match(header, /styles\.progress/);
  assert.match(hero, /nameChars/);
  assert.match(hero, /styles\.particles/);
  for (const component of [
    "<SelectedWork />",
    "<About />",
    "<Timeline />",
    "<SkillsExperience />",
  ]) {
    assert.match(page, new RegExp(component.replaceAll("/", "\\/")));
  }
  assert.doesNotMatch(
    page,
    /<Now \/>|<ReadingPreview|<SelectedChapters \/>|<PersonalPreview \/>/,
  );
  assert.match(page, /<Footer \/>/);
  assert.doesNotMatch(page, /<EditorialFooter \/>/);
});

test("restored homepage work links navigate without transition-only context", () => {
  const selectedWork = read("src/app/components/sections/SelectedWork.tsx");
  assert.match(selectedWork, /import Link from "next\/link"/);
  assert.match(selectedWork, /<Link/);
  assert.doesNotMatch(selectedWork, /TransitionLink|useTransition/);
});

test("homepage markup lookup ignores commented component lookalikes", () => {
  const commentedFixture = [
    "{/* <Hero /> */}",
    "/* <Now /> */",
    "const ignored = true; // <CuriosityThread />",
    "<Contact />",
  ].join("\n");

  for (const commentedComponent of [
    "<Hero />",
    "<Now />",
    "<CuriosityThread />",
  ]) {
    assert.equal(findMarkupPosition(commentedFixture, commentedComponent), -1);
  }
  assert.notEqual(findMarkupPosition(commentedFixture, "<Contact />"), -1);
});

test("homepage follows the original portfolio sequence with one compact research section", () => {
  const sequence = [
    "<Hero />",
    "<SelectedWork />",
    "<CuriosityThread />",
    "<About />",
    "<Writing",
    "<Timeline />",
    "<SkillsExperience />",
    "<Contact />",
  ];
  const positions = sequence.map((component) => {
    const position = findMarkupPosition(page, component);
    assert.notEqual(position, -1, `Homepage missing ${component}`);
    return position;
  });
  for (let index = 1; index < sequence.length; index += 1) {
    assert.ok(
      positions[index - 1] < positions[index],
      `${sequence[index - 1]} should precede ${sequence[index]}`,
    );
  }
  const footerPosition = findMarkupPosition(page, "<Footer />");
  assert.notEqual(footerPosition, -1, "Homepage missing Footer");
  assert.ok(positions.at(-1) < footerPosition, "Footer should follow Contact");
  assert.doesNotMatch(
    page,
    /<SmoothScroll|dynamic\(\(\) => import\("\.\/components\/sections\/(?:Now|CuriosityThread|Writing|ReadingPreview|SelectedChapters|PersonalPreview|Contact)/,
  );
});

test("research direction is one paragraph with one fieldbook action", () => {
  const source = read("src/app/components/sections/CuriosityThread.tsx");
  assert.match(researchDirectionSource, /eyebrow: "A thread of curiosity"/);
  assert.match(researchDirectionSource, /title: "Models → Agents → World\."/);
  for (const binding of ["eyebrow", "title", "homepageIntroduction"]) {
    assert.match(source, new RegExp(`researchDirectionData\\.${binding}`));
  }
  assert.match(
    source,
    /getPublicAuthoredPublication\(\s*researchDirectionData\.publicationSlug,?\s*\)/,
  );
  assert.match(source, /<ExternalLink/);
  assert.equal((source.match(/<p\b/g) ?? []).length, 1);
  assert.match(source, /href=\{fieldbook\.href\}[\s\S]*?\{fieldbook\.cta\}/);
  assert.doesNotMatch(
    source,
    /waypoints\.map|<ol\b|<li\b|Research direction|From capability to consequence\.|Follow the thread/,
  );
});

test("homepage writing keeps the three research essays in an editorial list", async () => {
  const writing = read("src/app/components/sections/Writing.tsx");
  assert.match(homepageDataSource, /title: "Notes from the work\."/);
  assert.match(writing, /<ol/);
  assert.match(writing, /post\.format/);
  assert.match(writing, /post\.date/);
  assert.match(writing, /homepageData\.writing\.title/);
  assert.match(writing, /homepageData\.writing\.introduction/);
  assert.doesNotMatch(
    writing,
    /Notes from the work\.|Research questions usually arrive after something breaks/,
  );

  const { getFeaturedPosts } = await import("../src/lib/mdx.ts");
  assert.deepEqual(
    getFeaturedPosts(3).map(({ slug }) => slug),
    [
      "agent-done-outcome-truth",
      "memory-is-not-storage",
      "harness-is-part-of-the-agent",
    ],
  );
});

test("homepage Waldo and contact remain compact", () => {
  const now = read("src/app/components/sections/Now.tsx");
  const contact = read("src/app/components/sections/Contact.tsx");
  assert.match(
    nowSectionSource,
    /status:\s*"Working internal foundations; external product and market validation remain open\."/,
  );
  assert.match(nowSectionSource, /imageAlt: "Waldo product system"/);
  assert.match(nowSectionSource, /label: "Explore Waldo"/);
  assert.match(nowSectionSource, /label: "Visit Waldo"/);
  assert.match(now, /nowSectionData\.title/);
  assert.match(now, /nowSectionData\.status/);
  assert.match(now, /nowSectionData\.imageAlt/);
  assert.match(now, /nowSectionData\.links\.caseStudy\.label/);
  assert.match(now, /nowSectionData\.links\.product\.label/);
  assert.match(now, /nowSectionData\.links\.product\.href/);
  assert.doesNotMatch(
    now,
    /Founder & CEO|market validation has been proven|Working internal foundations|Explore Waldo|Visit Waldo|Waldo product system/i,
  );
  assert.doesNotMatch(contact, /<form|formAction|fetch\(|ScrollTrigger|gsap/);
  assert.match(contact, /mailto:/);
});

test("the capable desktop hero restores the original liquid-water layer", () => {
  const hero = read("src/app/components/sections/Hero.tsx");
  const fluid = read("src/app/components/three/FluidBackground.tsx");
  assert.match(hero, /HeroBackground/);
  assert.match(hero, /FluidBackground/);
  assert.equal((hero.match(/<HeroBackground/g) ?? []).length, 1);
  assert.equal((hero.match(/<FluidBackground/g) ?? []).length, 1);
  assert.match(
    hero,
    /const \[canvasFailed, setCanvasFailed\] = useState\(false\)/,
  );
  assert.match(hero, /onCanvasReady=\{handleBackgroundCanvasReady\}/);
  assert.match(hero, /backgroundCanvas=\{backgroundCanvas\}/);
  assert.match(hero, /<FluidBackground[\s\S]{0,200}onFailure=/);
  assert.match(hero, /enableHeroEffects && !canvasFailed/);
  assert.match(fluid, /aria-hidden="true"/);
  assert.match(fluid, /role="presentation"/);
  assert.match(fluid, /tabIndex=\{-1\}/);
});

test("the liquid renderer fails closed and avoids full-frame texture allocation", () => {
  const fluid = read("src/app/components/three/FluidBackground.tsx");

  assert.match(fluid, /checkFramebufferStatus/);
  assert.match(fluid, /FRAMEBUFFER_COMPLETE/);
  assert.match(fluid, /texSubImage2D/);
  assert.match(fluid, /getFluidRendererProfile/);
  assert.match(fluid, /1000\s*\/\s*framesPerSecond/);
  assert.match(fluid, /visibility:\s*"hidden"/);
  assert.match(fluid, /canvas\.style\.visibility\s*=\s*"visible"/);
});

test("the public resume is linked from typed contact data", async () => {
  const { contactData } = await import("../src/data/portfolio.ts");
  const contact = read("src/app/components/sections/Contact.tsx");
  const resumePath = path.join(root, "public/shivansh-fulper-resume.pdf");

  assert.equal(contactData.resumeUrl, "/shivansh-fulper-resume.pdf");
  assert.match(contact, /contactData\.resumeUrl/);
  assert.match(contact, />\s*View résumé\s*</);
  assert.ok(fs.existsSync(resumePath), "public resume PDF is missing");
  assert.equal(fs.readFileSync(resumePath).subarray(0, 5).toString(), "%PDF-");
});

test("hero effects honor mobile, reduced-data, reduced-motion, and GPU-tier gates", () => {
  assert.match(hero, /shouldEnableHeroEffects/);
  assert.match(hero, /reducedData/);
  assert.match(hero, /navigator\.connection/);
  assert.match(hero, /saveData === true/);
  assert.match(
    gpuTierContext,
    /GpuTier = "pending" \| "low" \| "mid" \| "high"/,
  );
  assert.match(gpuTierContext, /createContext<GpuTier>\("pending"\)/);
  assert.match(gpuTierContext, /useState<GpuTier>\("pending"\)/);
  assert.match(gpuTierContext, /\.catch\(\(\) => \{[\s\S]*setTier\("low"\)/);
  assert.match(
    reducedMotionHook,
    /useState\(\s*\(\) =>[\s\S]*matchMedia\("\(prefers-reduced-motion: reduce\)"\)/,
  );
});

test("tertiary text meets AA contrast on every dark surface", () => {
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
  for (const backgroundToken of [
    "--bg-primary",
    "--bg-secondary",
    "--bg-tertiary",
  ]) {
    const background = luminance(parseToken(backgroundToken));
    const ratio =
      (Math.max(foreground, background) + 0.05) /
      (Math.min(foreground, background) + 0.05);

    assert.ok(
      ratio >= 4.5,
      `Tertiary text on ${backgroundToken} is ${ratio.toFixed(2)}:1`,
    );
  }
});

test("homepage keeps a compact research-writing section", () => {
  assert.match(portfolio, /Research \+ Writing/);
  assert.doesNotMatch(hero, /EcoFresh|Co-founder/i);
  assert.match(writing, /homepageData\.writing\.title/);
  assert.match(writing, /homepageData\.writing\.introduction/);
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

test("Waldo publishes LangChain's ownership thesis as an external signal, not validation", async () => {
  const { getPublicCaseStudies } = await import("../src/data/portfolio.ts");
  const waldo = getPublicCaseStudies().find(({ slug }) => slug === "waldo");
  assert.ok(waldo?.narrative, "Waldo should expose its public source list");

  const source = waldo.narrative.artifacts.find(
    ({ href }) =>
      href === "https://www.langchain.com/blog/own-your-intelligence",
  );
  assert.ok(source, "LangChain's ownership signal is missing from Waldo");
  assert.equal(source.eyebrow, "External signal · LangChain");
  assert.match(source.description, /model, harness, context, and memory/i);
  assert.match(source.description, /companies/i);
  assert.match(source.description, /Waldo asks the personal question/i);
  assert.doesNotMatch(
    `${source.title} ${source.description}`,
    /endors(?:e|ed|ement)|validat(?:e|ed|ion)|traction|product-market fit|proves?/i,
  );
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
  const canonicalIdentity =
    "Shivansh Fulper is the founder of Waldo and an AI systems researcher working on persistent agents, memory and state, long-horizon execution, monitoring, control, and evaluation, with a longer-term interest in physical AI.";
  const portfolio = read("src/data/portfolio.ts");
  const layout = read("src/app/layout.tsx");

  assert.ok(
    portfolio.includes(`description:\n    "${canonicalIdentity}"`),
    "siteConfig.description must own the exact canonical identity",
  );
  assert.match(
    layout,
    /export const metadata:[\s\S]*?description: siteConfig\.description/,
  );
  assert.equal(
    [...layout.matchAll(/description: siteConfig\.description/g)].length,
    5,
    "metadata, social cards, and both JSON-LD identities must consume siteConfig.description",
  );

  for (const relativePath of ["public/agents.txt", "public/llms-full.txt"]) {
    assert.ok(
      read(relativePath).includes(canonicalIdentity),
      `${relativePath} must publish the exact canonical identity`,
    );
  }
});

test("every public LinkedIn surface uses the canonical profile URL", async () => {
  const canonicalLinkedIn = "https://www.linkedin.com/in/shivanshfulper/";
  const { heroData, contactData } = await import("../src/data/portfolio.ts");
  const layout = read("src/app/layout.tsx");

  for (const [surface, socials] of [
    ["hero", heroData.socials],
    ["contact", contactData.socials],
  ]) {
    const linkedIn = socials.find((social) => social.name === "LinkedIn");
    assert.equal(
      linkedIn?.url,
      canonicalLinkedIn,
      `${surface} publishes a stale LinkedIn profile`,
    );
  }

  assert.ok(
    layout.includes(`"${canonicalLinkedIn}"`),
    "structured person data publishes a stale LinkedIn profile",
  );
  for (const relativePath of [
    "public/agents.txt",
    "public/llms.txt",
    "public/llms-full.txt",
  ]) {
    assert.ok(
      read(relativePath).includes(canonicalLinkedIn),
      `${relativePath} publishes a stale LinkedIn profile`,
    );
  }
});
