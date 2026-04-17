
The user wants to add a new 1-of-1 Merch item to the Shopify store: a 1/32 die-cast car set (Pontiac Firebird + Shelby Cobra 427 S/C) with the two uploaded photos.

This follows the established pattern from the Vespa Tin Sign:
- Merch product type
- 1-of-1 tag
- Single variant, no size options
- `inventory_policy: "continue"` so it never shows "Sold Out"
- Brand voice on copy ("This was $X. It deserved better.")
- Two photos uploaded (front 3/4 view + top-down view) — use both as product images

Need a price from the user before creating. Everything else I can draft.

## Plan

**Create new Shopify product** via `shopify--create_product`:

- **Title:** Pontiac Firebird × Shelby Cobra 427 S/C — 1/32 Die-Cast Set
- **SKU:** T56-002
- **Product type:** Merch
- **Tags:** `1-of-1, die-cast, vintage-toy, collectible, pontiac, shelby-cobra, merch`
- **Vendor:** Thrift 56
- **Images:** both uploaded photos (front view as primary, top-down as secondary)
- **Variant:**
  - Single default variant (no options)
  - Price: **TBD — need from user**
  - `inventory_policy: "continue"` (so it never reads Sold Out — matches the Vespa pattern)
  - `inventory_management: ""` (don't track stock, since 1-of-1)
- **Description (brand voice):**
  > Found in a thrift bin. Two cars. One box. Untouched.
  >
  > A 1/32 scale die-cast set pairing the Pontiac Firebird with the Shelby Cobra 427 S/C #99 — sealed in original collector packaging with the worn edges, sun-faded blacks, and shrink-wrap creases that prove it sat on a shelf for two decades before it found us.
  >
  > Opening doors. Die-cast metal. Original box. As-found, as-photographed.
  >
  > 1 of 1. When it's gone, it's gone.

## What I need from you

Just one thing: **the price**. Suggested anchor based on the Vespa Sign ($40) and the fact this is a 2-car sealed set:

- $35 (entry collector)
- $45 (matches Vespa tier)
- $55 (premium / sealed-set bump)

Reply with a number (or one of the above) and I'll create it. No code changes needed in the repo — the Shop page pulls live from Shopify and the new product will appear under the **Merch** filter automatically.

