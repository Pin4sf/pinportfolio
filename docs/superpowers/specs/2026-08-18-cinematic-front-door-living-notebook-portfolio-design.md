# Cinematic Front Door, Living Notebook Portfolio Design

**Date:** 2026-08-18

**Status:** Awaiting written-spec review

**Scope:** Local portfolio redesign; no push or deployment

## 1. Objective

Rework Shivansh Fulper's portfolio into one coherent founder, AI-systems researcher, and engineer identity. The public experience should preserve the current memorable visual shell while gaining the depth, informality, and connected evidence of a personal knowledge garden.

The site must support two reading modes:

1. A fast reviewer can understand who Shivansh is, what he is building, and why his work matters in under two minutes.
2. A curious founder, researcher, fellowship reviewer, or collaborator can follow links into research, artifacts, lived stories, and personal influences without encountering a résumé dump or private vault material.

The organizing thread remains `Models -> Agents -> World`, presented as an evolving order of curiosity rather than a predetermined career plan.

## 2. Design position

The redesign uses a hybrid model:

- **Cinematic front door:** oversized serif identity, dark cellular atmosphere, restrained green accent, viewport frame, careful hover states, and a small number of purposeful transitions.
- **Living notebook behind it:** fast editorial pages, link-rich first-person prose, annotated artifacts, readable research notes, dated field notes, and a small personal shelf.

The portfolio will not imitate the plain visual styling of the reference site. It borrows its information architecture and sense of a lived-in personal archive.

## 3. Public narrative

The public narrative has four layers, always in this order:

1. **What I am building:** Waldo and Kennel.
2. **What I learned by doing:** models and data, production agents, harnesses, memory, evaluation, and physical systems.
3. **What I believe:** machine execution should reduce what a person must carry; memory must remain correctable; authority must not silently expand; evidence matters more than plausible completion; design should make powerful systems legible.
4. **Who I am outside the thesis:** the Pokédex origin, jailbreaking and systems curiosity, HackByte, Japan, books, films or anime supplied by Shivansh, design engineering, and ordinary life.

The word `polymath` will not be a primary claim. Breadth should be inferred from the connected trail of work and interests.

## 4. Information architecture

### 4.1 Primary navigation

- Venture
- Research + Writing
- Experience
- About
- Contact

The homepage keeps anchor navigation where useful. Dedicated pages use the same labels and visual language.

### 4.2 Public routes

- `/` — cinematic overview
- `/work/waldo` — venture and product evidence
- `/research` — research questions, essays, experiments, and source-backed notes
- `/writing` — complete writing archive; linked from the Research + Writing surface
- `/writing/[slug]` — individual essays
- `/experience` — readable chronology and artifacts
- `/about` — personal, link-rich biography and annotated shelf

The existing `/projects/waldo` compatibility route may remain, but `/work/waldo` is canonical. EcoFresh and OneSync do not return to primary navigation.

An independent Harness Atlas is explicitly deferred until the corpus is frozen and source-audited.

## 5. Homepage

The homepage should be materially shorter than the current 11,000-pixel composition. Its target is approximately six sections with no pinned long-form reading experience.

### 5.1 Hero

Preserve the current visual composition and copy hierarchy:

> Shivansh Fulper
>
> I'm building the agent that stays on your side.

The supporting line may identify Waldo, AI systems research, and IIITDM Jabalpur, but the hero must not add a CTA cluster, manifesto, or evidence vocabulary.

### 5.2 Now

A compact Waldo module answers:

- what is being built;
- which human problem motivated it;
- what exists today;
- where to see the venture, founder video, and case study.

The module must distinguish built internal foundations from market validation. The pitch deck is not promoted until its team and product-language review is complete.

### 5.3 The thread

A compact visual replaces retrospective trajectory prose:

| Models | Agents | World |
| --- | --- | --- |
| How is capability made? | What happens when capability can act? | What changes when actions have physical consequences? |
| Project EKA, Qwen3 MoE | Atlan, Waldo, harness research | Smart Manufacturing, Industry 4.0, physical AI direction |

Each column links to a relevant research or experience surface. The visual carries the relationship; no paragraph explains why the section exists.

### 5.4 Selected research and writing

Feature three pieces with one-line human openings:

1. An agent said "done." What actually became true?
2. Memory is not storage when an agent lives with you.
3. I compared more than 40 harnesses. What kept recurring?

