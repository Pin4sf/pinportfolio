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
const homepageSources = [portfolio, page, hero].join("\n");

test("homepage leads with founder researcher identity and trajectory", () => {
  assert.match(portfolio, /Founder \+ AI systems researcher/i);
  assert.match(portfolio, /Models\s*(?:→|->)\s*Agents\s*(?:→|->)\s*World/i);
});

test("homepage removes consumption spectacle and unsupported quantum framing", () => {
  assert.doesNotMatch(homepageSources, /Token Burner|AI runs in my veins|Quantum \+ AI|Wispr/);
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
    const { data } = matter(fs.readFileSync(file, "utf8"));
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

