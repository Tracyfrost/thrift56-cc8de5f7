

## Plan: Adjust Background Image Position in ComingSoonMarquee

### Change
Update the background image position in `src/components/v2/ComingSoonMarquee.tsx` from `object-center` to `object-[center_20%]` so the subject's face is more visible.

### File
- `src/components/v2/ComingSoonMarquee.tsx`

Line 50 change:
```diff
- className="absolute inset-0 w-full h-full object-cover"
+ className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
```

This shifts the image vertically to 20% from the top (moving the crop point down) while keeping horizontal centering, revealing more of the subject's face in the frame.

