# Living Notebook Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a shorter cinematic homepage plus fast, link-rich About, Research, Experience, Writing, and Waldo surfaces that express Shivansh's founder, researcher, engineer, worldview, and personal life through public evidence.

**Architecture:** Keep the current hero and global dark visual system, but move long-form content into server-rendered editorial routes. Extend the typed content in `src/data/portfolio.ts`, keep MDX as the writing source, and make presentation components consume public-only helpers so draft, excluded, private, and historical material cannot leak into featured surfaces.

**Tech Stack:** Next.js 14.1.4 App Router, React 18, TypeScript 5, SCSS Modules, GSAP/Three.js only where the visual interaction requires them, `node:test` structural tests, MDX via `next-mdx-remote`.

**Spec:** `docs/superpowers/specs/2026-08-18-cinematic-front-door-living-notebook-portfolio-design.md`

## Global Constraints

- Keep all portfolio copy and public content records in `src/data/portfolio.ts`; MDX article bodies remain in `src/content/writing/`.
- Preserve the current hero copy, oversized serif identity, cellular atmosphere, viewport frame, restrained green accent, and dark theme.
- Use SCSS Modules for every new component and route.
- Homepage page-level client sections remain dynamically imported with `{ ssr: false }`; editorial routes remain server components unless an interaction requires a small client island.
- Do not add a CMS, database, dependency, or environment variable.
- Do not render private Waldo Brain paths, applications, outreach, health data, messages, transcripts, calendars, or personal archives.
- Do not promote the current pitch deck until its team and product-language review is complete.
- EcoFresh, OneSync, health-first positioning, and Quantum + AI do not return to primary surfaces.
- Do not push or deploy without separate explicit approval.
- Stop the development server before `npm run build`; restart it after the build because `next dev` and `next build` share `.next`.

---

## File map

### Content and tests

- Modify `src/data/portfolio.ts` — add public artifact, research cluster, About page, personal influence, and compass types/data/helpers; update route-based navigation.
- Modify `tests/portfolio-structure.test.mjs` — replace old homepage-order assertions with the living-notebook structure and add privacy/publication-state checks.
- Create `tests/editorial-routes.test.mjs` — verify route files, server-rendering boundaries, source ownership, and excluded language.

### Shared editorial presentation

- Create `src/app/components/editorial/EditorialHeader.tsx` — shared server-rendered page intro and home link.
- Create `src/app/components/editorial/EditorialHeader.module.scss` — readable intro layout.
- Create `src/app/components/editorial/ArtifactList.tsx` — semantic public artifact list with internal/external link behavior.
- Create `src/app/components/editorial/ArtifactList.module.scss` — restrained list interaction.
- Modify `src/app/components/layout/Header.tsx` and `Header.module.scss` — route-aware navigation without querying route strings as selectors.

### Homepage

- Create `src/app/components/sections/Now.tsx` and `Now.module.scss` — compact Waldo module.
- Create `src/app/components/sections/CuriosityThread.tsx` and `CuriosityThread.module.scss` — Models, Agents, World visual.
- Create `src/app/components/sections/SelectedChapters.tsx` and `SelectedChapters.module.scss` — five-entry experience preview.
- Create `src/app/components/sections/PersonalPreview.tsx` and `PersonalPreview.module.scss` — bounded personal-life preview.
- Modify `src/app/components/sections/Writing.tsx` and `Writing.module.scss` — three selected essays without duplicating the full research index.
- Modify `src/app/page.tsx` — new shorter section order and updated SEO content.

### Editorial routes

- Create `src/app/about/page.tsx` and `AboutPage.module.scss` — link-rich personal biography and compass.
- Create `src/app/research/page.tsx` and `ResearchPage.module.scss` — four research clusters and related artifacts.
- Create `src/app/experience/page.tsx` and `ExperiencePage.module.scss` — full readable chronology.
- Modify `src/app/writing/WritingArchive.tsx` and `WritingArchive.module.scss` — align archive navigation and editorial shell.

### Waldo, SEO, and verification

