# Ratehub Member Platform — 4-Month Strategic Roadmap
**Period:** May – August 2026  
**Owner:** Product & Engineering  
**Vision:** Transform Ratehub from a comparison utility into Canada's default financial membership platform — where members transact, return, engage, and transact again.

---

## North Star

> Every Canadian who uses Ratehub once should have a reason to come back every month.

The loop is: **Transact → Engage → Transact → Engage**.  
Right now we're good at the first transact. This roadmap closes the loop.

---

## Strategic Pillars

| # | Pillar | Theme |
|---|--------|-------|
| 1 | **Frictionless Experience** | Remove every barrier between intent and action |
| 2 | **Affiliate & Referral Infrastructure** | Bring new members through trusted channels |
| 3 | **Website Overhaul** | Brand-first, conversion-optimised homepage |
| 4 | **Member Lifetime Value** | Personalised cross-sell at the right moment |
| 5 | **Member Engagement Foundations** | Tools that give members a reason to return |
| 6 | **Product Self-Serve** | Members own and manage their financial products |

---

## 4-Month Phase Plan

```
May 2026        June 2026        July 2026        August 2026
─────────────────────────────────────────────────────────────
[ FOUNDATIONS ] [ ACQUISITION  ] [ ENGAGEMENT   ] [ SCALE     ]
  Phase 1          Phase 2          Phase 3          Phase 4
```

---

## Phase 1 — Foundations (May 2026)

**Theme:** Build the infrastructure everything else depends on.

### 1A. Unified Customer Profile

**What:** A single, persistent member identity shared across Ratehub.ca, MoneySense, and CanWise.

**Why:** Right now a member who got a mortgage through CanWise and reads MoneySense is a stranger to both systems. We can't cross-sell, personalise, or retain what we can't identify.

**How:**
- Shared auth token / SSO layer across RH, MS, CIS
- Profile schema: name, email, products held, products applied for, lifecycle stage
- Pre-populated application forms — pull known fields from profile on any product flow
- Consent & privacy framework (PIPEDA-compliant, opt-in for data sharing across brands)

**Deliverables:**
- [ ] SSO implementation (Ratehub ↔ MoneySense ↔ CanWise)
- [ ] Unified member profile API
- [ ] Pre-population on mortgage, card, and insurance application flows
- [ ] Privacy settings page in member dashboard

**KPIs:**
| Metric | Baseline | 30-day Target | 90-day Target |
|--------|----------|---------------|---------------|
| Cross-brand login rate | ~0% | 15% of active members | 35% |
| Application pre-fill rate | ~0% | 60% of returning users | 80% |
| Avg fields pre-populated | 0 | 6 fields | 10 fields |

---

### 1B. Website Overhaul — Design System

**What:** Migrate the full site to the new Ratehub design system (Gordita, token colours, new iconography, revised navigation).

**Why:** The current site is visually inconsistent across pages. The new design system (built in this repo) defines the brand language. Shipping it to production is a force-multiplier — every future feature inherits the right look by default.

**How:**
- Freeze the design token set in `colors_and_type.css` — no ad-hoc colours
- Global navigation refactor: persistent sticky header, unified product taxonomy
- Typography audit: enforce Gordita 400/500/700 sitewide, retire fallback stacks
- Icon audit: replace all emoji/Lucide/Heroicons with `/public/assets/icons/` SVGs
- Mobile-first pass: validate all breakpoints (1024 / 768 / 480px) on every page

**Deliverables:**
- [ ] Design token freeze + documentation
- [ ] Header.jsx v2 with unified nav taxonomy
- [ ] Typography & icon audit completed
- [ ] Responsive QA across all 9 routes

**KPIs:**
| Metric | Baseline | Target |
|--------|----------|--------|
| Lighthouse design consistency score | — | All pages pass design-token lint |
| Mobile usability score (Google) | Current | +10 pts |
| Avg page load (LCP) | Current | < 2.5s |
| Bounce rate (homepage) | Current | −10% |

