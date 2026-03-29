
-- Fix the security definer view warning by setting security_invoker
ALTER VIEW public.approved_submissions_public SET (security_invoker = on);
