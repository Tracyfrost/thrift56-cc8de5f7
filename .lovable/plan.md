

# Product Detail Page — Brutalist Gallery Acquisition

## Overview
Create a new brutalist Product Detail Page at `/product/:slug` using hardcoded mock data from `src/data/artPieces.ts`. This is a standalone high-conversion page separate from the existing `/drops/:slug` detail page.

## Architecture — Single Page Component

### `src/pages/ProductDetail.tsx`
A 2-column responsive layout (`grid-cols-1 lg:grid-cols-2`) with `bg-stone-50` and `::after` SVG film grain overlay on the page wrapper.

**Column 1 — Visual Story (left, scrollable):**
- Vertical image stack separated by `border-b-4 border-stone-950`
- Image 1: After/hero shot (full-width)
- Image 2: Before shot with "BEFORE" label overlay
- YouTube iframe in `aspect-video` container with `border-4 border-stone-950`
- Image 3: Reuse after image as macro detail shot
- "Viewer Reactions" block: 4-5 hardcoded fake YouTube-style comments in a raw list (`border-l-4 border-stone-300` left-border styling, mono/serif mix)

**Column 2 — Brutalist Buy Box (right, `sticky top-8`):**
- "1 OF 1 WORLDWIDE" badge: `bg-stone-950 text-stone-50` full-width block
- Aggressive title: `text-3xl md:text-4xl font-sans font-black tracking-tighter`
- Value Stack:
  - "Thrifted Origin: $3" — `text-stone-400 line-through`
  - "Labor & Vision: 4 Hours" — `font-serif italic text-stone-600`
  - "Acquisition Price: $185" — `text-3xl font-black text-orange-800`
- CTA: Full-width `bg-orange-800 text-stone-50 rounded-none` button "ACQUIRE THIS PIECE" (disabled + gray if status is "archived")
- Micro-tension: `font-serif italic text-stone-500 text-sm` disclaimer
- Artist's Manifest: Collapsible accordion using existing `Accordion` component — materials list with brutalist styling
- Back to Drops link at bottom

## Route
- Add `/product/:slug` to `App.tsx` importing `ProductDetail`
- Uses `getArtPieceBySlug()` from mock data (no DB calls)

## Files
- **Create**: `src/pages/ProductDetail.tsx`
- **Edit**: `src/App.tsx` (add route)
- **No changes** to database, existing pages, or shared components

