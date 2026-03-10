
-- Create votes table for "You Decide" feature
CREATE TABLE public.votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_name text NOT NULL,
  image_url text NOT NULL,
  votes integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Votes are publicly readable"
  ON public.votes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can increment votes"
  ON public.votes FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage votes"
  ON public.votes FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create subscribers table for email capture
CREATE TABLE public.subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(email)
);

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON public.subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view subscribers"
  ON public.subscribers FOR SELECT
  TO authenticated
  USING (true);

-- Create submissions table for "Submit a Find"
CREATE TABLE public.submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  image_url text,
  location text NOT NULL,
  notes text,
  is_approved boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit finds"
  ON public.submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Approved submissions are public"
  ON public.submissions FOR SELECT
  TO public
  USING (is_approved = true);

CREATE POLICY "Authenticated users can manage submissions"
  ON public.submissions FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('art-images', 'art-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('episode-thumbnails', 'episode-thumbnails', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('submissions', 'submissions', true);

-- Storage policies for art-images
CREATE POLICY "Art images are publicly accessible"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'art-images');

CREATE POLICY "Authenticated users can upload art images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'art-images');

CREATE POLICY "Authenticated users can update art images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'art-images');

CREATE POLICY "Authenticated users can delete art images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'art-images');

-- Storage policies for episode-thumbnails
CREATE POLICY "Episode thumbnails are publicly accessible"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'episode-thumbnails');

CREATE POLICY "Authenticated users can upload episode thumbnails"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'episode-thumbnails');

CREATE POLICY "Authenticated users can update episode thumbnails"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'episode-thumbnails');

CREATE POLICY "Authenticated users can delete episode thumbnails"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'episode-thumbnails');

-- Storage policies for submissions
CREATE POLICY "Submission images are publicly accessible"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'submissions');

CREATE POLICY "Anyone can upload submission images"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'submissions');
