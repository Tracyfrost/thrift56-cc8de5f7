## Plan: Wire `/episodes` to Supabase + clean up test data

Safe to proceed — frontend-only code changes plus deleting 3 known test rows. No schema changes, fully reversible.

### Phase 1a — Delete test rows
Remove these 3 episodes from the database:
- `test-3`
- `thumb-test`
- `test-ep-2`

### Phase 1b — Wire `/episodes` page to Supabase

Replace hard-coded mock data in three components with the existing `useEpisodes` / `useFeaturedEpisode` hooks (already used on the home page).

**1. `src/components/episodes/EpisodeHero.tsx`**
- Use `useFeaturedEpisode()` (the row flagged `is_featured = true`).
- Iframe: `https://www.youtube.com/embed/${episode.youtube_id}?rel=0`.
- Title, thrift price, summary pull from the row.
- "Watch on YouTube" button uses `https://www.youtube.com/watch?v=${youtube_id}`.
- Fallback: if no featured episode or no `youtube_id`, show a "Coming soon" placeholder (keeps page from breaking before you flag one).

**2. `src/components/episodes/EpisodeGrid.tsx`**
- Replace `mockEpisodes` with `useEpisodes(filter)`.
- Each card links to `/episodes/:slug`.
- Thumbnail: `episode.thumbnail_url` → fallback `https://img.youtube.com/vi/${youtube_id}/hqdefault.jpg`.
- Hide the "Available / Sold" badge for now (was tied to mock data; can re-wire to `art_pieces.status` later).

**3. `src/components/episodes/EpisodeBingeReel.tsx`**
- Replace `bingeItems` with `useEpisodes()` (latest ~8, excluding the featured one to avoid duplication with the hero).
- Same thumbnail fallback. Each tile links to `/episodes/:slug`.

### Phase 2 — You enter the 4 episodes in Admin

Go to `/admin` → Episodes tab → New episode. For each of the 4 videos:
- **YouTube ID** (the 11-char string after `v=` in the URL)
- **Title**, **slug** (URL-safe, don't rename after publishing), **description**
- **Category**: pick one — `studio` is a good fit for the launch/intro video; `transformation` or `thrift-hunt` for the 3 product videos
- **Episode number**, **published_at**
- **`is_featured`**: flag exactly ONE as the hero (your call which one)
- Optional: custom thumbnail, before/after images, thrift store, price, transformation summary

As soon as you save, the hero + grid + binge reel update — no code redeploy needed.

### What stays the same
- `/episodes/:slug` detail page (already DB-driven)
- Home page strips (already DB-driven)
- Admin dashboard CRUD (already works)
- Category filter (keys already match DB values)

### Questions for the user
1. The launch/intro video — should I default its category to `studio`, or do you want a different bucket?
2. After you enter all 4, do you want me to regenerate `public/sitemap.xml` with the real slugs?
