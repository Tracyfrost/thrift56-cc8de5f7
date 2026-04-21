## Plan: Add Oliver Gal "Supreme LA" Print to Curated

A new Curated 1-of-1 — `T56-010_OLIVER-GAL-PRINT` — a framed 24"×16" Oliver Gal pop-art print: three Supreme box logos (printed → embroidered patch → woven garment tag) floating over a black-and-white downtown LA skyline, set in a brushed champagne-gold metal frame. Same `1-of-1` sandbox bypass — zero code changes.

### Product spec


| Field                | Value                                                                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Title                | Oliver Gal "Three Supremes Over LA" — Framed 24×16                                                                                        |
| Product Type         | Curated                                                                                                                                   |
| Vendor               | Thrift 56                                                                                                                                 |
| SKU                  | T56-010-OLIVER-GAL-SUPREME-LA                                                                                                             |
| Price                | $80.00                                                                                                                                    |
| Tags                 | `curated, 1-of-1, oliver-gal, supreme, pop-art, framed-print, los-angeles, streetwear, large-format, tennessee`                           |
| Inventory policy     | `continue` (sandbox bypass via `1-of-1` tag)                                                                                              |
| Inventory tracking   | none                                                                                                                                      |
| Weight               | 5 lb (framed glass — flag freight on the listing)                                                                                         |
| Variants             | Single — $80 (default, only)                                                                                                              |
| Images (2, in order) | 1) front: framed Supreme/LA composition → 2) back: kraft-paper sealed backing with hanging hardware (proves authenticity + ready-to-hang) |


### Description copy (brand voice — elegant, cool, slightly rebellious)

> Three Supremes. One skyline. Zero permission.
>
> A 24"×16" Oliver Gal original print, framed in brushed champagne-gold metal behind glass — three Supreme box logos stacked like a vertical drop list (printed logo → embroidered patch → woven garment tag, complete with the little "S" size flag) floating over a high-contrast black-and-white downtown LA skyline. Oliver Gal makes museum-grade pop-art for people who treat their walls like a feed. This one was clearly never hung — kraft backing intact, hanging wire factory-tight, glass clean, frame corners sharp.
>
> Streetwear as still life. Logo worship as landscape painting. The kind of piece that makes a room argue with itself.
>
> One of one. 24×16 inches of LA on your wall for the price of a Supreme tee that never fit right anyway.
>
> **Includes:** 1× framed Oliver Gal print, 24"×16", brushed gold metal frame, glass front, kraft-paper sealed back, dual D-ring + wire hanging hardware (ready to hang). Pickup encouraged for local Texas buyers — ships freight-protected for the rest.

### Why this works (technical)

- `ProductCard.tsx` line 23: `isPurchasable = firstVariant?.availableForSale || isOneOfOne` — the `1-of-1` tag flips Sold Out → Add to Cart on both card and PDP. Genuine 1-of-1 this time, so the badge is honest.
- `Shop.tsx` Curated filter pulls `product_type:Curated` — auto-files alongside T56-007/008/009.
- 8-lb framed-glass shipping weight is set on the variant so any future shipping-rate logic doesn't undercharge.

### Steps

1. Copy the 2 uploaded images to `src/assets/oliver-gal/` (front: `T56-010_001.jpg`, back: `T56-010_002.jpg`).
2. `shopify--create_product` with the spec above (2 images, single variant priced $80, `1-of-1` tag, `inventory_policy: continue`, `inventory_management: null`, weight 8).
3. Confirm at `/shop` → Curated: shows "Three Supremes Over LA" with 1-of-1 badge, $80, active Add to Cart. Click into PDP → confirm both photos render in order.

### Files touched

- 2 image copies into `src/assets/oliver-gal/`
- 1 Shopify product created (single variant)
- 0 frontend code changes