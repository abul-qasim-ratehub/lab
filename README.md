# Ratehub Design System

> A living guide for designing against the **Ratehub.ca** brand — built from the real monorepo. Includes a complete, deployable homepage redesign with interactive components for all six financial verticals.

**[Live demo →](https://your-username.github.io/ratehub-design-system)** *(update after deploying)*

---

## What's in this repo

| Path | Description |
|---|---|
| `index.html` | **Production entry point** — the full redesigned homepage (deploy this) |
| `colors_and_type.css` | All design tokens as CSS custom properties + typography classes |
| `src/` | React JSX component files (loaded by `index.html`) |
| `assets/icons/` | 39 brand SVG icons (circle-in-circle, 62×62) |
| `assets/logos/` | Ratehub, CanWise, MoneySense, RH Insurance wordmarks |
| `assets/brand/` | Background shapes, favicon |
| `fonts/` | Gordita Regular / Medium / Bold (woff + woff2) |
| `preview/` | Standalone design-system component previews |
| `ui_kits/ratehub_web/` | Original prototype files (kept for reference) |

### Components in `src/`

| File | What it does |
|---|---|
| `components.jsx` | Primitives: `Button`, `Anchor`, `Pill`, `Icon`, `Card`, `Input`, `Select`, `CheckBullet` |
| `Header.jsx` | Sticky nav with 6 product links + sign-in |
| `Footer.jsx` | Full-width footer with 5 link columns + newsletter |
| `HeroBannerV2.jsx` | Split-screen hero with 4-tab progressive form + live rate teaser |
| `MortgageCalculator.jsx` | Interactive sliders + live SVG donut chart |
| `FeaturedIn.jsx` | Press logos + verified testimonial cards |
| `TrustStrip.jsx` | 4-stat social proof bar |
| `MortgageRateTable.jsx` | Sortable live rate comparison table |
| `CardFinder.jsx` | 4-up credit card showcase |
| `SavingsShowcase.jsx` | Banking rates table with copy column |
| `EducationStrip.jsx` | 3-up editorial content cards |

---

## Run locally

No build step required. The project uses React 18 + Babel Standalone loaded from CDN.

> **Important:** You must serve the files over HTTP — opening `index.html` directly as a `file://` URL will block the JSX script loading.

### Option 1 — Python (built into macOS)

```bash
cd "path/to/ratehub-design-system"
python3 -m http.server 3000
```
Then open **http://localhost:3000**

### Option 2 — Node `serve`

```bash
npx serve .
```
Then open **http://localhost:3000**

### Option 3 — VS Code Live Server

Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, right-click `index.html` → **Open with Live Server**.

---

## Deploy to GitHub Pages

### Step 1 — Create a GitHub repo

```bash
git init
git add .
git commit -m "Initial commit — Ratehub design system + homepage redesign"
```

Create a new repo on GitHub (e.g. `ratehub-design-system`), then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/ratehub-design-system.git
git branch -M main
git push -u origin main
```

### Step 2 — Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Set branch to `main`, folder to `/ (root)`
5. Click **Save**

GitHub Pages will build and deploy in ~60 seconds.

Your site will be live at:
```
https://YOUR_USERNAME.github.io/ratehub-design-system/
```

### Step 3 — Update this README

Replace the demo link at the top of this file with your live URL.

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
/* Example usage */
.rh-title-4xl { font-size: var(--rh-font-5xl); font-weight: 700; }
.rh-text-m    { font-size: var(--rh-font-s);   line-height: 1.5; }
.showDot::after { content: '.'; color: var(--rh-blueberry); }
```

### Primitive components

```jsx
// Button variants: primary | secondary | alternate | coconut | ghost
<Button variant="primary" size="l">Compare rates →</Button>

// Pills: lime | mint | yuzu | berry | stone | error | tangerine
<Pill tone="lime">4.39% fixed</Pill>

// Icon (loads from assets/icons/{name}.svg)
<Icon name="house" size={32} color="var(--rh-blueberry-dark)" />

// Card
<Card padding={24}>Content here</Card>
```

---

## Homepage section architecture

```
HeroBannerV2          ← Split-screen hero, 4-tab progressive form
ProductCategoryGridV2 ← 6 product cards with live rate badges
─────────────────────
MortgageRateTable     ← Sortable rate comparison table
CardFinder            ← 4-up credit card showcase
SavingsShowcase       ← Banking rates table
InsurancePreview      ← Interactive coverage type selector
InvestingPreview      ← 4 product cards (robo / GIC / broker / TFSA)
MortgageCalculator    ← Sliders + live donut chart
─────────────────────
TrustStrip            ← 4 social proof stats
FeaturedIn            ← Press logos + 3 testimonial cards
EducationStrip        ← 3 editorial content cards
AwardStrip            ← Industry recognition bar
─────────────────────
Footer
```

---

## Brand voice quick reference

- **Sentence case** everywhere — buttons, nav, headings
- **Numbers over adjectives**: "30+ lenders" not "many lenders"
- **CTAs**: verb + outcome — "See today's rates" / "Get my quote"
- **No emoji** — use the icon set instead
- **The dot**: `.showDot` on hero H1 only, never on body copy
- **Canadian format**: `$2,493/mo`, `5.19%`, `$750,000`

---

## Caveats

- The French locale (`locale/fr.json`) is not included
- Chart styles (Highcharts wrappers) are not extracted — mock with SVG
- Gordita is a licensed font; keep the vendored `.woff` files, do not redistribute separately

---

## AI knowledge graph (graphify)

This repo has a pre-built knowledge graph at `graphify-out/` that Claude Code uses automatically.

| File | Description |
|---|---|
| `graphify-out/graph.json` | Queryable graph — 320 nodes, 342 edges across the full codebase |
| `graphify-out/graph.html` | Interactive visualisation — open in any browser |
| `graphify-out/GRAPH_REPORT.md` | Audit report: god nodes, surprising connections, suggested questions |

### What it does

Claude reads the graph instead of re-reading every file from scratch each session. ~50x fewer tokens per query. The graph covers components, design tokens, icons, brand assets, preview pages, and the relationships between all of them.

### Staying current

A post-commit git hook is installed — the graph auto-updates after every `git commit`. No manual step needed for code changes.

For larger changes (new components, restructured files), force a full refresh:

```bash
/graphify . --update
```

### Setup on a new machine

```bash
pip install graphifyy
graphify install       # register /graphify skill in Claude Code globally
graphify hook install  # re-install the post-commit hook
```

### Querying the graph in Claude Code

```
/graphify query "what components use the blueberry color token?"
/graphify path "HeroBannerV2" "colors_and_type.css"
/graphify explain "ProductCategoryGridV2"
```

---

*Built as a design system reference and prototype. Not affiliated with Ratehub Inc.*
