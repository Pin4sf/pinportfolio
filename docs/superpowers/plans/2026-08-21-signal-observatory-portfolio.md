# Signal Observatory Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved Signal Observatory redesign as a server-readable personal portfolio with one bounded homepage signal field, a connected Models → Agents → World path, and a canonical annotated Reading record.

**Architecture:** Keep structured public metadata in `src/data/portfolio.ts` and long-form authored work in MDX. Render all editorial content and all homepage sections except the interactive hero/header directly from server components; isolate the one optional Three.js canvas inside the hero and gate it behind deterministic capability policy. Share a quiet editorial frame, footer, and publication filters across canonical routes so draft, historical, excluded, and private material cannot leak into previews, metadata, sitemaps, or machine-readable surfaces.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript 5, SCSS modules, MDX via `next-mdx-remote`, Node's built-in test runner, Three.js for one optional homepage canvas.

**Spec:** `docs/superpowers/specs/2026-08-21-signal-observatory-portfolio-design.md`

## Global Constraints

- Work only in `/Users/shivanshfulper/.codex/worktrees/d4b8/pinportfolio` from commit `42b334b`; keep every commit local and do not push, deploy, open a PR, or modify `/Users/shivanshfulper/Developer/pinportfolio`.
- The binding identity is `Founder + AI systems researcher`; the exact hero line is `I’m building the agent that stays on your side.` and the compact venture heading is exactly `Waldo`.
- Primary navigation remains exactly `Venture · Research + Writing · Experience · About · Contact`; Reading is discoverable from Home, Research + Writing, About, and the editorial footer but is not a primary-nav item.
- Homepage order is Hero → Waldo → connected research direction → selected writing → Reading preview → selected experience → personal compass → contact.
- Research direction uses eyebrow `Research direction`, heading `From capability to consequence.`, path `MODELS — capability → AGENTS — agency → WORLD — consequence`, one short question and one evidence line per waypoint, and one CTA only: `Explore the research`.
- `/reading` is an annotated intellectual record. Publish only confirmed public entries with a personal annotation; omit unconfirmed books, papers, films, anime, and blank placeholders. Do not publish _The Power of Your Subconscious Mind_, _Atomic Habits_, or _Moneyball_ without a real personal annotation.
- Authored work supports `Essay`, `Research Note`, `Field Note`, `Explainer`, `Book / Chapter`, and `Course / Lesson`, but only complete public content appears in archives, previews, metadata, static params, or sitemap output.
- Preserve observed/built/demonstrated/derived/hypothesis/direction/historical distinctions where consequential. Do not publish private Waldo Brain paths, applications, outreach, messages, transcripts, health data, internal discussions, product-market-fit claims, revenue, retention, or unverified validation.
- Do not restore EcoFresh, OneSync, Quantum + AI, unreviewed pitch-deck claims, or historical health-first framing to primary surfaces.
- Use black and warm cream with existing green as the controlled live-state accent; use serif for voice and mono for evidence; use native scroll, stable gutters, static grain/reading veils, visible focus, and a small opacity/clip/signal-lock motion vocabulary.
- No page-wide Lenis dependency, long pinned sections, decorative scanlines/RGB glitches, giant repeated headings, equal card walls, custom cursor, footer canvas, or always-on WebGL.
- At most one canvas may mount, only within the capable desktop homepage hero. Mobile, reduced motion, reduced data, pending/low GPU, and WebGL failure must receive complete copy plus a static fallback.
- Research, Reading, Writing, article, Experience, About, and Waldo routes remain server-rendered and must not load homepage Three.js, GPU-tier, custom-cursor, smooth-scroll, or transition-heavy modules.
- All reusable content stays in the typed data/MDX system. Presentation components may contain layout markup and generic labels, not new portfolio prose or evidence claims.
- Preserve direct route loading, invalid-slug not-found behavior, the skip link, semantic landmarks, heading order, keyboard focus, touch parity, external-link affordances, responsive images, and reduced-motion completeness.
- Follow strict RED → GREEN → REFACTOR. Each production behavior starts with a focused failing test, the failure is captured for the expected reason, the minimum implementation is added, the focused test is rerun green, then the task is committed.
- Do not run dev and build concurrently against `.next`. Final verification must run `npm test`, `npx tsc --noEmit`, changed-file Prettier checks, `npm run build`, and `git diff --check`; the inherited duplicate `@next/next` ESLint plugin conflict is documented rather than casually reconfigured. The baseline `.prettierrc` also names undeclared `prettier-plugin-tailwindcss`, so changed files are checked with `prettier --no-config` unless a later task deliberately adds that exact missing formatter dependency.

## File Structure and Ownership

