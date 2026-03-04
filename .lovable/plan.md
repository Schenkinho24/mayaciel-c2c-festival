

## Plan: Set up `tequila_orders` table in new Supabase project

The new database is empty. The `orderService.ts` inserts into a `tequila_orders` table with columns: `name`, `email`, `street`, `zipcode`, `city`, `country`, `products` (JSON). We need to create this table.

### Steps

1. **Create `tequila_orders` table** via migration:
   ```sql
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
   
   -- Allow anonymous inserts (no auth required for order form)
   CREATE POLICY "Allow anonymous inserts"
     ON public.tequila_orders FOR INSERT
     TO anon
     WITH CHECK (true);
   ```

2. **Regenerate Supabase types** so TypeScript recognizes `tequila_orders` and the build errors resolve.

No code changes needed in `orderService.ts` — the table schema matches what's already being inserted.

### Security Note
- RLS is enabled. Only INSERT is allowed for anonymous users — no one can read/update/delete orders via the client.
- Since this table contains PII (name, email, address), SELECT access is intentionally not granted.

