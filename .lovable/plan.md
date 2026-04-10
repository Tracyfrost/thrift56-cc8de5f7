

## Homepage Hero Polish & Navigation Update

### 1. Hero Section Overhaul (`src/components/v2/HeroBrutalist.tsx`)
- Replace the current headline with **"FROM FORGOTTEN TO FEATURED"** as the dominant H1 — oversized, brutalist `font-black tracking-tighter`, larger than current (bump to `text-5xl md:text-7xl lg:text-[5.5rem]`)
- Add a secondary serif italic tagline: *"This was $3. It deserved better."* (keep existing)
- Replace the two CTAs with the requested ones:
  - **Primary:** "Shop the Resurrection" — links to `/shop`, solid black button with rust hover
  - **Secondary:** "Watch Latest Episode" — links to `/episodes`, outlined button
- Add a subtle CSS animation to the background image (slow ken-burns scale/pan loop via `@keyframes`) to simulate a video loop feel without requiring actual video assets
- Add film grain overlay (already partially exists) for texture

### 2. Inline Email Signup in Hero (`src/components/v2/HeroBrutalist.tsx`)
- Below the CTAs, add a compact inline email capture row with:
  - Headline micro-text: "Next Drop & Raffle Alerts"
  - Email input + "Get Alerts" button (reuse `useSubscribe` hook)
  - Styled to match the brutalist bone-white/dark palette, `rounded-none`

### 3. Navigation Update (`src/components/SiteNav.tsx`)
- Update `navLinks` array to match the requested structure:
  - Home (`/`) | Episodes (`/episodes`) | Shop (`/shop`) | About (`/about`) | Community/Drops (`/drops`) | Contact (`/contact`)
- Remove "Live" and rename "Drops" to "Community/Drops" or keep as combined label
- Keep existing styling, cart, search, and subscribe tag intact

### 4. No routing changes needed
- All target routes (`/`, `/episodes`, `/shop`, `/about`, `/drops`, `/contact`) already exist in `App.tsx`

### Files Modified
- `src/components/v2/HeroBrutalist.tsx` — new headline, CTAs, ken-burns animation, inline email signup
- `src/components/SiteNav.tsx` — updated nav link order and labels
- `tailwind.config.ts` — add `ken-burns` keyframe animation if not present

