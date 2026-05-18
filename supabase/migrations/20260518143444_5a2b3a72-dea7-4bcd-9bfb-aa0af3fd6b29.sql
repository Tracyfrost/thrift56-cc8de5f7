
-- 1) Make submissions bucket private
UPDATE storage.buckets SET public = false WHERE id = 'submissions';

-- 2) Tighten upload policy on submissions: image mime/extension AND require non-empty path
DROP POLICY IF EXISTS "Anyone can upload submission images" ON storage.objects;
CREATE POLICY "Anyone can upload submission images"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (
  bucket_id = 'submissions'
  AND name ~* '\.(jpg|jpeg|png|webp|gif|heic|heif)$'
  AND octet_length(name) BETWEEN 8 AND 256
);

-- 3) Remove any broad anon SELECT policy that allowed listing submissions
DROP POLICY IF EXISTS "Public read submissions" ON storage.objects;
DROP POLICY IF EXISTS "Anon read submissions" ON storage.objects;

-- 4) Add search_path to email-queue helper functions (linter: function_search_path_mutable)
CREATE OR REPLACE FUNCTION public.read_email_batch(queue_name text, batch_size integer, vt integer)
RETURNS TABLE(msg_id bigint, read_ct integer, message jsonb)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pgmq
AS $$
BEGIN
  RETURN QUERY SELECT r.msg_id, r.read_ct, r.message FROM pgmq.read(queue_name, vt, batch_size) r;
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN;
END;
$$;

CREATE OR REPLACE FUNCTION public.delete_email(queue_name text, message_id bigint)
RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pgmq
AS $$
BEGIN
  RETURN pgmq.delete(queue_name, message_id);
EXCEPTION WHEN undefined_table THEN
  RETURN FALSE;
END;
$$;

CREATE OR REPLACE FUNCTION public.move_to_dlq(source_queue text, dlq_name text, message_id bigint, payload jsonb)
RETURNS bigint
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pgmq
AS $$
DECLARE new_id BIGINT;
BEGIN
  SELECT pgmq.send(dlq_name, payload) INTO new_id;
  PERFORM pgmq.delete(source_queue, message_id);
  RETURN new_id;
EXCEPTION WHEN undefined_table THEN
  BEGIN PERFORM pgmq.create(dlq_name); EXCEPTION WHEN OTHERS THEN NULL; END;
  SELECT pgmq.send(dlq_name, payload) INTO new_id;
  BEGIN PERFORM pgmq.delete(source_queue, message_id); EXCEPTION WHEN undefined_table THEN NULL; END;
  RETURN new_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.enqueue_email(queue_name text, payload jsonb)
RETURNS bigint
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pgmq
AS $$
BEGIN
  RETURN pgmq.send(queue_name, payload);
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN pgmq.send(queue_name, payload);
END;
$$;

-- 5) Revoke EXECUTE on email-queue SECURITY DEFINER functions from anon/authenticated
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, anon, authenticated;
