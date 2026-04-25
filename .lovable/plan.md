# Make the Prince Spread the Main Image — Versace Uomo F/W 1995-96 Catalogue

The user clicked the second image in the gallery on `/product/gianni-versace-uomo-f-w-1995-96-catalogue-prince-bruce-weber-n-29` (the **Prince spread**, currently `T56-012_002.jpg`) and wants it to lead the listing.

## What changes

Reorder the product's images on Shopify so the Prince spread loads first. The local `src/assets/versace-uomo/` files stay where they are — only the order sent to Shopify changes.

**New image order:**
1. `T56-012_002.jpg` — Prince spread *(was #2, now main / cover slot)*
2. `T56-012_001.jpg` — Front cover *(was #1)*
3. `T56-012_003.jpg` — Bruce Weber antlers editorial
4. `T56-012_004.jpg` — Spine detail

## Implementation

Single tool call:

- `shopify--update_product` on Product ID `7781118246989` with the four images in the order above. Shopify replaces all images on update, and the storefront product page (which iterates `product.images.edges` in order) will render the Prince spread first immediately after cache refresh.

No code, route, or asset edits required.
