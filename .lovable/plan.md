

## Plan: Replace Hero Background Image

Replace the current hero image (`hero-tracie.jpg`) used in `HeroSection.tsx` with the uploaded photo of Tracie at the carnival/balloon wall.

### Steps

1. Copy `user-uploads://TR_HS_disco_fun.jpg` to `src/assets/hero-tracie-disco.jpg`
2. Update `src/components/HeroSection.tsx` to import and use the new image instead of `hero-tracie.jpg`

### Technical Details
- The import line changes from `import heroImage from "@/assets/hero-tracie.jpg"` to `import heroImage from "@/assets/hero-tracie-disco.jpg"`
- No other code changes needed since the variable name stays the same

