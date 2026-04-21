

## Plan: Add Omega Watchbox TWO to Shop Curated (1-of-1)

A second Omega watchbox in the **Curated** collection — `T56-008_OMEGA-WATCHBOX-TWO` — the "Ribboned Sister" to T56-007. Same 1-of-1 sandbox bypass via the `1-of-1` tag (existing `ProductCard` / `ShopifyProductDetail` overrides flip "Sold Out" → "Add to Cart" automatically). Zero code changes.

### Product spec

| Field | Value |
|---|---|
| Title | Omega Watchbox — "The Gifted Vault" |
| Product Type | Curated |
| Vendor | Thrift 56 |
| SKU | T56-008-OMEGA-WATCHBOX-TWO |
| Price | $85 (slightly higher than T56-007 — has the ribbon, manual, and outer slipcase fully intact) |
| Tags | `curated, 1-of-1, omega, watchbox, vintage, luxury-thrift, tennessee, gift-ready` |
| Inventory policy | `continue` (sandbox bypass) |
| Inventory tracking | none |
| Images (4, in order) | 1) ribboned closed box → 2) open box w/ red velvet + watch holder → 3) red Operating Instructions manual → 4) full set: outer sleeve + ribboned box + manual + suede platform |

### Description copy (brand voice — elegant, cool, slightly rebellious)

> Tied. Untouched. Waiting.
>
> An authentic Omega presentation watchbox — pulled from a Tennessee estate with the original satin crimson ribbon still knotted in a perfect bow, never untied. Textured cream lacquer shell, embossed Ω crown in gold, deep red velvet interior with the original arched watch holder, paired with the red "Operating Instructions" manual and pristine outer slipcase.
>
> The watch is gone. The ceremony stayed.
>
> A 1-of-1 collector's set — the rarer twin to "The Empty Vault." This one came gift-ready and stayed that way. Pull the ribbon yourself, or leave the bow intact and let it sit on the shelf as proof that some objects deserve to be opened slowly. Light wear on the outer sleeve. Interior: untouched. Ribbon: original.
>
> **Includes:** Omega lacquer presentation box with original red satin ribbon, cream watch holder, original Operating Instructions booklet, outer protective sleeve. Watch not included.

### Why this works (technical)
- `ProductCard.tsx` line 23: `isPurchasable = firstVariant?.availableForSale || isOneOfOne` — the `1-of-1` tag flips Sold Out → Add to Cart on both card and PDP.
- `Shop.tsx` Curated filter uses `product_type:Curated` — auto-files under Curated tab.
- "1 of 1" badge renders automatically from the same tag check.

### Steps
1. Copy 4 uploaded images from `user-uploads://` to `src/assets/omega/`.
2. `shopify--create_product` with the spec above (4 images, single variant, `1-of-1` tag, `inventory_policy: continue`, `inventory_management: null`).
3. Confirm at `/shop` → Curated: shows "1 of 1" badge + active "Add to Cart" button next to T56-007.

### Price clarification
Defaulted to **$85** (vs. T56-007's $75) — this set is more complete: ribbon intact, all 4 components present, gift-ready. Override now if you want $75 (match T56-007), $95, or another number. No reply = $85 ships.

### Files touched
- 4 image copies into `src/assets/omega/`
- 1 Shopify product created
- 0 frontend code changes

