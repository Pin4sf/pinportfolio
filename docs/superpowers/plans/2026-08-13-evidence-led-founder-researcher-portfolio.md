# Evidence-Led Founder-Researcher Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio into an evidence-led founder and AI systems researcher profile, reconcile the Waldo case study, and publish three source-backed technical essays while preserving the existing visual identity and keeping all work local.

**Architecture:** Keep the Next.js 14 App Router, static MDX writing system, SCSS modules, GSAP, and Three.js. Introduce explicit evidence and research data in `src/data/portfolio.ts`, replace novelty-led homepage sections with focused client components, and use MDX frontmatter as the writing metadata source. Add Node structural tests for content truth, route integrity, evidence boundaries, and machine-readable consistency.

**Tech Stack:** Next.js 14.1.4, React 18, TypeScript 5, SCSS Modules, GSAP 3.12, Three.js 0.162, MDX via `next-mdx-remote`, Node.js built-in test runner.

## Global Constraints

- Work only on local branch `codex/evidence-led-portfolio`.
- Do not push or deploy without separate explicit approval.
- Preserve the untracked root `AGENTS.md`; do not stage or modify it.
- Keep reusable portfolio data in `src/data/portfolio.ts`; keep long-form article bodies in `src/content/writing/*.mdx`.
- Do not add a CMS, database, analytics product, environment variable, or runtime dependency.
- Preserve the dark editorial identity and existing reduced-motion and GPU-tier behavior.
- Remove Token Burner, token and Wispr statistics, “AI runs in my veins,” and Quantum + AI from the homepage.
- Do not present Waldo as an AI alignment research project, a validated market, or target architecture as shipped behavior.
- Keep health/body data as permissioned context, not Waldo's category or a prerequisite.
- Do not expose private Waldo Brain paths, private user data, internal discussions, or confidential Atlan details.
- Treat `observed`, `built`, `demonstrated`, `derived`, `hypothesis`, `direction`, and `historical` as distinct statuses.
- Use semantic HTML, visible focus states, meaningful links, and useful initial HTML.

---

### Task 1: Establish the claim ledger and structural tests

**Files:**
- Create: `docs/research/portfolio-claim-ledger-2026-08-13.md`
- Create: `tests/portfolio-structure.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: current portfolio, approved spec, Waldo Brain sources, and MDX frontmatter.
- Produces: `npm test` and the claim ledger used by every copy task.

- [ ] **Step 1: Create the claim ledger**

Search the portfolio and Waldo Brain:

```bash
rg -n "Atlan|AtlanClaw|30\+|Project EKA|Eka Curator|Qwen3|Smart Manufacturing|VisionX|MIRAI|patent|HackByte" src/data/portfolio.ts public/agents.txt public/llms-full.txt /Users/shivanshfulper/Developer/Pin4sf/waldo-brain -g '*.md'
```

Use this table exactly:

```markdown
| Claim | Public wording | Status | Evidence | Qualification | Destination |
|---|---|---|---|---|---|
```

Cover 30+ production agent instances, Atlan contribution boundaries, EKA, Qwen3 MoE, Smart Manufacturing, patent statuses, HackByte registrations, MIRAI-Setu, Kennel acceptance, current Waldo foundations, health context, and lack of external Waldo validation.

- [ ] **Step 2: Add the test script**

Add to `package.json`:

```json
"test": "node --test tests/*.test.mjs"
```

- [ ] **Step 3: Write failing structural tests**

Use `node:test`, `node:assert/strict`, `fs`, `path`, and `gray-matter`. Assert the future identity and trajectory exist; homepage sources exclude Token Burner and Quantum + AI; every local writing link has an MDX file; `my-stack-2026` is absent; the three new essays exist; Waldo includes both self-falsifier metrics; and `layout.tsx`, `agents.txt`, and `llms-full.txt` agree on founder-researcher identity.

- [ ] **Step 4: Confirm the failure baseline**

```bash
npm test
```

Expected: FAIL because the new sections, essays, and machine-readable copy are not implemented.

- [ ] **Step 5: Commit**

```bash
git add package.json tests/portfolio-structure.test.mjs docs/research/portfolio-claim-ledger-2026-08-13.md
git commit -m "test: define portfolio evidence boundaries"
```

---

### Task 2: Add the canonical evidence and research data model

**Files:**
- Modify: `src/data/portfolio.ts`

**Interfaces:**
- Produces: `EvidenceStatus`, `EvidenceRecord`, `ResearchArea`, trajectory data, revised hero/About/capability/chronology content, `getFeaturedEvidence()`, and `getEvidenceBySlug()`.

- [ ] **Step 1: Add types**

```ts
export type EvidenceStatus =
  | "observed" | "built" | "demonstrated" | "derived"
  | "hypothesis" | "direction" | "historical";

