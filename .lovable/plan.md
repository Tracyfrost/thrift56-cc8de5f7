## Add "Retro-Style Cocktail Set" to Curated

Create a new Shopify product in the Curated tier using the uploaded photo, priced at $60, with brand-voiced retro copy.

### Product details
- **Title:** Retro-Style Cosmopolitan Cocktail Set
- **Handle/SKU:** T56-017_RETRO-STYLE-COCKTAIL-SET
- **Price:** $60.00 USD
- **Vendor:** Thrift 56
- **Product Type:** Curated
- **Tags:** `curated`, `1-of-1`, `barware`, `retro`, `cocktail`, `vintage`, `t56-017`
- **Inventory:** Tracked, qty 1, deny when out of stock (true 1-of-1)
- **Image:** uploaded `T56-017_RETRO-STYLE-COCKTAIL-SET_EDT_002.jpg`

### Description (brand voice — Found. Transformed. Released.)

> **The Cosmopolitan Hour — Pulled From Another Era.**
>
> A complete three-piece cocktail set built for the kind of evening that doesn't happen by accident. One stainless-capped glass shaker and two pink-stemmed martini glasses, each wearing the same hand-illustrated Cosmopolitan label — a 1940s-style portrait that reads like a forgotten supper-club poster. The recipe is printed right on the glass. No guesswork. Just pour.
>
> Found in the wild. Cleaned, inspected, and released as-is — patina intact, character louder than any new piece on a shelf.
>
> **The Set**
> - 1× Glass cocktail shaker with stainless steel cap & strainer
> - 2× Martini glasses with pink-bubble stems
> - Matching vintage Cosmopolitan illustration on every piece
>
> **Condition:** Excellent vintage. No chips, no cracks. Light shelf wear consistent with age.
>
> **1 of 1.** Once it's gone, it's gone.

### Technical execution
1. Call `shopify--create_product` with the fields above, image from `user-uploads://T56-017_RETRO-STYLE-COCKTAIL-SET_EDT_002.jpg`, single variant @ $60, inventory tracked at qty 1.
2. Verify it appears in Shopify and on `/shop` (Curated filter) via the existing Storefront API hook — no frontend code changes needed; `ProductCard` already handles the `1-of-1` and Curated `productType` badges.

### Open question
Confirm the SKU `T56-017_RETRO-STYLE-COCKTAIL-SET` should be used verbatim (it's unusual to have it in caps with underscores — Shopify accepts it, just confirming).