---

## Phase 2 — Acquisition (June 2026)

**Theme:** Build the pipes that bring new and returning members to the platform.

### 2A. Affiliate Infrastructure

**What:** A self-serve portal where affiliate partners can access Ratehub widgets, track their clicks/conversions, and get paid — without touching engineering.

**Why:** Affiliates are a high-trust, low-CAC acquisition channel. Every personal finance blog, broker, and credit union that embeds a Ratehub widget is a branch office we didn't have to build. Right now onboarding an affiliate requires a dev ticket.

**How:**
- Affiliate portal (`/affiliates`) — already scaffolded in this repo, needs productionising
- Widget catalogue: mortgage rate table, card finder, insurance quote, savings calculator
- Embed code generator: affiliate enters their ID, picks a widget, gets a `<script>` tag
- Analytics dashboard: impressions, clicks, applications, approved, revenue share
- Webhook/API for partner CRM integrations
- Tiered commission structure: standard, preferred, exclusive

**Deliverables:**
- [ ] Affiliate portal shipped to production
- [ ] Widget embed code generator
- [ ] Affiliate analytics dashboard (30/60/90-day views)
- [ ] Onboarding flow: sign-up → T&Cs → get widgets → go live (< 10 min)
- [ ] 10 pilot affiliate partners onboarded

**KPIs:**
| Metric | Baseline | 60-day Target | 90-day Target |
|--------|----------|---------------|---------------|
| Active affiliates | 0 (portal) | 10 pilots | 30 live |
| Affiliate-attributed sessions/mo | — | 5,000 | 20,000 |
| Affiliate-attributed applications/mo | — | 200 | 800 |
| Avg onboarding time | Manual / days | < 10 min self-serve | < 5 min |

---

### 2B. Member Referral Program

**What:** Existing members refer friends and family; both sides get a reward at conversion.

**Why:** Referrals convert at 3–5× the rate of organic traffic and carry the highest trust signal. A member who just closed a mortgage is motivated to share — we just need to make it one tap.

**How:**
- Unique referral link generated on member dashboard
- Referral tracking: cookie + email attribution
- Rewards: cash-back, rate reduction, gift card, or loyalty points (TBD with business)
- Referee experience: personalised landing page ("Ali sent you this")
- Lifecycle trigger: referral prompt fires 7 days after product close, again at 30 days
- Leaderboard / social proof: "X Canadians referred this month"

**Deliverables:**
- [ ] Referral link generation + tracking infrastructure
- [ ] Referral dashboard widget in `/members`
- [ ] Personalised referral landing page
- [ ] Email sequence: invite → reminder → conversion confirmation
- [ ] Reward fulfilment flow

**KPIs:**
| Metric | Baseline | Target (90 days) |
|--------|----------|-----------------|
| Referral invites sent/mo | 0 | 500 |
| Invite-to-click rate | — | 30% |
| Click-to-application rate | — | 15% |
| Referral-attributed new members/mo | 0 | 75 |
| Referral CAC vs. organic | — | < 50% of organic CAC |

---

## Phase 3 — Engagement (July 2026)

**Theme:** Give members tools that make Ratehub useful between transactions.

### 3A. Home Value Estimator

**What:** Live AVM (automated valuation model) via Zoocasa integration on `/home-value` — already built, needs polish and promotion.

**Why:** A homeowner who checks their home value monthly is a homeowner who will refinance through us when rates drop. It's the single highest-value re-engagement hook we have for the mortgage segment.

**How:**
- Integrate Zoocasa widget (already scaffolded — swap to `ratehub-mortgage` client ID for prod)
- Persist last estimate in member profile
- Equity calculator: estimated value − remaining balance = available equity
- Alert: "Your home value changed by $X since last check"
- Cross-sell trigger: equity > $50k → surface HELOC / renovation loan CTA

**Deliverables:**
- [ ] Zoocasa prod client ID swap
- [ ] Estimate persistence in member profile
- [ ] Equity calculator component
- [ ] Home value change alert (email + dashboard)
- [ ] HELOC cross-sell CTA

