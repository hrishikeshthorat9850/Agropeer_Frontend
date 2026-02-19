# Government Schemes Data Insert Guide

## Overview
This directory contains SQL files to insert 50 detailed government schemes into the `government_schemes` table.

## Files
- `government_schemes_schema.sql` - Database schema (if not already created)
- `government_schemes_add_language.sql` - **Run first for Hindi/Marathi:** adds `language` and `scheme_code` columns
- `government_schemes_insert_50.sql` - 50 schemes in **English** (`language='en'`, includes `scheme_code`)
- `government_schemes_insert_50_hindi.sql` - Same schemes in **Hindi** (`language='hi'`, same `scheme_code`; currently 7 schemes, extend with same pattern for 8–50)
- `government_schemes_insert_50_marathi.sql` - Same schemes in **Marathi** (`language='mr'`, same `scheme_code`; currently 7 schemes, extend with same pattern for 8–50)

## How to Use

### Run order (English + Hindi + Marathi)
1. Create table: run `government_schemes_schema.sql` (if not already done).
2. Add language support: run `government_schemes_add_language.sql` (adds `language`, `scheme_code`).
3. Insert English: run `government_schemes_insert_50.sql` (50 rows, `language='en'`).
4. Insert Hindi: run `government_schemes_insert_50_hindi.sql` (7 rows by default; add more using same `scheme_code` list).
5. Insert Marathi: run `government_schemes_insert_50_marathi.sql` (7 rows by default; add more using same `scheme_code` list).

### Option 1: Supabase SQL Editor (Recommended)
1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Run the files in the order above (schema → add_language → insert_50 → insert_50_hindi → insert_50_marathi)
4. Click **Run** or press `Ctrl+Enter` for each file

### Option 2: Using psql Command Line
```bash
psql -h your-db-host -U your-username -d your-database -f government_schemes_insert_50.sql
```

### Option 3: Using Supabase CLI
```bash
supabase db execute -f database/government_schemes_insert_50.sql
```

## Data Format
The SQL file uses PostgreSQL's `::jsonb` casting to convert JSON strings to JSONB format. The data structure matches your API response format:

- **benefits**: Array of strings (e.g., `["Benefit 1", "Benefit 2"]`)
- **eligibility**: Array of strings (e.g., `["Criteria 1", "Criteria 2"]`)
- **documents**: Array of strings (e.g., `["Document 1", "Document 2"]`)
- **application_steps**: Array of strings (e.g., `["Step 1", "Step 2"]`)
- **official_links**: Array of objects (e.g., `[{"url": "...", "label": "..."}]`)
- **faqs**: Array of objects (e.g., `[{"question": "...", "answer": "..."}]`)

## Schemes Included (50 Total)

### National Schemes (All States)
1. PM-Kisan Samman Nidhi
2. Pradhan Mantri Fasal Bima Yojana (PMFBY)
3. Kisan Credit Card (KCC)
4. Agriculture Infrastructure Fund (AIF)
5. Pradhan Mantri Kisan Maan Dhan Yojana (PM-KMY)
6. Soil Health Card Scheme
7. National Agriculture Market (e-NAM)
8. Rashtriya Krishi Vikas Yojana (RKVY)
9. Paramparagat Krishi Vikas Yojana (PKVY)
10. National Food Security Mission (NFSM)
11. Pradhan Mantri Krishi Sinchai Yojana (PMKSY)
12. Mission for Integrated Development of Horticulture (MIDH)
13. National Mission on Oilseeds and Oil Palm (NMOOP)
14. National Mission for Sustainable Agriculture (NMSA)
15. Sub-Mission on Agricultural Mechanization (SMAM)
16. National Livestock Mission (NLM)
17. National Beekeeping and Honey Mission (NBHM)
18. Pradhan Mantri Matsya Sampada Yojana (PMMSY)
19. National Bamboo Mission (NBM)
20. National Mission on Edible Oils - Oil Palm (NMEO-OP)
21-50. Additional national and state-specific schemes

### State-Specific Schemes
- **Telangana**: Rythu Bandhu Scheme
- **Andhra Pradesh**: YSR Rythu Bharosa, Annadata Sukhibhava
- **Odisha**: KALIA, Biju Krushak Kalyan Yojana
- **Jharkhand**: Mukhyamantri Krishi Ashirwad Yojana
- **Haryana**: Bhavantar Bharpai Yojana
- **Karnataka**: Krishi Bhagya
- **West Bengal**: Krishak Bandhu
- **Gujarat**: Gujarat Krishi Mahotsav
- **Uttar Pradesh**: UP Krishi Yojana
- **Rajasthan**: Rajasthan Krishi Yojana
- **Maharashtra**: Maharashtra Shetkari Yojana
- **Bihar**: Bihar Beej Yojana
- **Punjab**: Punjab Crop Diversification
- **Assam**: Assam Chief Minister Samagra Gramya
- **Kerala**: Kerala Karshaka Kshema
- **Tamil Nadu**: Uzhavar Pathukappu Thittam
- **Madhya Pradesh**: Mukhyamantri Krishi Sinchai, Bhavantar Yojana MP
- **Chhattisgarh**: Rajiv Gandhi Kisan Nyay Yojana

## Hindi / Marathi (Option 1: language column)
- Each scheme has one row per language: **English** (`language='en'`), **Hindi** (`language='hi'`), **Marathi** (`language='mr'`).
- Rows for the same scheme share the same **`scheme_code`** (e.g. `pm-kisan-samman-nidhi`). Use it to switch language or fetch the same scheme in another language.
- **API:** Filter by `language` (e.g. `?lang=hi` or `?lang=mr`). For detail, fetch by `scheme_code` + `language` (or by `id` if the frontend stores the current row id).
- Hindi and Marathi SQL files currently insert **7 schemes each** (1–7). To complete 50, add more rows with the same column list and the `scheme_code` values from the comment at the bottom of each file.
- Category/state in Hindi/Marathi files are translated (e.g. आय सहायता, उत्पन्न आधार); icons and URLs are unchanged.

## Verification
After running the SQL files, verify the data:

```sql
-- Check total count (e.g. 50 EN + 7 HI + 7 MR = 64 if you ran all)
SELECT COUNT(*) FROM public.government_schemes;

-- Count by language
SELECT language, COUNT(*) FROM public.government_schemes GROUP BY language;

-- List English schemes
SELECT id, scheme_code, title, category FROM public.government_schemes WHERE language = 'en' ORDER BY created_at DESC;

-- Same scheme in all languages (replace scheme_code as needed)
SELECT language, title FROM public.government_schemes WHERE scheme_code = 'pm-kisan-samman-nidhi';
```

## Notes
- All schemes include detailed benefits, eligibility criteria, required documents, application steps, official links, and FAQs
- Data format matches your frontend expectations (JSON strings that are parsed)
- State-specific schemes have `state` field populated; national schemes have `NULL`
- Categories include: Income Support, Crop Insurance, Credit Support, Infrastructure Finance, Irrigation, Agriculture Development, etc.

## Troubleshooting
- **Error: Table doesn't exist**: Run `government_schemes_schema.sql` first
- **Error: Permission denied**: Check RLS policies in `government_schemes_rls_policies.sql`
- **Error: Duplicate key**: Schemes may already exist; use `INSERT ... ON CONFLICT DO NOTHING` or delete existing data first

## Next Steps
1. Run the SQL file in your database
2. Test the API endpoints to ensure data is returned correctly
3. Verify frontend displays all fields properly
4. Check that filtering by category and state works correctly
