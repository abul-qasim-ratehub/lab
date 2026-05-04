# Design System Workflow Guide

## How to use this repo, what value it brings, and the design-to-development workflow it enables

---

## Table of Contents

1. [What This Repo Is (and Isn't)](#1-what-this-repo-is-and-isnt)
2. [The Value a Claude-Built Design System Brings](#2-the-value-a-claude-built-design-system-brings)
3. [How to Run It Locally](#3-how-to-run-it-locally)
4. [The Design-to-Development Workflow](#4-the-design-to-development-workflow)
5. [Working With Claude on This System](#5-working-with-claude-on-this-system)
6. [Component Inventory and Usage](#6-component-inventory-and-usage)
7. [Design Token Reference](#7-design-token-reference)
8. [Adding New Pages and Components](#8-adding-new-pages-and-components)
9. [Responsive Design Workflow](#9-responsive-design-workflow)
10. [Quality Checklist](#10-quality-checklist)
11. [Common Pitfalls to Avoid](#11-common-pitfalls-to-avoid)

---

## 1. What This Repo Is (and Isn't)

### What it is

A **fully functional, high-fidelity design system and prototype** for Ratehub.ca, built entirely by Claude. It runs in the browser with zero build step — React 18 + Babel Standalone via CDN. Every component, token, layout, and interaction is production-quality code that can be used as:

- A **living specification** — designers and developers reference the same source of truth
- A **clickable prototype** — stakeholders can interact with real UI, not static mockups
- A **component library** — 12+ reusable components with documented props and variants
- A **design token system** — 50+ CSS custom properties for colors, typography, spacing, shadows, and motion
- A **page template kit** — 8 fully composed pages showing how components assemble into real screens

### What it isn't

- Not a production frontend (no SSR, no bundler, no CI/CD)
- Not a Figma plugin or design tool replacement
- Not a npm package (no package.json, no exports)

### Why this matters

Traditional design-to-dev handoff breaks down because designers produce static artifacts (Figma frames, PDFs) that developers must reinterpret. This repo eliminates that gap. The "design" *is* the code. When you change a token value, every component updates. When you add a variant, it's immediately usable in any page.

---

## 2. The Value a Claude-Built Design System Brings

### Speed: Days instead of weeks

Claude generated this entire system — 12 components, 8 pages, 50+ design tokens, responsive grids, and interactive calculators — in a fraction of the time a team would need. What normally requires a designer, a frontend developer, and rounds of review was produced in a single session with iterative refinement.

### Consistency: One source of truth

Every color, font size, spacing value, and shadow is defined once in `colors_and_type.css` and referenced everywhere via CSS custom properties. There are no "magic numbers" scattered across components. Change `--rh-blueberry-dark` in one place and every button, link, and header updates.

### Iteration speed: Describe changes in English

Instead of manually editing CSS across dozens of files, you describe what you want:

> "Make the primary CTA darker and add a new 'warning' button variant"

Claude updates the tokens, modifies the Button component, and verifies consistency across all pages — in seconds.

### Living documentation

The `preview/` folder contains 24 reference pages showing every color, component, and pattern in isolation. The code *is* the documentation. No Storybook config, no separate docs site to maintain.

### Zero-dependency portability

No Node.js, no npm, no Webpack. Copy the folder to any static host (GitHub Pages, Netlify, S3, a USB drive) and it works. This makes it ideal for:

- Stakeholder demos on any machine
- Offline presentations
- Quick prototypes that don't need infrastructure

---

## 3. How to Run It Locally

```bash
# Option A: Python (pre-installed on macOS)
cd "Ratehub Design System"
python3 -m http.server 3000

# Option B: Node.js
npx serve .

# Then open http://localhost:3000
# Password: gatehub12
```

That's it. No `npm install`, no build step, no environment variables.

---

## 4. The Design-to-Development Workflow

This is the core of how to use this system effectively. The workflow has **5 phases**, and Claude accelerates every one of them.

### Phase 1: Design Intent (Input)

**What happens:** You define what you want — a new page, a new component, a visual change, or a full redesign direction.

**Best practice:** Be specific about *what* and *why*, let Claude handle *how*.

| Good input | Bad input |
|------------|-----------|
| "Add a mortgage comparison page with a sortable table showing 5 lenders, their rates, and monthly payments" | "Make a page" |
| "The hero section should feel more premium — darker background, more whitespace, smaller headline" | "Make it look better" |
| "Add a 'ghost' button variant — transparent background, blueberry-dark text, 1px border" | "Add another button" |

**What to provide Claude:**

- **Brand constraints** — Colors, fonts, tone of voice (already captured in `SKILL.md`)
- **Content** — Real copy, real data, real product names
- **Reference** — "Similar to the banking page hero but with a form on the right"
- **User context** — "This is for first-time homebuyers who are comparing rates"

### Phase 2: Claude Generates (Build)

**What happens:** Claude writes components, tokens, and page layouts using the established patterns in this repo.

**What Claude follows automatically:**

- Uses existing design tokens (never hardcodes hex values)
- Follows component patterns (inline styles + CSS custom properties)
- Registers components on `window` for the CDN architecture
- Applies responsive grid classes
- Follows brand rules from `SKILL.md` (sentence case, no emoji, Canadian number formatting)

**What you get:**

- New `.jsx` files in `src/`
- Updated `index.html` with script imports and routing
- Components that match the visual language of everything else in the system

### Phase 3: Review in Browser (Validate)

**What happens:** You open the browser and interact with the actual UI.

**Best practice:** Test the golden path *and* edge cases.

```
Checklist:
[ ] Does it look right at 1280px+ (desktop)?
[ ] Does it collapse properly at 768px (mobile)?
[ ] Do interactive elements respond to hover/focus?
[ ] Does navigation work (clicking CTAs, tabs, links)?
[ ] Does the content make sense (no lorem ipsum, no placeholder data)?
[ ] Does it feel consistent with adjacent sections/pages?
```

### Phase 4: Iterate With Claude (Refine)

**What happens:** You describe what needs to change. Claude makes surgical edits.

**Best practice:** Reference specific components and be precise about the change.

| Effective feedback | Less effective feedback |
|-------------------|----------------------|
| "The MortgageRateTable header row should be blueberry-darkest background with white text" | "The table header looks wrong" |
| "Reduce spacing between the TrustStrip and FeaturedIn sections from 72px to 48px" | "There's too much space somewhere" |
| "The Card component needs a hover state — lift 2px with shadow-m" | "Cards should be more interactive" |

**Iteration loop:**

```
You describe change → Claude edits code → You check browser → Repeat
```

This loop is fast because:
- No build step (refresh the browser)
- No design tool round-trip (the code is the design)
- Claude understands the full system context (tokens, components, patterns)

### Phase 5: Ship or Hand Off (Output)

Depending on your goal, the output of this workflow is one of:

**A. Stakeholder demo** — Share the URL or zip the folder. Anyone with a browser can interact with the full prototype.

**B. Developer handoff** — The code *is* the specification. Developers can:
- Read `colors_and_type.css` for exact token values
- Read `src/components.jsx` for component APIs (props, variants, sizes)
- Read any page component to see how sections compose
- Open `preview/` pages for isolated component examples

**C. Production migration** — Extract components into your real framework:
- Copy token values into your CSS/SCSS/Tailwind config
- Translate React components to your framework (Next.js, Vue, Svelte)
- Use the responsive grid patterns as a starting point

**D. Further iteration** — Keep building. Add pages, refine components, test new layouts.

---

## 5. Working With Claude on This System

### The mental model

Think of Claude as a **staff-level frontend engineer** who has memorized every token, component, and pattern in this repo. You don't need to explain the architecture — just describe what you want built or changed.

### What Claude can do with this repo

| Task | Example prompt |
|------|---------------|
| **Add a page** | "Create an 'About Us' page with a hero, team grid, and company timeline" |
| **Add a component** | "Build a Testimonial card component with star rating, quote, author name, and avatar" |
| **Modify a component** | "Add a 'disabled' state to the Button component — stone background, no pointer events" |
| **Change tokens** | "Make all shadows warmer — change the tint from blue to neutral gray" |
| **Fix responsive** | "The CardFinder grid doesn't stack properly on iPhone SE — fix the 480px breakpoint" |
| **Add interactivity** | "Make the rate table sortable by clicking column headers" |
| **Refine copy** | "Rewrite the hero headline to emphasize savings, not rates" |
| **Add a section** | "Add a 'How it works' 3-step section between the hero and the rate table" |

### Prompting patterns that work well

**1. Reference existing patterns:**
> "Build a new Insurance comparison table using the same pattern as MortgageRateTable but with coverage types instead of rates"

**2. Describe the outcome, not the implementation:**
> "I want users to see their estimated monthly payment update live as they adjust the home price slider"

**3. Provide real content:**
> "The three testimonials should be: Sarah M. from Toronto (mortgage, 5 stars), James K. from Vancouver (credit card, 4 stars), Priya R. from Calgary (savings, 5 stars)"

**4. Be specific about visual direction:**
> "The section background should use stone-lightest, cards should have 24px padding and shadow-xs, headline should be title-2xl with showDot"

---

## 6. Component Inventory and Usage

### Primitives (building blocks)

| Component | File | Props | Use for |
|-----------|------|-------|---------|
| **Button** | `components.jsx` | `variant` (primary/secondary/alternate/coconut/ghost), `size` (s/m/l), `onClick` | All clickable actions |
| **Pill** | `components.jsx` | `tone` (lime/mint/yuzu/berry/stone/error/tangerine), `icon`, `children` | Status badges, tags, labels |
| **Icon** | `components.jsx` | `name` (43 available), `size`, `color` | All iconography (never use emoji) |
| **Card** | `components.jsx` | `padding`, `style`, `children` | Content containers |
| **Input** | `components.jsx` | `label`, `value`, `onChange`, `prefix`, `suffix`, `error` | Form fields |
| **Select** | `components.jsx` | `label`, `value`, `onChange`, `options` | Dropdown selection |
| **Anchor** | `components.jsx` | `href`/`onClick`, `icon`, `children` | Text links with arrow |
| **CheckBullet** | `components.jsx` | `children` | Feature/benefit lists |

### Layout components (section-level)

| Component | File | What it does |
|-----------|------|-------------|
| **Header** | `Header.jsx` | Sticky nav with logo, 6 product links, sign-in, mobile hamburger |
| **Footer** | `Footer.jsx` | 5-column link grid, newsletter signup, legal |
| **HeroBannerV2** | `HeroBannerV2.jsx` | Split-screen hero: editorial left, 4-tab progressive form right |
| **MortgageCalculator** | `MortgageCalculator.jsx` | 4 interactive sliders + SVG donut chart + payment summary |
| **MortgageRateTable** | `MortgageRateTable.jsx` | Sortable lender comparison table with "best rate" badge |
| **CardFinder** | `CardFinder.jsx` | 4-up credit card showcase grid |
| **SavingsShowcase** | `SavingsShowcase.jsx` | Left editorial + right rates table |
| **TrustStrip** | `TrustStrip.jsx` | 4-stat social proof bar (12M+ users, $8.6B, etc.) |
| **EducationStrip** | `EducationStrip.jsx` | 3-up editorial content cards |
| **FeaturedIn** | `FeaturedIn.jsx` | Press logos + testimonial cards |
| **HomeValueEstimator** | `HomeValueEstimator.jsx` | Zoocasa widget integration + hero + results |

---

## 7. Design Token Reference

### Colors — 10 families, 5 shades each

```
blueberry   → Primary brand, CTAs, hero backgrounds
mint        → Success-soft, savings, positive states
lime        → Growth, rates, confirmed success
yuzu        → Rewards, highlights, notable items
tangerine   → Warnings, warm alerts
grape       → Secondary accent, alternate states
watermelon  → Soft errors, cautionary states
strawberry  → Hard errors, destructive actions
stone       → Neutrals, borders, surfaces
blackberry  → Body text, primary copy
coconut     → White backgrounds
```

Each family has: `lightest`, `light`, base, `dark`, `darkest`

Usage: `var(--rh-blueberry-dark)`, `var(--rh-lime-lightest)`, etc.

### Typography — Gordita, 3 weights, 12 sizes

```
Sizes:   3xs (10px) → 6xl (60px)
Weights: 400 (body), 500 (labels/titles), 700 (headlines)
Classes: .rh-title-4xl, .rh-title-3xl, .rh-text-m, .rh-text-s, etc.
```

### Spacing — 8px grid

```
2px → 4px → 8px → 12px → 16px → 20px → 24px → 28px → 32px → 40px → 48px → 64px → 80px → 96px → 128px
```

### Other tokens

```
Radii:    4px (xs), 8px (s), 12px (m), 16px (l), 24px (xl), 9999px (full)
Shadows:  xs, s, m, l + focus ring
Motion:   150ms (fast), 300ms (base), 500ms (slow)
```

---

## 8. Adding New Pages and Components

### Add a new page (4 steps)

1. **Create the file:** `src/NewPage.jsx`
   - Export via `Object.assign(window, { NewPage })`
   - Accept `onNavigate` prop, pass it to child components

2. **Import in `index.html`:** Add before the App script block
   ```html
   <script type="text/babel" src="src/NewPage.jsx"></script>
   ```

3. **Add route in App:** Inside the App component's render
   ```jsx
   {page === 'newpage' && <NewPage onNavigate={go} />}
   ```

4. **Add nav link in Header:** In `Header.jsx` items array
   ```jsx
   { id: 'newpage', label: 'New Page' }
   ```

### Add a new component (3 steps)

1. **Create the file:** `src/ComponentName.jsx`
   - Use inline styles + CSS custom properties (no external CSS)
   - Accept `style` prop for overrides
   - Export via `Object.assign(window, { ComponentName })`

2. **Import in `index.html`:**
   ```html
   <script type="text/babel" src="src/ComponentName.jsx"></script>
   ```

3. **Use in any page:**
   ```jsx
   <ComponentName variant="primary" onClick={() => go('target')} />
   ```

---

## 9. Responsive Design Workflow

### Breakpoints

| Width | Target | Grid behavior |
|-------|--------|---------------|
| 1280px+ | Desktop | Full grid columns |
| 1024px | Tablet | `rh-grid-6` → 3 cols, `rh-grid-4` → 2 cols |
| 768px | Mobile | Most grids → 1 col, padding reduces |
| 480px | Small mobile | Headlines shrink, minimal padding |

### How to make any section responsive

1. Add the appropriate grid class: `rh-grid-4`, `rh-grid-3`, `rh-grid-2`, or `rh-grid-6`
2. Add `rh-section` or `rh-hero-section` for auto-padding reduction
3. Add `rh-hero-h1` to hero headlines for auto-scaling
4. Test at each breakpoint in browser DevTools

---

## 10. Quality Checklist

Before considering any page or component complete:

### Visual consistency
- [ ] All colors reference CSS custom properties (no hardcoded hex)
- [ ] All spacing uses `--rh-space-*` tokens (8px grid)
- [ ] All text is sentence case
- [ ] Numbers use Canadian format ($2,493/mo, 5.19%)
- [ ] No emoji anywhere — icons only
- [ ] `.showDot` used on H1 hero headlines only

### Responsive
- [ ] Tested at 480px, 768px, 1024px, 1280px
- [ ] Grids collapse correctly
- [ ] Touch targets are at least 44px on mobile
- [ ] Mobile menu works (hamburger visible, nav hidden)

### Interaction
- [ ] Hover states on all interactive elements
- [ ] Focus visible (cyan ring) on all focusable elements
- [ ] Transitions use 150ms/300ms (never instant, never slow)
- [ ] Navigation works (CTAs route to correct pages)

### Accessibility
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Form inputs have labels
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Semantic HTML (`<button>`, `<a>`, `<label>`, `<h1>`–`<h6>`)

---

## 11. Common Pitfalls to Avoid

| Pitfall | Why it's a problem | What to do instead |
|---------|-------------------|-------------------|
| Hardcoding hex values | Breaks when tokens change | Always use `var(--rh-*)` |
| Using emoji | Violates brand guidelines | Use `<Icon name="..."/>` from the 43-icon set |
| Title Case text | Ratehub uses sentence case everywhere | "Compare mortgage rates" not "Compare Mortgage Rates" |
| Adding a build step | Defeats the zero-dependency advantage | Keep using Babel Standalone via CDN |
| Skipping mobile testing | Mobile is 60%+ of traffic | Test every change at 768px and 480px |
| Creating one-off styles | Leads to inconsistency | Extract to a token or component variant |
| Forgetting `onNavigate` | Buttons won't route to pages | Thread it from App → Header → every CTA |
| Using external icon libraries | Inconsistent visual language | Stick to `assets/icons/` SVG set |
| Random spacing values | Breaks the 8px grid | Use `--rh-space-*` tokens only |

---

## Summary: The Flow

```
1. DESCRIBE  →  Tell Claude what you need (page, component, change)
                 Be specific. Provide real content. Reference existing patterns.

2. GENERATE  →  Claude writes code using established tokens and patterns
                 Components, tokens, routing — all handled automatically.

3. REVIEW    →  Open browser, interact with the UI
                 Check desktop + mobile. Check hover/focus. Check content.

4. ITERATE   →  Describe what needs to change
                 "Make the heading larger" / "Swap the column order" / "Add a CTA"

5. SHIP      →  Demo to stakeholders, hand off to devs, or keep building
                 Zip it, push to GitHub Pages, or extract into your real framework.
```

The key insight: **there is no handoff gap**. The design and the code are the same artifact. When you iterate on the design, you're iterating on real, working UI. When a developer reads the code, they're reading the exact specification the designer approved.

This is what makes an AI-constructed design system fundamentally different from a traditional Figma-to-code pipeline. The prototype *is* the product specification.
