
-- Fix 1: Prevent public exposure of email on submissions table
-- Create a view that excludes email for public consumption
CREATE VIEW public.approved_submissions_public AS
SELECT id, name, location, notes, image_url, created_at
FROM public.submissions
WHERE is_approved = true;

-- Drop the public SELECT policy that exposes email
DROP POLICY IF EXISTS "Approved submissions are public" ON public.submissions;

-- Grant anon/public access to the view (views bypass RLS, so the view itself controls what's visible)
GRANT SELECT ON public.approved_submissions_public TO anon;
GRANT SELECT ON public.approved_submissions_public TO authenticated;

-- Fix 2: Constrain drop_entries entry_type and prevent duplicate entries
ALTER TABLE public.drop_entries
  ADD CONSTRAINT chk_entry_type CHECK (entry_type IN ('raffle', 'giveaway', 'auction'));

ALTER TABLE public.drop_entries
  ADD CONSTRAINT uniq_entry_per_person UNIQUE (art_piece_id, email, entry_type);
