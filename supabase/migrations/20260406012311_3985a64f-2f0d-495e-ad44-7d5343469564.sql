
-- 1. Recreate approved_submissions_public view with SECURITY INVOKER (excludes email)
DROP VIEW IF EXISTS public.approved_submissions_public;
CREATE VIEW public.approved_submissions_public
  WITH (security_invoker = true) AS
  SELECT id, name, location, notes, image_url, created_at
  FROM public.submissions
  WHERE is_approved = true;

-- 2. Remove the public SELECT policy from community_submissions that exposes email
DROP POLICY IF EXISTS "Approved submissions are publicly readable" ON public.community_submissions;

-- 3. Add email format CHECK constraints
ALTER TABLE public.subscribers
  ADD CONSTRAINT chk_subscribers_email_format
  CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND char_length(email) <= 320);

ALTER TABLE public.community_submissions
  ADD CONSTRAINT chk_community_submissions_email_format
  CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND char_length(email) <= 320);

ALTER TABLE public.submissions
  ADD CONSTRAINT chk_submissions_email_format
  CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND char_length(email) <= 320);

ALTER TABLE public.drop_entries
  ADD CONSTRAINT chk_drop_entries_email_format
  CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND char_length(email) <= 320);

-- 4. Tighten submissions storage upload policy to allow only image files
DROP POLICY IF EXISTS "Anyone can upload submission images" ON storage.objects;
CREATE POLICY "Anyone can upload submission images"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    bucket_id = 'submissions'
    AND (storage.extension(name)) IN ('jpg', 'jpeg', 'png', 'webp')
  );

-- 5. Tighten drop_entries INSERT policy to require art piece is in active drop/giveaway status
DROP POLICY IF EXISTS "Anyone can submit entries" ON public.drop_entries;
CREATE POLICY "Anyone can submit entries"
  ON public.drop_entries FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.art_pieces
      WHERE art_pieces.id = drop_entries.art_piece_id
        AND art_pieces.status IN ('drop', 'giveaway', 'auction')
    )
  );