Cards use standard links and remain server-rendered. No 3D card rotation, blur-heavy surfaces, or scroll-trigger dependency is allowed.

### 5.5 Selected chapters

Show a compact subset of the experience chronology:

- Atlan
- Project EKA
- Smart Manufacturing
- HackByte
- MIRAI-Setu

Each entry uses the same grammar: event, contribution, artifact, question left behind. The full chronology lives at `/experience`.

### 5.6 Things that shaped me

A small editorial strip previews three to five personal influences. Phase-one confirmed material may include the Pokédex origin, systems tinkering, Japan, and design engineering. Books, anime, and films appear only after exact titles and personal annotations are confirmed.

### 5.7 Contact

Keep a direct contact close with public profiles and no elaborate form flow. The page should end quickly after the invitation.

## 6. Venture page

The Waldo page is a founder narrative with technical depth, not a pitch deck rendered as a website.

Required sequence:

1. One-sentence human problem.
2. Founder observation from production-agent work.
3. Waldo and Kennel product relationship.
4. What is built and internally demonstrated.
5. What remains hypothesis, direction, or unvalidated.
6. Product images and founder video.
7. Technical brief and public source links.
8. Research questions produced by building the product.
9. Team presentation after source reconciliation.

Health and body data remain optional permissioned context, not the product category or a prerequisite.

## 7. Research + Writing page

The research surface is organized around four live questions:

1. Agent runtimes and harnesses
2. Memory, state, correction, and forgetting
3. Outcome truth and long-horizon evaluation
4. Agents acting in the physical world

Each research cluster contains:

- a plain-language question;
- one current position;
- relevant essays;
- inspectable code or artifacts;
- public primary sources;
- an explicit uncertainty or next experiment.

Evidence status stays in structured content, but visible labels appear only where they materially distinguish built work from hypothesis, history, or direction.

### 7.1 Essay editorial shape

Flagship essays follow a common rhythm:

1. Lived event or concrete failure
2. One governing question
3. One useful distinction or diagram
4. What the work showed
5. Where the idea breaks
6. Current judgment
7. Open question or next experiment

Technical terminology follows the felt problem. Articles remain readable without JavaScript.

### 7.2 Harness research boundary

The short harness essay can remain public with explicit method and limitations. A visual Harness Atlas requires:

- a frozen dated corpus;
- one comparison rubric;
- primary source URLs for each system;
- original or attributed diagrams;
- Adopt, Adapt, and Reject notes;
- clear separation between comparative research and production deployment.

## 8. About page

The About page uses approximately 70% candid lived narrative and 30% professional editing.

### 8.1 Opening

Start with coding at 12 to build a Pokédex, followed by jailbreaking, rooting devices, and learning systems beyond their defaults. Keep this vivid but bounded to one paragraph.

### 8.2 Learning by building

Connect Smart Manufacturing, HackByte, Project EKA, Atlan, and Waldo through moments and questions rather than résumé transitions.

### 8.3 Personal compass

Present five or six direct first-person principles supported by nearby artifacts:

- Keep meaningful authority with the person.
- Do not confuse a finished run with a completed outcome.
- Personal context should remain correctable, revocable, and user-owned.
- Make powerful systems inspectable.
- Let design make complexity quieter.
- Change the system when reality contradicts the story.

### 8.4 Longer horizon

Explain physical AI as a return to a Smart Manufacturing foundation. Clearly distinguish interest and direction from current robotics deployment or expertise.

### 8.5 Outside the terminal

Use photographs, short captions, and annotated links for Japan, community-building, books, anime or films, technology rabbit holes, and design influences. Do not infer taste from private history. Do not create an unannotated logo or title grid.

### 8.6 Now

End with a short date-stamped note about current work and what Shivansh wants to meet collaborators around.

## 9. Experience page

The dedicated chronology is editorial, not an animated résumé carousel. Every chapter presents:

1. What happened
2. What Shivansh personally did
3. What artifact or public evidence exists
4. What question the chapter left behind

Entries must keep team outcomes separate from individual contribution and registrations separate from attendance.

## 10. Content and source model

The implementation extends the existing typed content model rather than hardcoding prose in presentation components.

Each public artifact should support:

