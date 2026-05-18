## Rename
Tab: **Subscribers** → **Email List (Site Signups)** with a small subtitle: *"Names + emails captured from thrift56.com forms. Not YouTube subscribers."* That sentence kills the YT confusion at a glance.

## New functionality on the tab

### 1. Stat cards (top of tab)
Four brutalist cards:
- **Total Signups** — all-time
- **This Week** — signups in last 7 days
- **This Month** — signups in last 30 days
- **Growth** — % change vs. prior 30-day window (▲ rust / ▼ muted)

### 2. Search + filters bar
- Search box (filters by name or email substring, instant)
- Date range chips: *All / 7d / 30d / 90d / This Year*
- Sort dropdown: *Newest, Oldest, Name A–Z*

### 3. Bulk selection + actions
- Checkbox per row + "select all on page" master checkbox
- Selected count + bar with actions:
  - **Copy emails** (clipboard, comma-separated, ready to paste into Mailchimp/Klaviyo/etc.)
  - **Export selected to CSV**
  - **Delete selected** (admin-only, with confirm)

### 4. Full CSV export
"Export All to CSV" button — downloads `thrift56-email-list-YYYY-MM-DD.csv` with columns: Name, Email, Signed Up At, Source (if/when added).

### 5. Quick signup chart
Small inline 30-day sparkline (signups per day) above the list so Tracie can see momentum without leaving the tab. Built with a tiny SVG — no chart library.

### 6. Duplicate detection badge
If the same email appears more than once, show a rust `DUPLICATE` chip on the older row and dim it. Helps clean the list before exporting.

### 7. Per-row actions
- Copy email (one click)
- Open `mailto:` (drafts a personal note from her default mail client)
- Delete row (admin-only, confirm)

## Out of scope (mention but don't build now)
- Tagging signups by source page (Footer / Drop Entry / Popup) — requires adding a `source` column to the `subscribers` table. I can do that as a follow-up if you want — it would make the existing **Source** filter idea actually useful.
- Sending broadcast emails from inside the admin — better handled by piping the CSV into Mailchimp/Klaviyo/Beehiiv. Lovable Cloud can do it, but you'd burn through email sending limits fast.

## Technical notes
- All stats computed client-side from the already-fetched `subscribers` query (no extra round-trips).
- Delete uses Supabase delete with admin RLS — will require adding a DELETE policy on `subscribers` (currently only INSERT + admin SELECT). I'll include that migration.
- CSV export is in-browser (Blob + download anchor); no library needed.
- Sparkline is a pure SVG component, ~30 lines.
