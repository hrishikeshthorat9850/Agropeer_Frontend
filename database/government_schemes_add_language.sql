-- Option 1: Add language and scheme_code for Hindi/Marathi support
-- Run this BEFORE inserting Hindi/Marathi data. Run AFTER existing English data exists.

-- 1. Add new columns
ALTER TABLE public.government_schemes
  ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'en',
  ADD COLUMN IF NOT EXISTS scheme_code TEXT;

-- 2. Create unique constraint so (scheme_code, language) is unique
--    (allows one row per scheme per language)
CREATE UNIQUE INDEX IF NOT EXISTS idx_government_schemes_scheme_code_language
  ON public.government_schemes (scheme_code, language)
  WHERE scheme_code IS NOT NULL;

-- 3. Index for filtering by language (for API: WHERE language = ?)
CREATE INDEX IF NOT EXISTS idx_government_schemes_language
  ON public.government_schemes (language);

-- 4. Backfill existing rows (only if you already have English rows without scheme_code):
--    Run the UPDATEs below so each row gets language='en' and the correct scheme_code.
--    Then you can insert Hindi/Marathi rows with the same scheme_code.
/*
UPDATE public.government_schemes SET language = 'en', scheme_code = 'pm-kisan-samman-nidhi' WHERE title = 'PM-Kisan Samman Nidhi' AND (scheme_code IS NULL OR scheme_code = '');
UPDATE public.government_schemes SET language = 'en', scheme_code = 'pmfby' WHERE title = 'Pradhan Mantri Fasal Bima Yojana (PMFBY)' AND (scheme_code IS NULL OR scheme_code = '');
UPDATE public.government_schemes SET language = 'en', scheme_code = 'kisan-credit-card' WHERE title = 'Kisan Credit Card (KCC)' AND (scheme_code IS NULL OR scheme_code = '');
UPDATE public.government_schemes SET language = 'en', scheme_code = 'agriculture-infrastructure-fund' WHERE title = 'Agriculture Infrastructure Fund (AIF)' AND (scheme_code IS NULL OR scheme_code = '');
UPDATE public.government_schemes SET language = 'en', scheme_code = 'pm-kisan-maan-dhan' WHERE title LIKE 'Pradhan Mantri Kisan Maan Dhan%' AND (scheme_code IS NULL OR scheme_code = '');
UPDATE public.government_schemes SET language = 'en', scheme_code = 'soil-health-card' WHERE title = 'Soil Health Card Scheme' AND (scheme_code IS NULL OR scheme_code = '');
UPDATE public.government_schemes SET language = 'en', scheme_code = 'e-nam' WHERE title LIKE 'National Agriculture Market%' AND (scheme_code IS NULL OR scheme_code = '');
-- Add similar UPDATEs for remaining schemes (rkvy, pkvy, nfsm, pmksy, midh, nmoop, nmsa, smam, nlm, nbhm, pmmsy, nbm, nmeo-op, rythu-bandhu, ysr-rythu-bharosa, kalia, mukhyamantri-krishi-ashirwad, bhavantar-bharpai, krishi-bhagya, biju-krushak-kalyan, krishak-bandhu, gujarat-krishi-mahotsav, up-krishi-yojana, rajasthan-krishi-yojana, maharashtra-shetkari-yojana, bihar-beej-yojana, punjab-crop-diversification, assam-samagra-gramya, kerala-karshaka-kshema, uzhavar-pathukappu, mukhyamantri-krishi-sinchai, bhavantar-mp, rajiv-gandhi-kisan-nyay, annadata-sukhibhava, nmsa-rad, pm-kusum, nmmi, nmaet, nmspm, nmam, nmop, nmps, nmab).
*/

-- 5. Optional: After backfill, require scheme_code for new rows:
-- ALTER TABLE public.government_schemes ALTER COLUMN scheme_code SET NOT NULL;
