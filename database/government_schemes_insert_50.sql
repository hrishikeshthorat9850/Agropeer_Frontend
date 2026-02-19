-- Insert 50 Detailed Government Schemes
-- This file contains official government schemes data for farmers
-- Run this in Supabase SQL Editor or via psql

-- Note: PostgreSQL will automatically convert JSON strings to JSONB

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
  faqs,
  language,
  scheme_code
) VALUES

-- 1. PM-Kisan Samman Nidhi
(
  'PM-Kisan Samman Nidhi',
  'Direct income support for farmers',
  'PM-Kisan is a Central Sector Scheme with 100% funding from Government of India. The scheme aims to provide income support to all landholding farmers'' families in the country to enable them to take care of expenses related to agriculture and allied activities as well as domestic needs.',
  'Income Support',
  NULL,
  '🌾',
  '["Direct income support of Rs. 6,000 per year", "Paid in three equal installments of Rs. 2,000 each", "Directly transferred to bank accounts", "No middlemen involved", "Covers all landholding farmers"]'::jsonb,
  '["All landholding farmers", "Small and marginal farmers", "Farmers with cultivable land", "Must be Indian citizen", "Not an income tax payer"]'::jsonb,
  '["Aadhaar card", "Bank account details", "Land ownership documents", "Identity proof", "Mobile number"]'::jsonb,
  '["Visit the official PM-Kisan website (pmkisan.gov.in)", "Click on Farmer Registration", "Fill in Aadhaar number and land details", "Submit the form with documents", "Wait for verification and approval"]'::jsonb,
  '[{"url": "https://pmkisan.gov.in/", "label": "Official Website"}, {"url": "https://pmkisan.gov.in/NewRegistration.aspx", "label": "Registration Portal"}]'::jsonb,
  '[{"question": "Who is eligible for PM-Kisan?", "answer": "All landholding farmers are eligible for PM-Kisan scheme. Institutional landholders and income tax payers are excluded."}, {"question": "How much money will I receive?", "answer": "You will receive Rs. 6,000 per year in three installments of Rs. 2,000 each, directly transferred to your bank account."}, {"question": "Is Aadhaar mandatory?", "answer": "Yes, Aadhaar is mandatory for registration and to receive benefits."}]'::jsonb,
  'en',
  'pm-kisan-samman-nidhi'
),

-- 2. Pradhan Mantri Fasal Bima Yojana (PMFBY)
(
  'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
  'Comprehensive crop insurance for farmers',
  'PMFBY provides comprehensive crop insurance coverage against natural calamities, pests, diseases, and post-harvest losses to stabilize farmers income. It offers affordable premium rates and quick claim settlement.',
  'Crop Insurance',
  NULL,
  '🛡️',
  '["Comprehensive coverage against crop loss", "Affordable premium rates (2% for Kharif, 1.5% for Rabi)", "Quick claim settlement within 2 weeks", "Coverage for all food and oilseed crops", "Post-harvest losses covered up to 14 days"]'::jsonb,
  '["Farmers growing notified crops in notified areas", "Loanee farmers (compulsory)", "Non-loanee farmers (voluntary)", "Farmers with insurable interest in the crop"]'::jsonb,
  '["Aadhaar card", "Bank account details", "Land records", "Crop details and sowing certificate", "Bank passbook"]'::jsonb,
  '["Visit nearest bank branch, CSC, or official PMFBY portal", "Fill the crop insurance application form", "Submit required documents including crop details", "Pay the farmer premium share", "Receive insurance certificate"]'::jsonb,
  '[{"url": "https://pmfby.gov.in/", "label": "Official Website"}, {"url": "https://pmfby.gov.in/claimStatus", "label": "Check Claim Status"}]'::jsonb,
  '[{"question": "What crops are covered?", "answer": "All food crops, oilseeds, and annual commercial/horticultural crops notified by the state government are covered under PMFBY."}, {"question": "What is the premium rate?", "answer": "Farmers pay 2% premium for Kharif crops, 1.5% for Rabi crops, and 5% for commercial/horticultural crops. Remaining premium is subsidized by government."}, {"question": "Are natural disasters covered?", "answer": "Yes, coverage includes natural calamities like drought, flood, cyclone, hailstorm, landslide, fire, and pest/disease attacks."}]'::jsonb,
  'en',
  'pmfby'
),

-- 3. Kisan Credit Card (KCC)
(
  'Kisan Credit Card (KCC)',
  'Affordable credit for farming needs',
  'KCC provides farmers with timely access to short-term credit for crop cultivation, post-harvest expenses, and other farming needs at subsidized interest rates. It offers flexible repayment schedule and can be used for multiple agricultural purposes.',
  'Credit Support',
  NULL,
  '💳',
  '["Easy access to credit based on crop and landholding", "4% effective interest rate with subsidy", "Flexible repayment schedule", "Can be used for crop production, maintenance, and allied activities", "No need for separate loan application each time"]'::jsonb,
  '["Farmers engaged in agriculture", "Land ownership or tenant farmers", "Oral lessees and sharecroppers", "Self-help groups (SHGs) or joint liability groups"]'::jsonb,
  '["Aadhaar Card", "Land records or tenancy documents", "Passport size photo", "Bank account details", "Identity proof", "Address proof"]'::jsonb,
  '["Visit nearest bank branch (public or private)", "Fill KCC application form", "Submit required documents", "Bank evaluates proposal and landholding", "KCC card issued after approval"]'::jsonb,
  '[{"url": "https://www.pmkisan.gov.in/Kcc.aspx", "label": "Official Website"}, {"url": "https://www.rbi.org.in/scripts/NotificationUser.aspx?Id=12031", "label": "RBI Guidelines"}]'::jsonb,
  '[{"question": "What is the interest rate?", "answer": "Effective interest rate is 4% per annum for loans up to Rs. 3 lakhs with timely repayment. Interest subvention of 2% is provided by government."}, {"question": "Who can apply?", "answer": "Farmers engaged in agriculture and allied activities, including tenant farmers, oral lessees, and sharecroppers can apply for KCC."}, {"question": "What is the loan limit?", "answer": "Loan limit is based on crop value, landholding, and farming expenses. Typically ranges from Rs. 50,000 to Rs. 3 lakhs or more."}]'::jsonb,
  'en',
  'kisan-credit-card'
),

-- 4. Agriculture Infrastructure Fund (AIF)
(
  'Agriculture Infrastructure Fund (AIF)',
  '3% interest subvention on agri infrastructure loans',
  'AIF provides medium to long term debt financing facility for investment in viable projects for post-harvest management infrastructure and community farming assets. It aims to create post-harvest infrastructure and build community farming assets.',
  'Infrastructure Finance',
  NULL,
  '🏗️',
  '["3% interest subvention on loans", "Up to Rs. 2 crore loan per project", "Credit guarantee coverage available", "Covers post-harvest infrastructure", "Community farming assets support"]'::jsonb,
  '["Farmers, FPOs, PACS, agri-entrepreneurs", "Valid project proposal required", "Viable business model", "Must be engaged in agriculture or allied activities"]'::jsonb,
  '["Project proposal with business plan", "KYC documents", "Bank account details", "Land documents (if applicable)", "Technical feasibility report"]'::jsonb,
  '["Prepare infrastructure project proposal", "Apply through AIF portal or bank", "Bank evaluates proposal and viability", "Loan sanctioned with interest subvention", "Project implementation and monitoring"]'::jsonb,
  '[{"url": "https://agriinfra.dac.gov.in/", "label": "Official Website"}, {"url": "https://agriinfra.dac.gov.in/ApplicationStatus", "label": "Application Status"}]'::jsonb,
  '[{"question": "What is maximum loan limit?", "answer": "Maximum loan limit is Rs. 2 crore per project. Multiple projects can be funded for eligible entities."}, {"question": "Is there interest subsidy?", "answer": "Yes, 3% interest subvention is provided on loans sanctioned under AIF, making it affordable for farmers and FPOs."}, {"question": "What infrastructure is covered?", "answer": "Post-harvest management infrastructure like cold storage, warehouses, sorting/grading units, and community farming assets are covered."}]'::jsonb,
  'en',
  'agriculture-infrastructure-fund'
),

