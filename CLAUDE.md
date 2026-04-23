# Ratehub Design System — AI Agent Context

## What this project is
A **Next.js 15** design system and homepage redesign for **Ratehub.ca**, Canada's #1 financial comparison platform. Serves as a high-fidelity prototype of the Ratehub.ca homepage and product pages.

## Tech stack
- **Framework**: Next.js 15 (App Router)
- **UI**: React 18.3.1
- **Styling**: Vanilla CSS custom properties (design tokens in `colors_and_type.css`) + global overrides in `app/globals.css`
- **Fonts**: Gordita (vendored in `public/fonts/`, weights 400/500/700) — served via `@font-face` in `colors_and_type.css`
- **Language**: JavaScript (JSX), no TypeScript
- Serve locally with `npm run dev` (→ http://localhost:3000)
- Build with `npm run build` / `npm start`

## Project structure
```
├── app/                    # Next.js App Router
│   ├── layout.jsx          # Root layout — imports tokens + globals, renders PasswordGate > SiteShell
│   ├── globals.css         # Global styles (migrated from legacy/index.html)
│   ├── page.jsx            # Homepage route (/)
│   ├── mortgages/page.jsx  # /mortgages
│   ├── cards/page.jsx      # /cards
│   ├── banking/page.jsx    # /banking
│   ├── insurance/page.jsx  # /insurance
│   ├── investing/page.jsx  # /investing
│   ├── tools/page.jsx      # /tools
│   ├── home-value/page.jsx # /home-value
│   └── members/page.jsx    # /members
├── components/             # All React components (client-side, 'use client')
│   ├── primitives.jsx      # Button, Pill, Icon, Card, Input, Select, CheckBullet, Anchor
│   ├── Header.jsx          # Sticky nav + mobile hamburger
│   ├── Footer.jsx          # Full-width footer
│   ├── SiteShell.jsx       # Header + children + Footer wrapper, drives routing
│   ├── PasswordGate.jsx    # Session-scoped password overlay
│   ├── useNav.js           # useNav() → go(id) helper hook
│   ├── HeroBannerV2.jsx    # Split-screen hero + PulseButton
│   ├── MortgageCalculator.jsx, MortgageRateTable.jsx
│   ├── CardFinder.jsx, SavingsShowcase.jsx
│   ├── TrustStrip.jsx, AwardStrip.jsx, EducationStrip.jsx, FeaturedIn.jsx
│   ├── SectionBridge.jsx, ProductCategoryGridV2.jsx
│   ├── InsurancePreview.jsx, InvestingPreview.jsx
│   ├── InsurancePage.jsx, InvestingPage.jsx, ToolsPage.jsx
│   ├── HomeValueEstimator.jsx
│   └── MembersDashboard.jsx
├── colors_and_type.css     # Design tokens (imported in app/layout.jsx)
├── public/
│   ├── assets/brand/       # Background shapes, favicon
│   ├── assets/icons/       # 39 SVG icons (circle-in-circle, 62x62, stroked)
│   ├── assets/logos/       # Ratehub, CanWise, MoneySense wordmarks
│   └── fonts/              # Gordita woff/woff2 (served at /fonts/*)
├── preview/                # 24 design-system reference pages (legacy, static)
├── legacy/                 # Pre-Next.js CDN prototype (index.html + src/*.jsx)
├── next.config.mjs
├── jsconfig.json           # Path aliases (@/* → project root)
└── package.json
```

## Routing
- Client-side routing uses Next.js App Router.
- `components/useNav.js` exposes a `useNav()` hook returning a `go(id)` function. `id` is the legacy page id (`home`, `mortgages`, `cards`, `banking`, `insurance`, `investing`, `tools`, `home-value`, `members`); it resolves to the matching route.
- `components/SiteShell.jsx` (client) renders `Header` with `current` and `onNavigate` derived from `usePathname()` / `useRouter()`, plus `Footer`. It wraps every page via `app/layout.jsx`.

## How to add a new page
1. Create `components/NewPage.jsx` — client component, `export const NewPage = ...`
2. Create `app/newpage/page.jsx` with `'use client'`, import `NewPage`, default-export a thin wrapper
3. Add an entry to `PATH_BY_ID` in `components/useNav.js` and `components/SiteShell.jsx`
4. Add a nav item to `items` in `components/Header.jsx`

## Design token system (in `colors_and_type.css`)
- **Colors**: Food-based taxonomy — blueberry (primary/CTA), mint, lime (success/rates), yuzu (highlights), stone (neutrals), coconut (white), blackberry (text), plus grape, tangerine, watermelon, strawberry
- Each color has 5 shades: `lightest`, `light`, base, `dark`, `darkest`
- **Semantic tokens**: `--rh-bg-*`, `--rh-fg-*`, `--rh-border-*`, `--rh-success/warning/error/info`
- **Typography**: `--rh-font-sans` (Gordita), sizes `3xs`–`6xl`, weights 400/500/700
- **Spacing**: 8px grid via `--rh-space-*` (2px to 128px)
- **Radii**: `xs` (4px) to `full` (9999px)
- **Shadows**: `xs`–`l`, cool-blue tint
- **Motion**: 150ms/300ms/500ms, ease/ease-in/ease-out

## Responsive design system
CSS-class-based responsive breakpoints in `app/globals.css`:
- **Breakpoints**: 1024px (tablet), 768px (mobile), 480px (small mobile)
- **Grid classes**: `rh-grid-6` / `rh-grid-4` / `rh-grid-3` / `rh-grid-2` — collapse automatically
- **Section classes**: `rh-hero-section`, `rh-section` — auto-reduce padding on mobile
- **Headline class**: `rh-hero-h1` — 52px → 32px (mobile) → 26px (small)
- **Header mobile nav**: Desktop `nav` hidden ≤ 768px; `.rh-mobile-menu-btn` + `.rh-mobile-nav` take over
- **Always add these classes** alongside inline styles when creating grids or hero sections

## Design non-negotiables (from SKILL.md)
- **Typeface**: Gordita only (vendored, do not redistribute)
- **Primary CTA**: Desaturated `#2d6e8a`, hover → `#00729e` (NOT raw blueberry)
- **Brand dot**: `.showDot::after` renders cyan period on H1 only
- **Icons**: Use `public/assets/icons/` SVGs only. **No emoji. No Lucide/Heroicons.**
- **Numbers**: Canadian format — `$2,493/mo`, `5.19%`, comma thousands
- **Voice**: Sentence case everywhere. Numbers over adjectives ("30+ lenders" not "many")
- **No gradients, textures, bouncy animations, scroll-jacking**
- **Hero sections**: `var(--rh-blueberry-darkest)` background, `Pill` eyebrow, `h1.showDot`, descriptive `p`, CTA `Button`
- **Section containers**: `maxWidth: 1280`, `margin: '0 auto'`, `padding: '72px 28px'`

## Component patterns
- All components are **client components** (`'use client'` at top) — the design system is entirely interactive/stateful.
- Components use inline styles with CSS custom properties from `colors_and_type.css`.
- Components are standard ES modules: `export const Foo = ...` (no `window` globals).
- Path reference: use `../components/Foo` relative paths or `@/components/Foo` with the jsconfig alias.
- `Icon` loads SVGs from `/assets/icons/{name}.svg` (leading slash, served from `public/`).

## Password gate
- `components/PasswordGate.jsx` wraps `SiteShell` in `app/layout.jsx`.
- Check key: `sessionStorage.getItem('rh_gate_v1')`
- Password: `gatehub12`
- Wrong password → `window.location.replace('https://www.google.com')`

## Third-party integrations
- **Zoocasa Home Appraisal Widget** (on `/home-value`, via `components/HomeValueEstimator.jsx`):
  - Client ID: `test123` (QA), flip back to `ratehub-mortgage` for prod
  - Script: dynamically injected in `useEffect`; container `<div id="zoocasa-appraisal"></div>`
  - Render: `window.ZoocasaAppraisal.render('#zoocasa-appraisal', { minHeight: 420, width: '80%' })`
  - Cleanup: `ZoocasaAppraisal.destroy('#zoocasa-appraisal')` on unmount
  - Receives estimates via `postMessage` (`zoocasa:estimate:complete`)
  - Origin (QA): `https://zoocasa-next-git-widget-iframe-auto-resize-zoocasa.vercel.app` (revert to `https://www.zoocasa.com` for prod)

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)

Note: the graph may still reference the pre-Next.js structure. Re-run `graphify update .` (or `/graphify . --update` in Claude Code) to re-index the new `app/` + `components/` layout.