**KPIs:**
| Metric | Target (30 days live) |
|--------|-----------------------|
| Monthly active home-value users | 2,000 |
| Avg sessions per user/mo | 2.5 |
| Alert open rate | > 40% |
| HELOC CTA click-through | > 8% |

---

### 3B. Personalised Rate Alerts

**What:** Members set a target rate; we notify them when the market hits it.

**Why:** The #1 reason members leave and come back is rate movement. Right now they have to come back and check manually. A rate alert turns passive intent into an active conversion trigger.

**How:**
- Alert setup wizard in member dashboard: product type, rate threshold, frequency
- Rate monitoring job: checks live rate feeds daily
- Alert delivery: email + in-app notification + (optionally) SMS
- Alert → application: one-click "apply now" from the alert email
- Mortgage renewal radar: flag members whose fixed term ends in 60/90/120 days

**Deliverables:**
- [ ] Rate alert setup UI in `/members`
- [ ] Rate monitoring background job
- [ ] Alert email template (rate hit + CTA)
- [ ] Mortgage renewal radar logic
- [ ] In-app notification centre

**KPIs:**
| Metric | Target |
|--------|--------|
| Members with active rate alerts | 20% of active members |
| Alert email open rate | > 45% |
| Alert → application conversion | > 12% |
| Renewal radar flagged / contacted | 100% of members renewing in 90 days |

---

### 3C. Annual Financial Check-up

**What:** Once-a-year prompted review of a member's full financial picture — products, rates, savings opportunities.

**Why:** Most Canadians don't review their finances proactively. A check-up is a high-value, low-friction engagement that surfaces multiple cross-sell opportunities in one session.

**How:**
- Triggered 12 months after last product close (or on anniversary)
- Guided 5-step flow: mortgage rate review → insurance renewal check → credit card rewards audit → savings rate check → next best action
- Generates a "Your Money Report" — shareable PDF summary
- Each step surfaces a specific CTA (refinance, switch, add card, etc.)
- Agent handoff: offer live chat / call with an advisor after check-up

**Deliverables:**
- [ ] Check-up flow (5-step wizard)
- [ ] Money Report PDF generator
- [ ] Trigger logic + email sequence
- [ ] Agent handoff CTA

**KPIs:**
| Metric | Target |
|--------|--------|
| Check-up completion rate | > 55% of triggered |
| Products reviewed per check-up | > 3 |
| Cross-sell CTA click-through | > 20% |
| Applications generated per check-up | 0.4 avg |

---

## Phase 4 — Scale & Lifetime Value (August 2026)

**Theme:** Systematize the Transact → Engage → Transact loop with personalised cross-sell and loyalty.

### 4A. Personalised Cross-sell & Upsell Engine

**What:** Rule-based (then ML-augmented) recommendation engine that surfaces the right next product at the right moment.

**Why:** A member who closed a mortgage is statistically the best prospect for home insurance, a credit card, and eventually a HELOC. We have the signal. We're leaving revenue on the table by not acting on it.

**Cross-sell Map:**

```
FROM MORTGAGE:
  → P&C Insurance          (trigger: close + 7 days, 1-yr anniversary)
  → Rewards Credit Card    (trigger: close + 30 days)
  → HELOC / Reno Loan      (trigger: equity > $50k OR 2 yrs post-close)

FROM CREDIT CARD:
  → Next-best card upgrade  (trigger: 12 months, spending pattern)
  → Life Insurance          (trigger: card approved + 60 days)
  → Debt Consolidation      (trigger: balance > 60% utilisation for 3 mo)

FROM INSURANCE:
  → Mortgage (renewal)      (trigger: 120 days before renewal)
  → Credit Card / wallet    (trigger: 6 months post-bind)
  → Savings Account         (trigger: annual check-up)
```

**Channels:** Member dashboard, email sequences, agent conversations

