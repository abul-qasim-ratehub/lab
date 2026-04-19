# Ratehub Web — UI Kit

Click-thru prototype of the Ratehub.ca marketing / comparison site. Built against `colors_and_type.css` and the circle-in-circle icon set in `../../assets/icons/`.

## Screens
- **01 Home** — hero + inline form, product grid, trust strip, mortgage rate table, card finder, savings showcase, education, awards
- **02 Mortgages** — hero + rate table + education
- **03 Cards** — CardFinder showcase
- **04 Banking** — savings showcase
- **05 Insurance / 06 Investing / 07 Tools** — landing placeholders with real category iconography

## Components
| File | Exports |
|---|---|
| `components.jsx` | `Button`, `Anchor`, `Pill`, `Icon`, `Card`, `Input`, `Select`, `CheckBullet` |
| `Header.jsx` | `Header` (sticky nav + sign-in) |
| `Footer.jsx` | `Footer` (5-col link grid + newsletter) |
| `HeroBanner.jsx` | `HeroBanner` (hero + inline mortgage form over blueberry-darkest) |
| `ProductCategoryGrid.jsx` | `ProductCategoryGrid` (6-up icon cards) |
| `TrustStrip.jsx` | `TrustStrip`, `AwardStrip` |
| `MortgageRateTable.jsx` | `MortgageRateTable` (sortable rate rows, "Best rate" lime pill) |
| `CardFinder.jsx` | `CardFinder` (4-up card showcase w/ product colours) |
| `SavingsShowcase.jsx` | `SavingsShowcase` (copy column + rate table card) |
| `EducationStrip.jsx` | `EducationStrip` (3-up editorial cards) |

## Navigation state
Persists the current page in `localStorage` (`rh_page`) so refreshes don't lose position.

## Known gaps
- French-locale string switching not wired (the real site is bilingual).
- Auto/life/business insurance mini-flows not modelled — the Insurance page is a landing placeholder.
- Real affiliate disclosure footnotes are summarized, not verbatim.
