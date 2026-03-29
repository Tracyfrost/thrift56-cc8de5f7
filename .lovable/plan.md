

# Fix Database Security Vulnerabilities

## Overview
Address three categories of security issues: unrestricted anonymous UPDATE policies, overly permissive INSERT policies, and leaked password protection.

## 1. Votes Table — Restrict Anonymous UPDATE

**Problem:** The "Anyone can increment votes" policy lets anonymous users modify ANY column (item_name, image_url, is_active), not just the `votes` counter.

**Fix:** Drop the existing policy and replace it with one that only allows incrementing the `votes` column. Use a `SECURITY DEFINER` function that accepts a vote ID and increments by 1, then restrict the anon UPDATE policy to only allow changes to the `votes` column via a WITH CHECK that ensures no other columns are modified.

Simpler approach — replace the policy with a database function:
- Drop the "Anyone can increment votes" policy
- Create a `SECURITY DEFINER` function `increment_vote(vote_id uuid)` that performs the update internally
- No direct UPDATE access needed for anon users at all
- Update frontend `useCastVote` to call the RPC function instead of `.update()`

## 2. Thrift Finds Table — Restrict Anonymous UPDATE

**Problem:** Same issue — "Anyone can vote on thrift finds" lets anon users modify any column.

**Fix:** Same pattern — drop the policy, create a `SECURITY DEFINER` function `vote_thrift_find(find_id uuid, choice text)` that only increments `votes_transform` or `votes_leave`.
- Update `DiscoverHunt.tsx` to call the RPC function instead of `.update()`

## 3. INSERT Policies — Scope Down

The following tables have `WITH CHECK (true)` INSERT policies for anon. These are acceptable for public-facing forms but should be tightened to only allow inserting specific columns (no admin-only fields):

- **subscribers** — Keep as-is (only has name/email, no sensitive columns)
- **community_suggestions** — Keep as-is (only has name/suggestion)
- **drop_entries** — Keep as-is (only has form fields)
- **submissions** — Tighten: ensure `is_approved` cannot be set to `true` by anon. Add `WITH CHECK (is_approved = false)`
- **community_submissions** — Same fix: `WITH CHECK (is_approved = false)`

## 4. Leaked Password Protection

This does NOT require a database migration. To enable it:
- Go to **Cloud → Users → Auth Settings** (gear icon) → **Email settings** → activate the **Password HIBP Check** switch

## Files Changed

**Migration (single SQL migration):**
- Drop "Anyone can increment votes" on `votes`
- Drop "Anyone can vote on thrift finds" on `thrift_finds`
- Create `increment_vote(vote_id uuid)` SECURITY DEFINER function
- Create `vote_thrift_find(find_id uuid, choice text)` SECURITY DEFINER function
- Drop and recreate "Anyone can submit finds" on `submissions` with `WITH CHECK (is_approved = false)`
- Drop and recreate "Anyone can submit finds" on `community_submissions` with `WITH CHECK (is_approved = false)`

**Code changes:**
- `src/hooks/useSupabaseData.ts` — Update `useCastVote` to use `supabase.rpc('increment_vote', { vote_id: id })`
- `src/components/DiscoverHunt.tsx` — Update `vote()` to use `supabase.rpc('vote_thrift_find', { find_id: id, choice })`