- Modify `src/data/portfolio.ts` Waldo narrative — reconcile Founder title, current product truth, and pitch-deck visibility.
- Modify `src/app/work/[slug]/CaseStudy.tsx` and `CaseStudy.module.scss` — show built, demonstrated, hypothesis, and direction boundaries without compliance-like repetition.
- Modify `src/app/sitemap.ts`, `src/app/layout.tsx`, `public/agents.txt`, and `public/llms-full.txt` — include canonical editorial routes and consistent public identity.

---

### Task 1: Add the public editorial content model

**Files:**
- Modify: `src/data/portfolio.ts`
- Modify: `tests/portfolio-structure.test.mjs`

**Interfaces:**
- Produces: `PublicationState`, `ArtifactKind`, `ArtifactTheme`, `PublicArtifact`, `ResearchCluster`, `CompassPrinciple`, `PersonalInfluence`, `AboutPageData`.
- Produces: `publicArtifacts`, `researchClusters`, `compassPrinciples`, `personalInfluences`, `aboutPageData`.
- Produces: `getPublicArtifacts(filter?: PublicArtifactFilter): PublicArtifact[]`.
- Consumes: existing `EvidenceStatus`, `timelineData`, and public writing slugs.

- [ ] **Step 1: Write failing structural tests for the new content contract**

Add these assertions to `tests/portfolio-structure.test.mjs`:

```js
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
  assert.doesNotMatch(portfolio, /\/Users\/shivanshfulper\/Developer\/Pin4sf\/waldo-brain/);
  assert.doesNotMatch(portfolio, /06-Applications-and-Outreach/);
});

test("personal depth is supported by confirmed content rather than labels", () => {
  assert.match(portfolio, /The kid who wanted a Pokédex/i);
  assert.match(portfolio, /Keep meaningful authority with the person/i);
  assert.match(portfolio, /Let design make complexity quieter/i);
  assert.doesNotMatch(portfolio, /Polymath in Action/i);
});
```

- [ ] **Step 2: Run the tests and verify they fail**

Run: `npm test`

Expected: FAIL because the new types, data, and helper do not exist.

- [ ] **Step 3: Add the exact public content types**

Add after `EvidenceStatus` in `src/data/portfolio.ts`:

```ts
export type PublicationState = "public" | "historical" | "draft" | "excluded";
export type ArtifactKind =
  | "venture"
  | "research"
  | "writing"
  | "code"
  | "video"
  | "field-note"
  | "life"
  | "source";
export type ArtifactTheme = "models" | "agents" | "world" | "design" | "life";

export interface PublicArtifact {
  slug: string;
  title: string;
  kind: ArtifactKind;
  theme: ArtifactTheme;
  date: string;
  summary: string;
  href: string;
  external?: boolean;
  featured: boolean;
  publicationState: PublicationState;
  evidenceStatus?: EvidenceStatus;
  image?: string;
  caption?: string;
  annotation?: string;
}

export interface ResearchCluster {
  slug: string;
  title: string;
  question: string;
  position: string;
  uncertainty: string;
  artifactSlugs: string[];
}

export interface CompassPrinciple {
  title: string;
  body: string;
  artifactSlugs: string[];
}

export interface PersonalInfluence {
  slug: string;
  title: string;
  kind: "origin" | "place" | "community" | "book" | "film" | "anime" | "design";
  summary: string;
  href?: string;
  image?: string;
  publicationState: PublicationState;
}

export interface AboutPageData {
  eyebrow: string;
  title: string;
  introduction: string[];
  longerHorizon: string[];
  now: { date: string; body: string };
}

export interface PublicArtifactFilter {
  theme?: ArtifactTheme;
  kind?: ArtifactKind;
  featured?: boolean;
}
```

- [ ] **Step 4: Add public records and helpers**

Add records for Waldo, Atlan, Project EKA, Qwen3 MoE, the three research essays, HackByte, MIRAI-Setu, and Smart Manufacturing. Use only URLs already present in `portfolio.ts` or the evidence inventory. Add confirmed personal influences for the Pokédex origin, systems tinkering, HackByte, MIRAI-Setu, and design engineering. Mark unconfirmed books, films, and anime as `draft` and omit titles rather than guessing them.

Implement the helper exactly as:

