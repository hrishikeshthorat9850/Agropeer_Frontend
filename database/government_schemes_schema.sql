-- Government Schemes Table Schema
-- This table stores information about government schemes for farmers

CREATE TABLE IF NOT EXISTS public.government_schemes (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- Agriculture, Business, Women, Kisan Credit, Insurance, Subsidy, Education, Health, Livestock
  state TEXT, -- NULL means all states, or specific state name
  icon TEXT, -- Emoji or icon identifier
  benefits JSONB, -- Array of benefit strings or objects
  eligibility JSONB, -- Array of eligibility criteria
  documents JSONB, -- Array of required documents
  application_steps JSONB, -- Array of step-by-step application instructions
  official_links JSONB, -- Array of {label, url} objects or single URL string
  faqs JSONB, -- Array of {question, answer} objects
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT government_schemes_pkey PRIMARY KEY (id)
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_government_schemes_category ON public.government_schemes(category);
CREATE INDEX IF NOT EXISTS idx_government_schemes_state ON public.government_schemes(state);
CREATE INDEX IF NOT EXISTS idx_government_schemes_created_at ON public.government_schemes(created_at DESC);

-- Example data (you can insert this via Supabase dashboard or API)
/*
INSERT INTO public.government_schemes (
  title,
  tagline,
  description,
  category,
  state,
  icon,
  benefits,
  eligibility,
  documents,
  application_steps,
  official_links,
  faqs
) VALUES (
  'PM-Kisan Samman Nidhi',
  'Direct income support for farmers',
  'PM-Kisan is a Central Sector Scheme with 100% funding from Government of India. The scheme aims to provide income support to all landholding farmers'' families in the country to enable them to take care of expenses related to agriculture and allied activities as well as domestic needs.',
  'Agriculture',
  NULL,
  '🌾',
  '["Direct income support of Rs. 6,000 per year", "Paid in three equal installments of Rs. 2,000 each", "Directly transferred to bank accounts", "No middlemen involved"]',
  '["All landholding farmers", "Small and marginal farmers", "Farmers with cultivable land"]',
  '["Aadhaar card", "Bank account details", "Land ownership documents", "Identity proof"]',
  '["Visit the official PM-Kisan website", "Click on Farmer Registration", "Fill in the required details", "Submit the form with documents", "Wait for verification"]',
  '[{"label": "Official Website", "url": "https://pmkisan.gov.in/"}]',
  '[{"question": "Who is eligible for PM-Kisan?", "answer": "All landholding farmers are eligible for PM-Kisan scheme."}, {"question": "How much money will I receive?", "answer": "You will receive Rs. 6,000 per year in three installments of Rs. 2,000 each."}]'
);
*/

