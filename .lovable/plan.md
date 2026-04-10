

# Cinematic Product Descriptions & Enhanced Product Detail Page

## Part 1: Update All 8 Shopify Product Descriptions

Using `shopify--update_product` to rewrite each `body_html` with the brand voice — confident, observational, slightly rebellious, calm-but-sharp. Structure preserved (no changes to variants, SKUs, inventory_policy, tags, or options).

**The Botanical Vase** (ID: 7765514780749)
> "This was $2.50 at a roadside thrift in rural Georgia. Cracked glaze. Chipped rim. The kind of thing you walk past without thinking. We didn't walk past. Hand-restored, painted with botanical motifs that didn't exist before we put them there, sealed with archival-grade finish. Found. Transformed. Released. This is the only one. When it's gone, it stays gone."

**The Gallery Frame** (ID: 7765515894861)
> "Someone left this in a pile of water-damaged junk at a Goodwill in Tennessee. It was warped. Stained. Invisible. We stripped it to raw wood, sanded every edge by hand, restained in dark walnut, and fitted UV-protective glass. A thing that was three days from a dumpster now belongs on a gallery wall. That's the point."

**The Sunset Serving Tray** (ID: 7765517303885)
> "Chipped. Splintered. Priced at $4 on a folding table at a Mississippi flea market. Nobody stopped. We did. Sanded smooth, hand-painted with a burnt orange and deep indigo sunset gradient, sealed with food-safe epoxy. It holds drinks now. It holds attention. Functional art — from a thing nobody wanted."

**The Treasure Chest** (ID: 7765516746829)
> "A battered trunk from a Salvation Army in Alabama. The brass was green. The hinges were frozen. The wood smelled like a basement. We restored every piece of hardware, reinforced the interior with cedar lining, and hand-finished the exterior in matte black with gold-leaf accents. Storage that became sculpture. Forgotten that became permanent."

**Paint Splatter Tee** (ID: 7765518549069)
> "This isn't merch. It's evidence. Every splatter on this tee comes from a live transformation session — paint that landed on fabric while something forgotten was becoming something worth owning. Heavyweight 100% ring-spun cotton. Oversized fit. Screen-printed. No two batches are identical, because no two sessions are."

**Studio 56 Snapback** (ID: 7765523497037)
> "Matte black. Oxidized rust embroidery. No flash. No logos screaming for attention. Just the mark of a workshop where forgotten things get a second life. Structured crown, flat brim, adjustable snap closure. One size. Wear the work."

**From Forgotten to Featured — Limited Print /50** (ID: 7765525626957)
> "The transformation that started everything — the piece that proved 'worthless' is just a failure of imagination. Now frozen in high-resolution giclée on 310gsm archival cotton rag. Hand-numbered. Signed. 50 exist in the world. Certificate of authenticity included. This is the origin story, on your wall."

**Digital Transformation Toolkit** (ID: 7765527265357)
> "Everything we've learned — distilled. Sourcing checklist. Paint and finish guide. Before/after photography breakdown. Pricing calculator. No fluff, no theory. Just the system we built to turn $3 finds into pieces people fight over. Instant download."

## Part 2: Enhance FourPillars Component

Make it larger, more dramatic, with expanded descriptions that reinforce the "From Forgotten to Featured" narrative. Increase padding, icon size, and add a tagline above.

## Part 3: Enhance Product Detail Page Layout

- Make image gallery larger — switch from `aspect-square` to `aspect-[4/5]` with larger max-width
- Add a cinematic "origin line" italic serif quote above the description (e.g., "This was $3. It deserved better.")
- Add a "The Journey" accordion section reinforcing the four pillars specific to the product
- Increase spacing and typography scale for the buy box

## Files Changed

1. **8x `shopify--update_product` calls** — new `body` text only, everything else untouched
2. **`src/components/shop/FourPillars.tsx`** — enlarged layout, richer copy, brand tagline
3. **`src/pages/ShopifyProductDetail.tsx`** — larger gallery, cinematic origin line, enhanced spacing