```ts
export function getPublicArtifacts(
  filter: PublicArtifactFilter = {},
): PublicArtifact[] {
  return publicArtifacts.filter((artifact) => {
    if (artifact.publicationState !== "public") return false;
    if (filter.theme && artifact.theme !== filter.theme) return false;
    if (filter.kind && artifact.kind !== filter.kind) return false;
    if (filter.featured !== undefined && artifact.featured !== filter.featured) {
      return false;
    }
    return true;
  });
}
```

Use these six compass titles verbatim:

```ts
export const compassPrinciples: CompassPrinciple[] = [
  { title: "Keep meaningful authority with the person.", body: "An agent can prepare, recommend, and act within permission. Remembering more never silently grants it more authority.", artifactSlugs: ["waldo", "memory-is-not-storage"] },
  { title: "Do not confuse a finished run with a completed outcome.", body: "An artifact, evidence, acceptance, and the remaining open loop are different kinds of truth.", artifactSlugs: ["agent-done-outcome-truth"] },
  { title: "Make personal context correctable and user-owned.", body: "Useful memory needs source, time, scope, correction, expiry, revocation, and deletion.", artifactSlugs: ["memory-is-not-storage", "waldo"] },
  { title: "Make powerful systems inspectable.", body: "The more a system can do, the easier it should be to understand what happened and intervene.", artifactSlugs: ["harness-is-part-of-the-agent"] },
  { title: "Let design make complexity quieter.", body: "Good defaults, calm feedback, and deliberate motion should reduce the amount a person has to decode.", artifactSlugs: ["waldo"] },
  { title: "Change the system when reality contradicts the story.", body: "A neat narrative is not evidence. What the system actually did should be allowed to change the product and the belief behind it.", artifactSlugs: ["agent-done-outcome-truth"] },
];
```

- [ ] **Step 5: Update navigation to canonical routes**

Replace `navItems` with:

```ts
export const navItems: NavItem[] = [
  { label: "Venture", href: "/work/waldo" },
  { label: "Research + Writing", href: "/research" },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];
```

- [ ] **Step 6: Run tests and commit**

Run: `npm test && npx tsc --noEmit && git diff --check`

Expected: all tests and type-check pass.

```bash
git add src/data/portfolio.ts tests/portfolio-structure.test.mjs
git commit -m "feat: add public editorial content model"
```

---

### Task 2: Build the shared editorial shell and route-aware header

**Files:**
- Create: `src/app/components/editorial/EditorialHeader.tsx`
- Create: `src/app/components/editorial/EditorialHeader.module.scss`
- Create: `src/app/components/editorial/ArtifactList.tsx`
- Create: `src/app/components/editorial/ArtifactList.module.scss`
- Modify: `src/app/components/layout/Header.tsx`
- Modify: `src/app/components/layout/Header.module.scss`
- Create: `tests/editorial-routes.test.mjs`

**Interfaces:**
- Consumes: `PublicArtifact` and route-based `navItems` from Task 1.
- Produces: `EditorialHeader({ eyebrow, title, introduction })`.
- Produces: `ArtifactList({ artifacts })`.

- [ ] **Step 1: Write failing tests for server-rendered editorial primitives**

Create `tests/editorial-routes.test.mjs`:

```js
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

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

test("primary navigation uses canonical routes", () => {
  const header = read("src/app/components/layout/Header.tsx");
  assert.match(header, /usePathname/);
  assert.doesNotMatch(header, /document\.querySelector\(item\.href\)/);
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/editorial-routes.test.mjs`

Expected: FAIL because the editorial files do not exist.

- [ ] **Step 3: Implement `EditorialHeader`**

Use this interface and structure:

```tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "./EditorialHeader.module.scss";

interface EditorialHeaderProps {
  eyebrow: string;
  title: string;
  introduction: string;
}

export default function EditorialHeader({
  eyebrow,
  title,
  introduction,
}: EditorialHeaderProps) {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.home}>
        <ArrowLeft size={15} aria-hidden="true" /> Home
      </Link>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1>{title}</h1>
      <p className={styles.introduction}>{introduction}</p>
    </header>
  );
}
```

Style it with `max-width: 72rem`, `padding: clamp(7rem, 12vw, 11rem) var(--section-px) 4rem`, a title of `clamp(4rem, 10vw, 9rem)`, and an introduction measure of `62ch`.

- [ ] **Step 4: Implement `ArtifactList`**

