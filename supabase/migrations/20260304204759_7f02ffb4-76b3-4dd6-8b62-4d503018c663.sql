CREATE TABLE public.tequila_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  street text NOT NULL,
  zipcode text NOT NULL,
  city text NOT NULL,
  country text NOT NULL,
  products jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.tequila_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts"
  ON public.tequila_orders FOR INSERT
  TO anon
  WITH CHECK (true);