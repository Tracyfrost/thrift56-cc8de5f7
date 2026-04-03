

## Plan: Square Web Payments + Webhooks (Phase 2)

This wires Square as the single source of truth for inventory and checkout, while Supabase continues to hold rich content. Three deliverables: checkout flow, webhook sync, and admin catalog sync.

---

### Prerequisites — Square API Keys

Before implementation begins, you need to provide two Square credentials:
- **SQUARE_ACCESS_TOKEN** — from Square Developer Dashboard (sandbox/test mode)
- **SQUARE_LOCATION_ID** — the location tied to your catalog
- **SQUARE_APPLICATION_ID** — for the Web Payments SDK on the frontend
- **SQUARE_WEBHOOK_SIGNATURE_KEY** — for verifying webhook payloads

These will be stored as backend secrets (not in code).

The frontend SDK (`@square/web-payments-sdk`) only needs the Application ID, which is a publishable key stored in code as a Vite env var.

---

### 1. Database Changes

**Add columns to `thrift_items`:**
- `square_variation_id` (text) — Square catalog variation ID (needed for orders)
- `square_inventory_count` (integer, default 1) — live stock count from Square

No new tables needed.

---

### 2. Edge Function: `square-checkout`

**Path:** `supabase/functions/square-checkout/index.ts`

Handles the server-side payment flow:
1. Receives `{ item_id, nonce }` from frontend (nonce = payment token from Square SDK)
2. Validates JWT (authenticated or anonymous buyer — TBD, likely anonymous for single purchases)
3. Looks up `thrift_items` by `id` to get `square_variation_id` and `price`
4. Calls Square Orders API to create an order
5. Calls Square Payments API to process payment with the nonce
6. On success: updates `thrift_items` set `is_sold = true` in Supabase via service role
7. Returns success/failure to frontend

Uses `SQUARE_ACCESS_TOKEN` and `SQUARE_LOCATION_ID` from secrets.

---

### 3. Edge Function: `square-webhook`

**Path:** `supabase/functions/square-webhook/index.ts`

Receives Square webhook events (public endpoint, no JWT):
1. Verifies Square webhook signature using `SQUARE_WEBHOOK_SIGNATURE_KEY`
2. Handles events:
   - `inventory.count.updated` — updates `square_inventory_count` and sets `is_sold = true` when count hits 0
   - `order.created` — marks item as sold if matched by `square_catalog_id`
   - `catalog.version.updated` — triggers re-sync of item metadata (title, price, images) from Square catalog
3. Updates `thrift_items` via service role client

Config: `verify_jwt = false` (external webhook, signature-verified instead).

---

### 4. Edge Function: `square-sync`

**Path:** `supabase/functions/square-sync/index.ts`

Admin-only catalog sync tool:
1. Validates JWT + checks admin role
2. Calls Square Catalog API `ListCatalogObjects` (type: ITEM)
3. For each catalog item: upserts into `thrift_items` matching on `square_catalog_id`
4. Pulls inventory counts via Square Inventory API `BatchRetrieveInventoryCounts`
5. Updates `square_inventory_count` and `is_sold` accordingly
6. Returns summary of synced/created/updated items

---

### 5. Frontend: Square Payment Form on `/shop/:slug`

**Install:** `@square/web-payments-sdk`

**New component:** `src/components/shop/SquarePaymentForm.tsx`
- Loads Square Web Payments SDK with Application ID
- Renders Card payment field + Apple Pay + Google Pay buttons
- Styled to match site: `border-4 border-stone-950 rounded-none bg-[#F9F6F0]` container, stone-950 submit button
- On tokenize success: calls `square-checkout` edge function with nonce + item ID
- Shows loading state during payment, then updates UI to SOLD on success
- Error handling with toast notifications

**Edit `ShopItemDetail.tsx`:**
- Replace static "ACQUIRE THIS PIECE" button with `<SquarePaymentForm>` component
- Pass `item.id`, `item.price`, `item.title` as props
- On successful payment: invalidate queries to trigger realtime SOLD update

---

### 6. Homepage Scarcity Banner

**Edit `AvailableNowGrid.tsx`:**
- For items where `square_inventory_count === 1` and `!is_sold`, show "ONLY 1 LEFT" badge (bg-orange-800, pulsing animation)
- Replaces the current static "Available" badge conditionally

---

### 7. Admin Panel: Square Sync Tab

**Edit `AdminDashboard.tsx`:**
- Add new tab "Square Sync" with a sync button
- Calls `square-sync` edge function on click
- Shows results: items synced, inventory updated, errors
- Displays last sync timestamp (stored in localStorage)

---

### Files Summary

| File | Action |
|------|--------|
| Migration SQL | Add `square_variation_id`, `square_inventory_count` to `thrift_items` |
| `supabase/functions/square-checkout/index.ts` | New — payment processing |
| `supabase/functions/square-webhook/index.ts` | New — inventory sync webhook |
| `supabase/functions/square-sync/index.ts` | New — admin catalog pull |
| `src/components/shop/SquarePaymentForm.tsx` | New — payment UI component |
| `src/pages/ShopItemDetail.tsx` | Wire payment form into CTA |
| `src/components/v2/AvailableNowGrid.tsx` | Add scarcity badge |
| `src/pages/AdminDashboard.tsx` | Add Square Sync tab |
| `src/hooks/useSupabaseData.ts` | Add mutation for checkout |
| `package.json` | Add `@square/web-payments-sdk` |