Render a semantic `<ol>`. Use `Link` for internal `href` values and `<a target="_blank" rel="noopener noreferrer">` for `external` artifacts. Each row exposes kind, title, summary, date, and an annotation when present. Keep hover changes to border, text color, and a three-pixel arrow translation.

- [ ] **Step 5: Make Header route-aware**

Import `usePathname` from `next/navigation`. Remove the IntersectionObserver scroll-spy. Determine active state with:

```ts
const pathname = usePathname();
const isActive = (href: string) => {
  const target = href.split("#")[0] || "/";
  return target === "/" ? pathname === "/" : pathname.startsWith(target);
};
```

Change the logo to `href="/"` and the contact CTA to `href="/#contact"`. Preserve mobile focus trapping and scroll-hide behavior.

- [ ] **Step 6: Run tests and commit**

Run: `npm test && npx tsc --noEmit && npm run lint && git diff --check`

Expected: tests and static checks pass with only the pre-existing `<img>` lint warnings if they remain.

```bash
git add src/app/components/editorial src/app/components/layout tests/editorial-routes.test.mjs
git commit -m "feat: add editorial shell and route navigation"
```

---

### Task 3: Replace the long homepage with the cinematic overview

**Files:**
- Create: `src/app/components/sections/Now.tsx`
- Create: `src/app/components/sections/Now.module.scss`
- Create: `src/app/components/sections/CuriosityThread.tsx`
- Create: `src/app/components/sections/CuriosityThread.module.scss`
- Create: `src/app/components/sections/SelectedChapters.tsx`
- Create: `src/app/components/sections/SelectedChapters.module.scss`
- Create: `src/app/components/sections/PersonalPreview.tsx`
- Create: `src/app/components/sections/PersonalPreview.module.scss`
- Modify: `src/app/components/sections/Writing.tsx`
- Modify: `src/app/components/sections/Writing.module.scss`
- Modify: `src/app/page.tsx`
- Modify: `tests/portfolio-structure.test.mjs`

**Interfaces:**
- Consumes: `getPublicArtifacts`, `timelineData`, `personalInfluences`, and `getFeaturedPosts(3)`.
- Produces: homepage order `Hero -> Now -> CuriosityThread -> Writing -> SelectedChapters -> PersonalPreview -> Contact`.

- [ ] **Step 1: Replace the old homepage-order test with the new flow**

Use:

```js
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
  assert.doesNotMatch(page, /<About \/>|<Timeline \/>|<SkillsExperience \/>|<SelectedWork \/>/);
});
```

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test`

Expected: FAIL because the new sections are absent.

- [ ] **Step 3: Implement `Now`**

Build a two-column section with:

- eyebrow `Now`;
- title `Waldo is where the questions became a company.`;
- a two-paragraph summary grounded in the `waldo` public artifact;
- one current-state line: `Working internal foundations; external product and market validation remain open.`;
- standard links to `/work/waldo`, `https://www.heywaldo.in/`, and the public founder video;
- one responsive Waldo image from the existing public assets.

Do not import GSAP, `TransitionLink`, or a canvas. Use CSS hover and an optional `prefers-reduced-motion` safe image scale.

- [ ] **Step 4: Implement `CuriosityThread`**

Render three linked cells from data defined in the component:

```ts
const threads = [
  { title: "Models", question: "How is capability made?", detail: "Project EKA · Qwen3 MoE", href: "/research#models" },
  { title: "Agents", question: "What happens when capability can act?", detail: "Atlan · Waldo · Harnesses", href: "/research#agents" },
  { title: "World", question: "What changes when actions have physical consequences?", detail: "Smart Manufacturing · Physical AI", href: "/research#world" },
];
```

Use a horizontal connector on desktop and a vertical connector on mobile. The relationship must remain understandable without animation.

- [ ] **Step 5: Implement `SelectedChapters`**

Select timeline entries whose organizations include `Atlan`, `Soket AI Labs`, `MIRAI-Setu`, `HackByte`, or `IIITDM Jabalpur`. Render year, organization, one concise description, and `nextQuestion`. Add a link to `/experience`.

- [ ] **Step 6: Implement `PersonalPreview`**

Filter `personalInfluences` to `publicationState === "public"`, take four, and render a quiet grid with title, kind, summary, and optional image. Link the section to `/about`. Do not render draft books, films, or anime.