**How:**
- Recommendation engine: rule set V1 (deterministic triggers above)
- Dashboard widget: "For you" recommendation card — ranked by propensity
- Email automation: lifecycle triggers per cross-sell map
- Agent CRM feed: flag cross-sell opportunities in advisor tooling
- V2 (post-August): ML model trained on closed-deal data

**Deliverables:**
- [ ] Recommendation rule engine (V1 deterministic)
- [ ] "For you" dashboard card
- [ ] 6 lifecycle email sequences (per cross-sell map)
- [ ] Agent CRM flag integration

**KPIs:**
| Metric | Target (Aug 2026) |
|--------|------------------|
| Members with active recommendation | 80% of signed-in members |
| Recommendation CTR | > 15% |
| Cross-sell application rate | > 8% |
| Revenue per member (RPM) 12-month | +25% vs. baseline |
| Products-per-member | 1.0 → 1.6 |

---

### 4B. Membership & Loyalty Program

**What:** Tiered membership with perks that increase in value as members deepen their relationship.

**Why:** Loyalty creates switching cost. A member on a paid tier who gets rate alerts, a financial concierge, and cashback rewards is far less likely to go to a competitor.

**Tiers:**

| Tier | Price | Benefits |
|------|-------|---------|
| **Free** | $0 | Dashboard, rate alerts (1 product), home value |
| **Plus** | $4.99/mo | All alerts, annual check-up, priority advisor access |
| **Premium** | $14.99/mo | All Plus + financial concierge, exclusive rates, fee waivers |

**How:**
- Paywall on premium features (rate alert volume, check-up depth)
- Stripe billing integration
- Tier-based dashboard UI
- Partner perks: exclusive card offers, insurance discounts for Premium members
- Loyalty points: earn on every product close, redeem for cash or rate reduction

**Deliverables:**
- [ ] Tier feature matrix defined
- [ ] Stripe billing integration
- [ ] Tier-gated UI components
- [ ] Partner perk catalogue (3+ launch partners)
- [ ] Points earn/redeem infrastructure

**KPIs:**
| Metric | Target (Dec 2026) |
|--------|-----------------|
| Plus tier adoption | 5% of active members |
| Premium tier adoption | 1% of active members |
| Tier upgrade CTR (from free) | > 10% |
| Paid member churn (monthly) | < 3% |
| ARPU (paid tiers) | $8/mo avg |

---

### 4C. Product Self-Serve

**What:** Members can view, manage, and act on their existing products without calling or emailing.

**Why:** Self-serve reduces support cost, increases session depth, and creates natural cross-sell surface area. A member logging in to check their mortgage balance might notice a rate alert.

**Products in scope:**

| Product | Self-serve capability |
|---------|----------------------|
| CanWise Mortgage | View balance, rate, term, next payment, lender contact |
| Insurance (CIS) | View policy, renewal date, coverage summary, file claim link |
| Credit Card | View active cards, rewards balance, statement link |

**How:**
- CanWise mortgage data feed → member dashboard API
- CIS insurance policy summary feed
- Card wallet: aggregate active cards, rewards, and recommended upgrades
- Document vault: store renewal notices, mortgage statements, policy docs
- Action surface: "Renew", "Switch", "Increase coverage" CTAs per product

**Deliverables:**
- [ ] CanWise mortgage data integration
- [ ] CIS policy summary integration
- [ ] Card wallet component
- [ ] Document vault (upload + store)
- [ ] Per-product CTA surface

**KPIs:**
| Metric | Target |
|--------|--------|
| Self-serve sessions / support tickets | 4:1 ratio |
| Dashboard DAU/MAU | > 25% |
| Action CTA click-through | > 12% |
| Support tickets (product queries) | −30% |

---

## Guided Life Journeys

**What:** Pre-built journey templates that guide members through major life events with the right Ratehub products at each step.

**Journeys:**

