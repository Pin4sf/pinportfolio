# Signal Observatory Portfolio Design

**Date:** 2026-08-21

**Status:** Awaiting written-spec review

**Scope:** Local portfolio design and content architecture; no push or deployment

**Supersedes:** The visual and personal-influence portions of the 2026-08-18 Cinematic Front Door specification. Its evidence, privacy, and claim-boundary requirements remain in force.

## 1. Objective

Evolve Shivansh Fulper's portfolio into a coherent personal world for a founder and AI systems researcher: cinematic at the front door, serious in its evidence, calm enough to read, and personal enough that a visitor can understand the person behind the work.

The final form combines three qualities:

1. **A signal observatory:** a restrained atmospheric identity built from cellular behavior, analog grain, memory traces, and a controlled green live-state accent.
2. **A living notebook:** concise research essays, field notes, venture evidence, personal annotations, and a visible record of changing questions.
3. **A readable personal archive:** books, papers, blogs, films, anime, places, and experiences explained through what they changed in Shivansh's thinking.

The site remains a personal portfolio. It does not become a generic research portal, online university, or public mirror of Waldo Brain. Waldo Brain is private editorial provenance; the portfolio is the curated public expression.

### 1.1 North-star transformation

| Before | Final direction | Why |
| --- | --- | --- |
| Research, writing, and influences feel separate | One connected intellectual world | Visitors understand how Shivansh's interests become research and ventures. |
| Personal influences appear as cards | A quiet **Reading** page with concise annotations | It feels thoughtful, not like a bookshelf résumé. |
| Writing is only an article archive | Essays, research notes, field notes, books, and courses share one authored-work system | It can grow naturally without redesigning later. |
| Substack would become another content home | The portfolio remains canonical; Substack becomes distribution | Shivansh's work stays organized and owned in one place. |

## 2. Audience and reading modes

The experience must support two reading modes without creating separate personas.

### Fast review

Within two minutes, an accelerator, fellowship, frontier-AI team, or collaborator should understand:

- Shivansh is the founder of Waldo and an AI systems researcher;
- what Waldo is trying to make possible;
- how the research direction moved from models to agents to physical consequences;
- which work is built, observed, demonstrated, historical, or still a direction;
- where to find writing, experience, and contact details.

### Deep reading

A curious visitor should be able to follow the work into:

- research questions and technical essays;
- public artifacts and source-backed explanations;
- the experience that produced each question;
- books and cultural influences with personal annotations;
- current judgments, uncertainties, and open questions.

The fast path stays concise. Depth lives one click away rather than being compressed into the homepage.

## 3. Core narrative

The public narrative keeps this order:

1. **What I am building:** Waldo and Kennel.
2. **What I learned by doing:** model and data systems, production agents, harnesses, memory, evaluation, and physical systems.
3. **What I believe:** authority should remain with the person; memory should be correctable; evidence matters more than plausible completion; design should make powerful systems quieter and more legible.
4. **What shapes me:** early systems curiosity, community, Japan, design, books, papers, films, anime, and ordinary life.

The identity remains `Founder + AI systems researcher`. The intellectual thread remains `Models -> Agents -> World`, but it is explained as an order of curiosity rather than a career plan written in hindsight.

## 4. Information architecture

### 4.1 Primary navigation

Keep the current evaluator-friendly navigation:

- Venture
- Research + Writing
- Experience
- About
- Contact

Reading must be discoverable without adding a sixth primary item. It is linked from the homepage, Research + Writing, About, and the editorial footer.

### 4.2 Canonical routes

- `/` — cinematic overview and selected paths
- `/work/waldo` — venture narrative and bounded product evidence
- `/research` — live research questions and supporting evidence
- `/writing` — Shivansh's authored essays, research notes, field notes, and future long-form formats
- `/writing/[slug]` — individual authored work
- `/reading` — annotated influences and recommendations
- `/experience` — chronological evidence and the questions left behind
- `/about` — lived story, personal compass, longer horizon, and current note

