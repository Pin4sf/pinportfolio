import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

test("the global shell excludes smooth scroll, custom cursor, and transition machinery", () => {
  const layout = read("src/app/layout.tsx");
  const page = read("src/app/page.tsx");
  const header = read("src/app/components/layout/Header.tsx");
  assert.doesNotMatch(layout, /ClientShell|TransitionProvider|GpuTierProvider/);
  assert.doesNotMatch(page, /SmoothScroll/);
  assert.doesNotMatch(header, /gsap|ScrollTrigger|TransitionLink/);
  assert.doesNotMatch(
    read("src/app/globals.scss"),
    /custom-cursor-active|--sv|skewY\(/,
  );
});

test("case study navigation stays direct without a transition provider", () => {
  const caseStudy = read("src/app/work/[slug]/CaseStudy.tsx");
  assert.doesNotMatch(caseStudy, /TransitionLink|useTransition/);
  assert.match(caseStudy, /<a href="\/" className=\{styles\.back\}>/);
});

test("editorial routes avoid heavy client-only dependencies", () => {
  for (const file of [
    "src/app/about/page.tsx",
    "src/app/research/page.tsx",
    "src/app/experience/page.tsx",
  ]) {
    const source = read(file);
    assert.doesNotMatch(source, /^"use client"/);
    assert.doesNotMatch(
      source,
      /gsap|three|ScrollTrigger|Lenis|TransitionLink/,
    );
  }
});

test("editorial primitives stay server-rendered", () => {
  for (const file of [
    "src/app/components/editorial/EditorialHeader.tsx",
    "src/app/components/editorial/ArtifactList.tsx",
  ]) {
    const source = read(file);
    assert.doesNotMatch(source, /^"use client"/);
    assert.match(source, /next\/link/);
    assert.doesNotMatch(source, /gsap|ScrollTrigger|TransitionLink/);
  }
});

test("every dedicated route reuses the canonical primary navigation", () => {
  const primaryNav = read(
    "src/app/components/editorial/EditorialPrimaryNav.tsx",
  );
  const header = read("src/app/components/editorial/EditorialHeader.tsx");
  const blogPost = read("src/app/writing/[slug]/BlogPost.tsx");
  const caseStudy = read("src/app/work/[slug]/CaseStudy.tsx");
  const portfolio = read("src/data/portfolio.ts");

  assert.match(primaryNav, /import \{ navItems \} from "@\/data\/portfolio"/);
  assert.match(primaryNav, /aria-label="Primary navigation"/);
  assert.match(primaryNav, /navItems\.map\(\(item\) =>/);
  assert.match(primaryNav, /<a href=\{item\.href\}/);
  assert.doesNotMatch(
    primaryNav,
    /^"use client"|useState|useEffect|gsap|next\/link/,
  );

  for (const source of [header, blogPost, caseStudy]) {
    assert.match(source, /EditorialPrimaryNav/);
    assert.match(source, /<EditorialPrimaryNav \/>/);
  }

  assert.match(header, /> Home/);
  assert.match(blogPost, /Back to Writing/);
  assert.match(caseStudy, />\s*Home\s*</);
  assert.match(caseStudy, /aria-label="Case studies"/);

  for (const [label, href] of [
    ["Venture", "/work/waldo"],
    ["Research + Writing", "/research"],
    ["Experience", "/experience"],
    ["About", "/about"],
    ["Contact", "/#contact"],
  ]) {
    assert.match(
      portfolio,
      new RegExp(`label: "${label.replace("+", "\\+")}"`),
    );
    assert.match(portfolio, new RegExp(`href: "${href.replace("/", "\\/")}"`));
  }
});

test("skip link becomes fully visible when focused", () => {
  const globals = read("src/app/globals.scss");
  const focusedRule = globals.match(
    /\.sr-only\s*\{[\s\S]*?&:focus-visible\s*\{([\s\S]*?)\n\s*\}/,
  );

  assert.ok(focusedRule, "Missing .sr-only focus-visible reset");
  for (const declaration of [
    /position:\s*fixed/,
    /width:\s*auto/,
    /height:\s*auto/,
    /margin:\s*0/,
    /overflow:\s*visible/,
    /clip:\s*auto/,
    /white-space:\s*normal/,
    /z-index:\s*\d+/,
  ]) {
    assert.match(focusedRule[1], declaration);
  }
});

test("primary navigation uses canonical routes", () => {
  const header = read("src/app/components/layout/Header.tsx");
  assert.match(header, /usePathname/);
  assert.doesNotMatch(header, /document\.querySelector\(item\.href\)/);
});

test("mobile navigation exposes its disclosure state", () => {
  const header = read("src/app/components/layout/Header.tsx");
  assert.match(header, /aria-expanded=\{menuOpen\}/);
});

test("mobile navigation owns focus and scroll for the full dialog lifecycle", () => {
  const header = read("src/app/components/layout/Header.tsx");
  assert.match(
    header,
    /const menuButtonRef = useRef<HTMLButtonElement>\(null\)/,
  );
  assert.match(
    header,
    /const previousBodyOverflow = document\.body\.style\.overflow/,
  );
  assert.match(header, /document\.body\.style\.overflow = "hidden"/);
  assert.match(
    header,
    /document\.body\.style\.overflow = previousBodyOverflow/,
  );
  assert.match(header, /const menuButton = menuButtonRef\.current/);
  assert.match(header, /menuButton\?\.focus\(\)/);
  assert.match(header, /if \(e\.key === "Escape"\)/);
  assert.match(header, /document\.activeElement === first/);
  assert.match(header, /document\.activeElement === last/);
  assert.match(header, /ref=\{menuButtonRef\}/);
});

test("hash routes bypass the page-transition curtain", () => {
  const coolLink = read("src/app/components/ui/CoolLink.tsx");
  assert.match(coolLink, /href\.startsWith\("\/"\) && !href\.includes\("#"\)/);
});

test("artifact date ranges omit invalid machine-readable dates", () => {
  const artifactList = read("src/app/components/editorial/ArtifactList.tsx");
  assert.doesNotMatch(artifactList, /<time dateTime=\{artifact\.date\}>/);
  assert.match(
    artifactList,
    /const isDateRange = \/\^\\d\{4\}-\\d\{4\}\$\/\.test\(artifact\.date\)/,
  );
  assert.match(
    artifactList,
    /dateTime=\{isDateRange \? undefined : artifact\.date\}/,
  );
});

test("external artifacts and About links expose a visible external affordance", () => {
  const artifactList = read("src/app/components/editorial/ArtifactList.tsx");
  const about = read("src/app/about/page.tsx");

  assert.match(artifactList, /external \? "↗" : "→"/);
  assert.match(artifactList, /Opens in a new tab/);
  assert.match(artifactList, /target="_blank"/);
  assert.match(artifactList, /rel="noopener noreferrer"/);
  assert.match(about, /function ExternalMarker/);
  assert.match(about, /<ExternalMarker \/>/);
  assert.match(about, /Opens in a new tab/);
});

test("about route is candid, server-rendered, and source bounded", () => {
  const source = read("src/app/about/page.tsx");
  assert.doesNotMatch(source, /^"use client"/);
  assert.match(source, /aboutPageData/);
  assert.match(source, /compassPrinciples/);
  assert.match(source, /personalInfluences/);
  assert.doesNotMatch(source, /gsap|ScrollTrigger|TransitionLink/);
});

test("research route exposes questions, artifacts, and uncertainty", () => {
  const source = read("src/app/research/page.tsx");
  assert.doesNotMatch(source, /^"use client"/);
  assert.match(source, /researchClusters/);
  assert.match(source, /getAllPosts/);
  assert.match(source, /cluster\.uncertainty/);
  assert.doesNotMatch(source, /gsap|ScrollTrigger|backdrop-filter/);
});

test("every canonical page exposes the global skip-link target", () => {
  for (const file of [
    "src/app/page.tsx",
    "src/app/about/page.tsx",
    "src/app/research/page.tsx",
    "src/app/experience/page.tsx",
    "src/app/writing/page.tsx",
    "src/app/writing/[slug]/BlogPost.tsx",
    "src/app/work/[slug]/CaseStudy.tsx",
  ]) {
    assert.match(
      read(file),
      /<main(?=[^>]*\bid="main-content")[^>]*>/,
      `${file} is missing #main-content`,
    );
  }
});

test("research restores experience evidence links after the route is available", () => {
  const research = read("src/app/research/page.tsx");
  const portfolio = read("src/data/portfolio.ts");

  assert.doesNotMatch(research, /Task 6 staged guard/);
  assert.doesNotMatch(research, /isAvailableOnResearchRoute/);
  assert.match(research, /\.filter\(isPublicArtifact\);/);
  assert.match(portfolio, /slug: "atlan"[\s\S]*?href: "\/experience"/);
  assert.match(
    portfolio,
    /slug: "smart-manufacturing"[\s\S]*?href: "\/experience"/,
  );
});

test("artifact lists can render subordinate headings on research clusters", () => {
  const artifactList = read("src/app/components/editorial/ArtifactList.tsx");
  const research = read("src/app/research/page.tsx");
  assert.match(artifactList, /headingLevel\?: "h2" \| "h3"/);
  assert.match(artifactList, /headingLevel = "h2"/);
  assert.match(artifactList, /const Heading = headingLevel/);
  assert.match(artifactList, /<Heading>\{artifact\.title\}<\/Heading>/);
  assert.match(research, /headingLevel="h3"/);
});

test("research does not repeat related writing as a supporting artifact", () => {
  const source = read("src/app/research/page.tsx");
  assert.match(source, /const relatedWritingHrefs = new Set/);
  assert.match(
    source,
    /relatedPosts\.map\(\(post\) => `\/writing\/\$\{post\.slug\}`\)/,
  );
  assert.match(source, /!relatedWritingHrefs\.has\(artifact\.href\)/);
  assert.doesNotMatch(source, /artifact\.kind !== "writing"/);
});

test("experience route uses an editorial chronology", () => {
  const source = read("src/app/experience/page.tsx");
  assert.doesNotMatch(source, /^"use client"/);
  assert.match(source, /timelineData/);
  assert.match(source, /entry\.evidence/);
  assert.match(source, /entry\.nextQuestion/);
  assert.doesNotMatch(source, /gsap|ScrollTrigger|IntersectionObserver/);
});

test("sitemap and machine surfaces expose only canonical public routes", () => {
  const sitemap = read("src/app/sitemap.ts");
  for (const route of [
    "/about",
    "/research",
    "/experience",
    "/writing",
    "/work/waldo",
  ]) {
    assert.match(sitemap, new RegExp(route.replace("/", "\\/")));
  }
  for (const file of ["public/agents.txt", "public/llms-full.txt"]) {
    const source = read(file);
    assert.doesNotMatch(
      source,
      /06-Applications-and-Outreach|waldo-brain|\/Users\//,
    );
    assert.doesNotMatch(source, /EcoFresh|OneSync|Quantum \+ AI/);
  }
});

test("writing format filters expose their selected state", () => {
  const source = read("src/app/writing/WritingArchive.tsx");
  assert.match(source, /aria-pressed=\{activeFormat === format\}/);
});

test("editorial routes use static texture and bounded reading measures", () => {
  for (const file of [
    "src/app/research/ResearchPage.module.scss",
    "src/app/writing/[slug]/BlogPost.module.scss",
    "src/app/experience/ExperiencePage.module.scss",
    "src/app/about/AboutPage.module.scss",
    "src/app/work/[slug]/CaseStudy.module.scss",
  ]) {
    const source = read(file);
    assert.doesNotMatch(
      source,
      /animation:\s*grain|backdrop-filter|position:\s*sticky[\s\S]*height:\s*100vh/i,
    );
  }
  assert.match(
    read("src/app/writing/[slug]/BlogPost.module.scss"),
    /max-width:\s*(?:68ch|760px)/,
  );
});

test("writing exposes complete formats without empty categories", () => {
  const archive = read("src/app/writing/WritingArchive.tsx");
  assert.match(archive, /post\.format/);
  assert.match(archive, /availableFormats/);
  assert.doesNotMatch(archive, /No posts in this category yet/);
});

test("article and archive expose format labels from typed metadata", () => {
  assert.match(read("src/app/writing/[slug]/BlogPost.tsx"), /post\.format/);
  assert.match(read("src/app/writing/WritingArchive.tsx"), /formatLabels/);
});

test("reading is canonical, server-rendered, and absent from primary navigation", () => {
  const reading = read("src/app/reading/page.tsx");
  const primaryNav = read("src/data/portfolio.ts").slice(
    read("src/data/portfolio.ts").indexOf("export const navItems"),
    read("src/data/portfolio.ts").indexOf("// ==================== HERO"),
  );
  assert.doesNotMatch(reading, /^"use client"/);
  assert.match(reading, /getPublicReadingEntries/);
  assert.match(reading, /<main(?=[^>]*\bid="main-content")[^>]*>/);
  assert.match(reading, /<ol/);
  assert.doesNotMatch(reading, /rating|stars|coming soon/i);
  assert.doesNotMatch(primaryNav, /Reading|\/reading/);
});

test("reading is linked from research, writing, about, and the editorial footer", () => {
  for (const file of [
    "src/app/research/page.tsx",
    "src/app/writing/page.tsx",
    "src/app/about/page.tsx",
    "src/app/components/editorial/EditorialFooter.tsx",
  ])
    assert.match(read(file), /href="\/reading"/);
});

test("every editorial destination shares the quiet footer", () => {
  for (const file of [
    "src/app/reading/page.tsx",
    "src/app/research/page.tsx",
    "src/app/writing/page.tsx",
    "src/app/writing/[slug]/BlogPost.tsx",
    "src/app/about/page.tsx",
    "src/app/experience/page.tsx",
    "src/app/work/[slug]/CaseStudy.tsx",
  ])
    assert.match(read(file), /EditorialFooter/);
});