export interface EvidenceRecord {
  slug: string;
  title: string;
  phase: "models" | "agents" | "world" | "field-building";
  status: EvidenceStatus[];
  role: string;
  summary: string;
  contribution: string;
  observableResult: string;
  questions: string[];
  links: { label: string; href: string; kind: "artifact" | "source" | "case-study" | "writing" }[];
  image?: string;
  featured: boolean;
}

export interface ResearchArea {
  title: string;
  maturity: "practice" | "investigating" | "long-term";
  summary: string;
  questions: string[];
  evidenceSlugs: string[];
}
```

Extend hero data with `eyebrow`, `trajectory`, and actions. Extend timeline entries with `evidence` and `nextQuestion`.

- [ ] **Step 2: Add approved identity copy**

Use `Founder + AI systems researcher`, `I build persistent agents—and study what it takes to trust them over time.`, and `Models → Agents → World`. Add evidence, research, writing, CV-if-present, and GitHub actions.

- [ ] **Step 3: Add three trajectory phases, six evidence records, and research maturity bands**

Use only ledger-approved public wording. Every evidence record needs a status, bounded contribution, observable result, and research question. Do not include Quantum + AI.

- [ ] **Step 4: Replace About, skills, and timeline copy**

Use the approved three-paragraph About. Create exactly three capability groups: Agent systems; Models and data; Physical and cyber-physical systems. Condense chronology and add the question each chapter produced.

- [ ] **Step 5: Verify and commit**

```bash
npm test
npx tsc --noEmit
git add src/data/portfolio.ts tests/portfolio-structure.test.mjs
git commit -m "content: establish founder researcher evidence model"
```

---

### Task 3: Rebuild the hero and add Models -> Agents -> World

**Files:**
- Create: `src/app/components/sections/Trajectory.tsx`
- Create: `src/app/components/sections/Trajectory.module.scss`
- Modify: `src/app/components/sections/Hero.tsx`
- Modify: `src/app/components/sections/Hero.module.scss`
- Modify: `src/app/page.tsx`
- Modify: `src/app/components/layout/Header.tsx`
- Modify: `src/app/components/ui/SectionProgress.tsx`

**Interfaces:**
- Consumes: `heroData`, trajectory phases, and `navItems`.
- Produces: `#home`, `#trajectory`, and stable navigation to later sections.

- [ ] **Step 1: Add tests for imports, anchors, and removed token monikers**

Run the focused test and confirm it fails:

```bash
node --test --test-name-pattern="hero|trajectory|anchor" tests/portfolio-structure.test.mjs
```

- [ ] **Step 2: Refactor Hero**

Remove `aiStats`, token monikers, and their icons. Render eyebrow, name, founder-researcher statement, support copy, trajectory, and primary action links. Preserve magnetic name behavior, Three.js, Fluid background, reduced motion, GPU-tier behavior, and secondary social links.

- [ ] **Step 3: Implement Trajectory**

