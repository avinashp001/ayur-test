```sql
-- Drop the existing INSERT policy for the 'blogs' table
DROP POLICY IF EXISTS "Allow authenticated users to insert blogs" ON public.blogs;

-- Create a new INSERT policy that allows only admin users to insert blogs
CREATE POLICY "Admin users can insert blogs"
ON public.blogs FOR INSERT
TO authenticated
WITH CHECK (
  ((jwt() ->> 'role'::text) = 'admin'::text) OR
  (((jwt() -> 'public_metadata'::text) ->> 'role'::text) = 'admin'::text) OR
  (((jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'admin'::text)
);
```