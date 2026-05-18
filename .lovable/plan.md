# Plan: Add "Tracie's Picks" Category

A curated lifestyle layer for hand-selected apparel, hats, accessories, and studio objects. Implemented as a new Shopify-backed category that lives alongside Originals / Prints / Curated / Digital — never overpowering the documented-transformation core identity.

## Backend / Data Source

Tracie's Picks is sourced from Shopify (same pipeline as the rest of the shop). No Supabase schema changes needed.

- **Shopify product_type:** `Tracie's Pick`
- **Optional Shopify tag:** `tracie-pick` (used for homepage "featured" subset — first 4 wins, sorted by Shopify's default order)
- Admin uploads new items via Shopify with that product_type, and they automatically appear in the filter, collection page, and homepage strip.

## 1. Shop page — new filter tab (`src/pages/Shop.tsx`)

Add a 5th entry to the `FILTERS` array, placed after Curated to match the requested order:

```
Originals · Prints · Curated · Tracie's Picks · Digital
```

Query: `product_type:"Tracie's Pick"`. No other Shop.tsx changes — the existing grid, ProductCard, and loader handle it.

## 2. Product card — optional "TRACIE PICK" badge (`src/components/shop/ProductCard.tsx`)

Add a subtle badge when `node.productType === "Tracie's Pick"`. Reuses existing badge slot conventions (top-left, sharp corners, rust border, off-white bg, uppercase tracked micro-type) so it sits next to — not on top of — existing "1 of 1" / "Limited" badges. Stacked vertically when both apply. Used sparingly: only renders for Tracie's Picks products, no animation, no color flash.

## 3. Dedicated collection page (`src/pages/TraciesPicks.tsx` + route)

New route: `/shop/tracies-picks`

Structure mirrors `Shop.tsx` exactly — same SiteNav, Seo, hero band, grid spacing, SiteFooter — but tuned editorially:

- **Hero eyebrow (serif italic, stone-500):** "Selected by Tracie."
- **Hero headline (font-heading, uppercase, tight):**
  `Not thrifted.` / `Still worthy.` — rust accent on the second line
- **Hero subline:** "Hand-selected apparel, objects, and lifestyle goods chosen for the Thrift 56 world."
- **Body:** reuses `useShopifyProducts(100, 'product_type:"Tracie\\'s Pick"')` + the same `ProductCard` grid (2 / 3 / 4 cols).
- Empty state: "Tracie hasn't picked anything new yet. Check back soon."

Registered in `src/App.tsx` alongside `/shop`.

## 4. Homepage featured strip (`src/components/TraciesPicksStrip.tsx`)

New small section — 4 cards max — added to **both** `src/pages/Index.tsx` and `src/pages/IndexV2.tsx`, placed *after* the existing curated/transformation content so it never competes with Originals or Featured Drop.

- Eyebrow: serif italic "From the studio shelf"
- Heading: "Tracie's Picks"
- Right-aligned link: "See all →" → `/shop/tracies-picks`
- 4-up grid on desktop, 2-up on mobile, reusing `ProductCard`.
- Query: `useShopifyProducts(4, 'product_type:"Tracie\\'s Pick"')`. If fewer than 4 exist, render only what's there. If zero, the section renders nothing (silent absence — never a "coming soon" placeholder).

Placement in `IndexV2.tsx`: between the existing available-now grid and the email capture, so the page rhythm becomes transformation → curated drops → Tracie's lifestyle layer → CTA.

## 5. SEO

- Shop tab change: no SEO change (filter state, same URL).
- New collection page gets its own `<Seo>` tags:
  - Title: `Tracie's Picks — Curated Apparel & Studio Goods | Thrift 56` (<60 chars)
  - Description: "Hand-selected apparel, hats, and lifestyle objects chosen by Tracie for the Thrift 56 world." (<160 chars)
  - Path: `/shop/tracies-picks`

## 6. Visual language guardrails (enforced in implementation)

- Backgrounds: `bg-[#F9F6F0]` page, `bg-stone-100` image wells — same as Shop.
- Type: `font-heading uppercase tracking-tighter` for headlines, serif italic stone-500 for eyebrows.
- Accent: `text-orange-800` / `border-orange-800` for rust details and active tab.
- Edges: `rounded-none` everywhere. No gradients, no neon, no playful chips.
- Badge uses the same stone/rust palette already in `ProductCard`.

## Files touched

- `src/pages/Shop.tsx` — add filter entry
- `src/components/shop/ProductCard.tsx` — add Tracie Pick badge (conditional)
- `src/pages/TraciesPicks.tsx` — **new** collection page
- `src/components/TraciesPicksStrip.tsx` — **new** homepage strip
- `src/App.tsx` — register `/shop/tracies-picks` route
- `src/pages/Index.tsx` and `src/pages/IndexV2.tsx` — mount the strip

No DB migration, no edge function, no admin dashboard changes (Shopify is the CMS for this category).

## What this plan deliberately does NOT do

- Does not add a Supabase `category` column or admin form — Tracie's Picks lives in Shopify like the rest of `/shop`.
- Does not add a "TRACIE PICK" badge to non-Tracie's-Picks products.
- Does not promote Tracie's Picks above Originals or Featured Drop anywhere.
- Does not introduce new colors, fonts, or component primitives.

## Open question

Do you want the homepage strip on **both** `/` (IndexV2 — current default) and `/v1` (legacy Index), or only the current default homepage? Default plan: both, so the legacy page stays in parity. Say "only current" if you want it scoped to IndexV2.
