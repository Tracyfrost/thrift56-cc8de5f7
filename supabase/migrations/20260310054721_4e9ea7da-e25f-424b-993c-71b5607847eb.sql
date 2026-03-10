
-- Allow anon to insert/update/delete episodes (temporary until auth is added)
CREATE POLICY "Anon can insert episodes" ON public.episodes FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anon can update episodes" ON public.episodes FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon can delete episodes" ON public.episodes FOR DELETE TO anon USING (true);

-- Allow anon to insert/update/delete art_pieces
CREATE POLICY "Anon can insert art_pieces" ON public.art_pieces FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anon can update art_pieces" ON public.art_pieces FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon can delete art_pieces" ON public.art_pieces FOR DELETE TO anon USING (true);

-- Allow anon to insert/update/delete votes
CREATE POLICY "Anon can insert votes" ON public.votes FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anon can update votes" ON public.votes FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon can delete votes" ON public.votes FOR DELETE TO anon USING (true);

-- Allow anon to insert/update/delete content_calendar
CREATE POLICY "Anon can insert content_calendar" ON public.content_calendar FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anon can update content_calendar" ON public.content_calendar FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon can delete content_calendar" ON public.content_calendar FOR DELETE TO anon USING (true);

-- Allow anon to insert/update/delete short_clips
CREATE POLICY "Anon can insert short_clips" ON public.short_clips FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anon can update short_clips" ON public.short_clips FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon can delete short_clips" ON public.short_clips FOR DELETE TO anon USING (true);
