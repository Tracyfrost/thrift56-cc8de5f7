
## Plan: Add 4 Jianzhan / Tenmoku Tea Cup Listings

Each cup is a 1-of-1 curated find. Sold individually at $30. A 10%-off coupon rewards buying all four.

### Products to create (4 separate Shopify products)

Each follows the established curated pattern (vendor: Thrift 56, product_type: Curated, tags include `curated,1-of-1,T56-XX`, inventory_policy: deny, single variant).

| SKU | Title | Accent | Images |
|---|---|---|---|
| T56-70 | Jianzhan Tenmoku Tea Cup — Great Wall (Gold & Turquoise) | Gold lattice rim, blue Great Wall motif | 3 |
| T56-71 | Jianzhan Tenmoku Tea Cup — Silver Lotus | Silver/platinum lotus on slate blue | 3 |
| T56-72 | Jianzhan Tenmoku Tea Cup — Phoenix Iridescent | Rainbow oil-spot glaze, phoenix center | 3 |
| T56-73 | Jianzhan Tenmoku Tea Cup — Peacock | (pending 3 more pics you'll attach next) | 3 |

All listings share descriptive language: hand-glazed Chinese Jianzhan (建盏) tea cup, traditional tenmoku firing, includes original drawstring pouch, single piece — no reissue. Tagged with shared `tenmoku,jianzhan,tea-cup,ceramic,chinese,tea-ceremony` plus per-cup motif tag (great-wall / lotus / phoenix / peacock) and a shared `tenmoku-set` tag so the discount can target them.

### Bundle / discount strategy (per your direction)

Rather than a multi-variant "set" product (which would split inventory and confuse the 1-of-1 story), we use **4 standalone listings + an automatic 10% coupon** when all four are in cart:

- Shopify Price Rule: 10% off, target tag `tenmoku-set`, `prerequisite_quantity_range: 4` (must have 4 of the tagged items in cart).
- Discount code: `TENMOKU4` (auto-applied via a small cart hint, or surfaced on the PDP: "Collect all 4 → use code TENMOKU4 for 10% off").
- Once any one sells, the bundle naturally retires itself.

### Execution order

1. **T56-73 — pause.** Wait for your 3 additional photos before creating that listing.
2. Copy 9 uploaded images into `src/assets/` with their existing filenames (T56-70/71/72, _001/_002/_003).
3. Create T56-70, T56-71, T56-72 in Shopify via `shopify--create_product` (one call each, 3 images per product).
4. Create the Shopify price rule + `TENMOKU4` discount code (10% off, requires 4× `tenmoku-set` tagged items).
5. Stop and ping you to upload the T56-73 images.
6. After T56-73 images arrive: copy them in, create T56-73 with the same pattern (also tagged `tenmoku-set`), and the discount auto-includes it.

### What you'll see live

Four new cards in the curated grid at `/shop` (and `/drops` curated tier), each linking to its own PDP with all 3 photos, $30 price, Add-to-Cart, and a small "Part of the Tenmoku 4 — code TENMOKU4 for 10% off all four" note on each PDP.

### Not changing

Cart, checkout, design system, routing, and existing curated items remain untouched.
