

## Plan: Add Versace Fall/Winter 1995-96 Catalog to Curated

A new Curated 1-of-1 — `T56-011_VERSACE-1995_96-FALL-WINTER-CATALOG` — the **Gianni Versace Collezione Donna Autunno Inverno 1995-96** lookbook (Issue N. 29), photographed by Richard Avedon. A genuine pre-Atelier-era Versace catalogue from the last full season Gianni was alive to design — collector territory. Same `1-of-1` sandbox bypass, zero code changes.

### Product spec

| Field | Value |
|---|---|
| Title | Gianni Versace F/W 1995-96 Catalogue — Photographed by Richard Avedon (N. 29) |
| Product Type | Curated |
| Vendor | Thrift 56 |
| SKU | T56-011-VERSACE-FW-1995-96-AVEDON |
| Price | $120.00 |
| Tags | `curated, 1-of-1, versace, gianni-versace, richard-avedon, fashion-catalog, archive, 1990s, vintage-fashion, collectible, milan, lookbook` |
| Inventory policy | `continue` (sandbox bypass via `1-of-1` tag) |
| Inventory tracking | none |
| Weight | 3 lb (heavy glossy stock — flag in shipping) |
| Variants | Single — $120 (default, only) |
| Images (3, in order) | 1) front cover (white suit / Avedon credit) → 2) back cover (red suit) → 3) spine detail (Italian title + N. 29) |

### Description copy (brand voice — classy, cool, slightly rebellious)

> The last full season Gianni was alive to dress.
>
> An original *Gianni Versace Collezione Donna Autunno Inverno 1995-96* catalogue — Issue N. 29 — photographed entirely by Richard Avedon. Two icons, one book. The cover: Kristen McMenamy weightless in a cream double-breasted suit, hair caught mid-gust, white kitten heel hooked over her shoulder like a trophy. The back: same energy, blood-red trouser suit, stance wide enough to take up the whole page. This is what a fashion house looked like when it still believed in the photograph.
>
> Printed in Milan on heavy matte stock with the wear that proves it lived — softened corners, a faint crease across the back, spine still tight, red foil "GIANNI VERSACE COLLEZIONE DONNA AUTUNNO INVERNO 1995-96" sharp as the day it shipped. Not a reprint. Not a museum copy. The actual catalogue buyers held in showrooms in 1995.
>
> Two years before everything changed. Avedon at the height of his powers. Versace at the height of his.
>
> One of one. Frame one spread, leave the rest on the coffee table — either way, it earns the room.
>
> **Includes:** 1× original Gianni Versace F/W 1995-96 lookbook, Issue N. 29, photographed by Richard Avedon. Vintage condition — honest wear consistent with 30 years of being beautiful. Ships rigid-mailer protected.

### Why this works (technical)
- `ProductCard.tsx` line 23: `isPurchasable = firstVariant?.availableForSale || isOneOfOne` — the `1-of-1` tag flips Sold Out → Add to Cart on both card and PDP. This is a genuine 1-of-1, so the badge is honest.
- `Shop.tsx` Curated filter pulls `product_type:Curated` — auto-files alongside T56-007 through T56-010.
- 3-lb weight set on the variant for accurate freight on heavy paper goods.

### Steps
1. Copy the 3 uploaded images to `src/assets/versace/` (front: `T56-011_001.jpg`, back: `T56-011_002.jpg`, spine: `T56-011_003.jpg`).
2. `shopify--create_product` with the spec above (3 images, single variant priced $120, `1-of-1` tag, `inventory_policy: continue`, `inventory_management: null`, weight 3).
3. Confirm at `/shop` → Curated: shows "Gianni Versace F/W 1995-96 Catalogue" with 1-of-1 badge, $120, active Add to Cart. Click into PDP → confirm all three photos render in order.

### Files touched
- 3 image copies into `src/assets/versace/`
- 1 Shopify product created (single variant)
- 0 frontend code changes

