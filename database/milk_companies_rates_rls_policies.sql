-- RLS Policies for Milk Company Rates Table
-- Run this after creating the milk_company_rates table

-- Enable Row Level Security
ALTER TABLE public.milk_company_rates ENABLE ROW LEVEL SECURITY;

-- Policy 1: Everyone can SELECT (read) milk company rates
-- Milk rates are public information, so all users (including anonymous) can view them
CREATE POLICY "Anyone can view milk company rates"
ON public.milk_company_rates
FOR SELECT
USING (true);

-- Policy 2: Only authenticated users with admin role can INSERT
-- Only admins should be able to create new milk rate records
CREATE POLICY "Only admins can insert milk company rates"
ON public.milk_company_rates
FOR INSERT
WITH CHECK (
  auth.role() = 'service_role' OR
  auth.jwt() ->> 'role' = 'admin' OR
  auth.jwt() ->> 'email' IN ('admin@agrogram.com', 'superadmin@agrogram.com')
);

-- Policy 3: Only authenticated users with admin role can UPDATE
-- Only admins should be able to update milk rate records
CREATE POLICY "Only admins can update milk company rates"
ON public.milk_company_rates
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
-- Only admins should be able to delete milk rate records
CREATE POLICY "Only admins can delete milk company rates"
ON public.milk_company_rates
FOR DELETE
USING (
  auth.role() = 'service_role' OR
  auth.jwt() ->> 'role' = 'admin' OR
  auth.jwt() ->> 'email' IN ('admin@agrogram.com', 'superadmin@agrogram.com')
);

-- Note: Service role (SUPABASE_SERVICE_ROLE_KEY) bypasses RLS
-- So backend operations in API routes will work without issues

-- Additional Note:
-- Milk companies and rates are public data, so SELECT is open to everyone
-- Only admins can create, update, or delete records
-- Adjust admin email checks based on your actual admin emails