- title;
- kind: venture, research, writing, code, video, field note, life, or source;
- theme: models, agents, world, design, or life;
- date;
- summary;
- public URL;
- related internal route;
- evidence status when required;
- publication state: public, historical, draft, or excluded;
- optional image and caption;
- optional personal annotation.

Private Waldo Brain paths are editorial provenance only. They never render in public HTML, `llms.txt`, metadata, or client bundles.

## 11. Privacy and truth boundaries

- Do not publish raw applications, outreach, contact records, messages, transcripts, health data, calendars, or private archives.
- Applications may supply founder-confirmed facts and story leads, not reusable public documents.
- External posts in Waldo Brain are influences, not endorsements or evidence of Shivansh's work.
- Authored LinkedIn, X, or video posts require exact public URLs before inclusion.
- Historical health-first, OneSync, and EcoFresh material must be labelled, revised, or archived before featuring.
- Do not claim product-market fit, revenue, retention, or external validation without current public evidence.
- Quantum + AI remains outside primary surfaces until meaningful attributable work exists.

## 12. Visual system

Preserve:

- oversized serif display type;
- near-black tactile background;
- fluid or cellular hero atmosphere;
- restrained green accent and warm secondary accent;
- viewport frame;
- subtle link and image interactions;
- Japanese visual references where they are meaningful rather than decorative noise.

Change:

- WebGL is limited primarily to the hero.
- Editorial paragraphs never wait on scroll animations to become readable.
- Long pinned sections, continuous floating decoration, and per-section 3D effects are removed.
- Internal content pages use a narrow readable measure and fast native scrolling.
- Motion communicates hierarchy, navigation, state, or causality; decorative motion is reduced.

## 13. Performance and accessibility

- Homepage content must render meaningful HTML before client JavaScript.
- Writing, research, About, and Experience pages should be server-rendered wherever interaction does not require a client boundary.
- Heavy visual modules load lazily and only when visible.
- Reduced-motion users receive the complete reading experience with no missing content.
- Coarse-pointer and low-tier devices do not initialize cursor-reactive or particle effects.
- All images use meaningful alt text, dimensions or stable aspect ratios, and responsive loading.
- Navigation, focus states, headings, contrast, and article landmarks remain accessible by keyboard and assistive technology.
- Standard navigation links are preferred over custom transition wrappers for content routes.

## 14. Error and fallback behavior

- A failed hero canvas falls back to the existing dark texture and gradient without hiding hero copy.
- Missing optional images do not collapse content or block a route.
- Draft, excluded, or historical artifacts cannot appear in featured collections unless deliberately selected by a public helper.
- External links open safely and visibly indicate when they leave the site.
- Invalid content slugs return the existing not-found experience.

## 15. Verification

Implementation is complete only after:

1. Structural tests cover public routes, publication-state filtering, featured collections, and absence of excluded content.
2. TypeScript, lint, production build, and `git diff --check` pass.
3. Direct article and internal-page routes load without first-navigation failure.
4. Desktop and mobile visual reviews cover the homepage, About, Research + Writing, Experience, and Waldo.
5. Reduced-motion and low-tier fallbacks are reviewed.
6. Homepage section height, DOM size, and shipped client JavaScript are compared with the current baseline.
7. No private Waldo Brain path, application copy, or restricted material appears in the generated output.

Do not run a production build while the development server shares the same `.next` directory. Stop the server, build, then restart it for visual review.

## 16. Delivery phases

### Phase 1 — Public architecture and core content

- Shorten and restructure the homepage.
- Add About, Research, and Experience routes.
- Refactor typed public content and publication-state helpers.
- Rewrite the three flagship research introductions from lived events.
- Reconcile the Waldo page against current product truth.
- Keep the current hero and visual identity.

### Phase 2 — Personal depth and artifacts

- Add confirmed books, anime or films, photographs, and personal annotations.
- Add exact authored public-post and video links.
- Add one design-engineering field note and one Japan field note.
- Refine internal-page motion and transitions after performance review.

### Phase 3 — Research atlas

- Freeze and audit the 40+ harness corpus.
- Design the living Harness Atlas and comparison diagrams.
- Add repeatable source-date and taxonomy maintenance rules.

## 17. Explicit exclusions

- No CMS, database, or environment variables.
- No automatic ingestion from Waldo Brain or personal accounts.
- No public application archive.
- No new quantum research claims.
- No automatic book, anime, film, or browsing-history inference.
- No push, deployment, or production change without separate approval.
