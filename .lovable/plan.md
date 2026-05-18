# Fix: /admin loading + stalled episode save

## Root cause

Both symptoms trace back to the same bug in `src/hooks/useAuth.tsx`.

The `onAuthStateChange` callback `await`s a Supabase `rpc('has_role', …)` call directly inside the handler. Supabase's auth client explicitly warns against this — making Supabase calls inside the auth listener can deadlock the client. The symptoms match exactly:

- **/admin "loading…" forever** — initial `INITIAL_SESSION` event fires, `checkAdmin` await never resolves, `loading` stays `true`, so `ProtectedRoute` keeps rendering the loading screen.
- **Edit save stalls** — when the user clicks Save, Supabase may trigger a token refresh → fires `TOKEN_REFRESHED` → the listener `await`s an RPC → the in-flight `UPDATE episodes` request sits behind the deadlocked auth client and never resolves.

A secondary issue in `AdminDashboard.tsx`: the Art Pieces editor spreads the joined `episodes(...)` relation into the `update()` payload, which Postgres rejects (not the current report, but will bite next).

## Changes

### 1. `src/hooks/useAuth.tsx` — defer async work out of the auth callback
- Inside `onAuthStateChange`, set `session`/`user` synchronously, then schedule `checkAdmin` via `setTimeout(..., 0)` so it runs outside the listener.
- Wrap `checkAdmin` in try/catch so a transient RPC failure doesn't leave `loading` stuck.
- Set `loading=false` immediately after the synchronous state update, not after the admin check.

### 2. `src/pages/AdminDashboard.tsx` — strip join field before upserting art pieces
- In `ArtPiecesTab.save()`, drop the `episodes` key (the joined relation) from the payload before calling `upsert.mutateAsync`. Same hygiene for episodes is not needed but harmless.

## Verification

- Reload `/admin` while signed in — should render the dashboard within a second, not hang on "Loading…".
- Open an existing episode, change a field, click **Save** — toast "Episode saved!" appears, dialog closes, list refreshes.
- Repeat for an Art Piece linked to an episode — save succeeds (regression guard).
- Check browser console for auth errors.

No DB schema or RLS changes. Frontend-only fix.
