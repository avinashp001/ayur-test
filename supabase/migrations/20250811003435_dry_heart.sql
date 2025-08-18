/*
  # Update RLS policies for authenticated admin users

  1. Security Updates
    - Update RLS policies to allow authenticated users to manage blogs
    - Ensure proper permissions for admin operations
    - Maintain public read access for published blogs

  2. Policy Changes
    - Allow authenticated users to insert, update, and delete blogs
    - Keep public read access for published content
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Public can read published blogs" ON blogs;
DROP POLICY IF EXISTS "Authenticated users can manage blogs" ON blogs;

-- Create new policies with proper permissions
CREATE POLICY "Public can read published blogs"
  ON blogs
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE POLICY "Authenticated users can manage all blogs"
  ON blogs
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;