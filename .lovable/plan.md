

# Episode Hub — Brutalist Redesign

## Overview
Rewrite `/episodes` as a brutalist content-to-commerce funnel with hardcoded mock data. Creates 6 new section components in `src/components/episodes/`, rewrites `src/pages/Episodes.tsx` to compose them.

## Components (`src/components/episodes/`)

### 1. `EpisodeHero.tsx`
- `texture-paper` background, title "EVERY PIECE HAS A STORY" (`text-5xl md:text-7xl font-sans font-black tracking-tighter`), serif italic subtitle
- CSS triangle arrow pointing down (`border` trick + `animate-bounce`)
- Full-width YouTube iframe in `aspect-video` with `border-4 border-stone-950`
- Below: bold title + 3-column stats row (`divide-x divide-stone-300`): Original Price / Time / Result
- Two CTAs: solid black "WATCH FULL EPISODE ON YOUTUBE" + outline "VIEW THIS PIECE"

### 2. `EpisodeCategoryFilter.tsx`
- Horizontal flex of blocky `border-2 border-stone-950 rounded-none` buttons
- Categories: All, Thrift Hunts, Transformations, Drops, Studio
- Active: `bg-orange-800 text-stone-50 border-orange-800`; inactive: `bg-transparent text-stone-950`
- Accepts `filter`/`onFilterChange` props

### 3. `EpisodeGrid.tsx`
- `grid-cols-1 md:grid-cols-3 gap-6`, 6 hardcoded cards using existing thumb assets
- Each card: `group` class, thumbnail with `group-hover:scale-105`, overlay hook text ("$3 → THIS?"), "Watch Now" fades in on hover (`opacity-0 group-hover:opacity-100`)
- Below image: aggressive title, muted serif micro-details (views, EP#, category tag)
- Status badge: rust "AVAILABLE" or gray strikethrough "SOLD"
- Accepts `filter` prop to show/hide by category

### 4. `EpisodeBingeReel.tsx`
- Title "WATCH WHAT HAPPENS NEXT"
- `overflow-x-auto snap-x snap-mandatory` horizontal scroll, ~8 compact cards (`snap-start`)
- Progress bar at bottom: `h-1 bg-stone-800` track with rust indicator, synced via `useRef` + `onScroll`

### 5. `EpisodeStorySteps.tsx`
- Title "FROM THRIFT TO ART"
- 4 horizontal steps (Find, Transform, Reveal, Drop) connected by `h-1 bg-stone-950` line
- Each step: Lucide icon in a `w-12 h-12 border-2 border-stone-950` circle + label below

### 6. `EpisodeCtaBreak.tsx`
- `bg-stone-950 py-24` full-width block
- "DON'T MISS THE NEXT TRANSFORMATION" in bone white
- `bg-stone-50 text-stone-950 rounded-none` subscribe button
- `fixed bottom-6 right-6 z-50 bg-orange-800 text-white` floating badge: "Next drop in 3 days"

## Page Composition — `Episodes.tsx` (rewritten)
```
SiteNav → EpisodeHero → EpisodeCategoryFilter + EpisodeGrid (shared filter state) → EpisodeBingeReel → EpisodeStorySteps → EpisodeCtaBreak → SiteFooter
```

## Files
- **Create**: 6 files in `src/components/episodes/`
- **Rewrite**: `src/pages/Episodes.tsx`
- **No changes** to routes, database, other pages, or shared components