- [ ] **Step 7: Simplify the homepage Writing section**

Remove the four research-area list. Keep one intro sentence and three essay rows/cards. Change the heading to `Notes from the work.` and the intro to `Research questions usually arrive after something breaks, surprises me, or refuses to fit the model I had in my head.` Keep standard `Link` navigation and the no-GSAP/no-3D guarantees.

- [ ] **Step 8: Update `page.tsx` and SEO content**

Remove dynamic imports for `SelectedWork`, `About`, `Timeline`, and `SkillsExperience`. Add dynamic imports for the four new homepage sections. Update `SeoContent` to include public artifacts, the three featured posts, selected timeline chapters, and a link to `/about` without duplicating private status detail.

- [ ] **Step 9: Run tests, inspect height, and commit**

Run:

```bash
npm test
npx tsc --noEmit
npm run lint
curl -sS http://localhost:3000/ > /dev/null
git diff --check
```

Use the browser to record the homepage `document.body.scrollHeight`; target less than 8,000 pixels at a 1280x720 viewport and confirm no section starts with hidden prose.

```bash
git add src/app/page.tsx src/app/components/sections tests/portfolio-structure.test.mjs
git commit -m "feat: build cinematic portfolio overview"
```

---

### Task 4: Build the candid About page

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/app/about/AboutPage.module.scss`
- Modify: `src/data/portfolio.ts`
- Modify: `tests/editorial-routes.test.mjs`

**Interfaces:**
- Consumes: `aboutPageData`, `compassPrinciples`, `personalInfluences`, `getPublicArtifacts`.
- Produces: metadata and a server-rendered `/about` route.

- [ ] **Step 1: Add failing About route tests**

Append:

```js
test("about route is candid, server-rendered, and source bounded", () => {
  const source = read("src/app/about/page.tsx");
  assert.doesNotMatch(source, /^"use client"/);
  assert.match(source, /aboutPageData/);
  assert.match(source, /compassPrinciples/);
  assert.match(source, /personalInfluences/);
  assert.doesNotMatch(source, /gsap|ScrollTrigger|TransitionLink/);
});
```

- [ ] **Step 2: Run the route test and verify failure**

Run: `node --test tests/editorial-routes.test.mjs`

Expected: FAIL because `/about` is absent.

- [ ] **Step 3: Complete `aboutPageData` in `portfolio.ts`**

Use this narrative order:

- `The kid who wanted a Pokédex.` — coding at 12, jailbreaking, and systems curiosity.
- `Learning by building.` — Smart Manufacturing, HackByte, Project EKA, Atlan, and Waldo, with direct public links nearby rather than inflated transitions.
- `The world I keep moving toward.` — physical AI as a longer horizon rooted in Smart Manufacturing.
- a date-stamped `Now — August 2026` note centered on Waldo, persistent agents, evaluation, and meeting thoughtful builders and researchers.

Do not name unconfirmed books, films, or anime.

- [ ] **Step 4: Implement `/about`**

Use `EditorialHeader`, then render:

1. introduction paragraphs at `max-width: 68ch`;
2. a confirmed influence grid;
3. the six compass principles as numbered editorial rows;
4. the longer-horizon paragraphs beside Smart Manufacturing and MIRAI-Setu artifacts;
5. the date-stamped Now note;
6. public social/contact links.

Use existing personal images only where ownership is clear. Every image needs an explicit `alt`, width/height or stable aspect ratio, and `loading="lazy"` below the fold.

- [ ] **Step 5: Verify route and commit**

Run: `npm test && npx tsc --noEmit && npm run lint && curl -I http://localhost:3000/about && git diff --check`

Expected: HTTP 200 and all checks pass.

```bash
git add src/app/about src/data/portfolio.ts tests/editorial-routes.test.mjs
git commit -m "feat: add candid personal about page"
```

---

### Task 5: Build the Research + Writing page and strengthen essay openings

**Files:**
- Create: `src/app/research/page.tsx`
- Create: `src/app/research/ResearchPage.module.scss`
- Modify: `src/content/writing/agent-done-outcome-truth.mdx`
- Modify: `src/content/writing/memory-is-not-storage.mdx`
- Modify: `src/content/writing/harness-is-part-of-the-agent.mdx`
- Modify: `tests/editorial-routes.test.mjs`
- Modify: `tests/portfolio-structure.test.mjs`

