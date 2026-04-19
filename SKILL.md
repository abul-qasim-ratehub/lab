---
name: ratehub-design
description: Use this skill to generate well-branded interfaces and assets for Ratehub.ca, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# Ratehub design skill

Ratehub.ca is Canada's leading financial comparison platform (mortgages, cards, banking, insurance, investing). The brand is **trust-first, numbers-first, and plain-spoken** — think "Canada's smartest way to compare mortgages," not "revolutionary fintech disruption."

## Start here
1. Read **README.md** — company context, content voice, visual foundations, iconography rules.
2. Link **colors_and_type.css** from any HTML artifact you build — tokens and type classes are pre-named (`--rh-blueberry-dark`, `.rh-title-3xl`, `.showDot`, etc.).
3. Copy what you need out of **assets/logos/**, **assets/icons/**, **assets/brand/**, and **fonts/**.
4. For larger compositions, reuse components from **ui_kits/ratehub_web/** (Header, Footer, HeroBanner, MortgageRateTable, CardFinder, SavingsShowcase, etc.) or copy the primitives in `components.jsx` (Button, Pill, Card, Input, Select, CheckBullet, Anchor, Icon).

## Non-negotiables
- **Typeface**: Gordita (400/500/700) — vendored in `fonts/`. Fallback to system-sans if you absolutely must.
- **Primary brand color**: `--rh-blueberry-darkest` (#004F6E) for hero backgrounds; `--rh-blueberry` (#00B5D6) for the signature "." accent.
- **Primary CTA background**: a desaturated `#2d6e8a` — *not* pure blueberry-dark. Hover → `--rh-blueberry-dark`. Active → `--rh-blueberry-darkest`.
- **Icons**: always circle-in-circle from `assets/icons/` (62×62, stroked, `currentColor`). **No emoji. No Lucide/Heroicons/Material mixes.** If an icon is missing, port the JSX from the source repo or flag the substitution.
- **Headlines**: sentence case. Use `.showDot` to render the blueberry period *once* on the hero H1.
- **Numbers**: Canadian format — `$2,493/mo`, `5.19%`, comma thousands separators.
- **No gradients as primary surfaces**, no textures, no emoji cards, no bluish-purple headers, no scroll-jacking, no bouncy springs. Motion is 150/300/500 ms linear-ish easings only.

## If you're making…
- **An artifact/mock/slide/prototype** → produce a single HTML file. Link the CSS, copy assets into a local folder, build with the primitives. Don't hand-roll new visual language.
- **A comparison table** → follow `MortgageRateTable.jsx`. Lender name top-left, big %-rate middle, "Best rate" lime pill, green savings column, primary CTA right-aligned.
- **A category landing** → follow `ProductCategoryGrid.jsx` + `HeroBanner.jsx`. Blueberry-darkest hero with a white inline-form card overlapping the bottom edge.
- **Editorial/content** → use `EducationStrip.jsx` — colored-tint header block, pill tag, 18px medium title, "X min read" meta, arrow-anchor CTA.
- **Production code** → the real codebase lives in `ratehub/front-end` (Next.js + MobX + styled-components). Lift tokens from `packages/base-ui/src/definitions/` — don't duplicate.

## When in doubt
Ask the user: audience, product (mortgages vs cards vs banking vs insurance vs investing), surface (marketing page vs in-app wizard vs email), bilingual EN/FR needed?
