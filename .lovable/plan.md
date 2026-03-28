

# THRIFT 56 — Brutalist Homepage (Alternate Page)

## Overview
Build a new standalone homepage at `/v2` using brutalist industrial design language. The current homepage at `/` remains untouched. A new route and page component will be created alongside a set of dedicated section components.

---

## Route Setup
- Add `/v2` route in `App.tsx` pointing to a new `src/pages/IndexV2.tsx`

---

## Component Architecture

All new components live in `src/components/v2/`:

### 1. `HeroBrutalist.tsx`
- Responsive grid: mobile stacks image-first, desktop (`lg:grid-cols-2`) text-left / image-right
- **Left column**: Eyebrow "THRIFT 56" in rust + wide tracking; headline "FOUND. TRANSFORMED. RELEASED." in massive black sans; secondary italic serif line; body copy; two CTAs (solid black + outline); micro-tension italic line below
- **Right column**: `hero-tracie.jpg` with absolute positioning + negative margin overhang; CSS filter chain (`contrast-125 saturate-50 sepia-[.25]`); `::after` pseudo-element with inline SVG `feTurbulence` noise at 10% opacity + `mix-blend-overlay`; warm drop shadow
- **Stamp animation**: On mount, the "THRIFT 56" eyebrow scales from 150% → 100% with opacity 0 → 1 via a CSS `@keyframes stamp` animation

### 2. `MarqueeBrutalist.tsx`
- Full-width `bg-stone-950 text-stone-50` bar
- Infinite horizontal scroll via CSS `@keyframes marquee` (60s linear infinite)
- Content strings: "$3 → $185" · "1 of 1 pieces" · "New drops weekly" · "Seen on YouTube" — duplicated for seamless loop
- Dot separator between items

### 3. `BeforeAfterSlider.tsx`
- Title: "FROM FORGOTTEN TO FEATURED"
- Custom React component (no shadcn carousel)
- `aspect-[4/3]` wrapper; "Before" image as base; "After" image absolute on top
- `useState` tracks drag position; `clip-path: polygon()` on After image reveals Before
- Mouse + touch event handlers for drag
- Vertical drag line + circular thumb indicator
- "VIEW THIS PIECE" outline button below
- Uses `before-piece.jpg` and `after-piece.jpg`

### 4. `LatestTransformationBrutalist.tsx`
- Title: "LATEST TRANSFORMATION" (left-aligned)
- Placeholder YouTube iframe in `aspect-video` with `border-4 border-stone-950`
- Flex row below: left = "Original price: $3 thrift vase" (muted, line-through); right = "Transformed: $200 art piece" (bold, rust)
- "WATCH FULL EPISODE" solid button

### 5. `AvailableNowGrid.tsx`
- Title: "AVAILABLE NOW"
- 3-column CSS grid with hardcoded mock product data
- Each card: relative container with Before image base + After image absolute overlay
- Tailwind `group` / `group-hover:opacity-100` for hover reveal transition
- Badges: "1 of 1" (top-right, black bg); "AVAILABLE" (top-left, rust bg) on cards 1-2; "SOLD" (top-left, gray bg, line-through) on card 3
- "VIEW ALL DROPS" outline button

### 6. `EmailCaptureBrutalist.tsx`
- `bg-stone-950` full-width, massive padding
- Headline "DON'T MISS THE NEXT RESURRECTION" (bone white, oversized sans)
- Subtext in muted gray
- Horizontal flex form: transparent input with `border-b-2 border-stone-500`, no focus ring; bone white submit button "GET DROP ALERTS"
- "Next drop in 3 days" in rust italic below form
- Wires into existing `useSubscribe` hook for real functionality

---

## Page Composition — `IndexV2.tsx`
```text
SiteNav
HeroBrutalist
MarqueeBrutalist
BeforeAfterSlider
LatestTransformationBrutalist
AvailableNowGrid
EmailCaptureBrutalist
SiteFooter
```

---

## CSS / Tailwind Changes

Add to `src/index.css`:
- `@keyframes stamp` — scale(1.5) + opacity 0 → scale(1) + opacity 1, 0.4s cubic-bezier
- `@keyframes marquee` — translateX(0) → translateX(-50%), 60s linear infinite
- `@keyframes grain-drift` — background-position shift over 60s for texture overlays

Add corresponding `animate-*` utilities in `tailwind.config.ts`.

---

## Design Tokens Applied
- Backgrounds: `bg-[#F9F6F0]` (bone) content areas, `bg-stone-950` interruption sections
- Typography: `font-sans font-black tracking-tighter` headlines, `font-serif italic text-stone-600` accents
- Accent: `text-orange-800`, `bg-orange-800` for rust; `rounded-none` / `rounded-sm` everywhere
- No bright colors, no pastels, no rounded playful elements

## What Does NOT Change
- Current `/` homepage and all existing components
- SiteNav, SiteFooter (reused as-is)
- All other routes, admin, auth, database, RLS policies