-- 5. Pradhan Mantri Kisan Maan Dhan Yojana (PM-KMY)
(
  'Pradhan Mantri Kisan Maan Dhan Yojana (PM-KMY)',
  'Pension scheme for small and marginal farmers',
  'PM-KMY is a voluntary and contributory pension scheme providing minimum assured pension of Rs. 3,000 per month after attaining 60 years of age. It provides social security to small and marginal farmers.',
  'Pension / Social Security',
  NULL,
  '👴',
  '["Rs. 3,000 per month pension after 60 years", "50% pension to spouse after death", "Voluntary contribution scheme", "Government matching contribution", "Life insurance coverage"]'::jsonb,
  '["Age between 18-40 years", "Small and marginal farmers", "Not an income tax payer", "Must be engaged in farming activities", "Should have cultivable land"]'::jsonb,
  '["Aadhaar Card", "Bank account details", "Land records", "Age proof", "Income certificate"]'::jsonb,
  '["Visit nearest CSC center or bank", "Register under PM-KMY scheme", "Choose monthly contribution amount", "Submit required documents", "Receive pension after 60 years"]'::jsonb,
  '[{"url": "https://maandhan.in/", "label": "Official Website"}, {"url": "https://maandhan.in/Registration", "label": "Registration Portal"}]'::jsonb,
  '[{"question": "What is pension amount?", "answer": "Minimum assured pension is Rs. 3,000 per month after attaining age 60. Pension amount depends on contribution made."}, {"question": "Is scheme voluntary?", "answer": "Yes, PM-KMY is a voluntary and contributory pension scheme. Farmers can choose to join and contribute monthly."}, {"question": "What happens after death?", "answer": "After death of the farmer, 50% of the pension amount is provided to the spouse as family pension."}]'::jsonb,
  'en',
  'pm-kisan-maan-dhan'
),

-- 6. Soil Health Card Scheme
(
  'Soil Health Card Scheme',
  'Soil testing and nutrient management',
  'Provides soil health cards to farmers with crop-wise recommendations for nutrients and fertilizers. It helps farmers understand soil health and apply appropriate fertilizers, improving crop productivity and reducing input costs.',
  'Soil Health',
  NULL,
  '🌱',
  '["Free soil testing", "Crop-wise nutrient recommendations", "Reduced fertilizer costs", "Improved crop productivity", "Sustainable farming practices"]'::jsonb,
  '["All farmers", "Farmers with cultivable land", "No specific eligibility criteria", "Available for all states"]'::jsonb,
  '["Aadhaar card", "Land records", "Farmer registration (if required)", "Soil sample"]'::jsonb,
  '["Collect soil sample from your field", "Submit sample at nearest soil testing lab", "Provide land details and Aadhaar", "Receive soil health card with recommendations", "Follow nutrient recommendations for crops"]'::jsonb,
  '[{"url": "https://soilhealth.dac.gov.in/", "label": "Official Website"}, {"url": "https://soilhealth.dac.gov.in/Reports/StateWiseSampleStatus", "label": "Check Sample Status"}]'::jsonb,
  '[{"question": "What is the purpose?", "answer": "Soil Health Card provides information about soil nutrients and recommends appropriate fertilizers, helping farmers improve productivity and reduce costs."}, {"question": "Is it free?", "answer": "Yes, soil testing and soil health card are provided free of cost to all farmers."}, {"question": "How often should I test soil?", "answer": "Soil should be tested every 2-3 years to monitor nutrient levels and adjust fertilizer application."}]'::jsonb,
  'en',
  'soil-health-card'
),

-- 7. National Agriculture Market (e-NAM)
(
  'National Agriculture Market (e-NAM)',
  'Online trading platform for agricultural commodities',
  'e-NAM is an online trading platform that connects existing APMC mandis to create a unified national market for agricultural commodities. It helps farmers get better prices through transparent online trading.',
  'Market Access',
  NULL,
  '💻',
  '["Transparent price discovery", "Better prices for produce", "Online trading from anywhere", "Reduced middlemen", "Quick payment settlement"]'::jsonb,
  '["Farmers registered in APMC mandis", "Traders registered on e-NAM", "Commission agents", "FPOs and cooperatives"]'::jsonb,
  '["Aadhaar card", "Bank account details", "APMC registration", "Mobile number", "Produce quality certificate"]'::jsonb,
  '["Register on e-NAM portal", "Get produce quality tested", "List produce for sale", "Participate in online auction", "Receive payment after sale"]'::jsonb,
  '[{"url": "https://enam.gov.in/", "label": "Official Website"}, {"url": "https://enam.gov.in/Home/Registration", "label": "Registration Portal"}]'::jsonb,
  '[{"question": "What is the purpose?", "answer": "e-NAM creates a unified national market for agricultural commodities, enabling farmers to sell produce online and get better prices through transparent trading."}, {"question": "How does online trading work?", "answer": "Farmers can list their produce on e-NAM platform, buyers bid online, and the best price is selected. Payment is transferred directly to farmer''s account."}, {"question": "Is quality testing required?", "answer": "Yes, produce quality is tested at APMC mandi before listing on e-NAM to ensure fair trading."}]'::jsonb,
  'en',
  'e-nam'
),

-- 8. Rashtriya Krishi Vikas Yojana (RKVY)
(
  'Rashtriya Krishi Vikas Yojana (RKVY)',
  'State agriculture development support',
  'RKVY is a state plan scheme that provides financial assistance to states for agriculture and allied sector development. It supports state-specific agriculture projects and infrastructure development.',
  'Agriculture Development',
  NULL,
  '🌾',
  '["State-specific agriculture projects", "Infrastructure development support", "Technology adoption assistance", "Capacity building programs", "Financial grants to states"]'::jsonb,
  '["State governments", "Agriculture departments", "FPOs and cooperatives", "Farmers through state schemes", "Research institutions"]'::jsonb,
  '["Project proposal", "State government approval", "Technical feasibility report", "Financial estimates", "Implementation plan"]'::jsonb,
  '["State prepares project proposal", "Submit to central government", "Project evaluation and approval", "Release of funds", "Project implementation"]'::jsonb,
  '[{"url": "https://rkvy.nic.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What type of support is provided?", "answer": "RKVY provides financial assistance to states for agriculture and allied sector development, including infrastructure, technology, and capacity building."}, {"question": "Who can benefit?", "answer": "Farmers benefit indirectly through state-specific schemes and projects funded under RKVY."}]'::jsonb,
  'en',
  'rkvy'
),

-- 9. Paramparagat Krishi Vikas Yojana (PKVY)
(
  'Paramparagat Krishi Vikas Yojana (PKVY)',
  'Promoting organic farming practices',
  'PKVY promotes organic farming through cluster approach. It provides financial assistance for organic certification, input support, and capacity building to encourage farmers to adopt organic farming practices.',
  'Organic Farming',
  NULL,
  '🌿',
  '["Financial assistance for organic certification", "Input support for organic farming", "Training and capacity building", "Market linkage support", "Premium prices for organic produce"]'::jsonb,
  '["Farmers willing to adopt organic farming", "Farmers in clusters", "FPOs and farmer groups", "Must commit to organic practices for 3 years"]'::jsonb,
  '["Aadhaar card", "Land records", "Cluster membership certificate", "Organic farming commitment", "Bank account details"]'::jsonb,
  '["Form or join organic farming cluster", "Register for PKVY scheme", "Submit required documents", "Receive organic certification support", "Follow organic farming practices"]'::jsonb,
  '[{"url": "https://pgsindia-ncof.gov.in/", "label": "Official Website"}, {"url": "https://pgsindia-ncof.gov.in/PKVY", "label": "PKVY Portal"}]'::jsonb,
  '[{"question": "What is organic farming?", "answer": "Organic farming uses natural inputs and avoids synthetic fertilizers and pesticides, promoting sustainable agriculture and environmental protection."}, {"question": "What support is provided?", "answer": "PKVY provides financial assistance for organic certification, input support, training, and market linkage for organic farmers."}]'::jsonb,
  'en',
  'pkvy'
),

