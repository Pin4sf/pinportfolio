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
const selectedWork = read("src/app/components/sections/SelectedWork.tsx");
const homepageSources = [portfolio, page, hero].join("\n");

test("homepage restores the personal founder introduction", () => {
  assert.match(portfolio, /agent that stays on your side/i);
  assert.match(portfolio, /Waldo \+ Kennel/i);
  assert.doesNotMatch(homepageSources, /Explore the evidence/i);
  assert.doesNotMatch(hero, /heroData\.actions|actionPrimary/i);
});

test("homepage uses the lighter personal flow", () => {
  assert.doesNotMatch(page, /Trajectory|ResearchAgenda|LoadingScreen/);
  assert.doesNotMatch(hero, /delay:\s*1\.8/);
  assert.match(selectedWork, /getVentures/);
  assert.doesNotMatch(
    selectedWork,
    /Evidence status|observableResult|questions\[0\]/,
  );

  const heroIndex = page.indexOf("<Hero />");
  const workIndex = page.indexOf("<SelectedWork />");
  const aboutIndex = page.indexOf("<About />");
  const writingIndex = page.indexOf(
    "<Writing featuredPosts={featuredPosts} />",
  );
  assert.ok(
    heroIndex < workIndex &&
      workIndex < aboutIndex &&
      aboutIndex < writingIndex,
  );
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

test("Waldo thesis contains the self-falsifier", () => {
  assert.match(portfolio, /Machine execution is scaling/i);
  assert.match(
    portfolio,
    /sessions or raw artifacts opened per accepted outcome/i,
  );
  assert.match(portfolio, /interruptions per accepted outcome/i);
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