Render one semantic article per phase with phase number, title, evidence anchors, and interpretive line. Use transforms and opacity in one ScrollTrigger timeline; reduced motion renders the final state immediately.

- [ ] **Step 4: Update page order and navigation**

Use ids `home`, `trajectory`, `evidence`, `research`, `writing`, `about`, `experience`, `capabilities`, and `contact` consistently.

- [ ] **Step 5: Verify and commit**

```bash
npm test
npx tsc --noEmit
npx prettier --check "src/app/components/sections/{Hero,Trajectory}.{tsx,module.scss}" "src/app/page.tsx"
git add src/app/page.tsx src/app/components/sections/Hero.tsx src/app/components/sections/Hero.module.scss src/app/components/sections/Trajectory.tsx src/app/components/sections/Trajectory.module.scss src/app/components/layout/Header.tsx src/app/components/ui/SectionProgress.tsx tests/portfolio-structure.test.mjs
git commit -m "feat: lead portfolio with founder researcher trajectory"
```

---

### Task 4: Convert Selected Work into Selected Evidence

**Files:**
- Modify: `src/app/components/sections/SelectedWork.tsx`
- Modify: `src/app/components/sections/SelectedWork.module.scss`

**Interfaces:**
- Consumes: `getFeaturedEvidence()`.
- Produces: `#evidence` with six records and safe links.

- [ ] **Step 1: Add and run a failing evidence-card test**

Require status, phase, contribution, observable result, a question, and safe evidence links.

- [ ] **Step 2: Refactor the component**

Use semantic `<article>`, `<dl>`, and a link group. Do not wrap a multi-link card in one anchor. Preserve alternating layouts and performant motion; replace technology pills with square evidence-status labels and tabular record numbers.

- [ ] **Step 3: Verify and commit**

```bash
npm test
npx tsc --noEmit
npx prettier --check "src/app/components/sections/SelectedWork.{tsx,module.scss}"
git add src/app/components/sections/SelectedWork.tsx src/app/components/sections/SelectedWork.module.scss tests/portfolio-structure.test.mjs
git commit -m "feat: turn selected work into evidence records"
```

---

### Task 5: Replace Token Burner with Research Agenda

**Files:**
- Create: `src/app/components/sections/ResearchAgenda.tsx`
- Create: `src/app/components/sections/ResearchAgenda.module.scss`
- Modify: `src/app/page.tsx`
- Delete: `src/app/components/sections/TokenBurner.tsx`
- Delete: `src/app/components/sections/TokenBurner.module.scss`

**Interfaces:**
- Consumes: research areas and five headline questions.
- Produces: `#research` with practice, investigating, and long-term groups.

- [ ] **Step 1: Add a failing negative-content test**

Require all three maturity labels and exclude Token Burner, Wispr, “AI runs in my veins,” and Quantum + AI.

- [ ] **Step 2: Implement ResearchAgenda and replace the dynamic import**

Render maturity groups as semantic sections and questions as an ordered list. Link research areas to evidence anchors. Use a single reveal timeline and no infinite animation.

- [ ] **Step 3: Delete old files after confirming no consumers**

```bash
rg -n "TokenBurner|token-burner" src
```

- [ ] **Step 4: Verify and commit**

```bash
npm test
npx tsc --noEmit
git add src/app/page.tsx src/app/components/sections/ResearchAgenda.tsx src/app/components/sections/ResearchAgenda.module.scss src/app/components/sections/TokenBurner.tsx src/app/components/sections/TokenBurner.module.scss tests/portfolio-structure.test.mjs
git commit -m "feat: replace usage spectacle with research agenda"
```

---

### Task 6: Tighten About, chronology, and capability provenance

**Files:**
- Modify: `src/app/components/sections/About.tsx`
- Modify: `src/app/components/sections/About.module.scss`
- Modify: `src/app/components/sections/Timeline.tsx`
- Modify: `src/app/components/sections/Timeline.module.scss`
- Modify: `src/app/components/sections/SkillsExperience.tsx`
- Modify: `src/app/components/sections/SkillsExperience.module.scss`

