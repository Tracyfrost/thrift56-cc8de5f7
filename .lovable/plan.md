

**Goal:** Add T56-004 Barcino Mosaic Cats as a new 1-of-1 Curated product in Shopify, fully wired for Add to Cart with inventory of 1.

## What I'll do

1. **Copy the uploaded image** to `src/assets/products/T56-004_BARCINO-MOSAIC-CATS.jpg` so it can be uploaded to Shopify.

2. **Create the product in Shopify** via `shopify--create_product`:
   - **Title:** Barcino Mosaic Cats — Pair
   - **SKU:** T56-004
   - **Price:** $70.00
   - **Product Type:** Curated (so it shows in the CURATED filter)
   - **Vendor:** Thrift 56
   - **Tags:** `1-of-1, curated, found-object, barcino, mosaic, gaudi` (the `1-of-1` tag triggers the "1 of 1" badge on cards + PDP)
   - **Variant:** single default variant, qty 1, `inventory_management: shopify`, `inventory_policy: deny` (auto-flips to Sold Out after one purchase)
   - **Image:** the uploaded mosaic cats photo

3. **Mysterious description** (Thrift 56 voice — observational, slightly rebellious, calm but sharp):

   > *Two cats. Glass skin. Found together — they refuse to be separated.*
   >
   > Hand-laid mosaic in the Gaudí tradition out of Barcelona — every shard placed by someone whose name nobody wrote down. One sits, watching. The other prowls. They came from a shelf in a place that didn't know what it had.
   >
   > Stained-glass colors over hand-shaped form. Wire whiskers. Amber eyes that hold the light differently depending on the room.
   >
   > One pair. Once it's gone, it stays gone.
   >
   > **The Find:** Pulled from a forgotten estate lot in the Pacific Northwest.
   > **Condition:** Excellent. Both pieces structurally sound, no missing tiles, original whiskers intact.
   > **Dimensions:** Approx. 5–6" tall each.
   > **Origin:** Barcino, Barcelona — handmade ceramic mosaic.

## Why no frontend code changes are needed

The site already handles everything automatically once the product exists in Shopify:
- `Shop.tsx` CURATED filter pulls products by `productType: "Curated"`
- `ProductCard.tsx` line 19 reads the `1-of-1` tag and renders the badge
- `ShopifyProductDetail.tsx` shows the "1 of 1 Worldwide" badge for the same tag
- Add to Cart → Shopify cart → Checkout flow is fully live
- Inventory of 1 + `deny` policy means it auto-marks Sold Out after purchase

## After creation

You'll need to manually set the actual stock count to **1** in the Shopify Admin (Inventory section → set "Available" to 1) — same constraint as T56-003, since inventory level adjustments aren't exposed via the available tools. Once the store is claimed, this is a 10-second action.

