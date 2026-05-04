# Ratehub Design System — Copilot Instructions

> Full project context lives in [CLAUDE.md](../CLAUDE.md). Read it before making architectural changes. The sections below are agent-critical gotchas not covered elsewhere.

## Build & Dev

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

No TypeScript — JavaScript (JSX) only. No type annotations needed.

## Architecture at a Glance

- **Next.js 15 App Router** — one route per page under `app/`
- **All components are client components** — every file under `components/` must start with `'use client'`
- **Styling** — inline styles using CSS custom properties from `colors_and_type.css`; no Tailwind, no CSS modules, no styled-components
- **Design tokens** — defined in `colors_and_type.css` (colors, spacing, type, shadows, radii, motion)
- **Routing** — use `useNav()` from `components/useNav.js`; never use `<a href>` for internal navigation

## Adding a New Page (4 steps)

1. `components/NewPage.jsx` — client component, named export
2. `app/newpage/page.jsx` — `'use client'`, import and default-export the component
3. Add to `PATH_BY_ID` in `components/useNav.js` and `components/SiteShell.jsx`
4. Add nav item to `items` in `components/Header.jsx`

## Design Non-Negotiables

| Rule | Detail |
|------|--------|
| Typeface | Gordita only (`var(--rh-font-sans)`) — vendored in `public/fonts/` |
| Primary CTA color | `#2d6e8a` (hover → `#00729e`) — NOT raw blueberry token |
| Icons | `public/assets/icons/` SVGs via `<Icon name="..." />` — no emoji, no Lucide/Heroicons |
| Brand dot | `.showDot` class on `<h1>` only — renders cyan period via `::after` |
| Numbers | Canadian format: `$2,493/mo`, `5.19%`, comma thousands |
| Voice | Sentence case everywhere; numbers over adjectives |
| No | Gradients, textures, bouncy animations, scroll-jacking |

## Hero & Section Containers

```jsx
// Hero sections
style={{ background: 'var(--rh-blueberry-darkest)' }}
// Always include: <Pill> eyebrow, <h1 className="showDot">, descriptive <p>, CTA <Button>

// Section containers
style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 28px' }}
// Always pair with CSS grid classes: rh-grid-6 / rh-grid-4 / rh-grid-3 / rh-grid-2
```

## Responsive

CSS-class-based breakpoints in `app/globals.css`:
- **Grid classes**: `rh-grid-6`, `rh-grid-4`, `rh-grid-3`, `rh-grid-2` — collapse automatically at 1024px/768px
- **Headline**: `rh-hero-h1` — 52px → 32px (mobile) → 26px (small mobile)
- Always add these classes alongside inline styles for grids and hero sections

## Key Files

| File | Purpose |
|------|---------|
| `colors_and_type.css` | All design tokens — source of truth for colors, spacing, type |
| `components/primitives.jsx` | `Button`, `Pill`, `Icon`, `Card`, `Input`, `Select`, `Anchor`, `CheckBullet` |
| `components/SiteShell.jsx` | Routing shell — wraps every page |
| `components/useNav.js` | `useNav()` → `go(id)` for internal navigation |
| `app/globals.css` | Responsive grid and section CSS classes |

## Existing Docs to Link, Not Duplicate

- Full token taxonomy, font weights, motion values → `colors_and_type.css` comments
- Component inventory → [README.md](../README.md)
- Zoocasa widget integration details → [CLAUDE.md § Third-party integrations](../CLAUDE.md)
- Password gate credentials → [CLAUDE.md § Password gate](../CLAUDE.md)
- Knowledge graph → `graphify-out/GRAPH_REPORT.md` (run `graphify update .` after modifying files)
