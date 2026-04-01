

## Plan: Visual Overhaul of Art Drops Page

Keep the existing tiered section structure (Hero → Current Release → Resurrected → Curated → Vault → Archive → Email) but overhaul the visual execution of every component for stronger hierarchy, better storytelling, and brand-aligned aesthetics.

---

### 1. DropsHero.tsx — Cinematic upgrade

- Replace flat `bg-[#F9F6F0]` with a layered hero: subtle SVG film grain overlay + faint diagonal stripe texture
- Make countdown timer larger with rust-colored numbers and stronger typographic weight
- Add a pulsing dot or subtle glow next to "LIVE NOW" for tension
- Tighten spacing — reduce padding, make the headline feel more compressed/urgent
- Status strip: add a faint rust left-border accent for visual punch

### 2. DropsCurrentRelease.tsx — Dominant focus section

- Increase image size (change aspect from `4/3` to `1/1` or `3/4` for more visual weight)
- Add a faint grit texture overlay on the image container
- Make the "CURRENT RELEASE" label sit on a dark strip/band rather than floating text
- Increase CTA button size — full-width on the right column, taller padding
- Add a thin rust divider line between price stack and CTA
- Story text: switch from `line-clamp-3` to `line-clamp-2` for tighter feel

### 3. DropsResurrected.tsx — Hero tier, must dominate

- Increase card size: switch from 3-col to 2-col on desktop for larger, more impactful cards
- Add the before/after hover-swap interaction (show `after_image_url` by default, reveal `before_image_url` on hover with crossfade)
- Add a subtle dark gradient overlay at bottom of each image for text readability
- Make "1 OF 1" tag more prominent — larger, with rust border
- Add price display on cards
- "WATCH TRANSFORMATION" button: add a Play icon, make it more visually distinct with border treatment
- "VIEW PIECE" button: solid rust background
- Add a micro-story line: serif italic, 1 line under title

### 4. DropsCurated.tsx — Lighter, faster

- Keep 4-col grid but add slightly more vertical spacing
- Add a thin top border line to visually separate from Resurrected
- Add hover: slight scale + shadow lift
- "Field Pick" tag: change to outlined style (border instead of filled background) for lighter feel vs Resurrected's heavy cards

### 5. DropsVault.tsx — Premium dark section

- Add a subtle gradient or noise texture to the dark background
- Increase card aspect ratio to `3/4` (already done) — add a bottom gradient overlay
- Add more letter-spacing to "THE VAULT" heading
- Cards: add a thin rust-colored bottom border on hover
- Price: display larger, more prominent
- Add a short description/story line under title in muted stone text

### 6. DropsArchive.tsx — Historical credibility

- Switch from horizontal scroll to a 4-col grid (better for desktop)
- Make "SOLD" stamp more visible — larger text, stronger opacity
- Add drop number prominently
- Add a "VIEW ALL ARCHIVE" link at bottom if more than 8 items

### 7. DropsEmailCapture.tsx — Tighten

- Add film grain overlay to match hero
- Make heading slightly larger
- Add a thin top border accent in rust

### 8. Global micro-UX

- SOLD items → grayscale filter applied consistently across all sections
- AVAILABLE → full color with slight warm filter
- Add `transition-all duration-300` on all card hover states for smoother interactions
- Ensure all images have `loading="lazy"`

---

### Files to edit

| File | Change |
|------|--------|
| `src/components/drops/DropsHero.tsx` | Cinematic hero, larger countdown, live indicator |
| `src/components/drops/DropsCurrentRelease.tsx` | Bigger image, stronger CTA, tighter layout |
| `src/components/drops/DropsResurrected.tsx` | 2-col grid, hover before/after, stronger cards |
| `src/components/drops/DropsCurated.tsx` | Spacing, outlined tags, hover polish |
| `src/components/drops/DropsVault.tsx` | Texture, hover accents, description text |
| `src/components/drops/DropsArchive.tsx` | Grid layout, stronger SOLD stamps |
| `src/components/drops/DropsEmailCapture.tsx` | Texture overlay, sizing |

No database changes needed. No new components — all refinements to existing files.