| Journey | Trigger | Steps |
|---------|---------|-------|
| **First Home** | Mortgage application started | Pre-approval → Rate lock → Insurance → Card for home spend → HELOC at 2yrs |
| **Renewal Ready** | 120 days before mortgage term end | Rate comparison → Switch / stay decision → P&C renewal check |
| **New Baby** | Life insurance inquiry or check-up signal | Life insurance → Education savings → Mortgage review |
| **Debt-Free Push** | High card utilisation signal | Debt consolidation → Balance transfer card → Savings goal |

**KPIs:**
| Metric | Target |
|--------|--------|
| Journey enrolment rate | 30% of triggered members |
| Journey completion rate | 45% |
| Products per journey completed | 2.2 avg |

---

## Milestone Summary by Month

| Month | Key Deliverables | Success Gate |
|-------|-----------------|-------------|
| **May** | Unified profile, SSO, design system production-ready | All 9 routes on new DS; SSO live |
| **June** | Affiliate portal live, referral program launched, 10 pilot affiliates | 10 affiliates onboarded; 200 referral invites sent |
| **July** | Rate alerts, home value (prod), annual check-up, engagement foundations | 2,000 MAU on home value; 20% of members have active alert |
| **August** | Cross-sell engine V1, loyalty program beta, self-serve products | 80% of members with recommendation; Plus tier at 5% adoption |

---

## Dependencies & Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| SSO integration with CIS takes > 4 weeks | Medium | High | Parallel-track: stub profile with email match; real SSO in Phase 2 |
| CanWise data feed not available | Medium | High | Manual CSV import as fallback; build API contract early |
| Affiliate portal needs legal/compliance sign-off | High | Medium | Start legal review in Week 1 of May |
| Stripe billing complexity (tax, provinces) | Low | Medium | Use Stripe Tax; defer multi-currency to later |
| Rate alert infrastructure (real-time feeds) | Medium | Medium | Use polling (daily) as V1; real-time in V2 |

---

## Team / Resource Allocation (Indicative)

| Track | Required |
|-------|---------|
| Frontend (React / Next.js) | 2 engineers |
| Backend (API / data integration) | 2 engineers |
| Data / ML (recommendations) | 1 engineer (Phase 4 only) |
| Design | 1 designer |
| Product | 1 PM |
| Growth / CRM (email sequences) | 1 person |

---

## Quarterly OKRs

### Q2 2026 (May – June) — Build
- **O1**: Ship unified infrastructure that lets us know who a member is across brands
  - KR1: SSO live across RH + MS + CIS
  - KR2: 60% of returning users have pre-populated applications
  - KR3: 10 affiliates self-onboarded

### Q3 2026 (July – August) — Engage
- **O2**: Give every active member a reason to return monthly
  - KR1: 20% of active members with a rate alert set
  - KR2: 2,000 MAU on home value estimator
  - KR3: 80% of members with at least one personalised recommendation
  - KR4: Products-per-member: 1.0 → 1.4

### Q4 2026 (Sep – Dec) — Scale
- **O3**: Establish Ratehub as the default financial home for Canadian members
  - KR1: Dashboard DAU/MAU > 25%
  - KR2: Plus tier adoption > 5%
  - KR3: 30 active affiliates generating 20,000 sessions/mo
  - KR4: Cross-sell revenue +25% vs. Q2 baseline

---

## What "Done" Looks Like in August 2026

A Ratehub member who closed a mortgage in January 2026 will, by August 2026:

1. Log in once and see their CanWise mortgage balance, next payment, and remaining term
2. Have received an alert when their rate beat the market by 0.5%
3. Have been prompted to check their home value — and seen their equity grow
4. Have received a personalised recommendation for home insurance
5. Completed an annual financial check-up and discovered they're overpaying on their credit card
6. Referred one friend who is now in a mortgage application
7. Be on a path toward a Plus membership because the free tier is valuable and they want more

That member will generate 3–4× the revenue of a one-time transactor — and they will not leave.

---

*Document version: 1.0 — May 2026*  
*Next review: End of Phase 1 (May 31, 2026)*
