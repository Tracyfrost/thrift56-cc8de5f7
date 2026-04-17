
User wants to replace/add the two new uploaded images to the existing T56-002 product (Pontiac Firebird × Shelby Cobra die-cast set). The previous images were the original ones; these new ones (`-2.jpg` versions) appear to be better/edited shots.

Per the `shopify--update_product` tool description: "Providing new images will replace all existing images on the product." So passing both new images will cleanly replace the old set.

Looking at the two new images:
- `T56-002_PONTIAC-FIREBIRD_EDT_001-2.jpg` — front-facing 3/4 view of the box, both cars visible through window (hero shot)
- `T56-002_PONTIAC-FIREBIRD_EDT_002-2.jpg` — top-down view showing both cars from above

Image 001 is the stronger hero (front-facing, both cars clearly visible) → primary. Image 002 → secondary.

## Plan

**Update existing Shopify product** T56-002 (product ID `8430943338573` from prior context) via `shopify--update_product`:

- **product_id:** `8430943338573`
- **images:** (replaces all existing)
  1. `user-uploads://T56-002_PONTIAC-FIREBIRD_EDT_001-2.jpg` — alt: "Pontiac Firebird and Shelby Cobra 427 S/C 1/32 die-cast set in original box, front view"
  2. `user-uploads://T56-002_PONTIAC-FIREBIRD_EDT_002-2.jpg` — alt: "Pontiac Firebird and Shelby Cobra 427 S/C 1/32 die-cast set, top-down view"

No other fields changed — title, price ($50), tags, description, variant config all stay as-is.

No repo code changes — Shop page pulls live from Shopify and the new images will appear on refresh.

