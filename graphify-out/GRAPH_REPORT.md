# Graph Report - .  (2026-04-22)

## Corpus Check
- 110 files · ~60,671 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 320 nodes · 342 edges · 47 communities detected
- Extraction: 86% EXTRACTED · 14% INFERRED · 0% AMBIGUOUS · INFERRED: 49 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_SPA Core & Page Architecture|SPA Core & Page Architecture]]
- [[_COMMUNITY_Color Token System|Color Token System]]
- [[_COMMUNITY_Design System Foundation|Design System Foundation]]
- [[_COMMUNITY_Accent Color Palettes|Accent Color Palettes]]
- [[_COMMUNITY_Financial Product UI|Financial Product UI]]
- [[_COMMUNITY_Hero Section Design|Hero Section Design]]
- [[_COMMUNITY_Brand Identity System|Brand Identity System]]
- [[_COMMUNITY_Design Non-Negotiables|Design Non-Negotiables]]
- [[_COMMUNITY_Spacing Scale|Spacing Scale]]
- [[_COMMUNITY_Homepage Patterns|Homepage Patterns]]
- [[_COMMUNITY_Primitive Components|Primitive Components]]
- [[_COMMUNITY_Members Dashboard|Members Dashboard]]
- [[_COMMUNITY_Typography Scale|Typography Scale]]
- [[_COMMUNITY_Hero Banner Form|Hero Banner Form]]
- [[_COMMUNITY_Financial & Product Icons|Financial & Product Icons]]
- [[_COMMUNITY_Trust & Awards Strip|Trust & Awards Strip]]
- [[_COMMUNITY_Navigation Arrow Icons|Navigation Arrow Icons]]
- [[_COMMUNITY_UI Control Icons|UI Control Icons]]
- [[_COMMUNITY_Financial Activity Icons|Financial Activity Icons]]
- [[_COMMUNITY_Header Navigation|Header Navigation]]
- [[_COMMUNITY_Savings Showcase|Savings Showcase]]
- [[_COMMUNITY_Footer|Footer]]
- [[_COMMUNITY_Mortgage Rate Table|Mortgage Rate Table]]
- [[_COMMUNITY_Card Finder|Card Finder]]
- [[_COMMUNITY_Featured In  Press|Featured In / Press]]
- [[_COMMUNITY_Education Strip|Education Strip]]
- [[_COMMUNITY_Mortgage Calculator|Mortgage Calculator]]
- [[_COMMUNITY_Grape Accent Colors|Grape Accent Colors]]
- [[_COMMUNITY_Conceptual Idea Icons|Conceptual Idea Icons]]
- [[_COMMUNITY_Support & Help Icons|Support & Help Icons]]
- [[_COMMUNITY_Location & Search Icons|Location & Search Icons]]
- [[_COMMUNITY_Protection & Travel Icons|Protection & Travel Icons]]
- [[_COMMUNITY_Product Category Grid (Legacy)|Product Category Grid (Legacy)]]
- [[_COMMUNITY_Hero Banner V1 (Legacy)|Hero Banner V1 (Legacy)]]
- [[_COMMUNITY_Home Value Estimator|Home Value Estimator]]
- [[_COMMUNITY_Design-Dev Workflow|Design-Dev Workflow]]
- [[_COMMUNITY_Sentiment Icons|Sentiment Icons]]
- [[_COMMUNITY_Status Icons|Status Icons]]
- [[_COMMUNITY_Vertical Chevron Icons|Vertical Chevron Icons]]
- [[_COMMUNITY_Brand Identity Icons|Brand Identity Icons]]
- [[_COMMUNITY_Rating Icons|Rating Icons]]
- [[_COMMUNITY_MoneySense Brand|MoneySense Brand]]
- [[_COMMUNITY_Ratehub Favicon & Logomark|Ratehub Favicon & Logomark]]
- [[_COMMUNITY_Section Bridge Utility|Section Bridge Utility]]
- [[_COMMUNITY_Investing Page|Investing Page]]
- [[_COMMUNITY_Input Component|Input Component]]
- [[_COMMUNITY_Logo Assets|Logo Assets]]

## God Nodes (most connected - your core abstractions)
1. `App (SPA entry point)` - 24 edges
2. `colors_and_type.css — Design Tokens` - 22 edges
3. `Spacing Scale` - 10 edges
4. `Semantic color tokens` - 10 edges
5. `Typography body scale` - 8 edges
6. `ProductCategoryGridV2` - 7 edges
7. `Neutrals (Coconut, Blackberry, Stone)` - 7 edges
8. `Pills, tags and badges component` - 7 edges
9. `Hero Section` - 7 edges
10. `InvestingPreview` - 6 edges

