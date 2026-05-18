DROP POLICY IF EXISTS "Submission images are publicly accessible" ON storage.objects;

CREATE POLICY "Admins can read submission images"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'submissions' AND has_role(auth.uid(), 'admin'::app_role));