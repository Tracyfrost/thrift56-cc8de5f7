## Goal

Address the 5 remaining items from the security panel and complete a full repo sweep for leaked credentials.

## 1. Public bucket listing (`media`, `art-images`, `episode-thumbnails`)

These buckets are intentionally public for read, but the current SELECT policy is broad enough that anonymous clients can **list** every object in the bucket (enumeration risk).

Migration:
- Drop the existing broad `SELECT` policy on `storage.objects` for these three buckets.
- Replace with a policy that allows fetching individual objects by exact path but blocks directory listing. Pattern:
  - Keep public read on `storage.objects` for `bucket_id IN ('media','art-images','episode-thumbnails')` via the object endpoint, but revoke list permission on the bucket by ensuring no policy permits `SELECT` without a `name` predicate / using `auth.role() = 'service_role'` for list operations and limiting anon to `metadata IS NOT NULL` style fetches.
  - Concretely: keep SELECT policy as-is for object reads, and add an explicit policy on `storage.buckets` that blocks anon listing (Supabase lists via `storage.objects` SELECT — so the practical fix is to keep SELECT but Supabase recommends making the bucket private + signed URLs, OR accepting the listing risk).
- Recommended path: leave buckets public for direct URL reads but mark this finding as **accepted risk** in security memory (these contain only published marketing media/episode thumbnails/art images, no PII). Update security memory accordingly.

## 2. SECURITY DEFINER functions executable by anon/authenticated

Functions flagged: `vote_thrift_find`, `increment_vote`, `has_role`, `delete_email`, `move_to_dlq`, `read_email_batch`, `enqueue_email`, `update_updated_at_column`.

Migration:
- `REVOKE EXECUTE ... FROM PUBLIC, anon, authenticated` on the email queue helpers (`delete_email`, `move_to_dlq`, `read_email_batch`, `enqueue_email`) and `GRANT EXECUTE ... TO service_role` only. These are called from edge functions using the service role key — clients should never invoke them.
- `update_updated_at_column` is a trigger function — revoke EXECUTE from PUBLIC.
- `has_role` must remain callable by `authenticated` (used inside RLS as `auth.uid()`), so keep it but it's safe because it only reads the caller's own role check.
- `vote_thrift_find` and `increment_vote` are the "vote helpers" — see hardening below.

## 3. Harden role/vote helpers

- `vote_thrift_find(find_id, choice)` and `increment_vote(vote_id)` currently let any anon user spam votes unlimited times.
- Add basic abuse mitigation inside the functions:
  - Validate `choice` is one of `('transform','leave')` (already done) — keep.
  - Add a per-IP / per-session rate limit table `vote_rate_limits(fingerprint text, find_id uuid, created_at timestamptz default now())` with a unique constraint `(fingerprint, find_id)` so each fingerprint can only vote once per item. Pass the fingerprint (hashed `auth.uid()::text` for signed-in users, or a client-generated UUID stored in localStorage for anon) as a new parameter.
  - Wrap inserts in `ON CONFLICT DO NOTHING` and only increment the counter when the insert actually happened.
- For `has_role`: confirmed `STABLE SECURITY DEFINER` with `search_path = public` — already hardened. No change.
- Revoke direct EXECUTE on `vote_thrift_find` / `increment_vote` from PUBLIC and re-grant to `anon, authenticated` so the surface is explicit.

## 4. Realtime channel auth on `thrift_items`

Currently any signed-in user can subscribe to realtime changes (inventory/pricing).

Migration:
- Add RLS policies on `realtime.messages`:
  ```sql
  ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "Admins only realtime"
    ON realtime.messages FOR SELECT
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));
  ```
- Alternative: remove `thrift_items` from the realtime publication entirely since the public site doesn't need live inventory pushes — admin dashboard can poll. This is simpler and removes the attack surface.
- Recommendation: **remove from publication** (`ALTER PUBLICATION supabase_realtime DROP TABLE public.thrift_items;`) and have the admin dashboard refetch on focus.

## 5. Full codebase secret scan

Sweep already run with ripgrep across the repo for: `sk_live`, `sk_test`, service-role JWTs, `Bearer` tokens, Google API keys (`AIza...`), GitHub PATs (`ghp_`), Slack tokens, generic `api_key=`/`secret=` literals, and 3-part JWTs.

Result: **no hardcoded secrets found**. The only credential in the repo is `VITE_SUPABASE_PUBLISHABLE_KEY` in `.env`, which is the public anon key and safe to ship. All private keys (`SUPABASE_SERVICE_ROLE_KEY`, `SQUARE_ACCESS_TOKEN`, `LOVABLE_API_KEY`, `SHOPIFY_*`) are read from `Deno.env` inside edge functions only.

Action: document this in the security memory and add a `.gitignore`-style note in security memory listing approved env var names, so future scans can flag anything new.

## 6. Update security memory

Record:
- Public buckets (`media`, `art-images`, `episode-thumbnails`) — accepted risk, contain only published creative assets.
- Realtime on `thrift_items` — now removed from publication (or locked to admin), no longer accepted risk.
- Vote helpers — hardened with rate-limit table.
- Repo scanned for secrets on 2026-05-18, clean.

## Deliverables

1. One new migration `*_security_hardening_round3.sql` containing: revokes/grants on definer functions, vote rate-limit table + updated functions, realtime publication change.
2. Updated security memory via `security--update_memory`.
3. Mark the 5 findings via `security--manage_security_finding` (fix realtime + definer + vote helpers; ignore the two public-bucket-listing items with rationale).
4. Short confirmation to user — no UI changes.