## Surprising Connections (you probably didn't know these)
- `preview/buttons_variants.html` --conceptually_related_to--> `Button component`  [INFERRED]
  preview/buttons_variants.html → src/components.jsx
- `ProductCategoryGrid.jsx (ui_kit)` --conceptually_related_to--> `ProductCategoryGridV2`  [INFERRED]
  ui_kits/ratehub_web/ProductCategoryGrid.jsx → index.html
- `preview/buttons_primary.html` --conceptually_related_to--> `Button component`  [INFERRED]
  preview/buttons_primary.html → src/components.jsx
- `App (SPA entry point)` --references--> `src/components.jsx — Primitives`  [EXTRACTED]
  index.html → src/components.jsx
- `App (SPA entry point)` --references--> `Header.jsx — Sticky nav`  [EXTRACTED]
  index.html → src/Header.jsx

## Hyperedges (group relationships)
- **Navigation Icons** — icon_arrow_left, icon_arrow_right, icon_chevron_down, icon_chevron_left, icon_chevron_right, icon_chevron_up [EXTRACTED 1.00]
- **Financial Icons** — icon_bar_chart, icon_calculator, icon_credit_card, icon_dollar, icon_gift, icon_award [INFERRED 0.95]
- **Real Estate and Insurance Icons** — icon_house, icon_car, icon_lock [INFERRED 0.85]
- **UI Action Icons** — icon_checkmark, icon_heart, icon_lock, icon_conversation [INFERRED 0.85]
- **Ideas and Engagement Icons** — icon_light_bulb, icon_lightning, icon_conversation, icon_heart [INFERRED 0.80]
- **Circle-in-Circle Style Icons (62x62)** — icon_award, icon_bar_chart, icon_calculator, icon_car, icon_checkmark, icon_chevron_down, icon_chevron_left, icon_chevron_right, icon_chevron_up, icon_conversation, icon_credit_card, icon_dollar, icon_gift, icon_heart, icon_house, icon_light_bulb, icon_lightning, icon_lock [EXTRACTED 1.00]
- **Circle-in-Circle Style Icons (32x32 viewBox)** — icon_arrow_left, icon_arrow_right [EXTRACTED 1.00]
- **Financial Icons** — icon_piggy, icon_wallet, icon_trending [INFERRED 0.90]
- **Insurance Icons** — icon_shield, icon_umbrella, icon_plane [INFERRED 0.88]
- **UI Control Icons** — icon_minus, icon_plus, icon_x, icon_refresh, icon_question_mark [INFERRED 0.92]
- **Navigation Icons** — icon_map_pin, icon_search, icon_search_blue [INFERRED 0.88]
- **Brand Icons** — icon_ratehub, icon_maple_leaf [EXTRACTED 1.00]
- **Communication Icons** — icon_phone, icon_speech_bubble [INFERRED 0.90]
- **Account & Identity Icons** — icon_user [INFERRED 0.85]
- **Rating & Social Proof Icons** — icon_star, icon_trophy [INFERRED 0.88]
- **Circle-in-Circle Style Icons (62x62)** — icon_map_pin, icon_maple_leaf, icon_minus, icon_phone, icon_piggy, icon_plane, icon_plus, icon_question_mark, icon_ratehub, icon_refresh, icon_search, icon_shield, icon_speech_bubble, icon_star, icon_trending, icon_trophy, icon_umbrella, icon_user, icon_wallet, icon_x [EXTRACTED 1.00]
- **Ratehub Logo System** — logo_ratehub_full_dark, logo_ratehub_full_light, logo_ratehub_lettermark_dark, logo_ratehub_lettermark_light [EXTRACTED 1.00]
- **Ratehub Brand Shape System** — brand_background_circle, brand_two_dots, color_yuzu_light, color_mint_light, color_stone_lightest [EXTRACTED 1.00]
- **Ratehub Partner and Press Logos** — logo_canwise_light, logo_moneysense_light, logo_rh_insurance_light [EXTRACTED 0.95]
- **All Light (White) Logo Variants** — logo_ratehub_full_light, logo_ratehub_lettermark_light, logo_canwise_light, logo_moneysense_light, logo_rh_insurance_light [EXTRACTED 1.00]

## Communities

### Community 0 - "SPA Core & Page Architecture"
Cohesion: 0.07
Nodes (30): Babel Standalone 7.29.0 (unpkg CDN), React 18.3.1 (unpkg CDN), CLAUDE.md — SPA Routing via localStorage, Window registration pattern (Object.assign), CLAUDE.md — Zoocasa Widget Integration, App (SPA entry point), AwardStrip, InsurancePage (+22 more)

