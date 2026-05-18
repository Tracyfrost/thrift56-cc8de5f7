CREATE POLICY "Admins can delete subscribers"
ON public.subscribers
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));