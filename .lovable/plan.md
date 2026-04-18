

## Plan: Add Omega Watchbox to Shop Curated (1-of-1)

### What gets created
A new Shopify product in the **Curated** collection — `T56-007_OMEGA-WATCHBOX-ONE` — tagged as `1-of-1` so the existing `ProductCard` / `ShopifyProductDetail` override flips it from "Sold Out" to "Add to Cart" automatically (no code changes needed).

### Product spec

| Field | Value |
|---|---|
| Title | Omega Watchbox — "The Empty Vault" |
| Product Type | Curated |
| Vendor | Thrift 56 |
| SKU | T56-007-OMEGA-WATCHBOX-ONE |
| Price | $45 (confirm or override below) |
| Tags | `curated, 1-of-1, omega, watchbox, vintage, luxury-thrift, tennessee` |
| Inventory policy | `continue` (allow oversell — sandbox bypass) |
| Inventory tracking | none (so `availableForSale` resolves true) |
| Images | All 3 uploaded photos, in this order: closed red box → open red box w/ pillow → operating instructions booklet |

### Description copy (elegant / brand voice)

> Found empty. Sold full of story. An authentic Omega presentation watchbox — lacquered crimson shell, cream suede interior, embossed Ω crown, paired with the original red "Operating Instructions" manual and outer slipcase. The watch is long gone. What remains is the ritual: the weight of the lid, the snap of the hinge, the soft pillow waiting for whatever you decide deserves it.
>
> A 1-of-1 collector's vessel — pulled from a Tennessee estate lot, untouched, never reboxed. Wear-honest patina on the outer sleeve. Interior: pristine. For the watch you already own, the one you're saving for, or the empty altar on your shelf that finally deserves its frame.
>
> **Includes:** Omega lacquer presentation box, cream suede pillow, original operating instructions booklet, outer protective sleeve. Watch not included.

### Why this approach works
- **`ProductCard.tsx` line 23** already has the override: `isPurchasable = firstVariant?.availableForSale || isOneOfOne`. Same pattern in `ShopifyProductDetail.tsx`. Tagging `1-of-1` flips the "Sold Out" button to "Add to Cart" on **both** card and PDP — no code edits needed.
- **`Shop.tsx` Curated filter** uses `product_type:Curated` — setting product_type correctly auto-files it under the Curated tab.
- The "1 of 1" badge already renders on the card via the same tag check.

### Steps
1. `shopify--create_product` with the spec above (3 images, single variant, `1-of-1` tag, inventory_policy `continue`).
2. Confirm it appears in `/shop` → Curated filter with the "1 of 1" badge and "Add to Cart" button.

### One clarification
Price — I defaulted to **$45** (consistent with rare 1-of-1 curated branded packaging). Override now if you want a different number (e.g., $35, $55, $75). If you don't reply, $45 ships.

### Files touched
- 0 frontend files
- 1 Shopify product created (3 image uploads handled by the create tool)

