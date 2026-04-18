

## Plan: Fix 4 Homepage Issues

### 1. AvailableNowGrid — use real Shopify products
**File:** `src/components/v2/AvailableNowGrid.tsx`

Currently pulls from Supabase `useThriftItems` (empty → grey boxes). Switch to `useShopifyProducts(6)` so the 5 real curated products (Vespa Tin Sign, Firebird Set, Cable Car Ashtray, Barcino Cats, Wheaties Plate) render with their real Shopify CDN images.

- Map Shopify edges → render `node.images.edges[0].node.url` as the product image.
- Link cards to `/product/{handle}` (existing `ShopifyProductDetail` route).
- Use `node.priceRange.minVariantPrice.amount` for price.
- Use `node.variants.edges[0].node.availableForSale` for the Sold/Available badge.
- **Fallback when no image:** instead of grey `bg-stone-200`, render `bg-stone-950` with the product title centered in rust (`text-orange-800`), brutalist sans, uppercase — keeping brand styling.

### 2. LatestTransformationBrutalist — remove Rick Astley, accept video ID prop
**File:** `src/components/v2/LatestTransformationBrutalist.tsx`

- Add prop `youtubeId?: string` (default `undefined`).
- Remove hardcoded `dQw4w9WgXcQ` fallback.
- Continue trying live drop from Supabase first; if neither prop nor live drop has a video, render a dark placeholder card:
  - `bg-stone-950`, same `border-4 border-stone-950 shadow-[4px_4px_0_0_hsl(var(--rust))]` framing,
  - centered text: "EPISODE COMING SOON" in brutalist sans white, with serif italic stone-500 sub-line "New transformation dropping shortly."
- IndexV2 keeps using it without props.

### 3. BeforeAfterSlider — full-width column, max-width 700px, rust handle
**File:** `src/components/v2/BeforeAfterSlider.tsx`

- Change wrapper `max-w-3xl mx-auto` → `w-full max-w-[700px] mx-auto`.
- Wait — user says "remove the narrow centered constraint" but also "max-width 700px." Interpretation: keep it constrained to 700px so the image scales but is no longer artificially narrow inside its column. Use `w-full max-w-[700px]` (still centered to keep brand layout, since section is centered).
- Drag handle: currently `bg-stone-950 border-2 border-orange-800` (dark with rust border). Change to filled rust: `bg-orange-800 border-2 border-stone-950` so handle reads as rust against the image. Increase to `w-12 h-12` for visibility. Keep arrow icon white.
- Drag line stays `bg-orange-800` (already rust ≈ #c8501a).

### 4. HeroBrutalist — primary/secondary button hierarchy
**File:** `src/components/v2/HeroBrutalist.tsx`

- "Shop the Resurrection" → primary: `bg-orange-800 text-stone-50 hover:bg-orange-900` (filled rust, white text). Remove the dark/black fill.
- "Watch Latest Episode" → secondary: keep `border-2 border-stone-950 text-stone-950 bg-transparent hover:bg-stone-950 hover:text-stone-50` (already correct as outline).
- Result: clear visual hierarchy — rust filled vs. dark outline.

### Out of scope
No layout, copy, typography, or other section changes. No new dependencies.

### Files touched (4)
- `src/components/v2/AvailableNowGrid.tsx`
- `src/components/v2/LatestTransformationBrutalist.tsx`
- `src/components/v2/BeforeAfterSlider.tsx`
- `src/components/v2/HeroBrutalist.tsx`

