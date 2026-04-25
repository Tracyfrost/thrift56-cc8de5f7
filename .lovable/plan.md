# Replace Photos — Versace F/W 1995-96 Avedon Catalogue (T56-011)

Swap the three product images on the Gianni Versace F/W 1995-96 catalogue (Avedon, N. 29) with the three uploaded photos.

## What changes

**Local assets** — overwrite the existing files in `src/assets/versace/` so any code that imports them keeps working:

| Local file | New source | Subject |
|---|---|---|
| `T56-011_001.jpg` | `user-uploads://T56-011_VERSACE-1995_96-FALL-WINTER-CATALOG_EDT_007.jpg` | Front cover — McMenamy, cream suit, white boots |
| `T56-011_002.jpg` | `user-uploads://T56-011_VERSACE-1995_96-FALL-WINTER-CATALOG_EDT_006.jpg` | Back cover — red trouser suit, wide stance |
| `T56-011_003.jpg` | `user-uploads://T56-011_VERSACE-1995_96-FALL-WINTER-CATALOG_EDT_005.jpg` | Spine — "GIANNI VERSACE COLLEZIONE DONNA AUTUNNO INVERNO 1995-96 / N. 29" |

**Shopify product** (`gid://shopify/Product/7781116051533`) — replace all images with the three above, in that order. The front cover stays the lead image.

## Implementation steps

1. Copy the three uploaded images to `src/assets/versace/T56-011_001.jpg`, `_002.jpg`, `_003.jpg` (overwriting).
2. Single `shopify--update_product` call on product ID `7781116051533` with `images: [001, 002, 003]` — Shopify replaces all images on update, so the storefront `/product/...avedon-n-29` page reflects the new gallery after cache refresh.

No code, route, or component edits — the product detail page already iterates `product.images.edges` in order.