

## Plan: Kill the Rick Roll on the Published Site

### What I found
The "Rick Roll" video (`dQw4w9WgXcQ`) is appearing in two completely different places, and each has its own root cause. The episodes page already had a separate hardcoded fix in code, but it can't reach the public site until you publish.

**1. Home page → "LATEST TRANSFORMATION" section**
This component (`LatestTransformationBrutalist.tsx`) reads its video from the **backend `episode_drops` table** — not from code. I queried the database. The only row currently in that table is:
- title: "The Oxidized Vessel — Full Transformation"
- status: `live`
- youtube_url: `https://www.youtube.com/embed/dQw4w9WgXcQ` ← Rick Roll

So even after we publish, the homepage will keep showing Rick because the URL is stored in the database. **This must be fixed via a database update, not a code change.**

**2. Episodes page → featured video at the top**
`EpisodeHero.tsx` is hardcoded. It was already updated to `3iDnecn4E60` last turn, but the published site (`thrift56.com`) is still serving the old build. **This needs a Publish/Update from the green Publish button.**

There are also a few other pages that read `youtube_id` from the `episodes` table (e.g. `LatestEpisodeSection` on `/v1`, `EpisodeDetail`, drop cards). Multiple `episodes` rows still have `youtube_id = 'dQw4w9WgXcQ'`. These aren't on the two pages you mentioned, but I'm calling them out so you know they exist.

### The fix (3 parts)

**Part A — Update the database (kills Rick on the home page)**
Run a migration that updates the live `episode_drops` row to point at the real video. I'll set `youtube_url` to `https://www.youtube.com/embed/3iDnecn4E60` (the same video you put in the episodes hero) so something real plays there.

```sql
UPDATE public.episode_drops
SET youtube_url = 'https://www.youtube.com/embed/3iDnecn4E60'
WHERE id = '774f5e69-1a1f-434a-9bcb-50967376771b';
```

This takes effect on the published site **immediately** (backend changes deploy automatically — no Publish needed for this part).

**Part B — Clean up the seed `episodes` rows (optional but recommended)**
Update every `episodes` row whose `youtube_id` is still the Rick Roll placeholder to either blank or the real video, so detail pages and the `/v1` legacy home don't surface it either.

```sql
UPDATE public.episodes
SET youtube_id = NULL
WHERE youtube_id = 'dQw4w9WgXcQ';
```

(Setting to `NULL` makes those components fall back to placeholder UI rather than embedding a fake video. If you'd rather they all play the real one, I can set them to `3iDnecn4E60` instead — your call.)

**Part C — Publish the frontend (kills Rick on /episodes)**
After the database fix, you click the **Publish → Update** button at the top right of the editor. That ships the already-committed `EpisodeHero.tsx` change (`3iDnecn4E60`) to `thrift56.com`. I cannot do this for you — only you can press Publish.

### Out of scope
- No changes to `src/data/episodes.ts` or `src/data/artPieces.ts`. Those mock files aren't rendered by the home or episodes pages — they're legacy fallbacks.
- No structural changes to any component.

### Tiny clarification needed
For Part B, do you want the unset episodes to show a placeholder (set to `NULL`) or all play the new featured video (set to `3iDnecn4E60`)? Defaulting to `NULL` if you don't specify.

### Files touched
- 1 SQL migration (database only) — for Parts A and B
- No frontend file edits needed in this round

