

## Plan: Upgrade Art Drops into a Tiered Drop System

Transform the existing `/drops` page from a flat product grid into a structured, narrative-driven drop platform with three tiers: **Resurrected**, **Curated Finds**, and **The Vault**.

---

### Database Migration

Add a `category` column to the `art_pieces` table:

```sql
ALTER TABLE public.art_pieces 
ADD COLUMN category text NOT NULL DEFAULT 'resurrected' 
CHECK (category IN ('resurrected', 'curated', 'vault'));
```

This lets each piece be classified independently from its status (available, raffle, giveaway, auction, archived).

---

### Page Structure — `src/pages/ArtDrops.tsx`

Reorganize the page layout from top to bottom:

1. **Hero** (upgraded `DropsHero`)
2. **Current Release** (upgraded `DropsFeatured`, moved up)
3. **Resurrected Section** (new component)
4. **Curated Finds Section** (new component)
5. **The Vault Section** (new component)
6. **Archive** (upgraded `DropsPreviousSold`)
7. **Email Capture** (updated copy)

Remove the old `DropsFilterBar` + `DropsGrid` combo entirely. Each tier becomes its own section with distinct visual treatment.

---

### Component Changes

**`DropsHero.tsx`** — Update copy:
- Title: `DROP #001 — LIVE NOW`
- Subtext: `From Forgotten to Featured`
- Move countdown timer into hero with rust accent
- Keep status strip with pieces count + next drop timer

**`DropsFeatured.tsx` → `DropsCurrentRelease.tsx`** — Rename and upgrade:
- Section label: `CURRENT RELEASE`
- Add before/after slider (reuse existing `BeforeAfterSlider` logic)
- Add edition label ("1 of 1"), value stack (original → final price), status badge
- Pull from database via `useFeaturedArtPiece()`

**New: `DropsResurrected.tsx`** — Primary tier section:
- Header: `RESURRECTED` with serif subtitle
- 3-column grid of art pieces where `category = 'resurrected'`
- Each card: before/after hover swap, title, price, "1 of 1" tag, status badge, story snippet, "Watch Transformation" button (links to episode), "View Piece" link
- Uses `useArtPieces()` filtered by category

**New: `DropsCurated.tsx`** — Clean grid section:
- Header: `CURATED FINDS`
- Cleaner, faster-browsing grid layout
- Each card: image, title, price, "Field Pick" tag
- Lighter visual weight than Resurrected

**New: `DropsVault.tsx`** — Premium section:
- Dark background (`bg-stone-950`), bone white text
- Header: `THE VAULT`
- More spacing, slower premium feel
- Each card: image, title, price, "Archive Grade" tag
- Minimal, high-contrast treatment

**`DropsPreviousSold.tsx` → `DropsArchive.tsx`** — Rename and upgrade:
- Header: `ARCHIVE`
- Grayscale thumbnails with rotated "SOLD" stamp (already exists)
- Add drop number label: `DROP #000 — SOLD OUT`

**`DropsEmailCapture.tsx`** — Update copy:
- Headline: `GET DROP ACCESS`
- Subtext: `Early releases. Private drops. No noise.`

**Delete:** `DropsFilterBar.tsx`, `DropsGrid.tsx` (replaced by tier sections)

---

### Product Card Updates — `ArtPieceCard.tsx`

Add support for tier-specific sub-labels:
- Resurrected: "1 of 1", "Episode Piece"
- Curated: "Field Pick"
- Vault: "Archive Grade"

Add `video_url` / episode link support with a "Watch Transformation" overlay icon on cards.

Micro-UX: SOLD items render grayscale. AVAILABLE items full color. Status remains a visual badge on the card (not a filter).

---

### Data Layer

- `useArtPieces()` already supports status filtering; extend to support category filtering
- Local hardcoded `artPieces` in `src/data/artPieces.ts`: add `category` field to mock data for components still using it
- Update `ArtPiece` type in `artPieces.ts` to include `category`

---

### Routing

No route changes needed. `/drops` stays, `/drops/:slug` stays. The old `DropsGrid`/`DropsFilterBar` are simply replaced inline.

---

### Summary of files

| Action | File |
|--------|------|
| Migrate | `art_pieces` table — add `category` column |
| Edit | `src/pages/ArtDrops.tsx` — new section layout |
| Edit | `src/components/drops/DropsHero.tsx` — updated copy + countdown |
| Rename+Edit | `DropsFeatured.tsx` → `DropsCurrentRelease.tsx` |
| Create | `src/components/drops/DropsResurrected.tsx` |
| Create | `src/components/drops/DropsCurated.tsx` |
| Create | `src/components/drops/DropsVault.tsx` |
| Rename+Edit | `DropsPreviousSold.tsx` → `DropsArchive.tsx` |
| Edit | `src/components/drops/DropsEmailCapture.tsx` — copy update |
| Edit | `src/data/artPieces.ts` — add category field |
| Edit | `src/hooks/useSupabaseData.ts` — category filter support |
| Delete | `DropsFilterBar.tsx`, `DropsGrid.tsx` |