**Interfaces:**
- Consumes: revised About, chronology, capability groups, and evidence slugs.
- Produces: `#about`, `#experience`, and `#capabilities`.

- [ ] **Step 1: Add failing assertions**

Require About to connect Waldo, EKA, Atlan, Smart Manufacturing, and physical AI. Require timeline labels `Evidence` and `Question it led to`. Require capability evidence links.

- [ ] **Step 2: Refactor the three sections**

Keep About portrait and bounded motion. Render the approved primary paragraphs and smaller personal note. Preserve timeline scrollytelling while reducing entries. Remove the skills dot-wave and generic pills; render three capability groups with evidence links.

- [ ] **Step 3: Verify and commit**

```bash
npm test
npx tsc --noEmit
npx prettier --check "src/app/components/sections/{About,Timeline,SkillsExperience}.{tsx,module.scss}"
git add src/app/components/sections/About.tsx src/app/components/sections/About.module.scss src/app/components/sections/Timeline.tsx src/app/components/sections/Timeline.module.scss src/app/components/sections/SkillsExperience.tsx src/app/components/sections/SkillsExperience.module.scss tests/portfolio-structure.test.mjs
git commit -m "feat: connect biography and capabilities to evidence"
```

---

### Task 7: Make MDX metadata the writing source of truth

**Files:**
- Modify: `src/lib/mdx.ts`
- Modify: `src/app/components/sections/Writing.tsx`
- Modify: `src/app/components/sections/Writing.module.scss`
- Modify: `src/app/page.tsx`
- Modify: `src/app/writing/page.tsx`
- Modify: `src/app/writing/WritingArchive.tsx`
- Modify: `src/app/writing/WritingArchive.module.scss`
- Modify: `src/app/writing/[slug]/page.tsx`
- Modify: `src/app/writing/[slug]/BlogPost.tsx`
- Modify: `src/app/writing/[slug]/BlogPost.module.scss`
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Produces: `PostCategory`, expanded `PostMeta`, server-provided featured posts, revision-aware archive and article metadata.

- [ ] **Step 1: Add frontmatter tests**

Require `title`, `date`, `category`, `description`, and `featured` for all MDX. Research essays also require `evidenceStatus` and `revised`. Reject unknown categories.

- [ ] **Step 2: Expand metadata**

```ts
export type PostCategory = "research" | "field-note" | "founder-note" | "historical";
```

Add optional `revised` and `evidenceStatus` to `PostMeta` and `Post`. Throw a descriptive parse error naming the file when its category is invalid.

- [ ] **Step 3: Remove hardcoded featured posts**

Make server `Page` call `getFeaturedPosts(3)` and pass them into the client `Writing` component. Remove `my-stack-2026` and all duplicate metadata.

- [ ] **Step 4: Update archive, article metadata, and sitemap**

Use categories Research, Field notes, Founder notes, Historical. Show revised date and evidence status. Add `dateModified` to JSON-LD. Use `post.revised ?? post.date` in sitemap.

- [ ] **Step 5: Verify and commit**

```bash
npm test
npx tsc --noEmit
npx prettier --check "src/lib/mdx.ts" "src/app/components/sections/Writing.{tsx,module.scss}" "src/app/writing/**/*.{ts,tsx,scss}" "src/app/sitemap.ts"
git add src/lib/mdx.ts src/app/components/sections/Writing.tsx src/app/components/sections/Writing.module.scss src/app/page.tsx src/app/writing src/app/sitemap.ts tests/portfolio-structure.test.mjs
git commit -m "feat: make article metadata canonical"
```

---

### Task 8: Write “An agent said ‘done.’ What actually became true?”

**Files:**
- Create: `src/content/writing/agent-done-outcome-truth.mdx`

**Interfaces:**
- Produces: featured research essay `agent-done-outcome-truth`.

