
The user wants to set the inventory count for the trolley ashtray (T56-003, variant `42884539285581`) to exactly 1 in Shopify.

Inventory count adjustments are not directly settable via `shopify--update_product_variant` (which handles policy/management flags, not stock levels). Setting the actual on-hand count requires the Shopify Inventory API, which isn't exposed in our current tool set.

## Plan

Since I cannot directly set inventory levels through the available Shopify tools, the path forward is:

1. Open the Shopify Admin to the trolley ashtray product page
2. User manually sets inventory to 1 in the Shopify admin (Inventory section → set "Available" to 1)

The variant is already configured correctly from the previous session:
- `inventory_management: "shopify"` (tracking enabled)
- `inventory_policy: "deny"` (won't oversell past 0)

So once stock is set to 1, after one purchase it will auto-flip to "Sold Out" on the storefront.

### What I'll do
- Fetch the Shopify admin URL and provide a direct link to the product so you can update the count in two clicks.

### Why this can't be automated here
The available Shopify tools cover product metadata, variants (price/SKU/policy), discounts, and product CRUD — but not inventory level adjustments. Those go through Shopify's separate Inventory API which isn't wired into this workspace.