**Interfaces:**
- Consumes: `researchClusters`, `getPublicArtifacts`, `getAllPosts`, `ArtifactList`.
- Produces: a server-rendered `/research` route with `#models`, `#agents`, and `#world` anchors.

- [ ] **Step 1: Add failing Research route tests**

Append:

```js
test("research route exposes questions, artifacts, and uncertainty", () => {
  const source = read("src/app/research/page.tsx");
  assert.doesNotMatch(source, /^"use client"/);
  assert.match(source, /researchClusters/);
  assert.match(source, /getAllPosts/);
  assert.match(source, /cluster\.uncertainty/);
  assert.doesNotMatch(source, /gsap|ScrollTrigger|backdrop-filter/);
});
```

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test`

Expected: FAIL because the Research route is absent.

- [ ] **Step 3: Implement `/research`**

Use the intro:

> I study what happens after a model becomes a system: what it remembers, what it may change, and how we know its work became real.

Render four research clusters. Each contains the question, position, uncertainty, related essay links, and public artifacts. Map Models, Agents, and World anchors to the relevant groups without suggesting that physical AI is a shipped capability.

- [ ] **Step 4: Rewrite each flagship essay opening from a lived event**

Keep each article between 800 and 1,500 words and preserve valid frontmatter. The first 120 words must use these grounded openings:

- `agent-done-outcome-truth.mdx`: a production agent finished a run, but a person still had to determine whether the result reached the intended destination and resolved the job.
- `memory-is-not-storage.mdx`: a remembered fact remained available after the world changed, exposing the difference between recall and current truth.
- `harness-is-part-of-the-agent.mdx`: the 40+ harness comparison began as a search for one dominant architecture and instead revealed recurring control surfaces and different tradeoffs.

Do not add confidential Atlan details, unverified benchmarks, or private vault paths. Keep one governing question, one central diagram or distinction, limitations, and an open ending.

- [ ] **Step 5: Run metadata and word-count tests**

Run: `npm test`

Expected: all three essays retain required metadata and remain within 800–1,500 words.

- [ ] **Step 6: Verify and commit**

Run: `npx tsc --noEmit && npm run lint && curl -I http://localhost:3000/research && git diff --check`

```bash
git add src/app/research src/content/writing tests
git commit -m "feat: add research notebook and lived essay openings"
```

---

### Task 6: Build the readable Experience page

**Files:**
- Create: `src/app/experience/page.tsx`
- Create: `src/app/experience/ExperiencePage.module.scss`
- Modify: `tests/editorial-routes.test.mjs`

**Interfaces:**
- Consumes: `timelineData` and `EditorialHeader`.
- Produces: a server-rendered `/experience` route.

- [ ] **Step 1: Add failing Experience tests**

Append:

```js
test("experience route uses an editorial chronology", () => {
  const source = read("src/app/experience/page.tsx");
  assert.doesNotMatch(source, /^"use client"/);
  assert.match(source, /timelineData/);
  assert.match(source, /entry\.evidence/);
  assert.match(source, /entry\.nextQuestion/);
  assert.doesNotMatch(source, /gsap|ScrollTrigger|IntersectionObserver/);
});
```

- [ ] **Step 2: Run test and verify failure**

Run: `node --test tests/editorial-routes.test.mjs`

Expected: FAIL because the Experience route is absent.

- [ ] **Step 3: Implement `/experience`**

Use `EditorialHeader` with:

> The work makes more sense to me as a sequence of encounters—not a master plan.

Render each entry as a grid with year/date, organization and role, description, bounded evidence, question carried forward, tags, and public links. Use a simple CSS line and marker with no pinned rail, scroll scrub, or active-card animation.

- [ ] **Step 4: Verify and commit**

Run: `npm test && npx tsc --noEmit && npm run lint && curl -I http://localhost:3000/experience && git diff --check`

```bash
git add src/app/experience tests/editorial-routes.test.mjs
git commit -m "feat: add editorial experience chronology"
```

---

### Task 7: Reconcile the Waldo page with current founder and product truth

