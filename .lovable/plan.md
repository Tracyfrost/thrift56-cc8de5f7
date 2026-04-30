## Goal
Switch this project from the current Shopify **sandbox** store (`thrift56-9552o.myshopify.com`) to your **existing production** Shopify store.

## Why a two-step process
A Lovable project can only have **one** Shopify store connected at a time. To connect a different store, the current one must be disconnected first.

**Important:** Disconnecting does NOT delete or affect anything in either Shopify store. It only removes the link between Lovable and the sandbox. All sandbox products/data stay intact in Shopify; nothing is touched in your production store.

## Steps

### 1. Disconnect the current sandbox store
I'll run the disconnect tool. You'll see a confirmation prompt — approve it.

### 2. Connect your existing Shopify store
After disconnect completes, I'll trigger the Shopify connection flow. You'll be asked to:
- Enter your existing store's Shopify admin URL (e.g. `your-store.myshopify.com` or your custom domain)
- Authorize Lovable to access the store via OAuth (one-click in Shopify admin)

### 3. Verify the connection
Once connected, I'll:
- Confirm the new store domain via `shopify--get_shop_permanent_domain`
- Update `src/lib/shopify.ts` (currently hardcoded to `thrift56-9552o.myshopify.com` and a sandbox storefront token) to use the new store's permanent domain and storefront access token
- Pull a product count to confirm the homepage and `/shop` start showing real products from the production store

### 4. Heads-up on production data
Once connected to your real store, **any product/inventory/discount changes I make through chat will affect your live store immediately** (with a confirmation prompt each time). Storefront/UI changes in Lovable stay in preview until you publish.

## What you should NOT do during this
- Don't claim or pay for the sandbox store — we're abandoning it.
- Hold off on the Shopify Basic $1×3 promo decision until you confirm whether your existing store is already on a paid plan (if it is, you don't need a new subscription at all).

## Technical details
- **File to update after reconnect:** `src/lib/shopify.ts` — constants `SHOPIFY_STORE_PERMANENT_DOMAIN` and `SHOPIFY_STOREFRONT_TOKEN`.
- **Tools used:** `shopify--disconnect_store` → `shopify--connect_shopify_account` → `shopify--get_shop_permanent_domain` + `shopify--get_storefront_token` → `shopify--count_products`.
- **Cart/checkout code** in `src/stores/cartStore.ts` and `src/lib/shopify.ts` is store-agnostic and will work without changes.

## Confirm before I proceed
- ✅ You have an existing Shopify store with admin access (you can log in at `admin.shopify.com`).
- ✅ You're ok losing the sandbox connection (no real data lives there).

Approve this plan and I'll start with the disconnect.
