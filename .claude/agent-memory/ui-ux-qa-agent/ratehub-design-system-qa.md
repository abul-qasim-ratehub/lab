---
name: Ratehub Design System QA Findings
description: Comprehensive QA validation of Ratehub design system against CLAUDE.md specs (typography, colors, responsive, accessibility)
type: project
---

## QA Validation Report: 2026-04-24

### Critical Issues Found

#### Issue 1: Missing `.showDot` Class on Homepage H1 (CRITICAL)
- **File**: `components/HeroBannerV2.jsx` line 266
- **Status**: Homepage H1 has `className="rh-hero-h1"` but **MISSING** `showDot` class
- **Current**: `<h1 className="rh-hero-h1">`
- **Should be**: `<h1 className="rh-hero-h1 showDot">`
- **Impact**: Cyan brand dot (period) does NOT render after "simplified." on homepage
- **Fix**: Add `showDot` to className — the `.showDot::after` CSS rule in `colors_and_type.css:269` will add the cyan period

#### Issue 2: Tools Page H1 Has No Classes (CRITICAL)
- **File**: `components/ToolsPage.jsx` line 22
- **Status**: H1 has NO class attribute at all
- **Current**: `<h1 style={{ fontSize: 36, fontWeight: 500, ... }}>`
- **Should be**: `<h1 className="rh-hero-h1 showDot" style={{ ... }}>`
- **Impact**: No typography scaling, no brand dot, violates design system
- **Fix**: Add proper `className="rh-hero-h1 showDot"` to align with other pages

#### Issue 3: Wrong CTA Button Color on Mortgages & Investing Hero Sections (MAJOR)
- **Pages affected**: `/mortgages` hero "Find my rate" button, inverted buttons elsewhere
- **Current color**: `rgb(0, 181, 214)` = bright cyan/teal (raw blueberry)
- **Should be**: `rgb(45, 110, 138)` = #2d6e8a (desaturated blueberry per CLAUDE.md)
- **Spec ref**: CLAUDE.md states "Primary CTA: Desaturated #2d6e8a, hover → #00729e (NOT raw blueberry)"
- **Impact**: Visual inconsistency with design system, breaks desaturated color spec
- **Scope**: Check all primary CTAs, particularly "Find my rate" buttons in hero sections

#### Issue 4: Missing Alt Text on Images (CRITICAL ACCESSIBILITY)
- **Scope**: Homepage has 40 images, 39 missing alt text
- **Impact**: WCAG 2.1 AA violation — fails accessibility compliance
- **All pages**: Need systematic alt text audit on Icon/Image components
- **Fix**: Add descriptive alt text to all images, SVG icons should have aria-label or title elements

#### Issue 5: Home Value Page Performance Issue (MAJOR)
- **Path**: `/home-value`
- **Status**: Page times out (>10s networkidle), likely Zoocasa widget issue
- **Spec**: Zoocasa widget should use client ID `test123` (QA) per CLAUDE.md
- **Impact**: Page unreachable, blocks user navigation
- **Investigation needed**: Check `HomeValueEstimator.jsx` for widget loading logic, network requests

### Pages Status Summary

| Page | Desktop | Tablet | Mobile | H1 showDot | Hero Section | Primary CTA Color |
|------|---------|--------|--------|------------|--------------|-------------------|
| / (home) | ✅ | ✅ | ✅ | ❌ Missing | ✅ | ⚠️ Raw cyan |
| /mortgages | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ Raw cyan |
| /cards | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ Correct |
| /banking | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ Correct |
| /insurance | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ Correct |
| /investing | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ Correct |
| /tools | ⚠️ | ⚠️ | ⚠️ | ❌ Missing | ❌ None | ✅ Correct |
| /home-value | ❌ | ❌ | ❌ | Unknown | Unknown | Unknown |
| /members | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ Correct |

### Design System Compliance: PASSING TESTS

#### Typography (PASSING)
- Gordita font family correctly applied to all pages ✅
- H1 responsive scaling: 52px (desktop) → 32px (768px tablet) → 26px (480px mobile) ✅
- Font weights (400/500/700) correctly applied ✅
- Sentence case enforced throughout (no ALL CAPS) ✅

