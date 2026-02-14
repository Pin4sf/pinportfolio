# Pinportfolio - Claude Code Project Guide

## Project Overview

Shivansh Fulper's personal portfolio site. Next.js 14 App Router with Three.js 3D backgrounds, GSAP/Lenis smooth scroll animations, and SCSS modules for styling. Fully static — no CMS, no backend, no env vars.

## Tech Stack

- **Framework**: Next.js 14.1.4 (App Router, static export)
- **Language**: TypeScript 5
- **3D/Animation**: Three.js 0.162, GSAP 3.12, Lenis (smooth scroll)
- **Styling**: SCSS Modules + Tailwind CSS 3.3
- **Carousel**: Swiper 11
- **Utilities**: clsx
- **Linting**: ESLint (next config), Prettier

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
- Dark theme — primary bg is `#090a0e`, accent green is `#6cff8d`

### Adding a New Section

1. Create `components/NewSection.tsx` + `NewSection.module.scss`
2. Export data from `data/portfolio.ts`
3. Add dynamic import in `page.tsx` with `{ ssr: false }`
4. Place inside `<SmoothScroll>` wrapper

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
