

# Unify Site to Light Retro 50s/60s Palette

The Home and Drops pages use `bg-[#F9F6F0]` (warm bone white) with dark text. Shop, Episodes, About, and Contact all use `bg-stone-950` (near-black). The user wants everything light and retro.

## Color Shift Strategy

Replace all dark backgrounds (`bg-stone-950`, `section-dark`, `bg-stone-900`) with the warm bone palette (`bg-[#F9F6F0]`) and flip text colors from light (`text-stone-50/100/200`) to dark (`text-stone-950`, `text-stone-700`). Keep rust (`text-orange-800`) as the accent. Borders shift from `border-stone-800` to `border-stone-300`.

## Files to Modify

### Pages (4 files)
- **`src/pages/Shop.tsx`**: Change wrapper and hero from `bg-stone-950` to `bg-[#F9F6F0]`. Flip all text to dark tones. Filter bar borders to `border-stone-300`. Inactive filter text to `text-stone-600`.
- **`src/pages/About.tsx`**: Change wrapper from `bg-stone-950` to `bg-[#F9F6F0]`. Flip heading to `text-stone-950`, body text to `text-stone-600`, borders to `border-stone-300`.
- **`src/pages/Contact.tsx`**: Change wrapper from `bg-stone-950` to `bg-[#F9F6F0]`. Inputs from `bg-stone-900` to `bg-white border-stone-300`. Text to dark tones.
- **`src/pages/Episodes.tsx`**: Change wrapper `min-h-screen` to include `bg-[#F9F6F0]`.

### Episode Components (5 files)
- **`EpisodeHero.tsx`**: Replace `section-dark texture-grain` with `bg-[#F9F6F0] texture-grain relative overflow-hidden`. All text flipped to dark (`text-stone-950`, `text-stone-600`). Video border stays `border-orange-800`. Stats grid border to `border-stone-300`. CTA buttons adapted to light bg.
- **`EpisodeCategoryFilter.tsx`**: Inactive buttons from `text-stone-200 border-stone-600` to `text-stone-700 border-stone-400 hover:bg-stone-200`.
- **`EpisodeGrid.tsx`**: Card text to `text-stone-950`. Hook overlay gradient stays dark for contrast on thumbnails.
- **`EpisodeBingeReel.tsx`**: Replace `section-dark` with `bg-[#F9F6F0]` light variant. Headings to dark. Thumbnail borders to `border-stone-300`. Progress bar bg to `border-stone-300`.
- **`EpisodeStorySteps.tsx`**: Replace `section-dark` with bone bg. Step boxes to `bg-white border-stone-400`. Labels to `text-stone-950`.
- **`EpisodeCtaBreak.tsx`**: Switch from `bg-stone-950` to `bg-[#F9F6F0]`. Heading to dark. CTA button inverted.

### Homepage Components (2 files)
- **`AvailableNowGrid.tsx`**: Replace `section-dark` with `bg-[#F9F6F0]` bone-white. Flip all text to dark. Product card backgrounds to `bg-white border-stone-300`. Badges adapted.
- **`EmailCaptureBrutalist.tsx`**: Switch from `bg-stone-950` to `bg-[#F9F6F0]`. Text to dark. Input border to `border-stone-400`. Button to `bg-stone-950 text-[#F9F6F0]`.

### Shop Component (1 file)
- **`ProductCard.tsx`**: Card bg from `bg-stone-950` to `bg-white border-stone-300`. Text to dark tones. Add-to-cart button from `bg-stone-800` to `bg-stone-200 text-stone-800 hover:bg-orange-800 hover:text-white`.

### Footer (1 file)
- **`SiteFooter.tsx`**: Keep slightly darker for visual anchoring but warm it up — use `bg-stone-100` with warm grain. Text stays muted. Or match `bg-[#F9F6F0]` with a top border divider.

Total: ~14 files, all color/class swaps with no logic changes.

