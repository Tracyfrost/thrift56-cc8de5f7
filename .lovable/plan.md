

## Plan: Add Versace Uomo F/W 1995-96 Catalog (Prince + Bruce Weber) to Curated

A second 1990s Versace lookbook joins Curated — `T56-012_VERSACE-1995_96-AUTUMN-CATALOG` — the **Gianni Versace Collezione Uomo Autunno Inverno 1995/96** menswear edition (Issue N. 29), photographed by **Bruce Weber** and starring **Prince**. Companion volume to T56-011 (the Donna / Avedon edition) — same season, same issue number, opposite genre. Same `1-of-1` sandbox bypass, zero code changes.

### Product spec

| Field | Value |
|---|---|
| Title | Gianni Versace Uomo F/W 1995-96 Catalogue — Prince × Bruce Weber (N. 29) |
| Product Type | Curated |
| Vendor | Thrift 56 |
| SKU | T56-012-VERSACE-UOMO-FW-1995-96-PRINCE |
| Price | $150.00 |
| Tags | `curated, 1-of-1, versace, gianni-versace, prince, bruce-weber, fashion-catalog, archive, 1990s, vintage-fashion, collectible, milan, menswear, lookbook, music-icon` |
| Inventory policy | `continue` (sandbox bypass via `1-of-1` tag) |
| Inventory tracking | none |
| Weight | 3 lb (heavy glossy stock — flag in shipping) |
| Variants | Single — $150 (default, only) |
| Images (4, in order) | 1) Prince spread (gold mesh tank + leather jacket — the moneymaker) → 2) front cover (Bruce Weber jump shot, red VERSACE logo) → 3) back cover (B&W Weber editorial — antlers / fur) → 4) spine detail (red foil "GIANNI VERSACE COLLEZIONE UOMO AUTUNNO INVERNO 1995/96 N° 29") |

### Description copy (in the spirit of Prince — terse, symbol-laden, regal, a little holy, a little filthy)

> 4 the ones who dress like the song sounds.
>
> An original *Gianni Versace Collezione Uomo Autunno Inverno 1995/96* — Issue N° 29 — shot by Bruce Weber. Inside: His Royal Badness himself. Gold chainmail mesh tank. Black leather. Versace Medusa cuffs stacked like a sermon. The look on his face is the look. *U know the one.*
>
> 1995. The slave era. The symbol era. The era when 1 man wore Versace like it was sacred armor and made the rest of menswear look underdressed. Bruce Weber shot it the way Bruce Weber shoots — bodies, bare feet, statues, a little danger, a lot of beauty. Gianni gave him the clothes and got out of the way.
>
> Printed in Milan on heavy matte stock. Honest wear — the kind that says somebody actually opened it. Spine tight, red foil sharp, Prince spread crisp. Not a reprint. Not a museum copy. The book that lived through it.
>
> One of one. Frame the Prince spread. Put it on the wall. Let the room get loud.
>
> **Includes:** 1× original Gianni Versace Uomo F/W 1995-96 lookbook, Issue N° 29, photographed by Bruce Weber, featuring Prince. Vintage condition — honest wear consistent with 30 years of being beautiful. Ships rigid-mailer protected.

### Why this works (technical & narrative)

- **Companion piece to T56-011.** Same brand. Same season. Same issue number (N° 29). Donna by Avedon ($120) ↔ Uomo by Weber w/ Prince ($150). The $30 premium is earned by the Prince factor — collectors price these higher than the womenswear edition. Buyers who land on one will land on the other.
- `ProductCard.tsx` line 23: `isPurchasable = firstVariant?.availableForSale || isOneOfOne` — the `1-of-1` tag flips Sold Out → Add to Cart on both card and PDP. Genuine 1-of-1, badge is honest.
- `Shop.tsx` Curated filter pulls `product_type:Curated` — files alongside T56-007 through T56-011.
- 3-lb weight set on the variant for accurate freight on heavy paper goods.

### Image order rationale

The **Prince spread leads** — not the cover. Reasoning: the cover is striking but generic-Versace; the Prince spread is the entire reason this catalogue is worth $150 and the only thing a buyer is searching for. Lead with the moneymaker, then provenance (cover → back → spine for authenticity).

### Steps

1. Copy 4 uploaded images to `src/assets/versace-uomo/`:
   - `T56-012_001.jpg` ← `SEL_008.jpg` (Prince spread — main)
   - `T56-012_002.jpg` ← `SEL_002.jpg` (front cover, Weber jump shot)
   - `T56-012_003.jpg` ← `SEL_004.jpg` (back cover, B&W antlers)
   - `T56-012_004.jpg` ← `SEL_005.jpg` (spine detail)
2. `shopify--create_product` with the spec above (4 images in order, single variant priced $150, `1-of-1` tag, `inventory_policy: continue`, `inventory_management: null`, weight 3).
3. Confirm at `/shop` → Curated: shows "Versace Uomo F/W 1995-96 — Prince × Bruce Weber" with 1-of-1 badge, $150, active Add to Cart. Click into PDP → confirm all four photos render in order with Prince spread leading.

### Files touched

- 4 image copies into `src/assets/versace-uomo/`
- 1 Shopify product created (single variant)
- 0 frontend code changes

