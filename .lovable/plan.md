

# Site-Wide Aesthetic Consistency Audit & Polish

## Issues Found

The site has a solid foundation but several sections feel "too clean" — lacking the raw, gritty, high-contrast industrial energy the brand demands. Here's what needs fixing:

### 1. Homepage Sections Too Sterile
- **BeforeAfterSlider**: Plain `bg-[#F9F6F0]` background with no texture. Missing film grain, diagonal stripes, or any visual grit. The slider handle is a clean white circle — should feel more industrial.
- **LatestTransformationBrutalist**: Same flat bone-white bg, no texture overlays. Video embed border is good but the section lacks atmosphere.
- **AvailableNowGrid**: Flat, clean bone-white. Product cards lack the industrial edge found in the Shop page's `ProductCard` (which uses dark `bg-stone-950` cards). Inconsistent with Shop page aesthetic.
- **MarqueeBrutalist**: Good concept but the `bg-stone-950` bar needs more grit — add a diagonal stripe texture or noise overlay.

### 2. Episodes Page
- **EpisodeHero**: Uses `texture-paper` class (good) but the background is too light/clean. Needs the darker industrial treatment. The bouncing arrow feels playful — wrong energy.
- **EpisodeBingeReel**: `bg-stone-50` is too basic. Needs texture and darker tone.
- **EpisodeStorySteps**: Uses `texture-paper` but the step boxes are clean white squares with thin borders — should be more industrial (thicker borders, slight skew/rotation, rust accents).
- **EpisodeCategoryFilter**: Needs review for dark industrial styling.

### 3. About Page
- Already uses `bg-stone-950` — dark industrial tone is correct. The four pillars grid is a bit undersized and could use rust accent borders.

### 4. Contact Page
- Dark bg is correct. Form inputs are consistent. Minor: button could have a skewed/rotated micro-detail for brand flavor.

### 5. Drops Page (`ArtDrops`)
- Uses `bg-[#F9F6F0]` as base — the hero has grain overlays (good), but the rest of the page sections likely feel clean.

### 6. Footer
- Currently `bg-primary` which maps to near-black. Decent but needs texture overlay (grain/stripes) to match nav energy.

### 7. Mobile Issues
- Hero mobile: CTAs stack well but the text overlay readability could be stronger — gradient fade needs more opacity on small screens.
- Mobile nav menu: `bg-stone-950` is fine but lacks texture matching the nav bar's `.bg-grunge` treatment.
- MarqueeBrutalist: Text may be too small on mobile.

### 8. Email Popup
- Mixes `font-heading` (Oswald) with the brand pattern of `font-sans` — needs consistency with the brutalist V2 system.

## Plan

### A. Add Shared Texture Utilities (index.css)
- Create `.texture-grain` and `.texture-stripes` utility classes that can be applied anywhere for consistent grit
- Create a `.section-dark` and `.section-bone` base pattern with built-in grain

### B. Homepage Sections Polish (4 files)
- **BeforeAfterSlider.tsx**: Add film grain overlay, diagonal stripe texture, darken slider handle to industrial style (stone-950 bg, rust accent ring)
- **LatestTransformationBrutalist.tsx**: Add grain overlay, slight diagonal stripe, add a rust left-border accent to the section
- **AvailableNowGrid.tsx**: Switch to dark bg (`bg-stone-950`) with grain overlay to match shop aesthetic. Update product card text colors accordingly. Add "paint splatter" energy via asymmetric rust accent lines.
- **MarqueeBrutalist.tsx**: Add diagonal stripe texture overlay. Increase text size on mobile. Add rust-colored dots instead of stone-500.

### C. Episodes Page Polish (4 files)
- **EpisodeHero.tsx**: Replace `texture-paper` with dark industrial bg (`bg-stone-950`), white text, film grain. Remove bouncing arrow (too playful). Add rust glow to featured video border.
- **EpisodeBingeReel.tsx**: Switch to `bg-stone-950` with grain. Update text to light colors.
- **EpisodeStorySteps.tsx**: Switch to dark bg, thicker borders on step icons, rust fill on icons, connecting lines in rust.
- **EpisodeCategoryFilter.tsx**: Ensure dark industrial styling with rust active state.

### D. Footer + Mobile Menu Polish (2 files)
- **SiteFooter.tsx**: Add film grain overlay and diagonal stripe texture to match nav bar energy.
- **SiteNav.tsx**: Add `.bg-grunge` or grain texture to mobile menu dropdown. Improve mobile hero gradient strength.

### E. Email Popup Consistency (1 file)
- **EmailPopup.tsx**: Swap `font-heading` to `font-sans font-black` for brutalist V2 consistency. Add subtle grain to popup background.

### F. Mobile-Specific Fixes (across files)
- Hero: Strengthen gradient overlay on mobile (`from-[#F9F6F0]/100` on small screens)
- MarqueeBrutalist: Bump text to `text-base` on mobile
- AvailableNowGrid/EpisodeGrid: Ensure 1-col on mobile has adequate spacing
- CTA buttons: Ensure full-width on mobile with adequate tap targets (min 48px height)

### Files Modified (estimated 10-12 files)
- `src/index.css` — new texture utility classes
- `src/components/v2/BeforeAfterSlider.tsx`
- `src/components/v2/LatestTransformationBrutalist.tsx`
- `src/components/v2/AvailableNowGrid.tsx`
- `src/components/v2/MarqueeBrutalist.tsx`
- `src/components/episodes/EpisodeHero.tsx`
- `src/components/episodes/EpisodeBingeReel.tsx`
- `src/components/episodes/EpisodeStorySteps.tsx`
- `src/components/SiteFooter.tsx`
- `src/components/SiteNav.tsx`
- `src/components/EmailPopup.tsx`
- `src/components/v2/HeroBrutalist.tsx` — mobile gradient fix

