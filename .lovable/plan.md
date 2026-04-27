## Goal
Stop the homepage "Available Now" grid from showing **SOLD** on 1-of-1 items whose Shopify inventory hasn't been configured. Every piece is a single available item, so they should all read **AVAILABLE**.

## Change
**File:** `src/components/v2/AvailableNowGrid.tsx`

Mirror the same sandbox override already used in `ProductCard.tsx`:
- Treat any product tagged `1-of-1` as available even when Shopify reports `availableForSale === false`.
- Show the orange "AVAILABLE" badge instead of the gray "SOLD" strikethrough.
- Keep price styling normal (no strikethrough).

### Logic
```ts
const tags = node?.tags || [];
const isOneOfOne = tags.includes("1-of-1");
const isAvailable = available !== false || isOneOfOne;
```
Then render the AVAILABLE badge when `isAvailable`, SOLD only when truly out of stock and not 1-of-1.

## Out of scope
- No Shopify inventory mutations (display-only fix, matches existing ProductCard behavior).
- No changes to `/shop` cards — already handled.