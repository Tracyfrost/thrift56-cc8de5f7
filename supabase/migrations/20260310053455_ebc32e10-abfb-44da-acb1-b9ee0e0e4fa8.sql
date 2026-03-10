
-- Storage RLS: allow anon to upload to storage buckets
CREATE POLICY "Anon upload art-images" ON storage.objects FOR INSERT TO anon WITH CHECK (bucket_id IN ('art-images', 'episode-thumbnails', 'submissions'));
CREATE POLICY "Anon update art-images" ON storage.objects FOR UPDATE TO anon USING (bucket_id IN ('art-images', 'episode-thumbnails', 'submissions')) WITH CHECK (bucket_id IN ('art-images', 'episode-thumbnails', 'submissions'));
