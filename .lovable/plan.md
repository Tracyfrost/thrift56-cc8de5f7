

## Plan: 3 Targeted Homepage Fixes

### Issue 1 — Available Now product images
**File:** `src/components/v2/AvailableNowGrid.tsx`

Verified via network inspection: the Shopify Storefront API IS returning valid image URLs (e.g. `https://cdn.shopify.com/s/files/1/0703/1449/1981/files/T56-001_VESPA-TIN-SIGN_EDT_001.jpg`) for all 5 products. The query already requests `images { edges { node { url altText } } }` correctly. So images should already render — the "grey No Image" the user is seeing is most likely the existing fallback when images render slowly or a card without image data.

Changes:
- Add a one-time `console.log("[Shopify products]", products)` after fetch (dev-aid the user explicitly asked for) so they can verify in console.
- Improve the fallback to spec: dark `#1a1a1a` background, product title centered in **white 13px** (`text-white text-[13px]`) — currently it's rust orange large text which can read as broken.
- Add `loading="eager"` to the first 3 images and `loading="lazy"` after to ensure above-the-fold images appear immediately.
- Add `onError` handler that swaps to the dark fallback so a broken URL never shows a grey browser default.

### Issue 2 — Nav overlapping email capture section
**File:** `src/components/v2/EmailCaptureBrutalist.tsx`

The nav is `sticky top-0 z-50`. Sticky shouldn't overlap content but the user reports visual overlap (likely the form input visually crashing into the sticky bar when scrolled). Fixes:
- Add `relative z-0 scroll-mt-24` to the `<section>` so its stacking context is explicit and anchor-scrolls clear the nav.
- Bump top padding from `py-24 md:py-36` to `pt-28 md:pt-40 pb-24 md:pb-36` so headline never crowds nav.
- No nav changes (sticky stays as-is — used across all pages).

### Issue 3 — Red divider lines (truncated rust strips)
The "short red lines" are three intentional decorative accents that read as broken/truncated:
1. `<div className="absolute top-0 left-0 w-1/3 h-1 bg-orange-800">` at top of AvailableNow
2. `<div className="absolute bottom-0 right-0 w-1/4 h-1 bg-orange-800">` at bottom of AvailableNow
3. `border-l-4 border-l-orange-800` on left edge of LatestTransformation section (a 4px rust stripe down the left side)

**Decision:** Remove all three. They are leftover asymmetric accents that read as artifacts, not deliberate dividers. The section backgrounds and typography already provide enough rhythm.

**Files:**
- `src/components/v2/AvailableNowGrid.tsx` — delete the two `<div>` accent strips (lines 11 and 88).
- `src/components/v2/LatestTransformationBrutalist.tsx` — remove `border-l-4 border-l-orange-800` from section className (line 26).

### Out of scope
No changes to layout, copy, typography, hero, slider, or any other section.

### Files touched (3)
- `src/components/v2/AvailableNowGrid.tsx`
- `src/components/v2/EmailCaptureBrutalist.tsx`
- `src/components/v2/LatestTransformationBrutalist.tsx`