The existing compatibility routes may remain, but these routes define the public architecture.

## 5. Homepage flow

The homepage remains the cinematic front door, not the complete archive.

### 5.1 Hero

Keep the approved quiet hero:

> Shivansh Fulper
>
> I'm building the agent that stays on your side.

The supporting line may identify Waldo, AI systems research, and IIITDM Jabalpur. The hero has no CTA cluster, manifesto, evidence vocabulary, or oversized explanatory paragraph.

The visual environment provides emotion; the copy provides identity.

### 5.2 Waldo

Keep the heading simply `Waldo`.

The section contains:

- one short human description;
- one representative product image;
- one honest state/boundary line;
- links to the case study, public product surface, and founder video where verified.

It does not repeat the homepage thesis or use a large sentence as a second hero.

### 5.3 Research direction

Replace the repeated three-card `Models / Agents / World` composition with one connected editorial path.

**Eyebrow:** Research direction

**Heading:** From capability to consequence.

**Purpose copy:**

> I began by asking how models acquire capability. Building agents shifted the question toward memory, judgment, and control. Waldo—and my interest in physical AI—asks what happens when those decisions persist and touch the world.

**Path:**

`MODELS — capability -> AGENTS — agency -> WORLD — consequence`

Each waypoint exposes one short question and one evidence line. The section has only one final action: `Explore the research`.

The section must not repeat three large headings, three identical calls to action, or three equal bordered cards.

### 5.4 Selected writing

Show three authored pieces as an editorial list rather than a card wall. Each entry includes:

- format;
- date or updated date;
- title;
- one concrete opening or question;
- reading time.

The first set remains:

1. An agent said "done." What actually became true?
2. Memory is not storage when an agent lives with you.
3. The harness is part of the agent.

### 5.5 Reading preview

Add one compact section for influences and recommendations.

**Label:** Reading

**Heading:** Things I keep returning to.

Show three to five confirmed entries across books, papers, blogs, films, anime, design, or places. Each entry answers one question in one or two sentences:

> What did this change in how I see or build?

No ratings, cover-wall grid, generic summaries, or unannotated title lists are allowed. Until an exact title and personal annotation are confirmed, an item remains absent rather than appearing as a placeholder.

### 5.6 Selected experience

Keep the compact chronology. Each chapter states:

- what happened;
- what Shivansh personally did;
- what artifact or result is public;
- what question remained.

### 5.7 Personal compass

Use a restrained preview of the About page: one lived detail, one principle, and one path to the fuller story. Do not repeat the entire influence list or principles grid.

### 5.8 Contact

End with a direct invitation, public profiles, and email. No elaborate form or additional manifesto.

## 6. Research + Writing

Research and writing remain related but distinct.

### 6.1 Research

The research page organizes work around four active clusters:

1. Models and data
2. Agents, memory, and authority
3. Outcome truth and long-horizon evaluation
4. Agents in the physical world

Each cluster contains:

- one plain-language question;
- one current position;
- evidence or artifacts;
- related authored work;
- one explicit uncertainty.

The page is not a comprehensive public dump of Waldo Brain. Private notes may inform public work, but only source-reviewed, privacy-safe, clearly authored material is published.

### 6.2 Authored work

The writing system supports these formats without creating separate microsites:

- Essay
- Research Note
- Field Note
- Explainer
- Book or Chapter
- Course or Lesson

The initial site publishes only formats with complete material. Books and courses appear when a visitor can read an excerpt, chapter, syllabus, or lesson—not as empty “coming soon” products.

### 6.3 Editorial shape

Technical depth follows a readable rhythm:

1. A lived event, concrete failure, or observed system behavior
2. One governing question
3. One useful distinction or diagram
4. Evidence and sources
5. Where the explanation breaks or remains uncertain
6. Current judgment
7. An open question or next experiment

Articles remain readable without client JavaScript. Exhaustive taxonomies, source tables, and benchmark details move to appendices or future atlases rather than interrupting the core path.

## 7. Reading