### Community 1 - "Color Token System"
Cohesion: 0.06
Nodes (38): blackberry — #000000 (foreground text), Blueberry color palette (brand primary, teal/cyan), blueberry — #00B5D6, blueberry-dark — #00729E, blueberry-darkest — #004F6E, blueberry-light — #A4F1FF, blueberry-lightest — #DBF9FF, coconut — #FFFFFF (page bg) (+30 more)

### Community 2 - "Design System Foundation"
Cohesion: 0.11
Nodes (20): CLAUDE.md — Design Token System, colors_and_type.css — Design Tokens, Gordita font (vendored woff/woff2), preview/buttons_variants.html, preview/checkmarks_stars.html, preview/radii.html, preview/type_display.html, Edible color taxonomy (+12 more)

### Community 3 - "Accent Color Palettes"
Cohesion: 0.1
Nodes (20): Mint color palette (soft growth / success-soft), mint — #9FFCDF, mint-dark — #68E9C1, mint-darkest — #3EA592, mint-light — #E0FFF5, mint-lightest — #F5FFFA, Watermelon color palette, watermelon — #FF989B (+12 more)

### Community 4 - "Financial Product UI"
Cohesion: 0.12
Nodes (16): Category chooser component — 6 product tiles, Lime color palette (savings / success), lime — #4AB879, lime-dark — #358255, lime-darkest — #1F5F39, lime-light — #A7E8C2, lime-lightest — #D3F7E2, Primary CTA button — #2D6E8A background, desaturated blueberry (+8 more)

### Community 5 - "Hero Section Design"
Cohesion: 0.15
Nodes (15): Color Token — blueberry-darkest (Hero BG), Hero Decorative Brand Shape, Hero Descriptor Paragraph, Hero Eyebrow Pill — MoneySense Award, Hero H1 Headline, Hero Section, Hero Progressive Tab Form, UI Kit — Homepage Screenshot (+7 more)

