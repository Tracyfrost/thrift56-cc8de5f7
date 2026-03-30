
-- Harden subscribers INSERT policy
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.subscribers;
CREATE POLICY "Anyone can subscribe"
ON public.subscribers
FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(email) > 0 AND char_length(name) > 0
);

-- Harden community_suggestions INSERT policy
DROP POLICY IF EXISTS "Anyone can submit suggestions" ON public.community_suggestions;
CREATE POLICY "Anyone can submit suggestions"
ON public.community_suggestions
FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(name) > 0 AND char_length(suggestion) > 0
);