| File or group                                                                                                                             | Responsibility                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `src/data/portfolio.ts`                                                                                                                   | Typed public reading records, homepage research waypoints, preview selectors, route/footer copy, and publication-state boundaries. |
| `src/lib/mdx.ts` + `src/content/writing/*.mdx`                                                                                            | Authored-work format/publication metadata and public-only selectors.                                                               |
| `src/app/reading/page.tsx` + `ReadingPage.module.scss`                                                                                    | Canonical, server-rendered annotated Reading record.                                                                               |
| `src/app/components/editorial/EditorialFooter.tsx` + module                                                                               | Shared secondary navigation, including Reading, without changing primary navigation.                                               |
| `src/app/page.tsx` + homepage section components                                                                                          | Server-rendered homepage sequence and typed previews.                                                                              |
| `src/app/components/sections/Hero.tsx` + `three/HeroBackground.tsx` + `src/lib/heroEffects.ts`                                            | One optional signal-field canvas with deterministic fallback policy.                                                               |
| `src/app/layout.tsx`, `Header.tsx`, `ViewportFrame.tsx`, `globals.scss`                                                                   | Native-scroll shell, stable frame, native cursor, and removal of transition-heavy global machinery.                                |
| Editorial route SCSS modules                                                                                                              | Shared quiet reading veil, restrained type scale, and consistent responsive gutters.                                               |
| `src/app/sitemap.ts`, `public/agents.txt`, `public/llms-full.txt`                                                                         | Canonical route/publication truth including Reading, with private and excluded material absent.                                    |
| `tests/portfolio-structure.test.mjs`, `tests/editorial-routes.test.mjs`, `tests/hero-effects.test.mjs`, `tests/publication-data.test.mjs` | Structural, publication, capability, accessibility, and bundle-isolation acceptance.                                               |

---

### Task 1: Establish typed Reading and authored-work publication contracts

**Files:**

- Create: `tests/publication-data.test.mjs`
- Modify: `src/data/portfolio.ts`
- Modify: `src/lib/mdx.ts`
- Modify: `src/content/writing/agent-done-outcome-truth.mdx`
- Modify: `src/content/writing/memory-is-not-storage.mdx`
- Modify: `src/content/writing/harness-is-part-of-the-agent.mdx`
- Modify: `src/content/writing/mirai-setu-japan.mdx`
- Modify: `src/content/writing/building-onesync.mdx`
- Modify: `src/content/writing/my-stack-2026.mdx`
- Modify: `src/content/writing/onesync-agent-os.mdx`
- Modify: `src/content/writing/startup-lessons.mdx`

**Interfaces:**

- Produces: `ReadingKind`, `ReadingEntry`, `ReadingPageData`, `readingEntries`, `readingPageData`, `getPublicReadingEntries(limit?: number): ReadingEntry[]`.
- Produces: `PostFormat`, `PostPublicationState`, and public-only `getAllPosts(): PostMeta[]` / `getFeaturedPosts(limit?: number): PostMeta[]`.
- Preserves: `PostCategory` for current archive grouping while adding the forward-compatible format label.
- Consumed by: Tasks 2, 3, and 6.

- [ ] **Step 1: Write focused publication-contract tests**

Create `tests/publication-data.test.mjs` with real module behavior for MDX and source-boundary assertions for the TypeScript-only data module:

```js
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
```

Production changes that make these fail: deleting public filtering, reintroducing an empty reading placeholder, or allowing a draft/historical MDX file into the public selectors.

- [ ] **Step 2: Run RED and record the expected failure**

Run:

```bash
node --test tests/publication-data.test.mjs
```

Expected: FAIL because `PostMeta` has no `publicationState`/`format`, the MDX files lack those fields, and the Reading contracts do not exist.

- [ ] **Step 3: Add the exact typed contracts and confirmed records**

Add these interfaces in `src/data/portfolio.ts`:

```ts
export type ReadingKind =
  | "book"
  | "paper"
  | "essay"
  | "blog"
  | "film"
  | "anime"
  | "design"
  | "place";

export interface ReadingEntry {
  slug: string;
  title: string;
  creator: string;
  kind: ReadingKind;
  annotation: string;
  lastingQuestion: string;
  connection?: string;
  externalUrl?: string;
  date?: string;
  publicationState: PublicationState;
  image?: string;
  imageAlt?: string;
}

export interface ReadingPageData {
  eyebrow: "Reading";
  title: string;
  introduction: string;
  metadata: { description: string; openGraphDescription: string };
}
```

Seed only three already-public, first-person records whose annotations already exist in `personalInfluences`: MIRAI-Setu as `place`, design engineering as `design`, and HackByte as a deliberately ordered `design` record about making technical depth inviting. Do not create book/paper/film/anime entries. Use complete creator/source labels (`MIRAI-Setu`, `Shivansh Fulper`, `HackByte community`) and keep the existing public URLs where present.

Add:

```ts
export function getPublicReadingEntries(limit?: number): ReadingEntry[] {
  const entries = readingEntries.filter(
    (entry) =>
      entry.publicationState === "public" &&
      entry.title.trim().length > 0 &&
      entry.annotation.trim().length > 0,
  );
  return limit === undefined ? entries : entries.slice(0, limit);
}
```

Remove the three blank `unconfirmed-*` records from `personalInfluences`; do not replace them with placeholders.

