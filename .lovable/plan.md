

## Retro-Industrial Art Bar with Wavy Edges

### Concept

Same retro-industrial redesign as previously proposed, but replacing all straight border lines with **organic wavy edges** using inline SVG clip-paths — giving the nav a hand-cut, torn-paper feel that fits the thrift/art brand.

```text
╭~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~╮
│  [LOGO]      ◆ EPISODES ◆ SHOP ◆ LIVE ◆ COMMUNITY    [TAG]  │
╰~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~╯
  ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿  ← wavy rust stripe
```

### Key Changes from Previous Plan

1. **Wavy bottom edge** — Replace `border-b` with an absolutely-positioned SVG wave using a `path` with bezier curves, filled in rust color. This creates an irregular, hand-drawn separation line below the nav.

2. **Wavy mobile menu divider** — The mobile dropdown also gets a wavy top separator instead of a straight `border-t`.

3. **SVG approach** — A simple inline SVG (`viewBox="0 0 1200 12"`, `preserveAspectRatio="none"`) stretched full-width, with a hand-drawn-style bezier path. This is lightweight, scalable, and doesn't require images.

### Files Changed

- **`src/components/SiteNav.tsx`** — Full restyle: `bg-stone-950` dark bar, film-grain overlay, diamond `◆` separators between links, stamp active state, tag-shaped Subscribe CTA with clip-path, wavy SVG bottom edge in rust, redesigned mobile menu with diagonal stripes and wavy divider.

- **`src/index.css`** — Add `.nav-tag-clip` utility for the tag-shaped button clip-path. No other CSS changes needed since the wave is inline SVG.

### What Stays the Same

- All routes, links, logo import, search icon, mobile toggle logic
- Sticky positioning, z-50, container width
- Brand fonts (Oswald for links, Special Elite for diamond accents)