-- 10. National Food Security Mission (NFSM)
(
  'National Food Security Mission (NFSM)',
  'Increasing food grain production',
  'NFSM aims to increase production of rice, wheat, pulses, and coarse cereals through area expansion and productivity enhancement. It provides support for improved seeds, nutrients, and technology adoption.',
  'Crop Production',
  NULL,
  '🌾',
  '["Improved seed distribution", "Nutrient management support", "Technology demonstration", "Crop productivity enhancement", "Area expansion support"]'::jsonb,
  '["Farmers growing rice, wheat, pulses", "Farmers in NFSM districts", "Small and marginal farmers", "FPOs and farmer groups"]'::jsonb,
  '["Aadhaar card", "Land records", "Crop details", "Bank account details", "Farmer registration"]'::jsonb,
  '["Register with agriculture department", "Apply for NFSM benefits", "Receive improved seeds and inputs", "Follow recommended practices", "Participate in demonstrations"]'::jsonb,
  '[{"url": "https://nfsm.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What is the goal?", "answer": "NFSM aims to increase production of rice, wheat, pulses, and coarse cereals to ensure food security in the country."}, {"question": "What crops are covered?", "answer": "Rice, wheat, pulses (gram, tur, moong, urad, lentil), and coarse cereals (jowar, bajra, ragi, maize) are covered under NFSM."}]'::jsonb,
  'en',
  'nfsm'
),

-- 11. Pradhan Mantri Krishi Sinchai Yojana (PMKSY)
(
  'Pradhan Mantri Krishi Sinchai Yojana (PMKSY)',
  'Per drop more crop - irrigation support',
  'PMKSY aims to improve farm productivity and water use efficiency through micro-irrigation systems. It provides financial assistance for drip and sprinkler irrigation to help farmers save water and increase crop yield.',
  'Irrigation',
  NULL,
  '💧',
  '["55% subsidy for micro-irrigation", "Water use efficiency improvement", "Increased crop productivity", "Reduced water consumption", "Support for drip and sprinkler systems"]'::jsonb,
  '["Farmers with cultivable land", "Farmers willing to adopt micro-irrigation", "Small and marginal farmers", "FPOs and farmer groups"]'::jsonb,
  '["Aadhaar card", "Land records", "Bank account details", "Project proposal", "Technical feasibility report"]'::jsonb,
  '["Contact agriculture department or PMKSY office", "Submit application with land details", "Get technical approval", "Install micro-irrigation system", "Receive subsidy after installation"]'::jsonb,
  '[{"url": "https://pmksy.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What is micro-irrigation?", "answer": "Micro-irrigation includes drip and sprinkler systems that deliver water directly to plant roots, saving water and improving efficiency."}, {"question": "What is the subsidy amount?", "answer": "55% subsidy is provided for micro-irrigation systems, with higher subsidy for small and marginal farmers."}]'::jsonb,
  'en',
  'pmksy'
),

-- 12. Mission for Integrated Development of Horticulture (MIDH)
(
  'Mission for Integrated Development of Horticulture (MIDH)',
  'Integrated horticulture development',
  'MIDH promotes holistic growth of horticulture sector covering fruits, vegetables, flowers, spices, and plantation crops. It provides support for area expansion, productivity enhancement, and post-harvest management.',
  'Horticulture',
  NULL,
  '🍎',
  '["Area expansion support", "Productivity enhancement", "Post-harvest infrastructure", "Market linkage support", "Technology adoption assistance"]'::jsonb,
  '["Farmers growing horticultural crops", "FPOs and cooperatives", "Entrepreneurs in horticulture", "State horticulture departments"]'::jsonb,
  '["Aadhaar card", "Land records", "Crop details", "Project proposal", "Bank account details"]'::jsonb,
  '["Contact state horticulture department", "Submit project proposal", "Get technical approval", "Implement project", "Receive financial assistance"]'::jsonb,
  '[{"url": "https://midh.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What crops are covered?", "answer": "Fruits, vegetables, flowers, spices, aromatic plants, and plantation crops are covered under MIDH."}, {"question": "What support is provided?", "answer": "MIDH provides support for area expansion, productivity enhancement, post-harvest management, and market linkage."}]'::jsonb,
  'en',
  'midh'
),

-- 13. National Mission on Oilseeds and Oil Palm (NMOOP)
(
  'National Mission on Oilseeds and Oil Palm (NMOOP)',
  'Increasing oilseed production',
  'NMOOP aims to increase production of oilseeds and oil palm to reduce import dependency. It provides support for area expansion, productivity enhancement, and processing infrastructure.',
  'Crop Production',
  NULL,
  '🌻',
  '["Area expansion support", "Improved seed distribution", "Technology demonstration", "Processing infrastructure support", "Market linkage"]'::jsonb,
  '["Farmers growing oilseeds", "Farmers in oil palm areas", "FPOs and cooperatives", "Processing units"]'::jsonb,
  '["Aadhaar card", "Land records", "Crop details", "Bank account details"]'::jsonb,
  '["Register with agriculture department", "Apply for NMOOP benefits", "Receive improved seeds and inputs", "Follow recommended practices"]'::jsonb,
  '[{"url": "https://nmoop.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What oilseeds are covered?", "answer": "Groundnut, mustard, soybean, sunflower, sesame, niger, castor, and safflower are covered under NMOOP."}, {"question": "What is the objective?", "answer": "NMOOP aims to increase oilseed production and reduce import dependency through area expansion and productivity enhancement."}]'::jsonb,
  'en',
  'nmoop'
),

-- 14. National Mission for Sustainable Agriculture (NMSA)
(
  'National Mission for Sustainable Agriculture (NMSA)',
  'Promoting sustainable farming practices',
  'NMSA promotes sustainable agriculture through climate-resilient practices, soil health management, water use efficiency, and integrated farming systems. It helps farmers adapt to climate change.',
  'Agriculture Development',
  NULL,
  '🌍',
  '["Climate-resilient farming support", "Soil health management", "Water use efficiency", "Integrated farming systems", "Capacity building"]'::jsonb,
  '["All farmers", "Farmers adopting sustainable practices", "FPOs and farmer groups", "State agriculture departments"]'::jsonb,
  '["Aadhaar card", "Land records", "Project proposal", "Bank account details"]'::jsonb,
  '["Contact agriculture department", "Submit project proposal", "Get technical approval", "Implement sustainable practices", "Receive financial assistance"]'::jsonb,
  '[{"url": "https://nmsa.dac.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What is sustainable agriculture?", "answer": "Sustainable agriculture involves practices that maintain soil health, conserve water, and adapt to climate change while maintaining productivity."}, {"question": "What practices are supported?", "answer": "NMSA supports climate-resilient practices, soil health management, water conservation, and integrated farming systems."}]'::jsonb,
  'en',
  'nmsa'
),

-- 15. Sub-Mission on Agricultural Mechanization (SMAM)
(
  'Sub-Mission on Agricultural Mechanization (SMAM)',
  'Promoting farm mechanization',
  'SMAM promotes farm mechanization to reduce drudgery, increase efficiency, and reduce post-harvest losses. It provides financial assistance for purchase of agricultural machinery and equipment.',
  'Agriculture Development',
  NULL,
  '🚜',
  '["Subsidy on agricultural machinery", "Custom hiring center support", "Farm machinery bank support", "Reduced drudgery", "Increased efficiency"]'::jsonb,
  '["Farmers", "FPOs and cooperatives", "Custom hiring centers", "Entrepreneurs", "SHGs"]'::jsonb,
  '["Aadhaar card", "Land records", "Bank account details", "Machinery quotation", "Project proposal"]'::jsonb,
  '["Select agricultural machinery", "Get quotation from dealer", "Apply for subsidy", "Purchase machinery", "Receive subsidy"]'::jsonb,
  '[{"url": "https://farmech.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What machinery is covered?", "answer": "Tractors, harvesters, threshers, planters, and other agricultural machinery are covered under SMAM."}, {"question": "What is the subsidy amount?", "answer": "Subsidy ranges from 25% to 50% depending on the machinery and category of farmer."}]'::jsonb,
  'en',
  'smam'
),

-- 16. National Livestock Mission (NLM)
(
  'National Livestock Mission (NLM)',
  'Livestock development and productivity',
  'NLM aims to ensure quantitative and qualitative improvement in livestock production systems and capacity building of all stakeholders. It covers cattle, buffalo, sheep, goat, pig, and poultry.',
  'Livestock',
  NULL,
  '🐄',
  '["Breed improvement support", "Feed and fodder development", "Animal health services", "Capacity building", "Market linkage"]'::jsonb,
  '["Livestock farmers", "Dairy farmers", "Poultry farmers", "FPOs and cooperatives", "Entrepreneurs"]'::jsonb,
  '["Aadhaar card", "Livestock details", "Bank account details", "Project proposal"]'::jsonb,
  '["Contact animal husbandry department", "Submit project proposal", "Get technical approval", "Implement project", "Receive financial assistance"]'::jsonb,
  '[{"url": "https://dahd.nic.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What livestock is covered?", "answer": "Cattle, buffalo, sheep, goat, pig, and poultry are covered under National Livestock Mission."}, {"question": "What support is provided?", "answer": "NLM provides support for breed improvement, feed and fodder development, animal health, and capacity building."}]'::jsonb,
  'en',
  'nlm'
),

