

## Goal
Delete the 6 placeholder seed products from Shopify so they stop appearing in the storefront grid (`/shop` and any product type filters).

## Products to delete (from screenshots)

| # | Title | Type | Shopify ID |
|---|-------|------|------------|
| 1 | The Botanical Vase | Original | 7765514780749 |
| 2 | The Gallery Frame | Original | 7765515894861 |
| 3 | The Treasure Chest | Original | 7765516746829 |
| 4 | The Sunset Serving Tray | Original | 7765517303885 |
| 5 | From Forgotten to Featured — Limited Print /50 | Print | 7765525626957 |
| 6 | Studio 56 Snapback | Curated | 7765523497037 |
| 7 | Digital Transformation Toolkit | Digital | 7765527265357 |

That's 7 products total — your screenshots showed all four placeholder Originals, the placeholder Print, the Snapback, and the Digital Toolkit. All are early seed listings with "NO IMAGE" placeholders.

## What survives (real curated inventory — untouched)
- Barcino Mosaic Cats — Pair
- Pontiac Firebird × Shelby Cobra Die-Cast Set
- Powell & Mason Cable Car Ashtray
- Vespa Parking Only Tin Sign
- Vintage Wheaties License Plate (T56-005)

## Action
Call `shopify--delete_product` 7 times (one per ID above). Each requires your approval. Deletion removes them from the live Shopify store permanently — the storefront `/shop` grid will refresh on next load and show only the 5 real products.

## No code changes
The shop is fully driven by `useShopifyProducts` → Storefront API. Once Shopify no longer returns these products, they vanish from `/shop`, the product type filters, and any other surface that pulls from the API. Nothing in `src/` references them by handle.

## Confirm before I proceed
- Hold any of the 7? (e.g., keep "From Forgotten to Featured — Limited Print /50" as a real product to flesh out later instead of deleting?)
- Or delete all 7 as listed?

