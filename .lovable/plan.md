

## Plan: Add Global Status Filter Bar to Drops Page

Restore the status filter bar from the old design, positioned between the Hero and the tiered sections. It filters all sections simultaneously by status while keeping the tiered layout intact.

### Implementation

**Create `src/components/drops/DropsStatusFilter.tsx`**
- Horizontal row of bordered pill buttons matching the screenshot style: ALL DROPS, AVAILABLE, SOLD, GIVEAWAY, RAFFLE
- Active state: `bg-orange-800 text-stone-50 border-orange-800`
- Inactive state: `border-stone-950 text-stone-950` with hover fill
- Centered layout, matching the brand's brutalist `rounded-none uppercase tracking-widest font-black` tokens

**Edit `src/pages/ArtDrops.tsx`**
- Add a `statusFilter` state (`"all" | "available" | "archived" | "giveaway" | "raffle"`)
- Place `<DropsStatusFilter>` between `<DropsHero>` and `<DropsCurrentRelease>`
- Pass `statusFilter` as a prop to `DropsCurrentRelease`, `DropsResurrected`, `DropsCurated`, `DropsVault`, and `DropsArchive`

**Edit each section component**
- Accept an optional `statusFilter` prop
- When set (and not `"all"`), filter the displayed pieces by matching `piece.status` to the selected filter
- Sections with zero matching pieces after filtering are hidden

This keeps the tiered visual hierarchy while letting users quickly narrow by status across all sections — best of both approaches.

