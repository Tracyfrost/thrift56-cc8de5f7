

## Goal
Add T56-005 Vintage Wheaties License Plate Collection as a 1-of-1 Curated Shopify product. Frontend "Add to Cart" override is already live for `1-of-1` tagged items, so **no code changes required** — Shopify product creation is the only step.

## Image observation
The photo shows a curated **collection of ~13 vintage 1950s license plates** (CA, NV, MT ×2, OR, NC, WA, WY, NM, AZ, ID, TX, UT + one 1974/75 MN) — Wheaties cereal-premium era. This is a set, not a single plate, so the title and copy will reflect that.

## Steps

1. **Save image** → `lov-copy user-uploads://T56-005_VINTAGE-WHEATIES-LICPLATE_EDT_001.jpg src/assets/products/T56-005_VINTAGE-WHEATIES-LICPLATE.jpg`

2. **Create Shopify product** via `shopify--create_product`:
   - **Title:** Vintage Wheaties License Plate Collection
   - **Vendor:** Thrift 56
   - **Product Type:** `Curated`
   - **Tags:** `1-of-1, curated, found-object, wheaties, vintage, americana, license-plate, 1950s, collection`
   - **Variant:** SKU `T56-005`, single, `inventory_management: shopify`, `inventory_policy: deny`
   - **Image:** the saved asset
   - **Price:** TBD — see questions below

3. **Description (Thrift 56 voice — exclusive, retro, mysterious):**

> *Breakfast of Champions. Thirteen states. One impossible set.*
>
> The 1953 Wheaties Premium License Plate Collection — a cereal-box giveaway that turned a generation of kids into amateur cartographers. Six box tops, a mail-in coupon, a few weeks of patience. Out came a miniature plate from a state most kids would never visit.
>
> Survived seventy years of attic boxes and one estate auction nobody else showed up to. California gold. Nevada green. Montana's outline twice (someone really wanted that one). Wyoming's bucking bronco still mid-air. New Mexico bleeding *Land of Enchantment* red. Idaho's *World Famous Potato* deadpan honesty.
>
> Most kids lost half theirs by '55. Almost nobody kept the full run. This one did.
>
> **The Find:** Pacific Northwest estate, original mailing envelope long gone.
> **Era:** 1953 Wheaties cereal-premium series (plus one wandering 1974 Minnesota that snuck in).
> **Condition:** Original paint, honest age-appropriate wear, all plates structurally sound.
> **Quantity:** One complete-ish set. Worldwide.

4. **Frontend verification (no code changes):** the override that shipped earlier — `isPurchasable = firstVariant?.availableForSale || isOneOfOne` — fires automatically for the `1-of-1` tag on both ProductCard and PDP. T56-005 will show "Add to Cart" the moment it's live in Shopify, sandbox flag notwithstanding.

## Two things I need from you before I run the tool

**Price** — pick one:
- $85 — mid tier, between trolley ashtray ($45) and mosaic cats ($70)
- $120 — premium, reflects rare 13-plate complete-ish set
- $150 — collector pricing for full Wheaties premium series
- Other (tell me)

**Title framing** — pick one:
- *Vintage Wheaties License Plate Collection* (recommended — matches the photo)
- *1953 Wheaties Premium License Plate Set* (leads with the year and cereal story)
- *Vintage Wheaties License Plate* (your original singular phrasing)

