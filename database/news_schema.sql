-- News Table Schema
-- This table stores news articles for the agricultural platform

CREATE TABLE IF NOT EXISTS public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT NOT NULL,
  category TEXT, -- Agriculture, Market Rates, Government Updates, Weather, Dairy, Technology, etc.
  image_url TEXT,
  source TEXT, -- News source or author
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT news_pkey PRIMARY KEY (id)
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_news_category ON public.news(category);
CREATE INDEX IF NOT EXISTS idx_news_date ON public.news(date DESC);
CREATE INDEX IF NOT EXISTS idx_news_created_at ON public.news(created_at DESC);

-- Full-text search index (if using PostgreSQL full-text search)
-- CREATE INDEX IF NOT EXISTS idx_news_search ON public.news USING gin(to_tsvector('english', title || ' ' || COALESCE(summary, '') || ' ' || content));

-- Example data structure:
/*
INSERT INTO public.news (
  title,
  summary,
  content,
  category,
  image_url,
  source,
  date
) VALUES (
  'New Agricultural Policy Announced',
  'The government has announced a new policy to support small-scale farmers with subsidies and better market access.',
  'Full article content here...',
  'Government Updates',
  'https://example.com/image.jpg',
  'Ministry of Agriculture',
  NOW()
);
*/

