

## Plan: Make V2 the Main Homepage & Update V2 Hero Image

### Changes

1. **`src/App.tsx`** — Swap routes so `IndexV2` serves `/` and `Index` moves to `/v1`
2. **`src/components/v2/HeroBrutalist.tsx`** — Replace `hero-tracie.jpg` import with `hero-tracie-disco.jpg`

### Technical Details
- In `App.tsx`: change `<Route path="/" element={<Index />} />` to `<Route path="/v1" element={<Index />} />` and `<Route path="/v2" element={<IndexV2 />} />` to `<Route path="/" element={<IndexV2 />} />`
- In `HeroBrutalist.tsx`: change `import heroTracie from "@/assets/hero-tracie.jpg"` to `import heroTracie from "@/assets/hero-tracie-disco.jpg"`

