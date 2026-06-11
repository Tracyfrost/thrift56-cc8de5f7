## Goal
Add Tracie's new original artwork **T56-074 BUMBLEDRIP** to the Drops page under **Resurrected** (Original Art / Tracie's transformations) at $75, one-of-one.

## What gets added

**Database** — new row in `art_pieces`:
- `slug`: `bumbledrip`
- `title`: `BUMBLEDRIP`
- `category`: `resurrected`
- `status`: `available`
- `price`: `75`
- `before_image_url`: bare ornate silver frame (SEL_001)
- `after_image_url`: finished framed piece (Bubledrip_complete.png)
- `materials`: `['Vintage ornate frame', 'Hand-cut paper collage', 'Black glitter substrate', 'Honey-drip illustration', 'Sealed under glass']`
- `description`: groovy neo-retro copy (draft below)

**Assets** — upload the 2 hero images via `lovable-assets` CLI (CDN, not committed binaries):
- `user-uploads://T56-074_BUMBLEDRIP_SEL_001.jpg` → before (raw silver frame)
- `user-uploads://Bubledrip_complete.png` → after (finished framed)

## Description draft (groovy / neo-retro)
> Far out, little worker. A regal bumblebee crowned in honeycomb, haloed by molten honey-drops and hand-cut petals — float-stacked over inky black glitter and locked behind a baroque frame Tracie hand-painted bone white. Equal parts 70s record-sleeve and Victorian apothecary print. One bee. One frame. One of one.

## Progression shots & video — out of scope for this turn
The `art_pieces` table has no `studio_photos[]` or `video_url` columns. The 4 progression collage shots (SEL_002–005), the in-progress white-frame shot, and the two MP4s are **not displayed** by this change. If you want them shown on the detail page as a process gallery + reel, that's a follow-up (schema migration + UI section).

## Technical notes
- Insert via `psql` (admin RLS would block from client; direct SQL is fine).
- Images uploaded with `lovable-assets create --file /mnt/user-uploads/...` → store the resulting CDN `url` directly in the text columns.
- Will appear automatically in `DropsResurrected` on `/drops` and on `/drops/bumbledrip`.
- No Shopify product is created (Resurrected pieces are Supabase-driven, unlike Curated/Tracie's Picks which live in Shopify).

## Confirm before I build
1. OK to skip progression shots + videos for now? (Or want me to add a schema + gallery UI in the same turn?)
2. Description tone — keep as drafted, or push more 60s psychedelic vs. 70s funk?
