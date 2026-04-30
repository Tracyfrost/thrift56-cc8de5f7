## Goal
Recover the Curated/Originals/Prints products that were created in the **old sandbox store** (`thrift56-9552o.myshopify.com`) and migrate them into your **production store** (`thrift-56-2` / `0a9ng1-f8.myshopify.com`).

## The migration sequence

```text
[NOW] Connected to: thrift-56-2 (production, empty)
   ↓ Step 1: Disconnect
[ ] Connected to: nothing
   ↓ Step 2: Reconnect sandbox
[ ] Connected to: thrift56-9552o (sandbox, has all products)
   ↓ Step 3: Inventory + export every product to JSON
[ ] Local file: /tmp/sandbox-products.json (all titles, prices, tags, images, variants)
   ↓ Step 4: Disconnect sandbox
[ ] Connected to: nothing
   ↓ Step 5: Reconnect production
[ ] Connected to: thrift-56-2
   ↓ Step 6: Recreate every product from JSON
[DONE] Production store has all migrated products, storefront shows them again
```

## Step-by-step

### Step 1 — Disconnect production
Run `shopify--disconnect_store`. Confirms with you. Code in `src/lib/shopify.ts` keeps current credentials but no Shopify tools will work until reconnect.

### Step 2 — Reconnect the old sandbox
Run `shopify--enable` with `store_type: existing`. **You'll be prompted to authorize.** The OAuth flow may auto-pick the most recent store again (`thrift-56-2`). If that happens:
- Open Shopify in a new tab, sign out
- Sign back in to the **sandbox store** (`thrift56-9552o.myshopify.com`)
- Then approve the Lovable OAuth prompt — it will now attach the sandbox

### Step 3 — Inventory + export
Once connected to sandbox:
- `shopify--count_products` to confirm total
- `shopify--list_products` (paginated) to enumerate everything
- `shopify--get_product` per item to capture full detail (variants, prices, images, tags, descriptions, product_type)
- Save to `/tmp/sandbox-products.json` — including image URLs from Shopify's CDN so we can re-upload them to production

### Step 4 — Disconnect sandbox
Run `shopify--disconnect_store`.

### Step 5 — Reconnect production
Run `shopify--enable` with `store_type: existing` again. Same OAuth-account caveat as Step 2 — sign out / sign in to `thrift-56-2` first if needed.

Update `src/lib/shopify.ts` if the new credentials differ from what's already there (they should be the same `0a9ng1-f8` + `cb1c5669...` token since we just had this connection moments ago).

### Step 6 — Recreate products in production
For each product from `/tmp/sandbox-products.json`, call `shopify--create_product` with:
- title, body (description), vendor, product_type, tags
- options + variants (price, sku, inventory)
- images (downloaded from sandbox CDN, re-uploaded)

I'll **show you a manifest** ("about to create N products: [list]") and ask for one confirmation before bulk-creating, so you can spot-check.

## Important caveats

- **Customer data, orders, analytics do NOT migrate.** This is a fresh production store; only product catalog moves.
- **Image quality:** Shopify CDN URLs are the original uploads, so quality is preserved.
- **Product handles (URLs):** Will regenerate from titles. If a sandbox product's handle was `oxidized-vessel`, the production one will likely also be `oxidized-vessel` unless there's a conflict.
- **OAuth picker behavior:** The reason switching stores has been tricky is your browser is logged into `thrift-56-2` on Shopify. To force the picker to a different store, you must sign out of Shopify in your browser between connect attempts (or use an incognito window for the sandbox auth).
- **No code changes** until Step 6 finishes — the storefront stays empty during migration but won't break.

## Decision needed before I start

Are you OK with me running the **disconnect** in the next message? Once you confirm, I'll proceed step-by-step and pause for your input only when OAuth needs your action or before bulk-creating products.
