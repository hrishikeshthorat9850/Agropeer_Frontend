-- RLS Policies for Government Schemes Table
-- Run this after creating the government_schemes table

-- Enable Row Level Security
ALTER TABLE public.government_schemes ENABLE ROW LEVEL SECURITY;

-- Policy 1: Everyone can SELECT (read) government schemes
-- Government schemes are public information, so all users (including anonymous) can view them
CREATE POLICY "Anyone can view government schemes"
ON public.government_schemes
FOR SELECT
USING (true);

-- Policy 2: Only authenticated users with admin role can INSERT
-- Only admins should be able to create new government schemes
CREATE POLICY "Only admins can insert government schemes"
ON public.government_schemes
FOR INSERT
WITH CHECK (
  auth.role() = 'service_role' OR
  auth.jwt() ->> 'role' = 'admin' OR
  auth.jwt() ->> 'email' IN ('admin@agrogram.com', 'superadmin@agrogram.com')
);

-- Policy 3: Only authenticated users with admin role can UPDATE
-- Only admins should be able to update government schemes
CREATE POLICY "Only admins can update government schemes"
ON public.government_schemes
FOR UPDATE
USING (
  auth.role() = 'service_role' OR
  auth.jwt() ->> 'role' = 'admin' OR
  auth.jwt() ->> 'email' IN ('admin@agrogram.com', 'superadmin@agrogram.com')
)
WITH CHECK (
  auth.role() = 'service_role' OR
  auth.jwt() ->> 'role' = 'admin' OR
  auth.jwt() ->> 'email' IN ('admin@agrogram.com', 'superadmin@agrogram.com')
);

-- Policy 4: Only authenticated users with admin role can DELETE
-- Only admins should be able to delete government schemes
CREATE POLICY "Only admins can delete government schemes"
ON public.government_schemes
FOR DELETE
USING (
  auth.role() = 'service_role' OR
  auth.jwt() ->> 'role' = 'admin' OR
  auth.jwt() ->> 'email' IN ('admin@agrogram.com', 'superadmin@agrogram.com')
);

-- Note: Service role (SUPABASE_SERVICE_ROLE_KEY) bypasses RLS
-- So backend operations in API routes will work without issues

-- Additional Note:
-- Government schemes are public data, so SELECT is open to everyone
-- Only admins can create, update, or delete schemes
-- Adjust admin email checks based on your actual admin emails

