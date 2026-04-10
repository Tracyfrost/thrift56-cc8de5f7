

## Full Shopify Storefront Build — Thrift 56

This is a large build broken into phases. Due to scope, I recommend we execute it across multiple steps. Here is the complete plan.

---

### Phase 1: Shopify Infrastructure + 8 Real Products

**Create 8 products in Shopify** via the `create_product` tool (no mock data):

| # | Title | Type | Price | Category |
|---|-------|------|-------|----------|
| 1 | The Botanical Vase | Original (1-of-1) | $225 | Resurrected |
| 2 | The Gallery Frame | Original (1-of-1) | $185 | Resurrected |
| 3 | The Treasure Chest | Original (1-of-1) | $275 | Resurrected |
| 4 | The Sunset Serving Tray | Original (1-of-1) | $150 | Curated |
| 5 | Paint Splatter Tee — THRIFT 56 | Merch | $38 | Merch (S/M/L/XL) |
| 6 | Studio 56 Snapback | Merch | $32 | Merch (One Size) |
| 7 | "From Forgotten to Featured" Print — Limited /50 | Print | $65 | Limited Edition |
| 8 | Digital Transformation Toolkit | Digital | $15 | Digital Download |

Each product gets: title, description (brand voice), product_type, tags, variants with inventory tracking, and placeholder body copy.

**New files created:**
- `src/lib/shopify.ts` — Storefront API config (domain, token, `storefrontApiRequest` helper, all GraphQL queries/mutations for products + cart)
- `src/stores/cartStore.ts` — Zustand persistent cart state with full Shopify cart sync
- `src/hooks/useCartSync.ts` — Visibility-change cart sync hook
- `src/hooks/useShopifyProducts.ts` — React Query hook wrapping the Storefront API products query

---

### Phase 2: Navigation + Cart Drawer

**Update `SiteNav.tsx`:**
- Nav links become: Home, Episodes, Shop, About, Community/Drops, Contact
- Add cart icon with badge count in the nav bar (styled to match the retro-industrial aesthetic)
- Cart drawer component (Sheet) with brutalist Thrift 56 styling (dark bg, rust accents, rounded-none)

**Update `App.tsx`:**
- Add `useCartSync()` hook
- Add `/shop` route (new shop landing page)
- Add `/shop/:handle` route (Shopify product detail page)
- Keep existing `/drops` for art drops, `/shop/:slug` for legacy thrift items

---

### Phase 3: Shop Landing Page

**New `src/pages/Shop.tsx`:**
- Hero section: "FROM FORGOTTEN TO FEATURED." tagline, dark cinematic bg, film-grain overlay
- Collection filter tabs: All / Originals / Prints / Merch / Digital
- Product grid loading from Shopify Storefront API (not Supabase)
- Each card: image, title, price, "1 OF 1" or "LIMITED /50" badge, Add to Cart button
- Brand copy interspersed: "This was $3. It deserved better."

---

### Phase 4: Cinematic Product Detail Page

**New `src/pages/ShopifyProductDetail.tsx`:**

Two-column layout matching the existing `ShopItemDetail` brutalist aesthetic:

**Left column — Visual story stack:**
1. Hero after image (full-width)
2. Before image with "BEFORE" label overlay
3. Embedded YouTube episode clip (placeholder ID)
4. Macro detail shot
5. Viewer reactions block

**Right column — Sticky buy box:**
1. "1 OF 1 WORLDWIDE" exclusivity badge
2. Title + description (brand voice)
3. **Four pillars strip**: Discovery / Transformation / Story / Release (small icons + labels)
4. Value stack: thrifted origin price, labor hours, acquisition price
5. Variant selector (if applicable — size for merch, edition for prints)
6. Add to Cart button (Shopify cart integration)
7. "From Forgotten to Featured" story notes section
8. Artist's Manifest accordion (materials)
9. Shipping & Returns accordion (FTC-compliant language, CPSC safety note)
10. Hidden admin metafields section (only visible when logged in as admin): cost basis, condition notes, storage location

---

### Phase 5: Homepage Updates

**Update `IndexV2.tsx`:**
- Hero: "From Forgotten to Featured." with CTA buttons → Shop + Watch Latest Episode
- Replace `AvailableNowGrid` to pull from Shopify instead of Supabase `thrift_items`
- Keep all existing sections (MarqueeBrutalist, BeforeAfterSlider, etc.)

**Email capture popup:**
- New `src/components/EmailPopup.tsx` — timed popup (appears after 8s or 50% scroll) with "Next Drop" alert signup, uses existing Supabase `subscribers` table

---

### Phase 6: Policies + About + Contact Pages

**New pages:**
- `src/pages/About.tsx` — Brand story, "From Forgotten to Featured" narrative, the four pillars
- `src/pages/Contact.tsx` — Simple contact form
- `src/pages/Policies.tsx` — Shipping, returns (FTC-compliant), CPSC product safety note

---

### Files Modified Summary

| File | Change |
|------|--------|
| `src/lib/shopify.ts` | NEW — API config + helpers |
| `src/stores/cartStore.ts` | NEW — Zustand cart |
| `src/hooks/useCartSync.ts` | NEW — Cart sync hook |
| `src/hooks/useShopifyProducts.ts` | NEW — Products hook |
| `src/components/shop/CartDrawer.tsx` | NEW — Brutalist cart drawer |
| `src/components/shop/ProductCard.tsx` | NEW — Shopify product card |
| `src/components/shop/FourPillars.tsx` | NEW — Discovery/Transform/Story/Release strip |
| `src/components/EmailPopup.tsx` | NEW — Timed email capture popup |
| `src/pages/Shop.tsx` | NEW — Shop landing |
| `src/pages/ShopifyProductDetail.tsx` | NEW — Cinematic PDP |
| `src/pages/About.tsx` | NEW — Brand story |
| `src/pages/Contact.tsx` | NEW — Contact form |
| `src/pages/Policies.tsx` | NEW — Shipping/returns/safety |
| `src/components/SiteNav.tsx` | EDIT — New nav links + cart icon |
| `src/pages/IndexV2.tsx` | EDIT — Hero CTA + Shopify grid |
| `src/App.tsx` | EDIT — New routes + useCartSync |

### What Stays the Same
- All existing pages (Episodes, Community, Drops, Admin, Livestream)
- SiteFooter (will add email signup row)
- Database tables, auth, edge functions
- Retro-industrial nav bar styling (just adding links + cart icon)

### Execution Note
Due to scope, I will implement this across multiple steps — starting with Phase 1 (products + infrastructure), then building outward. Each step will be functional and testable before moving to the next.

