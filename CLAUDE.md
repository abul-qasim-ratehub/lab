# Ratehub Design System — AI Agent Context

## What this project is
A standalone React 18 design system and homepage redesign for **Ratehub.ca**, Canada's #1 financial comparison platform. No build step — runs entirely via CDN (React + Babel Standalone). Serves as a high-fidelity prototype of the Ratehub.ca homepage and product pages.

## Tech stack
- **Runtime**: React 18.3.1 + ReactDOM (CDN)
- **Transpiler**: Babel Standalone 7.29.0 (in-browser JSX → JS)
- **Styling**: Vanilla CSS custom properties (design tokens in `colors_and_type.css`)
- **Fonts**: Gordita (vendored in `fonts/`, weights 400/500/700)
- **No package.json, no bundler, no Node.js dependencies**
- Serve locally with `python3 -m http.server 3000` or `npx serve .`

## Project structure
```
├── index.html              # Entry point — password gate, all script imports, App component, inline page components
├── colors_and_type.css     # Design tokens (colors, typography, spacing, radii, shadows, motion)
├── SKILL.md                # Brand rules and design non-negotiables
├── src/
│   ├── components.jsx      # Primitives: Button, Pill, Icon, Card, Input, Select, CheckBullet, Anchor
│   ├── Header.jsx          # Sticky nav (6 product links + sign-in)
│   ├── Footer.jsx          # Full-width footer with 5 link columns + newsletter
│   ├── HeroBannerV2.jsx    # Split-screen hero with 4-tab progressive form
│   ├── MortgageCalculator.jsx  # Interactive sliders + SVG donut chart
│   ├── MortgageRateTable.jsx   # Sortable rate comparison table
│   ├── CardFinder.jsx      # 4-up credit card showcase
│   ├── SavingsShowcase.jsx # Banking rates table
│   ├── TrustStrip.jsx      # 4-stat social proof bar
│   ├── EducationStrip.jsx  # 3-up editorial content cards
│   ├── FeaturedIn.jsx      # Press logos + testimonials
│   └── HomeValueEstimator.jsx  # Zoocasa home appraisal widget page
├── assets/
│   ├── brand/              # Background shapes, favicon
│   ├── icons/              # 39 SVG icons (circle-in-circle, 62x62, stroked)
│   └── logos/              # Ratehub, CanWise, MoneySense wordmarks
├── fonts/                  # Gordita woff/woff2
├── preview/                # 24 design-system reference pages
└── uploads/                # User-generated content
```

## How pages work
- **Client-side SPA routing** via React state + localStorage persistence
- `App` component in `index.html` manages `page` state
- Navigation: `go(pageId)` → `setPage()` + `localStorage.setItem('rh_page', pageId)` + scroll to top
- Pages: `home`, `mortgages`, `cards`, `banking`, `insurance`, `investing`, `tools`, `home-value`

## How to add a new page
1. Create `src/NewPage.jsx` — export component via `Object.assign(window, { NewPage })`
2. Add `<script type="text/babel" src="src/NewPage.jsx"></script>` in `index.html` before the App script block
3. Add route in App: `{page === 'newpage' && <NewPage onNavigate={go} />}`
4. Add nav item in `src/Header.jsx` items array: `{ id: 'newpage', label: 'New page' }`

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
CSS-class-based responsive breakpoints in `index.html` global styles:
- **Breakpoints**: 1024px (tablet), 768px (mobile), 480px (small mobile)
- **Grid classes**: Add to any grid container for automatic responsive collapse:
  - `rh-grid-6` → 3 cols tablet, 2 cols mobile, 1 col small
  - `rh-grid-4` → 2 cols tablet/mobile, 1 col small
  - `rh-grid-3` → 1 col mobile
  - `rh-grid-2` → 1 col mobile (side-by-side layouts stack)
- **Section classes**: `rh-hero-section`, `rh-section` — auto-reduce padding on mobile
- **Headline class**: `rh-hero-h1` — scales from 52px to 32px (mobile) to 26px (small)
- **Header**: Desktop nav hidden on mobile, replaced by hamburger menu (`rh-mobile-menu-btn` + `rh-mobile-nav`)
- **Always add these classes** alongside inline styles when creating grids or hero sections

## Design non-negotiables (from SKILL.md)
- **Typeface**: Gordita only (vendored, do not redistribute)
- **Primary CTA**: Desaturated `#2d6e8a`, hover → `#00729e` (NOT raw blueberry)
- **Brand dot**: `.showDot::after` renders cyan period on H1 only
- **Icons**: Use `assets/icons/` SVGs only. **No emoji. No Lucide/Heroicons.**
- **Numbers**: Canadian format — `$2,493/mo`, `5.19%`, comma thousands
- **Voice**: Sentence case everywhere. Numbers over adjectives ("30+ lenders" not "many")
- **No gradients, textures, bouncy animations, scroll-jacking**
- **Hero sections**: `var(--rh-blueberry-darkest)` background, `Pill` eyebrow, `h1.showDot`, descriptive `p`, CTA `Button`
- **Section containers**: `maxWidth: 1280`, `margin: '0 auto'`, `padding: '72px 28px'`

## Component patterns
- All components are vanilla React with inline styles using CSS custom properties
- Components register on `window` via `Object.assign(window, { ComponentName })`
- `onNavigate` callback propagates from App → Header/Buttons/CTAs
- State: React hooks only (useState), localStorage for page persistence
- No external state management

## Password gate
- Session gate overlay at `z-index: 99999`
- Checks `sessionStorage.getItem('rh_gate_v1')`
- Password: `gatehub12`
- Wrong password redirects to google.com

## Third-party integrations
- **Zoocasa Home Appraisal Widget**: Embedded on the `home-value` page
  - Client ID: `ratehub-mortgage`
  - Script: `https://www.zoocasa.com/widget/home-appraisal.js?clientId=ratehub-mortgage`
  - Container: `<div id="zoocasa-appraisal"></div>`
  - Render: `ZoocasaAppraisal.render('#zoocasa-appraisal', { height: '800px', width: '100%' })`
  - Cleanup: `ZoocasaAppraisal.destroy('#zoocasa-appraisal')` on page change
  - Receives estimates via `postMessage` (`zoocasa:estimate:complete`)
  - Origin: `https://www.zoocasa.com`

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)