- [ ] **Step 1: Add frontmatter**

Use date/revised `2026-08-13`, category `research`, featured `true`, evidenceStatus `derived`, and the approved title and description.

- [ ] **Step 2: Write the essay**

Open with the ledger-bounded Atlan observation. Define Agent Session, Artifact, Outcome Evidence, Acceptance, and Open Loop. Explain external-state verification, evidence freshness, attribution, recovery, and accept/repair/reopen/defer/transfer/change/release. Address cases where artifact completion is sufficient and the cost of verification. End with falsifiable measurements rather than a product CTA.

- [ ] **Step 3: Verify and commit**

```bash
rg -n "/Users/|waldo-brain|AtlanClaw|confidential|private" src/content/writing/agent-done-outcome-truth.mdx
npm test
npm run build
git add src/content/writing/agent-done-outcome-truth.mdx
git commit -m "content: distinguish agent completion from outcome truth"
```

---

### Task 9: Write “Memory is not storage”

**Files:**
- Create: `src/content/writing/memory-is-not-storage.mdx`

**Interfaces:**
- Produces: featured research essay `memory-is-not-storage`.

- [ ] **Step 1: Add frontmatter**

Use date/revised `2026-08-13`, category `research`, featured `true`, evidenceStatus `derived`, and the approved title and description.

- [ ] **Step 2: Write the essay**

Distinguish memory, current state, and policy through one concrete example. Cover working, episodic, semantic, procedural, and reflective memory; provenance, freshness, contradiction, correction, consolidation, forgetting, export, and deletion; stale state, poisoning, inferred preference drift, and multi-agent synchronization. State that memory influences behavior but never grants authority. End with proposed tests, not claims that unrun experiments succeeded.

- [ ] **Step 3: Verify and commit**

```bash
rg -n "/Users/|waldo-brain|confidential|private" src/content/writing/memory-is-not-storage.mdx
npm test
npm run build
git add src/content/writing/memory-is-not-storage.mdx
git commit -m "content: frame memory as part of agent policy"
```

---

### Task 10: Write “The harness is part of the agent” from 40+ breakdowns

**Files:**
- Create: `src/content/writing/harness-is-part-of-the-agent.mdx`
- Modify: `docs/research/portfolio-claim-ledger-2026-08-13.md`

**Interfaces:**
- Consumes: Waldo Brain harness catalog and synthesis.
- Produces: featured research essay `harness-is-part-of-the-agent`; no full Harness Atlas.

- [ ] **Step 1: Verify corpus count and method**

Read:

```bash
sed -n '1,280p' /Users/shivanshfulper/Developer/Pin4sf/waldo-brain/03-References/ADL/ai-agent-harness-and-persistent-agents-master-note.md
sed -n '1,280p' /Users/shivanshfulper/Developer/Pin4sf/waldo-brain/03-References/research/waldo-product-and-agentic-harness-benchmark-catalog-2026-08-04.md
sed -n '1,280p' /Users/shivanshfulper/Developer/Pin4sf/waldo-brain/03-References/ADL/june-2026-agent-harness-loops-memory-synthesis.md
```

Record the verified public count and inclusion boundary in the ledger. Use `more than 40` only if supported; otherwise use the exact verified count or `dozens`.

- [ ] **Step 2: Write the essay**

Use research frontmatter dated/revised `2026-08-13`, featured `true`, evidenceStatus `derived`. Explain that the corpus is documentation and source/code-oriented analysis, not a controlled benchmark of every system. Cover runtime loop, context, model adapters, tools, state, memory, permissions, recovery, verification, observability, scheduling/delivery, and subagents. Add one original diagram. Separate cross-system patterns from Waldo Adopt/Adapt/Reject decisions and unknowns.

- [ ] **Step 3: Mention the deferred Harness Atlas**