**Files:**
- Modify: `src/data/portfolio.ts`
- Modify: `src/app/work/[slug]/CaseStudy.tsx`
- Modify: `src/app/work/[slug]/CaseStudy.module.scss`
- Modify: `tests/portfolio-structure.test.mjs`

**Interfaces:**
- Consumes: existing Waldo `CaseStudyNarrative` and public artifact helpers.
- Produces: one current Waldo narrative with explicit built/demonstrated/hypothesis/direction separation.

- [ ] **Step 1: Write failing Waldo truth-boundary tests**

Add:

```js
test("Waldo remains current, bounded, and free of stale deck promotion", () => {
  assert.match(portfolio, /Founder of Waldo/i);
  assert.match(portfolio, /working internal foundations/i);
  assert.match(portfolio, /external product and market validation remain open/i);
  assert.doesNotMatch(portfolio, /Open the pitch deck/);
  assert.doesNotMatch(portfolio, /AI agent that reads your body and runs your day/i);
});
```

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test`

Expected: FAIL because the current case study still exposes the pitch-deck artifact and older wording.

- [ ] **Step 3: Reconcile Waldo data**

Use `Founder` consistently in public venture copy unless a source-bound organization field requires an historical title. Remove the pitch-deck artifact from the rendered artifact array without deleting the URL from git history. Keep the founder video, technical brief, current website, and product imagery.

Use this current-state statement verbatim:

> Kennel, a durable harness, and Waldo mobile are working internal foundations. Their integration, external product behavior, and market validation remain open work.

Keep health/body context explicitly optional and permissioned.

- [ ] **Step 4: Simplify visible evidence labels**

In `CaseStudy.tsx`, show a status label only at the section boundary where it distinguishes current system truth. Do not repeat `evidence`, `bounded`, or `verified` in ordinary prose. Preserve dates, artifact links, and explicit current-state language as the primary proof.

- [ ] **Step 5: Verify and commit**

Run: `npm test && npx tsc --noEmit && npm run lint && curl -I http://localhost:3000/work/waldo && git diff --check`

```bash
git add src/data/portfolio.ts src/app/work tests/portfolio-structure.test.mjs
git commit -m "fix: reconcile Waldo public narrative"
```

---

### Task 8: Align Writing, sitemap, metadata, and machine-readable surfaces

