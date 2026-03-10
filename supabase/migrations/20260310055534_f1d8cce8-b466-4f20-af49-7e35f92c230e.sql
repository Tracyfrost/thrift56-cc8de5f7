
-- 1. Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 4. RLS on user_roles: only admins can read/manage
CREATE POLICY "Admins can read user_roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage user_roles"
  ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 5. Remove temporary anon write policies on admin-managed tables
DROP POLICY IF EXISTS "Anon can insert episodes" ON public.episodes;
DROP POLICY IF EXISTS "Anon can update episodes" ON public.episodes;
DROP POLICY IF EXISTS "Anon can delete episodes" ON public.episodes;

DROP POLICY IF EXISTS "Anon can insert art_pieces" ON public.art_pieces;
DROP POLICY IF EXISTS "Anon can update art_pieces" ON public.art_pieces;
DROP POLICY IF EXISTS "Anon can delete art_pieces" ON public.art_pieces;

DROP POLICY IF EXISTS "Anon can insert votes" ON public.votes;
DROP POLICY IF EXISTS "Anon can update votes" ON public.votes;
DROP POLICY IF EXISTS "Anon can delete votes" ON public.votes;

DROP POLICY IF EXISTS "Anon can insert content_calendar" ON public.content_calendar;
DROP POLICY IF EXISTS "Anon can update content_calendar" ON public.content_calendar;
DROP POLICY IF EXISTS "Anon can delete content_calendar" ON public.content_calendar;

DROP POLICY IF EXISTS "Anon can insert short_clips" ON public.short_clips;
DROP POLICY IF EXISTS "Anon can update short_clips" ON public.short_clips;
DROP POLICY IF EXISTS "Anon can delete short_clips" ON public.short_clips;

-- 6. Replace with admin-only write policies using has_role

-- Episodes: admin write
DROP POLICY IF EXISTS "Authenticated users can manage episodes" ON public.episodes;
CREATE POLICY "Admins can manage episodes"
  ON public.episodes FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Art pieces: admin write
DROP POLICY IF EXISTS "Authenticated users can manage art pieces" ON public.art_pieces;
CREATE POLICY "Admins can manage art_pieces"
  ON public.art_pieces FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Votes: admin write (keep anon update for voting)
DROP POLICY IF EXISTS "Authenticated users can manage votes" ON public.votes;
CREATE POLICY "Admins can manage votes"
  ON public.votes FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Content calendar: admin write
DROP POLICY IF EXISTS "Authenticated users can manage calendar" ON public.content_calendar;
CREATE POLICY "Admins can manage content_calendar"
  ON public.content_calendar FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Short clips: admin write
DROP POLICY IF EXISTS "Authenticated users can manage short clips" ON public.short_clips;
CREATE POLICY "Admins can manage short_clips"
  ON public.short_clips FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Submissions: admin manage
DROP POLICY IF EXISTS "Authenticated users can manage submissions" ON public.submissions;
CREATE POLICY "Admins can manage submissions"
  ON public.submissions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Community submissions: admin manage
DROP POLICY IF EXISTS "Authenticated users can manage submissions" ON public.community_submissions;
CREATE POLICY "Admins can manage community_submissions"
  ON public.community_submissions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Subscribers: admin read
DROP POLICY IF EXISTS "Authenticated users can view subscribers" ON public.subscribers;
CREATE POLICY "Admins can view subscribers"
  ON public.subscribers FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Community suggestions: admin read
DROP POLICY IF EXISTS "Authenticated users can view suggestions" ON public.community_suggestions;
CREATE POLICY "Admins can view suggestions"
  ON public.community_suggestions FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Drop entries: admin read
DROP POLICY IF EXISTS "Authenticated users can view entries" ON public.drop_entries;
CREATE POLICY "Admins can view entries"
  ON public.drop_entries FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Thrift finds: admin manage
DROP POLICY IF EXISTS "Authenticated users can manage thrift finds" ON public.thrift_finds;
CREATE POLICY "Admins can manage thrift_finds"
  ON public.thrift_finds FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
