

## Plan: Add Escada Fashion Book to Curated — T56-013

A hardcover Escada lookbook joins Curated alongside the Versace catalogues. **Gold metallic linen hardcover**, embossed `ESCADA` mark on cover, signature double-E logo foil-stamped on back. Inside: editorial spread of a model in a violet bouclé cardigan + ivory silk pussy-bow blouse against a Manhattan skyline backdrop — luxe late-2000s/early-2010s campaign aesthetic. A library object, not a magazine.

### Product spec

| Field | Value |
|---|---|
| Title | Escada Fashion Book — Gold Hardcover Lookbook |
| Product Type | Curated |
| Vendor | Thrift 56 |
| SKU | T56-013-ESCADA-FASHIONBOOK |
| Price | $80.00 |
| Tags | `curated, 1-of-1, escada, fashion-book, lookbook, hardcover, archive, vintage-fashion, collectible, luxury, womenswear, coffee-table-book, gold` |
| Inventory policy | `continue` (sandbox bypass via `1-of-1` tag) |
| Inventory tracking | none |
| Weight | 4 lb (heavy hardcover, glossy stock) |
| Variants | Single — $80 |
| Images (3, in order) | 1) Gold hardcover front (ESCADA emboss) → 2) Editorial spread (violet cardigan, NYC skyline) → 3) Back cover (double-E foil mark) |

### Description copy (cool, elegant, restrained — Escada voice)

> Quiet luxury, before that was a phrase.
>
> A hardcover *Escada* fashion book — gold metallic linen, debossed wordmark on the front, the house's twin-E monogram foil-stamped on the back. Heavy in the hand. The kind of object a private client got, not the kind that turned up on a newsstand.
>
> Open it and the lights go down. A model in a violet bouclé cardigan and ivory silk pussy-bow blouse, patent boots crossed at the ankle, Manhattan glittering through the window behind her. Editorial photography printed on heavy matte stock — full-bleed spreads, generous margins, no captions, no prices. Just clothes, light, and confidence.
>
> Escada built an empire on color, tailoring, and the women who wore both well. This book is a record of that — restrained on the outside, theatrical inside. Stack it on a coffee table next to something equally certain of itself.
>
> Vintage condition. Honest patina on the gold cover. Spine tight. Pages crisp.
>
> **Includes:** 1× original Escada hardcover fashion book. Vintage condition with light wear consistent with age. Ships rigid-mailer protected.

### Image rationale

Lead with the **gold cover** — this is an object-first sale (the cover *is* the brand). Then the editorial spread (proof of what's inside). Back cover last (provenance / mark).

### Steps

1. Copy 3 uploaded images to `src/assets/escada-book/`:
   - `T56-013_001.jpg` ← `SEL_002.jpg` (front cover, gold)
   - `T56-013_002.jpg` ← `SEL_003.jpg` (violet cardigan editorial spread)
   - `T56-013_003.jpg` ← `SEL_006.jpg` (back cover, double-E mark)
2. `shopify--create_product` with the spec above.
3. Confirm at `/shop` → Curated: shows "Escada Fashion Book" with 1-of-1 badge, $80, active Add to Cart.

### Files touched

- 3 image copies into `src/assets/escada-book/`
- 1 Shopify product created
- 0 frontend code changes

