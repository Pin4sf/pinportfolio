# Earendil portfolio design dissection

**Captured:** 2026-08-21

**Source class:** public web / first-party website and first-party source repository

**Reference:** [earendil.com](https://earendil.com/)

**Source snapshot:** [`earendil-works/website` at `2bc95a0`](https://github.com/earendil-works/website/tree/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774)
**Scope:** design and implementation reference for Shivansh Fulper's founder + AI systems researcher portfolio. No private sources, authenticated surfaces, tracking identifiers, or contact enrichment were used.

## Executive read

Earendil's strength is not “TV static” by itself. Its strength is that one atmospheric world, one short sentence, one typographic contrast, and one four-corner frame survive across the entire site. The visual effect is a grayscale WebGL ocean and sky with animated film grain—not a video and not a conventional CRT scanline overlay. Content pages then place a nearly opaque reading veil over that same world instead of replacing it. This makes the experience feel continuous while keeping the writing legible.

The right direction for Shivansh's portfolio is to adapt that discipline, not clone the site:

- keep a cinematic, analog-signal atmosphere as a persistent identity layer;
- retain a visible founder/research information architecture and evidence trail;
- use expressive serif for ideas and mono for provenance, status, dates, and controls;
- return to native, quiet scrolling and restrained opacity transitions;
- make the effect lightweight, bounded, and optional—especially on research pages and mobile.

The homepage should remain more informative than Earendil's one-sentence landing page. Accelerator reviewers and fellowship evaluators need to find Waldo, research, experience, and writing without opening a hidden menu or decoding an art direction.

## Method and confidence

I inspected the live site in light and dark modes at 1280 × 720 and 390 × 844, opened the desktop and mobile menus, and reviewed the homepage, Purpose, Values, Posts, and a long-form post. I also inspected the HTML, CSS, JavaScript, assets, templates, and static build source delivered by Earendil's public repository.

Confidence labels:

- **High:** directly visible on the live site and corroborated by delivered source.
- **Medium:** supported by source or visual evidence, but interpretation or device variance remains.
- **Low/uncertain:** not verifiable without the authors' intent, assistive-technology testing, or broader hardware profiling.

## 1. Information architecture and page sequence

### Observed — high confidence

The site is a small company site, not a personal portfolio:

1. **Home:** a single viewport with a two-line product thesis. The sentence links directly to Pi, Lefos, and the public GitHub organization. There is no project grid, timeline, testimonial, or feed on the landing page. [Live homepage](https://earendil.com/) · [home template](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_templates/index.html#L1-L9)
2. **Purpose:** the founding charter, expressed as four concise principles rather than a company history. [Purpose](https://earendil.com/purpose/)
3. **Values:** two groups—values and operating principles—presented as collapsed disclosures. [Values](https://earendil.com/values/)
4. **Join Us:** an intentionally minimal hiring page. [Join](https://earendil.com/join/)
5. **Posts:** a chronological index with dates in mono and titles in italic serif. [Posts](https://earendil.com/posts/) · [posts template](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_templates/posts-index.html#L1-L30)
6. **Post detail:** framed like correspondence—Date, From, To, Subject—followed by readable serif prose. [Example post](https://earendil.com/posts/what-is-a-harness/)
7. **Persistent controls:** emblem at upper left, Menu at upper right, company name at lower left, language and appearance controls at lower right. The menu separates internal pages from external product/work links. [layout template](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_templates/layout.html#L72-L124)

### Why this hierarchy works

The site separates four questions cleanly: what the company makes, why it exists, how it behaves, and what it thinks. There is almost no repeated summary copy between those layers. Products are named on the homepage; worldview lives in Purpose and Values; evidence of thought lives in Posts; open work lives on GitHub.

### Adaptation for Shivansh

Keep the portfolio's visible destinations—**Waldo, Research + Writing, Experience, About, Contact**—because the audience and task differ. Borrow Earendil's separation of concerns:

- **Home:** identity, current venture, research direction, selected evidence.
- **Waldo:** product question, present state, evidence, and boundaries.
- **Research + Writing:** questions and essays rather than duplicate summaries.
- **Experience:** chronological proof.
- **About:** worldview, personal compass, and life beyond work.

Do not create separate “Purpose” and “Values” pages unless there is enough lived material to justify them. For a personal portfolio, those ideas should be visible in the work and About narrative.

## 2. Typography and scale

### Observed — high confidence

Earendil uses two type voices:

- **Departure Mono** for interface chrome, metadata, lists, email headers, dates, and compact content.
- **PlantinNow** for the homepage thesis, prose, post titles, and expressive headings.

The shared type system defines 13–36 px primitives, a 15 px UI/body role, an 18–20 px fluid reading role, and a 20–40 px fluid hero role. The live homepage measured about 33 px at 1280 px wide and 22 px on the 390 px mobile viewport. [type tokens](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_static/styles.css#L15-L60)

The homepage thesis is centered, italic, regular weight, balanced, and anchored just above the generated horizon. It is not oversized. The visual hierarchy comes from white space and type contrast, not 10–15vw headlines. [hero typography](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_static/styles.css#L472-L503)

Long-form posts switch to PlantinNow at 18–20 px with 1.6 line height, while the correspondence header remains mono. [reading typography](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_static/styles.css#L947-L1011) The posts index uses mono dates paired with 20 px italic serif titles. [posts typography](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_static/styles.css#L1038-L1105)

### Adaptation

- Keep the portfolio's expressive serif, but stop using maximum size as the default signal of importance.
- Use mono for claim status, dates, source labels, project metadata, and navigation—not for long paragraphs.
- Let important claims occupy one or two balanced lines with large surrounding silence.
- Use scale contrast selectively: one cinematic statement per page, then normal editorial reading sizes.

## 3. Grid and layout

### Observed — high confidence

The layout is governed by a small tokenized frame:

- 75 px inline and block gutters on desktop;
- 40 px under 800 px;
- 28 px under 520 px;
- a centered reading column capped at 760 px;
- four fixed chrome anchors around the viewport on desktop.

The stylesheet explicitly separates canvas, emblem, content, chrome, and dropdown layers. [frame and layer model](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_static/styles.css#L1-L60) The homepage has no scroll at the tested desktop and mobile sizes. Content pages return to ordinary document flow inside the centered column, with the ambient canvas fixed behind them. [content surface](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_static/styles.css#L326-L390)

The most refined detail is the connection between content and scene: JavaScript computes the rendered ocean horizon and publishes its pixel position to CSS; the hero sentence is anchored to that horizon rather than merely centered in the viewport. [horizon token](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_static/styles.css#L42-L50) This is why the hero feels composed instead of floating.

### Adaptation

Use one shared frame across every portfolio route. The header, progress/state label, section margins, and footer should align to the same gutters. For cinematic sections, attach text to a meaningful feature of the visual scene or grid. Do not place large text and effects independently.

## 4. “TV static,” noise, CRT, color, and imagery

### Observed — high confidence

The live night theme contains:

- a monochrome star field;
- a ray-marched ocean and horizon;
- animated, full-frame film grain;
- a small star-like emblem;
- paper texture on readability surfaces and menus.

The fragment shader explicitly generates waves, noise, stars, and film grain. The grain converts the rendered image to grayscale and adds time-varying Gaussian noise in the same draw pass. [shader setup](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_static/script.js#L831-L875) · [film grain](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_static/script.js#L1138-L1159)

The effect is therefore **analog film/static**, not a literal CRT simulation. I found no visible horizontal scanline layer, RGB separation, barrel distortion, bloom fringe, or `<video>` element. Calling it “CRT” would be an interpretation, not an observed implementation.

The palette is nearly monochrome. The CSS bases are `#1a1a1a` in night mode, `#b8b8b8` before the light shader paints, `#353431` for light text, `#faf9f6` for the paper surface, and `#2e2d2b` for its night equivalent. Content pages use a fixed radial veil that is almost opaque in the reading center and gradually reveals the ocean at the edges. [reading veil and theme colors](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_static/styles.css#L326-L373)

### Inference — medium/high confidence

The star, open horizon, and ocean form a single brand world. Earendil's public GitHub identity describes itself as “Bearer of Light,” so the celestial/maritime scene is likely semantic rather than decorative randomness. The restrained copy, emblem, and environment all point toward the same idea: a small human signal inside a large technological horizon.

### Adaptation

For Shivansh, the corresponding world should be **signal, memory, and consequence**, not Earendil's ocean:

- retain the original portfolio's cellular/noise vocabulary as a very low-opacity signal field;
- introduce faint analog grain or occasional interference at scene transitions;
- use the existing green as the single “live signal” accent against grayscale;
- let diagrams, source fragments, or memory traces appear as evidence—not decorative sci-fi HUD furniture;
- keep research/article surfaces calm and nearly opaque so the effect becomes peripheral texture.

Do not copy the ocean, star emblem, or exact black-and-white treatment. Those are Earendil's identity.

## 5. Cursor and navigation

### Observed — high confidence

Earendil does **not** use a custom following cursor. The root cursor is native `auto`; links use the native pointer. Hover character comes from a 15 px star pseudo-element that appears and rotates next to a link, paired with a dotted underline. Reduced-motion CSS keeps the star but stops its rotation. [link interaction](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_static/styles.css#L697-L758)

Desktop navigation opens as a right-aligned vertical list beneath “Menu.” On content pages, the implementation detects whether that list overlaps the reading column and adds a textured backdrop only when needed. Mobile navigation becomes a fixed panel with an opaque paper surface on the right, fading to transparent over the left half so the scene remains visible. [mobile menu surface](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_static/styles.css#L1736-L1866)

The mobile menu locks body scroll, provides 44 px targets, supports Escape, and traps Tab focus within the menu. [menu behavior](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_static/script.js#L51-L168)

### Adaptation

- Prefer a native cursor plus one memorable hover glyph over a full custom cursor.
- Preserve direct desktop access to the portfolio's primary destinations. A hidden menu may be atmospheric, but it raises discovery cost for evaluators.
- A compact menu can hold secondary destinations and personal fragments.
- Carry one interaction motif—signal pulse, rotating cell, or interference tick—across nav, writing links, and evidence cards.

## 6. Scroll, transitions, and motion

### Observed — high confidence

There is no custom smooth-scrolling layer and no scroll-linked hero choreography. The homepage is one viewport; long pages use native scrolling.

Internal navigation is enhanced with HTMX. Only `.page` is replaced, so the canvas and four-corner chrome remain continuous. New navigation scrolls to the top; browser history restores remembered per-path scroll positions. Content-to-content transitions fade only the reading surface, avoiding a flash in the ambient background. [HTMX shell and scroll memory](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_templates/layout.html#L124-L240)

Motion is narrow and purposeful:

- 150–220 ms leave fades and 300–520 ms enter fades;
- a 900 ms day/night blend;
- a 150 ms delayed, 900 ms emblem reveal;
- 240 ms mobile menu enter and 180 ms exit;
- rotating hover stars;
- click-generated ocean ripples, capped at ten and expired after twelve seconds;
- optional viewport-triggered code reveals in technical posts.

The click ripple and single-pass frame rendering are explicit in the source. [ripple and render loop](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_static/script.js#L1674-L1763)

### Adaptation

Restore atmosphere, not scroll machinery. Use native scroll, opacity/clip transitions, and one or two interaction moments. Do not return to page-wide Lenis + many ScrollTriggers if the portfolio has already exhibited lag around About and articles.

## 7. Responsive behavior

### Observed — high confidence

At 390 × 844:

- the homepage remains one viewport with no horizontal overflow;
- hero type is 22 px, balanced into four lines above the horizon;
- gutters reduce to 28 px;
- the emblem and Menu remain in the upper corners;
- the footer becomes relative rather than fixed;
- the menu occupies the viewport and preserves 44 px touch targets;
- the ocean/static canvas still renders—it is not disabled on mobile.

The CSS changes footer positioning, reading width, fixed-header veils, mobile menu layout, and chrome size under 800 px. [responsive rules](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_static/styles.css#L1736-L1924)

### Adaptation

Unlike Earendil, Shivansh's site should use a static poster/noise texture on small or low-capability devices. The portfolio has more sections, more imagery, and more UI; the same full-screen render budget would carry greater risk.

## 8. Technical implementation clues

### Observed — high confidence

- The public source is a custom static site generator: Python, MiniJinja, YAML frontmatter, Markdown, and Pillow-generated social cards. [build source](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/build.py#L1-L54)
- The live site is served from GitHub Pages and ships complete semantic HTML before JavaScript.
- HTMX performs partial navigation; DOMPurify and a custom i18n runtime are also shipped. [layout scripts](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_templates/layout.html#L124-L240)
- The background is raw WebGL, not Three.js. One fixed canvas performs a single full-screen draw per rendered frame. [canvas initialization](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_static/script.js#L454-L504) · [single-pass render](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_static/script.js#L1729-L1763)
- The source snapshot's core uncompressed assets are roughly 629 KB before generated page-specific images: about 45 KB CSS, 10 KB prose CSS, 61 KB runtime JS, 50 KB HTMX, 21 KB DOMPurify, 15 KB i18n, 226 KB paper textures, and 200 KB of the three preloaded fonts.
- Atom and RSS feeds plus page-specific social metadata are built into the shell. [metadata and feeds](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_templates/layout.html#L16-L59)

## 9. Performance implications

### Strengths — observed, high confidence

- Static HTML and native scroll keep content delivery simple.
- The canvas renders below CSS size: quality tiers use 0.25–0.40 scale (0.425–0.68 on low-DPI displays), then rebuild the shader when sustained FPS falls below 28 or rises above 55. [quality tiers](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_static/script.js#L477-L546) · [adaptive quality](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_static/script.js#L1324-L1361)
- On content pages, the ocean eventually moves at 15% speed, grain at 75%, renders at 15 FPS, and uses half the already reduced resolution. [ambient budget](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_static/script.js#L512-L540) · [content-page throttling](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_static/script.js#L1439-L1534)
- The current renderer combines ocean and grain into one pass rather than using multiple intermediate full-screen textures.

### Risks — observed/inferred, medium/high confidence

- Ray marching, wave iterations, procedural stars, and time-varying grain still create a continuous GPU cost on the homepage and mobile.
- The effect remains animated under `prefers-reduced-motion`; it slows rather than stops. That is a deliberate source decision, but a stricter portfolio implementation should offer a still frame.
- Three fonts and both paper textures are eagerly preloaded on every page, including pages that do not immediately need all variants.
- The code initializes WebGL without an explicit `gl === null` branch before later GL calls. If WebGL is unavailable, the semantic page remains, but the visual runtime may throw and the canvas never becomes visible. This fallback behavior was inferred from source and not forced in the live browser.
- The site continuously requests animation frames even when content-page drawing is capped; most callbacks exit early, but the loop remains active.

## 10. Accessibility implications

### Strengths — observed, high confidence

- Complete semantic text is server-rendered.
- Navigation has an accessible label; the menu button exposes `aria-expanded` and `aria-controls`.
- Mobile navigation locks background scrolling, supports Escape and cyclical keyboard focus, and uses 44 px targets.
- Theme and language controls have accessible labels and the language menu uses listbox semantics.
- Reduced-motion rules remove short transition durations and hover-star rotation.
- Article images are constrained responsively; text uses balanced headings, pretty wrapping, and widow/orphan controls. [content typography](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_static/styles.css#L1351-L1408)

### Risks/uncertainties

- **Observed, medium confidence:** the full-screen decorative canvas has no `aria-hidden="true"` in the public template. It is not focusable and carries no fallback text, but assistive-technology exposure was not tested. [canvas markup](https://github.com/earendil-works/website/blob/2bc95a014a9d180bd0fab3ee5be8ce345f9ef774/_templates/layout.html#L72-L80)
- **Observed, high confidence:** there is no visible skip link in the shared template.
- **Observed, medium confidence:** external menu links open new tabs but have no visible per-link external indicator; they are only grouped under an “External links” accessible label.
- **Uncertain:** small, partially transparent 15 px dates and controls should receive an automated and manual contrast audit in both shader states.
- **Observed, high confidence:** the menu is hidden until JavaScript runs. Core content remains available, but the internal navigation is not progressively enhanced when script execution fails.
- **Observed, medium confidence:** slowing continuous spatial motion may not be sufficient for every reduced-motion user.

## 11. What makes the experience coherent

1. **One sentence, one scene.** The homepage thesis names the products while the scene provides emotional scale.
2. **The environment persists.** Navigation replaces content, not the world behind it.
3. **The effect yields to reading.** A radial paper veil, narrower column, slower motion, and reduced frame rate make articles feel like part of the same site without forcing prose to compete with the ocean.
4. **Two typefaces have stable jobs.** Mono means interface/evidence; serif means voice/ideas.
5. **Every screen uses the same frame.** Four anchors, shared gutters, and one content width remove layout drift.
6. **Motion has a small vocabulary.** Fade, ripple, spin, and slow ambient movement recur; there are no unrelated section gimmicks.
7. **The worldview is explicit.** Purpose, values, open work, and technical posts support the visual seriousness with public evidence.

## 12. Adopt, adapt, reject

| Decision | Pattern | Application to Shivansh's portfolio |
|---|---|---|
| **Adopt** | Persistent environmental identity | A subtle signal/memory field that survives route changes. |
| **Adopt** | Serif voice + mono evidence | Serif for questions and lived narrative; mono for dates, claim states, sources, and UI. |
| **Adopt** | Shared four-edge frame | One set of gutters and anchors across Home, Waldo, Research, Writing, Experience, and About. |
| **Adopt** | Calm reading veil | Editorial pages largely mask the ambient layer while allowing slight texture at the edges. |
| **Adopt** | Native scroll and short fades | Remove avoidable scroll orchestration; use opacity/clip transitions only where they clarify continuity. |
| **Adapt** | Film grain/static | Use a faint, low-frequency analog layer tied to “signal,” with the existing green as a live-state accent. |
| **Adapt** | One-screen thesis | Keep a concise hero, then continue into selected evidence because the portfolio has evaluator tasks Earendil does not. |
| **Adapt** | Hidden menu | Use it for secondary/personal material, but keep primary research/venture navigation visible on desktop. |
| **Adapt** | Hover star | Replace with one ownable cellular/signal glyph; keep native cursor and focus/touch parity. |
| **Adapt** | Continuous canvas | Restrict the rich scene to the hero or section boundaries; static fallback elsewhere. |
| **Reject** | Copying the ocean/star world | It belongs to Earendil's brand and would weaken Shivansh's own cellular/memory language. |
| **Reject** | Full-site active WebGL on mobile | Conflicts with the portfolio's demonstrated lag sensitivity and denser information architecture. |
| **Reject** | Monochrome-only palette | Preserve black/cream as the field, but retain the existing green as a disciplined signature. |
| **Reject** | Hiding all purpose behind atmosphere | Founder and fellowship audiences need visible Waldo, research questions, experience, and evidence. |
| **Reject** | Giant repeated editorial headings/cards | A single connected research path should replace repetitive “Models / Agents / World” cards. |

## 13. Recommended final-form direction

Call the direction **a cinematic signal field with a living research notebook**.

### Front door

- One concise founder/researcher statement.
- A restrained cellular/static environment derived from the original portfolio.
- Visible routes to Waldo, Research + Writing, Experience, and About.
- One small status line: what Shivansh is building and investigating now.

### Homepage flow

1. Quiet cinematic hero.
2. **Waldo**—simple heading, present question, one evidence image, one primary link.
3. **From capability to consequence**—one connected Models → Agents → World path, not three repeated cards and links.
4. Selected writing with date, question, status, and a one-sentence lived opening.
5. Selected experience/evidence.
6. Personal compass preview.
7. Contact.

### Effect budget

- **Capable desktop, hero:** bounded shader or canvas, resolution-scaled and frame-capped.
- **Desktop articles:** static grain/paper texture; no continuous WebGL required.
- **Mobile, reduced motion, reduced data, low capability:** still poster plus optional non-animated noise.
- Pause rendering when hidden and stop it once the rich hero is far outside the viewport.
- Keep the static layer below text contrast thresholds and never use it behind small metadata without a veil.

This preserves what the user misses from the original portfolio—the technological atmosphere and tactile analog signal—while keeping the evidence-led architecture serious, readable, and fast.

## Evidence boundaries and open questions

- **Observed:** Earendil is a company site, so its minimal information architecture should not be treated as proof that the same degree of omission will work for a personal founder/research portfolio.
- **Observed:** the “static” is film grain over a generated ocean/sky; no CRT scanlines were found.
- **Inference:** the celestial/maritime environment embodies Earendil's “Bearer of Light” identity. The authors' private design rationale was not available.
- **Uncertain:** no cross-device laboratory performance profile, screen-reader session, or forced WebGL-failure test was performed.
- **Uncertain:** current source and live deployment matched during inspection, but future changes can diverge; recommendations are anchored to commit `2bc95a0` and the 2026-08-21 live state.
