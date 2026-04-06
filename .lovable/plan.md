

## Make Nav Bar Colors More Artistic — Thrift 56 Theme

The current nav uses `bg-grunge` (a simple dark gradient). The plan is to enrich it with the brand's signature palette — oxidized rust, aged warmth, and industrial texture — while keeping the dark, gritty feel.

### Changes — `src/index.css`

Update the `.bg-grunge` gradient to incorporate warm rust and aged-paper undertones instead of plain dark browns:

```css
.bg-grunge {
  background: linear-gradient(
    135deg,
    hsl(18 12% 8%) 0%,
    hsl(16 18% 12%) 35%,
    hsl(20 25% 10%) 65%,
    hsl(14 15% 7%) 100%
  );
}
```

This shifts from a flat vertical dark gradient to a **diagonal blend with warm rust-brown undertones** — matching the oxidized, industrial aesthetic.

### Changes — `src/components/SiteNav.tsx`

1. Add a subtle **inner rust glow** to the nav bar container using a box-shadow or an overlay pseudo-element — `shadow-[inset_0_-4px_20px_rgba(140,60,20,0.15)]` — giving the bottom edge a warm ember-like glow that ties into the wavy rust line below.

2. Shift the diamond separators from `opacity-60` to `opacity-80` for more presence against the richer background.

3. Update link idle color from `text-stone-300` to `text-stone-200` for better contrast against the warmer, darker background.

### Files Modified
- `src/index.css` — updated `.bg-grunge` gradient
- `src/components/SiteNav.tsx` — inner glow shadow, link/separator contrast tweaks

