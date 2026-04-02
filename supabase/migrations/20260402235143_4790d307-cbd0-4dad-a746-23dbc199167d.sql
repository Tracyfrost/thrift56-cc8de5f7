
-- thrift_items table
CREATE TABLE public.thrift_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  square_catalog_id text UNIQUE,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  category text NOT NULL DEFAULT 'resurrected' CHECK (category IN ('resurrected', 'curated', 'vault')),
  story text,
  youtube_episode_url text,
  before_image_url text,
  after_image_url text,
  episode_number integer,
  is_sold boolean NOT NULL DEFAULT false,
  tags text[],
  price numeric,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- updated_at trigger
CREATE TRIGGER update_thrift_items_updated_at
  BEFORE UPDATE ON public.thrift_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- episode_drops table
CREATE TABLE public.episode_drops (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  youtube_url text,
  drop_date timestamptz,
  status text NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'completed')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- RLS on thrift_items
ALTER TABLE public.thrift_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Thrift items are publicly readable"
  ON public.thrift_items FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage thrift_items"
  ON public.thrift_items FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS on episode_drops
ALTER TABLE public.episode_drops ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Episode drops are publicly readable"
  ON public.episode_drops FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage episode_drops"
  ON public.episode_drops FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Enable realtime for thrift_items
ALTER PUBLICATION supabase_realtime ADD TABLE public.thrift_items;
