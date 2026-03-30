
-- 1. Drop overly permissive anon storage policies for admin-only buckets
DROP POLICY IF EXISTS "Anon upload art-images" ON storage.objects;
DROP POLICY IF EXISTS "Anon update art-images" ON storage.objects;

-- 2. Tighten authenticated storage policies to admin-only for art-images
DROP POLICY IF EXISTS "Authenticated users can upload art images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update art images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete art images" ON storage.objects;

CREATE POLICY "Admins can upload art images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'art-images'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

CREATE POLICY "Admins can update art images"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'art-images'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
)
WITH CHECK (
  bucket_id = 'art-images'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

CREATE POLICY "Admins can delete art images"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'art-images'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- 3. Tighten authenticated storage policies to admin-only for episode-thumbnails
DROP POLICY IF EXISTS "Authenticated users can upload episode thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update episode thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete episode thumbnails" ON storage.objects;

CREATE POLICY "Admins can upload episode thumbnails"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'episode-thumbnails'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

CREATE POLICY "Admins can update episode thumbnails"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'episode-thumbnails'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
)
WITH CHECK (
  bucket_id = 'episode-thumbnails'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

CREATE POLICY "Admins can delete episode thumbnails"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'episode-thumbnails'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- 4. Tighten media bucket to admin-only too
DROP POLICY IF EXISTS "Authenticated users can upload media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete media" ON storage.objects;

CREATE POLICY "Admins can upload media"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'media'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

CREATE POLICY "Admins can update media"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'media'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
)
WITH CHECK (
  bucket_id = 'media'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

CREATE POLICY "Admins can delete media"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'media'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- 5. Harden drop_entries: add unique constraint to prevent duplicate entries
ALTER TABLE public.drop_entries ADD CONSTRAINT drop_entries_email_art_piece_unique UNIQUE (email, art_piece_id);

-- 6. Replace the overly permissive drop_entries INSERT policy with one that validates art_piece_id
DROP POLICY IF EXISTS "Anyone can submit entries" ON public.drop_entries;

CREATE POLICY "Anyone can submit entries"
ON public.drop_entries
FOR INSERT TO anon, authenticated
WITH CHECK (
  EXISTS (SELECT 1 FROM public.art_pieces WHERE id = art_piece_id)
);