### Community 6 - "Brand Identity System"
Cohesion: 0.2
Nodes (14): Background Circle Brand Shape, CanWise Brand, Ratehub Brand, Ratehub Insurance Sub-brand, Two Dots Brand Shape, Mint Light Color (rgb(159,252,223)), Stone Lightest Color (#f5f9fa), Yuzu Light Color (#FDE4A7) (+6 more)

### Community 7 - "Design Non-Negotiables"
Cohesion: 0.22
Nodes (11): assets/brand/ — background shapes + favicon, assets/icons/ — 39 SVG icons, preview/brand_shapes.html, preview/buttons_primary.html, preview/type_signature_dot.html, SKILL.md — Brand Rules, Icon rule: assets/icons/ SVG only, Primary CTA: #2d6e8a (desaturated) (+3 more)

### Community 8 - "Spacing Scale"
Cohesion: 0.18
Nodes (11): space-0_75 — 12px, space-1 — 16px, space-1_5 — 24px, space-2 — 32px, space-3 — 48px, space-quarter — 4px, space-4 — 64px, space-5 — 80px (+3 more)

### Community 9 - "Homepage Patterns"
Cohesion: 0.25
Nodes (11): Hero Design Pattern — centered headline with brand dot, rate highlight, value prop, dual CTA cards, Icon Tile Pattern — teal-outlined icons above product category labels in card grid, Multi-brand Navigation Bar — black top bar linking CanWise, MoneySense, Insurance sub-brands, Featured Rate Display — 3.35%* 5-year variable mortgage rate, Ratehub.ca Brand — Canada's financial comparison platform, CTA Cards — 'I'm buying a home' and 'I'm renewing/refinancing' with teal icons, Hero Section — 'The best rates live here.' with 3.35% rate callout, Ratehub.ca Homepage Screenshot (+3 more)

### Community 10 - "Primitive Components"
Cohesion: 0.36
Nodes (8): Anchor(), Button(), Card(), CheckBullet(), Icon(), Input(), Pill(), Select()

### Community 11 - "Members Dashboard"
Cohesion: 0.31
Nodes (4): fmtCad(), fmtDate(), MembersDashboard(), propLine()

### Community 12 - "Typography Scale"
Cohesion: 0.22
Nodes (9): Typography body scale, Body L — 18px / 1.5 line-height, Body M — 16px / 1.5 line-height (default), Body S — 14px / 1.5 line-height, Body XL — 20px / 1.5 line-height, Body XS — 12px / 1.5 line-height, Gordita 700 bold, Gordita 500 medium (+1 more)

### Community 13 - "Hero Banner Form"
Cohesion: 0.43
Nodes (6): HeroBannerV2(), OptionBtn(), ProvinceSelect(), PulseButton(), StepDots(), StepInput()

### Community 14 - "Financial & Product Icons"
Cohesion: 0.29
Nodes (7): Bar Chart — three vertical bars of ascending height inside circle, stroked, 62x62 viewBox, Calculator — rectangular body with button grid (plus/minus/equals rows) inside circle, stroked, 62x62 viewBox, Car — automobile with wheels, body, and windows inside circle, stroked, 62x62 viewBox, Credit Card — rectangular card with stripe lines inside circle, stroked, 62x62 viewBox, Dollar — currency dollar sign with vertical line inside circle, stroked, 62x62 viewBox, Gift — wrapped present box with ribbon bow inside circle for rewards/promotions, stroked, 62x62 viewBox, House — home silhouette with roof, walls and door inside circle for real estate/mortgages, stroked, 62x62 viewBox

### Community 15 - "Trust & Awards Strip"
Cohesion: 0.67
Nodes (2): AwardStrip(), TrustStrip()

### Community 16 - "Navigation Arrow Icons"
Cohesion: 0.67
Nodes (4): Arrow Left — directional navigation arrow pointing left, circle-in-circle style, stroked, 32x32 viewBox, Arrow Right — directional navigation arrow pointing right, circle-in-circle style, stroked, 32x32 viewBox, Chevron Left — leftward-pointing V-chevron inside circle for previous/back, stroked, 62x62 viewBox, Chevron Right — rightward-pointing V-chevron inside circle for next/forward, stroked, 62x62 viewBox

### Community 17 - "UI Control Icons"
Cohesion: 0.5
Nodes (4): Minus Icon, Plus Icon, Refresh / Reload Icon, Close / X Icon

### Community 18 - "Financial Activity Icons"
Cohesion: 0.5
Nodes (4): Piggy Bank Icon, Trending / Chart Icon, User / Person Icon, Wallet Icon

### Community 19 - "Header Navigation"
Cohesion: 0.67
Nodes (1): Header()

### Community 20 - "Savings Showcase"
Cohesion: 0.67
Nodes (1): SavingsShowcase()

### Community 21 - "Footer"
Cohesion: 0.67
Nodes (1): Footer()

### Community 22 - "Mortgage Rate Table"
Cohesion: 0.67
Nodes (1): MortgageRateTable()

### Community 23 - "Card Finder"
Cohesion: 0.67
Nodes (1): CardFinder()

### Community 24 - "Featured In / Press"
Cohesion: 0.67
Nodes (1): FeaturedIn()

### Community 25 - "Education Strip"
Cohesion: 0.67
Nodes (1): EducationStrip()

### Community 26 - "Mortgage Calculator"
Cohesion: 0.67
Nodes (1): MortgageCalculator()

### Community 27 - "Grape Accent Colors"
Cohesion: 0.67
Nodes (3): Grape color palette (secondary accent), grape — #B969D1, grape-dark — #80209C

### Community 28 - "Conceptual Idea Icons"
Cohesion: 0.67
Nodes (3): Conversation — two overlapping speech bubbles inside circle for chat/support, stroked, 62x62 viewBox, Light Bulb — bulb with filament detail and bracket inside circle for ideas/tips, stroked, 62x62 viewBox, Lightning — two-segment zigzag bolt path inside circle for energy/speed/power, stroked, 62x62 viewBox

### Community 29 - "Support & Help Icons"
Cohesion: 0.67
Nodes (3): Phone Icon, Question Mark Icon, Speech Bubble Icon

### Community 30 - "Location & Search Icons"
Cohesion: 0.67
Nodes (3): Map Pin Icon, Search Icon, Search Icon (Blue)

### Community 31 - "Protection & Travel Icons"
Cohesion: 0.67
Nodes (3): Airplane / Travel Icon, Shield Icon, Umbrella Icon

### Community 32 - "Product Category Grid (Legacy)"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "Hero Banner V1 (Legacy)"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "Home Value Estimator"
Cohesion: 1.0
Nodes (0): 

### Community 35 - "Design-Dev Workflow"
Cohesion: 1.0
Nodes (2): Design-to-dev workflow (5 phases), Rationale: No handoff gap — design IS the code

### Community 36 - "Sentiment Icons"
Cohesion: 1.0
Nodes (2): Award — medal/ribbon badge with circle top and banner tails, stroked, 62x62 viewBox, Heart — heart shape with two upper arcs inside circle for favourites/saved, stroked, 62x62 viewBox

### Community 37 - "Status Icons"
Cohesion: 1.0
Nodes (2): Checkmark — tick/check path inside circle indicating success or confirmation, stroked, 62x62 viewBox, Lock — padlock with shackle arc and keyhole circle inside circle for security/privacy, stroked, 62x62 viewBox

### Community 38 - "Vertical Chevron Icons"
Cohesion: 1.0
Nodes (2): Chevron Down — downward-pointing V-chevron inside circle for expand/dropdown, stroked, 62x62 viewBox, Chevron Up — upward-pointing V-chevron inside circle for collapse/scroll-up, stroked, 62x62 viewBox

### Community 39 - "Brand Identity Icons"
Cohesion: 1.0
Nodes (2): Maple Leaf Icon, Ratehub Brand Icon

### Community 40 - "Rating Icons"
Cohesion: 1.0
Nodes (2): Star / Rating Icon, Trophy Icon

### Community 41 - "MoneySense Brand"
Cohesion: 1.0
Nodes (2): MoneySense Brand, MoneySense Logo (Light / White variant)

### Community 42 - "Ratehub Favicon & Logomark"
Cohesion: 1.0
Nodes (2): Ratehub Favicon 32x32, Ratehub R Logo 300x300

### Community 43 - "Section Bridge Utility"
Cohesion: 1.0
Nodes (1): SectionBridge

### Community 44 - "Investing Page"
Cohesion: 1.0
Nodes (1): InvestingPage

### Community 45 - "Input Component"
Cohesion: 1.0
Nodes (1): Input component

### Community 46 - "Logo Assets"
Cohesion: 1.0
Nodes (1): assets/logos/ — Ratehub/CanWise/MoneySense wordmarks

## Knowledge Gaps
- **116 isolated node(s):** `Password Gate`, `SectionBridge`, `InvestingPage`, `Responsive Grid CSS Classes`, `Mobile Navigation (hamburger)` (+111 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Product Category Grid (Legacy)`** (2 nodes): `ProductCategoryGrid()`, `ProductCategoryGrid.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hero Banner V1 (Legacy)`** (2 nodes): `HeroBanner()`, `HeroBanner.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Home Value Estimator`** (2 nodes): `HomeValueEstimator()`, `HomeValueEstimator.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Design-Dev Workflow`** (2 nodes): `Design-to-dev workflow (5 phases)`, `Rationale: No handoff gap — design IS the code`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Sentiment Icons`** (2 nodes): `Award — medal/ribbon badge with circle top and banner tails, stroked, 62x62 viewBox`, `Heart — heart shape with two upper arcs inside circle for favourites/saved, stroked, 62x62 viewBox`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Status Icons`** (2 nodes): `Checkmark — tick/check path inside circle indicating success or confirmation, stroked, 62x62 viewBox`, `Lock — padlock with shackle arc and keyhole circle inside circle for security/privacy, stroked, 62x62 viewBox`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vertical Chevron Icons`** (2 nodes): `Chevron Down — downward-pointing V-chevron inside circle for expand/dropdown, stroked, 62x62 viewBox`, `Chevron Up — upward-pointing V-chevron inside circle for collapse/scroll-up, stroked, 62x62 viewBox`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Brand Identity Icons`** (2 nodes): `Maple Leaf Icon`, `Ratehub Brand Icon`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Rating Icons`** (2 nodes): `Star / Rating Icon`, `Trophy Icon`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `MoneySense Brand`** (2 nodes): `MoneySense Brand`, `MoneySense Logo (Light / White variant)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Ratehub Favicon & Logomark`** (2 nodes): `Ratehub Favicon 32x32`, `Ratehub R Logo 300x300`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Section Bridge Utility`** (1 nodes): `SectionBridge`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Investing Page`** (1 nodes): `InvestingPage`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Input Component`** (1 nodes): `Input component`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Logo Assets`** (1 nodes): `assets/logos/ — Ratehub/CanWise/MoneySense wordmarks`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Semantic color tokens` connect `Color Token System` to `Accent Color Palettes`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `App (SPA entry point)` connect `SPA Core & Page Architecture` to `Design System Foundation`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `colors_and_type.css — Design Tokens` connect `Design System Foundation` to `SPA Core & Page Architecture`, `Design Non-Negotiables`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **What connects `Password Gate`, `SectionBridge`, `InvestingPage` to the rest of the system?**
  _116 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `SPA Core & Page Architecture` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
- **Should `Color Token System` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Design System Foundation` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._