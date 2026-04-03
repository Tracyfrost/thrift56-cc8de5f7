ALTER TABLE public.thrift_items ADD COLUMN IF NOT EXISTS square_variation_id text;
ALTER TABLE public.thrift_items ADD COLUMN IF NOT EXISTS square_inventory_count integer NOT NULL DEFAULT 1;