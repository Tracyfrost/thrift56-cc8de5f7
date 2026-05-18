## Move two products into "Tracie's Picks" in Shopify

Both products currently have `product_type: "Curated"`. Update them to `product_type: "Tracie's Pick"` so they flow into the new Tracie's Picks filter, dedicated collection page, homepage strip, and earn the "TRACIE PICK" badge — automatically, with no code or DB changes.

### Updates

1. **Starbucks Mini Mug Ornament — Curated Find**
   - Product ID: `7817081454669`
   - `product_type`: `Curated` → `Tracie's Pick`
   - Add tag: `tracie-pick` (keeps existing tags: curated, cute, gift-under-25, holiday, mini-mug, ornament, small-things, starbucks)

2. **Captain Texas Tee — Curated Find**
   - Product ID: `7817083486285`
   - `product_type`: `Curated` → `Tracie's Pick`
   - Add tag: `tracie-pick` (keeps existing tags: brand-new, captain-texas, curated, hand-picked, t-shirt, texas)

### What this does automatically (no code changes)

- Appears under the **Tracie's Picks** filter on `/shop`
- Appears on `/shop/tracies-picks` collection page
- Eligible for the homepage **Tracie's Picks** 4-up strip
- Renders the subtle **TRACIE PICK** badge on its product card
- Removed from the **Curated** filter (since type is no longer `Curated`)

### Titles

Both keep "— Curated Find" in the title. Recommend renaming to "— Tracie's Pick" for narrative consistency, but only if you confirm — say the word and I'll include the title rename in the same update.

### Not in scope

- No code edits (the Tracie's Picks frontend already shipped and reads `product_type` live from Shopify)
- No new Shopify collections or metafields
- No price, inventory, image, or description changes