-- 17. National Beekeeping and Honey Mission (NBHM)
(
  'National Beekeeping and Honey Mission (NBHM)',
  'Promoting beekeeping and honey production',
  'NBHM promotes beekeeping as an important activity for agricultural production, employment generation, and income enhancement. It provides support for beekeeping equipment, training, and market linkage.',
  'Livestock',
  NULL,
  '🐝',
  '["Beekeeping equipment support", "Training and capacity building", "Honey processing support", "Market linkage", "Income generation"]'::jsonb,
  '["Beekeepers", "Farmers interested in beekeeping", "FPOs and cooperatives", "Entrepreneurs"]'::jsonb,
  '["Aadhaar card", "Bank account details", "Project proposal", "Beekeeping experience (if any)"]'::jsonb,
  '["Contact agriculture or horticulture department", "Submit application for beekeeping support", "Attend training program", "Receive equipment and support", "Start beekeeping activity"]'::jsonb,
  '[{"url": "https://nbhm.dac.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What is the benefit of beekeeping?", "answer": "Beekeeping provides additional income, improves crop pollination, and produces honey and other bee products."}, {"question": "What support is provided?", "answer": "NBHM provides beekeeping equipment, training, honey processing support, and market linkage."}]'::jsonb,
  'en',
  'nbhm'
),

-- 18. Pradhan Mantri Matsya Sampada Yojana (PMMSY)
(
  'Pradhan Mantri Matsya Sampada Yojana (PMMSY)',
  'Fisheries sector development',
  'PMMSY aims to enhance fish production and productivity, improve post-harvest infrastructure, and modernize fisheries sector. It provides support for fish farming, processing, and marketing.',
  'Livestock',
  NULL,
  '🐟',
  '["Fish farming support", "Post-harvest infrastructure", "Processing and marketing support", "Technology adoption", "Income enhancement"]'::jsonb,
  '["Fish farmers", "Fishermen", "FPOs and cooperatives", "Entrepreneurs in fisheries", "Women SHGs"]'::jsonb,
  '["Aadhaar card", "Bank account details", "Project proposal", "Land/water body documents"]'::jsonb,
  '["Contact fisheries department", "Submit project proposal", "Get technical approval", "Implement project", "Receive financial assistance"]'::jsonb,
  '[{"url": "https://pmmsy.dof.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What activities are covered?", "answer": "Fish farming, post-harvest infrastructure, processing, marketing, and technology adoption are covered under PMMSY."}, {"question": "What is the subsidy amount?", "answer": "Subsidy ranges from 40% to 60% depending on the category of beneficiary and type of activity."}]'::jsonb,
  'en',
  'pmmsy'
),

-- 19. National Bamboo Mission (NBM)
(
  'National Bamboo Mission (NBM)',
  'Bamboo cultivation and value addition',
  'NBM promotes bamboo cultivation, processing, and value addition to generate income and employment. It provides support for bamboo plantation, processing units, and market development.',
  'Agriculture Development',
  NULL,
  '🎋',
  '["Bamboo plantation support", "Processing unit support", "Value addition assistance", "Market linkage", "Income generation"]'::jsonb,
  '["Farmers", "Entrepreneurs", "FPOs and cooperatives", "SHGs", "Tribal communities"]'::jsonb,
  '["Aadhaar card", "Land records", "Bank account details", "Project proposal"]'::jsonb,
  '["Contact agriculture or forest department", "Submit project proposal", "Get technical approval", "Plant bamboo or set up processing unit", "Receive financial assistance"]'::jsonb,
  '[{"url": "https://nbm.nic.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What is bamboo used for?", "answer": "Bamboo is used for construction, furniture, handicrafts, paper, and various other products."}, {"question": "What support is provided?", "answer": "NBM provides support for bamboo plantation, processing units, value addition, and market linkage."}]'::jsonb,
  'en',
  'nbm'
),

-- 20. National Mission on Edible Oils - Oil Palm (NMEO-OP)
(
  'National Mission on Edible Oils - Oil Palm (NMEO-OP)',
  'Oil palm cultivation promotion',
  'NMEO-OP aims to increase oil palm cultivation and reduce import dependency on edible oils. It provides financial assistance for oil palm plantation, processing, and market development.',
  'Crop Production',
  NULL,
  '🌴',
  '["Oil palm plantation support", "Processing infrastructure", "Market linkage", "Technology support", "Income enhancement"]'::jsonb,
  '["Farmers in suitable areas", "FPOs and cooperatives", "Entrepreneurs", "State governments"]'::jsonb,
  '["Aadhaar card", "Land records", "Bank account details", "Project proposal", "Suitability certificate"]'::jsonb,
  '["Check land suitability for oil palm", "Submit project proposal", "Get technical approval", "Plant oil palm", "Receive financial assistance"]'::jsonb,
  '[{"url": "https://nmeo-op.dac.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What is oil palm?", "answer": "Oil palm is a high-yielding oil crop that produces palm oil, used in cooking and various industries."}, {"question": "What areas are suitable?", "answer": "Areas with adequate rainfall and suitable climate in states like Andhra Pradesh, Telangana, and others are suitable for oil palm."}]'::jsonb,
  'en',
  'nmeo-op'
),

-- 21. Rythu Bandhu Scheme (Telangana)
(
  'Rythu Bandhu Scheme',
  'Farmer investment support',
  'Rythu Bandhu provides investment support of Rs. 5,000 per acre per season directly to farmers for purchase of inputs like seeds, fertilizers, pesticides, and labor. It is implemented in Telangana state.',
  'Income Support',
  'Telangana',
  '💰',
  '["Rs. 5,000 per acre per season", "Direct benefit transfer", "Two installments per year", "No middlemen", "Covers all landholding farmers"]'::jsonb,
  '["All landholding farmers in Telangana", "Farmers with pattadar passbook", "Must be registered in revenue records"]'::jsonb,
  '["Pattadar passbook", "Aadhaar card", "Bank account details", "Land records"]'::jsonb,
  '["Ensure pattadar passbook is updated", "Link bank account with land records", "Receive automatic credit", "No application required"]'::jsonb,
  '[{"url": "https://rythubandhu.telangana.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "How much support is provided?", "answer": "Rs. 5,000 per acre per season is provided directly to farmers, totaling Rs. 10,000 per year (two seasons)."}, {"question": "Is application required?", "answer": "No, the amount is automatically credited to registered bank accounts based on land records."}]'::jsonb,
  'en',
  'rythu-bandhu'
),

-- 22. YSR Rythu Bharosa (Andhra Pradesh)
(
  'YSR Rythu Bharosa',
  'Farmer financial aid',
  'YSR Rythu Bharosa provides financial assistance of Rs. 13,500 per year to farmers in Andhra Pradesh. The amount is paid in three installments to support agricultural activities.',
  'Income Support',
  'Andhra Pradesh',
  '💵',
  '["Rs. 13,500 per year", "Three installments", "Direct benefit transfer", "Covers all farmers", "Additional support for tenant farmers"]'::jsonb,
  '["All farmers in Andhra Pradesh", "Landholding farmers", "Tenant farmers", "Must be registered"]'::jsonb,
  '["Aadhaar card", "Bank account details", "Land records", "Farmer registration"]'::jsonb,
  '["Register on YSR Rythu Bharosa portal", "Link Aadhaar and bank account", "Submit land details", "Receive installments automatically"]'::jsonb,
  '[{"url": "https://ysrrythubharosa.ap.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "How much is provided?", "answer": "Rs. 13,500 per year is provided in three installments: Rs. 7,500 in May, Rs. 4,000 in October, and Rs. 2,000 in January."}, {"question": "Who is eligible?", "answer": "All landholding farmers and tenant farmers registered in Andhra Pradesh are eligible."}]'::jsonb,
  'en',
  'ysr-rythu-bharosa'
),