- [ ] **Step 4: Add forward-compatible authored-work metadata with public filtering**

In `src/lib/mdx.ts`, define:

```ts
export type PostFormat =
  | "essay"
  | "research-note"
  | "field-note"
  | "explainer"
  | "book-chapter"
  | "course-lesson";
export type PostPublicationState =
  | "public"
  | "draft"
  | "historical"
  | "excluded";
```

Add `format: PostFormat` and `publicationState: PostPublicationState` to `PostMeta`. Parse with explicit allow-list validation, then filter to `publicationState === "public"` before sorting in `getAllPosts`. `getPostBySlug` must return `null` for a non-public record so static params, metadata, and direct route loading share the same publication boundary.

Use this mapping in MDX frontmatter:

```yaml
# flagship research essays
format: "research-note"
publicationState: "public"

# MIRAI-Setu
format: "field-note"
publicationState: "public"

# OneSync, old stack, and startup snapshots
format: "essay"
publicationState: "historical"
```

Do not change essay bodies or promote historical work.

- [ ] **Step 5: Run GREEN, full regression, type-check, and commit**

Run:

```bash
node --test tests/publication-data.test.mjs
npm test
npx tsc --noEmit
git diff --check
```

Expected: focused tests pass, the full suite passes, TypeScript exits 0, and diff check is clean.

```bash
git add tests/publication-data.test.mjs src/data/portfolio.ts src/lib/mdx.ts src/content/writing
git commit -m "feat: add public reading and publication contracts"
```

---

### Task 2: Build the canonical Reading route and secondary discovery paths

**Files:**

