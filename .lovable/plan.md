

## Plan: Thrift 56 Square Commerce Foundation (Phase 1)

This adds the `thrift_items` and `episode_drops` tables, a new `/shop/:slug` detail page, wires homepage sections to live data, and sets up realtime for sold-status updates.

---

### 1. Database Migration — Two New Tables

**`thrift_items`**
- `id` uuid PK, `square_catalog_id` text unique, `slug` text unique, `title` text
- `category` text (default `'resurrected'`, constrained to resurrected/curated/vault)
- `story` text (markdown), `youtube_episode_url` text
- `before_image_url` text, `after_image_url` text, `episode_number` int
- `is_sold` boolean default false, `tags` text[], `price` numeric
- `created_at` timestamptz default now(), `updated_at` timestamptz default now()
- `updated_at` trigger via existing `update_updated_at_column()` function
- Enable realtime: `ALTER PUBLICATION supabase_realtime ADD TABLE public.thrift_items`

**`episode_drops`**
- `id` uuid PK, `title` text, `youtube_url` text, `drop_date` timestamptz
- `status` text default `'scheduled'` (scheduled/live/completed)
- `created_at` timestamptz default now()

**RLS for both tables:**
- Public SELECT for everyone
- ALL for authenticated users with admin role (using existing `has_role()`)

**Seed 5 realistic items** via insert tool (not migration):
- "Oxidized Vessel No. 3" — resurrected, $185, episode 12
- "Reclaimed Frame No. 7" — resurrected, $240, episode 14
- "Weathered Basin" — curated, $160, sold
- "Industrial Shelf Unit" — vault, $320, episode 11
- "Patina Mirror" — curated, $95, episode 15

Each with a markdown story, placeholder before/after image URLs, and tags.

---

### 2. Data Hooks — `useThriftItems` in `useSupabaseData.ts`

Add to existing hooks file:
- `useThriftItems(opts?)` — query with optional category/sold filters
- `useThriftItem(slug)` — single item by slug
- `useFeaturedThriftItem()` — first non-sold item, ordered by created_at desc
- `useEpisodeDrops()` — all episode_drops ordered by drop_date
- Realtime subscription hook `useThriftItemRealtime()` — listens for `UPDATE` on `thrift_items` and invalidates queries when `is_sold` changes

---

### 3. New Page — `/shop/:slug` (ShopItemDetail.tsx)

Matches existing `ArtPieceDetail.tsx` aesthetic exactly:
- Same SiteNav + SiteFooter wrapper
- Two-column layout: scrollable image stack (after, before, YouTube embed) on left; sticky info panel on right
- Info panel: category tag (rust badge), title (font-sans font-black tracking-tighter), markdown story rendered, tags as outlined chips
- Value Stack: episode number, original thrift price context
- CTA: "ACQUIRE THIS PIECE" button (bg-stone-950) when available; "SOLD — VIEW STORY" (grayscale, muted) when sold
- "1 OF 1 WORLDWIDE" badge in stone-950
- Related items grid at bottom (3-col, same card style as AvailableNowGrid)
- Realtime subscription on this specific item's `is_sold` field

---

### 4. Homepage Sections — Wire to Live Data

**AvailableNowGrid.tsx** — Replace mock data:
- Query `thrift_items` (limit 6, non-sold first)
- Keep exact same card markup (aspect-square, hover before/after swap, 1-of-1 badge, status badge)
- Link cards to `/shop/:slug` instead of `/drops`

**LatestTransformationBrutalist.tsx** — Wire to data:
- Query latest `episode_drops` where status = 'live' or most recent 'completed'
- Use the `youtube_url` from the record
- Show linked thrift_item price context if available

---

### 5. Nav Update — Add "Shop" Link

Add `{ to: "/shop", label: "Shop" }` to navLinks array in SiteNav.tsx, positioned before "Art Drops". This links to `/drops` for now (or a future shop index), but individual items route to `/shop/:slug`.

---

### 6. Routing — App.tsx

Add: `<Route path="/shop/:slug" element={<ShopItemDetail />} />`

---

### Files to Create/Edit

| File | Action |
|------|--------|
| Migration SQL | Create `thrift_items` + `episode_drops` tables, RLS, trigger, realtime |
| Insert SQL | Seed 5 items |
| `src/hooks/useSupabaseData.ts` | Add thrift_items + episode_drops hooks + realtime |
| `src/pages/ShopItemDetail.tsx` | New detail page |
| `src/components/v2/AvailableNowGrid.tsx` | Wire to live thrift_items data |
| `src/components/v2/LatestTransformationBrutalist.tsx` | Wire to episode_drops |
| `src/components/SiteNav.tsx` | Add Shop nav link |
| `src/App.tsx` | Add /shop/:slug route |