-- 23. Krushak Assistance for Livelihood and Income Augmentation (KALIA) - Odisha
(
  'Krushak Assistance for Livelihood and Income Augmentation (KALIA)',
  'Farmer assistance scheme',
  'KALIA provides financial assistance to farmers, landless agricultural laborers, and vulnerable cultivators in Odisha. It supports crop cultivation, livelihood activities, and provides insurance coverage.',
  'Income Support',
  'Odisha',
  '🌾',
  '["Financial assistance for crop cultivation", "Support for landless laborers", "Livelihood support", "Insurance coverage", "Interest-free crop loans"]'::jsonb,
  '["Farmers in Odisha", "Landless agricultural laborers", "Vulnerable cultivators", "Sharecroppers"]'::jsonb,
  '["Aadhaar card", "Bank account details", "Land records (if applicable)", "Labor card (for laborers)"]'::jsonb,
  '["Register on KALIA portal", "Submit required documents", "Get verified", "Receive financial assistance"]'::jsonb,
  '[{"url": "https://kalia.odisha.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What support is provided?", "answer": "KALIA provides financial assistance for crop cultivation, support for landless laborers, livelihood activities, and insurance coverage."}, {"question": "How much assistance?", "answer": "Financial assistance varies based on category: Rs. 10,000 per year for small and marginal farmers, Rs. 5,000 for landless laborers."}]'::jsonb,
  'en',
  'kalia'
),

-- 24. Mukhyamantri Krishi Ashirwad Yojana (Jharkhand)
(
  'Mukhyamantri Krishi Ashirwad Yojana',
  'Per acre income support',
  'Mukhyamantri Krishi Ashirwad Yojana provides financial assistance of Rs. 5,000 per acre per year to farmers in Jharkhand. It supports agricultural activities and input purchase.',
  'Income Support',
  'Jharkhand',
  '🌾',
  '["Rs. 5,000 per acre per year", "Direct benefit transfer", "Input purchase support", "Covers all farmers"]'::jsonb,
  '["All farmers in Jharkhand", "Landholding farmers", "Must be registered"]'::jsonb,
  '["Aadhaar card", "Bank account details", "Land records", "Farmer registration"]'::jsonb,
  '["Register on scheme portal", "Submit land details", "Link bank account", "Receive financial assistance"]'::jsonb,
  '[{"url": "https://krishi.jharkhand.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "How much support?", "answer": "Rs. 5,000 per acre per year is provided directly to farmers for agricultural activities."}, {"question": "Who is eligible?", "answer": "All landholding farmers registered in Jharkhand are eligible for the scheme."}]'::jsonb,
  'en',
  'mukhyamantri-krishi-ashirwad'
),

-- 25. Bhavantar Bharpai Yojana (Haryana)
(
  'Bhavantar Bharpai Yojana',
  'Price deficiency payment',
  'Bhavantar Bharpai Yojana compensates farmers for the difference between Minimum Support Price (MSP) and actual market price for notified crops. It ensures farmers get fair price for their produce.',
  'Price Support',
  'Haryana',
  '💲',
  '["Price difference compensation", "MSP protection", "Direct benefit transfer", "Covers notified crops", "Fair price assurance"]'::jsonb,
  '["Farmers growing notified crops", "Farmers registered in Haryana", "Must sell in notified mandis"]'::jsonb,
  '["Aadhaar card", "Bank account details", "Sale receipt from mandi", "Crop details", "Land records"]'::jsonb,
  '["Grow notified crops", "Sell in notified mandi", "Get sale receipt", "Register sale on portal", "Receive price difference"]'::jsonb,
  '[{"url": "https://agriharyana.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What crops are covered?", "answer": "Notified crops like bajra, moong, urad, groundnut, and others are covered under Bhavantar Bharpai Yojana."}, {"question": "How is compensation calculated?", "answer": "Compensation is the difference between MSP and actual market price, paid directly to farmer''s account."}]'::jsonb,
  'en',
  'bhavantar-bharpai'
),

-- 26. Krishi Bhagya (Karnataka)
(
  'Krishi Bhagya',
  'Farm pond subsidy',
  'Krishi Bhagya provides financial assistance for construction of farm ponds, drip irrigation, and other water conservation structures in Karnataka. It helps farmers manage water resources effectively.',
  'Irrigation',
  'Karnataka',
  '💧',
  '["Farm pond construction support", "Drip irrigation subsidy", "Water conservation", "Increased productivity", "Drought mitigation"]'::jsonb,
  '["Farmers in Karnataka", "Farmers with cultivable land", "Must be registered"]'::jsonb,
  '["Aadhaar card", "Land records", "Bank account details", "Project proposal", "Technical approval"]'::jsonb,
  '["Contact agriculture department", "Submit application for farm pond", "Get technical approval", "Construct farm pond", "Receive subsidy"]'::jsonb,
  '[{"url": "https://raitamitra.karnataka.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What is farm pond?", "answer": "Farm pond is a water storage structure built on farm to collect and store rainwater for irrigation."}, {"question": "What is the subsidy?", "answer": "Subsidy up to Rs. 50,000 is provided for farm pond construction depending on size and type."}]'::jsonb,
  'en',
  'krishi-bhagya'
),

-- 27. Biju Krushak Kalyan Yojana (Odisha)
(
  'Biju Krushak Kalyan Yojana',
  'Health insurance for farmers',
  'Biju Krushak Kalyan Yojana provides health insurance coverage of Rs. 5 lakh per family per year to farmers in Odisha. It covers hospitalization expenses and provides cashless treatment.',
  'Health Insurance',
  'Odisha',
  '🏥',
  '["Rs. 5 lakh health insurance", "Cashless treatment", "Coverage for family", "Hospitalization expenses", "Pre and post hospitalization"]'::jsonb,
  '["Farmers in Odisha", "Farmer families", "Must be registered", "Age 18-70 years"]'::jsonb,
  '["Aadhaar card", "Bank account details", "Farmer registration", "Family details"]'::jsonb,
  '["Register on scheme portal", "Submit family details", "Get health card", "Avail cashless treatment"]'::jsonb,
  '[{"url": "https://bkky.odisha.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What is coverage amount?", "answer": "Rs. 5 lakh per family per year is provided for health insurance coverage."}, {"question": "What is covered?", "answer": "Hospitalization expenses, pre and post hospitalization, day care procedures, and OPD expenses are covered."}]'::jsonb,
  'en',
  'biju-krushak-kalyan'
),

-- 28. Krishak Bandhu (West Bengal)
(
  'Krishak Bandhu',
  'Farmer welfare',
  'Krishak Bandhu provides financial assistance and insurance coverage to farmers in West Bengal. It includes income support and life insurance coverage for farmers.',
  'Income Support',
  'West Bengal',
  '🌾',
  '["Financial assistance", "Life insurance coverage", "Crop insurance support", "Direct benefit transfer"]'::jsonb,
  '["Farmers in West Bengal", "Landholding farmers", "Must be registered"]'::jsonb,
  '["Aadhaar card", "Bank account details", "Land records", "Farmer registration"]'::jsonb,
  '["Register on Krishak Bandhu portal", "Submit required documents", "Get verified", "Receive benefits"]'::jsonb,
  '[{"url": "https://krishakbandhu.net/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What benefits are provided?", "answer": "Krishak Bandhu provides financial assistance and life insurance coverage to farmers in West Bengal."}, {"question": "Who is eligible?", "answer": "All registered landholding farmers in West Bengal are eligible for Krishak Bandhu benefits."}]'::jsonb,
  'en',
  'krishak-bandhu'
),

-- 29. Gujarat Krishi Mahotsav
(
  'Gujarat Krishi Mahotsav',
  'Farmer awareness and support',
  'Gujarat Krishi Mahotsav is an annual agricultural outreach program that provides farmers with information, technology, inputs, and financial assistance. It includes agricultural exhibitions and farmer meetings.',
  'Agriculture Development',
  'Gujarat',
  '🌾',
  '["Agricultural information", "Technology demonstration", "Input distribution", "Financial assistance", "Expert guidance"]'::jsonb,
  '["Farmers in Gujarat", "All categories of farmers", "FPOs and cooperatives"]'::jsonb,
  '["Aadhaar card", "Farmer registration", "Land records"]'::jsonb,
  '["Participate in Krishi Mahotsav events", "Attend agricultural exhibitions", "Meet experts", "Get information and inputs"]'::jsonb,
  '[{"url": "https://agri.gujarat.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What is Krishi Mahotsav?", "answer": "Krishi Mahotsav is an annual agricultural outreach program in Gujarat that provides farmers with information, technology, and support."}, {"question": "When is it held?", "answer": "Krishi Mahotsav is held annually, typically during the agricultural season, with events across the state."}]'::jsonb,
  'en',
  'gujarat-krishi-mahotsav'
),