- Create: `src/app/reading/page.tsx`
- Create: `src/app/reading/ReadingPage.module.scss`
- Create: `src/app/components/editorial/EditorialFooter.tsx`
- Create: `src/app/components/editorial/EditorialFooter.module.scss`
- Modify: `src/app/research/page.tsx`
- Modify: `src/app/writing/page.tsx`
- Modify: `src/app/writing/[slug]/BlogPost.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/experience/page.tsx`
- Modify: `src/app/work/[slug]/CaseStudy.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `tests/editorial-routes.test.mjs`

**Interfaces:**

- Consumes: `readingPageData`, `getPublicReadingEntries()`, `contactData`, and `navItems` from Task 1.
- Produces: server component `EditorialFooter()` and canonical route `/reading`.
- Preserves: primary navigation exactly; Reading appears only as a contextual/secondary link.
- Consumed by: Task 3 homepage footer integration and Task 6 machine-readable reconciliation.

- [ ] **Step 1: Write failing route, accessibility, and discovery tests**

Append to `tests/editorial-routes.test.mjs`:

```js
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
```

Production changes that make these fail: adding Reading to primary nav, turning Reading into a client grid, omitting a required discovery surface, or dropping the shared footer from an editorial route.

- [ ] **Step 2: Run RED**

Run:

```bash
node --test tests/editorial-routes.test.mjs
```

Expected: FAIL because `/reading` and `EditorialFooter` do not exist.

- [ ] **Step 3: Implement the server-rendered Reading record**

Create metadata with `alternates.canonical = "/reading"` and Open Graph URL `${siteConfig.url}/reading`. Use `EditorialHeader`, then render:

```tsx
<main id="main-content" className={styles.page}>
  <p className={styles.kicker}>Annotated record</p>
  <ol className={styles.entries}>
    {entries.map((entry, index) => (
      <li key={entry.slug}>
        <article className={styles.entry}>
          <div className={styles.meta}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{entry.kind}</span>
            {entry.date && <time dateTime={entry.date}>{entry.date}</time>}
          </div>
          <div>
            <p className={styles.creator}>{entry.creator}</p>
            <h2>{entry.title}</h2>
            <p className={styles.annotation}>{entry.annotation}</p>
            <p className={styles.question}>{entry.lastingQuestion}</p>
            {entry.connection && (
              <p className={styles.connection}>{entry.connection}</p>
            )}
            {entry.externalUrl && (
              <a
                href={entry.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source <span aria-hidden="true">↗</span>
                <span className="sr-only">Opens in a new tab</span>
              </a>
            )}
          </div>
        </article>
      </li>
    ))}
  </ol>
</main>
```

Style as a single ordered editorial list, not a cover/card grid: `max-width: 72rem`, warm-cream reading text, mono metadata, serif annotations, border separators, no client disclosure, and a one-column mobile layout at 700px.

- [ ] **Step 4: Implement the shared editorial footer and contextual links**

`EditorialFooter` is a server component using ordinary `Link`/`a` elements. It must contain a secondary `Reading` link, email, public profiles, copyright, and no canvas, clock, marquee, GSAP, transition wrapper, or custom cursor.

Add a concise `Read what shapes the work →` link to `/reading` on Research, Writing, and About. Place `<EditorialFooter />` after the main content on every canonical editorial route listed by the test. Do not add `/reading` to `navItems`.

Add `/reading` to the static pages in `src/app/sitemap.ts` with monthly change frequency and `0.7` priority.

- [ ] **Step 5: Run GREEN, regression, type-check, and commit**

Run:

```bash
node --test tests/editorial-routes.test.mjs
npm test
npx tsc --noEmit
git diff --check
```

Expected: all commands exit 0.

```bash
git add src/app/reading src/app/components/editorial src/app/research/page.tsx src/app/writing src/app/about/page.tsx src/app/experience/page.tsx 'src/app/work/[slug]/CaseStudy.tsx' src/app/sitemap.ts tests/editorial-routes.test.mjs
git commit -m "feat: add canonical annotated reading record"
```

---

### Task 3: Rebuild the homepage as the approved server-readable editorial sequence

**Files:**

- Create: `src/app/components/sections/ReadingPreview.tsx`
- Create: `src/app/components/sections/ReadingPreview.module.scss`
- Modify: `src/data/portfolio.ts`
- Modify: `src/app/page.tsx`
- Modify: `src/app/components/sections/Now.tsx`
- Modify: `src/app/components/sections/Now.module.scss`
- Modify: `src/app/components/sections/CuriosityThread.tsx`
- Modify: `src/app/components/sections/CuriosityThread.module.scss`
- Modify: `src/app/components/sections/Writing.tsx`
- Modify: `src/app/components/sections/Writing.module.scss`
- Modify: `src/app/components/sections/SelectedChapters.tsx`
- Modify: `src/app/components/sections/SelectedChapters.module.scss`
- Modify: `src/app/components/sections/PersonalPreview.tsx`
- Modify: `src/app/components/sections/PersonalPreview.module.scss`
- Modify: `src/app/components/sections/Contact.tsx`
- Modify: `src/app/components/sections/Contact.module.scss`
- Modify: `tests/portfolio-structure.test.mjs`

**Interfaces:**

- Produces in `portfolio.ts`: `ResearchWaypoint`, `researchDirectionData`, `homepageData`, and typed selection slugs/copy for homepage sections.
- Produces: server component `ReadingPreview({ entries }: { entries: ReadingEntry[] })`.
- Preserves: client `Hero` and `Header`, but makes every remaining homepage section a direct server import.
- Consumes: `getFeaturedPosts(3)` and `getPublicReadingEntries(3)`.

- [ ] **Step 1: Replace the homepage-order test with the approved sequence and server-rendering checks**

Update `tests/portfolio-structure.test.mjs`:

```js
test("homepage follows the approved signal-observatory sequence", () => {
  const sequence = [
    "<Hero />",
    "<Now />",
    "<CuriosityThread />",
    "<Writing featuredPosts={featuredPosts} />",
    "<ReadingPreview entries={readingEntries} />",
    "<SelectedChapters />",
    "<PersonalPreview />",
    "<Contact />",
  ];
  for (let index = 1; index < sequence.length; index += 1) {
    assert.ok(
      page.indexOf(sequence[index - 1]) < page.indexOf(sequence[index]),
    );
  }
  assert.doesNotMatch(
    page,
    /<SmoothScroll|dynamic\(\(\) => import\("\.\/components\/sections\/(?:Now|CuriosityThread|Writing|ReadingPreview|SelectedChapters|PersonalPreview|Contact)/,
  );
});

test("connected research direction has one path and one action", () => {
  const source = read("src/app/components/sections/CuriosityThread.tsx");
  assert.match(source, /Research direction/);
  assert.match(source, /From capability to consequence\./);
  assert.match(source, /researchDirectionData\.waypoints\.map/);
  assert.equal((source.match(/href="\/research"/g) ?? []).length, 1);
  assert.doesNotMatch(source, /Follow the thread|<Link[\s\S]*waypoints\.map/);
});

test("homepage writing and reading are editorial lists", () => {
  const writing = read("src/app/components/sections/Writing.tsx");
  const reading = read("src/app/components/sections/ReadingPreview.tsx");
  assert.match(writing, /<ol/);
  assert.match(writing, /post\.format/);
  assert.match(writing, /post\.date/);
  assert.match(reading, /Things I keep returning to\./);
  assert.match(reading, /<ol/);
  assert.doesNotMatch(reading, /rating|cover|coming soon/i);
});

test("homepage Waldo and contact remain compact", () => {
  const now = read("src/app/components/sections/Now.tsx");
  const contact = read("src/app/components/sections/Contact.tsx");
  assert.match(now, /nowSectionData\.title/);
  assert.doesNotMatch(now, /Founder & CEO|market validation has been proven/i);
  assert.doesNotMatch(contact, /<form|formAction|fetch\(|ScrollTrigger|gsap/);
  assert.match(contact, /mailto:/);
});
```

Production changes that make these fail: reordering sections, hiding content behind `ssr:false`, returning to per-waypoint cards/CTAs, losing required writing metadata, or restoring the contact form.

- [ ] **Step 2: Run RED**

Run:

```bash
node --test tests/portfolio-structure.test.mjs
```

Expected: FAIL on missing Reading preview, current dynamic imports/SmoothScroll, three per-waypoint links, and elaborate contact form.

- [ ] **Step 3: Centralize exact homepage content and connected-waypoint data**

Add:

```ts
export interface ResearchWaypoint {
  label: "Models" | "Agents" | "World";
  role: "capability" | "agency" | "consequence";
  question: string;
  evidence: string;
}

export const researchDirectionData = {
  eyebrow: "Research direction",
  title: "From capability to consequence.",
  introduction:
    "I began by asking how models acquire capability. Building agents shifted the question toward memory, judgment, and control. Waldo—and my interest in physical AI—asks what happens when those decisions persist and touch the world.",
  waypoints: [
    {
      label: "Models",
      role: "capability",
      question: "How is capability made?",
      evidence: "Project EKA · Qwen3 MoE",
    },
    {
      label: "Agents",
      role: "agency",
      question: "What happens when capability can act?",
      evidence: "Atlan · Waldo · harness research",
    },
    {
      label: "World",
      role: "consequence",
      question: "What changes when decisions touch physical systems?",
      evidence: "Smart Manufacturing · physical AI direction",
    },
  ] satisfies ResearchWaypoint[],
  cta: { label: "Explore the research", href: "/research" },
} as const;
```

Move the remaining new homepage labels, compact contact invitation, and personal-compass preview copy into `homepageData`. Do not hardcode those claims in components.

- [ ] **Step 4: Render direct server imports in the exact homepage order**

Keep `Header` and `Hero` as normal imports (they may remain client components), import the other sections directly, remove `SmoothScroll`, remove the hidden duplicate `SeoContent` content tree, and pass typed data:

```tsx
export default function Page() {
  const featuredPosts = getFeaturedPosts(3);
  const readingEntries = getPublicReadingEntries(3);
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Now />
        <CuriosityThread />
        <Writing featuredPosts={featuredPosts} />
        <ReadingPreview entries={readingEntries} />
        <SelectedChapters />
        <PersonalPreview />
        <Contact />
      </main>
      <EditorialFooter />
    </>
  );
}
```

The visible initial HTML now becomes the SEO content; do not keep an `aria-hidden` duplicate.

- [ ] **Step 5: Replace the three-card path, card-wall writing, and influence grid**

Render the research waypoints inside one `<ol>` with a single connective line/arrow layer and no link inside each waypoint. Use one CTA after the list. At desktop use a three-column connected path without borders around individual cells; at mobile use a vertical path with the connector on the left.

Render Writing and Reading preview as bordered editorial rows. Writing rows show format label, published/revised date, title, description/opening question, and reading time. Reading preview renders the three confirmed entries with kind/title/annotation and one section-level `/reading` CTA.

Replace PersonalPreview's four-card influence grid with one lived detail, one `compassPrinciples[0]` principle, and one `/about` link. Keep SelectedChapters as a compact chronology and lower its display headings to `clamp(2.4rem, 5vw, 5rem)` maximum.

- [ ] **Step 6: Simplify Waldo and contact to the approved boundaries**

Waldo remains one image, one human description, the existing status boundary, and the three verified links. Keep the heading exactly `Waldo` and avoid a second hero-scale title.

Turn `Contact.tsx` into a server component: no form, clipboard API, toast, GSAP, GPU hook, or state. Render the typed invitation, `mailto:` email, location, and public social links with visible `↗` plus screen-reader text.

- [ ] **Step 7: Run GREEN, regression, type-check, and commit**

Run:

```bash
node --test tests/portfolio-structure.test.mjs
npm test
npx tsc --noEmit
git diff --check
```

Expected: all commands exit 0.

```bash
git add src/data/portfolio.ts src/app/page.tsx src/app/components/sections tests/portfolio-structure.test.mjs
git commit -m "feat: compose the signal observatory homepage"
```

---

### Task 4: Isolate one capable-desktop signal canvas and restore the native shell

**Files:**

- Modify: `src/lib/heroEffects.ts`
- Modify: `src/app/components/sections/Hero.tsx`
- Modify: `src/app/components/sections/Hero.module.scss`
- Modify: `src/app/components/three/HeroBackground.tsx`
- Modify: `src/app/components/layout/Header.tsx`
- Modify: `src/app/components/layout/Header.module.scss`
- Modify: `src/app/components/ui/ViewportFrame.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.scss`
- Modify: `tests/hero-effects.test.mjs`
- Modify: `tests/portfolio-structure.test.mjs`
- Modify: `tests/editorial-routes.test.mjs`

**Interfaces:**

- Changes: `HeroEffectInputs` adds `reducedData: boolean`; `shouldEnableHeroEffects(inputs): boolean` remains the single deterministic policy.
- Changes: `HeroBackground({ onFailure? }: { onFailure?: () => void })` reports WebGL creation/render failure without hiding content.
- Produces: self-contained homepage `Hero` that owns `GpuTierProvider`; editorial routes no longer inherit GPU/transition/custom-cursor providers.
- Preserves: direct navigation and the existing accessible mobile menu state/focus lifecycle.

- [ ] **Step 1: Expand the capability-policy test and active-import isolation tests**

Replace `tests/hero-effects.test.mjs` cases with:

```js
const capable = {
  reducedMotion: false,
  reducedData: false,
  isMobile: false,
  gpuTier: "high",
};

test("hero effects require a capable desktop with motion and data permission", () => {
  assert.equal(shouldEnableHeroEffects(capable), true);
  for (const override of [
    { reducedMotion: true },
    { reducedData: true },
    { isMobile: true },
    { gpuTier: "pending" },
    { gpuTier: "low" },
  ])
    assert.equal(shouldEnableHeroEffects({ ...capable, ...override }), false);
});
```

Add to structural/editorial tests:

```js
test("the active homepage mounts at most one rich canvas", () => {
  const hero = read("src/app/components/sections/Hero.tsx");
  assert.match(hero, /HeroBackground/);
  assert.doesNotMatch(hero, /FluidBackground/);
  assert.equal((hero.match(/<HeroBackground/g) ?? []).length, 1);
});

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
```

Production changes that make these fail: reintroducing a second canvas, enabling effects during reduced-data, mounting global GPU/transition machinery, or restoring custom scrolling/cursor behavior.

- [ ] **Step 2: Run RED**

Run:

```bash
node --test tests/hero-effects.test.mjs tests/portfolio-structure.test.mjs tests/editorial-routes.test.mjs
```

Expected: FAIL because reduced-data is not represented, Hero mounts both canvas layers, and the global shell still owns transition/cursor/GPU machinery.

- [ ] **Step 3: Make the hero policy deterministic and the fallback explicit**

Update the pure policy:

```ts
type HeroEffectInputs = {
  reducedMotion: boolean;
  reducedData: boolean;
  isMobile: boolean;
  gpuTier: GpuTier;
};

export function shouldEnableHeroEffects(input: HeroEffectInputs) {
  return (
    !input.reducedMotion &&
    !input.reducedData &&
    !input.isMobile &&
    (input.gpuTier === "mid" || input.gpuTier === "high")
  );
}
```

In `Hero`, derive reduced-data from `navigator.connection?.saveData === true` inside an effect-safe client hook, defaulting to `true` until resolved so hydration never eagerly starts a canvas. Always render the same hero copy and a CSS signal-poster layer. Mount exactly one `HeroBackground` only when the policy is true and no failure has occurred.

Wrap the hero's GPU consumer in its own `GpuTierProvider` export boundary so the provider exists only when `<Hero />` is present.

- [ ] **Step 4: Convert the canvas into the bounded signal field and handle failure**

Keep one Three.js full-screen plane. Use a capped DPR of `1` for mid tier and `1.25` for high tier, cap the render loop at 30 FPS, pause when the document is hidden or the hero is outside the viewport, and surround renderer creation/render with a failure path:

```ts
try {
  renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
} catch {
  onFailure?.();
  return;
}
```

The fragment shader uses cellular distance/noise, a restrained green live-state trace, black field, and warm-cream lift. It must not include scanlines, RGB channel offsets, ocean/stars, or a second fluid pass. Set the rendered `<canvas aria-hidden="true">` and keep pointer events disabled.

- [ ] **Step 5: Remove global transition/cursor/smooth-scroll ownership**

Render `<ViewportFrame />` directly in `layout.tsx` beside `{children}`; make `ViewportFrame` a static server component with CSS-only short fade. Remove `ClientShell` from the root layout. Leave legacy files unreferenced rather than deleting unrelated history.

Refactor `Header` to use React state/effects only for the mobile dialog, Escape/Tab focus containment, scroll lock, and current-path label. Use ordinary anchors/Next links; remove GSAP/ScrollTrigger animation registration.

Remove from active global CSS: `html.custom-cursor-active`, animated global grain, marquee utilities used only by retired sections, `--sv`, and image skew. Add a static pseudo-element texture with no animation and `pointer-events: none`; maintain reduced-motion as a complete no-timing path.

- [ ] **Step 6: Run GREEN, regression, type-check, and commit**

Run:

```bash
node --test tests/hero-effects.test.mjs tests/portfolio-structure.test.mjs tests/editorial-routes.test.mjs
npm test
npx tsc --noEmit
git diff --check
```

Expected: all commands exit 0.

```bash
git add src/lib/heroEffects.ts src/app/components/sections/Hero.tsx src/app/components/sections/Hero.module.scss src/app/components/three/HeroBackground.tsx src/app/components/layout src/app/components/ui/ViewportFrame.tsx src/app/layout.tsx src/app/globals.scss tests
git commit -m "perf: isolate the homepage signal field"
```

---

### Task 5: Align Research, Writing, About, Experience, and Waldo to the quiet notebook frame

**Files:**

- Modify: `src/app/components/editorial/EditorialHeader.module.scss`
- Modify: `src/app/components/editorial/EditorialPrimaryNav.module.scss`
- Modify: `src/app/components/editorial/ArtifactList.module.scss`
- Modify: `src/app/research/ResearchPage.module.scss`
- Modify: `src/app/writing/WritingArchive.tsx`
- Modify: `src/app/writing/WritingArchive.module.scss`
- Modify: `src/app/writing/[slug]/BlogPost.tsx`
- Modify: `src/app/writing/[slug]/BlogPost.module.scss`
- Modify: `src/app/experience/ExperiencePage.module.scss`
- Modify: `src/app/about/AboutPage.module.scss`
- Modify: `src/app/work/[slug]/CaseStudy.module.scss`
- Modify: `tests/editorial-routes.test.mjs`

**Interfaces:**

- Consumes: `PostMeta.format`, `PostMeta.publicationState`, shared `EditorialHeader`, `EditorialPrimaryNav`, `EditorialFooter`.
- Produces: writing archive format filters derived only from formats that actually have public content.
- Preserves: server rendering for every page except the small client-side Writing filter; article MDX remains server rendered.

- [ ] **Step 1: Write failing quiet-frame, format, and accessibility tests**

Append:

```js
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
```

Production changes that make these fail: reintroducing active texture/scroll theatre, allowing empty archive filters, or falling back to legacy category labels as the authored-work format.

- [ ] **Step 2: Run RED**

Run:

```bash
node --test tests/editorial-routes.test.mjs
```

Expected: FAIL because archive filters use categories, article labels use categories, and current route styles exceed the new quiet-frame contract.

- [ ] **Step 3: Implement shared editorial scale and reading veil**

Use these shared visual constants in the affected SCSS modules:

```scss
--editorial-gutter: clamp(1.5rem, 4vw, 4.75rem);
--reading-measure: 68ch;
--editorial-display: clamp(2.9rem, 7vw, 6.5rem);
```

Editorial headers keep one display statement and then use `clamp(1.8rem, 3vw, 3rem)` section headings. Page backgrounds use static radial/linear gradients and low-opacity `public/noisetexture.jpg` or the global static texture—never a route canvas. Maintain warm cream body copy, green only for live/current states and focus, mono dates/status, border separators, and shared gutters.

At 700px and below: one-column layouts, 44px minimum interactive targets, no horizontal overflow, no text below 0.75rem for controls, and no heading wider than the viewport.

- [ ] **Step 4: Make writing formats extensible without empty UI**

Create:

```ts
const formatLabels: Record<PostFormat, string> = {
  essay: "Essay",
  "research-note": "Research Note",
  "field-note": "Field Note",
  explainer: "Explainer",
  "book-chapter": "Book / Chapter",
  "course-lesson": "Course / Lesson",
};
const availableFormats = Array.from(new Set(posts.map((post) => post.format)));
```

Render filters for `All` plus `availableFormats` only. Keep `aria-pressed`, keyboard buttons, and public posts supplied by the server page. Replace article/category labels with `formatLabels[post.format]` while evidence status remains separate when consequential.

- [ ] **Step 5: Verify route semantics and commit**

Run:

```bash
node --test tests/editorial-routes.test.mjs
npm test
npx tsc --noEmit
git diff --name-only --diff-filter=ACMR 42b334b -- '*.ts' '*.tsx' '*.scss' '*.mjs' '*.mdx' | xargs npx prettier --no-config --check
git diff --check
```

Expected: tests/type-check/format/diff all exit 0.

```bash
git add src/app/components/editorial src/app/research src/app/writing src/app/experience src/app/about 'src/app/work/[slug]' tests/editorial-routes.test.mjs
git commit -m "style: unify the quiet editorial notebook"
```

---

### Task 6: Reconcile machine-readable truth and add final privacy/bundle acceptance

**Files:**

- Modify: `src/app/layout.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `public/agents.txt`
- Modify: `public/llms-full.txt`
- Modify: `tests/portfolio-structure.test.mjs`
- Modify: `tests/editorial-routes.test.mjs`
- Create: `tests/generated-output.test.mjs`

**Interfaces:**

- Consumes: `siteConfig`, `getAllPosts()`, public Reading route, and final active import graph.
- Produces: one canonical public route/identity map and a reusable generated-output privacy scan.
- Preserves: no publication of Reading entry annotations into machine files unless already present in typed public data and intentionally summarized.

- [ ] **Step 1: Write failing machine-route and generated-output tests**

Extend current tests so `/reading` is required in sitemap/agents/llms, then create `tests/generated-output.test.mjs`:

```js
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();

test("generated output excludes private and explicitly excluded material", () => {
  const nextDir = path.join(root, ".next");
  assert.ok(
    fs.existsSync(nextDir),
    "run npm run build before this acceptance test",
  );
  const forbidden = [
    "/Users/shivanshfulper/Developer/Pin4sf/waldo-brain",
    "06-Applications-and-Outreach",
    "Quantum + AI",
    "unconfirmed-book",
  ];
  const stack = [nextDir];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (fs.statSync(full).size < 5_000_000) {
        const source = fs.readFileSync(full).toString("utf8");
        for (const value of forbidden)
          assert.ok(!source.includes(value), `${value} leaked into ${full}`);
      }
    }
  }
});
```

This test deliberately requires a fresh production build and is run only after the build in Step 4. A leak in generated HTML, RSC, metadata, or bundles fails with the exact file path.

- [ ] **Step 2: Run structural RED before changing machine surfaces**

Run:

```bash
node --test tests/portfolio-structure.test.mjs tests/editorial-routes.test.mjs
```

Expected: FAIL because `/reading` is absent from at least one machine-readable route map.

- [ ] **Step 3: Reconcile identity, route map, and publication language**

Keep the canonical short description consistent across `siteConfig`, layout metadata/JSON-LD, `agents.txt`, and `llms-full.txt`:

```text
Shivansh Fulper is the founder of Waldo and an AI systems researcher working on persistent agents, memory and state, long-horizon execution, monitoring, control, and evaluation, with a longer-term interest in physical AI.
```

Add Reading to the public route map as an annotated intellectual record and state that the portfolio remains canonical while external distribution may mirror/cross-post authored work. Do not add Substack URLs without a verified public URL. Keep Waldo's built/internal foundations distinct from external validation.

Ensure sitemap static routes include Home, Waldo, Research, Writing, Reading, Experience, and About exactly once. Writing static params/sitemap entries already come from public-only `getAllPosts()`.

- [ ] **Step 4: Run the complete production gate in the required order**

Confirm no dev server owns `.next`, then run:

```bash
npm test
npx tsc --noEmit
git diff --name-only --diff-filter=ACMR 42b334b -- '*.ts' '*.tsx' '*.scss' '*.mjs' '*.mdx' | xargs npx prettier --no-config --check
npm run build
node --test tests/generated-output.test.mjs
git diff --check
```

Expected: all commands exit 0. If `npm run lint` is attempted and the inherited duplicate `@next/next` plugin configuration conflict remains, record the exact output; do not rewrite ESLint configuration. Prove changed-file formatting, TypeScript, tests, and production build independently.

- [ ] **Step 5: Inspect route bundle isolation after build**

Use `.next` manifests and generated route output to confirm:

```text
/reading, /research, /writing, /writing/[slug], /experience, /about, /work/waldo
```

do not reference `three`, `HeroBackground`, `FluidBackground`, `GpuTierContext`, `CustomCursor`, `SmoothScroll`, `PageTransition`, or `TransitionContext`. Record page-size/client-JS figures from the build table for Home and one article in the task report; compare against the pre-task build if available and explain any increase.

- [ ] **Step 6: Commit machine truth and acceptance coverage**

```bash
git add src/app/layout.tsx src/app/sitemap.ts public/agents.txt public/llms-full.txt tests
git commit -m "test: lock public truth and bundle boundaries"
```

---

## Final Review and Browser Acceptance (controller-owned after Task 6)

The controller must use `superpowers:verification-before-completion`; these checks do not replace any task's RED/GREEN evidence.

1. Dispatch the required whole-branch reviewer against the branch-start merge base and resolve its complete Critical/Important finding set through one fix wave plus one scoped re-review.
2. Stop any development server, run the complete final suite again, and read every exit code:

```bash
npm test
npx tsc --noEmit
git diff --name-only --diff-filter=ACMR 42b334b -- '*.ts' '*.tsx' '*.scss' '*.mjs' '*.mdx' | xargs npx prettier --no-config --check
npm run build
node --test tests/generated-output.test.mjs
git diff --check
```

3. Start `npm run dev -- --hostname 127.0.0.1 --port 3000` only after the production build has finished. Leave this exact worktree's server running.
4. Browser-review at desktop `1440×1000` and mobile `390×844`:
   - `/`
   - `/work/waldo`
   - `/research`
   - `/writing`
   - `/writing/agent-done-outcome-truth`
   - `/reading`
   - `/experience`
   - `/about`
5. On every route verify: HTTP success/direct load, no horizontal overflow, visible keyboard focus, correct primary navigation, Reading discovery where required, image loading/alt text, console errors, heading order, external-link affordances, and readable mobile text.
6. On Home verify exact section order/copy, only one CTA in the research direction, one canvas maximum on capable desktop, no canvas on mobile, and no second/footer canvas.
7. Emulate `prefers-reduced-motion: reduce` and reduced-data/low-tier policy: content remains complete, hero is a still/static signal field, no timing-dependent reveal exists, and the canvas count is zero.
8. Inspect the Network/Sources view for an editorial route and confirm no homepage WebGL, custom-cursor, smooth-scroll, or page-transition chunks load.
9. Re-scan `.next`, public text files, and the final git diff for private absolute paths, application/outreach strings, raw Waldo Brain content, EcoFresh, OneSync on primary surfaces, Quantum + AI, and unconfirmed reading placeholders.
10. Record final commit list, verification output, browser screenshots/notes, accepted lint exception if present, and the localhost process/session in the implementation report. Do not push, deploy, open a PR, or alter the original checkout.
