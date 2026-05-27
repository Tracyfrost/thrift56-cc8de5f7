## Goal
Create a new 1-of-1 Curated product in Shopify for the vintage Roaring Twenties rocks glasses (Charlie Chaplin / Clara Bow / Ramon Novarro / John Barrymore film-strip motif). It should appear in the live Shop and on the Tracie's Picks strip-eligible Curated tier.

## Connect Shopify
Reconnect Shopify (auth expired) so the product can be created in the live store.

## Product details
- **Title:** Roaring 20s Rocks Glasses — Set of 2
- **Handle/SKU:** T56-066_ROARING-20S-ROCKS
- **Product Type:** Tracie's Pick  *(so it surfaces in the Tracie's Picks strip per existing filter `product_type:"Tracie's Pick"`)*
- **Vendor:** Thrift 56
- **Tags:** `1-of-1`, `curated`, `vintage`, `barware`, `roaring-twenties`, `silent-film`, `tracies-pick`
- **Price:** $48 (set of 2)
- **Inventory:** 1 (true 1-of-1 set), tracked via Shopify, `inventory_policy: deny`
- **Images:** all 3 uploaded photos (hero = the pair shot `_001`, then Chaplin `_003`, Clara Bow `_002`), copied into `src/assets/` and uploaded as product images.

## Old Hollywood description (smooth, cinematic — matches brand voice)
> Found in a quiet corner of a Texas thrift shop, wrapped in dust and forgotten glamour — a pair of vintage **Roaring Twenties** rocks glasses, gilded at the rim, banded in sepia film-strip frames. Chaplin in *The Gold Rush*. Clara Bow in *Kid Boots*. Barrymore. Novarro. Pickford. The silent era, pressed onto glass.
>
> Heavy in the hand. Honest weight. The kind of tumbler that wants two fingers of bourbon, a low lamp, and a record spinning in the next room. Gold rims still hold their shine. Sepia tones aged exactly the way they should.
>
> One pair. No reissue. Released into the wild for whoever sets the right scene.
>
> **Set of 2 · ~10oz lowball · circa 1970s reproduction of 1920s film stills · gentle hand-wash only**

## Where it shows up
- `/shop` grid (loads all Shopify products) — appears automatically.
- `/shop/tracies-picks` and homepage `TraciesPicksStrip` — appears automatically because product type is "Tracie's Pick".
- Badges that auto-render from existing `ProductCard` logic:
  - `1 of 1` (from `1-of-1` tag)
  - `Tracie Pick` (from product type)

## Out of scope
- No layout, component, or styling changes.
- No new pages or routes.
- No Supabase changes (this is a Shopify product, not an `art_pieces` row).
