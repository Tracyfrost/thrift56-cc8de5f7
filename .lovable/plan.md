

## Problem

T56-003 and T56-004 render "Sold Out" because Shopify reports `availableForSale: false` (inventory wasn't set to 1 yet — that's a manual Shopify Admin step we flagged earlier). The button text/disable state is driven by `firstVariant?.availableForSale` in `ProductCard.tsx` and `selectedVariant?.availableForSale` in `ShopifyProductDetail.tsx`.

Since we're in sandbox / 30-day trial mode and you want the site to *show* Add to Cart so you can demo the flow without touching Shopify inventory, we override availability **on the frontend for 1-of-1 tagged products**.

## The fix (frontend-only, 2 files)

Treat any product tagged `1-of-1` as purchasable on the site regardless of Shopify's `availableForSale` flag. This is safe because:
- The `1-of-1` tag is our own curation marker
- Once you set inventory to 1 in Shopify Admin post-trial, the override becomes a no-op (Shopify will already say `true`)
- After the single purchase, Shopify's `inventory_policy: deny` still prevents overselling at checkout

### File 1: `src/components/shop/ProductCard.tsx`
- Add `const isPurchasable = firstVariant?.availableForSale || isOneOfOne;`
- Use `isPurchasable` in the button's `disabled` and label logic instead of raw `availableForSale`

### File 2: `src/pages/ShopifyProductDetail.tsx`
- Mirror the same logic: `const isPurchasable = selectedVariant?.availableForSale || isOneOfOne;`
- Drive the Add to Cart button state from `isPurchasable`

## What you'll see after the change

- T56-003 (Trolley Ashtray) → "Add to Cart" active
- T56-004 (Barcino Mosaic Cats) → "Add to Cart" active
- T56-001 (Vespa Tin Sign) → already shows Add to Cart, unchanged
- Non-1-of-1 sold-out items (e.g., Botanical Vase) → still correctly show "Sold Out"

## Recommended next step (not in this change)

When the trial ends and you claim the store, set inventory to 1 in Shopify Admin for T56-003 and T56-004. The frontend override stays in place harmlessly and Shopify becomes the true source of truth for stock.