-- 30. UP Krishi Yojana (Uttar Pradesh)
(
  'UP Krishi Yojana',
  'Farmer subsidy',
  'UP Krishi Yojana provides various subsidies and financial assistance to farmers in Uttar Pradesh for agricultural activities, equipment purchase, and input support.',
  'Agriculture Development',
  'Uttar Pradesh',
  '🌾',
  '["Agricultural subsidies", "Equipment purchase support", "Input assistance", "Financial aid", "Technology support"]'::jsonb,
  '["Farmers in Uttar Pradesh", "Landholding farmers", "Must be registered"]'::jsonb,
  '["Aadhaar card", "Bank account details", "Land records", "Farmer registration"]'::jsonb,
  '["Register on UP agriculture portal", "Apply for scheme benefits", "Submit required documents", "Receive subsidies"]'::jsonb,
  '[{"url": "https://upagriculture.com/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What subsidies are available?", "answer": "UP Krishi Yojana provides subsidies for agricultural equipment, inputs, and various agricultural activities."}, {"question": "Who is eligible?", "answer": "All registered farmers in Uttar Pradesh are eligible for UP Krishi Yojana benefits."}]'::jsonb,
  'en',
  'up-krishi-yojana'
),

-- 31. Rajasthan Krishi Yojana
(
  'Rajasthan Krishi Yojana',
  'Agri subsidy',
  'Rajasthan Krishi Yojana provides agricultural subsidies and financial assistance to farmers in Rajasthan for various agricultural activities, equipment, and inputs.',
  'Agriculture Development',
  'Rajasthan',
  '🌾',
  '["Agricultural subsidies", "Equipment support", "Input assistance", "Financial aid"]'::jsonb,
  '["Farmers in Rajasthan", "Landholding farmers", "Must be registered"]'::jsonb,
  '["Aadhaar card", "Bank account details", "Land records"]'::jsonb,
  '["Register on Rajasthan agriculture portal", "Apply for benefits", "Submit documents", "Receive subsidies"]'::jsonb,
  '[{"url": "https://agriculture.rajasthan.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What support is provided?", "answer": "Rajasthan Krishi Yojana provides subsidies for agricultural equipment, inputs, and various agricultural activities."}]'::jsonb,
  'en',
  'rajasthan-krishi-yojana'
),

-- 32. Maharashtra Shetkari Yojana
(
  'Maharashtra Shetkari Yojana',
  'Farmer welfare',
  'Maharashtra Shetkari Yojana provides comprehensive support to farmers in Maharashtra including subsidies, financial assistance, and welfare measures.',
  'Agriculture Development',
  'Maharashtra',
  '🌾',
  '["Subsidy support", "Financial assistance", "Welfare measures", "Input support"]'::jsonb,
  '["Farmers in Maharashtra", "Landholding farmers", "Must be registered"]'::jsonb,
  '["Aadhaar card", "Bank account details", "Land records", "Maharashtra farmer registration"]'::jsonb,
  '["Register on Maharashtra agriculture portal", "Apply for scheme benefits", "Submit documents", "Receive support"]'::jsonb,
  '[{"url": "https://mahaagri.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What benefits are available?", "answer": "Maharashtra Shetkari Yojana provides subsidies, financial assistance, and welfare support to farmers."}]'::jsonb,
  'en',
  'maharashtra-shetkari-yojana'
),

-- 33. Bihar Beej Yojana
(
  'Bihar Beej Yojana',
  'Seed subsidy',
  'Bihar Beej Yojana provides quality seeds to farmers at subsidized rates. It aims to improve crop productivity through distribution of improved and certified seeds.',
  'Seed Support',
  'Bihar',
  '🌱',
  '["Subsidized quality seeds", "Improved crop productivity", "Certified seeds", "Reduced input costs"]'::jsonb,
  '["Farmers in Bihar", "Landholding farmers", "Must be registered"]'::jsonb,
  '["Aadhaar card", "Land records", "Bank account details", "Farmer registration"]'::jsonb,
  '["Register on Bihar agriculture portal", "Apply for seed subsidy", "Submit documents", "Receive subsidized seeds"]'::jsonb,
  '[{"url": "https://krishi.bih.nic.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What seeds are provided?", "answer": "Quality certified seeds of various crops are provided at subsidized rates under Bihar Beej Yojana."}, {"question": "What is the subsidy?", "answer": "Subsidy up to 50% is provided on seed cost depending on crop and category of farmer."}]'::jsonb,
  'en',
  'bihar-beej-yojana'
),

-- 34. Punjab Crop Diversification
(
  'Punjab Crop Diversification',
  'Crop diversification support',
  'Punjab Crop Diversification scheme encourages farmers to shift from water-intensive paddy cultivation to alternative crops. It provides financial incentives and support for crop diversification.',
  'Crop Development',
  'Punjab',
  '🌾',
  '["Financial incentives", "Crop diversification support", "Water conservation", "Alternative crop support", "Reduced input costs"]'::jsonb,
  '["Farmers in Punjab", "Farmers growing paddy", "Willing to diversify crops"]'::jsonb,
  '["Aadhaar card", "Land records", "Bank account details", "Crop details"]'::jsonb,
  '["Apply for crop diversification", "Select alternative crops", "Submit application", "Receive financial incentives"]'::jsonb,
  '[{"url": "https://agripunjab.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What is the purpose?", "answer": "Punjab Crop Diversification encourages farmers to shift from water-intensive paddy to alternative crops to conserve water and improve sustainability."}, {"question": "What incentives are provided?", "answer": "Financial incentives are provided to farmers who diversify from paddy to alternative crops like maize, cotton, and others."}]'::jsonb,
  'en',
  'punjab-crop-diversification'
),

-- 35. Assam Chief Minister Samagra Gramya
(
  'Assam Chief Minister Samagra Gramya',
  'Rural agri support',
  'Assam Chief Minister Samagra Gramya provides comprehensive support for rural agriculture development including infrastructure, inputs, and financial assistance.',
  'Rural Development',
  'Assam',
  '🌾',
  '["Rural development support", "Agricultural infrastructure", "Input assistance", "Financial aid"]'::jsonb,
  '["Farmers in Assam", "Rural farmers", "Must be registered"]'::jsonb,
  '["Aadhaar card", "Bank account details", "Land records", "ID proof"]'::jsonb,
  '["Register on Assam agriculture portal", "Apply for scheme benefits", "Submit documents", "Receive support"]'::jsonb,
  '[{"url": "https://diragri.assam.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What support is provided?", "answer": "Assam Chief Minister Samagra Gramya provides comprehensive support for rural agriculture development."}]'::jsonb,
  'en',
  'assam-samagra-gramya'
),

-- 36. Kerala Karshaka Kshema
(
  'Kerala Karshaka Kshema',
  'Farmer welfare',
  'Kerala Karshaka Kshema provides pension and welfare support to farmers in Kerala. It includes pension scheme and various welfare measures for farmers.',
  'Pension',
  'Kerala',
  '👴',
  '["Pension support", "Welfare measures", "Financial assistance", "Social security"]'::jsonb,
  '["Farmers in Kerala", "Eligible age farmers", "Must be registered"]'::jsonb,
  '["Aadhaar card", "Bank account details", "Age proof", "Farmer registration"]'::jsonb,
  '["Register on Kerala agriculture portal", "Apply for pension", "Submit documents", "Receive pension"]'::jsonb,
  '[{"url": "https://keralaagriculture.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What is provided?", "answer": "Kerala Karshaka Kshema provides pension and welfare support to eligible farmers in Kerala."}]'::jsonb,
  'en',
  'kerala-karshaka-kshema'
),

