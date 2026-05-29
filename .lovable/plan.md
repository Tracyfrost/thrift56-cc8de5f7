## Complete the Set — In-Cart Suggestions

When any of the four Tenmoku cups (T56-70, T56-71, T56-72, T56-73) is in the cart, show the remaining cups from the set as suggested items inside the cart drawer with a one-click "Add" button. Once all four are in, the section disappears and a small "TENMOKU4 — 10% off applied at checkout" nudge shows instead.

### Where it lives
`src/components/shop/CartDrawer.tsx` — new section between the line items list and the totals/checkout block, only when at least one set member is present and at least one is missing.

### How it works
1. **Define the set** in a tiny module `src/data/tenmokuSet.ts`:
   - Array of SKUs: `["T56-70","T56-71","T56-72","T56-73"]`
   - Helper `isTenmokuSet(sku)` and label "Tenmoku 4"
2. **Fetch the set products** via existing `useShopifyProducts` hook (already used elsewhere) filtered with Shopify query `tag:tenmoku-set`. Cache result at the drawer level so it only fires when the drawer opens and at least one set item is in the cart.
3. **Compute missing cups**: for each fetched product, read `variants.edges[0].node.sku`; show only those whose SKU is in the set list and not already present in `items` (matched by `variantId`).
4. **Suggestion row UI** (brutalist, matches existing cart card styling):
   - Section header: small Oswald label `COMPLETE THE SET — TENMOKU 4` with serif italic subline `Add the rest, get 10% off at $120+ with code TENMOKU4.`
   - Each suggestion: 40px square thumb, truncated title, `$30`, and a sharp-edged `+ ADD` button (rust border, hover fills `bg-orange-800 text-[#F9F6F0]`, `rounded-none`).
   - Click → calls `addItem` with that product's first variant (same pattern as `ProductCard.handleAddToCart`), shows existing sonner toast.
5. **All four present** → replace section with one-line rust-bordered notice: `TENMOKU 4 COMPLETE · CODE TENMOKU4 = 10% OFF`.
6. **Scroll behavior**: suggestions live inside the existing `flex-1 overflow-y-auto` region, below the line items, so the totals/checkout footer stays pinned.

### Edge cases
- If Shopify query returns nothing or errors, render nothing (no broken UI).
- Skip suggestions for sold-out variants (`availableForSale === false` and not 1-of-1 override — but these are 1-of-1, so always purchasable per existing `ProductCard` logic).
- Loading state on the `+ ADD` button mirrors `isLoading` from cart store.

### Out of scope
- No changes to discount logic (TENMOKU4 already configured in Shopify).
- No changes to ProductCard, PDP, or cart store.
- Suggestion logic is hard-scoped to the Tenmoku 4 set; a generic "related products" engine is a separate task.

### Files touched
- `src/data/tenmokuSet.ts` (new, ~15 lines)
- `src/components/shop/CartDrawer.tsx` (add suggestions section + product fetch)
