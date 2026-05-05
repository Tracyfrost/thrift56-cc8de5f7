## Problem

All 7 egg products exist in Shopify Admin (6 individual eggs + 1 "Reliquary — Full Set of Six" bundle), but only 2 appear on `/shop`. The Storefront API only returns products that are **published to the Online Store / Headless sales channel**. The 5 missing eggs were created without that publication, so the storefront can't see them.

The two uploaded group photos are also not yet attached to the bundle product.

## Plan

### 1. Republish all 7 egg products to make them visible on `/shop`
Re-run `shopify--update_product` on each of the 7 egg products (IDs 7801900859469, 7801901023309, 7801901547597, 7801903185997, 7801911738445, 7801920159821, 7801931530317). Updating through our tool publishes them to all sales channels Lovable manages, which restores Storefront API visibility.

### 2. Attach the two group photos to the "Reliquary — Full Set of Six" bundle (ID 7801931530317)
- `T56-021_PORCELAIN-EGG-BOX_EDT_004-2.jpg` — front lineup of all six eggs (primary image)
- `T56-021_PORCELAIN-EGG-BOX_EDT_003-2.jpg` — top-down open view of all six interiors (secondary)

Copy them to `src/assets/eggs/` and pass via `images` on `update_product`. Note: Shopify update_product replaces all existing images on the product, so any current bundle images would be replaced by these two group shots — confirm that's desired (it should be, since the bundle should *only* show group photos, not single eggs).

### 3. No frontend code change needed
`/shop` already pulls live from Shopify and the "Curated" filter (`product_type:Curated`) already matches all 7 eggs. Once they're published they'll appear. The bundle will naturally render alongside the singles in the grid (priced $120 vs. $25 for singles), serving as the "Group purchase option."

### 4. Verify
After publish, reload `/shop` → "Curated" tab should show all 7 cards (6 numbered eggs + 1 Reliquary set).

## Open question

The bundle product currently sits in the same grid as the singles. Do you want it visually distinguished (e.g., a "COMPLETE SET — SAVE $30" ribbon on the card, or pinned to the top of the Curated tab), or is showing it as a regular card (with its $120 price tag making it obvious) sufficient for v1?