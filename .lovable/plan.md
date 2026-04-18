

## Plan: Add "Dolly Tray" to Curated

### What gets added
A new row in `art_pieces` with `category='curated'`, `status='available'`, price $20, plus both uploaded photos hosted in the existing public `art-images` Supabase bucket.

### Steps

**1. Upload images to Supabase Storage (`art-images` bucket)**
- Front (Dolly art side) → `curated/t56-006-dolly-tray-front.jpg` → becomes `after_image_url`
- Back (Camtray maker mark) → `curated/t56-006-dolly-tray-back.jpg` → becomes `before_image_url` (used as the secondary "detail" photo on the PDP)

Both end up at public URLs like:
`https://vlohlenmlrzeumwankms.supabase.co/storage/v1/object/public/art-images/curated/t56-006-dolly-tray-front.jpg`

**2. Insert the row via SQL migration**

| Field | Value |
|---|---|
| title | Dolly Tray — "Cup of Ambition" |
| slug | dolly-tray-cup-of-ambition |
| category | curated |
| status | available |
| price | 20 |
| materials | `["Cambro Camtray", "Hand-illustrated", "Made in USA"]` |
| after_image_url | front photo URL |
| before_image_url | back photo URL |
| description | (see below) |

**3. Description copy (retro / brand voice)**

> Pulled straight from a Tennessee thrift shelf — a vintage Cambro Camtray (Huntington Beach, CA, NSF-stamped, made in the U.S.A.) reborn with a hand-drawn portrait of hometown queen Dolly. "Pour Yourself a Cup of Ambition" hits exactly the way it should: equal parts diner-counter nostalgia and Saturday-morning anthem. Cream plastic, soft rounded corners, just the right amount of patina. A 1-of-1 piece of working art — set it under a coffee pot, hang it on the wall, or tip your hat to 9 to 5 every time you walk by. Backstamped, signed by time, ready for its second life.

### Why this approach
- Reuses the existing `art-images` bucket and `art_pieces` schema — no new tables, components, or routes needed.
- The piece will automatically appear on `/drops` under "CURATED FINDS" via the existing `DropsCurated` component (it queries `category='curated'` + `status!='archived'`).
- PDP at `/drops/dolly-tray-cup-of-ambition` will work via `ArtPieceDetail` automatically.

### Files touched
- 0 frontend files
- 1 SQL migration (1 INSERT)
- 2 image uploads to Supabase Storage

