# Pinportfolio - Claude Code Project Guide

> Prefer retrieval-led reasoning over pre-training-led reasoning for framework tasks. Explore the project first, then consult docs/skills.

## Project Overview

Shivansh Fulper's personal portfolio site. Next.js 14 App Router with Three.js 3D backgrounds, GSAP/Lenis smooth scroll animations, and SCSS modules for styling. Fully static — no CMS, no backend, no env vars.

**Target**: Awwwards-quality portfolio — every interaction, animation, and visual detail must feel intentional and polished. Design is 40% of the score, Usability 30%, Creativity 20%, Content 10%.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router, static) | 14.1.4 |
| Language | TypeScript | 5 |
| 3D/WebGL | Three.js + GLSL shaders | 0.162 |
| Animation | GSAP (ScrollTrigger, SplitText, Flip) | 3.12 |
| Smooth Scroll | Lenis | 1.1 |
| Styling | SCSS Modules + Tailwind CSS | 3.3 |
| Carousel | Swiper | 11 |
| Utilities | clsx | 2.1 |
| Linting | ESLint (next config), Prettier | - |

## Architecture

### Directory Structure

```
src/
├── app/
│   ├── page.tsx              # Home — dynamically imports all sections (ssr: false)
│   ├── layout.tsx            # Root layout, metadata from siteConfig
│   ├── globals.scss          # Global styles, fonts, resets
│   ├── projects/[slug]/      # Dynamic project detail pages (SSG)
│   └── components/
│       ├── Hero.tsx           # Landing hero with animated taglines
│       ├── Header.tsx         # Sticky nav with CoolLink + BlobButton
│       ├── SkillsMarquee.tsx  # Infinite scroll skill categories
│       ├── About.tsx          # Profile + tech slides (Swiper)
│       ├── Projects.tsx       # Startup showcase cards
│       ├── FAQ.tsx            # Accordion FAQ section
│       ├── Contact.tsx        # Contact form + profile card
│       ├── LoadingScreen.tsx  # Animated loading overlay
│       ├── SmoothScroll.tsx   # Lenis wrapper for page-wide smooth scroll
│       ├── three/             # Three.js components (ThreeBackground, ShadedImage)
│       └── ui/                # Reusable UI (BlobButton, CoolLink, CircleEyeButton, GlitchIcon, ScrollIndicator)
├── data/
│   └── portfolio.ts          # ALL site content — single source of truth
├── shaders/
│   ├── vertex.glsl           # Three.js vertex shader
│   └── fragment.glsl         # Three.js fragment shader
└── types/
    └── glsl.d.ts             # GLSL module type declaration
```

### Key Patterns

- **All content lives in `src/data/portfolio.ts`** — update text, projects, FAQ, nav, and metadata here. Never hardcode content in components.
- **Every page section is a client component** dynamically imported with `ssr: false` in page.tsx (required for Three.js/GSAP).
- **Each component has a co-located `.module.scss` file** — use SCSS modules for component styles, Tailwind for utility/layout helpers.
- **UI components in `components/ui/`** are reusable building blocks with their own SCSS modules.
- **Three.js components in `components/three/`** handle all WebGL rendering.
- **GLSL shaders** are imported as strings via webpack config in `next.config.mjs`.

### Styling Convention

- Component-scoped styles: `ComponentName.module.scss` alongside `ComponentName.tsx`
- Tailwind custom colors prefixed with `v1-` (e.g., `v1-green`, `v1-dark-bg`)
- Custom fonts via CSS variables: `--font-poppins`, `--font-montserrat`, `--font-amatic`, `--font-rubik`
- Dark theme — primary bg `#090a0e`, accent green `#6cff8d`, yellow `#e4e400`
- Restrict palette to 2-3 colors max per section for award-level visual cohesion

### Animation Patterns (Awwwards-Level)

When implementing animations, follow these award-winning patterns:
- **GSAP ScrollTrigger** for all scroll-linked reveals (parallax, stagger, pin-and-animate)
- **GSAP SplitText** for character-level headline animations with stagger
- **GSAP Flip** for seamless state transitions (e.g., thumbnail → detail view)
- **GSAP `quickTo()`** for performance-critical mouse-following effects
- **Velocity-aware effects** — animations respond to scroll/cursor speed, not just position
- **Clip-path reveals** using `inset()` / `polygon()` for section transitions
- **Staggered entry** with 0.05-0.1s delays between elements
- Target 60fps on mid-range devices — never create tweens per frame

### Adding a New Section

1. Create `components/NewSection.tsx` + `NewSection.module.scss`
2. Export data from `data/portfolio.ts`
3. Add dynamic import in `page.tsx` with `{ ssr: false }`
4. Place inside `<SmoothScroll>` wrapper
5. Add GSAP ScrollTrigger animations for entry reveals

### Adding a New Project

1. Add entry to `projectsData` array in `data/portfolio.ts`
2. Place project image in `public/images/projects/`
3. The `/projects/[slug]` route auto-generates from the slug field

## Commands

```bash
npm run dev          # Dev server at localhost:3000
npm run build        # Production build (validates types + lint)
npm run lint         # ESLint check
npx prettier --check "src/**/*.{ts,tsx,scss}"  # Format check
```

## Installed Skills

Use `/skill-name` to invoke these capabilities:

| Skill | Purpose |
|-------|---------|
| `/find-skills` | Discover and install new agent skills |
| `/vercel-react-best-practices` | React/Next.js patterns and anti-patterns |
| `/web-design-guidelines` | Web design principles and standards |
| `/frontend-design` | Frontend design implementation |
| `/vercel-composition-patterns` | Component composition patterns |
| `/agent-browser` | Browser automation and testing |
| `/skill-creator` | Create custom skills |
| `/ui-ux-pro-max` | Advanced UI/UX design guidance |
| `/audit-website` | Website quality and accessibility audit |
| `/seo-audit` | SEO analysis and recommendations |
| `/brainstorming` | Creative brainstorming sessions |
| `/copy-editing` | Content and copy refinement |
| `/writing-skills` | Writing quality improvement |

## Rules

- Always run `npm run build` after significant changes to verify the build passes
- Keep all site content in `data/portfolio.ts` — components should import from there
- Use SCSS modules for new component styles, not inline styles or global CSS
- All new page-level components must use dynamic import with `ssr: false`
- Use `clsx` for conditional class merging
- Prefer named exports from data, default exports from components
- Do not add environment variables — this is a fully static site
- Do not add a CMS or database — content is code-driven
- Preserve the dark theme aesthetic (dark bg + green/yellow accents)
- Every element must respond to hover/interaction — no dead zones
- Typography: oversized display headlines (8-15vw) contrasted with small metadata
- Performance: use `gsap.quickTo()` over creating new tweens, shader-based effects over DOM manipulation, lazy load heavy assets
