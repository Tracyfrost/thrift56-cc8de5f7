## Plan: Add GA4, Meta Pixel support, and improve SEO

### 1. Google Analytics 4 (GA4)
- Add the GA4 gtag snippet (`G-G70LXSJ5M9`) to `index.html` immediately after `<head>` so it loads once site-wide on every route.

### 2. Meta Pixel placeholder
- Add commented-out Meta Pixel `<script>` block in `index.html` `<head>` and the `<noscript>` fallback `<img>` in `<body>` (HTML5 requires noscript pixel in body, not head), with a clear `PASTE_META_PIXEL_ID_HERE` placeholder so it can be enabled later.

### 3. robots.txt
- `public/robots.txt` already exists and is correct (allows all, disallows `/admin`, points to sitemap). Leave as-is.

### 4. sitemap.xml
- `public/sitemap.xml` exists as a static file covering Home, Episodes, Drops, Shop, Community, Livestream, About, Contact, Policies. Confirm completeness — add `/shop/tracies-picks` and `/search` if appropriate. Keep static (no generator migration without asking).

### 5. SEO metadata on major pages
- `Seo.tsx` component (react-helmet-async) already exists and is used on Home (IndexV2), Shop, TraciesPicks, Policies.
- Add `<Seo>` to pages currently missing it: **Episodes**, **About**, **ArtDrops (/drops)**, **Community**, **Contact**, **Livestream**, plus detail pages **EpisodeDetail** and **ShopifyProductDetail / ArtPieceDetail** (dynamic title/description from content).
- Each `<Seo>` already emits Open Graph + Twitter card tags + canonical, so this single addition covers OG/Twitter/dynamic titles in one shot.

### 6. Cleanup
- Remove `<link rel="canonical">` from `index.html` to avoid duplicate canonicals when Helmet emits a per-route one (per project SEO guidance).

### Out of scope
- No visual or layout changes.
- No sitemap generator migration (static file kept).
- Meta Pixel is wired as a placeholder only; user adds the ID later.

### Files touched
- `index.html` (GA4 tag, Meta Pixel placeholder, drop static canonical)
- `public/sitemap.xml` (add 1–2 missing routes)
- `src/pages/Episodes.tsx`, `About.tsx`, `ArtDrops.tsx`, `Community.tsx`, `Contact.tsx`, `Livestream.tsx`, `EpisodeDetail.tsx`, `ShopifyProductDetail.tsx`, `ArtPieceDetail.tsx` (add `<Seo>` with page-appropriate title/description, dynamic where relevant)
