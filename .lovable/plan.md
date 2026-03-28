

# Art Drops — Brutalist Redesign

## Overview
Rewrite `/drops` (`ArtDrops.tsx`) as a brutalist scarcity-driven drop page using hardcoded mock data from `src/data/artPieces.ts`. Creates 6 new section components in `src/components/drops/`, fully replaces the current `ArtDrops.tsx`.

## Components (`src/components/drops/`)

### 1. `DropsHero.tsx` — Hero & Drop Status Bar
- `texture-paper` background, "ART DROPS" in `text-5xl md:text-8xl font-sans font-black tracking-tighter`
- Subtitle + italic serif tension line "No restocks. No duplicates."
- Horizontal status strip below: 3 items in a `divide-x divide-stone-300` row — "DROP #001 LIVE" | "3 pieces available" | "Next drop in 3 days" — stark mono styling

### 2. `DropsFilterBar.tsx` — Filter Bar
- Blocky `border-2 border-stone-950 rounded-none` buttons
- Categories: All Drops, Available, Sold, Giveaway, Raffle
- Active: `bg-orange-800 text-stone-50 border-orange-800`
- Accepts `filter`/`onFilterChange` props

### 3. `DropsGrid.tsx` — Scarcity Product Grid
- `grid-cols-1 md:grid-cols-3 gap-6`, uses mock data from `artPieces.ts`
- Each card uses `group` class:
  - After image shown by default; on hover, before image crossfades underneath via `opacity` transition + `scale-105` zoom
  - Status badge top-right: rust for "AVAILABLE", black for "RAFFLE"/"GIVEAWAY", muted gray + `line-through` for "SOLD"
  - Aggressive title (e.g., "The $3 Vase That Became This")
  - Muted serif story line
  - Value stack: "Original: $3" / "Final Piece: 1 of 1"
  - Dynamic CTA: solid rust for available, outline for raffle/giveaway, disabled gray for archived/sold
- Accepts `filter` prop; filters pieces by status

### 4. `DropsFeatured.tsx` — Featured Drop (Full-Width Break)
- Uses `getFeaturedPiece()` from mock data
- Spans full width, larger image (aspect-[16/9]), expanded description, prominent rust CTA
- Placed between the grid rows or after the grid

### 5. `DropsPreviousSold.tsx` — Previous Drops (Social Proof)
- Title "PREVIOUS DROPS"
- Horizontal `overflow-x-auto snap-x` scroll of archived pieces
- Cards use `grayscale` filter + a rotated "SOLD" stamp overlay (`absolute`, `rotate-[-12deg]`, `text-4xl font-black text-orange-800/30`)
- Compact cards: image + title only

### 6. `DropsEmailCapture.tsx` — Scarcity Footer with Countdown
- `bg-stone-950 py-24` full-width
- "GET FIRST ACCESS TO THE NEXT DROP" in bone white
- Subtext: "One-of-one pieces. No restocks. No second chances."
- Brutalist email input (transparent bg, `border-b-2 border-stone-500 rounded-none`) + bone white "GET DROP ALERTS" button
- Reuses `useSubscribe` hook from existing codebase
- Below form: rust-colored countdown timer (reuse `useCountdown` logic from `DropCountdown.tsx`) showing Days : Hours : Minutes

## Page Composition — `ArtDrops.tsx` (rewritten)
```
SiteNav → DropsHero → DropsFilterBar + DropsGrid (shared filter state) → DropsFeatured → DropsPreviousSold → DropsEmailCapture → SiteFooter
```

## Files
- **Create**: 6 files in `src/components/drops/`
- **Rewrite**: `src/pages/ArtDrops.tsx`
- **No changes** to routes, database, or other pages

## Technical Notes
- Mock data sourced from existing `src/data/artPieces.ts` (no DB calls in this build)
- Reuses existing asset imports (beforePiece, afterPiece, featuredDrop, etc.)
- Existing `DropCountdown` component logic reused inline for the email capture countdown
- `useSubscribe` hook reused for email form functionality