`/reading` is a personal intellectual record, not a recommendation engine.

### 7.1 Scope

The page may contain:

- books;
- research papers;
- essays and blogs;
- films and anime;
- design references;
- places or experiences that changed Shivansh's judgment.

### 7.2 Entry structure

Every entry requires:

- exact title and creator;
- kind;
- a concise personal annotation;
- the idea or tension that stayed;
- a connection to Shivansh's work or worldview where genuine;
- a public source link when appropriate;
- optional date read, watched, or revisited.

External descriptions may supply bibliographic facts, but the annotation must be Shivansh's own. The site must not invent preferences, quote copyrighted work at length, or mine private browsing history.

### 7.3 Presentation

Use a chronological or deliberately ordered editorial list. Mono metadata and serif annotations create the hierarchy. Entries may reveal a longer note progressively, but the page does not require cover art or heavy client interaction.

The page begins small. The initial confirmed books can include *The Power of Your Subconscious Mind*, *Atomic Habits*, and *Moneyball* only after Shivansh confirms what each changed for him. Films and anime follow the same rule.

## 8. About

The About page remains the place where work, worldview, and ordinary life meet.

Required sequence:

1. The Pokédex origin and systems curiosity
2. Learning by building
3. The working personal compass
4. The longer horizon toward physical AI
5. Selected influences linking into Reading
6. A date-stamped Now note
7. Contact

The page should feel candid and first-person. It must not use `polymath` as a headline claim; breadth should be visible through the connected work and influences.

## 9. Venture and experience

The Waldo page remains a founder narrative with technical depth, not a rendered pitch deck. It distinguishes internal foundations from external product and market validation.

Experience remains an editorial chronology rather than an animated résumé. Team outcomes and personal contribution stay separate. Registrations and attendance remain separate measures.

Neither page adopts the Reading page's personal-annotation structure where it would weaken evidence or clarity.

## 10. Visual language

### 10.1 Design position

The visual direction is **a cinematic signal field with a living research notebook**.

Adopt from Earendil:

- one persistent environmental identity;
- a stable viewport frame and consistent gutters;
- serif voice paired with mono evidence;
- native scrolling and short fades;
- calm reading surfaces that veil the environment;
- a very small motion vocabulary.

Adapt into Shivansh's identity:

- cellular behavior instead of an ocean;
- signal, memory traces, and interference instead of stars;
- black and warm cream with the existing green as a controlled live-state accent;
- one ownable signal/cell hover glyph rather than Earendil's star;
- diagrams and artifacts as evidence rather than decorative science-fiction interface elements.

Reject:

- copying Earendil's ocean, emblem, fonts, or exact layouts;
- always-on full-site WebGL;
- hidden primary navigation;
- monochrome-only treatment;
- giant repeated editorial headings;
- ornamental scanlines, RGB splitting, or glitch effects that reduce readability.

### 10.2 Typography

- Expressive serif communicates questions, voice, and lived narrative.
- Mono communicates dates, status, provenance, controls, and compact metadata.
- One cinematic statement per page may use display scale; subsequent headings remain editorial.
- Long prose uses a comfortable reading size and measure rather than mono body text.

### 10.3 Motion

The motion vocabulary is limited to:

- slow ambient signal movement;
- short opacity or clip transitions;
- one restrained signal-lock hover/focus response;
- occasional transition interference that never obscures content.

Native scrolling is the default. No long pinned reading sequences, page-wide smooth-scroll dependency, continuous floating decorations, or unrelated section animations return.

## 11. Rendering and performance

- Use at most one rich canvas on the homepage at a time.
- Restrict the rich scene to capable desktop devices and the hero/front-door context.
- Resolution-scale and frame-cap the background; pause when hidden or well outside the viewport.
- Articles, Research, Reading, About, and Experience use static grain or paper texture rather than continuous WebGL.
- Mobile, reduced-motion, reduced-data, low-tier GPU, and WebGL-failure states receive a still poster or static texture.
- Decorative textures remain below contrast thresholds and are veiled beneath small metadata.
- Preserve meaningful server-rendered HTML before client JavaScript.
- Heavy visual modules remain isolated from editorial route bundles.

