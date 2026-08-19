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
const writing = read("src/app/components/sections/Writing.tsx");
const writingStyles = read("src/app/components/sections/Writing.module.scss");
const blogPost = read("src/app/writing/[slug]/BlogPost.tsx");
const homepageSources = [portfolio, page, hero].join("\n");

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

test("Waldo remains current, bounded, and free of stale deck promotion", () => {
  assert.match(portfolio, /Founder of Waldo/i);
  assert.match(portfolio, /working internal foundations/i);
  assert.match(portfolio, /external product and market validation remain open/i);
  assert.doesNotMatch(portfolio, /Open the pitch deck/);
  assert.doesNotMatch(
    portfolio,
    /AI agent that reads your body and runs your day/i,
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
