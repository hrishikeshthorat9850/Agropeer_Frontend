-- RLS Policies for Milk Companies Table
-- Run this after creating the milk_companies table

-- Enable Row Level Security
ALTER TABLE public.milk_companies ENABLE ROW LEVEL SECURITY;

-- Policy 1: Everyone can SELECT (read) milk companies
-- Milk companies information is public, so all users (including anonymous) can view them
CREATE POLICY "Anyone can view milk companies"
ON public.milk_companies
FOR SELECT
USING (true);

-- Policy 2: Only authenticated users with admin role can INSERT
-- Only admins should be able to create new milk companies
CREATE POLICY "Only admins can insert milk companies"
ON public.milk_companies
FOR INSERT
WITH CHECK (
  auth.role() = 'service_role' OR
  auth.jwt() ->> 'role' = 'admin' OR
  auth.jwt() ->> 'email' IN ('admin@agrogram.com', 'superadmin@agrogram.com')
);

-- Policy 3: Only authenticated users with admin role can UPDATE
-- Only admins should be able to update milk companies
CREATE POLICY "Only admins can update milk companies"
ON public.milk_companies
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
-- Only admins should be able to delete milk companies
CREATE POLICY "Only admins can delete milk companies"
ON public.milk_companies
FOR DELETE
USING (
  auth.role() = 'service_role' OR
  auth.jwt() ->> 'role' = 'admin' OR
  auth.jwt() ->> 'email' IN ('admin@agrogram.com', 'superadmin@agrogram.com')
);

-- Note: Service role (SUPABASE_SERVICE_ROLE_KEY) bypasses RLS
-- So backend operations in API routes will work without issues

