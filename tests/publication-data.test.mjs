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

test("Systems Around Models is one public authored publication across portfolio surfaces", async () => {
  const {
    getFeaturedAuthoredPublications,
    getPublicAuthoredPublications,
    publicArtifacts,
    researchClusters,
    selectPublicAuthoredPublications,
  } = await import("../src/data/portfolio.ts");

  const publications = getPublicAuthoredPublications();
  assert.equal(publications.length, 1);
  const publication = publications[0];
  assert.equal(publication.slug, "systems-around-models");
  assert.equal(publication.title, "Systems Around Models");
  assert.equal(publication.label, "Fieldbook · Course");
  assert.match(
    publication.summary,
    /^I’ve been writing down what I’m learning/,
  );
  assert.match(publication.summary, /two practical study guides/);
  assert.doesNotMatch(publication.summary, /12 labs|capstone/i);
  assert.equal(
    publication.detail,
    "Two practical guides · 40-chapter working map · 9 architecture profiles",
  );
  assert.equal(publication.cta, "Explore the fieldbook");
  assert.equal(publication.href, "https://systems-around-models.vercel.app/");
  assert.equal(publication.external, true);
  assert.equal(publication.featured, true);
  assert.equal(publication.publicationState, "public");
  assert.equal(publication.evidenceStatus, "demonstrated");

  const draft = {
    ...publication,
    slug: "draft-publication",
    publicationState: "draft",
  };
  const publicNonFeatured = {
    ...publication,
    slug: "public-non-featured",
    featured: false,
  };
  assert.deepEqual(
    selectPublicAuthoredPublications([draft, publicNonFeatured, publication], {
      featured: true,
    }).map(({ slug }) => slug),
    ["systems-around-models"],
  );
  assert.deepEqual(
    getFeaturedAuthoredPublications(1).map(({ slug }) => slug),
    ["systems-around-models"],
  );

  const artifact = publicArtifacts.find(
    ({ slug }) => slug === "systems-around-models",
  );
  assert.ok(artifact, "the fieldbook should be a public research artifact");
  for (const field of [
    "slug",
    "title",
    "href",
    "external",
    "featured",
    "publicationState",
    "evidenceStatus",
  ]) {
    assert.equal(artifact[field], publication[field], `${field} drifted`);
  }

  const agentsCluster = researchClusters.find(({ slug }) => slug === "agents");
  assert.ok(agentsCluster?.artifactSlugs.includes("systems-around-models"));
});