The design must feel more atmospheric without reintroducing the lag previously observed around About and article sections.

## 12. Content model and data flow

Structured metadata remains centralized in the typed portfolio data layer. Long-form authored work remains MDX-backed.

### 12.1 Reading record

A public reading record supports:

- slug;
- title;
- creator;
- kind: book, paper, essay, blog, film, anime, design, place;
- concise annotation;
- lasting question or idea;
- optional connection to work;
- optional external URL;
- optional date;
- publication state: public, draft, historical, excluded;
- optional image and alt text.

Homepage and About previews select only public entries through shared helpers. Draft and excluded entries must never enter rendered collections, metadata, feeds, or generated AI-readable files.

### 12.2 Authored work record

Writing metadata supports the format labels in section 6.2, publication state, updated date, reading time, research cluster, and optional Substack URL.

The portfolio URL remains canonical. If an essay is cross-posted to Substack later, the portfolio stores the relationship and presents Substack as a subscription/distribution option rather than replacing the canonical archive.

### 12.3 Waldo Brain boundary

No automatic ingestion is added. Publication is an editorial process:

1. identify a safe source or idea in Waldo Brain;
2. separate observed fact, source claim, inference, hypothesis, and direction;
3. remove private paths and restricted context;
4. create an original public piece;
5. verify sources, claims, and rendering;
6. deliberately mark it public.

Private Waldo Brain paths, applications, outreach, contact records, messages, transcripts, health data, calendars, and internal product discussions never render publicly.

## 13. Accessibility and fallback behavior

- Preserve the existing skip link, landmarks, heading order, visible focus, and direct navigation.
- Decorative canvas and textures are hidden from assistive technology.
- Every hover interaction has focus and touch parity.
- Reading disclosures, if used, rely on semantic controls and remain keyboard accessible.
- External links are visibly marked and announced.
- Missing optional images do not collapse a page or prevent an entry from rendering.
- A failed canvas never hides hero copy or navigation.
- Invalid writing or reading slugs use the existing not-found behavior.
- Reduced motion delivers the complete content with no timing-dependent reveal.

## 14. Testing and acceptance

Implementation is complete only when:

1. Structural tests cover canonical routes, the homepage order, public reading selection, publication-state filtering, and absence of excluded content.
2. The repetitive three-card Curiosity section is absent and the connected research path is present.
3. TypeScript, relevant tests, production build, changed-file formatting, and `git diff --check` pass.
4. Direct loads of Home, Waldo, Research, Writing, one article, Reading, Experience, and About return successful pages.
5. Desktop and mobile rendered reviews cover layout, overflow, text fit, navigation, Reading entries, and the signal-field fallback.
6. Reduced-motion and low-capability policy is deterministically tested and visually reviewed where tooling permits.
7. Editorial routes do not load the homepage WebGL, custom cursor, or transition machinery.
8. No private Waldo Brain path or excluded source appears in generated HTML, RSC payloads, metadata, feeds, public text files, or client bundles.
9. Homepage height, client JavaScript, canvas count, and article bundle size do not regress beyond an explicitly reviewed threshold.
10. The local development server is restored after production-build verification.

## 15. Delivery boundaries

### Current implementation scope

- Establish the shared Signal Observatory visual shell and fallbacks.
- Redesign the Models -> Agents -> World homepage section.
- Add the compact Reading preview and `/reading` route.
- Refine the homepage writing, experience, and personal-compass flow.
- Align Research, Writing, About, Experience, and Waldo with the quieter editorial frame.
- Add only confirmed public reading entries.

### Deferred until source-ready

- A complete 40+ Harness Atlas
- Full books and courses
- Substack synchronization or subscription integration
- Automatic import from Waldo Brain
- A CMS, database, or authenticated reader account
- Public application or private-note archives

### Publication boundary

All work remains local until Shivansh separately approves push or deployment.