-- 37. Tamil Nadu Uzhavar Pathukappu Thittam
(
  'Uzhavar Pathukappu Thittam',
  'Farmer insurance',
  'Uzhavar Pathukappu Thittam provides insurance coverage to farmers in Tamil Nadu. It covers life insurance and accident insurance for farmers.',
  'Insurance',
  'Tamil Nadu',
  '🛡️',
  '["Life insurance coverage", "Accident insurance", "Financial security", "Family protection"]'::jsonb,
  '["Farmers in Tamil Nadu", "Age 18-70 years", "Must be registered"]'::jsonb,
  '["Aadhaar card", "Bank account details", "Age proof", "Farmer registration"]'::jsonb,
  '["Register on Tamil Nadu agriculture portal", "Apply for insurance", "Submit documents", "Get insurance coverage"]'::jsonb,
  '[{"url": "https://tnagrisnet.tn.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What insurance is provided?", "answer": "Uzhavar Pathukappu Thittam provides life insurance and accident insurance coverage to farmers."}, {"question": "What is coverage amount?", "answer": "Insurance coverage amount varies, typically Rs. 2-5 lakh for life insurance and accident coverage."}]'::jsonb,
  'en',
  'uzhavar-pathukappu'
),

-- 38. Mukhyamantri Krishi Sinchai (Madhya Pradesh)
(
  'Mukhyamantri Krishi Sinchai',
  'Irrigation aid',
  'Mukhyamantri Krishi Sinchai provides support for irrigation infrastructure and water management in Madhya Pradesh. It includes farm ponds, wells, and micro-irrigation support.',
  'Irrigation',
  'Madhya Pradesh',
  '💧',
  '["Irrigation infrastructure support", "Farm pond assistance", "Micro-irrigation subsidy", "Water management", "Increased productivity"]'::jsonb,
  '["Farmers in Madhya Pradesh", "Landholding farmers", "Must be registered"]'::jsonb,
  '["Aadhaar card", "Land records", "Bank account details", "Project proposal"]'::jsonb,
  '["Contact agriculture department", "Submit irrigation project proposal", "Get technical approval", "Implement project", "Receive subsidy"]'::jsonb,
  '[{"url": "https://mpkrishi.mp.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What support is provided?", "answer": "Mukhyamantri Krishi Sinchai provides support for irrigation infrastructure including farm ponds, wells, and micro-irrigation."}, {"question": "What is the subsidy?", "answer": "Subsidy up to 50-55% is provided for irrigation infrastructure depending on type and category of farmer."}]'::jsonb,
  'en',
  'mukhyamantri-krishi-sinchai'
),

-- 39. Bhavantar Yojana MP
(
  'Bhavantar Yojana MP',
  'Price deficiency support',
  'Bhavantar Yojana MP compensates farmers for price difference between MSP and market price for notified crops in Madhya Pradesh. It ensures farmers get fair price.',
  'Price Support',
  'Madhya Pradesh',
  '💲',
  '["Price difference compensation", "MSP protection", "Fair price assurance", "Direct benefit transfer"]'::jsonb,
  '["Farmers growing notified crops", "Farmers in Madhya Pradesh", "Must sell in notified mandis"]'::jsonb,
  '["Aadhaar card", "Bank account details", "Sale receipt", "Crop details", "Land records"]'::jsonb,
  '["Grow notified crops", "Sell in notified mandi", "Get sale receipt", "Register sale", "Receive price difference"]'::jsonb,
  '[{"url": "https://mpkrishi.mp.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What crops are covered?", "answer": "Notified crops like soybean, urad, moong, and others are covered under Bhavantar Yojana MP."}, {"question": "How is compensation calculated?", "answer": "Compensation is the difference between MSP and actual market price, paid directly to farmer''s account."}]'::jsonb,
  'en',
  'bhavantar-mp'
),

-- 40. Rajiv Gandhi Kisan Nyay Yojana (Chhattisgarh)
(
  'Rajiv Gandhi Kisan Nyay Yojana',
  'Income support',
  'Rajiv Gandhi Kisan Nyay Yojana provides income support to farmers in Chhattisgarh. It includes direct financial assistance and support for agricultural activities.',
  'Income Support',
  'Chhattisgarh',
  '💰',
  '["Income support", "Financial assistance", "Direct benefit transfer", "Agricultural support"]'::jsonb,
  '["Farmers in Chhattisgarh", "Landholding farmers", "Must be registered"]'::jsonb,
  '["Aadhaar card", "Bank account details", "Land records", "Farmer registration"]'::jsonb,
  '["Register on Chhattisgarh agriculture portal", "Apply for scheme", "Submit documents", "Receive income support"]'::jsonb,
  '[{"url": "https://agriportal.cg.nic.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What support is provided?", "answer": "Rajiv Gandhi Kisan Nyay Yojana provides income support and financial assistance to farmers in Chhattisgarh."}, {"question": "Who is eligible?", "answer": "All registered landholding farmers in Chhattisgarh are eligible for the scheme."}]'::jsonb,
  'en',
  'rajiv-gandhi-kisan-nyay'
),

-- 41. Annadata Sukhibhava (Andhra Pradesh)
(
  'Annadata Sukhibhava',
  'Income aid',
  'Annadata Sukhibhava provides financial assistance to farmers in Andhra Pradesh. It supports farmers with direct income support and agricultural input assistance.',
  'Income Support',
  'Andhra Pradesh',
  '💰',
  '["Financial assistance", "Income support", "Input assistance", "Direct benefit transfer"]'::jsonb,
  '["Farmers in Andhra Pradesh", "Landholding farmers", "Must be registered"]'::jsonb,
  '["Aadhaar card", "Bank account details", "Land records", "Farmer registration"]'::jsonb,
  '["Register on Andhra Pradesh agriculture portal", "Apply for scheme", "Submit documents", "Receive financial assistance"]'::jsonb,
  '[{"url": "https://apagrisnet.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What assistance is provided?", "answer": "Annadata Sukhibhava provides financial assistance and income support to farmers in Andhra Pradesh."}]'::jsonb,
  'en',
  'annadata-sukhibhava'
),

-- 42. National Mission for Sustainable Agriculture - Rainfed Area Development (NMSA-RAD)
(
  'National Mission for Sustainable Agriculture - Rainfed Area Development',
  'Rainfed agriculture development',
  'NMSA-RAD focuses on integrated farming systems, soil health management, and water harvesting in rainfed areas. It promotes sustainable agriculture practices in areas dependent on rainfall.',
  'Agriculture Development',
  NULL,
  '🌧️',
  '["Integrated farming systems", "Soil health management", "Water harvesting", "Sustainable practices", "Productivity enhancement"]'::jsonb,
  '["Farmers in rainfed areas", "Farmers dependent on rainfall", "Small and marginal farmers"]'::jsonb,
  '["Aadhaar card", "Land records", "Project proposal", "Bank account details"]'::jsonb,
  '["Contact agriculture department", "Submit project proposal", "Get technical approval", "Implement practices", "Receive support"]'::jsonb,
  '[{"url": "https://nmsa.dac.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What is rainfed agriculture?", "answer": "Rainfed agriculture depends on rainfall for crop production, without irrigation facilities."}, {"question": "What support is provided?", "answer": "NMSA-RAD provides support for integrated farming, soil health, water harvesting, and sustainable practices in rainfed areas."}]'::jsonb,
  'en',
  'nmsa-rad'
),

-- 43. Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan (PM-KUSUM)
(
  'Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan (PM-KUSUM)',
  'Solar power for farmers',
  'PM-KUSUM aims to provide financial and water security to farmers through solar power generation. It includes solar pumps, grid-connected solar plants, and solarization of existing pumps.',
  'Irrigation',
  NULL,
  '☀️',
  '["Solar pump installation", "Grid-connected solar plants", "Solarization of existing pumps", "Reduced electricity costs", "Additional income from power sale"]'::jsonb,
  '["Farmers with agricultural connections", "Farmers willing to install solar", "Landholding farmers"]'::jsonb,
  '["Aadhaar card", "Land records", "Electricity connection details", "Bank account details", "Project proposal"]'::jsonb,
  '["Apply for PM-KUSUM scheme", "Get technical approval", "Install solar system", "Get subsidy", "Start generating power"]'::jsonb,
  '[{"url": "https://pmkusum.mnre.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What is PM-KUSUM?", "answer": "PM-KUSUM provides solar power solutions to farmers including solar pumps and grid-connected solar plants."}, {"question": "What is the subsidy?", "answer": "Subsidy up to 60% is provided for solar pump installation, with balance through bank loan."}]'::jsonb,
  'en',
  'pm-kusum'
),

