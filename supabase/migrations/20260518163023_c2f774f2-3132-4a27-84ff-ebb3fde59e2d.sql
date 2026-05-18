-- Email queue helpers: service_role only
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint)        FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb)        FROM PUBLIC, anon, authenticated;
GRANT  EXECUTE ON FUNCTION public.delete_email(text, bigint)        TO service_role;
GRANT  EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) TO service_role;
GRANT  EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) TO service_role;
GRANT  EXECUTE ON FUNCTION public.enqueue_email(text, jsonb)        TO service_role;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- Vote fingerprint dedup table
CREATE TABLE IF NOT EXISTS public.vote_fingerprints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fingerprint text NOT NULL,
  target_kind text NOT NULL,
  target_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (target_kind, target_id, fingerprint)
);
ALTER TABLE public.vote_fingerprints ENABLE ROW LEVEL SECURITY;
-- No client policies: only SECURITY DEFINER functions touch this table.

-- Hardened vote_thrift_find: requires voter_fp, dedups per fingerprint
DROP FUNCTION IF EXISTS public.vote_thrift_find(uuid, text);
CREATE OR REPLACE FUNCTION public.vote_thrift_find(find_id uuid, choice text, voter_fp text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE inserted boolean;
BEGIN
  IF choice NOT IN ('transform', 'leave') THEN RETURN false; END IF;
  IF voter_fp IS NULL OR length(voter_fp) < 8 OR length(voter_fp) > 128 THEN RETURN false; END IF;

  INSERT INTO public.vote_fingerprints (fingerprint, target_kind, target_id)
  VALUES (voter_fp, 'thrift_find', find_id)
  ON CONFLICT DO NOTHING
  RETURNING true INTO inserted;
  IF NOT COALESCE(inserted, false) THEN RETURN false; END IF;

  IF choice = 'transform' THEN
    UPDATE public.thrift_finds SET votes_transform = COALESCE(votes_transform, 0) + 1
    WHERE id = find_id AND is_active = true;
  ELSE
    UPDATE public.thrift_finds SET votes_leave = COALESCE(votes_leave, 0) + 1
    WHERE id = find_id AND is_active = true;
  END IF;
  RETURN true;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.vote_thrift_find(uuid, text, text) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.vote_thrift_find(uuid, text, text) TO anon, authenticated;

-- Hardened increment_vote: requires voter_fp, dedups per fingerprint
DROP FUNCTION IF EXISTS public.increment_vote(uuid);
CREATE OR REPLACE FUNCTION public.increment_vote(vote_id uuid, voter_fp text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE inserted boolean;
BEGIN
  IF voter_fp IS NULL OR length(voter_fp) < 8 OR length(voter_fp) > 128 THEN RETURN false; END IF;
  INSERT INTO public.vote_fingerprints (fingerprint, target_kind, target_id)
  VALUES (voter_fp, 'vote', vote_id)
  ON CONFLICT DO NOTHING
  RETURNING true INTO inserted;
  IF NOT COALESCE(inserted, false) THEN RETURN false; END IF;

  UPDATE public.votes SET votes = votes + 1
  WHERE id = vote_id AND is_active = true;
  RETURN true;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.increment_vote(uuid, text) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.increment_vote(uuid, text) TO anon, authenticated;

-- Remove thrift_items from realtime publication (admin dashboard polls instead)
ALTER PUBLICATION supabase_realtime DROP TABLE public.thrift_items;