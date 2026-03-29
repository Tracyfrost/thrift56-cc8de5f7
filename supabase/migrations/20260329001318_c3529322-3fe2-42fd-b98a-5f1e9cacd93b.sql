-- Fix: content_calendar exposes unpublished drafts publicly
DROP POLICY IF EXISTS "Calendar events are publicly readable" ON public.content_calendar;
CREATE POLICY "Published calendar events are public"
ON public.content_calendar
FOR SELECT
TO public
USING (is_published = true);