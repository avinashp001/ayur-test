/*
  # Fix RLS Policies for Clerk Authentication

  1. Security Updates
    - Drop existing restrictive policies
    - Create new policies that work with Clerk JWT tokens
    - Allow admin users to manage blogs
    - Allow public read access to published blogs

  2. Policy Details
    - Admin users (with role='admin' in public_metadata) can insert/update/delete
    - Public users can read published blogs
    - Uses Clerk JWT structure for authentication
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Public can read published blogs" ON blogs;
DROP POLICY IF EXISTS "Authenticated users can manage all blogs" ON blogs;

-- Create new policies that work with Clerk authentication
CREATE POLICY "Anyone can read published blogs"
  ON blogs
  FOR SELECT
  USING (published = true);

CREATE POLICY "Admin users can insert blogs"
  ON blogs
  FOR INSERT
  WITH CHECK (
    auth.jwt() ->> 'role' = 'admin' OR
    (auth.jwt() -> 'public_metadata' ->> 'role') = 'admin' OR
    auth.jwt() -> 'user_metadata' ->> 'role' = 'admin'
  );

CREATE POLICY "Admin users can update blogs"
  ON blogs
  FOR UPDATE
  USING (
    auth.jwt() ->> 'role' = 'admin' OR
    (auth.jwt() -> 'public_metadata' ->> 'role') = 'admin' OR
    auth.jwt() -> 'user_metadata' ->> 'role' = 'admin'
  )
  WITH CHECK (
    auth.jwt() ->> 'role' = 'admin' OR
    (auth.jwt() -> 'public_metadata' ->> 'role') = 'admin' OR
    auth.jwt() -> 'user_metadata' ->> 'role' = 'admin'
  );

CREATE POLICY "Admin users can delete blogs"
  ON blogs
  FOR DELETE
  USING (
    auth.jwt() ->> 'role' = 'admin' OR
    (auth.jwt() -> 'public_metadata' ->> 'role') = 'admin' OR
    auth.jwt() -> 'user_metadata' ->> 'role' = 'admin'
  );

-- Ensure RLS is enabled
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;