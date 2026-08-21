# Signal Observatory portfolio — implementation report

Date: 2026-08-21

Branch: `codex/signal-observatory-portfolio`

Baseline: `42b334b`

Final implementation: `b5898e6`

## Outcome

Implemented the approved Signal Observatory redesign as Shivansh Fulper's canonical personal portfolio: a quiet, cinematic homepage signal field; a connected Models → Agents → World research direction; typed/public-only writing and Reading records; server-rendered editorial routes; and machine-readable public truth with generated-output privacy and bundle-isolation acceptance.

The work remained inside this isolated worktree. Nothing was pushed, deployed, merged, opened as a PR, or written to the original checkout.

## Delivered surfaces

- Home follows Hero → Waldo → Research direction → Selected writing → Reading preview → Selected experience → Personal compass → Contact.
- The hero keeps the exact line “I’m building the agent that stays on your side.” and uses at most one capability-gated canvas on capable desktop.
- Mobile, tablet, reduced-motion/data policy, low GPU, and renderer failure paths retain the complete static signal poster and content.
- `/reading` is a canonical, annotated intellectual record using only confirmed public entries and explicit internal/external source modeling.
- Research, Writing, one article, Reading, Experience, About, and Waldo use the quiet server-rendered editorial notebook and static texture.
- Authored work supports all six typed formats while exposing filters only for complete public formats.
- Public identity, sitemap, agents/LLM text, publication state, route truth, privacy scanning, and editorial bundle isolation are locked by tests.

## Commit record

- Plan: `cf43ad3`
- Reading/publication contracts and route: `eaa8cb4`, `a7ba92c`
- Homepage composition and structural hardening: `876752c`, `a68d005`, `14214ae`
- Signal-field isolation and renderer lifecycle: `fcf61d4`, `a33b615`, `90b7b14`
- Editorial notebook, server-rendered Waldo, and test hardening: `3a9b652`, `a9fd28b`, `ffd5207`, `ebe731d`, `1e96529`, `89e8ae1`
- Machine truth, privacy, prerender, and bundle graph acceptance: `61e7b35`, `71d35d3`, `d410027`, `5d223fe`, `5fb4c89`
- Whole-branch review fixes: `1c60b76`
- Browser acceptance correction: `b5898e6`

## Final verification

All authoritative final checks passed against the final source/build:

- `npm test` — 106/106 passed.
- `npx tsc --noEmit` — passed with no diagnostics.
- Whole-branch `prettier --no-config --check` — passed.
- `npm run build` — compiled and generated 19/19 pages.
- `node --test tests/generated-output.test.mjs` — 8/8 passed.
- `npm run lint` — exit 0.
- `git diff --check` — passed.
- Fresh build sizes: Home 6.07 kB / 97.4 kB first-load JS; article 577 B / 91.9 kB.

The first post-dev `npm test` attempt correctly refused three generated-output checks because Next dev had replaced the production `.next/BUILD_ID`; the other 103 tests passed. A fresh production build was created, after which the authoritative full run passed 106/106 and the dedicated generated-output suite passed 8/8.

## Browser acceptance

Reviewed direct loads at 1440×1000 and 390×844 for Home, Waldo, Research, Writing, `agent-done-outcome-truth`, Reading, Experience, and About; also checked Home at 900×1000.

- No horizontal overflow on any reviewed route.
- Desktop Home: one canvas; tablet/mobile Home: zero canvases.
- Connected research direction: one CTA.
- Editorial routes: zero canvases and no HeroBackground, FluidBackground, GPU context, custom cursor, smooth scroll, or page-transition marker.
- Fresh article tab: no console warnings or errors.
- Mobile menu disclosure, scroll lock, Escape closure, and 44 px menu/action targets passed.
- Reading's static grain is behind a dark veil; source targets measure 44 px.
- Waldo's six lazy images loaded successfully after scrolling; every reviewed image has alt text.
- External new-tab links expose a visible arrow and an announced “Opens in a new tab” affordance.

Screenshots:

- `/Users/shivanshfulper/.codex/visualizations/2026/08/21/01a023aa-3e25-7360-8f76-221e57c01964/signal-observatory-hero-desktop.png`
- `/Users/shivanshfulper/.codex/visualizations/2026/08/21/01a023aa-3e25-7360-8f76-221e57c01964/signal-observatory-home-mobile.png`
- `/Users/shivanshfulper/.codex/visualizations/2026/08/21/01a023aa-3e25-7360-8f76-221e57c01964/signal-observatory-reading-mobile.png`
- `/Users/shivanshfulper/.codex/visualizations/2026/08/21/01a023aa-3e25-7360-8f76-221e57c01964/signal-observatory-waldo-desktop.png`

The available in-app browser exposes viewport control but not a native reduced-motion/data emulation switch. Those policies were therefore verified through direct executable policy/lifecycle tests and the production dependency graph; mobile/tablet static fallback was also observed in-browser.

## Accepted exceptions

- Lint/build retain three inherited `@next/next/no-img-element` warnings in inactive legacy `About.tsx` and `Ventures.tsx` components. No active page imports those components.
- Build retains stale Browserslist/caniuse-lite notices.
- Direct Node imports of TypeScript test seams retain `MODULE_TYPELESS_PACKAGE_JSON` warnings; package module semantics were not changed.
- Next embeds the exact isolated build root in six documented framework metadata classes: 462 occurrences across 39 generated files. Public machine text, HTML/RSC/body/meta, and static client assets permit zero such exceptions; all other private paths fail acceptance.

## Review rulings

- Native archive anchors remain accepted because accessible direct navigation fits the static/no-transition-heavy direction; App Router prefetch was not required.
- Residual adversarial test-harness limitations around wrapper provenance, Sass line-comment parsing, and one card-label assertion were accepted at the five-round task cap because current production wiring and rendered output were executable and verified. The whole-branch reviewer explicitly challenged and upheld this ruling.

## Running localhost

- URL: `http://127.0.0.1:3000/`
- Unified exec session: `91737`
- Listener PID at handoff: `2767`
- The in-app browser is left open on Home.
