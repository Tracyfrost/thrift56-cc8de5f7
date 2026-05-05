## Plan

1. **Expose all Curated items in Shop**
   - Increase the Shop product query limit so `/shop` can render the full Curated catalog instead of stopping before the later egg listings.
   - Keep the existing Curated filter, but make sure all 7 porcelain egg listings can appear.

2. **Make the porcelain eggs behave like the Jared case**
   - Detect the porcelain egg reliquary group by its shared tag/SKU family.
   - On each porcelain egg detail page, add a sharp-edged package selector similar to the Jared page experience:
     - **Single Egg** — selected individual egg, $25
     - **Full Set of Six** — package/bundle product, $120
   - Selecting **Full Set of Six** will add the real Shopify bundle variant to cart, not a fake/manual checkout URL.

3. **Improve the bundle product path**
   - On the bundle detail page, present it as the package option and keep the add-to-cart flow tied to the real Shopify bundle product.
   - Preserve existing Shopify cart behavior: Storefront API cart creation, drawer checkout, and `channel=online_store` checkout URL.

4. **Validate**
   - Verify the Storefront API returns all 7 `egg-box` products.
   - Verify `/shop` Curated is no longer limited to the first two visible eggs.
   - Verify add-to-cart works for both a single egg and the full package selector.