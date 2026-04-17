

## Goal
Create T56-005 in Shopify with the user's chosen settings. Image is already saved. No code changes needed — the `1-of-1` tag triggers the existing frontend purchasability override.

## Confirmed inputs
- **Title:** Vintage Wheaties License Plate
- **Price:** $150.00
- **SKU:** T56-005
- **Image:** `src/assets/products/T56-005_VINTAGE-WHEATIES-LICPLATE.jpg` (saved)

## Step (single tool call on approval)

Run product creation with:
- **Title:** Vintage Wheaties License Plate
- **Vendor:** Thrift 56
- **Product Type:** `Curated`
- **Tags:** `1-of-1, curated, found-object, wheaties, vintage, americana, license-plate, 1950s, collection`
- **Variant:** SKU `T56-005`, price `150.00`, `inventory_management: shopify`, `inventory_policy: deny`
- **Image:** the saved asset (alt: "Vintage 1953 Wheaties cereal premium license plate collection")
- **Description:**

> *Breakfast of Champions. Thirteen states. One impossible set.*
>
> The 1953 Wheaties Premium License Plate Collection — a cereal-box giveaway that turned a generation of kids into amateur cartographers. Six box tops, a mail-in coupon, a few weeks of patience. Out came a miniature plate from a state most kids would never visit.
>
> Survived seventy years of attic boxes and one estate auction nobody else showed up to. California gold. Nevada green. Montana's outline twice (someone really wanted that one). Wyoming's bucking bronco still mid-air. New Mexico bleeding *Land of Enchantment* red. Idaho's *World Famous Potato* deadpan honesty.
>
> Most kids lost half theirs by '55. Almost nobody kept the full run. This one did.
>
> **The Find:** Pacific Northwest estate, original mailing envelope long gone.
> **Era:** 1953 Wheaties cereal-premium series (plus one wandering 1974 Minnesota that snuck in).
> **Condition:** Original paint, honest age-appropriate wear, all plates structurally sound.
> **Quantity:** One complete-ish set. Worldwide.

## Frontend behavior (no changes)
The existing override in `ProductCard.tsx` and `ShopifyProductDetail.tsx`:
```ts
const isPurchasable = firstVariant?.availableForSale || isOneOfOne;
```
fires automatically because of the `1-of-1` tag. Both card and PDP will render "Add to Cart" the moment the product is live, sandbox availability flag bypassed.

## Note on title vs. image
You picked the singular title "Vintage Wheaties License Plate" but the photo shows ~13 plates. I'm honoring your title choice — the description still acknowledges the set so the listing reads honestly. If you want me to switch the title to "Vintage Wheaties License Plate Collection" before creating, say the word; otherwise approve and I create as specified.

