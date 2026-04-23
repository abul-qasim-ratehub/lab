# Ratehub Design System

> A living guide for designing against the **Ratehub.ca** brand — built from the real monorepo. Includes a complete Next.js homepage redesign with interactive components for all six financial verticals.

---

## What's in this repo

| Path | Description |
|---|---|
| `app/` | Next.js App Router — layout, global CSS, one route per page |
| `components/` | Design system + page components (client-side React) |
| `colors_and_type.css` | Design tokens as CSS custom properties + typography classes |
| `public/assets/` | Brand icons, logos, and background shapes |
| `public/fonts/` | Gordita Regular / Medium / Bold (woff + woff2) |
| `preview/` | Standalone design-system component previews |
| `legacy/` | Original CDN-based React prototype (pre-Next.js) |
| `ui_kits/ratehub_web/` | Original prototype files (kept for reference) |

### Components

| File | What it does |
|---|---|
| `primitives.jsx` | `Button`, `Anchor`, `Pill`, `Icon`, `Card`, `Input`, `Select`, `CheckBullet` |
| `Header.jsx` | Sticky nav with 8 product links, mobile hamburger, sign-in |
| `Footer.jsx` | Full-width footer with 5 link columns + newsletter |
| `SiteShell.jsx` | Client wrapper that renders Header + children + Footer and handles routing |
| `PasswordGate.jsx` | Session-scoped password overlay |
| `HeroBannerV2.jsx` | Split-screen hero with 4-tab progressive form + live rate teaser |
| `MortgageCalculator.jsx` | Interactive sliders + live SVG donut chart |
| `MortgageRateTable.jsx` | Sortable live rate comparison table |
| `CardFinder.jsx` | 4-up credit card showcase |
| `SavingsShowcase.jsx` | Banking rates table with copy column |
| `InsurancePage.jsx` / `InvestingPage.jsx` / `ToolsPage.jsx` | Per-vertical landing pages |
| `InsurancePreview.jsx` / `InvestingPreview.jsx` | Home-page preview sections |
| `ProductCategoryGridV2.jsx` | 6 product cards with live rate badges |
| `SectionBridge.jsx` / `AwardStrip.jsx` / `TrustStrip.jsx` / `EducationStrip.jsx` / `FeaturedIn.jsx` | Home-page connective sections |
| `HomeValueEstimator.jsx` | Zoocasa home appraisal widget page |
| `MembersDashboard.jsx` | Members-only mortgage dashboard |

---

## Run locally

```bash
npm install
npm run dev
```

Then open **http://localhost:3000**.

The dev server runs on Next.js 15 (App Router) with React 18.

### Production build

```bash
npm run build
npm start
```

### Password gate

The whole site is wrapped in a session-scoped password gate (`components/PasswordGate.jsx`). Default password: `gatehub12`. Wrong entry redirects to google.com.

---

## Routes

| Route | Component |
|---|---|
| `/` | `app/page.jsx` — full homepage composition |
| `/mortgages` | Mortgages landing |
| `/cards` | Credit cards landing |
| `/banking` | Banking / savings landing |
| `/insurance` | Insurance landing |
| `/investing` | Investing landing |
| `/tools` | Free calculators grid |
| `/home-value` | Zoocasa home appraisal widget |
| `/members` | Members-only mortgage dashboard |

---

## Design system overview

### Colours

The palette uses an **edible taxonomy** — every family is a food.

| Token prefix | Hex | Role |
|---|---|---|
| `--rh-blueberry-*` | `#00b5d6` | Primary brand, CTAs, hero backgrounds |
| `--rh-mint-*` | `#9ffcdf` | Success-soft, savings |
| `--rh-lime-*` | `#4ab879` | Growth, rates, savings |
| `--rh-yuzu-*` | `#ffcc50` | Rewards, awards, highlights |
| `--rh-stone-*` | `#c0ced3` | Neutrals, borders, surfaces |
| `--rh-coconut` | `#ffffff` | Page background |
| `--rh-blackberry` | `#000000` | Body text |

### Typography

**Gordita** is the only font family. Weights: 400 / 500 / 700.

```css
.rh-title-4xl { font-size: var(--rh-font-5xl); font-weight: 700; }
.rh-text-m    { font-size: var(--rh-font-s);   line-height: 1.5; }
.showDot::after { content: '.'; color: var(--rh-blueberry); }
```

### Primitive components

```jsx
import { Button, Pill, Icon, Card } from '@/components/primitives';

// Button variants: primary | secondary | alternate | coconut | ghost
<Button variant="primary" size="l">Compare rates →</Button>

// Pills: lime | mint | yuzu | berry | stone | error | tangerine
<Pill tone="lime">4.39% fixed</Pill>

// Icon (loads from /public/assets/icons/{name}.svg)
<Icon name="house" size={32} color="var(--rh-blueberry-dark)" />

// Card
<Card padding={24}>Content here</Card>
```

---

## How to add a new page

1. Create `components/NewPage.jsx` — export the component
2. Create `app/newpage/page.jsx`:
   ```jsx
   'use client';
   import { NewPage } from '../../components/NewPage';
   export default function Page() { return <NewPage />; }
   ```
3. Add the route to `components/useNav.js` and `components/SiteShell.jsx` (`PATH_BY_ID` map)
4. Add the nav item in `components/Header.jsx`'s `items` array

---

## Brand voice quick reference

- **Sentence case** everywhere — buttons, nav, headings
- **Numbers over adjectives**: "30+ lenders" not "many lenders"
- **CTAs**: verb + outcome — "See today's rates" / "Get my quote"
- **No emoji** — use the icon set instead
- **The dot**: `.showDot` on hero H1 only, never on body copy
- **Canadian format**: `$2,493/mo`, `5.19%`, `$750,000`

---

## Third-party integrations

- **Zoocasa Home Appraisal Widget**: Embedded on `/home-value`. Loads `home-appraisal.js` from Zoocasa, passes client ID, and receives estimates via `postMessage`. See `components/HomeValueEstimator.jsx`.

---

## Caveats

- The French locale is not included
- Chart styles (Highcharts wrappers) are not extracted — mock with SVG
- Gordita is a licensed font; keep the vendored `.woff` files, do not redistribute separately

---

## Deploy

Next.js deploys cleanly to Vercel, Netlify, or any Node-capable host:

```bash
npm run build   # produces .next/
npm start       # runs the production server
```

For Vercel: `vercel` or connect the Git repo.

---

## AI knowledge graph (graphify)

This repo has a pre-built knowledge graph at `graphify-out/` that Claude Code uses automatically. Rebuild after major restructures:

```bash
/graphify . --update
```

---

*Built as a design system reference and prototype. Not affiliated with Ratehub Inc.*
