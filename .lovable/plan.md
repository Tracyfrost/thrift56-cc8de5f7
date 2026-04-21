

## Plan: Add Jared Travel Jewelry Case Set to Shop Curated

A new Curated drop — `T56-009_JARED-TRAVEL-JEWELRY-CASE` — a 3-piece nested set of Jared "Galleria of Jewelry" copper-shimmer travel cases with cream satin interiors. Sold as a **set of 3 for $60**, with the option to purchase **individual cases at $25 each**. Same `1-of-1` sandbox bypass pattern (existing `ProductCard` / `ShopifyProductDetail` overrides flip "Sold Out" → "Add to Cart" automatically). Zero code changes.

### Note on naming
You wrote "3 of 1" — interpreting as a **3-piece set** (three identical Jared cases stacked, photos confirm). Not a 1-of-1. Tagging as a small-run set instead. If you meant something else (e.g., "only 3 sets exist" or "1-of-1 set of 3"), say the word before approval.

### Product spec

| Field | Value |
|---|---|
| Title | Jared Travel Jewelry Case — "The Quiet Trio" |
| Product Type | Curated |
| Vendor | Thrift 56 |
| SKU base | T56-009-JARED-TRAVEL-JEWELRY-CASE |
| Tags | `curated, 1-of-1, jared, jewelry-case, travel, vintage, gift-ready, set-of-three, tennessee` |
| Inventory policy | `continue` (sandbox bypass via `1-of-1` tag) |
| Inventory tracking | none |
| Variants | **Set of 3** — $60 (SKU `T56-009-SET3`, default) · **Single Case** — $25 (SKU `T56-009-SINGLE`) |
| Images (2, in order) | 1) stacked trio, top one open showing cream envelope flap → 2) fully unfolded case showing satin lining + Jared "Galleria of Jewelry" branding |

### Description copy (brand voice — elegant, cool, slightly rebellious)

> Three quiet copper boxes. Cream satin inside. Never used.
>
> Pulled from a Tennessee estate as a stacked trio — three identical Jared "Galleria of Jewelry" travel cases in shimmering copper bronze, each with a soft cream satin envelope interior, magnetic snap closure, and the original gold "Jared — The Galleria of Jewelry" foil-stamped on the inside flap. Built to hold a necklace, bracelet, or pair of earrings flat for travel. Found pristine. Cream lining: untouched. Copper shells: minor handling marks, no creases.
>
> The jewelry was wrapped in tissue. The cases held the ceremony.
>
> Take all three as a **set ($60)** — keep one for travel, gift two — or grab a **single ($25)** and let it carry whatever small thing deserves to be opened slowly. Either way, you're getting retail-grade jewelry-store packaging that someone already paid full price for. We just rescued them from the thrift shelf.
>
> **Set includes:** 3× Jared copper travel jewelry case with cream satin envelope interior, magnetic snap, original branded lining. **Single includes:** 1× case. No jewelry included — bring your own ceremony.

### Why this works (technical)
- `ProductCard.tsx` line 23: `isPurchasable = firstVariant?.availableForSale || isOneOfOne` — the `1-of-1` tag on this product flips Sold Out → Add to Cart on both card and PDP. The card displays the **first variant** (Set of 3 / $60) by default; PDP exposes both variants for selection.
- `Shop.tsx` Curated filter uses `product_type:Curated` — auto-files under Curated tab next to T56-007 and T56-008.
- "1 of 1" badge will render on the card (driven by tag, not actual rarity — acceptable since this is a small-run sandbox flag). If you'd rather suppress the badge for set-based items, that's a small follow-up code change in `ProductCard.tsx`.

### Steps
1. Copy the 2 uploaded images from `user-uploads://` to `src/assets/jared/`.
2. `shopify--create_product` with the spec above (2 images, `Set` option with values `Set of 3` / `Single Case`, two variants priced $60 and $25, `1-of-1` tag, `inventory_policy: continue`, `inventory_management: null`).
3. Confirm at `/shop` → Curated: shows "The Quiet Trio" with "1 of 1" badge, $60 default price, active Add to Cart. Click in to PDP → verify both variants selectable.

### Files touched
- 2 image copies into `src/assets/jared/`
- 1 Shopify product created (with 2 variants)
- 0 frontend code changes

