## Goal
Make the Art Piece ↔ Shopify relationship explicit in `/admin` so Tracie can tell at a glance which Art Pieces have a real product behind them, and jump straight to the PDP.

## Changes

### 1. Data model (`src/data/artPieces.ts`)
Add two optional fields to the `ArtPiece` interface:
- `shopifyHandle?: string` — the Shopify product handle (e.g. `drift-shirt`). This is what `/shop/{handle}` and the Storefront API use, so it's the most useful "SKU-style" link.
- `shopifySku?: string` — optional human SKU code (e.g. `T56-014`) for at-a-glance matching.

No data changes to existing entries; both fields are optional.

### 2. Admin form (`src/pages/AdminDrops.tsx`)
Add a new **"Shopify Link"** section in the edit panel with two inputs side by side:
- **Shopify Handle** — text input, with helper text "Matches your Shopify product URL: /shop/{handle}"
- **Shopify SKU (optional)** — text input, helper "e.g. T56-014, for internal matching"

Plus two small logic upgrades while we're in there:
- **Category** selector (currently hardcoded to `resurrected`) — dropdown for `resurrected | curated | vault`.
- **Featured** checkbox — toggles `isFeatured`.

### 3. List row UX (`src/pages/AdminDrops.tsx`)
Each Art Piece row gets a compact status chip next to the existing status badge:
- If `shopifyHandle` is set → small rust outline chip `SHOPIFY: {handle}` that links (new tab) to `/shop/{handle}`.
- If not set → muted chip `STORY ONLY` so it's obvious this piece has no purchasable counterpart.

Also surface `shopifySku` (when present) as small distressed-serif text under the title, mirroring the `T56-###` convention.

### 4. New-piece defaults
`emptyPiece` gets `shopifyHandle: undefined`, `shopifySku: undefined`, `isFeatured: false`, and `category: "resurrected"` stays the default.

## Out of scope
- No Supabase migration. AdminDrops is still local-state only (matches today's behavior). When/if we migrate Art Pieces to the `art_pieces` Supabase table, we'll add `shopify_handle` / `shopify_sku` columns then.
- No automatic Shopify product lookup/validation — the handle is trusted as typed.
- No changes to `/drops` public rendering in this pass (can wire the Shopify link into the PDP CTA in a follow-up if you want).

## Technical notes
- Pure presentation + local state; no new deps.
- Link uses `<a href={`/shop/${handle}`} target="_blank" rel="noreferrer">` to avoid router coupling.
- Chips reuse existing brutalist tokens (`rounded-sm`, `border-orange-800`, `text-muted-foreground`) — no new colors.
