

## Plan: Retro Cinema Marquee "Coming Soon" Placeholder

### Approach
Replace the iframe inside `LatestTransformationBrutalist.tsx` (the "no embed" branch) with a new `ComingSoonMarquee` component. Keep the section heading, episode title slot, and "Watch Full Episode" button untouched. Use the already-uploaded `src/assets/tracie-coming-soon.jpg`.

### File 1 (NEW): `src/components/v2/ComingSoonMarquee.tsx`

A self-contained 16:9 marquee card. Uses inline `<style>` tag for the keyframes (flicker, dash-pulse, bulb-flash) since they're component-specific and not reused elsewhere — keeps tailwind config clean.

Structure:
```text
<div class="relative w-full aspect-video"> [outer 3px solid #c8501a, radius 4px]
  <img src={tracieImg} class="absolute inset-0 w-full h-full object-cover" />
  <div class="absolute inset-0" style={bg: rgba(20,10,0,0.72)} />
  <div class="absolute inset-2 border-2 border-dashed" [animated color] />
  <div class="absolute" [4 L-shaped corner accents at inset 18px]
  <div class="absolute top-3 left-0 right-0 flex justify-around"> [12 bulbs]
  <div class="absolute bottom-3 left-0 right-0 flex justify-around"> [12 bulbs]
  <div class="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6">
    <p>★ Thrift 56 Presents ★</p>          [11px, flicker 2.5s]
    <hr class="w-32 border-t border-[#c8501a]" />
    <h2>COMING SOON</h2>                    [28px black, flicker 3s]
    <p>MY THRIFTY THRIFTERS</p>             [13px, flicker 4s]
    <hr class="w-32 border-t border-[#c8501a]" />
    <p>EPISODE 001 — IN PRODUCTION</p>      [11px, 55% opacity, no flicker]
  </div>
</div>
```

Inline `<style>`:
- `@keyframes flicker` per spec (opacity 1 ↔ 0.4 at jitter steps).
- `@keyframes dashPulse` — border-color `#c8501a` ↔ `#e8a050`, 1.5s infinite.
- `@keyframes bulbFlash` — opacity 1 ↔ 0.25, 0.8s steps. Odd children get `animation-delay: 0.4s`, every 3rd child gets `animation-delay: 0.2s` via `:nth-child` selectors scoped to a `.t56-bulbs` class.
- Three flicker variants: `.flicker-a {animation: flicker 2.5s infinite}`, `.flicker-b {3s}`, `.flicker-c {4s}`.

Bulbs: 12 `<span class="t56-bulb">` elements per row, 8px circles, `background:#f5e050`, `box-shadow:0 0 8px #f5e050`.

Corner accents: 4 absolutely-positioned `<div>`s at `inset:18px` corners — each is a 12×12 box with two adjacent borders (e.g. top-left = `border-t-2 border-l-2 border-[#c8501a]`).

Image import: `import tracieImg from "@/assets/tracie-coming-soon.jpg"` (Vite-friendly, hashed asset).

### File 2 (EDIT): `src/components/v2/LatestTransformationBrutalist.tsx`

In the existing branch where `embedSrc` is falsy, replace the current "EPISODE COMING SOON" placeholder `<div>` with `<ComingSoonMarquee />`. Keep:
- The outer `aspect-video border-4 border-stone-950 ...` wrapper? — No: the marquee provides its own border. So when `embedSrc` is falsy, render `<ComingSoonMarquee />` directly inside the `max-w-4xl` column instead of the bordered wrapper. When `embedSrc` IS present, keep the existing iframe wrapper unchanged.
- `latestDrop?.title` paragraph: only renders when `embedSrc` exists (already conditional) — leave as-is.
- "Watch Full Episode" button: untouched.
- Section heading "LATEST TRANSFORMATION": untouched.

### Out of scope
No changes to hero, slider, available-now, email capture, nav, or any other section. No tailwind config changes.

### Files touched (2)
- `src/components/v2/ComingSoonMarquee.tsx` (new)
- `src/components/v2/LatestTransformationBrutalist.tsx` (swap placeholder for new component)