**Files:**
- Modify: `src/app/writing/WritingArchive.tsx`
- Modify: `src/app/writing/WritingArchive.module.scss`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/layout.tsx`
- Modify: `public/agents.txt`
- Modify: `public/llms-full.txt`
- Modify: `tests/editorial-routes.test.mjs`
- Modify: `tests/portfolio-structure.test.mjs`

**Interfaces:**
- Consumes: canonical routes and public content from Tasks 1–7.
- Produces: consistent discoverability for `/about`, `/research`, `/experience`, `/writing`, and `/work/waldo`.

- [ ] **Step 1: Add failing route and privacy tests**

Append:

```js
test("sitemap and machine surfaces expose only canonical public routes", () => {
  const sitemap = read("src/app/sitemap.ts");
  for (const route of ["/about", "/research", "/experience", "/writing", "/work/waldo"]) {
    assert.match(sitemap, new RegExp(route.replace("/", "\\/")));
  }
  for (const file of ["public/agents.txt", "public/llms-full.txt"]) {
    const source = read(file);
    assert.doesNotMatch(source, /06-Applications-and-Outreach|waldo-brain|\/Users\//);
    assert.doesNotMatch(source, /EcoFresh|OneSync|Quantum \+ AI/);
  }
});
```

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test`

Expected: FAIL because editorial routes are missing from sitemap and machine-readable files.

- [ ] **Step 3: Align Writing archive**

Replace its bespoke back/header markup with `EditorialHeader`. Keep category filtering as the only client-side responsibility. Add a visible link to `/research` and preserve standard `Link` navigation for articles.

- [ ] **Step 4: Update sitemap and metadata**

Add static route entries for `/about`, `/research`, and `/experience` with appropriate `changeFrequency` and priority below the homepage. Keep only Waldo in work/project route generation. Add route-specific metadata in each page rather than broadening root metadata with unearned claims.

- [ ] **Step 5: Rewrite machine-readable summaries**

Use one identity and route map:

- Founder of Waldo and AI systems researcher.
- Current questions: agent harnesses, memory/state, outcome evaluation, and agents in the physical world.
- Clear links to About, Research, Writing, Experience, and Waldo.
- Built, demonstrated, hypothesis, historical, and direction boundaries where material.

Do not include internal paths, applications, unverified traction, or deferred Harness Atlas claims.

- [ ] **Step 6: Verify and commit**

Run: `npm test && npx tsc --noEmit && npm run lint && git diff --check`

```bash
git add src/app/writing src/app/sitemap.ts src/app/layout.tsx public tests
git commit -m "feat: align portfolio discovery surfaces"
```

---

### Task 9: Performance, accessibility, visual review, and final local verification

**Files:**
- Modify: `src/app/components/ClientShell.tsx` — keep global utilities from forcing heavy visual work onto editorial routes.
- Modify: `src/app/components/sections/Hero.tsx` — preserve the visual hero while ensuring its canvas and particle work remain homepage-only and tier-gated.
- Modify: `src/app/globals.scss` — add reduced-motion fallbacks and shared overflow/visibility safeguards.
- Modify: the SCSS modules created in Tasks 2–6 — correct every overflow, contrast, focus, or responsive issue found during the specified desktop/mobile review.
- Test: `tests/portfolio-structure.test.mjs`
- Test: `tests/editorial-routes.test.mjs`

**Interfaces:**
- Consumes: all completed routes and components.
- Produces: verified local implementation with the development server restored at `http://localhost:3000`.

- [ ] **Step 1: Add final static performance guards**

Add:

```js
test("editorial routes avoid heavy client-only dependencies", () => {
  for (const file of [
    "src/app/about/page.tsx",
    "src/app/research/page.tsx",
    "src/app/experience/page.tsx",
  ]) {
    const source = read(file);
    assert.doesNotMatch(source, /^"use client"/);
    assert.doesNotMatch(source, /gsap|three|ScrollTrigger|Lenis|TransitionLink/);
  }
});
```

- [ ] **Step 2: Run full tests and type/lint checks**

Run:

```bash
npm test
npx tsc --noEmit
npm run lint
git diff --check
```

Expected: all tests and type checks pass; lint has no new warnings.

- [ ] **Step 3: Stop development server and run production build**

Resolve the exact port process, stop only port 3000, then build:

```bash
lsof -ti tcp:3000 2>/dev/null | xargs -n 1 kill 2>/dev/null || true
npm run build
```

Expected: build completes and statically generates homepage, About, Research, Experience, Writing, article, and Waldo routes.

- [ ] **Step 4: Restart localhost and verify routes**

Run `npm run dev` in a persistent PTY, then:

```bash
for route in / /about /research /experience /writing /work/waldo; do
  curl -sS -o /dev/null -w "%{http_code} $route\n" "http://localhost:3000$route"
done
```

Expected: every route reports 200.

- [ ] **Step 5: Perform desktop and mobile visual review**

At 1280x720 and 390x844, inspect:

- hero copy and fallback;
- homepage order and total height;
- internal-page typography and link states;
- mobile navigation and focus trap;
- About photographs and captions;
- research anchors and article navigation;
- experience chronology;
- Waldo media and status boundaries;
- reduced-motion behavior.

Record browser console errors and fix all application errors. Verify body copy is visible before and after scrolling, no horizontal overflow exists, and content remains readable when WebGL fails or reduced motion is enabled.

- [ ] **Step 6: Compare shipped JavaScript and page height**

Capture the build route table and browser metrics. Confirm:

- homepage height is below 8,000 pixels at 1280x720;
- editorial pages do not ship GSAP, Three.js, Lenis, or homepage WebGL in their route chunks;
- article first-load JavaScript does not regress from the current approximately 92-kB baseline;
- no private source path occurs in `.next/server` output.

Search generated output with:

```bash
rg -n "waldo-brain|06-Applications-and-Outreach|/Users/shivanshfulper" .next/server && exit 1 || true
```

- [ ] **Step 7: Final commit**

```bash
git add src tests public
git commit -m "perf: finalize living notebook portfolio"
git status --short
```

Expected: only the user's untracked `AGENTS.md` remains; localhost stays running; nothing is pushed or deployed.
