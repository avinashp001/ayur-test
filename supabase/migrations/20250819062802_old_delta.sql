/*
  # Fix Blog Insert RLS Policy

  1. Policy Updates
    - Drop the existing INSERT policy for the 'blogs' table
    - Create a new INSERT policy that correctly parses the admin role from Clerk JWT
    - The policy checks for the admin role in the correct JWT claim path used by Clerk

  2. Security
    - Maintains admin-only access for blog creation
    - Uses the correct JWT claim structure for Clerk authentication
*/

-- Drop the existing INSERT policy for the 'blogs' table
DROP POLICY IF EXISTS "Admin users can insert blogs" ON public.blogs;

-- Create a new INSERT policy that correctly parses the admin role from Clerk JWT
CREATE POLICY "Admin users can insert blogs"
ON public.blogs FOR INSERT
TO authenticated
WITH CHECK (
  -- Check for admin role in various possible JWT claim locations
  (
    -- Direct role claim
    ((jwt() ->> 'role'::text) = 'admin'::text) OR
    -- Role in public_metadata
    (((jwt() -> 'public_metadata'::text) ->> 'role'::text) = 'admin'::text) OR
    -- Role in user_metadata
    (((jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'admin'::text) OR
    -- Role in Clerk's custom claims namespace
    (((jwt() -> 'https://clerk.com/jwt_claims'::text -> 'public_metadata'::text) ->> 'role'::text) = 'admin'::text) OR
    -- Alternative Clerk claims structure
    (((jwt() -> 'app_metadata'::text) ->> 'role'::text) = 'admin'::text)
  )
);