-- 1. Drop unsafe UPDATE policies
DROP POLICY IF EXISTS "Anyone can increment votes" ON public.votes;
DROP POLICY IF EXISTS "Anyone can vote on thrift finds" ON public.thrift_finds;

-- 2. Create SECURITY DEFINER function for votes
CREATE OR REPLACE FUNCTION public.increment_vote(vote_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.votes
  SET votes = votes + 1
  WHERE id = vote_id AND is_active = true;
END;
$$;

-- 3. Create SECURITY DEFINER function for thrift finds
CREATE OR REPLACE FUNCTION public.vote_thrift_find(find_id uuid, choice text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF choice = 'transform' THEN
    UPDATE public.thrift_finds
    SET votes_transform = COALESCE(votes_transform, 0) + 1
    WHERE id = find_id AND is_active = true;
  ELSIF choice = 'leave' THEN
    UPDATE public.thrift_finds
    SET votes_leave = COALESCE(votes_leave, 0) + 1
    WHERE id = find_id AND is_active = true;
  END IF;
END;
$$;

-- 4. Tighten INSERT on submissions
DROP POLICY IF EXISTS "Anyone can submit finds" ON public.submissions;
CREATE POLICY "Anyone can submit finds"
ON public.submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (is_approved = false);

-- 5. Tighten INSERT on community_submissions
DROP POLICY IF EXISTS "Anyone can submit finds" ON public.community_submissions;
CREATE POLICY "Anyone can submit finds"
ON public.community_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (is_approved = false);