
The user is asking how to upload, change, and update product photos for their Shop. This is a "how-to" question, not an implementation request — so I should answer directly without proposing code changes.

Key context:
- The project uses Shopify as the single source of truth for products (per memory: "architecture/shopify-storefront")
- Products are fetched via Storefront API in `src/lib/shopify.ts` and `src/hooks/useShopifyProducts.ts`
- The `ProductCard.tsx` displays `node.images.edges[0]?.node.url` directly from Shopify
- There is NO admin UI in the Lovable app for uploading product photos — that lives in Shopify Admin
- The AI agent has access to `shopify--update_product` which can replace product images via `file_path` (supports `user-uploads://` or `src/` paths)

So there are 3 real ways to update product photos:
1. **Shopify Admin dashboard** (recommended for ongoing use — visual, drag-drop, reorder, alt text)
2. **Through chat with me** (upload a photo to chat + tell me which product to update)
3. **Bulk via CSV import in Shopify Admin** (for many products at once)

I should NOT suggest building an in-app uploader — that would duplicate Shopify's admin and break the single-source-of-truth architecture.

This is a Q&A response, no plan/code changes needed. Keep it short and actionable.