Close with the future comparison-series direction. Link [The Big LLM Architecture Comparison](https://magazine.sebastianraschka.com/p/the-big-llm-architecture-comparison) as editorial inspiration for consistent dimensions, diagrams, per-system summaries, and cumulative updates. State that the Harness Atlas will use an original taxonomy and visual identity.

- [ ] **Step 4: Verify and commit**

```bash
rg -n "/Users/|waldo-brain|confidential|private" src/content/writing/harness-is-part-of-the-agent.mdx
npm test
npm run build
git add src/content/writing/harness-is-part-of-the-agent.mdx docs/research/portfolio-claim-ledger-2026-08-13.md
git commit -m "content: synthesize lessons from agent harness research"
```

---

### Task 11: Label historical writing without erasing it

**Files:**
- Modify: `src/content/writing/building-onesync.mdx`
- Modify: `src/content/writing/onesync-agent-os.mdx`
- Modify: `src/content/writing/startup-lessons.mdx`
- Modify: `src/content/writing/mirai-setu-japan.mdx`

**Interfaces:**
- Produces: archive entries with explicit current or historical status.

- [ ] **Step 1: Audit present-tense claims**

```bash
rg -n "currently|today|now|building|Waldo|OneSync|EcoFresh" src/content/writing/*.mdx
```

- [ ] **Step 2: Label superseded chapters**

Set `category: "historical"` and `evidenceStatus: "historical"` where appropriate. Add this note without rewriting history:

```md
> **Historical chapter:** This essay records an earlier product direction. I have kept it public because the engineering and founder lessons still matter, but it does not describe Waldo's current thesis.
```

Keep MIRAI-Setu as a field note if its claims remain current.

- [ ] **Step 3: Verify and commit**

```bash
npm test
npm run build
git add src/content/writing/building-onesync.mdx src/content/writing/onesync-agent-os.mdx src/content/writing/startup-lessons.mdx src/content/writing/mirai-setu-japan.mdx
git commit -m "content: preserve earlier venture writing as history"
```

---

### Task 12: Reconcile the Waldo case study

**Files:**
- Modify: `src/data/portfolio.ts`
- Modify: `src/app/work/[slug]/CaseStudy.tsx`
- Modify: `src/app/work/[slug]/CaseStudy.module.scss`
- Add only if used: `public/images/projects/waldo/waldo-revised-thesis-board.png`

**Interfaces:**
- Consumes: approved narrative, ledger, current case study, and prior draft commit `2cc6a99` as a source only.
- Produces: evidence-labeled Waldo case study and self-falsifier.

- [ ] **Step 1: Compare without cherry-picking**

```bash
git show 2cc6a99:src/data/portfolio.ts > /tmp/pinportfolio-waldo-prior-draft.ts
git diff --no-index src/data/portfolio.ts /tmp/pinportfolio-waldo-prior-draft.ts || true
```

- [ ] **Step 2: Implement the approved sequence**

Use hero statement `Machine execution is scaling. Human understanding and responsibility are not.` Cover founder evidence, two curves, problem pool, source limits, responsibility continuity, working foundations, principles, built versus target behavior, questions/falsifiers, longer horizon, team, and current artifacts.

- [ ] **Step 3: Add evidence-status rendering**

Add optional `status: EvidenceStatus` to narrative sections/cards. Render supplied status text; never infer it inside the component.

- [ ] **Step 4: Add the self-falsifier and remove stale artifacts**

Include `sessions or raw artifacts opened per accepted outcome` and `interruptions per accepted outcome`. Confirm founder-video, old public product-site, and old pitch-deck cards are absent. Keep product foundations bounded as internal working evidence.

- [ ] **Step 5: Verify and commit**

```bash
rg -n "founder-video|pitchdeck|external users|revenue|retention|product-market fit" src/data/portfolio.ts
npm test
npx tsc --noEmit
npm run build
git add src/data/portfolio.ts 'src/app/work/[slug]/CaseStudy.tsx' 'src/app/work/[slug]/CaseStudy.module.scss' tests/portfolio-structure.test.mjs
git commit -m "content: recast Waldo as an evidence-led founder thesis"
```

Add the thesis-board image to that commit only when actually rendered.

---

### Task 13: Align metadata, initial HTML, and machine-readable copy

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Modify: `public/agents.txt`
- Modify: `public/llms-full.txt`
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Produces: consistent visible, SEO, JSON-LD, and machine-readable identity.

- [ ] **Step 1: Add cross-surface tests**

Require all surfaces to contain Founder, AI systems researcher, Waldo, Models, Agents, and World. Exclude health-product, proven-market, and Kennel-only definitions.

- [ ] **Step 2: Update metadata and JSON-LD**

Use: `Shivansh Fulper is the founder of Waldo and an AI systems researcher working on persistent agents, memory and state, long-horizon execution, monitoring, control, and evaluation, with a longer-term interest in physical AI.`

- [ ] **Step 3: Update initial HTML**

Include trajectory, selected evidence, research maturity, and actual featured writing. Avoid an `aria-hidden` duplicate that harms accessibility; use a concise server-rendered summary.

- [ ] **Step 4: Update `agents.txt` and `llms-full.txt`**

Include evidence categories, current Waldo hypothesis, built/demonstrated boundaries, health boundary, absence of claimed external validation, and writing/evidence routes.

- [ ] **Step 5: Verify and commit**

```bash
npm test
npx tsc --noEmit
npm run build
git diff --check
git add src/app/layout.tsx src/app/page.tsx public/agents.txt public/llms-full.txt src/app/sitemap.ts tests/portfolio-structure.test.mjs
git commit -m "content: align portfolio metadata with evidence"
```

---

### Task 14: Final standards, visual, and release-boundary review

**Files:**
- Modify only files that fail the checks below.

**Interfaces:**
- Produces: verified local implementation and review handoff; no push or deployment.

- [ ] **Step 1: Run all automated checks**

```bash
npm test
npm run lint
npx tsc --noEmit
npx prettier --check "src/**/*.{ts,tsx,scss,mdx}" "tests/**/*.mjs" "docs/**/*.md"
npm run build
git diff --check
```

- [ ] **Step 2: Run the production build locally and verify HTTP 200**

Check `/`, `/writing`, all three new essay routes, and `/work/waldo`.

- [ ] **Step 3: Review visually**

Review 1440x900 and 390x844 plus reduced motion. Inspect hero actions, trajectory, evidence links, research maturity, About, chronology, capabilities, writing prose/diagram, Waldo evidence labels/falsifier, navigation, focus states, and horizontal overflow.

- [ ] **Step 4: Audit boundaries**

```bash
rg -n "external users|revenue|retention|product-market fit|fully integrated|AI alignment research project|health product|Quantum \+ AI|Token Burner|AI runs in my veins" src public
rg -n "/Users/|waldo-brain" src/content/writing public
```

Every match must be an explicit negation/boundary or be removed.

- [ ] **Step 5: Audit repository scope**

```bash
git status --short
git diff --stat master...HEAD
git log --oneline master..HEAD
```

Confirm `AGENTS.md` remains untracked, no private file is included, and no unrelated file changed.

- [ ] **Step 6: Commit review fixes if any**

Stage only files adjusted during review and commit as `fix: polish evidence-led portfolio review findings`. Skip the commit if no change is required.

- [ ] **Step 7: Stop before publication**

Report checks, visual findings, changed routes, branch, and commit list. Do not push or deploy. Request publication approval separately.

---

## Self-review result

- Every approved homepage section, Waldo reconciliation, three essays, historical labels, metadata surface, and verification requirement maps to a task.
- Essay three includes verified learnings from the 40+ harness corpus.
- The complete Harness Atlas and individual harness series remain deferred to a future session.
- Evidence and writing interfaces are defined before their component consumers.
- No task instructs a push or deployment.
