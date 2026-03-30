

## Plan: Full-Bleed Background Image on V2 Hero

Take the V1 approach — disco balloon image as a full-bleed background with a gradient fade — and apply it to the V2 brutalist hero, keeping all V2 content (text, buttons, copy, styling).

### Changes — `src/components/v2/HeroBrutalist.tsx`

**Layout shift:** Replace the current 2-column grid (text left, image right) with a single full-width layout where the image sits behind everything as an absolute-positioned background.

1. Add the disco image as `absolute inset-0` background with `object-cover` and the existing film filters (`contrast-125 saturate-50 sepia-[.25]`)
2. Layer a gradient overlay on top: fade from `#F9F6F0` (bone white) on the left to transparent on the right, similar to V1's `from-background/98 via-background/85 to-background/30`
3. Place all existing V2 text content (THRIFT 56 label, headline, taglines, buttons, micro-copy) in a `relative z-10` container constrained to `max-w-2xl`
4. Remove the standalone image column entirely
5. Keep `min-h-[85vh]` and add `flex items-center` for vertical centering
6. Add a bottom fade gradient like V1 for smooth section transition

No other files change — just `HeroBrutalist.tsx`.

