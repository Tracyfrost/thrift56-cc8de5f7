

## Plan: Replace Rick Roll Video ID

Replace the hardcoded Rick Astley placeholder video ID (`dQw4w9WgXcQ`) in `EpisodeHero.tsx` with the real video ID `3iDnecn4E60` from your YouTube URL.

### File
- `src/components/episodes/EpisodeHero.tsx`

### Change
Line 19:
```diff
- src="https://www.youtube.com/embed/dQw4w9WgXcQ"
+ src="https://www.youtube.com/embed/3iDnecn4E60"
```

This updates the featured episode iframe to display your actual video content instead of the placeholder.

