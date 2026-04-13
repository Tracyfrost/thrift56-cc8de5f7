

# Unify Shop/Product Pages to Light Retro Palette

## Files to Modify (3 files)

### 1. `src/pages/ShopifyProductDetail.tsx`
- Loading/error states: `bg-stone-950` → `bg-[#F9F6F0]`
- Main wrapper: `bg-stone-950` → `bg-[#F9F6F0]`
- Back link: `text-stone-500 hover:text-rust` → `text-stone-500 hover:text-orange-800`
- Image containers: `bg-stone-900 border border-stone-800` → `bg-stone-100 border border-stone-300`
- No-image fallback: `bg-stone-900 border-stone-800 text-stone-700` → `bg-stone-100 border-stone-300 text-stone-400`
- Product type text: keep `text-stone-600`
- Title: `text-stone-100` → `text-stone-950`
- Price: keep `text-rust` (already correct)
- Description border: `border-rust/30` → `border-orange-800/30`, text `text-stone-400` → `text-stone-600`, `text-stone-500` → `text-stone-500` (ok)
- Variant selector: inactive `border-stone-700 text-stone-400 hover:border-stone-500` → `border-stone-300 text-stone-600 hover:border-stone-500`
- Accordion borders: `border-stone-800` → `border-stone-300`
- Accordion trigger text: `text-stone-400 hover:text-stone-200` → `text-stone-600 hover:text-stone-950`
- Accordion content: `text-stone-500` stays, label spans `text-stone-300` → `text-stone-700`

### 2. `src/components/shop/FourPillars.tsx`
- Grid border: `border-stone-800` → `border-stone-300`
- Divider borders: `border-r border-stone-800` → `border-r border-stone-300`
- Label text: `text-stone-200` → `text-stone-950`
- Keep rust icons and stone-500 detail text

### 3. `src/components/shop/CartDrawer.tsx`
- Cart trigger icon: `text-stone-300` → `text-stone-600` (for visibility on light nav — but nav is dark/grunge, so this stays)
- Sheet panel: `bg-stone-950 border-l border-stone-800` → `bg-[#F9F6F0] border-l border-stone-300`
- Title: `text-stone-200` → `text-stone-950`
- Description: `text-stone-500` stays
- Empty cart icon: `text-stone-700` → `text-stone-400`
- Cart items: `border-stone-800 bg-stone-900` → `border-stone-300 bg-white`
- Item thumbnail bg: `bg-stone-800` → `bg-stone-100`
- Item title: `text-stone-200` → `text-stone-950`
- Quantity buttons: `border-stone-700 text-stone-400 hover:text-stone-200 hover:border-stone-500` → `border-stone-300 text-stone-600 hover:text-stone-950 hover:border-stone-500`
- Footer border: `border-stone-800` → `border-stone-300`
- Total label: `text-stone-400` → `text-stone-600`

All logic stays the same — pure color/class swaps.