-- 44. National Mission on Micro Irrigation (NMMI)
(
  'National Mission on Micro Irrigation',
  'Micro-irrigation promotion',
  'NMMI promotes micro-irrigation (drip and sprinkler) to improve water use efficiency and crop productivity. It provides financial assistance for installation of micro-irrigation systems.',
  'Irrigation',
  NULL,
  '💧',
  '["55% subsidy for micro-irrigation", "Water use efficiency", "Increased productivity", "Reduced water consumption", "Drip and sprinkler support"]'::jsonb,
  '["Farmers with cultivable land", "Farmers willing to adopt micro-irrigation", "Small and marginal farmers"]'::jsonb,
  '["Aadhaar card", "Land records", "Bank account details", "Project proposal", "Technical feasibility"]'::jsonb,
  '["Contact agriculture department", "Submit micro-irrigation application", "Get technical approval", "Install system", "Receive subsidy"]'::jsonb,
  '[{"url": "https://pmksy.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What is micro-irrigation?", "answer": "Micro-irrigation includes drip and sprinkler systems that deliver water directly to plant roots, saving water."}, {"question": "What is the subsidy?", "answer": "55% subsidy is provided for micro-irrigation systems, with higher subsidy for small and marginal farmers."}]'::jsonb,
  'en',
  'nmmi'
),

-- 45. National Mission on Agricultural Extension and Technology (NMAET)
(
  'National Mission on Agricultural Extension and Technology',
  'Agricultural extension and technology transfer',
  'NMAET aims to strengthen agricultural extension services and transfer of technology to farmers. It includes training, demonstrations, and knowledge dissemination.',
  'Agriculture Development',
  NULL,
  '📚',
  '["Agricultural extension services", "Technology transfer", "Training and capacity building", "Demonstrations", "Knowledge dissemination"]'::jsonb,
  '["All farmers", "FPOs and cooperatives", "Extension workers", "Agriculture departments"]'::jsonb,
  '["Aadhaar card", "Farmer registration", "Bank account details"]'::jsonb,
  '["Contact agriculture extension office", "Participate in training programs", "Attend demonstrations", "Adopt new technologies"]'::jsonb,
  '[{"url": "https://nmaet.dac.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What is agricultural extension?", "answer": "Agricultural extension involves transferring knowledge and technology from research institutions to farmers."}, {"question": "What services are provided?", "answer": "NMAET provides training, demonstrations, technology transfer, and extension services to farmers."}]'::jsonb,
  'en',
  'nmaet'
),

-- 46. National Mission on Seed and Planting Material (NMSPM)
(
  'National Mission on Seed and Planting Material',
  'Quality seed production and distribution',
  'NMSPM aims to ensure availability of quality seeds and planting material to farmers. It supports seed production, certification, and distribution infrastructure.',
  'Seed Support',
  NULL,
  '🌱',
  '["Quality seed availability", "Seed production support", "Certification assistance", "Distribution infrastructure", "Improved productivity"]'::jsonb,
  '["Seed producers", "Farmers", "Seed companies", "FPOs and cooperatives"]'::jsonb,
  '["Aadhaar card", "Land records", "Seed production license", "Bank account details"]'::jsonb,
  '["Register for seed production", "Get certification", "Produce quality seeds", "Distribute to farmers"]'::jsonb,
  '[{"url": "https://seednet.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What is the purpose?", "answer": "NMSPM ensures availability of quality seeds and planting material to farmers for improved crop productivity."}, {"question": "What support is provided?", "answer": "Support is provided for seed production, certification, and distribution infrastructure."}]'::jsonb,
  'en',
  'nmspm'
),

-- 47. National Mission on Agricultural Marketing (NMAM)
(
  'National Mission on Agricultural Marketing',
  'Agricultural marketing infrastructure',
  'NMAM aims to develop agricultural marketing infrastructure and promote direct marketing. It includes market infrastructure, e-marketing, and farmer-producer linkages.',
  'Market Access',
  NULL,
  '🏪',
  '["Market infrastructure development", "E-marketing platforms", "Farmer-producer linkages", "Reduced marketing costs", "Better price realization"]'::jsonb,
  '["Farmers", "FPOs and cooperatives", "Traders", "Market committees"]'::jsonb,
  '["Aadhaar card", "Bank account details", "Project proposal", "Market registration"]'::jsonb,
  '["Contact agriculture marketing department", "Submit project proposal", "Get approval", "Develop infrastructure", "Start marketing"]'::jsonb,
  '[{"url": "https://agmarknet.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What infrastructure is developed?", "answer": "NMAM develops market infrastructure including market yards, storage facilities, and e-marketing platforms."}, {"question": "What is the benefit?", "answer": "Better market infrastructure helps farmers get better prices and reduces marketing costs."}]'::jsonb,
  'en',
  'nmam'
),

-- 48. National Mission on Oil Palm (NMOP)
(
  'National Mission on Oil Palm',
  'Oil palm cultivation promotion',
  'NMOP promotes oil palm cultivation to reduce import dependency on edible oils. It provides financial assistance for oil palm plantation, processing, and market development.',
  'Crop Production',
  NULL,
  '🌴',
  '["Oil palm plantation support", "Processing infrastructure", "Market linkage", "Technology support", "Income enhancement"]'::jsonb,
  '["Farmers in suitable areas", "FPOs and cooperatives", "Entrepreneurs", "State governments"]'::jsonb,
  '["Aadhaar card", "Land records", "Bank account details", "Project proposal", "Suitability certificate"]'::jsonb,
  '["Check land suitability", "Submit project proposal", "Get technical approval", "Plant oil palm", "Receive financial assistance"]'::jsonb,
  '[{"url": "https://nmeo-op.dac.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What is oil palm?", "answer": "Oil palm is a high-yielding oil crop that produces palm oil, used in cooking and industries."}, {"question": "What areas are suitable?", "answer": "Areas with adequate rainfall and suitable climate in states like Andhra Pradesh, Telangana are suitable."}]'::jsonb,
  'en',
  'nmop'
),

-- 49. National Mission on Protein Supplements (NMPS)
(
  'National Mission on Protein Supplements',
  'Pulses and oilseeds production',
  'NMPS aims to increase production of pulses and oilseeds to meet protein requirements. It provides support for area expansion, productivity enhancement, and processing.',
  'Crop Production',
  NULL,
  '🥜',
  '["Area expansion support", "Productivity enhancement", "Processing infrastructure", "Market linkage", "Protein security"]'::jsonb,
  '["Farmers growing pulses and oilseeds", "FPOs and cooperatives", "Processing units"]'::jsonb,
  '["Aadhaar card", "Land records", "Crop details", "Bank account details"]'::jsonb,
  '["Register with agriculture department", "Apply for NMPS benefits", "Receive improved seeds", "Follow recommended practices"]'::jsonb,
  '[{"url": "https://nfsm.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What crops are covered?", "answer": "Pulses (gram, tur, moong, urad, lentil) and oilseeds (groundnut, mustard, soybean) are covered."}, {"question": "What is the objective?", "answer": "NMPS aims to increase production of pulses and oilseeds to meet protein requirements and reduce import dependency."}]'::jsonb,
  'en',
  'nmps'
),

-- 50. National Mission on Agricultural Biosecurity (NMAB)
(
  'National Mission on Agricultural Biosecurity',
  'Protecting crops from pests and diseases',
  'NMAB aims to protect crops from pests, diseases, and invasive species. It includes surveillance, early warning systems, and pest management support.',
  'Crop Protection',
  NULL,
  '🛡️',
  '["Pest and disease surveillance", "Early warning systems", "Pest management support", "Crop protection", "Reduced crop losses"]'::jsonb,
  '["All farmers", "Agriculture departments", "Research institutions", "Extension workers"]'::jsonb,
  '["Aadhaar card", "Farmer registration", "Crop details"]'::jsonb,
  '["Register for surveillance", "Report pest/disease incidence", "Get early warnings", "Follow management practices", "Receive support"]'::jsonb,
  '[{"url": "https://ppqs.gov.in/", "label": "Official Website"}]'::jsonb,
  '[{"question": "What is agricultural biosecurity?", "answer": "Agricultural biosecurity involves protecting crops from pests, diseases, and invasive species."}, {"question": "What support is provided?", "answer": "NMAB provides surveillance, early warning systems, and pest management support to protect crops."}]'::jsonb,
  'en',
  'nmab'
);
