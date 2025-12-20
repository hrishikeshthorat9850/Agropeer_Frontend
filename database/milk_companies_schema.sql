-- Milk Companies Table Schema
-- This table stores dairy company information and their milk rates

CREATE TABLE IF NOT EXISTS public.milk_companies (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  milk_type TEXT, -- Cow, Buffalo, Mixed
  region TEXT, -- Maharashtra, Gujarat, Karnataka, etc.
  category TEXT, -- Cooperative, Private, Government
  fat_rate NUMERIC(10, 2), -- Rate per unit of fat
  snf_rate NUMERIC(10, 2), -- Rate per unit of SNF
  base_rate NUMERIC(10, 2), -- Base rate per liter
  fat_multiplier NUMERIC(10, 2), -- Multiplier for fat (used in formula)
  snf_multiplier NUMERIC(10, 2), -- Multiplier for SNF (used in formula)
  per_liter_rate NUMERIC(10, 2), -- Fixed per liter rate (if not using formula)
  contact_info JSONB, -- {phone, email, address, website}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT milk_companies_pkey PRIMARY KEY (id)
);

-- Historical Rates Table (optional, for tracking rate changes over time)
CREATE TABLE IF NOT EXISTS public.milk_company_rates (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.milk_companies(id) ON DELETE CASCADE,
  fat_rate NUMERIC(10, 2),
  snf_rate NUMERIC(10, 2),
  base_rate NUMERIC(10, 2),
  per_liter_rate NUMERIC(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT milk_company_rates_pkey PRIMARY KEY (id)
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_milk_companies_milk_type ON public.milk_companies(milk_type);
CREATE INDEX IF NOT EXISTS idx_milk_companies_region ON public.milk_companies(region);
CREATE INDEX IF NOT EXISTS idx_milk_companies_updated_at ON public.milk_companies(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_milk_company_rates_company_id ON public.milk_company_rates(company_id);
CREATE INDEX IF NOT EXISTS idx_milk_company_rates_created_at ON public.milk_company_rates(created_at DESC);

-- Example data structure:
/*
INSERT INTO public.milk_companies (
  name,
  description,
  milk_type,
  region,
  category,
  fat_rate,
  snf_rate,
  base_rate,
  fat_multiplier,
  snf_multiplier,
  per_liter_rate,
  contact_info
) VALUES (
  'Amul',
  'Gujarat Cooperative Milk Marketing Federation Ltd. - Leading dairy cooperative in India.',
  'Cow',
  'Gujarat',
  'Cooperative',
  1.50,
  1.00,
  33.00,
  1.50,
  1.00,
  NULL,
  '{"phone": "+91-XXX-XXXX", "website": "https://www.amul.com"}'
);
*/