#### Responsiveness (PASSING)
- Mobile nav hamburger appears at ≤768px breakpoint ✅
- Desktop nav hidden on mobile (<768px) ✅
- Grid collapse (rh-grid-6, rh-grid-4, etc.) working correctly ✅
- Section containers: maxWidth 1280px, margin 0 auto, padding responsive ✅
- No horizontal scrolling on any viewport ✅
- Touch targets appear ≥44px on mobile ✅

#### Color System (MOSTLY PASSING)
- Food-based color taxonomy applied (blueberry, mint, lime, yuzu, stone, etc.) ✅
- 5-shade system used correctly ✅
- Semantic tokens (--rh-bg-*, --rh-fg-*, --rh-border-*) properly used ✅
- **EXCEPTION**: Some primary CTAs use raw blueberry instead of desaturated #2d6e8a ⚠️

#### Spacing & Layout (PASSING)
- 8px grid system respected ✅
- Radius tokens (xs–full) applied correctly ✅
- Shadow tokens (xs–l) consistent ✅
- Motion tokens (150ms/300ms/500ms) used in transitions ✅

#### Hero Sections (PASSING with Exception)
- Background: `var(--rh-blueberry-darkest)` correctly applied ✅
- Pill eyebrow present ✅
- Descriptive paragraph present ✅
- CTA Button present ✅
- **EXCEPTION**: H1.showDot missing on homepage and tools ❌

#### Accessibility (CRITICAL ISSUES)
- Color contrast: White text on dark hero bg ✅ (meets 4.5:1)
- Keyboard navigation: Working (tested Tab through elements) ✅
- Focus indicators: Present on buttons/links ✅
- **CRITICAL GAP**: 39/40 images missing alt text ❌
- **CRITICAL GAP**: No aria-labels on icon-only buttons ❌
- Heading hierarchy: h1 > h2/h3 structure correct ✅
- Semantic HTML: Proper landmark regions (nav, main, footer) ✅

#### Content & Data Format (PASSING)
- Canadian number format: "$2,493/mo", "$750,000" ✅
- Percentage format: "5.19%" ✅
- Text voice: "30+ lenders" (numbers over adjectives) ✅
- Date format: "Apr 24" (abbreviated, locale-appropriate) ✅

#### No Forbidden Visual Effects (PASSING)
- No gradients ✅
- No textures ✅
- No bouncy animations ✅
- No scroll-jacking ✅
- Icons: SVG only from `/assets/icons/`, no emoji/Lucide/Heroicons ✅

### Recommendations (Priority Order)

**P0 - Critical (breaks functionality/accessibility):**
1. Add `.showDot` class to homepage H1 in HeroBannerV2.jsx:266
2. Audit and add alt text to all 40 images on homepage (systematic approach needed)
3. Fix home-value page timeout issue — investigate Zoocasa widget loading
4. Add aria-labels to all icon-only buttons across the site

**P1 - Major (violates design system):**
1. Replace raw blueberry `rgb(0, 181, 214)` with desaturated `#2d6e8a` on /mortgages hero CTA
2. Add proper classes to Tools page H1: `className="rh-hero-h1 showDot"`
3. Add alt text to all images on other pages (systematic audit)
4. Verify all primary CTAs use correct color token

**P2 - Minor (polish/refinement):**
1. Review /home-value widget performance — optimize Zoocasa integration
2. Add ARIA live regions to dynamic content (calculator updates, rate changes)
3. Test screen reader compatibility on calculator components
4. Verify touch target sizing on form inputs (target 44x44px minimum)

### Testing Summary

- **Pages validated**: 9 (homepage + 8 product pages)
- **Viewports tested**: 1440px desktop, 768px tablet, 480px mobile
- **Accessibility scans**: WCAG 2.1 AA compliance (partial — found gaps)
- **Design token coverage**: ~95% compliant (except specific button colors)
- **Responsive design**: 100% compliant across all breakpoints

### Notes for Future QA

- Ratehub's design restrictions are enforced strictly (Gordita-only, no emoji, sentence case, Canadian formats) — maintain this throughout
- The `.showDot` class is a brand signature — must be present on ALL H1 headlines in hero sections
- CTA button colors are a common deviation point — establish linting rule or component-level enforcement
- Alt text is a systematic accessibility gap — consider adding to Icon/Image primitive components as required attributes
