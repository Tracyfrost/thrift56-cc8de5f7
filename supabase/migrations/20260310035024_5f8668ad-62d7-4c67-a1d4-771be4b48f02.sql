
-- Timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- EPISODES table
CREATE TABLE public.episodes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  youtube_id TEXT,
  thumbnail_url TEXT,
  description TEXT,
  thrift_store_location TEXT,
  purchase_price TEXT,
  transformation_summary TEXT,
  before_image_url TEXT,
  after_image_url TEXT,
  category TEXT NOT NULL DEFAULT 'transformation',
  episode_number INTEGER,
  views INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.episodes ENABLE ROW LEVEL SECURITY;

-- Public read for episodes
CREATE POLICY "Episodes are publicly readable"
  ON public.episodes FOR SELECT USING (true);

-- Anon insert/update/delete blocked; admin managed via service role or future admin auth
CREATE POLICY "Authenticated users can manage episodes"
  ON public.episodes FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE TRIGGER update_episodes_updated_at
  BEFORE UPDATE ON public.episodes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ART PIECES table
CREATE TABLE public.art_pieces (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  before_image_url TEXT,
  after_image_url TEXT,
  materials TEXT[],
  episode_id UUID REFERENCES public.episodes(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'raffle', 'giveaway', 'auction', 'archived')),
  price NUMERIC,
  drop_date TIMESTAMP WITH TIME ZONE,
  giveaway_end_date TIMESTAMP WITH TIME ZONE,
  auction_end_date TIMESTAMP WITH TIME ZONE,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.art_pieces ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Art pieces are publicly readable"
  ON public.art_pieces FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage art pieces"
  ON public.art_pieces FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE TRIGGER update_art_pieces_updated_at
  BEFORE UPDATE ON public.art_pieces
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- SHORT CLIPS table
CREATE TABLE public.short_clips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  youtube_id TEXT NOT NULL,
  caption TEXT,
  category TEXT NOT NULL DEFAULT 'transformation' CHECK (category IN ('transformation', 'thrift-hunt', 'reveal', 'studio')),
  episode_id UUID REFERENCES public.episodes(id) ON DELETE SET NULL,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.short_clips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Short clips are publicly readable"
  ON public.short_clips FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage short clips"
  ON public.short_clips FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- CONTENT CALENDAR table
CREATE TABLE public.content_calendar (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('episode', 'art-drop', 'giveaway', 'livestream', 'raffle')),
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  description TEXT,
  linked_episode_id UUID REFERENCES public.episodes(id) ON DELETE SET NULL,
  linked_art_piece_id UUID REFERENCES public.art_pieces(id) ON DELETE SET NULL,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.content_calendar ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Calendar events are publicly readable"
  ON public.content_calendar FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage calendar"
  ON public.content_calendar FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE TRIGGER update_content_calendar_updated_at
  BEFORE UPDATE ON public.content_calendar
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ENTRIES table (raffle/giveaway entries)
CREATE TABLE public.drop_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  art_piece_id UUID NOT NULL REFERENCES public.art_pieces(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  entry_type TEXT NOT NULL CHECK (entry_type IN ('raffle', 'giveaway')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(art_piece_id, email)
);

ALTER TABLE public.drop_entries ENABLE ROW LEVEL SECURITY;

-- Entries are write-only for anonymous users, readable by authenticated
CREATE POLICY "Anyone can submit entries"
  ON public.drop_entries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view entries"
  ON public.drop_entries FOR SELECT
  TO authenticated
  USING (true);

-- COMMUNITY SUGGESTIONS table
CREATE TABLE public.community_suggestions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  suggestion TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.community_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit suggestions"
  ON public.community_suggestions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view suggestions"
  ON public.community_suggestions FOR SELECT
  TO authenticated
  USING (true);

-- COMMUNITY FIND SUBMISSIONS table
CREATE TABLE public.community_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  location TEXT NOT NULL,
  note TEXT,
  image_url TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.community_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit finds"
  ON public.community_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Approved submissions are publicly readable"
  ON public.community_submissions FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Authenticated users can manage submissions"
  ON public.community_submissions FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- THRIFT FINDS (voting items) table
CREATE TABLE public.thrift_finds (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption TEXT NOT NULL,
  price TEXT,
  location TEXT,
  votes_transform INTEGER DEFAULT 0,
  votes_leave INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.thrift_finds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Thrift finds are publicly readable"
  ON public.thrift_finds FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage thrift finds"
  ON public.thrift_finds FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow anonymous vote increments
CREATE POLICY "Anyone can vote on thrift finds"
  ON public.thrift_finds FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Storage bucket for media uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

CREATE POLICY "Media is publicly accessible"
  ON storage.objects FOR SELECT USING (bucket_id = 'media');

CREATE POLICY "Authenticated users can upload media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'media');

CREATE POLICY "Authenticated users can update media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'media');

CREATE POLICY "Authenticated users can delete media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'media');
