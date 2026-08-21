import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import matter from "gray-matter";
import { getAllPosts, getFeaturedPosts } from "../src/lib/mdx.ts";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const portfolio = read("src/data/portfolio.ts");

test("reading records have typed public publication boundaries", () => {
  for (const symbol of [
    "ReadingKind",
    "ReadingEntry",
    "ReadingPageData",
    "readingEntries",
    "readingPageData",
    "getPublicReadingEntries",
  ])
    assert.match(portfolio, new RegExp(symbol));

  assert.match(portfolio, /entry\.publicationState === "public"/);
  assert.doesNotMatch(
    portfolio,
    /unconfirmed-book|unconfirmed-film|unconfirmed-anime/,
  );
  assert.doesNotMatch(
    portfolio,
    /Power of Your Subconscious Mind|Atomic Habits|Moneyball/,
  );
});

test("public authored-work selectors omit incomplete publication states", () => {
  const posts = getAllPosts();
  assert.ok(posts.length > 0);
  assert.ok(posts.every((post) => post.publicationState === "public"));
  assert.ok(
    posts.every((post) =>
      [
        "essay",
        "research-note",
        "field-note",
        "explainer",
        "book-chapter",
        "course-lesson",
      ].includes(post.format),
    ),
  );
  assert.ok(
    getFeaturedPosts(3).every((post) => post.publicationState === "public"),
  );
  assert.ok(!posts.some((post) => post.slug === "building-onesync"));
});

test("every MDX record declares an explicit publication state and format", () => {
  for (const name of fs.readdirSync(path.join(root, "src/content/writing"))) {
    if (!name.endsWith(".mdx")) continue;
    const { data } = matter(read(`src/content/writing/${name}`));
    assert.ok(data.publicationState, `${name} missing publicationState`);
    assert.ok(data.format, `${name} missing format`);
  }
});
