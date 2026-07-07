# Al Iman School – Aramoun · Website

Bilingual (Arabic-default / English) premium school website.
**Single campus today, branch-scalable by architecture** — a Branch is a first-class entity in both `src/lib/site-config.ts` and the Sanity schema; adding a future branch is a content operation, not a refactor.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Sanity project ID when ready
npm run dev
```

Open **http://localhost:3000/ar** and **http://localhost:3000/en** side by side.
The current homepage is the **Foundation Review page** — a temporary page proving the design system (tokens, type scales, components, motion) in both directions. It is replaced by the real homepage in Phase 2.

The CMS studio lives at **/studio** (requires a free Sanity project ID in `.env.local`; the frontend runs fine without it during Phase 2).

## Architecture decisions (and why)

| Decision | Rationale |
|---|---|
| Next.js 15 App Router, fully static + ISR | Content site → prebuild everything; fast on Lebanese mobile connections and older iPhones. |
| `next-intl`, Arabic default, `/ar` + `/en` prefixes | Explicit URLs → clean hreflang, analytics, caching. Arabic is the default locale, not a translation layer. |
| Dual type scales via CSS custom properties (`globals.css`) | Arabic needs larger sizes + taller leading for equal optical weight; `html[lang="ar"]` swaps the whole scale. Arabic is never letter-spaced. |
| IBM Plex Sans Arabic + IBM Plex Sans | Designed as one superfamily → matched rhythm across scripts. Both roles are tokens (`--font-display`, `--font-body`) so a brand display face can be swapped in one file later. |
| Logical properties only (`ms-`, `pe-`, `inset-inline-end`, `text-start`) | RTL/LTR mirroring is automatic and unhackable. Never use `ml-`/`pr-`/`left-` in this codebase. |
| Motion = transform/opacity only, tokens in `components/motion/tokens.ts` | One motion vocabulary; compositor-friendly; `prefers-reduced-motion` collapses everything (belt in components + suspenders in CSS). |
| Branch as first-class document (`sanity/schemas/documents/branch.ts`) | News, events, careers, galleries, tuition all reference a branch → branch pages assemble themselves when the network grows. |
| Tuition displayMode: `exact` / `range` / `inquire` per row | The school controls fee disclosure per cycle from the CMS — no redesign when policy changes. |
| Mandatory bilingual alt text (`seoImage`) | Accessibility and SEO enforced by the schema, not by discipline. |

## Repository map

```
src/
├── app/
│   ├── [locale]/            layout (sets lang/dir per locale) + pages
│   ├── studio/              embedded Sanity Studio (/studio)
│   ├── globals.css          ★ design tokens: color, dual type scales, motion, base
│   ├── sitemap.ts robots.ts SEO plumbing
├── i18n/                    routing (ar default) · request config · nav wrappers
├── messages/                ar.json / en.json — all UI strings
├── components/
│   ├── ui/                  Container, Section, SectionHeader, Button,
│   │                        DirectionalArrow, LanguageSwitcher, WhatsAppFab
│   └── motion/              tokens, Reveal, Stagger — the only motion API
├── lib/                     fonts · site-config (★ branch model) · seo helpers
└── sanity/                  client · image builder · schemas (★ branch, tuition)
```

## Working rules for this codebase

1. **Never import `next/link` or `next/navigation` directly** — use `@/i18n/navigation` so links stay locale-aware.
2. **Never use physical direction utilities** (`ml-`, `pl-`, `left-`, `text-left`). Logical only.
3. **All UI strings live in `src/messages/*.json`** — no hardcoded copy in components.
4. **All motion goes through `components/motion`** — no ad-hoc animations.
5. Anything marked `TODO-CLIENT` is placeholder data and must not ship.

## Definition of done — every section, every phase

design quality ✓ · responsive ✓ · **RTL verified against LTR** ✓ · keyboard/focus ✓ · reduced-motion ✓ · performance ✓

## Roadmap

- **Phase 2 (next):** homepage, section by section per the approved wireframe (header → hero → legacy strip → pillars → branch/discovery → academics path → stats → mosaic → admissions band → news → testimonials → footer).
- **Phase 3:** inner pages (About, Academics, Admissions + Tuition & Fees, School Life, Contact).
- **Phase 4:** CMS wiring + ISR revalidation webhook + editor guide.
- **Phase 5:** SEO/a11y/perf hardening, Lighthouse CI, cross-device QA (iOS Safari on iPhone 10/11 explicitly).
- **Phase 6:** launch — domain, redirects (if an existing site exists), Search Console, Google Business Profile.
