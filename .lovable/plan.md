
Simple label change in the Shop filter bar. The `FILTERS` array in `src/pages/Shop.tsx` defines the visible category buttons. The "Merch" filter currently maps to Shopify's `product_type:Merch`.

## Plan

Update `src/pages/Shop.tsx` — change the `Merch` filter entry to `Curated`:

```ts
{ label: "Curated", query: "product_type:Merch" },
```

### Decision: leave the Shopify query as `product_type:Merch`
The existing trolley ashtray and any other smalls were tagged with `product_type: Merch` in Shopify. Changing the query string would orphan those products from this filter. The user-facing label updates to "Curated" while the underlying Shopify product_type stays `Merch`, so nothing disappears from the grid.

If you'd rather rename the Shopify product_type itself across all products too (so the backend matches the front label), say the word and I'll batch-update those products in a follow-up.

### Scope
- One line changed in `src/pages/Shop.tsx`
- No other files, no Shopify mutations, no schema changes
