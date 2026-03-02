export const CROP_DATABASE = [
  {
    "id": 1,
    "name": "Wheat",
    "icon": "🌾",
    "category": "Cereal",
    "growthDays": 120,
    "description": "Wheat stands out as a prominent cereal-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 10-25°C combined with 75-100cm of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Rust (Brown, Yellow, Black) and Loose Smut and Powdery Mildew. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Rust (Brown, Yellow, Black)",
      "Loose Smut",
      "Powdery Mildew"
    ],
    "diseaseManagement": "Use resistant varieties like HD-2967. Seed treatment with Vitavax for Smut. Apply Propiconazole for fungal issues.",
    "varieties": [
      "HD 2967",
      "PBW 343",
      "DBW 187",
      "Wh 147"
    ],
    "climate": {
      "temperature": "10-25°C",
      "rainfall": "75-100cm"
    },
    "irrigationDetails": "Requires 4-6 irrigations. Critical stages: CRI (21 days), Tillering, Flowering, and Grain Filling.",
    "avgPrice": 2275,
    "image": "https://picsum.photos/seed/Wheat/400/300",
    "interCrops": [
      "Mustard",
      "Gram",
      "Peas"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 350,
      "max": 500
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 120:60:40 kg per hectare.",
    "pests": "Aphids, Armyworm",
    "harvest": "After about 120 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Oct–Dec (rabi) or Jun–Jul (kharif) depending on crop",
    "n_ratio_kg_per_hectare": 120,
    "p_ratio_kg_per_hectare": 60,
    "k_ratio_kg_per_hectare": 40,
    "n_ratio_kg_per_acre": 48.56,
    "p_ratio_kg_per_acre": 24.28,
    "k_ratio_kg_per_acre": 16.19,
    "seed_rate_kg_per_hectare": 100,
    "seed_rate_kg_per_acre": 40.47,
    "avg_yield_kg_per_hectare": 4000,
    "avg_yield_kg_per_acre": 1618.8,
    "planting_density_per_acre": 200000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 120:60:40 kg per hectare."
    }
  },
  {
    "id": 2,
    "name": "Rice",
    "icon": "🌾",
    "category": "Cereal",
    "growthDays": 150,
    "description": "Rice is a highly valued cereal crop cultivated across various regions. It achieves optimal growth at temperatures around 20-35°C combined with 100-200cm of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Blast and Bacterial Leaf Blight and Brown Spot and Sheath Blight. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Blast",
      "Bacterial Leaf Blight",
      "Brown Spot",
      "Sheath Blight"
    ],
    "diseaseManagement": "Use Tricyclazole for Blast. Balanced NPK usage. Drain water for Bacterial Blight.",
    "varieties": [
      "Basmati 370",
      "IR-64",
      "Swarna",
      "MTU 7029"
    ],
    "climate": {
      "temperature": "20-35°C",
      "rainfall": "100-200cm"
    },
    "irrigationDetails": "Continuous submergence or alternate wetting and drying. Critical stages: Tillering, Panicle Initiation, Flowering.",
    "avgPrice": 2200,
    "image": "https://picsum.photos/seed/Rice/400/300",
    "interCrops": [
      "Black Gram",
      "Green Gram"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 900,
      "max": 2500
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 100:50:50 kg per hectare.",
    "pests": "Stem Borer, Leaf Folder",
    "harvest": "After about 150 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Oct–Dec (rabi) or Jun–Jul (kharif) depending on crop",
    "n_ratio_kg_per_hectare": 100,
    "p_ratio_kg_per_hectare": 50,
    "k_ratio_kg_per_hectare": 50,
    "n_ratio_kg_per_acre": 40.47,
    "p_ratio_kg_per_acre": 20.23,
    "k_ratio_kg_per_acre": 20.23,
    "seed_rate_kg_per_hectare": 40,
    "seed_rate_kg_per_acre": 16.19,
    "avg_yield_kg_per_hectare": 5000,
    "avg_yield_kg_per_acre": 2023.5,
    "planting_density_per_acre": 200000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 100:50:50 kg per hectare."
    }
  },
  {
    "id": 3,
    "name": "Maize (Corn)",
    "icon": "🌽",
    "category": "Cereal",
    "growthDays": 110,
    "description": "Farmers widely cultivate Maize (Corn) as a standard cereal crop bringing steady economic returns. It achieves optimal growth at temperatures around 18-27°C combined with 50-100cm of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Blight and Downy Mildew and Stalk Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Leaf Blight",
      "Downy Mildew",
      "Stalk Rot"
    ],
    "diseaseManagement": "Use resistant hybrids. Seed treatment with Thiram. Spray Mancozeb for blight.",
    "varieties": [
      "Ganga Safed-2",
      "Deccan-103",
      "HQPM-1"
    ],
    "climate": {
      "temperature": "18-27°C",
      "rainfall": "50-100cm"
    },
    "irrigationDetails": "Irrigate at critical stages: Knee high, Tasseling, Silking, and Grain Formation. Ensure no waterlogging.",
    "avgPrice": 2100,
    "image": "https://picsum.photos/seed/Maize(Corn)/400/300",
    "interCrops": [
      "Soybean",
      "Cowpea",
      "Groundnut"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 500,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 120:60:40 kg per hectare.",
    "pests": "Stem Borer, Fall Armyworm",
    "harvest": "After about 110 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Oct–Dec (rabi) or Jun–Jul (kharif) depending on crop",
    "n_ratio_kg_per_hectare": 120,
    "p_ratio_kg_per_hectare": 60,
    "k_ratio_kg_per_hectare": 40,
    "n_ratio_kg_per_acre": 48.56,
    "p_ratio_kg_per_acre": 24.28,
    "k_ratio_kg_per_acre": 16.19,
    "seed_rate_kg_per_hectare": 20,
    "seed_rate_kg_per_acre": 8.09,
    "avg_yield_kg_per_hectare": 3500,
    "avg_yield_kg_per_acre": 1416.45,
    "planting_density_per_acre": 200000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 120:60:40 kg per hectare."
    }
  },
  {
    "id": 4,
    "name": "Barley",
    "icon": "🌾",
    "category": "Cereal",
    "growthDays": 100,
    "description": "Farmers widely cultivate Barley as a standard cereal crop bringing steady economic returns. It achieves optimal growth at temperatures around 12-25°C combined with 20-40cm of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Stripe Rust and Covered Smut and Termites. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Stripe Rust",
      "Covered Smut",
      "Termites"
    ],
    "diseaseManagement": "Seed treatment with Bavistin. Resistant varieties for rust. Chlorpyriphos for termites.",
    "varieties": [
      "RD 2552",
      "BH 902",
      "PL 426"
    ],
    "climate": {
      "temperature": "12-25°C",
      "rainfall": "20-40cm"
    },
    "irrigationDetails": "Requires 2-3 irrigations. Critical stages: Active Tillering, Flag Leaf, Milking.",
    "avgPrice": 1850,
    "image": "https://picsum.photos/seed/Barley/400/300",
    "interCrops": [
      "Mustard",
      "Lentil"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 450
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 60:30:20 kg per hectare.",
    "pests": "Aphids",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Oct–Dec (rabi) or Jun–Jul (kharif) depending on crop",
    "n_ratio_kg_per_hectare": 60,
    "p_ratio_kg_per_hectare": 30,
    "k_ratio_kg_per_hectare": 20,
    "n_ratio_kg_per_acre": 24.28,
    "p_ratio_kg_per_acre": 12.14,
    "k_ratio_kg_per_acre": 8.09,
    "seed_rate_kg_per_hectare": 100,
    "seed_rate_kg_per_acre": 40.47,
    "avg_yield_kg_per_hectare": 3000,
    "avg_yield_kg_per_acre": 1214.1,
    "planting_density_per_acre": 200000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 60:30:20 kg per hectare."
    }
  },
  {
    "id": 5,
    "name": "Bajra (Pearl Millet)",
    "icon": "🌾",
    "category": "Millet",
    "growthDays": 95,
    "description": "Farmers widely cultivate Bajra (Pearl Millet) as a standard millet crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with 40-60cm of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Downy Mildew and Ergot and Smut. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Downy Mildew",
      "Ergot",
      "Smut"
    ],
    "diseaseManagement": "Remove affected plants (Roguing). Seed treatment with Apron SD-35. Crop rotation.",
    "varieties": [
      "HHB 67",
      "ICMH 356",
      "Pusa 23"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "40-60cm"
    },
    "irrigationDetails": "Mostly rainfed. If needed, irrigate at Tillering and Flowering stages.",
    "avgPrice": 2500,
    "image": "https://picsum.photos/seed/Bajra(PearlMillet)/400/300",
    "interCrops": [
      "Cluster Bean",
      "Moth Bean",
      "Green Gram"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 250,
      "max": 400
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Apply NPK in the ratio of 40:20:20 kg/ha.",
    "pests": "Stem Borer",
    "harvest": "After about 95 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting varies by local regional climate. Often onset of monsoon.",
    "n_ratio_kg_per_hectare": 40,
    "p_ratio_kg_per_hectare": 20,
    "k_ratio_kg_per_hectare": 20,
    "n_ratio_kg_per_acre": 16.19,
    "p_ratio_kg_per_acre": 8.09,
    "k_ratio_kg_per_acre": 8.09,
    "seed_rate_kg_per_hectare": 5,
    "seed_rate_kg_per_acre": 2.02,
    "avg_yield_kg_per_hectare": 1800,
    "avg_yield_kg_per_acre": 728.46,
    "planting_density_per_acre": 100000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 40:20:20 kg per hectare."
    }
  },
  {
    "id": 6,
    "name": "Ragi (Finger Millet)",
    "icon": "🌾",
    "category": "Millet",
    "growthDays": 110,
    "description": "Ragi (Finger Millet) is a highly valued millet crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with 50-100cm of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Blast and Mosaic Virus. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Blast",
      "Mosaic Virus"
    ],
    "diseaseManagement": "Use resistant varieties like GPU-28. Seed treatment with Carbendazim. Spray Mancozeb for Blast.",
    "varieties": [
      "GPU 28",
      "Indaf 9",
      "ML-365",
      "GPU 67"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "50-100cm"
    },
    "irrigationDetails": "Rainfed crop. If available, irrigate during tillering and flowering.",
    "avgPrice": 3500,
    "image": "https://picsum.photos/seed/Ragi(FingerMillet)/400/300",
    "interCrops": [
      "Groundnut",
      "Pulses",
      "Niger"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Apply NPK in the ratio of 40:20:20 kg/ha.",
    "pests": "Shoot Fly",
    "harvest": "After about 110 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting varies by local regional climate. Often onset of monsoon.",
    "n_ratio_kg_per_hectare": 40,
    "p_ratio_kg_per_hectare": 20,
    "k_ratio_kg_per_hectare": 20,
    "n_ratio_kg_per_acre": 16.19,
    "p_ratio_kg_per_acre": 8.09,
    "k_ratio_kg_per_acre": 8.09,
    "seed_rate_kg_per_hectare": 10,
    "seed_rate_kg_per_acre": 4.05,
    "avg_yield_kg_per_hectare": 2000,
    "avg_yield_kg_per_acre": 809.4,
    "planting_density_per_acre": 100000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 40:20:20 kg per hectare."
    }
  },
  {
    "id": 7,
    "name": "Gram (Chickpea)",
    "icon": "🫘",
    "category": "Pulse",
    "growthDays": 120,
    "description": "Gram (Chickpea) is a highly valued pulse crop cultivated across various regions. It achieves optimal growth at temperatures around 15-25°C combined with 40-60cm of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Wilt and Ascochyta Blight and Dry Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Wilt",
      "Ascochyta Blight",
      "Dry Root Rot"
    ],
    "diseaseManagement": "Deep ploughing in summer. Seed treatment with Trichoderma. Use wilt-resistant varieties like JG-16.",
    "varieties": [
      "GNG 1581",
      "JG 16",
      "Digvijay",
      "Jaki 9218"
    ],
    "climate": {
      "temperature": "15-25°C",
      "rainfall": "40-60cm"
    },
    "irrigationDetails": "One irrigation at branching and one at pod formation. Avoid over-watering.",
    "avgPrice": 5300,
    "image": "https://picsum.photos/seed/Gram(Chickpea)/400/300",
    "interCrops": [
      "Mustard",
      "Wheat",
      "Linseed"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 250,
      "max": 400
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 20:40:20 kg per hectare.",
    "pests": "Pod Borer",
    "harvest": "After about 120 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Jun–Jul or Oct–Dec depending on region",
    "n_ratio_kg_per_hectare": 20,
    "p_ratio_kg_per_hectare": 40,
    "k_ratio_kg_per_hectare": 20,
    "n_ratio_kg_per_acre": 8.09,
    "p_ratio_kg_per_acre": 16.19,
    "k_ratio_kg_per_acre": 8.09,
    "seed_rate_kg_per_hectare": 75,
    "seed_rate_kg_per_acre": 30.35,
    "avg_yield_kg_per_hectare": 1200,
    "avg_yield_kg_per_acre": 485.64,
    "planting_density_per_acre": 80000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 20:40:20 kg per hectare."
    }
  },
  {
    "id": 8,
    "name": "Tur (Pigeon Pea)",
    "icon": "🫘",
    "category": "Pulse",
    "growthDays": 150,
    "description": "Farmers widely cultivate Tur (Pigeon Pea) as a standard pulse crop bringing steady economic returns. It achieves optimal growth at temperatures around 25-35°C combined with 60-100cm of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Wilt (Fusarium) and Sterility Mosaic and Phytophthora Blight. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Wilt (Fusarium)",
      "Sterility Mosaic",
      "Phytophthora Blight"
    ],
    "diseaseManagement": "Use resistant varieties like BSMR-736. Avoid water stagnation. Soil application of Trichoderma.",
    "varieties": [
      "ICPL 87",
      "BDN 711",
      "Maruti",
      "BSMR 853"
    ],
    "climate": {
      "temperature": "25-35°C",
      "rainfall": "60-100cm"
    },
    "irrigationDetails": "Critical stages: Flower bud initiation and Pod development.",
    "avgPrice": 6600,
    "image": "https://picsum.photos/seed/Tur(PigeonPea)/400/300",
    "interCrops": [
      "Sorghum",
      "Pearl Millet",
      "Soybean",
      "Cotton"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 600,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 20:50:20 kg per hectare.",
    "pests": "Pod Borer",
    "harvest": "After about 150 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Jun–Jul or Oct–Dec depending on region",
    "n_ratio_kg_per_hectare": 20,
    "p_ratio_kg_per_hectare": 50,
    "k_ratio_kg_per_hectare": 20,
    "n_ratio_kg_per_acre": 8.09,
    "p_ratio_kg_per_acre": 20.23,
    "k_ratio_kg_per_acre": 8.09,
    "seed_rate_kg_per_hectare": 15,
    "seed_rate_kg_per_acre": 6.07,
    "avg_yield_kg_per_hectare": 1300,
    "avg_yield_kg_per_acre": 526.11,
    "planting_density_per_acre": 80000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 20:50:20 kg per hectare."
    }
  },
  {
    "id": 9,
    "name": "Moong (Green Gram)",
    "icon": "🫘",
    "category": "Pulse",
    "growthDays": 70,
    "description": "Farmers widely cultivate Moong (Green Gram) as a standard pulse crop bringing steady economic returns. It achieves optimal growth at temperatures around 25-35°C combined with 60-75cm of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Yellow Mosaic Virus and Leaf Spot and Powdery Mildew. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Yellow Mosaic Virus",
      "Leaf Spot",
      "Powdery Mildew"
    ],
    "diseaseManagement": "Grow YMV resistant varieties. Control whitefly vector with Imidacloprid. Seed treatment.",
    "varieties": [
      "Samrat",
      "Pusa Vishal",
      "SML 668",
      "Kopergaon"
    ],
    "climate": {
      "temperature": "25-35°C",
      "rainfall": "60-75cm"
    },
    "irrigationDetails": "Requires 2-3 irrigations if no rain. Avoid water stress at pod filling.",
    "avgPrice": 7500,
    "image": "https://picsum.photos/seed/Moong(GreenGram)/400/300",
    "interCrops": [
      "Sugarcane",
      "Sunflower",
      "Maize"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 500
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 20:40:20 kg per hectare.",
    "pests": "Pod Borer",
    "harvest": "After about 70 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Jun–Jul or Oct–Dec depending on region",
    "n_ratio_kg_per_hectare": 20,
    "p_ratio_kg_per_hectare": 40,
    "k_ratio_kg_per_hectare": 20,
    "n_ratio_kg_per_acre": 8.09,
    "p_ratio_kg_per_acre": 16.19,
    "k_ratio_kg_per_acre": 8.09,
    "seed_rate_kg_per_hectare": 15,
    "seed_rate_kg_per_acre": 6.07,
    "avg_yield_kg_per_hectare": 900,
    "avg_yield_kg_per_acre": 364.23,
    "planting_density_per_acre": 80000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 20:40:20 kg per hectare."
    }
  },
  {
    "id": 10,
    "name": "Urad (Black Gram)",
    "icon": "🫘",
    "category": "Pulse",
    "growthDays": 80,
    "description": "Urad (Black Gram) stands out as a prominent pulse-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 25-30°C combined with 60-75cm of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Powdery Mildew and Leaf Crinkle and Leaf Spot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Powdery Mildew",
      "Leaf Crinkle",
      "Leaf Spot"
    ],
    "diseaseManagement": "Spray Wettable Sulphur for mildew. Use certified disease-free seeds.",
    "varieties": [
      "T-9",
      "TPU-4",
      "Pant U-31"
    ],
    "climate": {
      "temperature": "25-30°C",
      "rainfall": "60-75cm"
    },
    "irrigationDetails": "Irrigate at branching and pod filling stages.",
    "avgPrice": 6500,
    "image": "https://picsum.photos/seed/Urad(BlackGram)/400/300",
    "interCrops": [
      "Spring Sugarcane",
      "Maize"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 500
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 20:40:20 kg per hectare.",
    "pests": "Aphids",
    "harvest": "After about 80 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Jun–Jul or Oct–Dec depending on region",
    "n_ratio_kg_per_hectare": 20,
    "p_ratio_kg_per_hectare": 40,
    "k_ratio_kg_per_hectare": 20,
    "n_ratio_kg_per_acre": 8.09,
    "p_ratio_kg_per_acre": 16.19,
    "k_ratio_kg_per_acre": 8.09,
    "seed_rate_kg_per_hectare": 20,
    "seed_rate_kg_per_acre": 8.09,
    "avg_yield_kg_per_hectare": 950,
    "avg_yield_kg_per_acre": 384.47,
    "planting_density_per_acre": 80000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 20:40:20 kg per hectare."
    }
  },
  {
    "id": 11,
    "name": "Groundnut (Peanut)",
    "icon": "🥜",
    "category": "Oilseed",
    "growthDays": 130,
    "description": "Farmers widely cultivate Groundnut (Peanut) as a standard oilseed crop bringing steady economic returns. It achieves optimal growth at temperatures around 25-30°C combined with 50-100cm of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Tikka (Leaf Spot) and Rust and Collar Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Tikka (Leaf Spot)",
      "Rust",
      "Collar Rot"
    ],
    "diseaseManagement": "Seed treatment with Thiram. Spray Mancozeb for Tikka disease. Deep ploughing.",
    "varieties": [
      "TAG 24",
      "JL 24",
      "SB 11",
      "Kadiri-6"
    ],
    "climate": {
      "temperature": "25-30°C",
      "rainfall": "50-100cm"
    },
    "irrigationDetails": "Critical stages: Flowering, Pegging, and Pod development.",
    "avgPrice": 5800,
    "image": "https://picsum.photos/seed/Groundnut(Peanut)/400/300",
    "interCrops": [
      "Pigeon Pea",
      "Sunflower",
      "Castor"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 500,
      "max": 700
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 20:40:40 kg per hectare.",
    "pests": "Leaf Miner",
    "harvest": "After about 130 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Kharif (Jun-Jul) or Rabi (Oct-Nov) based on region",
    "n_ratio_kg_per_hectare": 20,
    "p_ratio_kg_per_hectare": 40,
    "k_ratio_kg_per_hectare": 40,
    "n_ratio_kg_per_acre": 8.09,
    "p_ratio_kg_per_acre": 16.19,
    "k_ratio_kg_per_acre": 16.19,
    "seed_rate_kg_per_hectare": 100,
    "seed_rate_kg_per_acre": 40.47,
    "avg_yield_kg_per_hectare": 2000,
    "avg_yield_kg_per_acre": 809.4,
    "planting_density_per_acre": 150000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 20:40:40 kg per hectare."
    }
  },
  {
    "id": 12,
    "name": "Mustard",
    "icon": "🌿",
    "category": "Oilseed",
    "growthDays": 110,
    "description": "Known for its excellent market demand, Mustard plays a crucial role in the oilseed sector. It achieves optimal growth at temperatures around 10-25°C combined with 35-45cm of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Alternaria Blight and White Rust and Downy Mildew. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Alternaria Blight",
      "White Rust",
      "Downy Mildew"
    ],
    "diseaseManagement": "Late sowing avoidance. Spray Mancozeb. Use resistant varieties.",
    "varieties": [
      "Pusa Bold",
      "Varuna",
      "Kranti",
      "RH 30"
    ],
    "climate": {
      "temperature": "10-25°C",
      "rainfall": "35-45cm"
    },
    "irrigationDetails": "Requires 2 irrigations: Flowering and Siliqua formation.",
    "avgPrice": 5000,
    "image": "https://picsum.photos/seed/Mustard/400/300",
    "interCrops": [
      "Chickpea",
      "Wheat",
      "Lentil"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 350,
      "max": 500
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 60:40:40 kg per hectare.",
    "pests": "Aphids",
    "harvest": "After about 110 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Kharif (Jun-Jul) or Rabi (Oct-Nov) based on region",
    "n_ratio_kg_per_hectare": 60,
    "p_ratio_kg_per_hectare": 40,
    "k_ratio_kg_per_hectare": 40,
    "n_ratio_kg_per_acre": 24.28,
    "p_ratio_kg_per_acre": 16.19,
    "k_ratio_kg_per_acre": 16.19,
    "seed_rate_kg_per_hectare": 5,
    "seed_rate_kg_per_acre": 2.02,
    "avg_yield_kg_per_hectare": 1800,
    "avg_yield_kg_per_acre": 728.46,
    "planting_density_per_acre": 150000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 60:40:40 kg per hectare."
    }
  },
  {
    "id": 13,
    "name": "Soybean",
    "icon": "🌱",
    "category": "Oilseed",
    "growthDays": 100,
    "description": "Soybean stands out as a prominent oilseed-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 26-30°C combined with 60-100cm of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Rust and Yellow Mosaic Virus and Collar Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Rust",
      "Yellow Mosaic Virus",
      "Collar Rot"
    ],
    "diseaseManagement": "Use rust-tolerant varieties. Manage whiteflies for YMV. Seed treatment.",
    "varieties": [
      "JS 335",
      "JS 93-05",
      "NRC 37"
    ],
    "climate": {
      "temperature": "26-30°C",
      "rainfall": "60-100cm"
    },
    "irrigationDetails": "Critical stages: Pod initiation and Grain filling.",
    "avgPrice": 4300,
    "image": "https://picsum.photos/seed/Soybean/400/300",
    "interCrops": [
      "Pigeon Pea",
      "Maize"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 450,
      "max": 700
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 30:60:40 kg per hectare.",
    "pests": "Stem Fly",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Kharif (Jun-Jul) or Rabi (Oct-Nov) based on region",
    "n_ratio_kg_per_hectare": 30,
    "p_ratio_kg_per_hectare": 60,
    "k_ratio_kg_per_hectare": 40,
    "n_ratio_kg_per_acre": 12.14,
    "p_ratio_kg_per_acre": 24.28,
    "k_ratio_kg_per_acre": 16.19,
    "seed_rate_kg_per_hectare": 75,
    "seed_rate_kg_per_acre": 30.35,
    "avg_yield_kg_per_hectare": 2200,
    "avg_yield_kg_per_acre": 890.34,
    "planting_density_per_acre": 150000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 30:60:40 kg per hectare."
    }
  },
  {
    "id": 14,
    "name": "Tomato",
    "icon": "🍅",
    "category": "Vegetable",
    "growthDays": 100,
    "description": "Tomato is a highly valued vegetable crop cultivated across various regions. It achieves optimal growth at temperatures around 20-25°C combined with 60-150cm of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Early Blight and Late Blight and Tomato Mosaic Virus and Wilt. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Early Blight",
      "Late Blight",
      "Tomato Mosaic Virus",
      "Wilt"
    ],
    "diseaseManagement": "Use disease-free seeds. Crop rotation. Copper fungicides for blights.",
    "varieties": [
      "Pusa Ruby",
      "Arka Vikas",
      "Roma",
      "Hybrid varieties"
    ],
    "climate": {
      "temperature": "20-25°C",
      "rainfall": "60-150cm"
    },
    "irrigationDetails": "Light and frequent irrigation. Avoid water stress during flowering and fruiting.",
    "avgPrice": 2000,
    "image": "https://picsum.photos/seed/Tomato/400/300",
    "interCrops": [
      "Marigold (Trap crop)",
      "Onion"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 600,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 120:80:60 kg per hectare.",
    "pests": "Fruit Borer",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Seasonal (varies) — often multiple windows",
    "n_ratio_kg_per_hectare": 120,
    "p_ratio_kg_per_hectare": 80,
    "k_ratio_kg_per_hectare": 60,
    "n_ratio_kg_per_acre": 48.56,
    "p_ratio_kg_per_acre": 32.38,
    "k_ratio_kg_per_acre": 24.28,
    "seed_rate_kg_per_hectare": 0.5,
    "seed_rate_kg_per_acre": 0.2,
    "avg_yield_kg_per_hectare": 30000,
    "avg_yield_kg_per_acre": 12141,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 120:80:60 kg per hectare."
    }
  },
  {
    "id": 15,
    "name": "Potato",
    "icon": "🥔",
    "category": "Vegetable",
    "growthDays": 120,
    "description": "Farmers widely cultivate Potato as a standard vegetable crop bringing steady economic returns. It achieves optimal growth at temperatures around 15-25°C combined with 50-75cm of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Late Blight and Early Blight and Scab. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Late Blight",
      "Early Blight",
      "Scab"
    ],
    "diseaseManagement": "Use certified seed tubers. Prophylactic spray of Mancozeb. Earthing up.",
    "varieties": [
      "Kufri Jyoti",
      "Kufri Chandramukhi",
      "Kufri Sindhuri"
    ],
    "climate": {
      "temperature": "15-25°C",
      "rainfall": "50-75cm"
    },
    "irrigationDetails": "Critical stages: Stolon formation and Tuber enlargement.",
    "avgPrice": 1500,
    "image": "https://picsum.photos/seed/Potato/400/300",
    "interCrops": [
      "Mustard",
      "Wheat"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 500,
      "max": 700
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 150:100:100 kg per hectare.",
    "pests": "Cutworm",
    "harvest": "After about 120 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Seasonal (varies) — often multiple windows",
    "n_ratio_kg_per_hectare": 150,
    "p_ratio_kg_per_hectare": 100,
    "k_ratio_kg_per_hectare": 100,
    "n_ratio_kg_per_acre": 60.7,
    "p_ratio_kg_per_acre": 40.47,
    "k_ratio_kg_per_acre": 40.47,
    "seed_rate_kg_per_hectare": 2000,
    "seed_rate_kg_per_acre": 809.4,
    "avg_yield_kg_per_hectare": 25000,
    "avg_yield_kg_per_acre": 10117.5,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 150:100:100 kg per hectare."
    }
  },
  {
    "id": 16,
    "name": "Onion",
    "icon": "🧅",
    "category": "Vegetable",
    "growthDays": 120,
    "description": "Onion stands out as a prominent vegetable-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 15-25°C combined with 75-100cm of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Purple Blotch and Downy Mildew and Smut. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Purple Blotch",
      "Downy Mildew",
      "Smut"
    ],
    "diseaseManagement": "Spray Mancozeb + Carbendazim. Proper curing after harvest.",
    "varieties": [
      "Nasik Red",
      "Pusa Red",
      "Arka Niketan"
    ],
    "climate": {
      "temperature": "15-25°C",
      "rainfall": "75-100cm"
    },
    "irrigationDetails": "Constant moisture required during bulb formation. Stop irrigation 10 days before harvest.",
    "avgPrice": 2500,
    "image": "https://picsum.photos/seed/Onion/400/300",
    "interCrops": [
      "Chilli",
      "Sugarcane"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 350,
      "max": 550
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 100:50:50 kg per hectare.",
    "pests": "Thrips",
    "harvest": "After about 120 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Seasonal (varies) — often multiple windows",
    "n_ratio_kg_per_hectare": 100,
    "p_ratio_kg_per_hectare": 50,
    "k_ratio_kg_per_hectare": 50,
    "n_ratio_kg_per_acre": 40.47,
    "p_ratio_kg_per_acre": 20.23,
    "k_ratio_kg_per_acre": 20.23,
    "seed_rate_kg_per_hectare": 10,
    "seed_rate_kg_per_acre": 4.05,
    "avg_yield_kg_per_hectare": 25000,
    "avg_yield_kg_per_acre": 10117.5,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 100:50:50 kg per hectare."
    }
  },
  {
    "id": 17,
    "name": "Brinjal (Eggplant)",
    "icon": "🍆",
    "category": "Vegetable",
    "growthDays": 130,
    "description": "Brinjal (Eggplant) stands out as a prominent vegetable-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 25-30°C combined with Varies of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Little Leaf and Phomopsis Blight and Wilt. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Little Leaf",
      "Phomopsis Blight",
      "Wilt"
    ],
    "diseaseManagement": "Use resistant varieties. Remove Little Leaf infected plants. Soil solarization.",
    "varieties": [
      "Pusa Purple Long",
      "Arka Navneet",
      "Manjari Gota"
    ],
    "climate": {
      "temperature": "25-30°C",
      "rainfall": "Varies"
    },
    "irrigationDetails": "Irrigate every 3-4 days in summer and 7-10 days in winter.",
    "avgPrice": 1800,
    "image": "https://picsum.photos/seed/Brinjal(Eggplant)/400/300",
    "interCrops": [
      "Cluster Bean",
      "Cowpea"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 600,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 135:70:70 kg per hectare.",
    "pests": "Shoot Borer",
    "harvest": "After about 130 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Seasonal (varies) — often multiple windows",
    "n_ratio_kg_per_hectare": 135,
    "p_ratio_kg_per_hectare": 70,
    "k_ratio_kg_per_hectare": 70,
    "n_ratio_kg_per_acre": 54.63,
    "p_ratio_kg_per_acre": 28.33,
    "k_ratio_kg_per_acre": 28.33,
    "seed_rate_kg_per_hectare": 7,
    "seed_rate_kg_per_acre": 2.83,
    "avg_yield_kg_per_hectare": 25300,
    "avg_yield_kg_per_acre": 10238.91,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 135:70:70 kg per hectare."
    }
  },
  {
    "id": 18,
    "name": "Okra (Lady Finger)",
    "icon": "🌿",
    "category": "Vegetable",
    "growthDays": 100,
    "description": "Farmers widely cultivate Okra (Lady Finger) as a standard vegetable crop bringing steady economic returns. It achieves optimal growth at temperatures around 22-35°C combined with Low to Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Yellow Vein Mosaic Virus (YVMV) and Powdery Mildew. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Yellow Vein Mosaic Virus (YVMV)",
      "Powdery Mildew"
    ],
    "diseaseManagement": "Use YVMV resistant varieties like Arka Anamika. Control whitefly.",
    "varieties": [
      "Pusa Sawani",
      "Arka Anamika",
      "Parbhani Kranti"
    ],
    "climate": {
      "temperature": "22-35°C",
      "rainfall": "Low to Moderate"
    },
    "irrigationDetails": "Irrigate every 4-5 days in summer. Avoid water stress.",
    "avgPrice": 2000,
    "image": "https://picsum.photos/seed/Okra(LadyFinger)/400/300",
    "interCrops": [
      "Cowpea",
      "Leafy Vegetables"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 400,
      "max": 700
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 120:60:60 kg per hectare.",
    "pests": "Fruit Borer",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Seasonal (varies) — often multiple windows",
    "n_ratio_kg_per_hectare": 120,
    "p_ratio_kg_per_hectare": 60,
    "k_ratio_kg_per_hectare": 60,
    "n_ratio_kg_per_acre": 48.56,
    "p_ratio_kg_per_acre": 24.28,
    "k_ratio_kg_per_acre": 24.28,
    "seed_rate_kg_per_hectare": 6,
    "seed_rate_kg_per_acre": 2.43,
    "avg_yield_kg_per_hectare": 21200,
    "avg_yield_kg_per_acre": 8579.64,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 120:60:60 kg per hectare."
    }
  },
  {
    "id": 19,
    "name": "Cabbage",
    "icon": "🥬",
    "category": "Vegetable",
    "growthDays": 110,
    "description": "Cabbage is a highly valued vegetable crop cultivated across various regions. It achieves optimal growth at temperatures around 15-20°C combined with Moist of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Black Rot and Club Root and Leaf Spot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Black Rot",
      "Club Root",
      "Leaf Spot"
    ],
    "diseaseManagement": "Seed treatment with hot water. Crop rotation. Copper oxychloride spray.",
    "varieties": [
      "Golden Acre",
      "Pusa Drumhead",
      "Pride of India"
    ],
    "climate": {
      "temperature": "15-20°C",
      "rainfall": "Moist"
    },
    "irrigationDetails": "Requires continuous supply of moisture. Irrigate every 8-10 days.",
    "avgPrice": 1200,
    "image": "https://picsum.photos/seed/Cabbage/400/300",
    "interCrops": [
      "Onion",
      "Garlic"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 95:45:45 kg per hectare.",
    "pests": "Cabbage Butterfly",
    "harvest": "After about 110 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Seasonal (varies) — often multiple windows",
    "n_ratio_kg_per_hectare": 95,
    "p_ratio_kg_per_hectare": 45,
    "k_ratio_kg_per_hectare": 45,
    "n_ratio_kg_per_acre": 38.45,
    "p_ratio_kg_per_acre": 18.21,
    "k_ratio_kg_per_acre": 18.21,
    "seed_rate_kg_per_hectare": 2,
    "seed_rate_kg_per_acre": 0.81,
    "avg_yield_kg_per_hectare": 13800,
    "avg_yield_kg_per_acre": 5584.86,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 95:45:45 kg per hectare."
    }
  },
  {
    "id": 20,
    "name": "Cauliflower",
    "icon": "🥦",
    "category": "Vegetable",
    "growthDays": 120,
    "description": "Cauliflower is a highly valued vegetable crop cultivated across various regions. It achieves optimal growth at temperatures around 15-25°C combined with Moist of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Black Rot and Downy Mildew and Stalk Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Black Rot",
      "Downy Mildew",
      "Stalk Rot"
    ],
    "diseaseManagement": "Use disease-free seeds. Add Boron/Molybdenum if deficient.",
    "varieties": [
      "Pusa Snowball",
      "Pusa Katki",
      "Pusa Deepali"
    ],
    "climate": {
      "temperature": "15-25°C",
      "rainfall": "Moist"
    },
    "irrigationDetails": "Frequent irrigation needed to maintain soil moisture.",
    "avgPrice": 1500,
    "image": "https://picsum.photos/seed/Cauliflower/400/300",
    "interCrops": [
      "Spinach",
      "Radish"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 85:45:45 kg per hectare.",
    "pests": "Aphids",
    "harvest": "After about 120 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Seasonal (varies) — often multiple windows",
    "n_ratio_kg_per_hectare": 85,
    "p_ratio_kg_per_hectare": 45,
    "k_ratio_kg_per_hectare": 45,
    "n_ratio_kg_per_acre": 34.4,
    "p_ratio_kg_per_acre": 18.21,
    "k_ratio_kg_per_acre": 18.21,
    "seed_rate_kg_per_hectare": 2,
    "seed_rate_kg_per_acre": 0.81,
    "avg_yield_kg_per_hectare": 12200,
    "avg_yield_kg_per_acre": 4937.34,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 85:45:45 kg per hectare."
    }
  },
  {
    "id": 21,
    "name": "Spinach",
    "icon": "🥬",
    "category": "Leafy Vegetable",
    "growthDays": 100,
    "description": "Spinach stands out as a prominent leafy vegetable-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 15-20°C combined with Moist of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Cercospora Leaf Spot and Downy Mildew and Mosaic Virus. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Cercospora Leaf Spot",
      "Downy Mildew",
      "Mosaic Virus"
    ],
    "diseaseManagement": "Use resistant varieties like Pusa Jyoti. Seed treatment with Thiram. Spray Mancozeb for leaf spots.",
    "varieties": [
      "Pusa Jyoti",
      "All Green",
      "Pusa Harit",
      "Arka Anupama"
    ],
    "climate": {
      "temperature": "15-20°C",
      "rainfall": "Moist"
    },
    "irrigationDetails": "Requires frequent irrigation (every 6-8 days) to keep leaves succulent.",
    "avgPrice": 1200,
    "image": "https://picsum.photos/seed/Spinach/400/300",
    "interCrops": [
      "Maize",
      "Garlic"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 190:95:95 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Seasonal (varies) — often multiple windows",
    "n_ratio_kg_per_hectare": 190,
    "p_ratio_kg_per_hectare": 95,
    "k_ratio_kg_per_hectare": 95,
    "n_ratio_kg_per_acre": 76.89,
    "p_ratio_kg_per_acre": 38.45,
    "k_ratio_kg_per_acre": 38.45,
    "seed_rate_kg_per_hectare": 45,
    "seed_rate_kg_per_acre": 18.21,
    "avg_yield_kg_per_hectare": 4700,
    "avg_yield_kg_per_acre": 1902.09,
    "planting_density_per_acre": 60000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 190:95:95 kg per hectare."
    }
  },
  {
    "id": 22,
    "name": "Carrot",
    "icon": "🥕",
    "category": "Root Vegetable",
    "growthDays": 100,
    "description": "Carrot stands out as a prominent root vegetable-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 15-20°C combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Blight and Powdery Mildew and Soft Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Blight",
      "Powdery Mildew",
      "Soft Rot"
    ],
    "diseaseManagement": "Spray Carbendazim for blight. Proper drainage to avoid rot.",
    "varieties": [
      "Pusa Kesar",
      "Nanties",
      "Pusa Rudhira"
    ],
    "climate": {
      "temperature": "15-20°C",
      "rainfall": "Low"
    },
    "irrigationDetails": "Constant soil moisture is essential. Irrigate every 5-7 days.",
    "avgPrice": 1800,
    "image": "https://picsum.photos/seed/Carrot/400/300",
    "interCrops": [
      "Onion",
      "Lettuce"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 195:100:100 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Seasonal (varies) — often multiple windows",
    "n_ratio_kg_per_hectare": 195,
    "p_ratio_kg_per_hectare": 100,
    "k_ratio_kg_per_hectare": 100,
    "n_ratio_kg_per_acre": 78.92,
    "p_ratio_kg_per_acre": 40.47,
    "k_ratio_kg_per_acre": 40.47,
    "seed_rate_kg_per_hectare": 48,
    "seed_rate_kg_per_acre": 19.43,
    "avg_yield_kg_per_hectare": 4900,
    "avg_yield_kg_per_acre": 1983.03,
    "planting_density_per_acre": 40000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 195:100:100 kg per hectare."
    }
  },
  {
    "id": 23,
    "name": "Radish",
    "icon": "🥕",
    "category": "Root Vegetable",
    "growthDays": 100,
    "description": "Radish stands out as a prominent root vegetable-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 10-25°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Alternaria Blight and White Rust and Mosaic. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Alternaria Blight",
      "White Rust",
      "Mosaic"
    ],
    "diseaseManagement": "Use resistant varieties. Spray Mancozeb for white rust.",
    "varieties": [
      "Pusa Chetki",
      "Japanese White",
      "Arka Nishant"
    ],
    "climate": {
      "temperature": "10-25°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Frequent light irrigation. One pre-sowing irrigation is important.",
    "avgPrice": 1000,
    "image": "https://picsum.photos/seed/Radish/400/300",
    "interCrops": [
      "Spinach",
      "Fenugreek"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 175:90:90 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Seasonal (varies) — often multiple windows",
    "n_ratio_kg_per_hectare": 175,
    "p_ratio_kg_per_hectare": 90,
    "k_ratio_kg_per_hectare": 90,
    "n_ratio_kg_per_acre": 70.82,
    "p_ratio_kg_per_acre": 36.42,
    "k_ratio_kg_per_acre": 36.42,
    "seed_rate_kg_per_hectare": 39,
    "seed_rate_kg_per_acre": 15.78,
    "avg_yield_kg_per_hectare": 4300,
    "avg_yield_kg_per_acre": 1740.21,
    "planting_density_per_acre": 40000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 175:90:90 kg per hectare."
    }
  },
  {
    "id": 24,
    "name": "Pumpkin",
    "icon": "🎃",
    "category": "Vegetable",
    "growthDays": 100,
    "description": "Pumpkin stands out as a prominent vegetable-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Powdery Mildew and Mosaic Virus and Downy Mildew. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Powdery Mildew",
      "Mosaic Virus",
      "Downy Mildew"
    ],
    "diseaseManagement": "Sulfur dusting for mildew. Control aphids to prevent mosaic.",
    "varieties": [
      "Arka Suryamukhi",
      "Pusa Vishwas",
      "Ambili"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Irrigate at 7-10 day intervals. Critical stage: Low moisture during fruit setting.",
    "avgPrice": 1500,
    "image": "https://picsum.photos/seed/Pumpkin/400/300",
    "interCrops": [
      "Maize",
      "Cowpea"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 135:70:70 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Seasonal (varies) — often multiple windows",
    "n_ratio_kg_per_hectare": 135,
    "p_ratio_kg_per_hectare": 70,
    "k_ratio_kg_per_hectare": 70,
    "n_ratio_kg_per_acre": 54.63,
    "p_ratio_kg_per_acre": 28.33,
    "k_ratio_kg_per_acre": 28.33,
    "seed_rate_kg_per_hectare": 8,
    "seed_rate_kg_per_acre": 3.24,
    "avg_yield_kg_per_hectare": 25600,
    "avg_yield_kg_per_acre": 10360.32,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 135:70:70 kg per hectare."
    }
  },
  {
    "id": 25,
    "name": "Cucumber",
    "icon": "🥒",
    "category": "Vegetable",
    "growthDays": 100,
    "description": "Cucumber stands out as a prominent vegetable-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Downy Mildew and Powdery Mildew and Mosaic. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Downy Mildew",
      "Powdery Mildew",
      "Mosaic"
    ],
    "diseaseManagement": "Spray Metalaxyl for Downy mildew. Use disease resistant hybrids.",
    "varieties": [
      "Japanese Long Green",
      "Pusa Sanyog",
      "Straight Eight"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Low"
    },
    "irrigationDetails": "Frequent irrigation required (every 2-4 days) in dry weather.",
    "avgPrice": 2000,
    "image": "https://picsum.photos/seed/Cucumber/400/300",
    "interCrops": [
      "Okra",
      "Cowpea"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 145:75:75 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Seasonal (varies) — often multiple windows",
    "n_ratio_kg_per_hectare": 145,
    "p_ratio_kg_per_hectare": 75,
    "k_ratio_kg_per_hectare": 75,
    "n_ratio_kg_per_acre": 58.68,
    "p_ratio_kg_per_acre": 30.35,
    "k_ratio_kg_per_acre": 30.35,
    "seed_rate_kg_per_hectare": 9,
    "seed_rate_kg_per_acre": 3.64,
    "avg_yield_kg_per_hectare": 28300,
    "avg_yield_kg_per_acre": 11453.01,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 145:75:75 kg per hectare."
    }
  },
  {
    "id": 26,
    "name": "Chilli",
    "icon": "🌶️",
    "category": "Vegetable",
    "growthDays": 100,
    "description": "Chilli stands out as a prominent vegetable-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with 60-120cm of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Curl Virus and Anthracnose and Dieback. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Curl Virus",
      "Anthracnose",
      "Dieback"
    ],
    "diseaseManagement": "Control Thrips/Mites for Leaf Curl. Seed treatment. Spray Copper Oxychloride.",
    "varieties": [
      "Pusa Jwala",
      "Arka Lohit",
      "Byadgi",
      "G-4"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "60-120cm"
    },
    "irrigationDetails": "Light irrigation at planting. Then every 7-10 days. Avoid water stagnation.",
    "avgPrice": 6000,
    "image": "https://picsum.photos/seed/Chilli/400/300",
    "interCrops": [
      "Onion",
      "Garlic"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 140:75:75 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Seasonal (varies) — often multiple windows",
    "n_ratio_kg_per_hectare": 140,
    "p_ratio_kg_per_hectare": 75,
    "k_ratio_kg_per_hectare": 75,
    "n_ratio_kg_per_acre": 56.66,
    "p_ratio_kg_per_acre": 30.35,
    "k_ratio_kg_per_acre": 30.35,
    "seed_rate_kg_per_hectare": 8,
    "seed_rate_kg_per_acre": 3.24,
    "avg_yield_kg_per_hectare": 27500,
    "avg_yield_kg_per_acre": 11129.25,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 140:75:75 kg per hectare."
    }
  },
  {
    "id": 27,
    "name": "Capsicum",
    "icon": "🫑",
    "category": "Vegetable",
    "growthDays": 100,
    "description": "Capsicum is a highly valued vegetable crop cultivated across various regions. It achieves optimal growth at temperatures around 15-25°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Damping Off and Powdery Mildew and Bacterial Spot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Damping Off",
      "Powdery Mildew",
      "Bacterial Spot"
    ],
    "diseaseManagement": "Soil sterilization. Copper sprays for bacterial spot.",
    "varieties": [
      "California Wonder",
      "Arka Mohini",
      "Indra"
    ],
    "climate": {
      "temperature": "15-25°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Sensitive to water stress. Drip irrigation is highly recommended.",
    "avgPrice": 4000,
    "image": "https://picsum.photos/seed/Capsicum/400/300",
    "interCrops": [
      "Marigold",
      "Cucumber"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 95:45:45 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Seasonal (varies) — often multiple windows",
    "n_ratio_kg_per_hectare": 95,
    "p_ratio_kg_per_hectare": 45,
    "k_ratio_kg_per_hectare": 45,
    "n_ratio_kg_per_acre": 38.45,
    "p_ratio_kg_per_acre": 18.21,
    "k_ratio_kg_per_acre": 18.21,
    "seed_rate_kg_per_hectare": 2,
    "seed_rate_kg_per_acre": 0.81,
    "avg_yield_kg_per_hectare": 13900,
    "avg_yield_kg_per_acre": 5625.33,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 95:45:45 kg per hectare."
    }
  },
  {
    "id": 28,
    "name": "Pea",
    "icon": "🟢",
    "category": "Vegetable",
    "growthDays": 100,
    "description": "Pea is a highly valued vegetable crop cultivated across various regions. It achieves optimal growth at temperatures around 10-25°C combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Powdery Mildew and Rust and Wilt. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Powdery Mildew",
      "Rust",
      "Wilt"
    ],
    "diseaseManagement": "Use resistant varieties like Arkel. Spray Sulfur for mildew.",
    "varieties": [
      "Arkel",
      "Bonneville",
      "Azad Pea-1"
    ],
    "climate": {
      "temperature": "10-25°C",
      "rainfall": "Low"
    },
    "irrigationDetails": "Pre-sowing irrigation. Irrigate at flowering and pod filling.",
    "avgPrice": 3000,
    "image": "https://picsum.photos/seed/Pea/400/300",
    "interCrops": [
      "Wheat",
      "Mustard"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 80:40:40 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Seasonal (varies) — often multiple windows",
    "n_ratio_kg_per_hectare": 80,
    "p_ratio_kg_per_hectare": 40,
    "k_ratio_kg_per_hectare": 40,
    "n_ratio_kg_per_acre": 32.38,
    "p_ratio_kg_per_acre": 16.19,
    "k_ratio_kg_per_acre": 16.19,
    "seed_rate_kg_per_hectare": 1,
    "seed_rate_kg_per_acre": 0.4,
    "avg_yield_kg_per_hectare": 10000,
    "avg_yield_kg_per_acre": 4047,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 80:40:40 kg per hectare."
    }
  },
  {
    "id": 29,
    "name": "French Bean",
    "icon": "🫘",
    "category": "Vegetable",
    "growthDays": 100,
    "description": "French Bean stands out as a prominent vegetable-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 15-25°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Anthracnose and Rust and Mosaic. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Anthracnose",
      "Rust",
      "Mosaic"
    ],
    "diseaseManagement": "Use disease-free seed. Spray Mancozeb for Anthracnose.",
    "varieties": [
      "Arka Komal",
      "Pusa Parvati",
      "Contender"
    ],
    "climate": {
      "temperature": "15-25°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Light frequent irrigation recommended. Sensitive to water logging.",
    "avgPrice": 3500,
    "image": "https://picsum.photos/seed/FrenchBean/400/300",
    "interCrops": [
      "Maize",
      "Potato"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 135:70:70 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Seasonal (varies) — often multiple windows",
    "n_ratio_kg_per_hectare": 135,
    "p_ratio_kg_per_hectare": 70,
    "k_ratio_kg_per_hectare": 70,
    "n_ratio_kg_per_acre": 54.63,
    "p_ratio_kg_per_acre": 28.33,
    "k_ratio_kg_per_acre": 28.33,
    "seed_rate_kg_per_hectare": 7,
    "seed_rate_kg_per_acre": 2.83,
    "avg_yield_kg_per_hectare": 25400,
    "avg_yield_kg_per_acre": 10279.38,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 135:70:70 kg per hectare."
    }
  },
  {
    "id": 30,
    "name": "Garlic",
    "icon": "🧄",
    "category": "Vegetable",
    "growthDays": 100,
    "description": "Farmers widely cultivate Garlic as a standard vegetable crop bringing steady economic returns. It achieves optimal growth at temperatures around 12-25°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Purple Blotch and Stemphylium Blight and Downy Mildew. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Purple Blotch",
      "Stemphylium Blight",
      "Downy Mildew"
    ],
    "diseaseManagement": "Spray Mancozeb. Proper drying/curing of bulbs.",
    "varieties": [
      "Yamuna Safed",
      "Agrifound White",
      "Bhima Omkar"
    ],
    "climate": {
      "temperature": "12-25°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Irrigate at 10-12 day intervals. Alternating irrigation stimulates bulbing.",
    "avgPrice": 8000,
    "image": "https://picsum.photos/seed/Garlic/400/300",
    "interCrops": [
      "Sugarcane",
      "Wheat"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 130:65:65 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Seasonal (varies) — often multiple windows",
    "n_ratio_kg_per_hectare": 130,
    "p_ratio_kg_per_hectare": 65,
    "k_ratio_kg_per_hectare": 65,
    "n_ratio_kg_per_acre": 52.61,
    "p_ratio_kg_per_acre": 26.31,
    "k_ratio_kg_per_acre": 26.31,
    "seed_rate_kg_per_hectare": 7,
    "seed_rate_kg_per_acre": 2.83,
    "avg_yield_kg_per_hectare": 23700,
    "avg_yield_kg_per_acre": 9591.39,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 130:65:65 kg per hectare."
    }
  },
  {
    "id": 31,
    "name": "Ginger",
    "icon": "🫚",
    "category": "Vegetable",
    "growthDays": 100,
    "description": "Ginger stands out as a prominent vegetable-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with 150-300cm of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Soft Rot and Bacterial Wilt and Leaf Spot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Soft Rot",
      "Bacterial Wilt",
      "Leaf Spot"
    ],
    "diseaseManagement": "Seed rhizome treatment with Mancozeb + Sweet. Drainage improvement.",
    "varieties": [
      "Suprabha",
      "Suruchi",
      "Rio de Janeiro"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "150-300cm"
    },
    "irrigationDetails": "Requires frequent irrigation if rainfall is low. Mulching helps retain moisture.",
    "avgPrice": 6000,
    "image": "https://picsum.photos/seed/Ginger/400/300",
    "interCrops": [
      "Turmeric",
      "Maize",
      "Chilli"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 135:70:70 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Seasonal (varies) — often multiple windows",
    "n_ratio_kg_per_hectare": 135,
    "p_ratio_kg_per_hectare": 70,
    "k_ratio_kg_per_hectare": 70,
    "n_ratio_kg_per_acre": 54.63,
    "p_ratio_kg_per_acre": 28.33,
    "k_ratio_kg_per_acre": 28.33,
    "seed_rate_kg_per_hectare": 8,
    "seed_rate_kg_per_acre": 3.24,
    "avg_yield_kg_per_hectare": 25800,
    "avg_yield_kg_per_acre": 10441.26,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 135:70:70 kg per hectare."
    }
  },
  {
    "id": 32,
    "name": "Banana",
    "icon": "🍌",
    "category": "Fruit",
    "growthDays": 100,
    "description": "Farmers widely cultivate Banana as a standard fruit crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-35°C combined with High of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Panama Wilt and Sigatoka Leaf Spot and Banana Bunchy Top. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Panama Wilt",
      "Sigatoka Leaf Spot",
      "Banana Bunchy Top"
    ],
    "diseaseManagement": "Use tissue culture plants. Control aphids. Remove infected mats.",
    "varieties": [
      "Grand Naine",
      "Robusta",
      "Poovan",
      "Rasthali"
    ],
    "climate": {
      "temperature": "20-35°C",
      "rainfall": "High"
    },
    "irrigationDetails": "High water requirement. Drip irrigation is most effective (15-20L/plant/day).",
    "avgPrice": 1500,
    "image": "https://picsum.photos/seed/Banana/400/300",
    "interCrops": [
      "Vegetables",
      "Legumes (in early stage)"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Compost-rich; follow local recommendations",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting depends on region; typically spring",
    "n_ratio_kg_per_hectare": 200,
    "p_ratio_kg_per_hectare": 100,
    "k_ratio_kg_per_hectare": 200,
    "n_ratio_kg_per_acre": 80.94,
    "p_ratio_kg_per_acre": 40.47,
    "k_ratio_kg_per_acre": 80.94,
    "seed_rate_kg_per_hectare": 3000,
    "seed_rate_kg_per_acre": 1214.1,
    "avg_yield_kg_per_hectare": 40000,
    "avg_yield_kg_per_acre": 16188,
    "planting_density_per_acre": 1000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 200:100:200 kg per hectare."
    }
  },
  {
    "id": 33,
    "name": "Mango",
    "icon": "🥭",
    "category": "Fruit",
    "growthDays": 100,
    "description": "Mango stands out as a prominent fruit-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 24-30°C combined with 75-250cm of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Powdery Mildew and Anthracnose and Mango Malformation. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Powdery Mildew",
      "Anthracnose",
      "Mango Malformation"
    ],
    "diseaseManagement": "Spray Wettable Sulphur for mildew. Pruning of diseased parts.",
    "varieties": [
      "Alphonso",
      "Dashehari",
      "Kesar",
      "Totapuri",
      "Amrapali"
    ],
    "climate": {
      "temperature": "24-30°C",
      "rainfall": "75-250cm"
    },
    "irrigationDetails": "Young plants need regular watering. Bearing trees need irrigation during fruit set.",
    "avgPrice": 4000,
    "image": "https://picsum.photos/seed/Mango/400/300",
    "interCrops": [
      "Vegetables",
      "Pulses (in young orchards)"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Compost-rich; follow local recommendations",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting depends on region; typically spring",
    "n_ratio_kg_per_hectare": 1000,
    "p_ratio_kg_per_hectare": 500,
    "k_ratio_kg_per_hectare": 1000,
    "n_ratio_kg_per_acre": 404.7,
    "p_ratio_kg_per_acre": 202.35,
    "k_ratio_kg_per_acre": 404.7,
    "seed_rate_kg_per_hectare": 100,
    "seed_rate_kg_per_acre": 40.47,
    "avg_yield_kg_per_hectare": 15000,
    "avg_yield_kg_per_acre": 6070.5,
    "planting_density_per_acre": 1000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 1000:500:1000 kg per hectare."
    }
  },
  {
    "id": 34,
    "name": "Apple",
    "icon": "🍎",
    "category": "Fruit",
    "growthDays": 100,
    "description": "Apple stands out as a prominent fruit-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around Cool combined with 100-125cm of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Apple Scab and Powdery Mildew and Canker. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Apple Scab",
      "Powdery Mildew",
      "Canker"
    ],
    "diseaseManagement": "Spray Fungicides (Captan/Dodine) for Scab. Paste Canker wounds.",
    "varieties": [
      "Red Delicious",
      "Golden Delicious",
      "Gala",
      "Fuji"
    ],
    "climate": {
      "temperature": "Cool",
      "rainfall": "100-125cm"
    },
    "irrigationDetails": "Irrigation critical during fruit set and development in summer.",
    "avgPrice": 8000,
    "image": "https://picsum.photos/seed/Apple/400/300",
    "interCrops": [
      "Beans",
      "Peas (in young orchards)"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Compost-rich; follow local recommendations",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting depends on region; typically spring",
    "n_ratio_kg_per_hectare": 285,
    "p_ratio_kg_per_hectare": 140,
    "k_ratio_kg_per_hectare": 285,
    "n_ratio_kg_per_acre": 115.34,
    "p_ratio_kg_per_acre": 56.66,
    "k_ratio_kg_per_acre": 115.34,
    "seed_rate_kg_per_hectare": 466,
    "seed_rate_kg_per_acre": 188.59,
    "avg_yield_kg_per_hectare": 37500,
    "avg_yield_kg_per_acre": 15176.25,
    "planting_density_per_acre": 1000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 285:140:285 kg per hectare."
    }
  },
  {
    "id": 35,
    "name": "Grape",
    "icon": "🍇",
    "category": "Fruit",
    "growthDays": 100,
    "description": "Grape stands out as a prominent fruit-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 15-40°C combined with Low during fruit of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Downy Mildew and Powdery Mildew and Anthracnose. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Downy Mildew",
      "Powdery Mildew",
      "Anthracnose"
    ],
    "diseaseManagement": "Spray Bordeaux mixture. Use specific fungicides like Metalaxyl. Pruning management.",
    "varieties": [
      "Thompson Seedless",
      "Sonaka",
      "Manik Chaman",
      "Sharad Seedless"
    ],
    "climate": {
      "temperature": "15-40°C",
      "rainfall": "Low during fruit"
    },
    "irrigationDetails": "Drip irrigation is standard. Stress during bud differentiation is beneficial.",
    "avgPrice": 6000,
    "image": "https://picsum.photos/seed/Grape/400/300",
    "interCrops": [
      "Vegetables (only in first year)"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Compost-rich; follow local recommendations",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting depends on region; typically spring",
    "n_ratio_kg_per_hectare": 300,
    "p_ratio_kg_per_hectare": 150,
    "k_ratio_kg_per_hectare": 300,
    "n_ratio_kg_per_acre": 121.41,
    "p_ratio_kg_per_acre": 60.7,
    "k_ratio_kg_per_acre": 121.41,
    "seed_rate_kg_per_hectare": 498,
    "seed_rate_kg_per_acre": 201.54,
    "avg_yield_kg_per_hectare": 39900,
    "avg_yield_kg_per_acre": 16147.53,
    "planting_density_per_acre": 1000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 300:150:300 kg per hectare."
    }
  },
  {
    "id": 36,
    "name": "Papaya",
    "icon": "🥭",
    "category": "Fruit",
    "growthDays": 100,
    "description": "Known for its excellent market demand, Papaya plays a crucial role in the fruit sector. It achieves optimal growth at temperatures around 25-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Papaya Ring Spot Virus and Leaf Curl and Foot Rot. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Papaya Ring Spot Virus",
      "Leaf Curl",
      "Foot Rot"
    ],
    "diseaseManagement": "Use nylon nets to exclude aphids (virus vectors). Grow PRSV tolerant varieties.",
    "varieties": [
      "Pusa Nanha",
      "Red Lady",
      "Coorg Honey Dew"
    ],
    "climate": {
      "temperature": "25-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "High water requirement. Avoid water logging near stem (causes rot).",
    "avgPrice": 2000,
    "image": "https://picsum.photos/seed/Papaya/400/300",
    "interCrops": [
      "Not recommended in bearing stage"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Compost-rich; follow local recommendations",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting depends on region; typically spring",
    "n_ratio_kg_per_hectare": 180,
    "p_ratio_kg_per_hectare": 90,
    "k_ratio_kg_per_hectare": 180,
    "n_ratio_kg_per_acre": 72.85,
    "p_ratio_kg_per_acre": 36.42,
    "k_ratio_kg_per_acre": 72.85,
    "seed_rate_kg_per_hectare": 261,
    "seed_rate_kg_per_acre": 105.63,
    "avg_yield_kg_per_hectare": 22100,
    "avg_yield_kg_per_acre": 8943.87,
    "planting_density_per_acre": 1000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 180:90:180 kg per hectare."
    }
  },
  {
    "id": 37,
    "name": "Pomegranate",
    "icon": "🍎",
    "category": "Fruit",
    "growthDays": 100,
    "description": "Pomegranate stands out as a prominent fruit-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 25-35°C combined with Semi-arid of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Bacterial Blight (Oily Spot) and Wilt and Fruit Borer. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Bacterial Blight (Oily Spot)",
      "Wilt",
      "Fruit Borer"
    ],
    "diseaseManagement": "Use antibiotics (Streptocycline) for blight. Soil drenching for wilt.",
    "varieties": [
      "Bhagwa",
      "Ganesh",
      "Arakta",
      "Mridula"
    ],
    "climate": {
      "temperature": "25-35°C",
      "rainfall": "Semi-arid"
    },
    "irrigationDetails": "Regular irrigation during fruit development prevents fruit cracking.",
    "avgPrice": 7000,
    "image": "https://picsum.photos/seed/Pomegranate/400/300",
    "interCrops": [
      "Pulses",
      "Vegetables"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Compost-rich; follow local recommendations",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting depends on region; typically spring",
    "n_ratio_kg_per_hectare": 300,
    "p_ratio_kg_per_hectare": 150,
    "k_ratio_kg_per_hectare": 300,
    "n_ratio_kg_per_acre": 121.41,
    "p_ratio_kg_per_acre": 60.7,
    "k_ratio_kg_per_acre": 121.41,
    "seed_rate_kg_per_hectare": 496,
    "seed_rate_kg_per_acre": 200.73,
    "avg_yield_kg_per_hectare": 39700,
    "avg_yield_kg_per_acre": 16066.59,
    "planting_density_per_acre": 1000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 300:150:300 kg per hectare."
    }
  },
  {
    "id": 38,
    "name": "Orange",
    "icon": "🍊",
    "category": "Fruit",
    "growthDays": 100,
    "description": "Orange is a highly valued fruit crop cultivated across various regions. It achieves optimal growth at temperatures around 15-35°C combined with 75-125cm of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Citrus Canker and Gummosis and Dieback. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Citrus Canker",
      "Gummosis",
      "Dieback"
    ],
    "diseaseManagement": "Pruning of dead wood. Spray Copper Oxychloride. Control Citrus Psylla.",
    "varieties": [
      "Nagpur Mandarin",
      "Kinnow",
      "Sathgudi",
      "Khasi Mandarin"
    ],
    "climate": {
      "temperature": "15-35°C",
      "rainfall": "75-125cm"
    },
    "irrigationDetails": "Irrigate at 10-15 day intervals in winter and 5-7 days in summer.",
    "avgPrice": 3000,
    "image": "https://picsum.photos/seed/Orange/400/300",
    "interCrops": [
      "Legumes",
      "Vegetables"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Compost-rich; follow local recommendations",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting depends on region; typically spring",
    "n_ratio_kg_per_hectare": 140,
    "p_ratio_kg_per_hectare": 70,
    "k_ratio_kg_per_hectare": 140,
    "n_ratio_kg_per_acre": 56.66,
    "p_ratio_kg_per_acre": 28.33,
    "k_ratio_kg_per_acre": 56.66,
    "seed_rate_kg_per_hectare": 184,
    "seed_rate_kg_per_acre": 74.46,
    "avg_yield_kg_per_hectare": 16400,
    "avg_yield_kg_per_acre": 6637.08,
    "planting_density_per_acre": 1000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 140:70:140 kg per hectare."
    }
  },
  {
    "id": 39,
    "name": "Lemon",
    "icon": "🍋",
    "category": "Fruit",
    "growthDays": 100,
    "description": "Lemon stands out as a prominent fruit-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around Warm/Dry combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Canker and Tristeza Virus and Leaf Miner. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Canker",
      "Tristeza Virus",
      "Leaf Miner"
    ],
    "diseaseManagement": "Prune canker affected parts. Use virus-free budwood.",
    "varieties": [
      "Kagzi Lime",
      "Pramalini",
      "Vikram",
      "Sai Sharbati"
    ],
    "climate": {
      "temperature": "Warm/Dry",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular watering ensures juicy fruits. Avoid stress during flowering.",
    "avgPrice": 4000,
    "image": "https://picsum.photos/seed/Lemon/400/300",
    "interCrops": [
      "Peas",
      "French Beans"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Compost-rich; follow local recommendations",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting depends on region; typically spring",
    "n_ratio_kg_per_hectare": 290,
    "p_ratio_kg_per_hectare": 145,
    "k_ratio_kg_per_hectare": 290,
    "n_ratio_kg_per_acre": 117.36,
    "p_ratio_kg_per_acre": 58.68,
    "k_ratio_kg_per_acre": 117.36,
    "seed_rate_kg_per_hectare": 476,
    "seed_rate_kg_per_acre": 192.64,
    "avg_yield_kg_per_hectare": 38300,
    "avg_yield_kg_per_acre": 15500.01,
    "planting_density_per_acre": 1000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 290:145:290 kg per hectare."
    }
  },
  {
    "id": 40,
    "name": "Guava",
    "icon": "🍈",
    "category": "Fruit",
    "growthDays": 100,
    "description": "Guava stands out as a prominent fruit-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 15-30°C combined with 100cm of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Wilt and Anthracnose and Fruit Fly. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Wilt",
      "Anthracnose",
      "Fruit Fly"
    ],
    "diseaseManagement": "Soil drenching with Carbendazim. Bagging of fruits to prevent fly attack.",
    "varieties": [
      "L-49 (Sardar)",
      "Allahabad Safeda",
      "Lalit",
      "VNR Bihi"
    ],
    "climate": {
      "temperature": "15-30°C",
      "rainfall": "100cm"
    },
    "irrigationDetails": "Hardy crop, but irrigation increases yield/size. Bahar treatment requires water stress.",
    "avgPrice": 2500,
    "image": "https://picsum.photos/seed/Guava/400/300",
    "interCrops": [
      "Vegetables"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Compost-rich; follow local recommendations",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting depends on region; typically spring",
    "n_ratio_kg_per_hectare": 300,
    "p_ratio_kg_per_hectare": 150,
    "k_ratio_kg_per_hectare": 300,
    "n_ratio_kg_per_acre": 121.41,
    "p_ratio_kg_per_acre": 60.7,
    "k_ratio_kg_per_acre": 121.41,
    "seed_rate_kg_per_hectare": 499,
    "seed_rate_kg_per_acre": 201.95,
    "avg_yield_kg_per_hectare": 39900,
    "avg_yield_kg_per_acre": 16147.53,
    "planting_density_per_acre": 1000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 300:150:300 kg per hectare."
    }
  },
  {
    "id": 41,
    "name": "Watermelon",
    "icon": "🍉",
    "category": "Fruit",
    "growthDays": 100,
    "description": "Farmers widely cultivate Watermelon as a standard fruit crop bringing steady economic returns. It achieves optimal growth at temperatures around 25-40°C combined with Dry of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Fusarium Wilt and Anthracnose and Downy Mildew. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Fusarium Wilt",
      "Anthracnose",
      "Downy Mildew"
    ],
    "diseaseManagement": "Soil solarization. Seed treatment. Grow wilt resistant varieties.",
    "varieties": [
      "Sugar Baby",
      "Arka Manik",
      "Pusa Bedana",
      "Kiran"
    ],
    "climate": {
      "temperature": "25-40°C",
      "rainfall": "Dry"
    },
    "irrigationDetails": "Irrigate every 5-7 days. Stop excessive watering during ripening to maintain sweetness.",
    "avgPrice": 1000,
    "image": "https://picsum.photos/seed/Watermelon/400/300",
    "interCrops": [
      "None"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Compost-rich; follow local recommendations",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting depends on region; typically spring",
    "n_ratio_kg_per_hectare": 245,
    "p_ratio_kg_per_hectare": 120,
    "k_ratio_kg_per_hectare": 245,
    "n_ratio_kg_per_acre": 99.15,
    "p_ratio_kg_per_acre": 48.56,
    "k_ratio_kg_per_acre": 99.15,
    "seed_rate_kg_per_hectare": 391,
    "seed_rate_kg_per_acre": 158.24,
    "avg_yield_kg_per_hectare": 31900,
    "avg_yield_kg_per_acre": 12909.93,
    "planting_density_per_acre": 1000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 245:120:245 kg per hectare."
    }
  },
  {
    "id": 42,
    "name": "Muskmelon",
    "icon": "🍈",
    "category": "Fruit",
    "growthDays": 100,
    "description": "Known for its excellent market demand, Muskmelon plays a crucial role in the fruit sector. It achieves optimal growth at temperatures around 25-35°C combined with Dry of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Powdery Mildew and Downy Mildew and Fusarium Wilt. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Powdery Mildew",
      "Downy Mildew",
      "Fusarium Wilt"
    ],
    "diseaseManagement": "Spray Wettable Sulfur. Drench with Carbendazim.",
    "varieties": [
      "Pusa Sharbati",
      "Hara Madhu",
      "Punjab Sunehri",
      "Bobby"
    ],
    "climate": {
      "temperature": "25-35°C",
      "rainfall": "Dry"
    },
    "irrigationDetails": "Irrigate every 4-6 days. Avoid wetting the vines/fruit.",
    "avgPrice": 2000,
    "image": "https://picsum.photos/seed/Muskmelon/400/300",
    "interCrops": [
      "None"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Compost-rich; follow local recommendations",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting depends on region; typically spring",
    "n_ratio_kg_per_hectare": 195,
    "p_ratio_kg_per_hectare": 95,
    "k_ratio_kg_per_hectare": 195,
    "n_ratio_kg_per_acre": 78.92,
    "p_ratio_kg_per_acre": 38.45,
    "k_ratio_kg_per_acre": 78.92,
    "seed_rate_kg_per_hectare": 289,
    "seed_rate_kg_per_acre": 116.96,
    "avg_yield_kg_per_hectare": 24200,
    "avg_yield_kg_per_acre": 9793.74,
    "planting_density_per_acre": 1000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 195:95:195 kg per hectare."
    }
  },
  {
    "id": 43,
    "name": "Jackfruit",
    "icon": "🍈",
    "category": "Fruit",
    "growthDays": 100,
    "description": "Known for its excellent market demand, Jackfruit plays a crucial role in the fruit sector. It achieves optimal growth at temperatures around 25-35°C combined with High of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Fruit Rot and Pink Disease and Shoot Borer. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Fruit Rot",
      "Pink Disease",
      "Shoot Borer"
    ],
    "diseaseManagement": "Remove rotted fruits. Copper sprays.",
    "varieties": [
      "Konkan Prolific",
      "Varikka",
      "Singapore Jack"
    ],
    "climate": {
      "temperature": "25-35°C",
      "rainfall": "High"
    },
    "irrigationDetails": "Irrigation mainly for young plants. Established trees are rainfed.",
    "avgPrice": 1500,
    "image": "https://picsum.photos/seed/Jackfruit/400/300",
    "interCrops": [
      "Pepper",
      "Coffee"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Compost-rich; follow local recommendations",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting depends on region; typically spring",
    "n_ratio_kg_per_hectare": 185,
    "p_ratio_kg_per_hectare": 95,
    "k_ratio_kg_per_hectare": 185,
    "n_ratio_kg_per_acre": 74.87,
    "p_ratio_kg_per_acre": 38.45,
    "k_ratio_kg_per_acre": 74.87,
    "seed_rate_kg_per_hectare": 274,
    "seed_rate_kg_per_acre": 110.89,
    "avg_yield_kg_per_hectare": 23100,
    "avg_yield_kg_per_acre": 9348.57,
    "planting_density_per_acre": 1000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 185:95:185 kg per hectare."
    }
  },
  {
    "id": 44,
    "name": "Pineapple",
    "icon": "🍍",
    "category": "Fruit",
    "growthDays": 100,
    "description": "Farmers widely cultivate Pineapple as a standard fruit crop bringing steady economic returns. It achieves optimal growth at temperatures around 22-32°C combined with High of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Heart Rot and Wilt Virus. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Heart Rot",
      "Wilt Virus"
    ],
    "diseaseManagement": "Dip suckers in fungicide before planting. Improvement of drainage.",
    "varieties": [
      "Kew",
      "Queen",
      "Mauritius"
    ],
    "climate": {
      "temperature": "22-32°C",
      "rainfall": "High"
    },
    "irrigationDetails": "Irrigate during dry spells. Mulching is very effective.",
    "avgPrice": 2500,
    "image": "https://picsum.photos/seed/Pineapple/400/300",
    "interCrops": [
      "Coconut",
      "Arecanut"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Compost-rich; follow local recommendations",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting depends on region; typically spring",
    "n_ratio_kg_per_hectare": 230,
    "p_ratio_kg_per_hectare": 115,
    "k_ratio_kg_per_hectare": 230,
    "n_ratio_kg_per_acre": 93.08,
    "p_ratio_kg_per_acre": 46.54,
    "k_ratio_kg_per_acre": 93.08,
    "seed_rate_kg_per_hectare": 364,
    "seed_rate_kg_per_acre": 147.31,
    "avg_yield_kg_per_hectare": 29800,
    "avg_yield_kg_per_acre": 12060.06,
    "planting_density_per_acre": 1000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 230:115:230 kg per hectare."
    }
  },
  {
    "id": 45,
    "name": "Sugarcane",
    "icon": "🍬",
    "category": "Cash Crop",
    "growthDays": 100,
    "description": "Sugarcane stands out as a prominent cash crop-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-40°C combined with High of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Red Rot and Smut and Grassy Shoot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Red Rot",
      "Smut",
      "Grassy Shoot"
    ],
    "diseaseManagement": "Use healthy setts.的热 water treatment (50°C for 2h). Grow resistant varieties.",
    "varieties": [
      "Co 86032",
      "CoM 0265",
      "Co 0238",
      "CoC 671"
    ],
    "climate": {
      "temperature": "20-40°C",
      "rainfall": "High"
    },
    "irrigationDetails": "High water requirement. Critical stages: Formative, Grand Growth.",
    "avgPrice": 300,
    "image": "https://picsum.photos/seed/Sugarcane/400/300",
    "interCrops": [
      "Potato",
      "Onion",
      "Coriander"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Apply NPK in the ratio of 250:100:100 kg/ha.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting varies by local regional climate. Often onset of monsoon.",
    "n_ratio_kg_per_hectare": 250,
    "p_ratio_kg_per_hectare": 100,
    "k_ratio_kg_per_hectare": 100,
    "n_ratio_kg_per_acre": 101.17,
    "p_ratio_kg_per_acre": 40.47,
    "k_ratio_kg_per_acre": 40.47,
    "seed_rate_kg_per_hectare": 6000,
    "seed_rate_kg_per_acre": 2428.2,
    "avg_yield_kg_per_hectare": 80000,
    "avg_yield_kg_per_acre": 32376,
    "planting_density_per_acre": 100000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 250:100:100 kg per hectare."
    }
  },
  {
    "id": 46,
    "name": "Cotton",
    "icon": "🧵",
    "category": "Cash Crop",
    "growthDays": 100,
    "description": "Cotton stands out as a prominent cash crop-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 21-35°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Bacterial Blight and Leaf Curl Virus and Boll Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Bacterial Blight",
      "Leaf Curl Virus",
      "Boll Rot"
    ],
    "diseaseManagement": "Use Bt hybrids for Bollworm. Control sacking pests. Clean cultivation.",
    "varieties": [
      "Bt Hybrids",
      "RCH 659",
      "Bunny",
      "DCH 32"
    ],
    "climate": {
      "temperature": "21-35°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Irrigate at 15-20 day intervals. Critical: Flowering and Boll development.",
    "avgPrice": 6000,
    "image": "https://picsum.photos/seed/Cotton/400/300",
    "interCrops": [
      "Greengram",
      "Blackgram"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Apply NPK in the ratio of 120:60:60 kg/ha.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting varies by local regional climate. Often onset of monsoon.",
    "n_ratio_kg_per_hectare": 120,
    "p_ratio_kg_per_hectare": 60,
    "k_ratio_kg_per_hectare": 60,
    "n_ratio_kg_per_acre": 48.56,
    "p_ratio_kg_per_acre": 24.28,
    "k_ratio_kg_per_acre": 24.28,
    "seed_rate_kg_per_hectare": 15,
    "seed_rate_kg_per_acre": 6.07,
    "avg_yield_kg_per_hectare": 2500,
    "avg_yield_kg_per_acre": 1011.75,
    "planting_density_per_acre": 100000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 120:60:60 kg per hectare."
    }
  },
  {
    "id": 47,
    "name": "Jute",
    "icon": "🧶",
    "category": "Cash Crop",
    "growthDays": 100,
    "description": "Jute is a highly valued cash crop crop cultivated across various regions. It achieves optimal growth at temperatures around 24-35°C combined with High of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Stem Rot and Root Rot and Mosaic. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Stem Rot",
      "Root Rot",
      "Mosaic"
    ],
    "diseaseManagement": "Seed treatment. Crop rotation. Drainage.",
    "varieties": [
      "JRO 524",
      "JRO 204",
      "JRC 321"
    ],
    "climate": {
      "temperature": "24-35°C",
      "rainfall": "High"
    },
    "irrigationDetails": "Rainfed crop. Requires water for retting after harvest.",
    "avgPrice": 4500,
    "image": "https://picsum.photos/seed/Jute/400/300",
    "interCrops": [
      "Rice (in rotation)"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Apply NPK in the ratio of 80:40:40 kg/ha.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting varies by local regional climate. Often onset of monsoon.",
    "n_ratio_kg_per_hectare": 80,
    "p_ratio_kg_per_hectare": 40,
    "k_ratio_kg_per_hectare": 40,
    "n_ratio_kg_per_acre": 32.38,
    "p_ratio_kg_per_acre": 16.19,
    "k_ratio_kg_per_acre": 16.19,
    "seed_rate_kg_per_hectare": 5,
    "seed_rate_kg_per_acre": 2.02,
    "avg_yield_kg_per_hectare": 2500,
    "avg_yield_kg_per_acre": 1011.75,
    "planting_density_per_acre": 100000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 80:40:40 kg per hectare."
    }
  },
  {
    "id": 48,
    "name": "Tobacco",
    "icon": "🚬",
    "category": "Cash Crop",
    "growthDays": 100,
    "description": "Farmers widely cultivate Tobacco as a standard cash crop crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Tobacco Mosaic Virus and Leaf Curl and Damping Off. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Tobacco Mosaic Virus",
      "Leaf Curl",
      "Damping Off"
    ],
    "diseaseManagement": "Soil sterilization. Remove alternate hosts. Use resistant varieties.",
    "varieties": [
      "Anand 119",
      "GTH-1",
      "Bhavya"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Careful irrigation to maintain leaf quality. Avoid water logging.",
    "avgPrice": 12000,
    "image": "https://picsum.photos/seed/Tobacco/400/300",
    "interCrops": [
      "None"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Apply NPK in the ratio of 160:80:80 kg/ha.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting varies by local regional climate. Often onset of monsoon.",
    "n_ratio_kg_per_hectare": 160,
    "p_ratio_kg_per_hectare": 80,
    "k_ratio_kg_per_hectare": 80,
    "n_ratio_kg_per_acre": 64.75,
    "p_ratio_kg_per_acre": 32.38,
    "k_ratio_kg_per_acre": 32.38,
    "seed_rate_kg_per_hectare": 32,
    "seed_rate_kg_per_acre": 12.95,
    "avg_yield_kg_per_hectare": 3800,
    "avg_yield_kg_per_acre": 1537.86,
    "planting_density_per_acre": 100000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 160:80:80 kg per hectare."
    }
  },
  {
    "id": 49,
    "name": "Coffee",
    "icon": "☕",
    "category": "Plantation",
    "growthDays": 100,
    "description": "Coffee stands out as a prominent plantation-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 15-28°C combined with Humid of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Coffee Leaf Rust and Berry Borer and White Stem Borer. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Coffee Leaf Rust",
      "Berry Borer",
      "White Stem Borer"
    ],
    "diseaseManagement": "Spray Bordeaux mixture for rust. Trace the borer path and remove. Shade regulation.",
    "varieties": [
      "Chandragiri",
      "Sin. 9",
      "Cauvery"
    ],
    "climate": {
      "temperature": "15-28°C",
      "rainfall": "Humid"
    },
    "irrigationDetails": "Sprinkler irrigation (Blossom showers) is critical for flowering if rain fails.",
    "avgPrice": 15000,
    "image": "https://picsum.photos/seed/Coffee/400/300",
    "interCrops": [
      "Pepper",
      "Orange (in varying altitudes)"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Compost-rich; follow local recommendations",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting depends on region; typically spring",
    "n_ratio_kg_per_hectare": 160,
    "p_ratio_kg_per_hectare": 120,
    "k_ratio_kg_per_hectare": 160,
    "n_ratio_kg_per_acre": 64.75,
    "p_ratio_kg_per_acre": 48.56,
    "k_ratio_kg_per_acre": 64.75,
    "seed_rate_kg_per_hectare": 3000,
    "seed_rate_kg_per_acre": 1214.1,
    "avg_yield_kg_per_hectare": 1500,
    "avg_yield_kg_per_acre": 607.05,
    "planting_density_per_acre": 400,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 160:120:160 kg per hectare."
    }
  },
  {
    "id": 50,
    "name": "Tea",
    "icon": "🍵",
    "category": "Plantation",
    "growthDays": 100,
    "description": "Tea is a highly valued plantation crop cultivated across various regions. It achieves optimal growth at temperatures around 18-30°C combined with High of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Blister Blight and Red Rust and Tea Mosquito Bug. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Blister Blight",
      "Red Rust",
      "Tea Mosquito Bug"
    ],
    "diseaseManagement": "Spray Copper fungicides for blight. Pluck shoots regularly to reduce pest load.",
    "varieties": [
      "TV-23",
      "UPASI-9",
      "Assam varieties"
    ],
    "climate": {
      "temperature": "18-30°C",
      "rainfall": "High"
    },
    "irrigationDetails": "Sprinkler irrigation during drought months increases yield significantly.",
    "avgPrice": 20000,
    "image": "https://picsum.photos/seed/Tea/400/300",
    "interCrops": [
      "Shade trees (Grevillea robusta)"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Compost-rich; follow local recommendations",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting depends on region; typically spring",
    "n_ratio_kg_per_hectare": 120,
    "p_ratio_kg_per_hectare": 40,
    "k_ratio_kg_per_hectare": 40,
    "n_ratio_kg_per_acre": 48.56,
    "p_ratio_kg_per_acre": 16.19,
    "k_ratio_kg_per_acre": 16.19,
    "seed_rate_kg_per_hectare": 10000,
    "seed_rate_kg_per_acre": 4047,
    "avg_yield_kg_per_hectare": 2500,
    "avg_yield_kg_per_acre": 1011.75,
    "planting_density_per_acre": 400,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 120:40:40 kg per hectare."
    }
  },
  {
    "id": 51,
    "name": "Coconut",
    "icon": "🥥",
    "category": "Plantation",
    "growthDays": 100,
    "description": "Known for its excellent market demand, Coconut plays a crucial role in the plantation sector. It achieves optimal growth at temperatures around 27°C combined with High of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Root Wilt and Bud Rot and Rhinoceros Beetle. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Root Wilt",
      "Bud Rot",
      "Rhinoceros Beetle"
    ],
    "diseaseManagement": "Remove beetle from crown. Pour Bordeaux mixture for bud rot.",
    "varieties": [
      "Tall (WCT)",
      "Dwarf (Chowghat Orange)",
      "COD"
    ],
    "climate": {
      "temperature": "27°C",
      "rainfall": "High"
    },
    "irrigationDetails": "Adult palms require 200L water per week in summer. Drip/Basin irrigation.",
    "avgPrice": 3000,
    "image": "https://picsum.photos/seed/Coconut/400/300",
    "interCrops": [
      "Banana",
      "Cocoa",
      "Pineapple"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Compost-rich; follow local recommendations",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting depends on region; typically spring",
    "n_ratio_kg_per_hectare": 500,
    "p_ratio_kg_per_hectare": 320,
    "k_ratio_kg_per_hectare": 1200,
    "n_ratio_kg_per_acre": 202.35,
    "p_ratio_kg_per_acre": 129.5,
    "k_ratio_kg_per_acre": 485.64,
    "seed_rate_kg_per_hectare": 150,
    "seed_rate_kg_per_acre": 60.7,
    "avg_yield_kg_per_hectare": 15000,
    "avg_yield_kg_per_acre": 6070.5,
    "planting_density_per_acre": 400,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 500:320:1200 kg per hectare."
    }
  },
  {
    "id": 52,
    "name": "Rubber",
    "icon": "🌿",
    "category": "Plantation",
    "growthDays": 100,
    "description": "Farmers widely cultivate Rubber as a standard plantation crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with High of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Abnormal Leaf Fall and Powdery Mildew and Pink Disease. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Abnormal Leaf Fall",
      "Powdery Mildew",
      "Pink Disease"
    ],
    "diseaseManagement": "Prophylactic spray of Bordeaux oil for leaf fall. Sulfur dusting for mildew.",
    "varieties": [
      "RRII 105",
      "GT 1",
      "PB 260"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "High"
    },
    "irrigationDetails": "Mainly rainfed. Irrigation in nursery stage is essential.",
    "avgPrice": 15000,
    "image": "https://picsum.photos/seed/Rubber/400/300",
    "interCrops": [
      "Pineapple (in early years)"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Compost-rich; follow local recommendations",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting depends on region; typically spring",
    "n_ratio_kg_per_hectare": 150,
    "p_ratio_kg_per_hectare": 75,
    "k_ratio_kg_per_hectare": 75,
    "n_ratio_kg_per_acre": 60.7,
    "p_ratio_kg_per_acre": 30.35,
    "k_ratio_kg_per_acre": 30.35,
    "seed_rate_kg_per_hectare": 27,
    "seed_rate_kg_per_acre": 10.93,
    "avg_yield_kg_per_hectare": 3500,
    "avg_yield_kg_per_acre": 1416.45,
    "planting_density_per_acre": 400,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 150:75:75 kg per hectare."
    }
  },
  {
    "id": 53,
    "name": "Cashew",
    "icon": "🥜",
    "category": "Plantation",
    "growthDays": 100,
    "description": "Cashew stands out as a prominent plantation-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-35°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Tea Mosquito Bug and Stem Borer and Anthracnose. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Tea Mosquito Bug",
      "Stem Borer",
      "Anthracnose"
    ],
    "diseaseManagement": "Spray Monocrotophos during flushing. Remove borer grubs.",
    "varieties": [
      "Vengurla-4",
      "Ullal-3",
      "Priyanka"
    ],
    "climate": {
      "temperature": "20-35°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Though hardy, irrigation during fruit set improves nut size and retention.",
    "avgPrice": 8000,
    "image": "https://picsum.photos/seed/Cashew/400/300",
    "interCrops": [
      "Pineapple",
      "Vegetables"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Compost-rich; follow local recommendations",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting depends on region; typically spring",
    "n_ratio_kg_per_hectare": 195,
    "p_ratio_kg_per_hectare": 100,
    "k_ratio_kg_per_hectare": 100,
    "n_ratio_kg_per_acre": 78.92,
    "p_ratio_kg_per_acre": 40.47,
    "k_ratio_kg_per_acre": 40.47,
    "seed_rate_kg_per_hectare": 48,
    "seed_rate_kg_per_acre": 19.43,
    "avg_yield_kg_per_hectare": 4900,
    "avg_yield_kg_per_acre": 1983.03,
    "planting_density_per_acre": 400,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 195:100:100 kg per hectare."
    }
  },
  {
    "id": 54,
    "name": "Arecanut",
    "icon": "🌰",
    "category": "Plantation",
    "growthDays": 100,
    "description": "Arecanut stands out as a prominent plantation-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 14-36°C combined with High of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Koleroga (Fruit Rot) and Yellow Leaf Disease and Inflorescence Dieback. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Koleroga (Fruit Rot)",
      "Yellow Leaf Disease",
      "Inflorescence Dieback"
    ],
    "diseaseManagement": "Cover bunches with plastic to prevent rot. Bordeaux spray.",
    "varieties": [
      "Mangala",
      "Sumangala",
      "Mohitnagar"
    ],
    "climate": {
      "temperature": "14-36°C",
      "rainfall": "High"
    },
    "irrigationDetails": "Highly sensitive to drought. Irrigate every 4-7 days in summer.",
    "avgPrice": 40000,
    "image": "https://picsum.photos/seed/Arecanut/400/300",
    "interCrops": [
      "Banana",
      "Pepper",
      "Cocoa"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Compost-rich; follow local recommendations",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting depends on region; typically spring",
    "n_ratio_kg_per_hectare": 190,
    "p_ratio_kg_per_hectare": 95,
    "k_ratio_kg_per_hectare": 95,
    "n_ratio_kg_per_acre": 76.89,
    "p_ratio_kg_per_acre": 38.45,
    "k_ratio_kg_per_acre": 38.45,
    "seed_rate_kg_per_hectare": 46,
    "seed_rate_kg_per_acre": 18.62,
    "avg_yield_kg_per_hectare": 4700,
    "avg_yield_kg_per_acre": 1902.09,
    "planting_density_per_acre": 400,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 190:95:95 kg per hectare."
    }
  },
  {
    "id": 55,
    "name": "Turmeric",
    "icon": "🧡",
    "category": "Spice",
    "growthDays": 100,
    "description": "Turmeric stands out as a prominent spice-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-35°C combined with High of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Rhizome Rot and Leaf Spot and Leaf Blotch. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Rhizome Rot",
      "Leaf Spot",
      "Leaf Blotch"
    ],
    "diseaseManagement": "Seed treatment with Metalaxyl. Good drainage. Spray Mancozeb.",
    "varieties": [
      "Pratibha",
      "Salem",
      "IISR Prabhavathi"
    ],
    "climate": {
      "temperature": "20-35°C",
      "rainfall": "High"
    },
    "irrigationDetails": "Life saving irrigation required if monsoon fails. Maintain moisture.",
    "avgPrice": 7000,
    "image": "https://picsum.photos/seed/Turmeric/400/300",
    "interCrops": [
      "Maize",
      "Chilli",
      "Vegetables"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 95:55:55 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting varies by local regional climate. Often onset of monsoon.",
    "n_ratio_kg_per_hectare": 95,
    "p_ratio_kg_per_hectare": 55,
    "k_ratio_kg_per_hectare": 55,
    "n_ratio_kg_per_acre": 38.45,
    "p_ratio_kg_per_acre": 22.26,
    "k_ratio_kg_per_acre": 22.26,
    "seed_rate_kg_per_hectare": 44,
    "seed_rate_kg_per_acre": 17.81,
    "avg_yield_kg_per_hectare": 4500,
    "avg_yield_kg_per_acre": 1821.15,
    "planting_density_per_acre": 30000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 95:55:55 kg per hectare."
    }
  },
  {
    "id": 56,
    "name": "Cardamom",
    "icon": "🟢",
    "category": "Spice",
    "growthDays": 100,
    "description": "Cardamom stands out as a prominent spice-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 10-35°C combined with Very High of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Katte Virus and Capsule Rot and Thrips. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Katte Virus",
      "Capsule Rot",
      "Thrips"
    ],
    "diseaseManagement": "Remove Katte infected plants. Shade regulation. Control thrips.",
    "varieties": [
      "Njallani",
      "Mudigere-1",
      "ICRI-2"
    ],
    "climate": {
      "temperature": "10-35°C",
      "rainfall": "Very High"
    },
    "irrigationDetails": "Constant moisture is key. Sprinkler/Mist irrigation in summer.",
    "avgPrice": 150000,
    "image": "https://picsum.photos/seed/Cardamom/400/300",
    "interCrops": [
      "Coffee",
      "Arecanut (as mixed crop)"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 90:55:55 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting varies by local regional climate. Often onset of monsoon.",
    "n_ratio_kg_per_hectare": 90,
    "p_ratio_kg_per_hectare": 55,
    "k_ratio_kg_per_hectare": 55,
    "n_ratio_kg_per_acre": 36.42,
    "p_ratio_kg_per_acre": 22.26,
    "k_ratio_kg_per_acre": 22.26,
    "seed_rate_kg_per_hectare": 42,
    "seed_rate_kg_per_acre": 17,
    "avg_yield_kg_per_hectare": 4300,
    "avg_yield_kg_per_acre": 1740.21,
    "planting_density_per_acre": 30000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 90:55:55 kg per hectare."
    }
  },
  {
    "id": 57,
    "name": "Black Pepper",
    "icon": "⚫",
    "category": "Spice",
    "growthDays": 100,
    "description": "Known for its excellent market demand, Black Pepper plays a crucial role in the spice sector. It achieves optimal growth at temperatures around 10-40°C combined with High of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Quick Wilt (Foot Rot) and Slow Wilt and Pollu Beetle. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Quick Wilt (Foot Rot)",
      "Slow Wilt",
      "Pollu Beetle"
    ],
    "diseaseManagement": "Apply Trichoderma. Drench with Copper Oxychloride. Prune runner shoots.",
    "varieties": [
      "Panniyur-1",
      "Sreekara",
      "Subhakara"
    ],
    "climate": {
      "temperature": "10-40°C",
      "rainfall": "High"
    },
    "irrigationDetails": "Irrigation during summer spike initiation helps.",
    "avgPrice": 40000,
    "image": "https://picsum.photos/seed/BlackPepper/400/300",
    "interCrops": [
      "Coffee",
      "Arecanut",
      "Coconut"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 75:40:40 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting varies by local regional climate. Often onset of monsoon.",
    "n_ratio_kg_per_hectare": 75,
    "p_ratio_kg_per_hectare": 40,
    "k_ratio_kg_per_hectare": 40,
    "n_ratio_kg_per_acre": 30.35,
    "p_ratio_kg_per_acre": 16.19,
    "k_ratio_kg_per_acre": 16.19,
    "seed_rate_kg_per_hectare": 25,
    "seed_rate_kg_per_acre": 10.12,
    "avg_yield_kg_per_hectare": 2500,
    "avg_yield_kg_per_acre": 1011.75,
    "planting_density_per_acre": 30000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 75:40:40 kg per hectare."
    }
  },
  {
    "id": 58,
    "name": "Clove",
    "icon": "🟤",
    "category": "Spice",
    "growthDays": 100,
    "description": "Clove stands out as a prominent spice-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with High of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Sumatra Disease and Leaf Spot and Seedling Wilt. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Sumatra Disease",
      "Leaf Spot",
      "Seedling Wilt"
    ],
    "diseaseManagement": "Cut and burn wilted trees (no cure for Sumatra). Spray Bordeaux.",
    "varieties": [
      "Zanzibar",
      "Amboyna"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "High"
    },
    "irrigationDetails": "Watering required in initial 3-4 years. Adult trees are rainfed.",
    "avgPrice": 70000,
    "image": "https://picsum.photos/seed/Clove/400/300",
    "interCrops": [
      "Coconut",
      "Arecanut"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 95:60:60 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting varies by local regional climate. Often onset of monsoon.",
    "n_ratio_kg_per_hectare": 95,
    "p_ratio_kg_per_hectare": 60,
    "k_ratio_kg_per_hectare": 60,
    "n_ratio_kg_per_acre": 38.45,
    "p_ratio_kg_per_acre": 24.28,
    "k_ratio_kg_per_acre": 24.28,
    "seed_rate_kg_per_hectare": 47,
    "seed_rate_kg_per_acre": 19.02,
    "avg_yield_kg_per_hectare": 4800,
    "avg_yield_kg_per_acre": 1942.56,
    "planting_density_per_acre": 30000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 95:60:60 kg per hectare."
    }
  },
  {
    "id": 59,
    "name": "Coriander",
    "icon": "🌿",
    "category": "Spice",
    "growthDays": 100,
    "description": "Known for its excellent market demand, Coriander plays a crucial role in the spice sector. It achieves optimal growth at temperatures around 20-25°C combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Stem Gall and Powdery Mildew and Wilt. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Stem Gall",
      "Powdery Mildew",
      "Wilt"
    ],
    "diseaseManagement": "Seed treatment. Sulfur dusting. Avoid water stagnation.",
    "varieties": [
      "Hisar Anand",
      "Pant Haritma",
      "Sadhana"
    ],
    "climate": {
      "temperature": "20-25°C",
      "rainfall": "Low"
    },
    "irrigationDetails": "Requires 3-4 irrigations depending on soil moisture.",
    "avgPrice": 7000,
    "image": "https://picsum.photos/seed/Coriander/400/300",
    "interCrops": [
      "Sugarcane",
      "Wheat"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 70:40:40 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting varies by local regional climate. Often onset of monsoon.",
    "n_ratio_kg_per_hectare": 70,
    "p_ratio_kg_per_hectare": 40,
    "k_ratio_kg_per_hectare": 40,
    "n_ratio_kg_per_acre": 28.33,
    "p_ratio_kg_per_acre": 16.19,
    "k_ratio_kg_per_acre": 16.19,
    "seed_rate_kg_per_hectare": 22,
    "seed_rate_kg_per_acre": 8.9,
    "avg_yield_kg_per_hectare": 2200,
    "avg_yield_kg_per_acre": 890.34,
    "planting_density_per_acre": 30000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 70:40:40 kg per hectare."
    }
  },
  {
    "id": 60,
    "name": "Cumin",
    "icon": "🟤",
    "category": "Spice",
    "growthDays": 100,
    "description": "Cumin stands out as a prominent spice-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 25-30°C combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Blight and Wilt and Powdery Mildew. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Blight",
      "Wilt",
      "Powdery Mildew"
    ],
    "diseaseManagement": "Spray Mancozeb. Crop rotation. Resitant varieties.",
    "varieties": [
      "GC-4",
      "RZ-209",
      "RZ-223"
    ],
    "climate": {
      "temperature": "25-30°C",
      "rainfall": "Low"
    },
    "irrigationDetails": "Light irrigation only. Avoid water at flowering.",
    "avgPrice": 25000,
    "image": "https://picsum.photos/seed/Cumin/400/300",
    "interCrops": [
      "None"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 95:60:60 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting varies by local regional climate. Often onset of monsoon.",
    "n_ratio_kg_per_hectare": 95,
    "p_ratio_kg_per_hectare": 60,
    "k_ratio_kg_per_hectare": 60,
    "n_ratio_kg_per_acre": 38.45,
    "p_ratio_kg_per_acre": 24.28,
    "k_ratio_kg_per_acre": 24.28,
    "seed_rate_kg_per_hectare": 47,
    "seed_rate_kg_per_acre": 19.02,
    "avg_yield_kg_per_hectare": 4800,
    "avg_yield_kg_per_acre": 1942.56,
    "planting_density_per_acre": 30000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 95:60:60 kg per hectare."
    }
  },
  {
    "id": 61,
    "name": "Fenugreek",
    "icon": "🌿",
    "category": "Spice",
    "growthDays": 100,
    "description": "Known for its excellent market demand, Fenugreek plays a crucial role in the spice sector. It achieves optimal growth at temperatures around Cool combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Root Rot and Powdery Mildew and Downy Mildew. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Root Rot",
      "Powdery Mildew",
      "Downy Mildew"
    ],
    "diseaseManagement": "Seed treatment with Rhizobium. Sulfur dusting.",
    "varieties": [
      "Hisar Sonali",
      "Rmt-1",
      "Pusa Early Bunching"
    ],
    "climate": {
      "temperature": "Cool",
      "rainfall": "Low"
    },
    "irrigationDetails": "Requires 4-5 irrigations. Pre-flowering and pod formation are critical.",
    "avgPrice": 6000,
    "image": "https://picsum.photos/seed/Fenugreek/400/300",
    "interCrops": [
      "Wheat",
      "Mustard"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 75:40:40 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting varies by local regional climate. Often onset of monsoon.",
    "n_ratio_kg_per_hectare": 75,
    "p_ratio_kg_per_hectare": 40,
    "k_ratio_kg_per_hectare": 40,
    "n_ratio_kg_per_acre": 30.35,
    "p_ratio_kg_per_acre": 16.19,
    "k_ratio_kg_per_acre": 16.19,
    "seed_rate_kg_per_hectare": 24,
    "seed_rate_kg_per_acre": 9.71,
    "avg_yield_kg_per_hectare": 2500,
    "avg_yield_kg_per_acre": 1011.75,
    "planting_density_per_acre": 30000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 75:40:40 kg per hectare."
    }
  },
  {
    "id": 62,
    "name": "Sesame",
    "icon": "⚪",
    "category": "Oilseed",
    "growthDays": 100,
    "description": "Known for its excellent market demand, Sesame plays a crucial role in the oilseed sector. It achieves optimal growth at temperatures around 25-30°C combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Phyllody and Leaf Spot and Wilt. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Phyllody",
      "Leaf Spot",
      "Wilt"
    ],
    "diseaseManagement": "Remove Phyllody infected plants (vector control). Seed treatment with Carbendazim.",
    "varieties": [
      "TKG-22",
      "GT-1",
      "VRI-3",
      "RT-351"
    ],
    "climate": {
      "temperature": "25-30°C",
      "rainfall": "Low"
    },
    "irrigationDetails": "Drought tolerant. Irrigate at flowering and pod formation if dry.",
    "avgPrice": 12000,
    "image": "https://picsum.photos/seed/Sesame/400/300",
    "interCrops": [
      "Mungbean",
      "Urdbean"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 40:25:25 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Kharif (Jun-Jul) or Rabi (Oct-Nov) based on region",
    "n_ratio_kg_per_hectare": 40,
    "p_ratio_kg_per_hectare": 25,
    "k_ratio_kg_per_hectare": 25,
    "n_ratio_kg_per_acre": 16.19,
    "p_ratio_kg_per_acre": 10.12,
    "k_ratio_kg_per_acre": 10.12,
    "seed_rate_kg_per_hectare": 9,
    "seed_rate_kg_per_acre": 3.64,
    "avg_yield_kg_per_hectare": 1500,
    "avg_yield_kg_per_acre": 607.05,
    "planting_density_per_acre": 150000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 40:25:25 kg per hectare."
    }
  },
  {
    "id": 63,
    "name": "Sunflower",
    "icon": "🌻",
    "category": "Oilseed",
    "growthDays": 100,
    "description": "Sunflower stands out as a prominent oilseed-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around Day Neutral combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Necrosis Virus and Downy Mildew and Head Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Necrosis Virus",
      "Downy Mildew",
      "Head Rot"
    ],
    "diseaseManagement": "Seed treatment with Metalaxyl. Control Thrips for necrosis.",
    "varieties": [
      "Morden",
      "KBSH-1",
      "DRSH-1"
    ],
    "climate": {
      "temperature": "Day Neutral",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Sensitive to moisture stress at buttoning and flowering stages.",
    "avgPrice": 5000,
    "image": "https://picsum.photos/seed/Sunflower/400/300",
    "interCrops": [
      "Soybean",
      "Groundnut"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 60:30:30 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Kharif (Jun-Jul) or Rabi (Oct-Nov) based on region",
    "n_ratio_kg_per_hectare": 60,
    "p_ratio_kg_per_hectare": 30,
    "k_ratio_kg_per_hectare": 30,
    "n_ratio_kg_per_acre": 24.28,
    "p_ratio_kg_per_acre": 12.14,
    "k_ratio_kg_per_acre": 12.14,
    "seed_rate_kg_per_hectare": 5,
    "seed_rate_kg_per_acre": 2.02,
    "avg_yield_kg_per_hectare": 1500,
    "avg_yield_kg_per_acre": 607.05,
    "planting_density_per_acre": 150000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 60:30:30 kg per hectare."
    }
  },
  {
    "id": 64,
    "name": "Linseed",
    "icon": "🌿",
    "category": "Oilseed",
    "growthDays": 100,
    "description": "Farmers widely cultivate Linseed as a standard oilseed crop bringing steady economic returns. It achieves optimal growth at temperatures around Cool combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Wilt and Rust and Powdery Mildew. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Wilt",
      "Rust",
      "Powdery Mildew"
    ],
    "diseaseManagement": "Grow resistant varieties like Neelum. Seed treatment with Trichoderma.",
    "varieties": [
      "Neelam",
      "Garima",
      "T-397"
    ],
    "climate": {
      "temperature": "Cool",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Requires 2-3 irrigations. Critical: Flowering and grain filling.",
    "avgPrice": 6000,
    "image": "https://picsum.photos/seed/Linseed/400/300",
    "interCrops": [
      "Gram",
      "Lentil"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 45:30:30 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Kharif (Jun-Jul) or Rabi (Oct-Nov) based on region",
    "n_ratio_kg_per_hectare": 45,
    "p_ratio_kg_per_hectare": 30,
    "k_ratio_kg_per_hectare": 30,
    "n_ratio_kg_per_acre": 18.21,
    "p_ratio_kg_per_acre": 12.14,
    "k_ratio_kg_per_acre": 12.14,
    "seed_rate_kg_per_hectare": 13,
    "seed_rate_kg_per_acre": 5.26,
    "avg_yield_kg_per_hectare": 1900,
    "avg_yield_kg_per_acre": 768.93,
    "planting_density_per_acre": 150000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 45:30:30 kg per hectare."
    }
  },
  {
    "id": 65,
    "name": "Castor",
    "icon": "🌿",
    "category": "Oilseed",
    "growthDays": 100,
    "description": "Castor stands out as a prominent oilseed-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around Dry/Warm combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Wilt and Botrytis Gray Mold and Capsule Borer. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Wilt",
      "Botrytis Gray Mold",
      "Capsule Borer"
    ],
    "diseaseManagement": "Use wilt resistant hybrids like GCH-7. Spray Carbendazim for mold.",
    "varieties": [
      "GCH-7",
      "DCH-177",
      "Aruna"
    ],
    "climate": {
      "temperature": "Dry/Warm",
      "rainfall": "Low"
    },
    "irrigationDetails": "Deep rooted and drought hardy. Drip irrigation increases yield 30%.",
    "avgPrice": 5500,
    "image": "https://picsum.photos/seed/Castor/400/300",
    "interCrops": [
      "Clusterbean",
      "Cowpea"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 60:40:40 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Kharif (Jun-Jul) or Rabi (Oct-Nov) based on region",
    "n_ratio_kg_per_hectare": 60,
    "p_ratio_kg_per_hectare": 40,
    "k_ratio_kg_per_hectare": 40,
    "n_ratio_kg_per_acre": 24.28,
    "p_ratio_kg_per_acre": 16.19,
    "k_ratio_kg_per_acre": 16.19,
    "seed_rate_kg_per_hectare": 19,
    "seed_rate_kg_per_acre": 7.69,
    "avg_yield_kg_per_hectare": 2400,
    "avg_yield_kg_per_acre": 971.28,
    "planting_density_per_acre": 150000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 60:40:40 kg per hectare."
    }
  },
  {
    "id": 66,
    "name": "Safflower",
    "icon": "🌼",
    "category": "Oilseed",
    "growthDays": 100,
    "description": "Safflower stands out as a prominent oilseed-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around Cool/Dry combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Alternaria Leaf Spot and Wilt. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Alternaria Leaf Spot",
      "Wilt"
    ],
    "diseaseManagement": "Seed treatment with Thiram. Clean cultivation.",
    "varieties": [
      "Bhima",
      "Nari-6",
      "Manjira"
    ],
    "climate": {
      "temperature": "Cool/Dry",
      "rainfall": "Low"
    },
    "irrigationDetails": "Highly drought tolerant. One irrigation at 30 DAS boosts yield.",
    "avgPrice": 5000,
    "image": "https://picsum.photos/seed/Safflower/400/300",
    "interCrops": [
      "Coriander",
      "Wheat"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 40:20:20 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Kharif (Jun-Jul) or Rabi (Oct-Nov) based on region",
    "n_ratio_kg_per_hectare": 40,
    "p_ratio_kg_per_hectare": 20,
    "k_ratio_kg_per_hectare": 20,
    "n_ratio_kg_per_acre": 16.19,
    "p_ratio_kg_per_acre": 8.09,
    "k_ratio_kg_per_acre": 8.09,
    "seed_rate_kg_per_hectare": 10,
    "seed_rate_kg_per_acre": 4.05,
    "avg_yield_kg_per_hectare": 1200,
    "avg_yield_kg_per_acre": 485.64,
    "planting_density_per_acre": 150000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 40:20:20 kg per hectare."
    }
  },
  {
    "id": 67,
    "name": "Beetroot",
    "icon": "🟣",
    "category": "Vegetable",
    "growthDays": 90,
    "description": "Beetroot is a highly valued vegetable crop cultivated across various regions. It achieves optimal growth at temperatures around 10-25°C combined with Moderate of rainfall. The crop performs exceptionally well in Loamy soil rich in organic matter.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Maintain proper spacing and avoid waterlogging.",
    "varieties": [
      "Detroit Dark Red",
      "Ruby Queen"
    ],
    "climate": {
      "temperature": "10-25°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular watering required.",
    "avgPrice": 40,
    "image": "https://picsum.photos/seed/Beetroot/400/300",
    "interCrops": [
      "Onion",
      "Lettuce"
    ],
    "soilType": "Loamy soil rich in organic matter.",
    "watering": {
      "min": 300,
      "max": 450
    },
    "sunlight": "Full sun",
    "fertilizer": "High Phosphorus and Potassium.",
    "pests": "Aphids, Leaf miners",
    "harvest": "Harvest when roots reach desired size.",
    "market": "Constant demand in local markets.",
    "plantingSeason": "Aug-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 95,
    "p_ratio_kg_per_hectare": 50,
    "k_ratio_kg_per_hectare": 50,
    "n_ratio_kg_per_acre": 38.45,
    "p_ratio_kg_per_acre": 20.23,
    "k_ratio_kg_per_acre": 20.23,
    "seed_rate_kg_per_hectare": 3,
    "seed_rate_kg_per_acre": 1.21,
    "avg_yield_kg_per_hectare": 14900,
    "avg_yield_kg_per_acre": 6030.03,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [],
      "fertilizer_parsed_from": "NPK 95:50:50 kg per hectare."
    }
  },
  {
    "id": 68,
    "name": "Mint",
    "icon": "🌿",
    "category": "Herb",
    "growthDays": 100,
    "description": "Mint is a highly valued herb crop cultivated across various regions. It achieves optimal growth at temperatures around Tropical combined with High of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Rust and Wilt and Leaf Blight. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Rust",
      "Wilt",
      "Leaf Blight"
    ],
    "diseaseManagement": "Use healthy stolons. Spray Mancozeb for blight.",
    "varieties": [
      "Kosi",
      "Himalaya",
      "Saksham"
    ],
    "climate": {
      "temperature": "Tropical",
      "rainfall": "High"
    },
    "irrigationDetails": "Frequent irrigation required. Keep soil moist but not waterlogged.",
    "avgPrice": 2000,
    "image": "https://picsum.photos/seed/Mint/400/300",
    "interCrops": [
      "None"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Apply NPK in the ratio of 105:50:50 kg/ha.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting varies by local regional climate. Often onset of monsoon.",
    "n_ratio_kg_per_hectare": 105,
    "p_ratio_kg_per_hectare": 50,
    "k_ratio_kg_per_hectare": 50,
    "n_ratio_kg_per_acre": 42.49,
    "p_ratio_kg_per_acre": 20.23,
    "k_ratio_kg_per_acre": 20.23,
    "seed_rate_kg_per_hectare": 6,
    "seed_rate_kg_per_acre": 2.43,
    "avg_yield_kg_per_hectare": 2100,
    "avg_yield_kg_per_acre": 849.87,
    "planting_density_per_acre": 100000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 105:50:50 kg per hectare."
    }
  },
  {
    "id": 69,
    "name": "Basil",
    "icon": "🌿",
    "category": "Herb",
    "growthDays": 100,
    "description": "Basil stands out as a prominent herb-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around Warm combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Downy Mildew and Wilt. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Downy Mildew",
      "Wilt"
    ],
    "diseaseManagement": "Improved drainage. Use of bio-fungicides.",
    "varieties": [
      "CIM-Saumya",
      "Vikarsudha"
    ],
    "climate": {
      "temperature": "Warm",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Irrigation once a week. Reduce watering before harvest.",
    "avgPrice": 15000,
    "image": "https://picsum.photos/seed/Basil/400/300",
    "interCrops": [
      "None"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Apply NPK in the ratio of 190:95:95 kg/ha.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting varies by local regional climate. Often onset of monsoon.",
    "n_ratio_kg_per_hectare": 190,
    "p_ratio_kg_per_hectare": 95,
    "k_ratio_kg_per_hectare": 95,
    "n_ratio_kg_per_acre": 76.89,
    "p_ratio_kg_per_acre": 38.45,
    "k_ratio_kg_per_acre": 38.45,
    "seed_rate_kg_per_hectare": 46,
    "seed_rate_kg_per_acre": 18.62,
    "avg_yield_kg_per_hectare": 4800,
    "avg_yield_kg_per_acre": 1942.56,
    "planting_density_per_acre": 100000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 190:95:95 kg per hectare."
    }
  },
  {
    "id": 70,
    "name": "Lemongrass",
    "icon": "🌿",
    "category": "Herb",
    "growthDays": 100,
    "description": "Known for its excellent market demand, Lemongrass plays a crucial role in the herb sector. It achieves optimal growth at temperatures around Tropical combined with High of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Rust and Smut. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Rust",
      "Smut"
    ],
    "diseaseManagement": "Spray Propiconazole. Remove infected leaves.",
    "varieties": [
      "Sugandhi",
      "Pragati",
      "Krishna"
    ],
    "climate": {
      "temperature": "Tropical",
      "rainfall": "High"
    },
    "irrigationDetails": "Irrigate during dry summer months. Stubble maintenance is key.",
    "avgPrice": 5000,
    "image": "https://picsum.photos/seed/Lemongrass/400/300",
    "interCrops": [
      "None"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Apply NPK in the ratio of 140:70:70 kg/ha.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting varies by local regional climate. Often onset of monsoon.",
    "n_ratio_kg_per_hectare": 140,
    "p_ratio_kg_per_hectare": 70,
    "k_ratio_kg_per_hectare": 70,
    "n_ratio_kg_per_acre": 56.66,
    "p_ratio_kg_per_acre": 28.33,
    "k_ratio_kg_per_acre": 28.33,
    "seed_rate_kg_per_hectare": 22,
    "seed_rate_kg_per_acre": 8.9,
    "avg_yield_kg_per_hectare": 3200,
    "avg_yield_kg_per_acre": 1295.04,
    "planting_density_per_acre": 100000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 140:70:70 kg per hectare."
    }
  },
  {
    "id": 71,
    "name": "Strawberry",
    "icon": "🍓",
    "category": "Fruit",
    "growthDays": 100,
    "description": "Strawberry stands out as a prominent fruit-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 10-25°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Botrytis Rot and Spider Mites. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Spot",
      "Botrytis Rot",
      "Spider Mites"
    ],
    "diseaseManagement": "Use virus-free runners. Mulching to prevent fruit rot. Control mites.",
    "varieties": [
      "Chandler",
      "Sweet Charlie",
      "Camarosa"
    ],
    "climate": {
      "temperature": "10-25°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Drip irrigation is mandatory due to shallow roots.",
    "avgPrice": 20000,
    "image": "https://picsum.photos/seed/Strawberry/400/300",
    "interCrops": [
      "None"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Compost-rich; follow local recommendations",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting depends on region; typically spring",
    "n_ratio_kg_per_hectare": 250,
    "p_ratio_kg_per_hectare": 125,
    "k_ratio_kg_per_hectare": 250,
    "n_ratio_kg_per_acre": 101.17,
    "p_ratio_kg_per_acre": 50.59,
    "k_ratio_kg_per_acre": 101.17,
    "seed_rate_kg_per_hectare": 405,
    "seed_rate_kg_per_acre": 163.9,
    "avg_yield_kg_per_hectare": 32900,
    "avg_yield_kg_per_acre": 13314.63,
    "planting_density_per_acre": 1000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 250:125:250 kg per hectare."
    }
  },
  {
    "id": 72,
    "name": "Dragon Fruit",
    "icon": "🐉",
    "category": "Fruit",
    "growthDays": 100,
    "description": "Dragon Fruit stands out as a prominent fruit-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Stem Rot and Anthracnose. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Stem Rot",
      "Anthracnose"
    ],
    "diseaseManagement": "Avoid over watering. Copper sprays.",
    "varieties": [
      "Red Fleshed",
      "White Fleshed"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Low"
    },
    "irrigationDetails": "Low water requirement. Drip irrigation recommended.",
    "avgPrice": 10000,
    "image": "https://picsum.photos/seed/DragonFruit/400/300",
    "interCrops": [
      "Vegetables (initial years)"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Compost-rich; follow local recommendations",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Planting depends on region; typically spring",
    "n_ratio_kg_per_hectare": 295,
    "p_ratio_kg_per_hectare": 145,
    "k_ratio_kg_per_hectare": 295,
    "n_ratio_kg_per_acre": 119.39,
    "p_ratio_kg_per_acre": 58.68,
    "k_ratio_kg_per_acre": 119.39,
    "seed_rate_kg_per_hectare": 489,
    "seed_rate_kg_per_acre": 197.9,
    "avg_yield_kg_per_hectare": 39200,
    "avg_yield_kg_per_acre": 15864.24,
    "planting_density_per_acre": 1000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 295:145:295 kg per hectare."
    }
  },
  {
    "id": 73,
    "name": "Chayote",
    "icon": "🍐",
    "category": "Vegetable",
    "growthDays": 130,
    "description": "Farmers widely cultivate Chayote as a standard vegetable crop bringing steady economic returns. It achieves optimal growth at temperatures around 25-35°C combined with High of rainfall. The crop performs exceptionally well in Well-drained soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Fungal Blight. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Fungal Blight"
    ],
    "diseaseManagement": "Use appropriate fungicide.",
    "varieties": [
      "Local"
    ],
    "climate": {
      "temperature": "25-35°C",
      "rainfall": "High"
    },
    "irrigationDetails": "Consistent moisture needed.",
    "avgPrice": 50,
    "image": "https://picsum.photos/seed/Chayote/400/300",
    "interCrops": [],
    "soilType": "Well-drained soil.",
    "watering": {
      "min": 400,
      "max": 700
    },
    "sunlight": "Partial sun",
    "fertilizer": "Compost.",
    "pests": "Beetles",
    "harvest": "Harvest when mature.",
    "market": "Local market.",
    "plantingSeason": "Monsoon",
    "n_ratio_kg_per_hectare": 130,
    "p_ratio_kg_per_hectare": 70,
    "k_ratio_kg_per_hectare": 70,
    "n_ratio_kg_per_acre": 52.61,
    "p_ratio_kg_per_acre": 28.33,
    "k_ratio_kg_per_acre": 28.33,
    "seed_rate_kg_per_hectare": 7,
    "seed_rate_kg_per_acre": 2.83,
    "avg_yield_kg_per_hectare": 24000,
    "avg_yield_kg_per_acre": 9712.8,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [],
      "fertilizer_parsed_from": "NPK 130:70:70 kg per hectare."
    }
  },
  {
    "id": 74,
    "name": "Sweet Potato",
    "icon": "🍠",
    "category": "Root Vegetable",
    "growthDays": 100,
    "description": "Sweet Potato stands out as a prominent root vegetable-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Weevil and Vine Borers. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Weevil",
      "Vine Borers"
    ],
    "diseaseManagement": "Use clean vines. Earth up to prevent weevil entry.",
    "varieties": [
      "Sree Bhadra",
      "Sree Nandini",
      "Varsha"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Irrigate at planting and then weekly. Avoid water stagnation.",
    "avgPrice": 2500,
    "image": "https://picsum.photos/seed/SweetPotato/400/300",
    "interCrops": [
      "Maize"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 200:100:100 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Seasonal (varies) — often multiple windows",
    "n_ratio_kg_per_hectare": 200,
    "p_ratio_kg_per_hectare": 100,
    "k_ratio_kg_per_hectare": 100,
    "n_ratio_kg_per_acre": 80.94,
    "p_ratio_kg_per_acre": 40.47,
    "k_ratio_kg_per_acre": 40.47,
    "seed_rate_kg_per_hectare": 49,
    "seed_rate_kg_per_acre": 19.83,
    "avg_yield_kg_per_hectare": 5000,
    "avg_yield_kg_per_acre": 2023.5,
    "planting_density_per_acre": 40000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 200:100:100 kg per hectare."
    }
  },
  {
    "id": 75,
    "name": "Lettuce",
    "icon": "🥬",
    "category": "Leafy Vegetable",
    "growthDays": 100,
    "description": "Lettuce stands out as a prominent leafy vegetable-type crop with widespread agricultural importance. It requires adequate soil moisture and a steady climate to thrive. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 200:100:100 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Seasonal (varies) — often multiple windows",
    "n_ratio_kg_per_hectare": 200,
    "p_ratio_kg_per_hectare": 100,
    "k_ratio_kg_per_hectare": 100,
    "n_ratio_kg_per_acre": 80.94,
    "p_ratio_kg_per_acre": 40.47,
    "k_ratio_kg_per_acre": 40.47,
    "seed_rate_kg_per_hectare": 49,
    "seed_rate_kg_per_acre": 19.83,
    "avg_yield_kg_per_hectare": 4900,
    "avg_yield_kg_per_acre": 1983.03,
    "planting_density_per_acre": 60000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 200:100:100 kg per hectare."
    }
  },
  {
    "id": 76,
    "name": "Mustard Green",
    "icon": "🥬",
    "category": "Leafy Vegetable",
    "growthDays": 100,
    "description": "Known for its excellent market demand, Mustard Green plays a crucial role in the leafy vegetable sector. It achieves optimal growth at temperatures around 10-25°C combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like White Rust and Downy Mildew and Alternaria Blight. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "White Rust",
      "Downy Mildew",
      "Alternaria Blight"
    ],
    "diseaseManagement": "Seed treatment with Apron SD. Spray Mancozeb.",
    "varieties": [
      "Pusa Saag",
      "Pusa Gold"
    ],
    "climate": {
      "temperature": "10-25°C",
      "rainfall": "Low"
    },
    "irrigationDetails": "Light frequent irrigation. Avoid water logging.",
    "avgPrice": 1500,
    "image": "https://picsum.photos/seed/MustardGreen/400/300",
    "interCrops": [
      "Gram",
      "Wheat"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 130:65:65 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Seasonal (varies) — often multiple windows",
    "n_ratio_kg_per_hectare": 130,
    "p_ratio_kg_per_hectare": 65,
    "k_ratio_kg_per_hectare": 65,
    "n_ratio_kg_per_acre": 52.61,
    "p_ratio_kg_per_acre": 26.31,
    "k_ratio_kg_per_acre": 26.31,
    "seed_rate_kg_per_hectare": 17,
    "seed_rate_kg_per_acre": 6.88,
    "avg_yield_kg_per_hectare": 2900,
    "avg_yield_kg_per_acre": 1173.63,
    "planting_density_per_acre": 60000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 130:65:65 kg per hectare."
    }
  },
  {
    "id": 77,
    "name": "Broccoli",
    "icon": "🥦",
    "category": "Vegetable",
    "growthDays": 100,
    "description": "Broccoli is a highly valued vegetable crop cultivated across various regions. It achieves optimal growth at temperatures around 15-20°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Black Rot and Downy Mildew and Club Root. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Black Rot",
      "Downy Mildew",
      "Club Root"
    ],
    "diseaseManagement": "Hot water seed treatment. Crop rotation. Copper sprays.",
    "varieties": [
      "Pusa KTS-1",
      "Palam Samridhi",
      "Green Magic"
    ],
    "climate": {
      "temperature": "15-20°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Requires frequent irrigation. Soil should remain moist.",
    "avgPrice": 4000,
    "image": "https://picsum.photos/seed/Broccoli/400/300",
    "interCrops": [
      "Lettuce"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 95:50:50 kg per hectare.",
    "pests": "General Pest",
    "harvest": "After about 100 days when crop reaches maturity",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Seasonal (varies) — often multiple windows",
    "n_ratio_kg_per_hectare": 95,
    "p_ratio_kg_per_hectare": 50,
    "k_ratio_kg_per_hectare": 50,
    "n_ratio_kg_per_acre": 38.45,
    "p_ratio_kg_per_acre": 20.23,
    "k_ratio_kg_per_acre": 20.23,
    "seed_rate_kg_per_hectare": 2,
    "seed_rate_kg_per_acre": 0.81,
    "avg_yield_kg_per_hectare": 14100,
    "avg_yield_kg_per_acre": 5706.27,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 95:50:50 kg per hectare."
    }
  },
  {
    "id": 78,
    "name": "Sorghum (Jowar)",
    "icon": "🌾",
    "category": "Cereal",
    "growthDays": 110,
    "description": "Farmers widely cultivate Sorghum (Jowar) as a standard cereal crop bringing steady economic returns. It achieves optimal growth at temperatures around 25-35°C combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Grain Mold and Downy Mildew and Shoot Fly. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Grain Mold",
      "Downy Mildew",
      "Shoot Fly"
    ],
    "diseaseManagement": "Early sowing to avoid shoot fly. Seed treatment with Metalaxyl.",
    "varieties": [
      "CSH 25",
      "M 35-1 (Maldandi)",
      "CSV 27"
    ],
    "climate": {
      "temperature": "25-35°C",
      "rainfall": "Low"
    },
    "irrigationDetails": "Rainfed mostly. Critical stages: Booting, Flowering.",
    "avgPrice": 2500,
    "image": "https://picsum.photos/seed/Sorghum(Jowar)/400/300",
    "interCrops": [
      "Pigeonpea",
      "Green gram"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 110:55:35 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 110 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 110,
    "p_ratio_kg_per_hectare": 55,
    "k_ratio_kg_per_hectare": 35,
    "n_ratio_kg_per_acre": 44.52,
    "p_ratio_kg_per_acre": 22.26,
    "k_ratio_kg_per_acre": 14.16,
    "seed_rate_kg_per_hectare": 76,
    "seed_rate_kg_per_acre": 30.76,
    "avg_yield_kg_per_hectare": 4100,
    "avg_yield_kg_per_acre": 1659.27,
    "planting_density_per_acre": 200000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 110:55:35 kg per hectare."
    }
  },
  {
    "id": 79,
    "name": "Kodo Millet",
    "icon": "🌾",
    "category": "Millet",
    "growthDays": 95,
    "description": "Known for its excellent market demand, Kodo Millet plays a crucial role in the millet sector. It achieves optimal growth at temperatures around Warm/Dry combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Rust and Smut and Ergot. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Rust",
      "Smut",
      "Ergot"
    ],
    "diseaseManagement": "Seed treatment with Carbendazim. Spray Mancozeb for rust.",
    "varieties": [
      "JK 48",
      "GPUK 3",
      "Indira Kodo-1"
    ],
    "climate": {
      "temperature": "Warm/Dry",
      "rainfall": "Low"
    },
    "irrigationDetails": "Highly drought tolerant. No irrigation needed if sown in monsoon.",
    "avgPrice": 3000,
    "image": "https://picsum.photos/seed/KodoMillet/400/300",
    "interCrops": [
      "Pigeonpea"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 250,
      "max": 400
    },
    "sunlight": "Full sunlight",
    "fertilizer": "As per local agri department",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 95 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 40,
    "p_ratio_kg_per_hectare": 20,
    "k_ratio_kg_per_hectare": 10,
    "n_ratio_kg_per_acre": 16.19,
    "p_ratio_kg_per_acre": 8.09,
    "k_ratio_kg_per_acre": 4.05,
    "seed_rate_kg_per_hectare": 7,
    "seed_rate_kg_per_acre": 2.83,
    "avg_yield_kg_per_hectare": 1300,
    "avg_yield_kg_per_acre": 526.11,
    "planting_density_per_acre": 100000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 40:20:10 kg per hectare."
    }
  },
  {
    "id": 80,
    "name": "Foxtail Millet",
    "icon": "🌾",
    "category": "Millet",
    "growthDays": 95,
    "description": "Foxtail Millet stands out as a prominent millet-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around Semi-arid combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Blast and Smut and Green Ear. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Blast",
      "Smut",
      "Green Ear"
    ],
    "diseaseManagement": "Seed treatment. Remove smutted heads.",
    "varieties": [
      "SiA 3085",
      "HMT 100-1",
      "Sri Lakshmi"
    ],
    "climate": {
      "temperature": "Semi-arid",
      "rainfall": "Low"
    },
    "irrigationDetails": "Rainfed. If available, irrigate at flowering.",
    "avgPrice": 2800,
    "image": "https://picsum.photos/seed/FoxtailMillet/400/300",
    "interCrops": [
      "Cotton",
      "Pulses"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 250,
      "max": 400
    },
    "sunlight": "Full sunlight",
    "fertilizer": "As per local agri department",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 95 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 55,
    "p_ratio_kg_per_hectare": 25,
    "k_ratio_kg_per_hectare": 20,
    "n_ratio_kg_per_acre": 22.26,
    "p_ratio_kg_per_acre": 10.12,
    "k_ratio_kg_per_acre": 8.09,
    "seed_rate_kg_per_hectare": 13,
    "seed_rate_kg_per_acre": 5.26,
    "avg_yield_kg_per_hectare": 2200,
    "avg_yield_kg_per_acre": 890.34,
    "planting_density_per_acre": 100000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 55:25:20 kg per hectare."
    }
  },
  {
    "id": 81,
    "name": "Little Millet",
    "icon": "🌾",
    "category": "Millet",
    "growthDays": 95,
    "description": "Little Millet is a highly valued millet crop cultivated across various regions. It achieves optimal growth at temperatures around Dry combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Rust and Brown Spot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Rust",
      "Brown Spot"
    ],
    "diseaseManagement": "Resistant varieties. Spray Mancozeb if severe.",
    "varieties": [
      "JK 8",
      "BL 6",
      "Kutki"
    ],
    "climate": {
      "temperature": "Dry",
      "rainfall": "Low"
    },
    "irrigationDetails": "Rainfed crop.",
    "avgPrice": 3500,
    "image": "https://picsum.photos/seed/LittleMillet/400/300",
    "interCrops": [
      "Soybean"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 250,
      "max": 400
    },
    "sunlight": "Full sunlight",
    "fertilizer": "As per local agri department",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 95 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 30,
    "p_ratio_kg_per_hectare": 15,
    "k_ratio_kg_per_hectare": 10,
    "n_ratio_kg_per_acre": 12.14,
    "p_ratio_kg_per_acre": 6.07,
    "k_ratio_kg_per_acre": 4.05,
    "seed_rate_kg_per_hectare": 5,
    "seed_rate_kg_per_acre": 2.02,
    "avg_yield_kg_per_hectare": 800,
    "avg_yield_kg_per_acre": 323.76,
    "planting_density_per_acre": 100000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 30:15:10 kg per hectare."
    }
  },
  {
    "id": 82,
    "name": "Proso Millet (Chena)",
    "icon": "🌾",
    "category": "Millet",
    "growthDays": 95,
    "description": "Proso Millet (Chena) is a highly valued millet crop cultivated across various regions. It achieves optimal growth at temperatures around Warm combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Rust and Head Smut. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Rust",
      "Head Smut"
    ],
    "diseaseManagement": "Seed treatment. Crop rotation.",
    "varieties": [
      "TNAU 145",
      "CO 5",
      "Nagarjuna"
    ],
    "climate": {
      "temperature": "Warm",
      "rainfall": "Low"
    },
    "irrigationDetails": "Drought tolerant. Minimal water required.",
    "avgPrice": 3000,
    "image": "https://picsum.photos/seed/ProsoMillet(Chena)/400/300",
    "interCrops": [
      "Mungbean"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 250,
      "max": 400
    },
    "sunlight": "Full sunlight",
    "fertilizer": "As per local agri department",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 95 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 30,
    "p_ratio_kg_per_hectare": 15,
    "k_ratio_kg_per_hectare": 10,
    "n_ratio_kg_per_acre": 12.14,
    "p_ratio_kg_per_acre": 6.07,
    "k_ratio_kg_per_acre": 4.05,
    "seed_rate_kg_per_hectare": 5,
    "seed_rate_kg_per_acre": 2.02,
    "avg_yield_kg_per_hectare": 900,
    "avg_yield_kg_per_acre": 364.23,
    "planting_density_per_acre": 100000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 30:15:10 kg per hectare."
    }
  },
  {
    "id": 83,
    "name": "Barnyard Millet",
    "icon": "🌾",
    "category": "Millet",
    "growthDays": 95,
    "description": "Farmers widely cultivate Barnyard Millet as a standard millet crop bringing steady economic returns. It achieves optimal growth at temperatures around Dry combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Smut and Rust and Downy Mildew. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Smut",
      "Rust",
      "Downy Mildew"
    ],
    "diseaseManagement": "Seed treatment. Remove infected plants.",
    "varieties": [
      "VL 172",
      "PRJ 1",
      "K1"
    ],
    "climate": {
      "temperature": "Dry",
      "rainfall": "Low"
    },
    "irrigationDetails": "Rainfed.",
    "avgPrice": 2500,
    "image": "https://picsum.photos/seed/BarnyardMillet/400/300",
    "interCrops": [
      "Pulses"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 250,
      "max": 400
    },
    "sunlight": "Full sunlight",
    "fertilizer": "As per local agri department",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 95 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 50,
    "p_ratio_kg_per_hectare": 25,
    "k_ratio_kg_per_hectare": 15,
    "n_ratio_kg_per_acre": 20.23,
    "p_ratio_kg_per_acre": 10.12,
    "k_ratio_kg_per_acre": 6.07,
    "seed_rate_kg_per_hectare": 12,
    "seed_rate_kg_per_acre": 4.86,
    "avg_yield_kg_per_hectare": 2000,
    "avg_yield_kg_per_acre": 809.4,
    "planting_density_per_acre": 100000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 50:25:15 kg per hectare."
    }
  },
  {
    "id": 84,
    "name": "Masoor (Lentil)",
    "icon": "🌱",
    "category": "Pulse",
    "growthDays": 100,
    "description": "Masoor (Lentil) stands out as a prominent pulse-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around Cool combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Wilt and Rust and Root Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Wilt",
      "Rust",
      "Root Rot"
    ],
    "diseaseManagement": "Use wilt resistant varieties. Seed treatment with Trichoderma.",
    "varieties": [
      "Pusa Masoor-5",
      "IPL-81",
      "JL-3"
    ],
    "climate": {
      "temperature": "Cool",
      "rainfall": "Low"
    },
    "irrigationDetails": "Requires 1-2 irrigations at branching and pod filling.",
    "avgPrice": 6000,
    "image": "https://picsum.photos/seed/Masoor(Lentil)/400/300",
    "interCrops": [
      "Linseed",
      "Mustard"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 450
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 25:55:25 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 100 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 25,
    "p_ratio_kg_per_hectare": 55,
    "k_ratio_kg_per_hectare": 25,
    "n_ratio_kg_per_acre": 10.12,
    "p_ratio_kg_per_acre": 22.26,
    "k_ratio_kg_per_acre": 10.12,
    "seed_rate_kg_per_hectare": 68,
    "seed_rate_kg_per_acre": 27.52,
    "avg_yield_kg_per_hectare": 1600,
    "avg_yield_kg_per_acre": 647.52,
    "planting_density_per_acre": 80000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 25:55:25 kg per hectare."
    }
  },
  {
    "id": 85,
    "name": "Tapioca (Cassava)",
    "icon": "🥔",
    "category": "Root/Tuber",
    "growthDays": 180,
    "description": "Known for its excellent market demand, Tapioca (Cassava) plays a crucial role in the root/tuber sector. It achieves optimal growth at temperatures around 25-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Cassava Mosaic Disease and Tuber Rot. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Cassava Mosaic Disease",
      "Tuber Rot"
    ],
    "diseaseManagement": "Use virus-free stems. Good drainage.",
    "varieties": [
      "Sree Vijaya",
      "H-226",
      "H-165"
    ],
    "climate": {
      "temperature": "25-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Irrigation during dry spells increases tuber yield.",
    "avgPrice": 2000,
    "image": "https://picsum.photos/seed/Tapioca(Cassava)/400/300",
    "interCrops": [
      "Groundnut",
      "Vegetables"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 600,
      "max": 1000
    },
    "sunlight": "Partial to full sunlight",
    "fertilizer": "NPK 140:70:70 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 180 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 140,
    "p_ratio_kg_per_hectare": 70,
    "k_ratio_kg_per_hectare": 70,
    "n_ratio_kg_per_acre": 56.66,
    "p_ratio_kg_per_acre": 28.33,
    "k_ratio_kg_per_acre": 28.33,
    "seed_rate_kg_per_hectare": 22,
    "seed_rate_kg_per_acre": 8.9,
    "avg_yield_kg_per_hectare": 3100,
    "avg_yield_kg_per_acre": 1254.57,
    "planting_density_per_acre": 30000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 140:70:70 kg per hectare."
    }
  },
  {
    "id": 86,
    "name": "Arbi (Colocasia/Taro)",
    "icon": "🥔",
    "category": "Root/Tuber",
    "growthDays": 180,
    "description": "Farmers widely cultivate Arbi (Colocasia/Taro) as a standard root/tuber crop bringing steady economic returns. It achieves optimal growth at temperatures around Humid/Warm combined with High of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Phytophthora Blight and Corm Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Phytophthora Blight",
      "Corm Rot"
    ],
    "diseaseManagement": "Spray Mancozeb/Metalaxyl. Use disease free corms.",
    "varieties": [
      "Muktakeshi",
      "Pani Saro",
      "Narendra Arbi"
    ],
    "climate": {
      "temperature": "Humid/Warm",
      "rainfall": "High"
    },
    "irrigationDetails": "Requires frequent irrigation. Water logging is tolerated.",
    "avgPrice": 3000,
    "image": "https://picsum.photos/seed/Arbi(Colocasia%2FTaro)/400/300",
    "interCrops": [
      "None"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 600,
      "max": 1000
    },
    "sunlight": "Partial to full sunlight",
    "fertilizer": "NPK 155:75:75 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 180 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 155,
    "p_ratio_kg_per_hectare": 75,
    "k_ratio_kg_per_hectare": 75,
    "n_ratio_kg_per_acre": 62.73,
    "p_ratio_kg_per_acre": 30.35,
    "k_ratio_kg_per_acre": 30.35,
    "seed_rate_kg_per_hectare": 28,
    "seed_rate_kg_per_acre": 11.33,
    "avg_yield_kg_per_hectare": 3600,
    "avg_yield_kg_per_acre": 1456.92,
    "planting_density_per_acre": 30000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 155:75:75 kg per hectare."
    }
  },
  {
    "id": 87,
    "name": "Yam (Dioscorea)",
    "icon": "🥔",
    "category": "Root/Tuber",
    "growthDays": 180,
    "description": "Yam (Dioscorea) stands out as a prominent root/tuber-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around Tropical combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Anthracnose and Mosaic. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Anthracnose",
      "Mosaic"
    ],
    "diseaseManagement": "Soak seed tubers in Fungicide. Stake plants.",
    "varieties": [
      "Sree Keerthi",
      "Sree Roopa"
    ],
    "climate": {
      "temperature": "Tropical",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Irrigate weekly in early stages. Drought tolerant later.",
    "avgPrice": 2500,
    "image": "https://picsum.photos/seed/Yam(Dioscorea)/400/300",
    "interCrops": [
      "Cowpea"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 600,
      "max": 1000
    },
    "sunlight": "Partial to full sunlight",
    "fertilizer": "NPK 185:90:90 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 180 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 185,
    "p_ratio_kg_per_hectare": 90,
    "k_ratio_kg_per_hectare": 90,
    "n_ratio_kg_per_acre": 74.87,
    "p_ratio_kg_per_acre": 36.42,
    "k_ratio_kg_per_acre": 36.42,
    "seed_rate_kg_per_hectare": 43,
    "seed_rate_kg_per_acre": 17.4,
    "avg_yield_kg_per_hectare": 4600,
    "avg_yield_kg_per_acre": 1861.62,
    "planting_density_per_acre": 30000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 185:90:90 kg per hectare."
    }
  },
  {
    "id": 88,
    "name": "Bottle Gourd (Lauki)",
    "icon": "🍆",
    "category": "Vegetable",
    "growthDays": 90,
    "description": "Farmers widely cultivate Bottle Gourd (Lauki) as a standard vegetable crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-35°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Powdery Mildew and Anthracnose and Fruit Fly. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Powdery Mildew",
      "Anthracnose",
      "Fruit Fly"
    ],
    "diseaseManagement": "Bait sprays for fruit fly. Sulfur dusting.",
    "varieties": [
      "Pusa Naveen",
      "Arka Bahar",
      "Samrat"
    ],
    "climate": {
      "temperature": "20-35°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Irrigate every 3-4 days in summer. Basin method.",
    "avgPrice": 1500,
    "image": "https://picsum.photos/seed/BottleGourd(Lauki)/400/300",
    "interCrops": [
      "Vegetables"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 400,
      "max": 700
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 130:70:70 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 90 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 130,
    "p_ratio_kg_per_hectare": 70,
    "k_ratio_kg_per_hectare": 70,
    "n_ratio_kg_per_acre": 52.61,
    "p_ratio_kg_per_acre": 28.33,
    "k_ratio_kg_per_acre": 28.33,
    "seed_rate_kg_per_hectare": 7,
    "seed_rate_kg_per_acre": 2.83,
    "avg_yield_kg_per_hectare": 24100,
    "avg_yield_kg_per_acre": 9753.27,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 130:70:70 kg per hectare."
    }
  },
  {
    "id": 89,
    "name": "Bitter Gourd (Karela)",
    "icon": "🍆",
    "category": "Vegetable",
    "growthDays": 90,
    "description": "Bitter Gourd (Karela) is a highly valued vegetable crop cultivated across various regions. It achieves optimal growth at temperatures around 25-35°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Downy Mildew and Mosaic and Powdery Mildew. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Downy Mildew",
      "Mosaic",
      "Powdery Mildew"
    ],
    "diseaseManagement": "Spray Ridomil for mildew. Control aphids/vectors.",
    "varieties": [
      "Pusa Do Mausami",
      "Arka Harit",
      "Pusa Vishesh"
    ],
    "climate": {
      "temperature": "25-35°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Irrigate every 3-5 days. Mulching beneficial.",
    "avgPrice": 3000,
    "image": "https://picsum.photos/seed/BitterGourd(Karela)/400/300",
    "interCrops": [
      "None"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 400,
      "max": 700
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 90:45:45 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 90 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 90,
    "p_ratio_kg_per_hectare": 45,
    "k_ratio_kg_per_hectare": 45,
    "n_ratio_kg_per_acre": 36.42,
    "p_ratio_kg_per_acre": 18.21,
    "k_ratio_kg_per_acre": 18.21,
    "seed_rate_kg_per_hectare": 2,
    "seed_rate_kg_per_acre": 0.81,
    "avg_yield_kg_per_hectare": 13300,
    "avg_yield_kg_per_acre": 5382.51,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 90:45:45 kg per hectare."
    }
  },
  {
    "id": 90,
    "name": "Ridge Gourd (Turai)",
    "icon": "🍆",
    "category": "Vegetable",
    "growthDays": 90,
    "description": "Known for its excellent market demand, Ridge Gourd (Turai) plays a crucial role in the vegetable sector. It achieves optimal growth at temperatures around 25-35°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Downy Mildew and Mosaic and Fruit Fly. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Downy Mildew",
      "Mosaic",
      "Fruit Fly"
    ],
    "diseaseManagement": "Stake plants. Remove infected leaves. Use fruit fly traps.",
    "varieties": [
      "Pusa Nasdar",
      "Co-1",
      "Satputia"
    ],
    "climate": {
      "temperature": "25-35°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Irrigate every 4-5 days. Avoid water logging.",
    "avgPrice": 2000,
    "image": "https://picsum.photos/seed/RidgeGourd(Turai)/400/300",
    "interCrops": [
      "Cowpea"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 400,
      "max": 700
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 115:60:60 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 90 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 115,
    "p_ratio_kg_per_hectare": 60,
    "k_ratio_kg_per_hectare": 60,
    "n_ratio_kg_per_acre": 46.54,
    "p_ratio_kg_per_acre": 24.28,
    "k_ratio_kg_per_acre": 24.28,
    "seed_rate_kg_per_hectare": 5,
    "seed_rate_kg_per_acre": 2.02,
    "avg_yield_kg_per_hectare": 19900,
    "avg_yield_kg_per_acre": 8053.53,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 115:60:60 kg per hectare."
    }
  },
  {
    "id": 91,
    "name": "Snake Gourd",
    "icon": "🍆",
    "category": "Vegetable",
    "growthDays": 90,
    "description": "Snake Gourd is a highly valued vegetable crop cultivated across various regions. It achieves optimal growth at temperatures around Tropical combined with High of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Anthracnose and Fruit Fly and Powdery Mildew. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Anthracnose",
      "Fruit Fly",
      "Powdery Mildew"
    ],
    "diseaseManagement": "Bait sprays for fruit fly. Spray Mancozeb.",
    "varieties": [
      "Co-2",
      "PKM-1",
      "Kaumudi"
    ],
    "climate": {
      "temperature": "Tropical",
      "rainfall": "High"
    },
    "irrigationDetails": "Regular irrigation required. Soil moisture is critical.",
    "avgPrice": 1800,
    "image": "https://picsum.photos/seed/SnakeGourd/400/300",
    "interCrops": [
      "Vegetables"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 400,
      "max": 700
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 95:45:45 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 90 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 95,
    "p_ratio_kg_per_hectare": 45,
    "k_ratio_kg_per_hectare": 45,
    "n_ratio_kg_per_acre": 38.45,
    "p_ratio_kg_per_acre": 18.21,
    "k_ratio_kg_per_acre": 18.21,
    "seed_rate_kg_per_hectare": 2,
    "seed_rate_kg_per_acre": 0.81,
    "avg_yield_kg_per_hectare": 14000,
    "avg_yield_kg_per_acre": 5665.8,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 95:45:45 kg per hectare."
    }
  },
  {
    "id": 92,
    "name": "Pointed Gourd (Parwal/Patal)",
    "icon": "🍆",
    "category": "Vegetable",
    "growthDays": 90,
    "description": "Pointed Gourd (Parwal/Patal) is a highly valued vegetable crop cultivated across various regions. It achieves optimal growth at temperatures around Warm/Humid combined with High of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Fruit Rot and Root Knot Nematode and Mosaic. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Fruit Rot",
      "Root Knot Nematode",
      "Mosaic"
    ],
    "diseaseManagement": "Apply Trichoderma. Remove rotting fruits. Stake vines.",
    "varieties": [
      "Swarna Alaukik",
      "Dandali",
      "Rajendra Parwal-1"
    ],
    "climate": {
      "temperature": "Warm/Humid",
      "rainfall": "High"
    },
    "irrigationDetails": "Irrigate at 8-10 days interval. Requires good drainage.",
    "avgPrice": 4000,
    "image": "https://picsum.photos/seed/PointedGourd(Parwal%2FPatal)/400/300",
    "interCrops": [
      "Leafy vegetables"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 400,
      "max": 700
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 90:45:45 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 90 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 90,
    "p_ratio_kg_per_hectare": 45,
    "k_ratio_kg_per_hectare": 45,
    "n_ratio_kg_per_acre": 36.42,
    "p_ratio_kg_per_acre": 18.21,
    "k_ratio_kg_per_acre": 18.21,
    "seed_rate_kg_per_hectare": 2,
    "seed_rate_kg_per_acre": 0.81,
    "avg_yield_kg_per_hectare": 12600,
    "avg_yield_kg_per_acre": 5099.22,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 90:45:45 kg per hectare."
    }
  },
  {
    "id": 93,
    "name": "Drumstick (Moringa)",
    "icon": "🌳",
    "category": "Vegetable/Tree",
    "growthDays": 150,
    "description": "Known for its excellent market demand, Drumstick (Moringa) plays a crucial role in the vegetable/tree sector. It achieves optimal growth at temperatures around 25-35°C combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Fruit Rot and Twig Canker. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Fruit Rot",
      "Twig Canker"
    ],
    "diseaseManagement": "Pruning of infected twigs. Spray Copper Oxychloride.",
    "varieties": [
      "PKM-1",
      "PKM-2",
      "ODC-3"
    ],
    "climate": {
      "temperature": "25-35°C",
      "rainfall": "Low"
    },
    "irrigationDetails": "Drought tolerant but yield increases with watering.",
    "avgPrice": 3000,
    "image": "https://picsum.photos/seed/Drumstick(Moringa)/400/300",
    "interCrops": [
      "Pulses",
      "Vegetables"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 400,
      "max": 700
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 125:65:65 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 150 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 125,
    "p_ratio_kg_per_hectare": 65,
    "k_ratio_kg_per_hectare": 65,
    "n_ratio_kg_per_acre": 50.59,
    "p_ratio_kg_per_acre": 26.31,
    "k_ratio_kg_per_acre": 26.31,
    "seed_rate_kg_per_hectare": 17,
    "seed_rate_kg_per_acre": 6.88,
    "avg_yield_kg_per_hectare": 2800,
    "avg_yield_kg_per_acre": 1133.16,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 125:65:65 kg per hectare."
    }
  },
  {
    "id": 94,
    "name": "Sapota (Chikoo)",
    "icon": "🍎",
    "category": "Fruit",
    "growthDays": 150,
    "description": "Sapota (Chikoo) stands out as a prominent fruit-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around Tropical combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Sooty Mould and Bud Borer. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Spot",
      "Sooty Mould",
      "Bud Borer"
    ],
    "diseaseManagement": "Spray starch solution for mould. Copper oxychloride for leaf spot.",
    "varieties": [
      "Kalipatti",
      "Cricket Ball",
      "DSH-2"
    ],
    "climate": {
      "temperature": "Tropical",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Irrigate every 10-15 days in winter, 7 days in summer.",
    "avgPrice": 3500,
    "image": "https://picsum.photos/seed/Sapota(Chikoo)/400/300",
    "interCrops": [
      "Vegetables"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 500,
      "max": 900
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 270:135:270 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 150 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 270,
    "p_ratio_kg_per_hectare": 135,
    "k_ratio_kg_per_hectare": 270,
    "n_ratio_kg_per_acre": 109.27,
    "p_ratio_kg_per_acre": 54.63,
    "k_ratio_kg_per_acre": 109.27,
    "seed_rate_kg_per_hectare": 437,
    "seed_rate_kg_per_acre": 176.85,
    "avg_yield_kg_per_hectare": 35300,
    "avg_yield_kg_per_acre": 14285.91,
    "planting_density_per_acre": 1000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 270:135:270 kg per hectare."
    }
  },
  {
    "id": 95,
    "name": "Custard Apple (Sitaphal)",
    "icon": "🍎",
    "category": "Fruit",
    "growthDays": 150,
    "description": "Custard Apple (Sitaphal) is a highly valued fruit crop cultivated across various regions. It achieves optimal growth at temperatures around Dry/Warm combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Anthracnose and Mealy Bug and Fruit Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Anthracnose",
      "Mealy Bug",
      "Fruit Rot"
    ],
    "diseaseManagement": "Pruning. Spray Neem oil for mealy bugs.",
    "varieties": [
      "Balanagar",
      "Arka Sahan",
      "Red Sitaphal"
    ],
    "climate": {
      "temperature": "Dry/Warm",
      "rainfall": "Low"
    },
    "irrigationDetails": "Hardy crop. Irrigate during fruit development.",
    "avgPrice": 4500,
    "image": "https://picsum.photos/seed/CustardApple(Sitaphal)/400/300",
    "interCrops": [
      "Pulses"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 500,
      "max": 900
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 145:75:145 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 150 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 145,
    "p_ratio_kg_per_hectare": 75,
    "k_ratio_kg_per_hectare": 145,
    "n_ratio_kg_per_acre": 58.68,
    "p_ratio_kg_per_acre": 30.35,
    "k_ratio_kg_per_acre": 58.68,
    "seed_rate_kg_per_hectare": 195,
    "seed_rate_kg_per_acre": 78.92,
    "avg_yield_kg_per_hectare": 17200,
    "avg_yield_kg_per_acre": 6960.84,
    "planting_density_per_acre": 1000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 145:75:145 kg per hectare."
    }
  },
  {
    "id": 96,
    "name": "Amla (Indian Gooseberry)",
    "icon": "🍎",
    "category": "Fruit",
    "growthDays": 150,
    "description": "Amla (Indian Gooseberry) is a highly valued fruit crop cultivated across various regions. It achieves optimal growth at temperatures around Subtropical combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Rust and Fruit Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Rust",
      "Fruit Rot"
    ],
    "diseaseManagement": "Spray Indofil M-45. Boron application for internal necrosis.",
    "varieties": [
      "Chakaiya",
      "NA-7",
      "Krishna"
    ],
    "climate": {
      "temperature": "Subtropical",
      "rainfall": "Low"
    },
    "irrigationDetails": "Irrigation establishes young plants. Mature trees drought tolerant.",
    "avgPrice": 2500,
    "image": "https://picsum.photos/seed/Amla(IndianGooseberry)/400/300",
    "interCrops": [
      "Pulses",
      "Vegetables"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 500,
      "max": 900
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 140:70:140 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 150 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 140,
    "p_ratio_kg_per_hectare": 70,
    "k_ratio_kg_per_hectare": 140,
    "n_ratio_kg_per_acre": 56.66,
    "p_ratio_kg_per_acre": 28.33,
    "k_ratio_kg_per_acre": 56.66,
    "seed_rate_kg_per_hectare": 184,
    "seed_rate_kg_per_acre": 74.46,
    "avg_yield_kg_per_hectare": 16300,
    "avg_yield_kg_per_acre": 6596.61,
    "planting_density_per_acre": 1000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 140:70:140 kg per hectare."
    }
  },
  {
    "id": 97,
    "name": "Ber (Jujube)",
    "icon": "🍎",
    "category": "Fruit",
    "growthDays": 150,
    "description": "Ber (Jujube) stands out as a prominent fruit-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around Hot/Dry combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Powdery Mildew and Fruit Fly. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Powdery Mildew",
      "Fruit Fly"
    ],
    "diseaseManagement": "Spray Karathane (Dinocap) for mildew. Fruit fly traps.",
    "varieties": [
      "Umran",
      "Gola",
      "Seb"
    ],
    "climate": {
      "temperature": "Hot/Dry",
      "rainfall": "Low"
    },
    "irrigationDetails": "Rainfed mainly. Irrigation in Oct-Nov improves fruit size.",
    "avgPrice": 2000,
    "image": "https://picsum.photos/seed/Ber(Jujube)/400/300",
    "interCrops": [
      "Cluster bean",
      "Moth bean"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 500,
      "max": 900
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 290:145:290 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 150 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 290,
    "p_ratio_kg_per_hectare": 145,
    "k_ratio_kg_per_hectare": 290,
    "n_ratio_kg_per_acre": 117.36,
    "p_ratio_kg_per_acre": 58.68,
    "k_ratio_kg_per_acre": 117.36,
    "seed_rate_kg_per_hectare": 476,
    "seed_rate_kg_per_acre": 192.64,
    "avg_yield_kg_per_hectare": 38200,
    "avg_yield_kg_per_acre": 15459.54,
    "planting_density_per_acre": 1000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 290:145:290 kg per hectare."
    }
  },
  {
    "id": 98,
    "name": "Khus (Vetiver)",
    "icon": "💰",
    "category": "Cash/Medicinal",
    "growthDays": 120,
    "description": "Known for its excellent market demand, Khus (Vetiver) plays a crucial role in the cash/medicinal sector. It achieves optimal growth at temperatures around Tropical combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Fusarium Wilt. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Fusarium Wilt"
    ],
    "diseaseManagement": "Use resistant varieties. Good drainage.",
    "varieties": [
      "KS-1",
      "Dharini",
      "Gulabi"
    ],
    "climate": {
      "temperature": "Tropical",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Needs moisture in early stages. Tolerates water logging.",
    "avgPrice": 5000,
    "image": "https://picsum.photos/seed/Khus(Vetiver)/400/300",
    "interCrops": [
      "None"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 500
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Organic manure",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 120 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 135,
    "p_ratio_kg_per_hectare": 70,
    "k_ratio_kg_per_hectare": 70,
    "n_ratio_kg_per_acre": 54.63,
    "p_ratio_kg_per_acre": 28.33,
    "k_ratio_kg_per_acre": 28.33,
    "seed_rate_kg_per_hectare": 21,
    "seed_rate_kg_per_acre": 8.5,
    "avg_yield_kg_per_hectare": 3100,
    "avg_yield_kg_per_acre": 1254.57,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 135:70:70 kg per hectare."
    }
  },
  {
    "id": 99,
    "name": "Buckwheat (Kuttu)",
    "icon": "🌿",
    "category": "Pseudo-cereal",
    "growthDays": 90,
    "description": "Buckwheat (Kuttu) stands out as a prominent pseudo-cereal-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around Cool combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Root Rot and Leaf Spot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Root Rot",
      "Leaf Spot"
    ],
    "diseaseManagement": "Seed treatment. avoid water logging.",
    "varieties": [
      "Himpriya",
      "VL-7"
    ],
    "climate": {
      "temperature": "Cool",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Requires moist soil but sensitive to water logging.",
    "avgPrice": 4000,
    "image": "https://picsum.photos/seed/Buckwheat(Kuttu)/400/300",
    "interCrops": [
      "Potato"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 450
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Light organic compost",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 90 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 185,
    "p_ratio_kg_per_hectare": 95,
    "k_ratio_kg_per_hectare": 95,
    "n_ratio_kg_per_acre": 74.87,
    "p_ratio_kg_per_acre": 38.45,
    "k_ratio_kg_per_acre": 38.45,
    "seed_rate_kg_per_hectare": 44,
    "seed_rate_kg_per_acre": 17.81,
    "avg_yield_kg_per_hectare": 4600,
    "avg_yield_kg_per_acre": 1861.62,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 185:95:95 kg per hectare."
    }
  },
  {
    "id": 100,
    "name": "Psyllium (Isabgol)",
    "icon": "💊",
    "category": "Medicinal/Cash",
    "growthDays": 120,
    "description": "Known for its excellent market demand, Psyllium (Isabgol) plays a crucial role in the medicinal/cash sector. It achieves optimal growth at temperatures around Cool/Dry combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Downy Mildew. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Downy Mildew"
    ],
    "diseaseManagement": "Spray Metalaxyl. Avoid late sowing.",
    "varieties": [
      "GI-2",
      "Niharika",
      "Gujarat Isabgol-1"
    ],
    "climate": {
      "temperature": "Cool/Dry",
      "rainfall": "Low"
    },
    "irrigationDetails": "Light irrigations. Avoid rain at maturity.",
    "avgPrice": 9000,
    "image": "https://picsum.photos/seed/Psyllium(Isabgol)/400/300",
    "interCrops": [
      "Mustard"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 500
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Organic manure",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 120 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 125,
    "p_ratio_kg_per_hectare": 65,
    "k_ratio_kg_per_hectare": 65,
    "n_ratio_kg_per_acre": 50.59,
    "p_ratio_kg_per_acre": 26.31,
    "k_ratio_kg_per_acre": 26.31,
    "seed_rate_kg_per_hectare": 17,
    "seed_rate_kg_per_acre": 6.88,
    "avg_yield_kg_per_hectare": 2800,
    "avg_yield_kg_per_acre": 1133.16,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 125:65:65 kg per hectare."
    }
  },
  {
    "id": 101,
    "name": "Hemp (low-THC industrial hemp)",
    "icon": "🧵",
    "category": "Fiber/Cash",
    "growthDays": 150,
    "description": "Known for its excellent market demand, Hemp (low-THC industrial hemp) plays a crucial role in the fiber/cash sector. It achieves optimal growth at temperatures around Moderate combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Grey Mould and Hemp Borer. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Grey Mould",
      "Hemp Borer"
    ],
    "diseaseManagement": "Crop rotation. Trichogramma for borers.",
    "varieties": [
      "Bombay Hemp",
      "Sunn Hemp varieties locally"
    ],
    "climate": {
      "temperature": "Moderate",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Rainfed or minimal irrigation.",
    "avgPrice": 3500,
    "image": "https://picsum.photos/seed/Hemp(low-THCindustrialhemp)/400/300",
    "interCrops": [
      "None"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 500,
      "max": 700
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 140:70:70 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 150 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 140,
    "p_ratio_kg_per_hectare": 70,
    "k_ratio_kg_per_hectare": 70,
    "n_ratio_kg_per_acre": 56.66,
    "p_ratio_kg_per_acre": 28.33,
    "k_ratio_kg_per_acre": 28.33,
    "seed_rate_kg_per_hectare": 22,
    "seed_rate_kg_per_acre": 8.9,
    "avg_yield_kg_per_hectare": 3200,
    "avg_yield_kg_per_acre": 1295.04,
    "planting_density_per_acre": 10000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 140:70:70 kg per hectare."
    }
  },
  {
    "id": 102,
    "name": "Colocynth (Bitter Apple)",
    "icon": "💊",
    "category": "Medicinal/Cash",
    "growthDays": 120,
    "description": "Colocynth (Bitter Apple) is a highly valued medicinal/cash crop cultivated across various regions. It achieves optimal growth at temperatures around Hot/Arid combined with Very Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Powdery Mildew. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Powdery Mildew"
    ],
    "diseaseManagement": "Sulfur dusting.",
    "varieties": [
      "Local Landraces"
    ],
    "climate": {
      "temperature": "Hot/Arid",
      "rainfall": "Very Low"
    },
    "irrigationDetails": "Can survive on residual moisture.",
    "avgPrice": 3000,
    "image": "https://picsum.photos/seed/Colocynth(BitterApple)/400/300",
    "interCrops": [
      "Pearl Millet"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 500
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Organic manure",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 120 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 120,
    "p_ratio_kg_per_hectare": 60,
    "k_ratio_kg_per_hectare": 60,
    "n_ratio_kg_per_acre": 48.56,
    "p_ratio_kg_per_acre": 24.28,
    "k_ratio_kg_per_acre": 24.28,
    "seed_rate_kg_per_hectare": 14,
    "seed_rate_kg_per_acre": 5.67,
    "avg_yield_kg_per_hectare": 2600,
    "avg_yield_kg_per_acre": 1052.22,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 120:60:60 kg per hectare."
    }
  },
  {
    "id": 103,
    "name": "Kapas (Cotton)",
    "icon": "🪙",
    "category": "Cash Crop",
    "growthDays": 160,
    "description": "Farmers widely cultivate Kapas (Cotton) as a standard cash crop crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Pink Bollworm and Leaf Curl Virus and Bacterial Blight. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Pink Bollworm",
      "Leaf Curl Virus",
      "Bacterial Blight"
    ],
    "diseaseManagement": "Use Bt Cotton varieties. IPM for bollworms. Whitefly control for CLCuV.",
    "varieties": [
      "RCH 659 YG",
      "Bunny",
      "DCH-32"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Irrigation at flowering and boll formation is critical.",
    "avgPrice": 6000,
    "image": "https://picsum.photos/seed/Kapas(Cotton)/400/300",
    "interCrops": [
      "Pigeonpea",
      "Green gram",
      "Black gram"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 600,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 165:80:80 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 160 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 165,
    "p_ratio_kg_per_hectare": 80,
    "k_ratio_kg_per_hectare": 80,
    "n_ratio_kg_per_acre": 66.78,
    "p_ratio_kg_per_acre": 32.38,
    "k_ratio_kg_per_acre": 32.38,
    "seed_rate_kg_per_hectare": 33,
    "seed_rate_kg_per_acre": 13.36,
    "avg_yield_kg_per_hectare": 3900,
    "avg_yield_kg_per_acre": 1578.33,
    "planting_density_per_acre": 100000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 165:80:80 kg per hectare."
    }
  },
  {
    "id": 104,
    "name": "Napier Grass",
    "icon": "🌿",
    "category": "Fodder",
    "growthDays": 90,
    "description": "Known for its excellent market demand, Napier Grass plays a crucial role in the fodder sector. It achieves optimal growth at temperatures around Tropical combined with High of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use resistant hybrids. Maintain hygiene.",
    "varieties": [
      "CO-4",
      "Super Napier",
      "Yashwant"
    ],
    "climate": {
      "temperature": "Tropical",
      "rainfall": "High"
    },
    "irrigationDetails": "Requires frequent irrigation (every 10 days) for high biomass.",
    "avgPrice": 200,
    "image": "https://picsum.photos/seed/NapierGrass/400/300",
    "interCrops": [
      "Fodder cowpea"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 600,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 140:70:70 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 90 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 140,
    "p_ratio_kg_per_hectare": 70,
    "k_ratio_kg_per_hectare": 70,
    "n_ratio_kg_per_acre": 56.66,
    "p_ratio_kg_per_acre": 28.33,
    "k_ratio_kg_per_acre": 28.33,
    "seed_rate_kg_per_hectare": 23,
    "seed_rate_kg_per_acre": 9.31,
    "avg_yield_kg_per_hectare": 3300,
    "avg_yield_kg_per_acre": 1335.51,
    "planting_density_per_acre": 100000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 140:70:70 kg per hectare."
    }
  },
  {
    "id": 105,
    "name": "Lucerne (Alfalfa)",
    "icon": "🌿",
    "category": "Fodder",
    "growthDays": 90,
    "description": "Lucerne (Alfalfa) is a highly valued fodder crop cultivated across various regions. It achieves optimal growth at temperatures around Cool/Dry combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Rust and Leaf Spot and Crown Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Rust",
      "Leaf Spot",
      "Crown Rot"
    ],
    "diseaseManagement": "Early cutting reduces leaf spot. Good drainage.",
    "varieties": [
      "Anand-2",
      "CO-1",
      "RL-88"
    ],
    "climate": {
      "temperature": "Cool/Dry",
      "rainfall": "Low"
    },
    "irrigationDetails": "Irrigate every 15-20 days. Sensitive to water stagnation.",
    "avgPrice": 400,
    "image": "https://picsum.photos/seed/Lucerne(Alfalfa)/400/300",
    "interCrops": [
      "Oats",
      "Mustard (fodder)"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 600,
      "max": 800
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 100:50:50 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 90 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 100,
    "p_ratio_kg_per_hectare": 50,
    "k_ratio_kg_per_hectare": 50,
    "n_ratio_kg_per_acre": 40.47,
    "p_ratio_kg_per_acre": 20.23,
    "k_ratio_kg_per_acre": 20.23,
    "seed_rate_kg_per_hectare": 5,
    "seed_rate_kg_per_acre": 2.02,
    "avg_yield_kg_per_hectare": 2000,
    "avg_yield_kg_per_acre": 809.4,
    "planting_density_per_acre": 100000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 100:50:50 kg per hectare."
    }
  },
  {
    "id": 106,
    "name": "Vetch/Hyacinth Bean (Lobia)",
    "icon": "🌿",
    "category": "Pulse/Fodder",
    "growthDays": 100,
    "description": "Vetch/Hyacinth Bean (Lobia) is a highly valued pulse/fodder crop cultivated across various regions. It achieves optimal growth at temperatures around Warm combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Anthracnose and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Anthracnose",
      "Root Rot"
    ],
    "diseaseManagement": "Seed treatment with Thiram. Ensure good drainage.",
    "varieties": [
      "Pusa Early",
      "Kashi Harit",
      "Arka Jay"
    ],
    "climate": {
      "temperature": "Warm",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Irrigate at flowering and pod formation.",
    "avgPrice": 4000,
    "image": "https://picsum.photos/seed/Vetch%2FHyacinthBean(Lobia)/400/300",
    "interCrops": [
      "Sorghum",
      "Maize"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 500,
      "max": 700
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 115:55:55 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 100 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 115,
    "p_ratio_kg_per_hectare": 55,
    "k_ratio_kg_per_hectare": 55,
    "n_ratio_kg_per_acre": 46.54,
    "p_ratio_kg_per_acre": 22.26,
    "k_ratio_kg_per_acre": 22.26,
    "seed_rate_kg_per_hectare": 10,
    "seed_rate_kg_per_acre": 4.05,
    "avg_yield_kg_per_hectare": 2400,
    "avg_yield_kg_per_acre": 971.28,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 115:55:55 kg per hectare."
    }
  },
  {
    "id": 107,
    "name": "Saffron (Kesar)",
    "icon": "🌸",
    "category": "Spice/Cash",
    "growthDays": 180,
    "description": "Saffron (Kesar) is a highly valued spice/cash crop cultivated across various regions. It achieves optimal growth at temperatures around Cool/Temperate combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Corm Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Corm Rot"
    ],
    "diseaseManagement": "Dip corms in fungicide before planting. Raised beds.",
    "varieties": [
      "Kesar",
      "Mongra",
      "Lacha"
    ],
    "climate": {
      "temperature": "Cool/Temperate",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Light irrigation during flowering. Avoid water stagnation.",
    "avgPrice": 250000,
    "image": "https://picsum.photos/seed/Saffron(Kesar)/400/300",
    "interCrops": [
      "Almond",
      "Apple"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 125:60:60 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 180 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 125,
    "p_ratio_kg_per_hectare": 60,
    "k_ratio_kg_per_hectare": 60,
    "n_ratio_kg_per_acre": 50.59,
    "p_ratio_kg_per_acre": 24.28,
    "k_ratio_kg_per_acre": 24.28,
    "seed_rate_kg_per_hectare": 15,
    "seed_rate_kg_per_acre": 6.07,
    "avg_yield_kg_per_hectare": 2700,
    "avg_yield_kg_per_acre": 1092.69,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 125:60:60 kg per hectare."
    }
  },
  {
    "id": 108,
    "name": "Fig (Anjeer)",
    "icon": "🍎",
    "category": "Fruit",
    "growthDays": 150,
    "description": "Known for its excellent market demand, Fig (Anjeer) plays a crucial role in the fruit sector. It achieves optimal growth at temperatures around Subtropical combined with Low to Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Rust and Leaf Spot. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Rust",
      "Leaf Spot"
    ],
    "diseaseManagement": "Spray Copper Oxychloride. Pruning.",
    "varieties": [
      "Poona Fig",
      "Dinkar",
      "Conadria"
    ],
    "climate": {
      "temperature": "Subtropical",
      "rainfall": "Low to Moderate"
    },
    "irrigationDetails": "Regular excessive watering causes fruit cracking. Moderate irrigation.",
    "avgPrice": 8000,
    "image": "https://picsum.photos/seed/Fig(Anjeer)/400/300",
    "interCrops": [
      "Vegetables"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 500,
      "max": 900
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 170:85:170 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 150 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 170,
    "p_ratio_kg_per_hectare": 85,
    "k_ratio_kg_per_hectare": 170,
    "n_ratio_kg_per_acre": 68.8,
    "p_ratio_kg_per_acre": 34.4,
    "k_ratio_kg_per_acre": 68.8,
    "seed_rate_kg_per_hectare": 245,
    "seed_rate_kg_per_acre": 99.15,
    "avg_yield_kg_per_hectare": 20900,
    "avg_yield_kg_per_acre": 8458.23,
    "planting_density_per_acre": 1000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 170:85:170 kg per hectare."
    }
  },
  {
    "id": 109,
    "name": "Chickpea — Kabuli type",
    "icon": "🌱",
    "category": "Pulse",
    "growthDays": 100,
    "description": "Known for its excellent market demand, Chickpea — Kabuli type plays a crucial role in the pulse sector. It achieves optimal growth at temperatures around Cool combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Wilt and Blight. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Wilt",
      "Blight"
    ],
    "diseaseManagement": "Use resistant varieties. Deep ploughing in summer.",
    "varieties": [
      "Pusa 1053",
      "PG 186",
      "Kripa"
    ],
    "climate": {
      "temperature": "Cool",
      "rainfall": "Low"
    },
    "irrigationDetails": "Use sprinkler irrigation. Critical stage: Pod filling.",
    "avgPrice": 6000,
    "image": "https://picsum.photos/seed/Chickpea%E2%80%94Kabulitype/400/300",
    "interCrops": [
      "Mustard",
      "Wheat"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 300,
      "max": 450
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 20:40:20 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 100 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 20,
    "p_ratio_kg_per_hectare": 40,
    "k_ratio_kg_per_hectare": 20,
    "n_ratio_kg_per_acre": 8.09,
    "p_ratio_kg_per_acre": 16.19,
    "k_ratio_kg_per_acre": 8.09,
    "seed_rate_kg_per_hectare": 39,
    "seed_rate_kg_per_acre": 15.78,
    "avg_yield_kg_per_hectare": 1200,
    "avg_yield_kg_per_acre": 485.64,
    "planting_density_per_acre": 80000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 20:40:20 kg per hectare."
    }
  },
  {
    "id": 110,
    "name": "Sungrass/Millet varieties",
    "icon": "🌾",
    "category": "Millet",
    "growthDays": 95,
    "description": "Sungrass/Millet varieties is a highly valued millet crop cultivated across various regions. It achieves optimal growth at temperatures around Hot/Dry combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Blast and Smut. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Blast",
      "Smut"
    ],
    "diseaseManagement": "Seed treatment with Carbendazim. Resistant varieties.",
    "varieties": [
      "Local Landraces",
      "Improved Hybrids"
    ],
    "climate": {
      "temperature": "Hot/Dry",
      "rainfall": "Low"
    },
    "irrigationDetails": "Rainfed usually. One life-saving irrigation ensures yield.",
    "avgPrice": 2500,
    "image": "https://picsum.photos/seed/Sungrass%2FMilletvarieties/400/300",
    "interCrops": [
      "Pulses"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 250,
      "max": 400
    },
    "sunlight": "Full sunlight",
    "fertilizer": "As per local agri department",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 95 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 30,
    "p_ratio_kg_per_hectare": 15,
    "k_ratio_kg_per_hectare": 10,
    "n_ratio_kg_per_acre": 12.14,
    "p_ratio_kg_per_acre": 6.07,
    "k_ratio_kg_per_acre": 4.05,
    "seed_rate_kg_per_hectare": 5,
    "seed_rate_kg_per_acre": 2.02,
    "avg_yield_kg_per_hectare": 900,
    "avg_yield_kg_per_acre": 364.23,
    "planting_density_per_acre": 100000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 30:15:10 kg per hectare."
    }
  },
  {
    "id": 111,
    "name": "Kiwifruit",
    "icon": "🍎",
    "category": "Fruit",
    "growthDays": 150,
    "description": "Kiwifruit is a highly valued fruit crop cultivated across various regions. It achieves optimal growth at temperatures around Temperate combined with High of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Root Rot and Bacterial Blight. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Root Rot",
      "Bacterial Blight"
    ],
    "diseaseManagement": "Bordeaux mixture. Good drainage.",
    "varieties": [
      "Hayward",
      "Allison",
      "Monty"
    ],
    "climate": {
      "temperature": "Temperate",
      "rainfall": "High"
    },
    "irrigationDetails": "Requires frequent irrigation. Very sensitive to water stress.",
    "avgPrice": 15000,
    "image": "https://picsum.photos/seed/Kiwifruit/400/300",
    "interCrops": [
      "Strawberry"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 500,
      "max": 900
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 130:65:130 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 150 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 130,
    "p_ratio_kg_per_hectare": 65,
    "k_ratio_kg_per_hectare": 130,
    "n_ratio_kg_per_acre": 52.61,
    "p_ratio_kg_per_acre": 26.31,
    "k_ratio_kg_per_acre": 52.61,
    "seed_rate_kg_per_hectare": 156,
    "seed_rate_kg_per_acre": 63.13,
    "avg_yield_kg_per_hectare": 14300,
    "avg_yield_kg_per_acre": 5787.21,
    "planting_density_per_acre": 1000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 130:65:130 kg per hectare."
    }
  },
  {
    "id": 112,
    "name": "Walnut",
    "icon": "🌰",
    "category": "Nut/Tree Fruit",
    "growthDays": 180,
    "description": "Farmers widely cultivate Walnut as a standard nut/tree fruit crop bringing steady economic returns. It achieves optimal growth at temperatures around Temperate/Cool combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Walnut Blight. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Walnut Blight"
    ],
    "diseaseManagement": "Copper sprays. Remove infected nuts.",
    "varieties": [
      "Govind",
      "Sulaiman",
      "CITH-1"
    ],
    "climate": {
      "temperature": "Temperate/Cool",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Irrigate during fruit development stages.",
    "avgPrice": 30000,
    "image": "https://picsum.photos/seed/Walnut/400/300",
    "interCrops": [
      "Saffron",
      "Pulses"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 400,
      "max": 700
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 170:85:85 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 180 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 170,
    "p_ratio_kg_per_hectare": 85,
    "k_ratio_kg_per_hectare": 85,
    "n_ratio_kg_per_acre": 68.8,
    "p_ratio_kg_per_acre": 34.4,
    "k_ratio_kg_per_acre": 34.4,
    "seed_rate_kg_per_hectare": 36,
    "seed_rate_kg_per_acre": 14.57,
    "avg_yield_kg_per_hectare": 4100,
    "avg_yield_kg_per_acre": 1659.27,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 170:85:85 kg per hectare."
    }
  },
  {
    "id": 113,
    "name": "Almond (Badam)",
    "icon": "🌰",
    "category": "Nut/Tree Fruit",
    "growthDays": 180,
    "description": "Almond (Badam) stands out as a prominent nut/tree fruit-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around Temperate combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Curl and Rust. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Curl",
      "Rust"
    ],
    "diseaseManagement": "Mancozeb spray. Pruning.",
    "varieties": [
      "Nonpareil",
      "Kagzi",
      "Waris"
    ],
    "climate": {
      "temperature": "Temperate",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Drip irrigation recommeded. Regular watering in summer.",
    "avgPrice": 40000,
    "image": "https://picsum.photos/seed/Almond(Badam)/400/300",
    "interCrops": [
      "Saffron",
      "Vegetables"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 400,
      "max": 700
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 195:95:95 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 180 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 195,
    "p_ratio_kg_per_hectare": 95,
    "k_ratio_kg_per_hectare": 95,
    "n_ratio_kg_per_acre": 78.92,
    "p_ratio_kg_per_acre": 38.45,
    "k_ratio_kg_per_acre": 38.45,
    "seed_rate_kg_per_hectare": 46,
    "seed_rate_kg_per_acre": 18.62,
    "avg_yield_kg_per_hectare": 4800,
    "avg_yield_kg_per_acre": 1942.56,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 195:95:95 kg per hectare."
    }
  },
  {
    "id": 114,
    "name": "Pear (Nashpati)",
    "icon": "🍎",
    "category": "Fruit",
    "growthDays": 150,
    "description": "Pear (Nashpati) stands out as a prominent fruit-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around Temperate to Subtropical combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Fire Blight and Scab. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Fire Blight",
      "Scab"
    ],
    "diseaseManagement": "Pruning. Antibiotics for bacteria. Fungicides for scab.",
    "varieties": [
      "Patharnakh",
      "Bartlett",
      "Punjab Beauty"
    ],
    "climate": {
      "temperature": "Temperate to Subtropical",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Irrigate at fruit set and development.",
    "avgPrice": 6000,
    "image": "https://picsum.photos/seed/Pear(Nashpati)/400/300",
    "interCrops": [
      "Winter vegetables"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 500,
      "max": 900
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 300:150:300 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 150 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 300,
    "p_ratio_kg_per_hectare": 150,
    "k_ratio_kg_per_hectare": 300,
    "n_ratio_kg_per_acre": 121.41,
    "p_ratio_kg_per_acre": 60.7,
    "k_ratio_kg_per_acre": 121.41,
    "seed_rate_kg_per_hectare": 497,
    "seed_rate_kg_per_acre": 201.14,
    "avg_yield_kg_per_hectare": 39800,
    "avg_yield_kg_per_acre": 16107.06,
    "planting_density_per_acre": 1000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 300:150:300 kg per hectare."
    }
  },
  {
    "id": 115,
    "name": "Gooseberry (beyond amla)",
    "icon": "🌾",
    "category": "Fruit/Medicinal",
    "growthDays": 110,
    "description": "Gooseberry (beyond amla) is a highly valued fruit/medicinal crop cultivated across various regions. It achieves optimal growth at temperatures around Warm combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Mosaic and Leaf Spot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Mosaic",
      "Leaf Spot"
    ],
    "diseaseManagement": "Rogue out infected plants. Clean cultivation.",
    "varieties": [
      "Pusa Pradhan",
      "Local Varieties"
    ],
    "climate": {
      "temperature": "Warm",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Irrigate every 10-15 days. Avoid water logging.",
    "avgPrice": 4000,
    "image": "https://picsum.photos/seed/Gooseberry(beyondamla)/400/300",
    "interCrops": [
      "Vegetables"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 125:60:60 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 110 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 125,
    "p_ratio_kg_per_hectare": 60,
    "k_ratio_kg_per_hectare": 60,
    "n_ratio_kg_per_acre": 50.59,
    "p_ratio_kg_per_acre": 24.28,
    "k_ratio_kg_per_acre": 24.28,
    "seed_rate_kg_per_hectare": 15,
    "seed_rate_kg_per_acre": 6.07,
    "avg_yield_kg_per_hectare": 2700,
    "avg_yield_kg_per_acre": 1092.69,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 125:60:60 kg per hectare."
    }
  },
  {
    "id": 116,
    "name": "Mesta (Hibiscus cannabinus)",
    "icon": "🧶",
    "category": "Fiber",
    "growthDays": 150,
    "description": "Farmers widely cultivate Mesta (Hibiscus cannabinus) as a standard fiber crop bringing steady economic returns. It achieves optimal growth at temperatures around Warm/Humid combined with High of rainfall. The crop performs exceptionally well in Well-drained loamy soil with good organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Root Rot and Stem Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Root Rot",
      "Stem Rot"
    ],
    "diseaseManagement": "Seed treatment. Crop rotation.",
    "varieties": [
      "HS-2",
      "HC-583"
    ],
    "climate": {
      "temperature": "Warm/Humid",
      "rainfall": "High"
    },
    "irrigationDetails": "Mainly rainfed.",
    "avgPrice": 3000,
    "image": "https://picsum.photos/seed/Mesta(Hibiscuscannabinus)/400/300",
    "interCrops": [
      "Pulses"
    ],
    "soilType": "Well-drained loamy soil with good organic matter",
    "watering": {
      "min": 500,
      "max": 700
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 165:80:80 kg per hectare.",
    "pests": "Common regional pests; use integrated pest management",
    "harvest": "Harvest after about 150 days when the crop reaches maturity.",
    "market": "Local demand varies; check regional markets",
    "plantingSeason": "Depends on region; consult local agricultural department",
    "n_ratio_kg_per_hectare": 165,
    "p_ratio_kg_per_hectare": 80,
    "k_ratio_kg_per_hectare": 80,
    "n_ratio_kg_per_acre": 66.78,
    "p_ratio_kg_per_acre": 32.38,
    "k_ratio_kg_per_acre": 32.38,
    "seed_rate_kg_per_hectare": 34,
    "seed_rate_kg_per_acre": 13.76,
    "avg_yield_kg_per_hectare": 4000,
    "avg_yield_kg_per_acre": 1618.8,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 165:80:80 kg per hectare."
    }
  },
  {
    "id": 117,
    "name": "Kidney Bean (Rajma)",
    "icon": "🫘",
    "category": "Pulse",
    "growthDays": 110,
    "description": "Farmers widely cultivate Kidney Bean (Rajma) as a standard pulse crop bringing steady economic returns. It achieves optimal growth at temperatures around Cool combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil rich in organic matter. To ensure a healthy yield, farmers must actively manage risks from diseases like Bean Mosaic and Root Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Bean Mosaic",
      "Root Rot"
    ],
    "diseaseManagement": "Use certified virus-free seeds. Good drainage.",
    "varieties": [
      "Pusa Parvati",
      "HUR-15",
      "Amber"
    ],
    "climate": {
      "temperature": "Cool",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Irrigate at flowering and pod development. Sensitive to water logging.",
    "avgPrice": 8000,
    "image": "https://picsum.photos/seed/KidneyBean(Rajma)/400/300",
    "interCrops": [
      "Maize"
    ],
    "soilType": "Well-drained loamy soil rich in organic matter",
    "watering": {
      "min": 450,
      "max": 650
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 25:50:25 kg per hectare.",
    "pests": "Aphids, Pod Borer, Bean Weevil",
    "harvest": "Harvest when pods dry and change color (~110 days)",
    "market": "High domestic demand in hilly and northern regions",
    "plantingSeason": "Kharif: Jun–Jul; Rabi (limited regions): Oct–Nov",
    "n_ratio_kg_per_hectare": 25,
    "p_ratio_kg_per_hectare": 50,
    "k_ratio_kg_per_hectare": 25,
    "n_ratio_kg_per_acre": 10.12,
    "p_ratio_kg_per_acre": 20.23,
    "k_ratio_kg_per_acre": 10.12,
    "seed_rate_kg_per_hectare": 60,
    "seed_rate_kg_per_acre": 24.28,
    "avg_yield_kg_per_hectare": 1500,
    "avg_yield_kg_per_acre": 607.05,
    "planting_density_per_acre": 80000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 25:50:25 kg per hectare."
    }
  },
  {
    "id": 118,
    "name": "Broad Beans (Fava / Hari Phali)",
    "icon": "🫘",
    "category": "Pulse",
    "growthDays": 110,
    "description": "Broad Beans (Fava / Hari Phali) is a highly valued pulse crop cultivated across various regions. It achieves optimal growth at temperatures around Cool combined with Moderate of rainfall. The crop performs exceptionally well in Loamy soil rich in organic matter with good drainage. To ensure a healthy yield, farmers must actively manage risks from diseases like Chocolate Spot and Rust. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Chocolate Spot",
      "Rust"
    ],
    "diseaseManagement": "Spray Maneb. Remove infected debris.",
    "varieties": [
      "Pusa Sumeet",
      "Pusa Udit"
    ],
    "climate": {
      "temperature": "Cool",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Keep soil moist. Irrigate every 10-12 days.",
    "avgPrice": 4000,
    "image": "https://picsum.photos/seed/BroadBeans(Fava%2FHariPhali)/400/300",
    "interCrops": [
      "Wheat"
    ],
    "soilType": "Loamy soil rich in organic matter with good drainage",
    "watering": {
      "min": 350,
      "max": 600
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 15:35:15 kg per hectare.",
    "pests": "Aphids, Pod Borer",
    "harvest": "Harvest at 100–120 days when pods are filled",
    "market": "Demand for both green & dry beans",
    "plantingSeason": "Oct–Dec",
    "n_ratio_kg_per_hectare": 15,
    "p_ratio_kg_per_hectare": 35,
    "k_ratio_kg_per_hectare": 15,
    "n_ratio_kg_per_acre": 6.07,
    "p_ratio_kg_per_acre": 14.16,
    "k_ratio_kg_per_acre": 6.07,
    "seed_rate_kg_per_hectare": 26,
    "seed_rate_kg_per_acre": 10.52,
    "avg_yield_kg_per_hectare": 1000,
    "avg_yield_kg_per_acre": 404.7,
    "planting_density_per_acre": 80000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 15:35:15 kg per hectare."
    }
  },
  {
    "id": 119,
    "name": "Cluster Bean (Guar / Gavar)",
    "icon": "🫘",
    "category": "Pulse",
    "growthDays": 90,
    "description": "Cluster Bean (Guar / Gavar) stands out as a prominent pulse-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around Hot/Dry combined with Low of rainfall. The crop performs exceptionally well in Sandy loam soil with good drainage. To ensure a healthy yield, farmers must actively manage risks from diseases like Bacterial Blight and Alternaria Leaf Spot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Bacterial Blight",
      "Alternaria Leaf Spot"
    ],
    "diseaseManagement": "Spray Streptocycline. Use resistant varieties.",
    "varieties": [
      "Pusa Navbahar",
      "HG-365",
      "RGC-936"
    ],
    "climate": {
      "temperature": "Hot/Dry",
      "rainfall": "Low"
    },
    "irrigationDetails": "Drought hardy. Irrigate at flowering if dry spin occurs.",
    "avgPrice": 5000,
    "image": "https://picsum.photos/seed/ClusterBean(Guar%2FGavar)/400/300",
    "interCrops": [
      "Pearl Millet",
      "Moth bean"
    ],
    "soilType": "Sandy loam soil with good drainage",
    "watering": {
      "min": 250,
      "max": 450
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 25:55:25 kg per hectare.",
    "pests": "Aphids, Pod Borer",
    "harvest": "Harvest when pods mature (~80–100 days)",
    "market": "High demand for guar gum industry",
    "plantingSeason": "Jun–Jul",
    "n_ratio_kg_per_hectare": 25,
    "p_ratio_kg_per_hectare": 55,
    "k_ratio_kg_per_hectare": 25,
    "n_ratio_kg_per_acre": 10.12,
    "p_ratio_kg_per_acre": 22.26,
    "k_ratio_kg_per_acre": 10.12,
    "seed_rate_kg_per_hectare": 71,
    "seed_rate_kg_per_acre": 28.73,
    "avg_yield_kg_per_hectare": 1700,
    "avg_yield_kg_per_acre": 687.99,
    "planting_density_per_acre": 80000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 25:55:25 kg per hectare."
    }
  },
  {
    "id": 120,
    "name": "French Beans (Snap Beans)",
    "icon": "🫘",
    "category": "Vegetable",
    "growthDays": 60,
    "description": "French Beans (Snap Beans) is a highly valued vegetable crop cultivated across various regions. It achieves optimal growth at temperatures around Cool/Warm combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained sandy loam. To ensure a healthy yield, farmers must actively manage risks from diseases like Bean Mosaic and Anthracnose. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Bean Mosaic",
      "Anthracnose"
    ],
    "diseaseManagement": "Use resistant varieties. Remove infected plants.",
    "varieties": [
      "Arka Komal",
      "Contender",
      "Pant Anupama"
    ],
    "climate": {
      "temperature": "Cool/Warm",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Frequent light irrigation. Mulching helps.",
    "avgPrice": 3000,
    "image": "https://picsum.photos/seed/FrenchBeans(SnapBeans)/400/300",
    "interCrops": [
      "Radish",
      "Spinach"
    ],
    "soilType": "Well-drained sandy loam",
    "watering": {
      "min": 350,
      "max": 550
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 90:45:45 kg per hectare.",
    "pests": "Aphids, Mites, Cutworms",
    "harvest": "55–60 days from sowing",
    "market": "Good price in urban vegetable markets",
    "plantingSeason": "Oct–Dec or Feb–Mar",
    "n_ratio_kg_per_hectare": 90,
    "p_ratio_kg_per_hectare": 45,
    "k_ratio_kg_per_hectare": 45,
    "n_ratio_kg_per_acre": 36.42,
    "p_ratio_kg_per_acre": 18.21,
    "k_ratio_kg_per_acre": 18.21,
    "seed_rate_kg_per_hectare": 2,
    "seed_rate_kg_per_acre": 0.81,
    "avg_yield_kg_per_hectare": 13200,
    "avg_yield_kg_per_acre": 5342.04,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 90:45:45 kg per hectare."
    }
  },
  {
    "id": 121,
    "name": "Lima Bean (Butter Bean)",
    "icon": "🫘",
    "category": "Pulse/Vegetable",
    "growthDays": 120,
    "description": "Known for its excellent market demand, Lima Bean (Butter Bean) plays a crucial role in the pulse/vegetable sector. It achieves optimal growth at temperatures around Warm combined with Moderate of rainfall. The crop performs exceptionally well in Fertile well-drained loam. To ensure a healthy yield, farmers must actively manage risks from diseases like Root Rot and Leaf Spot. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Root Rot",
      "Leaf Spot"
    ],
    "diseaseManagement": "Crop rotation. Seed treatment.",
    "varieties": [
      "Pusa Lima",
      "Local Landraces"
    ],
    "climate": {
      "temperature": "Warm",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Irrigate during dry spells. Avoid water logging.",
    "avgPrice": 5000,
    "image": "https://picsum.photos/seed/LimaBean(ButterBean)/400/300",
    "interCrops": [
      "Maize"
    ],
    "soilType": "Fertile well-drained loam",
    "watering": {
      "min": 450,
      "max": 650
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 130:65:65 kg per hectare.",
    "pests": "Leaf Miner, Pod Borer",
    "harvest": "Harvest at ~110–130 days",
    "market": "Used fresh and dried",
    "plantingSeason": "Jun–Jul / Feb–Mar",
    "n_ratio_kg_per_hectare": 130,
    "p_ratio_kg_per_hectare": 65,
    "k_ratio_kg_per_hectare": 65,
    "n_ratio_kg_per_acre": 52.61,
    "p_ratio_kg_per_acre": 26.31,
    "k_ratio_kg_per_acre": 26.31,
    "seed_rate_kg_per_hectare": 19,
    "seed_rate_kg_per_acre": 7.69,
    "avg_yield_kg_per_hectare": 3000,
    "avg_yield_kg_per_acre": 1214.1,
    "planting_density_per_acre": 50000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 130:65:65 kg per hectare."
    }
  },
  {
    "id": 122,
    "name": "Fennel (Saunf)",
    "icon": "🌿",
    "category": "Seed Spice",
    "growthDays": 150,
    "description": "Known for its excellent market demand, Fennel (Saunf) plays a crucial role in the seed spice sector. It achieves optimal growth at temperatures around Cool/Dry combined with Low of rainfall. The crop performs exceptionally well in Well-drained loamy soil. To ensure a healthy yield, farmers must actively manage risks from diseases like Blight and Powdery Mildew. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Blight",
      "Powdery Mildew"
    ],
    "diseaseManagement": "Spray Mancozeb. Sulfur dusting.",
    "varieties": [
      "RF-101",
      "PF-35",
      "Gujarat Fennel-1"
    ],
    "climate": {
      "temperature": "Cool/Dry",
      "rainfall": "Low"
    },
    "irrigationDetails": "Irrigate every 10-15 days. Critical at seed filling.",
    "avgPrice": 8000,
    "image": "https://picsum.photos/seed/Fennel(Saunf)/400/300",
    "interCrops": [
      "Vegetables"
    ],
    "soilType": "Well-drained loamy soil",
    "watering": {
      "min": 400,
      "max": 700
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 125:65:65 kg per hectare.",
    "pests": "Aphids, Caterpillars",
    "harvest": "Seeds harvested at ~150 days",
    "market": "High-value spice crop",
    "plantingSeason": "Oct–Nov",
    "n_ratio_kg_per_hectare": 125,
    "p_ratio_kg_per_hectare": 65,
    "k_ratio_kg_per_hectare": 65,
    "n_ratio_kg_per_acre": 50.59,
    "p_ratio_kg_per_acre": 26.31,
    "k_ratio_kg_per_acre": 26.31,
    "seed_rate_kg_per_hectare": 17,
    "seed_rate_kg_per_acre": 6.88,
    "avg_yield_kg_per_hectare": 2800,
    "avg_yield_kg_per_acre": 1133.16,
    "planting_density_per_acre": 30000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 125:65:65 kg per hectare."
    }
  },
  {
    "id": 123,
    "name": "Cowpea (Lobia)",
    "icon": "🫘",
    "category": "Pulse",
    "growthDays": 85,
    "description": "Known for its excellent market demand, Cowpea (Lobia) plays a crucial role in the pulse sector. It achieves optimal growth at temperatures around Warm combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained sandy loam. To ensure a healthy yield, farmers must actively manage risks from diseases like Yellow Mosaic and Wilt. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Yellow Mosaic",
      "Wilt"
    ],
    "diseaseManagement": "Use resistant varieties like C-152. Control aphids.",
    "varieties": [
      "Pusa Komal",
      "C-152",
      "Kashi Kanchan"
    ],
    "climate": {
      "temperature": "Warm",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Drought tolerant. Irrigate at pod initiation.",
    "avgPrice": 3500,
    "image": "https://picsum.photos/seed/Cowpea(Lobia)/400/300",
    "interCrops": [
      "Sorghum",
      "Pearl Millet"
    ],
    "soilType": "Well-drained sandy loam",
    "watering": {
      "min": 350,
      "max": 550
    },
    "sunlight": "Full sunlight",
    "fertilizer": "NPK 20:45:20 kg per hectare.",
    "pests": "Aphids, Pod Borer",
    "harvest": "Green pods at 60 days; dry at 85 days",
    "market": "Good vegetable & pulse demand",
    "plantingSeason": "Jun–Jul / Feb–Mar",
    "n_ratio_kg_per_hectare": 20,
    "p_ratio_kg_per_hectare": 45,
    "k_ratio_kg_per_hectare": 20,
    "n_ratio_kg_per_acre": 8.09,
    "p_ratio_kg_per_acre": 18.21,
    "k_ratio_kg_per_acre": 8.09,
    "seed_rate_kg_per_hectare": 44,
    "seed_rate_kg_per_acre": 17.81,
    "avg_yield_kg_per_hectare": 1200,
    "avg_yield_kg_per_acre": 485.64,
    "planting_density_per_acre": 80000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 20:45:20 kg per hectare."
    }
  },
  {
    "id": 124,
    "name": "Horse Gram (Kulthi)",
    "icon": "🫘",
    "category": "Pulse",
    "growthDays": 120,
    "description": "Horse Gram (Kulthi) stands out as a prominent pulse-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around Warm/Dry combined with Low of rainfall. The crop performs exceptionally well in Light soils with good drainage. To ensure a healthy yield, farmers must actively manage risks from diseases like Yellow Mosaic and Root Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Yellow Mosaic",
      "Root Rot"
    ],
    "diseaseManagement": "Control whitefly vectors. Good drainage.",
    "varieties": [
      "CRIDA-18R",
      "AK-21",
      "PHG-9"
    ],
    "climate": {
      "temperature": "Warm/Dry",
      "rainfall": "Low"
    },
    "irrigationDetails": "Highly drought resistant. One irrigation improves yield significantly.",
    "avgPrice": 4000,
    "image": "https://picsum.photos/seed/HorseGram(Kulthi)/400/300",
    "interCrops": [
      "Castor",
      "Niger"
    ],
    "soilType": "Light soils with good drainage",
    "watering": {
      "min": 250,
      "max": 450
    },
    "sunlight": "Full sunlight",
    "fertilizer": "Low requirement crop",
    "pests": "Leaf Spot, Pod Borer",
    "harvest": "Pods dry at ~120 days",
    "market": "Moderate but steady local demand",
    "plantingSeason": "Aug–Sep",
    "n_ratio_kg_per_hectare": 30,
    "p_ratio_kg_per_hectare": 55,
    "k_ratio_kg_per_hectare": 30,
    "n_ratio_kg_per_acre": 12.14,
    "p_ratio_kg_per_acre": 22.26,
    "k_ratio_kg_per_acre": 12.14,
    "seed_rate_kg_per_hectare": 74,
    "seed_rate_kg_per_acre": 29.95,
    "avg_yield_kg_per_hectare": 1700,
    "avg_yield_kg_per_acre": 687.99,
    "planting_density_per_acre": 80000,
    "_meta": {
      "updated_fields": [
        "seed_rate_kg_per_hectare",
        "seed_rate_kg_per_acre",
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare",
        "n_ratio_kg_per_acre",
        "p_ratio_kg_per_acre",
        "k_ratio_kg_per_acre",
        "avg_yield_kg_per_hectare",
        "avg_yield_kg_per_acre",
        "planting_density_per_acre"
      ],
      "fertilizer_parsed_from": "NPK 30:55:30 kg per hectare."
    }
  },
  {
    "id": 125,
    "name": "Avocado",
    "icon": "🥑",
    "category": "Fruit",
    "growthDays": 120,
    "description": "Avocado stands out as a prominent fruit-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Avocado/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 290:145:290 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 290,
    "p_ratio_kg_per_hectare": 145,
    "k_ratio_kg_per_hectare": 290,
    "n_ratio_kg_per_acre": 117.36,
    "p_ratio_kg_per_acre": 58.68,
    "k_ratio_kg_per_acre": 117.36,
    "seed_rate_kg_per_hectare": 483,
    "seed_rate_kg_per_acre": 195.47,
    "avg_yield_kg_per_hectare": 38700,
    "avg_yield_kg_per_acre": 15661.89,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 290:145:290 kg per hectare."
    }
  },
  {
    "id": 126,
    "name": "Passion Fruit",
    "icon": "🍈",
    "category": "Fruit",
    "growthDays": 120,
    "description": "Passion Fruit stands out as a prominent fruit-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/PassionFruit/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 290:145:290 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 290,
    "p_ratio_kg_per_hectare": 145,
    "k_ratio_kg_per_hectare": 290,
    "n_ratio_kg_per_acre": 117.36,
    "p_ratio_kg_per_acre": 58.68,
    "k_ratio_kg_per_acre": 117.36,
    "seed_rate_kg_per_hectare": 481,
    "seed_rate_kg_per_acre": 194.66,
    "avg_yield_kg_per_hectare": 38600,
    "avg_yield_kg_per_acre": 15621.42,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 290:145:290 kg per hectare."
    }
  },
  {
    "id": 127,
    "name": "Mangosteen",
    "icon": "💜",
    "category": "Fruit",
    "growthDays": 120,
    "description": "Mangosteen stands out as a prominent fruit-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Mangosteen/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 270:135:270 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 270,
    "p_ratio_kg_per_hectare": 135,
    "k_ratio_kg_per_hectare": 270,
    "n_ratio_kg_per_acre": 109.27,
    "p_ratio_kg_per_acre": 54.63,
    "k_ratio_kg_per_acre": 109.27,
    "seed_rate_kg_per_hectare": 436,
    "seed_rate_kg_per_acre": 176.45,
    "avg_yield_kg_per_hectare": 35300,
    "avg_yield_kg_per_acre": 14285.91,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 270:135:270 kg per hectare."
    }
  },
  {
    "id": 128,
    "name": "Rambutan",
    "icon": "🔴",
    "category": "Fruit",
    "growthDays": 120,
    "description": "Rambutan is a highly valued fruit crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Rambutan/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 120:60:120 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 120,
    "p_ratio_kg_per_hectare": 60,
    "k_ratio_kg_per_hectare": 120,
    "n_ratio_kg_per_acre": 48.56,
    "p_ratio_kg_per_acre": 24.28,
    "k_ratio_kg_per_acre": 48.56,
    "seed_rate_kg_per_hectare": 144,
    "seed_rate_kg_per_acre": 58.28,
    "avg_yield_kg_per_hectare": 13300,
    "avg_yield_kg_per_acre": 5382.51,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 120:60:120 kg per hectare."
    }
  },
  {
    "id": 129,
    "name": "Durian",
    "icon": "🍈",
    "category": "Fruit",
    "growthDays": 120,
    "description": "Known for its excellent market demand, Durian plays a crucial role in the fruit sector. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Durian/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 155:80:155 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 155,
    "p_ratio_kg_per_hectare": 80,
    "k_ratio_kg_per_hectare": 155,
    "n_ratio_kg_per_acre": 62.73,
    "p_ratio_kg_per_acre": 32.38,
    "k_ratio_kg_per_acre": 62.73,
    "seed_rate_kg_per_hectare": 214,
    "seed_rate_kg_per_acre": 86.61,
    "avg_yield_kg_per_hectare": 18600,
    "avg_yield_kg_per_acre": 7527.42,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 155:80:155 kg per hectare."
    }
  },
  {
    "id": 130,
    "name": "Longan",
    "icon": "🟤",
    "category": "Fruit",
    "growthDays": 120,
    "description": "Longan stands out as a prominent fruit-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Longan/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 285:145:285 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 285,
    "p_ratio_kg_per_hectare": 145,
    "k_ratio_kg_per_hectare": 285,
    "n_ratio_kg_per_acre": 115.34,
    "p_ratio_kg_per_acre": 58.68,
    "k_ratio_kg_per_acre": 115.34,
    "seed_rate_kg_per_hectare": 475,
    "seed_rate_kg_per_acre": 192.23,
    "avg_yield_kg_per_hectare": 38100,
    "avg_yield_kg_per_acre": 15419.07,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 285:145:285 kg per hectare."
    }
  },
  {
    "id": 131,
    "name": "Lychee",
    "icon": "🍒",
    "category": "Fruit",
    "growthDays": 120,
    "description": "Lychee stands out as a prominent fruit-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Lychee/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 285:145:285 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 285,
    "p_ratio_kg_per_hectare": 145,
    "k_ratio_kg_per_hectare": 285,
    "n_ratio_kg_per_acre": 115.34,
    "p_ratio_kg_per_acre": 58.68,
    "k_ratio_kg_per_acre": 115.34,
    "seed_rate_kg_per_hectare": 473,
    "seed_rate_kg_per_acre": 191.42,
    "avg_yield_kg_per_hectare": 38000,
    "avg_yield_kg_per_acre": 15378.6,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 285:145:285 kg per hectare."
    }
  },
  {
    "id": 132,
    "name": "Persimmon",
    "icon": "🟠",
    "category": "Fruit",
    "growthDays": 120,
    "description": "Persimmon stands out as a prominent fruit-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Persimmon/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 265:135:265 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 265,
    "p_ratio_kg_per_hectare": 135,
    "k_ratio_kg_per_hectare": 265,
    "n_ratio_kg_per_acre": 107.25,
    "p_ratio_kg_per_acre": 54.63,
    "k_ratio_kg_per_acre": 107.25,
    "seed_rate_kg_per_hectare": 434,
    "seed_rate_kg_per_acre": 175.64,
    "avg_yield_kg_per_hectare": 35100,
    "avg_yield_kg_per_acre": 14204.97,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 265:135:265 kg per hectare."
    }
  },
  {
    "id": 133,
    "name": "Star Fruit",
    "icon": "⭐",
    "category": "Fruit",
    "growthDays": 120,
    "description": "Star Fruit stands out as a prominent fruit-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/StarFruit/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 295:150:295 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 295,
    "p_ratio_kg_per_hectare": 150,
    "k_ratio_kg_per_hectare": 295,
    "n_ratio_kg_per_acre": 119.39,
    "p_ratio_kg_per_acre": 60.7,
    "k_ratio_kg_per_acre": 119.39,
    "seed_rate_kg_per_hectare": 492,
    "seed_rate_kg_per_acre": 199.11,
    "avg_yield_kg_per_hectare": 39400,
    "avg_yield_kg_per_acre": 15945.18,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 295:150:295 kg per hectare."
    }
  },
  {
    "id": 134,
    "name": "Mulberry",
    "icon": "🍇",
    "category": "Fruit",
    "growthDays": 120,
    "description": "Mulberry is a highly valued fruit crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Mulberry/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 125:60:125 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 125,
    "p_ratio_kg_per_hectare": 60,
    "k_ratio_kg_per_hectare": 125,
    "n_ratio_kg_per_acre": 50.59,
    "p_ratio_kg_per_acre": 24.28,
    "k_ratio_kg_per_acre": 50.59,
    "seed_rate_kg_per_hectare": 151,
    "seed_rate_kg_per_acre": 61.11,
    "avg_yield_kg_per_hectare": 13900,
    "avg_yield_kg_per_acre": 5625.33,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 125:60:125 kg per hectare."
    }
  },
  {
    "id": 135,
    "name": "Phalsa",
    "icon": "🟣",
    "category": "Fruit",
    "growthDays": 120,
    "description": "Known for its excellent market demand, Phalsa plays a crucial role in the fruit sector. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Phalsa/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 200:100:200 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 200,
    "p_ratio_kg_per_hectare": 100,
    "k_ratio_kg_per_hectare": 200,
    "n_ratio_kg_per_acre": 80.94,
    "p_ratio_kg_per_acre": 40.47,
    "k_ratio_kg_per_acre": 80.94,
    "seed_rate_kg_per_hectare": 296,
    "seed_rate_kg_per_acre": 119.79,
    "avg_yield_kg_per_hectare": 24800,
    "avg_yield_kg_per_acre": 10036.56,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 200:100:200 kg per hectare."
    }
  },
  {
    "id": 136,
    "name": "Wood Apple (Bael)",
    "icon": "🟢",
    "category": "Fruit",
    "growthDays": 120,
    "description": "Farmers widely cultivate Wood Apple (Bael) as a standard fruit crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/WoodApple(Bael)/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 200:100:200 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 200,
    "p_ratio_kg_per_hectare": 100,
    "k_ratio_kg_per_hectare": 200,
    "n_ratio_kg_per_acre": 80.94,
    "p_ratio_kg_per_acre": 40.47,
    "k_ratio_kg_per_acre": 80.94,
    "seed_rate_kg_per_hectare": 300,
    "seed_rate_kg_per_acre": 121.41,
    "avg_yield_kg_per_hectare": 25000,
    "avg_yield_kg_per_acre": 10117.5,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 200:100:200 kg per hectare."
    }
  },
  {
    "id": 137,
    "name": "Water Chestnut (Singhara)",
    "icon": "🌰",
    "category": "Fruit",
    "growthDays": 120,
    "description": "Water Chestnut (Singhara) stands out as a prominent fruit-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/WaterChestnut(Singhara)/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 250:125:250 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 250,
    "p_ratio_kg_per_hectare": 125,
    "k_ratio_kg_per_hectare": 250,
    "n_ratio_kg_per_acre": 101.17,
    "p_ratio_kg_per_acre": 50.59,
    "k_ratio_kg_per_acre": 101.17,
    "seed_rate_kg_per_hectare": 403,
    "seed_rate_kg_per_acre": 163.09,
    "avg_yield_kg_per_hectare": 32800,
    "avg_yield_kg_per_acre": 13274.16,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 250:125:250 kg per hectare."
    }
  },
  {
    "id": 138,
    "name": "Kiwi",
    "icon": "🥝",
    "category": "Fruit",
    "growthDays": 120,
    "description": "Kiwi is a highly valued fruit crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Kiwi/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 105:55:105 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 105,
    "p_ratio_kg_per_hectare": 55,
    "k_ratio_kg_per_hectare": 105,
    "n_ratio_kg_per_acre": 42.49,
    "p_ratio_kg_per_acre": 22.26,
    "k_ratio_kg_per_acre": 42.49,
    "seed_rate_kg_per_hectare": 113,
    "seed_rate_kg_per_acre": 45.73,
    "avg_yield_kg_per_hectare": 11000,
    "avg_yield_kg_per_acre": 4451.7,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 105:55:105 kg per hectare."
    }
  },
  {
    "id": 139,
    "name": "Grapefruit",
    "icon": "🍊",
    "category": "Fruit",
    "growthDays": 120,
    "description": "Farmers widely cultivate Grapefruit as a standard fruit crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Grapefruit/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 210:105:210 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 210,
    "p_ratio_kg_per_hectare": 105,
    "k_ratio_kg_per_hectare": 210,
    "n_ratio_kg_per_acre": 84.99,
    "p_ratio_kg_per_acre": 42.49,
    "k_ratio_kg_per_acre": 84.99,
    "seed_rate_kg_per_hectare": 324,
    "seed_rate_kg_per_acre": 131.12,
    "avg_yield_kg_per_hectare": 26900,
    "avg_yield_kg_per_acre": 10886.43,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 210:105:210 kg per hectare."
    }
  },
  {
    "id": 140,
    "name": "Apricot",
    "icon": "🍑",
    "category": "Fruit",
    "growthDays": 120,
    "description": "Farmers widely cultivate Apricot as a standard fruit crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Apricot/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 220:110:220 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 220,
    "p_ratio_kg_per_hectare": 110,
    "k_ratio_kg_per_hectare": 220,
    "n_ratio_kg_per_acre": 89.03,
    "p_ratio_kg_per_acre": 44.52,
    "k_ratio_kg_per_acre": 89.03,
    "seed_rate_kg_per_hectare": 341,
    "seed_rate_kg_per_acre": 138,
    "avg_yield_kg_per_hectare": 28100,
    "avg_yield_kg_per_acre": 11372.07,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 220:110:220 kg per hectare."
    }
  },
  {
    "id": 141,
    "name": "Blueberry",
    "icon": "🫐",
    "category": "Fruit",
    "growthDays": 120,
    "description": "Blueberry stands out as a prominent fruit-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Blueberry/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 280:140:280 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 280,
    "p_ratio_kg_per_hectare": 140,
    "k_ratio_kg_per_hectare": 280,
    "n_ratio_kg_per_acre": 113.32,
    "p_ratio_kg_per_acre": 56.66,
    "k_ratio_kg_per_acre": 113.32,
    "seed_rate_kg_per_hectare": 457,
    "seed_rate_kg_per_acre": 184.95,
    "avg_yield_kg_per_hectare": 36800,
    "avg_yield_kg_per_acre": 14892.96,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 280:140:280 kg per hectare."
    }
  },
  {
    "id": 142,
    "name": "Cranberry",
    "icon": "🍒",
    "category": "Fruit",
    "growthDays": 120,
    "description": "Farmers widely cultivate Cranberry as a standard fruit crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Cranberry/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 210:105:210 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 210,
    "p_ratio_kg_per_hectare": 105,
    "k_ratio_kg_per_hectare": 210,
    "n_ratio_kg_per_acre": 84.99,
    "p_ratio_kg_per_acre": 42.49,
    "k_ratio_kg_per_acre": 84.99,
    "seed_rate_kg_per_hectare": 318,
    "seed_rate_kg_per_acre": 128.69,
    "avg_yield_kg_per_hectare": 26400,
    "avg_yield_kg_per_acre": 10684.08,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 210:105:210 kg per hectare."
    }
  },
  {
    "id": 143,
    "name": "Zucchini",
    "icon": "🥒",
    "category": "Vegetable",
    "growthDays": 120,
    "description": "Farmers widely cultivate Zucchini as a standard vegetable crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Zucchini/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 115:60:60 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 115,
    "p_ratio_kg_per_hectare": 60,
    "k_ratio_kg_per_hectare": 60,
    "n_ratio_kg_per_acre": 46.54,
    "p_ratio_kg_per_acre": 24.28,
    "k_ratio_kg_per_acre": 24.28,
    "seed_rate_kg_per_hectare": 5,
    "seed_rate_kg_per_acre": 2.02,
    "avg_yield_kg_per_hectare": 20300,
    "avg_yield_kg_per_acre": 8215.41,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 115:60:60 kg per hectare."
    }
  },
  {
    "id": 144,
    "name": "Asparagus",
    "icon": "🎋",
    "category": "Vegetable",
    "growthDays": 120,
    "description": "Asparagus is a highly valued vegetable crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Asparagus/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 95:45:45 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 95,
    "p_ratio_kg_per_hectare": 45,
    "k_ratio_kg_per_hectare": 45,
    "n_ratio_kg_per_acre": 38.45,
    "p_ratio_kg_per_acre": 18.21,
    "k_ratio_kg_per_acre": 18.21,
    "seed_rate_kg_per_hectare": 2,
    "seed_rate_kg_per_acre": 0.81,
    "avg_yield_kg_per_hectare": 13900,
    "avg_yield_kg_per_acre": 5625.33,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 95:45:45 kg per hectare."
    }
  },
  {
    "id": 145,
    "name": "Brussels Sprouts",
    "icon": "🥬",
    "category": "Vegetable",
    "growthDays": 120,
    "description": "Farmers widely cultivate Brussels Sprouts as a standard vegetable crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/BrusselsSprouts/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 130:70:70 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 130,
    "p_ratio_kg_per_hectare": 70,
    "k_ratio_kg_per_hectare": 70,
    "n_ratio_kg_per_acre": 52.61,
    "p_ratio_kg_per_acre": 28.33,
    "k_ratio_kg_per_acre": 28.33,
    "seed_rate_kg_per_hectare": 7,
    "seed_rate_kg_per_acre": 2.83,
    "avg_yield_kg_per_hectare": 24000,
    "avg_yield_kg_per_acre": 9712.8,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 130:70:70 kg per hectare."
    }
  },
  {
    "id": 146,
    "name": "Kale",
    "icon": "🥬",
    "category": "Vegetable",
    "growthDays": 120,
    "description": "Kale is a highly valued vegetable crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Kale/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 80:40:40 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 80,
    "p_ratio_kg_per_hectare": 40,
    "k_ratio_kg_per_hectare": 40,
    "n_ratio_kg_per_acre": 32.38,
    "p_ratio_kg_per_acre": 16.19,
    "k_ratio_kg_per_acre": 16.19,
    "seed_rate_kg_per_hectare": 1,
    "seed_rate_kg_per_acre": 0.4,
    "avg_yield_kg_per_hectare": 10700,
    "avg_yield_kg_per_acre": 4330.29,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 80:40:40 kg per hectare."
    }
  },
  {
    "id": 147,
    "name": "Celery",
    "icon": "🌿",
    "category": "Vegetable",
    "growthDays": 120,
    "description": "Celery stands out as a prominent vegetable-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Celery/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 145:75:75 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 145,
    "p_ratio_kg_per_hectare": 75,
    "k_ratio_kg_per_hectare": 75,
    "n_ratio_kg_per_acre": 58.68,
    "p_ratio_kg_per_acre": 30.35,
    "k_ratio_kg_per_acre": 30.35,
    "seed_rate_kg_per_hectare": 9,
    "seed_rate_kg_per_acre": 3.64,
    "avg_yield_kg_per_hectare": 28300,
    "avg_yield_kg_per_acre": 11453.01,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 145:75:75 kg per hectare."
    }
  },
  {
    "id": 148,
    "name": "Leek",
    "icon": "🧅",
    "category": "Vegetable",
    "growthDays": 120,
    "description": "Leek is a highly valued vegetable crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Leek/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 80:40:40 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 80,
    "p_ratio_kg_per_hectare": 40,
    "k_ratio_kg_per_hectare": 40,
    "n_ratio_kg_per_acre": 32.38,
    "p_ratio_kg_per_acre": 16.19,
    "k_ratio_kg_per_acre": 16.19,
    "seed_rate_kg_per_hectare": 1,
    "seed_rate_kg_per_acre": 0.4,
    "avg_yield_kg_per_hectare": 10700,
    "avg_yield_kg_per_acre": 4330.29,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 80:40:40 kg per hectare."
    }
  },
  {
    "id": 149,
    "name": "Artichoke",
    "icon": "🥬",
    "category": "Vegetable",
    "growthDays": 120,
    "description": "Artichoke stands out as a prominent vegetable-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Artichoke/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 150:80:80 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 150,
    "p_ratio_kg_per_hectare": 80,
    "k_ratio_kg_per_hectare": 80,
    "n_ratio_kg_per_acre": 60.7,
    "p_ratio_kg_per_acre": 32.38,
    "k_ratio_kg_per_acre": 32.38,
    "seed_rate_kg_per_hectare": 9,
    "seed_rate_kg_per_acre": 3.64,
    "avg_yield_kg_per_hectare": 29900,
    "avg_yield_kg_per_acre": 12100.53,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 150:80:80 kg per hectare."
    }
  },
  {
    "id": 150,
    "name": "Parsnip",
    "icon": "🥕",
    "category": "Vegetable",
    "growthDays": 120,
    "description": "Farmers widely cultivate Parsnip as a standard vegetable crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Parsnip/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 120:65:65 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 120,
    "p_ratio_kg_per_hectare": 65,
    "k_ratio_kg_per_hectare": 65,
    "n_ratio_kg_per_acre": 48.56,
    "p_ratio_kg_per_acre": 26.31,
    "k_ratio_kg_per_acre": 26.31,
    "seed_rate_kg_per_hectare": 6,
    "seed_rate_kg_per_acre": 2.43,
    "avg_yield_kg_per_hectare": 21700,
    "avg_yield_kg_per_acre": 8781.99,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 120:65:65 kg per hectare."
    }
  },
  {
    "id": 151,
    "name": "Turnip",
    "icon": "🥔",
    "category": "Vegetable",
    "growthDays": 120,
    "description": "Known for its excellent market demand, Turnip plays a crucial role in the vegetable sector. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Turnip/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 100:55:55 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 100,
    "p_ratio_kg_per_hectare": 55,
    "k_ratio_kg_per_hectare": 55,
    "n_ratio_kg_per_acre": 40.47,
    "p_ratio_kg_per_acre": 22.26,
    "k_ratio_kg_per_acre": 22.26,
    "seed_rate_kg_per_hectare": 3,
    "seed_rate_kg_per_acre": 1.21,
    "avg_yield_kg_per_hectare": 16500,
    "avg_yield_kg_per_acre": 6677.55,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 100:55:55 kg per hectare."
    }
  },
  {
    "id": 152,
    "name": "Yam",
    "icon": "🍠",
    "category": "Vegetable",
    "growthDays": 120,
    "description": "Yam is a highly valued vegetable crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Yam/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 80:40:40 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 80,
    "p_ratio_kg_per_hectare": 40,
    "k_ratio_kg_per_hectare": 40,
    "n_ratio_kg_per_acre": 32.38,
    "p_ratio_kg_per_acre": 16.19,
    "k_ratio_kg_per_acre": 16.19,
    "seed_rate_kg_per_hectare": 1,
    "seed_rate_kg_per_acre": 0.4,
    "avg_yield_kg_per_hectare": 10000,
    "avg_yield_kg_per_acre": 4047,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 80:40:40 kg per hectare."
    }
  },
  {
    "id": 153,
    "name": "Bok Choy",
    "icon": "🥬",
    "category": "Vegetable",
    "growthDays": 120,
    "description": "Bok Choy stands out as a prominent vegetable-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/BokChoy/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 135:70:70 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 135,
    "p_ratio_kg_per_hectare": 70,
    "k_ratio_kg_per_hectare": 70,
    "n_ratio_kg_per_acre": 54.63,
    "p_ratio_kg_per_acre": 28.33,
    "k_ratio_kg_per_acre": 28.33,
    "seed_rate_kg_per_hectare": 8,
    "seed_rate_kg_per_acre": 3.24,
    "avg_yield_kg_per_hectare": 25800,
    "avg_yield_kg_per_acre": 10441.26,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 135:70:70 kg per hectare."
    }
  },
  {
    "id": 154,
    "name": "Swiss Chard",
    "icon": "🥬",
    "category": "Vegetable",
    "growthDays": 120,
    "description": "Farmers widely cultivate Swiss Chard as a standard vegetable crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/SwissChard/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 115:60:60 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 115,
    "p_ratio_kg_per_hectare": 60,
    "k_ratio_kg_per_hectare": 60,
    "n_ratio_kg_per_acre": 46.54,
    "p_ratio_kg_per_acre": 24.28,
    "k_ratio_kg_per_acre": 24.28,
    "seed_rate_kg_per_hectare": 5,
    "seed_rate_kg_per_acre": 2.02,
    "avg_yield_kg_per_hectare": 20100,
    "avg_yield_kg_per_acre": 8134.47,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 115:60:60 kg per hectare."
    }
  },
  {
    "id": 155,
    "name": "Rhubarb",
    "icon": "🎋",
    "category": "Vegetable",
    "growthDays": 120,
    "description": "Rhubarb stands out as a prominent vegetable-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Rhubarb/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 140:75:75 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 140,
    "p_ratio_kg_per_hectare": 75,
    "k_ratio_kg_per_hectare": 75,
    "n_ratio_kg_per_acre": 56.66,
    "p_ratio_kg_per_acre": 30.35,
    "k_ratio_kg_per_acre": 30.35,
    "seed_rate_kg_per_hectare": 8,
    "seed_rate_kg_per_acre": 3.24,
    "avg_yield_kg_per_hectare": 27400,
    "avg_yield_kg_per_acre": 11088.78,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 140:75:75 kg per hectare."
    }
  },
  {
    "id": 156,
    "name": "Watercress",
    "icon": "🌿",
    "category": "Vegetable",
    "growthDays": 120,
    "description": "Watercress stands out as a prominent vegetable-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Watercress/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 140:75:75 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 140,
    "p_ratio_kg_per_hectare": 75,
    "k_ratio_kg_per_hectare": 75,
    "n_ratio_kg_per_acre": 56.66,
    "p_ratio_kg_per_acre": 30.35,
    "k_ratio_kg_per_acre": 30.35,
    "seed_rate_kg_per_hectare": 8,
    "seed_rate_kg_per_acre": 3.24,
    "avg_yield_kg_per_hectare": 27100,
    "avg_yield_kg_per_acre": 10967.37,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 140:75:75 kg per hectare."
    }
  },
  {
    "id": 157,
    "name": "Arugula",
    "icon": "🥗",
    "category": "Vegetable",
    "growthDays": 120,
    "description": "Farmers widely cultivate Arugula as a standard vegetable crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Arugula/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 115:60:60 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 115,
    "p_ratio_kg_per_hectare": 60,
    "k_ratio_kg_per_hectare": 60,
    "n_ratio_kg_per_acre": 46.54,
    "p_ratio_kg_per_acre": 24.28,
    "k_ratio_kg_per_acre": 24.28,
    "seed_rate_kg_per_hectare": 5,
    "seed_rate_kg_per_acre": 2.02,
    "avg_yield_kg_per_hectare": 20600,
    "avg_yield_kg_per_acre": 8336.82,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 115:60:60 kg per hectare."
    }
  },
  {
    "id": 158,
    "name": "Kohlrabi",
    "icon": "🟣",
    "category": "Vegetable",
    "growthDays": 120,
    "description": "Farmers widely cultivate Kohlrabi as a standard vegetable crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Kohlrabi/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 120:60:60 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 120,
    "p_ratio_kg_per_hectare": 60,
    "k_ratio_kg_per_hectare": 60,
    "n_ratio_kg_per_acre": 48.56,
    "p_ratio_kg_per_acre": 24.28,
    "k_ratio_kg_per_acre": 24.28,
    "seed_rate_kg_per_hectare": 6,
    "seed_rate_kg_per_acre": 2.43,
    "avg_yield_kg_per_hectare": 21400,
    "avg_yield_kg_per_acre": 8660.58,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 120:60:60 kg per hectare."
    }
  },
  {
    "id": 159,
    "name": "Endive",
    "icon": "🥬",
    "category": "Vegetable",
    "growthDays": 120,
    "description": "Endive is a highly valued vegetable crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Endive/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 80:40:40 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 80,
    "p_ratio_kg_per_hectare": 40,
    "k_ratio_kg_per_hectare": 40,
    "n_ratio_kg_per_acre": 32.38,
    "p_ratio_kg_per_acre": 16.19,
    "k_ratio_kg_per_acre": 16.19,
    "seed_rate_kg_per_hectare": 1,
    "seed_rate_kg_per_acre": 0.4,
    "avg_yield_kg_per_hectare": 10500,
    "avg_yield_kg_per_acre": 4249.35,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 80:40:40 kg per hectare."
    }
  },
  {
    "id": 160,
    "name": "Radicchio",
    "icon": "🥬",
    "category": "Vegetable",
    "growthDays": 120,
    "description": "Radicchio stands out as a prominent vegetable-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Radicchio/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 135:70:70 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 135,
    "p_ratio_kg_per_hectare": 70,
    "k_ratio_kg_per_hectare": 70,
    "n_ratio_kg_per_acre": 54.63,
    "p_ratio_kg_per_acre": 28.33,
    "k_ratio_kg_per_acre": 28.33,
    "seed_rate_kg_per_hectare": 7,
    "seed_rate_kg_per_acre": 2.83,
    "avg_yield_kg_per_hectare": 25400,
    "avg_yield_kg_per_acre": 10279.38,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 135:70:70 kg per hectare."
    }
  },
  {
    "id": 161,
    "name": "Shallot",
    "icon": "🧅",
    "category": "Vegetable",
    "growthDays": 120,
    "description": "Known for its excellent market demand, Shallot plays a crucial role in the vegetable sector. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Shallot/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 100:50:50 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 100,
    "p_ratio_kg_per_hectare": 50,
    "k_ratio_kg_per_hectare": 50,
    "n_ratio_kg_per_acre": 40.47,
    "p_ratio_kg_per_acre": 20.23,
    "k_ratio_kg_per_acre": 20.23,
    "seed_rate_kg_per_hectare": 3,
    "seed_rate_kg_per_acre": 1.21,
    "avg_yield_kg_per_hectare": 16400,
    "avg_yield_kg_per_acre": 6637.08,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 100:50:50 kg per hectare."
    }
  },
  {
    "id": 162,
    "name": "Bamboo Shoots",
    "icon": "🎍",
    "category": "Vegetable",
    "growthDays": 120,
    "description": "Bamboo Shoots is a highly valued vegetable crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/BambooShoots/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 90:45:45 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 90,
    "p_ratio_kg_per_hectare": 45,
    "k_ratio_kg_per_hectare": 45,
    "n_ratio_kg_per_acre": 36.42,
    "p_ratio_kg_per_acre": 18.21,
    "k_ratio_kg_per_acre": 18.21,
    "seed_rate_kg_per_hectare": 2,
    "seed_rate_kg_per_acre": 0.81,
    "avg_yield_kg_per_hectare": 12300,
    "avg_yield_kg_per_acre": 4977.81,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 90:45:45 kg per hectare."
    }
  },
  {
    "id": 163,
    "name": "Cardamom (Small)",
    "icon": "🌿",
    "category": "Spice",
    "growthDays": 120,
    "description": "Farmers widely cultivate Cardamom (Small) as a standard spice crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Cardamom(Small)/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 85:45:45 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 85,
    "p_ratio_kg_per_hectare": 45,
    "k_ratio_kg_per_hectare": 45,
    "n_ratio_kg_per_acre": 34.4,
    "p_ratio_kg_per_acre": 18.21,
    "k_ratio_kg_per_acre": 18.21,
    "seed_rate_kg_per_hectare": 33,
    "seed_rate_kg_per_acre": 13.36,
    "avg_yield_kg_per_hectare": 3300,
    "avg_yield_kg_per_acre": 1335.51,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 85:45:45 kg per hectare."
    }
  },
  {
    "id": 164,
    "name": "Cardamom (Large)",
    "icon": "🌿",
    "category": "Spice",
    "growthDays": 120,
    "description": "Known for its excellent market demand, Cardamom (Large) plays a crucial role in the spice sector. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Cardamom(Large)/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 75:40:40 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 75,
    "p_ratio_kg_per_hectare": 40,
    "k_ratio_kg_per_hectare": 40,
    "n_ratio_kg_per_acre": 30.35,
    "p_ratio_kg_per_acre": 16.19,
    "k_ratio_kg_per_acre": 16.19,
    "seed_rate_kg_per_hectare": 24,
    "seed_rate_kg_per_acre": 9.71,
    "avg_yield_kg_per_hectare": 2500,
    "avg_yield_kg_per_acre": 1011.75,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 75:40:40 kg per hectare."
    }
  },
  {
    "id": 165,
    "name": "Cinnamon",
    "icon": "🪵",
    "category": "Spice",
    "growthDays": 120,
    "description": "Cinnamon is a highly valued spice crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Cinnamon/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 70:35:35 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 70,
    "p_ratio_kg_per_hectare": 35,
    "k_ratio_kg_per_hectare": 35,
    "n_ratio_kg_per_acre": 28.33,
    "p_ratio_kg_per_acre": 14.16,
    "k_ratio_kg_per_acre": 14.16,
    "seed_rate_kg_per_hectare": 18,
    "seed_rate_kg_per_acre": 7.28,
    "avg_yield_kg_per_hectare": 1800,
    "avg_yield_kg_per_acre": 728.46,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 70:35:35 kg per hectare."
    }
  },
  {
    "id": 166,
    "name": "Nutmeg",
    "icon": "🌰",
    "category": "Spice",
    "growthDays": 120,
    "description": "Nutmeg is a highly valued spice crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Nutmeg/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 65:35:35 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 65,
    "p_ratio_kg_per_hectare": 35,
    "k_ratio_kg_per_hectare": 35,
    "n_ratio_kg_per_acre": 26.31,
    "p_ratio_kg_per_acre": 14.16,
    "k_ratio_kg_per_acre": 14.16,
    "seed_rate_kg_per_hectare": 16,
    "seed_rate_kg_per_acre": 6.48,
    "avg_yield_kg_per_hectare": 1600,
    "avg_yield_kg_per_acre": 647.52,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 65:35:35 kg per hectare."
    }
  },
  {
    "id": 167,
    "name": "Mace (Javitri)",
    "icon": "🍂",
    "category": "Spice",
    "growthDays": 120,
    "description": "Mace (Javitri) is a highly valued spice crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Mace(Javitri)/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 60:30:30 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 60,
    "p_ratio_kg_per_hectare": 30,
    "k_ratio_kg_per_hectare": 30,
    "n_ratio_kg_per_acre": 24.28,
    "p_ratio_kg_per_acre": 12.14,
    "k_ratio_kg_per_acre": 12.14,
    "seed_rate_kg_per_hectare": 10,
    "seed_rate_kg_per_acre": 4.05,
    "avg_yield_kg_per_hectare": 1100,
    "avg_yield_kg_per_acre": 445.17,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 60:30:30 kg per hectare."
    }
  },
  {
    "id": 168,
    "name": "Star Anise",
    "icon": "⭐",
    "category": "Spice",
    "growthDays": 120,
    "description": "Star Anise stands out as a prominent spice-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/StarAnise/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 95:60:60 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 95,
    "p_ratio_kg_per_hectare": 60,
    "k_ratio_kg_per_hectare": 60,
    "n_ratio_kg_per_acre": 38.45,
    "p_ratio_kg_per_acre": 24.28,
    "k_ratio_kg_per_acre": 24.28,
    "seed_rate_kg_per_hectare": 47,
    "seed_rate_kg_per_acre": 19.02,
    "avg_yield_kg_per_hectare": 4800,
    "avg_yield_kg_per_acre": 1942.56,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 95:60:60 kg per hectare."
    }
  },
  {
    "id": 169,
    "name": "Vanilla",
    "icon": "🍦",
    "category": "Spice",
    "growthDays": 120,
    "description": "Farmers widely cultivate Vanilla as a standard spice crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Vanilla/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 85:50:50 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 85,
    "p_ratio_kg_per_hectare": 50,
    "k_ratio_kg_per_hectare": 50,
    "n_ratio_kg_per_acre": 34.4,
    "p_ratio_kg_per_acre": 20.23,
    "k_ratio_kg_per_acre": 20.23,
    "seed_rate_kg_per_hectare": 34,
    "seed_rate_kg_per_acre": 13.76,
    "avg_yield_kg_per_hectare": 3400,
    "avg_yield_kg_per_acre": 1375.98,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 85:50:50 kg per hectare."
    }
  },
  {
    "id": 170,
    "name": "Saffron",
    "icon": "🌸",
    "category": "Spice",
    "growthDays": 120,
    "description": "Saffron stands out as a prominent spice-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Saffron/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 95:55:55 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 95,
    "p_ratio_kg_per_hectare": 55,
    "k_ratio_kg_per_hectare": 55,
    "n_ratio_kg_per_acre": 38.45,
    "p_ratio_kg_per_acre": 22.26,
    "k_ratio_kg_per_acre": 22.26,
    "seed_rate_kg_per_hectare": 44,
    "seed_rate_kg_per_acre": 17.81,
    "avg_yield_kg_per_hectare": 4400,
    "avg_yield_kg_per_acre": 1780.68,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 95:55:55 kg per hectare."
    }
  },
  {
    "id": 171,
    "name": "Asafoetida (Hing)",
    "icon": "🟡",
    "category": "Spice",
    "growthDays": 120,
    "description": "Farmers widely cultivate Asafoetida (Hing) as a standard spice crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Asafoetida(Hing)/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 90:50:50 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 90,
    "p_ratio_kg_per_hectare": 50,
    "k_ratio_kg_per_hectare": 50,
    "n_ratio_kg_per_acre": 36.42,
    "p_ratio_kg_per_acre": 20.23,
    "k_ratio_kg_per_acre": 20.23,
    "seed_rate_kg_per_hectare": 39,
    "seed_rate_kg_per_acre": 15.78,
    "avg_yield_kg_per_hectare": 3900,
    "avg_yield_kg_per_acre": 1578.33,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 90:50:50 kg per hectare."
    }
  },
  {
    "id": 172,
    "name": "Fenugreek Seeds (Methi)",
    "icon": "🟤",
    "category": "Spice",
    "growthDays": 120,
    "description": "Fenugreek Seeds (Methi) is a highly valued spice crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/FenugreekSeeds(Methi)/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 65:35:35 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 65,
    "p_ratio_kg_per_hectare": 35,
    "k_ratio_kg_per_hectare": 35,
    "n_ratio_kg_per_acre": 26.31,
    "p_ratio_kg_per_acre": 14.16,
    "k_ratio_kg_per_acre": 14.16,
    "seed_rate_kg_per_hectare": 14,
    "seed_rate_kg_per_acre": 5.67,
    "avg_yield_kg_per_hectare": 1400,
    "avg_yield_kg_per_acre": 566.58,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 65:35:35 kg per hectare."
    }
  },
  {
    "id": 173,
    "name": "Bay Leaf",
    "icon": "🍃",
    "category": "Spice",
    "growthDays": 120,
    "description": "Known for its excellent market demand, Bay Leaf plays a crucial role in the spice sector. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/BayLeaf/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 75:40:40 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 75,
    "p_ratio_kg_per_hectare": 40,
    "k_ratio_kg_per_hectare": 40,
    "n_ratio_kg_per_acre": 30.35,
    "p_ratio_kg_per_acre": 16.19,
    "k_ratio_kg_per_acre": 16.19,
    "seed_rate_kg_per_hectare": 24,
    "seed_rate_kg_per_acre": 9.71,
    "avg_yield_kg_per_hectare": 2400,
    "avg_yield_kg_per_acre": 971.28,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 75:40:40 kg per hectare."
    }
  },
  {
    "id": 174,
    "name": "Dill",
    "icon": "🌿",
    "category": "Spice",
    "growthDays": 120,
    "description": "Dill is a highly valued spice crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Dill/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 60:30:30 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 60,
    "p_ratio_kg_per_hectare": 30,
    "k_ratio_kg_per_hectare": 30,
    "n_ratio_kg_per_acre": 24.28,
    "p_ratio_kg_per_acre": 12.14,
    "k_ratio_kg_per_acre": 12.14,
    "seed_rate_kg_per_hectare": 11,
    "seed_rate_kg_per_acre": 4.45,
    "avg_yield_kg_per_hectare": 1100,
    "avg_yield_kg_per_acre": 445.17,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 60:30:30 kg per hectare."
    }
  },
  {
    "id": 175,
    "name": "Parsley",
    "icon": "🌿",
    "category": "Spice",
    "growthDays": 120,
    "description": "Farmers widely cultivate Parsley as a standard spice crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Parsley/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 85:45:45 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 85,
    "p_ratio_kg_per_hectare": 45,
    "k_ratio_kg_per_hectare": 45,
    "n_ratio_kg_per_acre": 34.4,
    "p_ratio_kg_per_acre": 18.21,
    "k_ratio_kg_per_acre": 18.21,
    "seed_rate_kg_per_hectare": 33,
    "seed_rate_kg_per_acre": 13.36,
    "avg_yield_kg_per_hectare": 3300,
    "avg_yield_kg_per_acre": 1335.51,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 85:45:45 kg per hectare."
    }
  },
  {
    "id": 176,
    "name": "Rosemary",
    "icon": "🌿",
    "category": "Spice",
    "growthDays": 120,
    "description": "Rosemary is a highly valued spice crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Rosemary/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 60:30:30 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 60,
    "p_ratio_kg_per_hectare": 30,
    "k_ratio_kg_per_hectare": 30,
    "n_ratio_kg_per_acre": 24.28,
    "p_ratio_kg_per_acre": 12.14,
    "k_ratio_kg_per_acre": 12.14,
    "seed_rate_kg_per_hectare": 10,
    "seed_rate_kg_per_acre": 4.05,
    "avg_yield_kg_per_hectare": 1000,
    "avg_yield_kg_per_acre": 404.7,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 60:30:30 kg per hectare."
    }
  },
  {
    "id": 177,
    "name": "Thyme",
    "icon": "🌿",
    "category": "Spice",
    "growthDays": 120,
    "description": "Thyme stands out as a prominent spice-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Thyme/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 95:55:55 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 95,
    "p_ratio_kg_per_hectare": 55,
    "k_ratio_kg_per_hectare": 55,
    "n_ratio_kg_per_acre": 38.45,
    "p_ratio_kg_per_acre": 22.26,
    "k_ratio_kg_per_acre": 22.26,
    "seed_rate_kg_per_hectare": 43,
    "seed_rate_kg_per_acre": 17.4,
    "avg_yield_kg_per_hectare": 4300,
    "avg_yield_kg_per_acre": 1740.21,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 95:55:55 kg per hectare."
    }
  },
  {
    "id": 178,
    "name": "Oregano",
    "icon": "🌿",
    "category": "Spice",
    "growthDays": 120,
    "description": "Farmers widely cultivate Oregano as a standard spice crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Oregano/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 85:50:50 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 85,
    "p_ratio_kg_per_hectare": 50,
    "k_ratio_kg_per_hectare": 50,
    "n_ratio_kg_per_acre": 34.4,
    "p_ratio_kg_per_acre": 20.23,
    "k_ratio_kg_per_acre": 20.23,
    "seed_rate_kg_per_hectare": 34,
    "seed_rate_kg_per_acre": 13.76,
    "avg_yield_kg_per_hectare": 3500,
    "avg_yield_kg_per_acre": 1416.45,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 85:50:50 kg per hectare."
    }
  },
  {
    "id": 179,
    "name": "Sage",
    "icon": "🌿",
    "category": "Spice",
    "growthDays": 120,
    "description": "Sage is a highly valued spice crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Sage/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 60:30:30 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 60,
    "p_ratio_kg_per_hectare": 30,
    "k_ratio_kg_per_hectare": 30,
    "n_ratio_kg_per_acre": 24.28,
    "p_ratio_kg_per_acre": 12.14,
    "k_ratio_kg_per_acre": 12.14,
    "seed_rate_kg_per_hectare": 11,
    "seed_rate_kg_per_acre": 4.45,
    "avg_yield_kg_per_hectare": 1100,
    "avg_yield_kg_per_acre": 445.17,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 60:30:30 kg per hectare."
    }
  },
  {
    "id": 180,
    "name": "Tarragon",
    "icon": "🌿",
    "category": "Spice",
    "growthDays": 120,
    "description": "Farmers widely cultivate Tarragon as a standard spice crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Tarragon/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 85:50:50 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 85,
    "p_ratio_kg_per_hectare": 50,
    "k_ratio_kg_per_hectare": 50,
    "n_ratio_kg_per_acre": 34.4,
    "p_ratio_kg_per_acre": 20.23,
    "k_ratio_kg_per_acre": 20.23,
    "seed_rate_kg_per_hectare": 37,
    "seed_rate_kg_per_acre": 14.97,
    "avg_yield_kg_per_hectare": 3800,
    "avg_yield_kg_per_acre": 1537.86,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 85:50:50 kg per hectare."
    }
  },
  {
    "id": 181,
    "name": "Basil (Sweet)",
    "icon": "🌿",
    "category": "Spice",
    "growthDays": 120,
    "description": "Basil (Sweet) is a highly valued spice crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Basil(Sweet)/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 65:35:35 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 65,
    "p_ratio_kg_per_hectare": 35,
    "k_ratio_kg_per_hectare": 35,
    "n_ratio_kg_per_acre": 26.31,
    "p_ratio_kg_per_acre": 14.16,
    "k_ratio_kg_per_acre": 14.16,
    "seed_rate_kg_per_hectare": 16,
    "seed_rate_kg_per_acre": 6.48,
    "avg_yield_kg_per_hectare": 1600,
    "avg_yield_kg_per_acre": 647.52,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 65:35:35 kg per hectare."
    }
  },
  {
    "id": 182,
    "name": "Rose",
    "icon": "🌹",
    "category": "Flower",
    "growthDays": 120,
    "description": "Rose is a highly valued flower crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Rose/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 105:50:50 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 105,
    "p_ratio_kg_per_hectare": 50,
    "k_ratio_kg_per_hectare": 50,
    "n_ratio_kg_per_acre": 42.49,
    "p_ratio_kg_per_acre": 20.23,
    "k_ratio_kg_per_acre": 20.23,
    "seed_rate_kg_per_hectare": 6,
    "seed_rate_kg_per_acre": 2.43,
    "avg_yield_kg_per_hectare": 2100,
    "avg_yield_kg_per_acre": 849.87,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 105:50:50 kg per hectare."
    }
  },
  {
    "id": 183,
    "name": "Marigold",
    "icon": "🌼",
    "category": "Flower",
    "growthDays": 120,
    "description": "Known for its excellent market demand, Marigold plays a crucial role in the flower sector. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Marigold/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 145:75:75 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 145,
    "p_ratio_kg_per_hectare": 75,
    "k_ratio_kg_per_hectare": 75,
    "n_ratio_kg_per_acre": 58.68,
    "p_ratio_kg_per_acre": 30.35,
    "k_ratio_kg_per_acre": 30.35,
    "seed_rate_kg_per_hectare": 26,
    "seed_rate_kg_per_acre": 10.52,
    "avg_yield_kg_per_hectare": 3400,
    "avg_yield_kg_per_acre": 1375.98,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 145:75:75 kg per hectare."
    }
  },
  {
    "id": 184,
    "name": "Jasmine",
    "icon": "💮",
    "category": "Flower",
    "growthDays": 120,
    "description": "Known for its excellent market demand, Jasmine plays a crucial role in the flower sector. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Jasmine/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 125:65:65 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 125,
    "p_ratio_kg_per_hectare": 65,
    "k_ratio_kg_per_hectare": 65,
    "n_ratio_kg_per_acre": 50.59,
    "p_ratio_kg_per_acre": 26.31,
    "k_ratio_kg_per_acre": 26.31,
    "seed_rate_kg_per_hectare": 17,
    "seed_rate_kg_per_acre": 6.88,
    "avg_yield_kg_per_hectare": 2800,
    "avg_yield_kg_per_acre": 1133.16,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 125:65:65 kg per hectare."
    }
  },
  {
    "id": 185,
    "name": "Tuberose",
    "icon": "🌸",
    "category": "Flower",
    "growthDays": 120,
    "description": "Tuberose is a highly valued flower crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Tuberose/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 115:55:55 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 115,
    "p_ratio_kg_per_hectare": 55,
    "k_ratio_kg_per_hectare": 55,
    "n_ratio_kg_per_acre": 46.54,
    "p_ratio_kg_per_acre": 22.26,
    "k_ratio_kg_per_acre": 22.26,
    "seed_rate_kg_per_hectare": 11,
    "seed_rate_kg_per_acre": 4.45,
    "avg_yield_kg_per_hectare": 2500,
    "avg_yield_kg_per_acre": 1011.75,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 115:55:55 kg per hectare."
    }
  },
  {
    "id": 186,
    "name": "Gladiolus",
    "icon": "💐",
    "category": "Flower",
    "growthDays": 120,
    "description": "Gladiolus is a highly valued flower crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Gladiolus/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 110:55:55 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 110,
    "p_ratio_kg_per_hectare": 55,
    "k_ratio_kg_per_hectare": 55,
    "n_ratio_kg_per_acre": 44.52,
    "p_ratio_kg_per_acre": 22.26,
    "k_ratio_kg_per_acre": 22.26,
    "seed_rate_kg_per_hectare": 9,
    "seed_rate_kg_per_acre": 3.64,
    "avg_yield_kg_per_hectare": 2300,
    "avg_yield_kg_per_acre": 930.81,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 110:55:55 kg per hectare."
    }
  },
  {
    "id": 187,
    "name": "Carnation",
    "icon": "🌸",
    "category": "Flower",
    "growthDays": 120,
    "description": "Known for its excellent market demand, Carnation plays a crucial role in the flower sector. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Carnation/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 145:70:70 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 145,
    "p_ratio_kg_per_hectare": 70,
    "k_ratio_kg_per_hectare": 70,
    "n_ratio_kg_per_acre": 58.68,
    "p_ratio_kg_per_acre": 28.33,
    "k_ratio_kg_per_acre": 28.33,
    "seed_rate_kg_per_hectare": 25,
    "seed_rate_kg_per_acre": 10.12,
    "avg_yield_kg_per_hectare": 3300,
    "avg_yield_kg_per_acre": 1335.51,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 145:70:70 kg per hectare."
    }
  },
  {
    "id": 188,
    "name": "Gerbera",
    "icon": "🌻",
    "category": "Flower",
    "growthDays": 120,
    "description": "Gerbera stands out as a prominent flower-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Gerbera/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 190:95:95 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 190,
    "p_ratio_kg_per_hectare": 95,
    "k_ratio_kg_per_hectare": 95,
    "n_ratio_kg_per_acre": 76.89,
    "p_ratio_kg_per_acre": 38.45,
    "k_ratio_kg_per_acre": 38.45,
    "seed_rate_kg_per_hectare": 46,
    "seed_rate_kg_per_acre": 18.62,
    "avg_yield_kg_per_hectare": 4800,
    "avg_yield_kg_per_acre": 1942.56,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 190:95:95 kg per hectare."
    }
  },
  {
    "id": 189,
    "name": "Chrysanthemum",
    "icon": "🏵️",
    "category": "Flower",
    "growthDays": 120,
    "description": "Chrysanthemum is a highly valued flower crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Chrysanthemum/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 110:55:55 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 110,
    "p_ratio_kg_per_hectare": 55,
    "k_ratio_kg_per_hectare": 55,
    "n_ratio_kg_per_acre": 44.52,
    "p_ratio_kg_per_acre": 22.26,
    "k_ratio_kg_per_acre": 22.26,
    "seed_rate_kg_per_hectare": 9,
    "seed_rate_kg_per_acre": 3.64,
    "avg_yield_kg_per_hectare": 2300,
    "avg_yield_kg_per_acre": 930.81,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 110:55:55 kg per hectare."
    }
  },
  {
    "id": 190,
    "name": "Orchid",
    "icon": "🌺",
    "category": "Flower",
    "growthDays": 120,
    "description": "Orchid is a highly valued flower crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Orchid/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 120:60:60 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 120,
    "p_ratio_kg_per_hectare": 60,
    "k_ratio_kg_per_hectare": 60,
    "n_ratio_kg_per_acre": 48.56,
    "p_ratio_kg_per_acre": 24.28,
    "k_ratio_kg_per_acre": 24.28,
    "seed_rate_kg_per_hectare": 14,
    "seed_rate_kg_per_acre": 5.67,
    "avg_yield_kg_per_hectare": 2600,
    "avg_yield_kg_per_acre": 1052.22,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 120:60:60 kg per hectare."
    }
  },
  {
    "id": 191,
    "name": "Anthurium",
    "icon": "❤️",
    "category": "Flower",
    "growthDays": 120,
    "description": "Anthurium is a highly valued flower crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Anthurium/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 120:60:60 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 120,
    "p_ratio_kg_per_hectare": 60,
    "k_ratio_kg_per_hectare": 60,
    "n_ratio_kg_per_acre": 48.56,
    "p_ratio_kg_per_acre": 24.28,
    "k_ratio_kg_per_acre": 24.28,
    "seed_rate_kg_per_hectare": 14,
    "seed_rate_kg_per_acre": 5.67,
    "avg_yield_kg_per_hectare": 2600,
    "avg_yield_kg_per_acre": 1052.22,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 120:60:60 kg per hectare."
    }
  },
  {
    "id": 192,
    "name": "Lotus",
    "icon": "🪷",
    "category": "Flower",
    "growthDays": 120,
    "description": "Lotus stands out as a prominent flower-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Lotus/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 195:95:95 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 195,
    "p_ratio_kg_per_hectare": 95,
    "k_ratio_kg_per_hectare": 95,
    "n_ratio_kg_per_acre": 78.92,
    "p_ratio_kg_per_acre": 38.45,
    "k_ratio_kg_per_acre": 38.45,
    "seed_rate_kg_per_hectare": 47,
    "seed_rate_kg_per_acre": 19.02,
    "avg_yield_kg_per_hectare": 4800,
    "avg_yield_kg_per_acre": 1942.56,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 195:95:95 kg per hectare."
    }
  },
  {
    "id": 193,
    "name": "Hibiscus",
    "icon": "🌺",
    "category": "Flower",
    "growthDays": 120,
    "description": "Farmers widely cultivate Hibiscus as a standard flower crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Hibiscus/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 155:80:80 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 155,
    "p_ratio_kg_per_hectare": 80,
    "k_ratio_kg_per_hectare": 80,
    "n_ratio_kg_per_acre": 62.73,
    "p_ratio_kg_per_acre": 32.38,
    "k_ratio_kg_per_acre": 32.38,
    "seed_rate_kg_per_hectare": 30,
    "seed_rate_kg_per_acre": 12.14,
    "avg_yield_kg_per_hectare": 3700,
    "avg_yield_kg_per_acre": 1497.39,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 155:80:80 kg per hectare."
    }
  },
  {
    "id": 194,
    "name": "Dahlia",
    "icon": "🏵️",
    "category": "Flower",
    "growthDays": 120,
    "description": "Farmers widely cultivate Dahlia as a standard flower crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Dahlia/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 155:75:75 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 155,
    "p_ratio_kg_per_hectare": 75,
    "k_ratio_kg_per_hectare": 75,
    "n_ratio_kg_per_acre": 62.73,
    "p_ratio_kg_per_acre": 30.35,
    "k_ratio_kg_per_acre": 30.35,
    "seed_rate_kg_per_hectare": 30,
    "seed_rate_kg_per_acre": 12.14,
    "avg_yield_kg_per_hectare": 3700,
    "avg_yield_kg_per_acre": 1497.39,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 155:75:75 kg per hectare."
    }
  },
  {
    "id": 195,
    "name": "Zinnia",
    "icon": "🌸",
    "category": "Flower",
    "growthDays": 120,
    "description": "Farmers widely cultivate Zinnia as a standard flower crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Zinnia/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 165:80:80 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 165,
    "p_ratio_kg_per_hectare": 80,
    "k_ratio_kg_per_hectare": 80,
    "n_ratio_kg_per_acre": 66.78,
    "p_ratio_kg_per_acre": 32.38,
    "k_ratio_kg_per_acre": 32.38,
    "seed_rate_kg_per_hectare": 33,
    "seed_rate_kg_per_acre": 13.36,
    "avg_yield_kg_per_hectare": 3900,
    "avg_yield_kg_per_acre": 1578.33,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 165:80:80 kg per hectare."
    }
  },
  {
    "id": 196,
    "name": "Lily",
    "icon": "⚜️",
    "category": "Flower",
    "growthDays": 120,
    "description": "Lily is a highly valued flower crop cultivated across various regions. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Careful adherence to the recommended seasonal cycles ensures a robust harvest.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Lily/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 105:50:50 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 105,
    "p_ratio_kg_per_hectare": 50,
    "k_ratio_kg_per_hectare": 50,
    "n_ratio_kg_per_acre": 42.49,
    "p_ratio_kg_per_acre": 20.23,
    "k_ratio_kg_per_acre": 20.23,
    "seed_rate_kg_per_hectare": 6,
    "seed_rate_kg_per_acre": 2.43,
    "avg_yield_kg_per_hectare": 2100,
    "avg_yield_kg_per_acre": 849.87,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 105:50:50 kg per hectare."
    }
  },
  {
    "id": 197,
    "name": "Ashwagandha",
    "icon": "🌿",
    "category": "Medicinal",
    "growthDays": 120,
    "description": "Farmers widely cultivate Ashwagandha as a standard medicinal crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Ashwagandha/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 165:80:80 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 165,
    "p_ratio_kg_per_hectare": 80,
    "k_ratio_kg_per_hectare": 80,
    "n_ratio_kg_per_acre": 66.78,
    "p_ratio_kg_per_acre": 32.38,
    "k_ratio_kg_per_acre": 32.38,
    "seed_rate_kg_per_hectare": 33,
    "seed_rate_kg_per_acre": 13.36,
    "avg_yield_kg_per_hectare": 3900,
    "avg_yield_kg_per_acre": 1578.33,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 165:80:80 kg per hectare."
    }
  },
  {
    "id": 198,
    "name": "Tulsi (Holy Basil)",
    "icon": "🌿",
    "category": "Medicinal",
    "growthDays": 120,
    "description": "Known for its excellent market demand, Tulsi (Holy Basil) plays a crucial role in the medicinal sector. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Regular monitoring and adherence to proper nutrient schedules greatly enhance its productivity.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Tulsi(HolyBasil)/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 140:70:70 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 140,
    "p_ratio_kg_per_hectare": 70,
    "k_ratio_kg_per_hectare": 70,
    "n_ratio_kg_per_acre": 56.66,
    "p_ratio_kg_per_acre": 28.33,
    "k_ratio_kg_per_acre": 28.33,
    "seed_rate_kg_per_hectare": 22,
    "seed_rate_kg_per_acre": 8.9,
    "avg_yield_kg_per_hectare": 3200,
    "avg_yield_kg_per_acre": 1295.04,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 140:70:70 kg per hectare."
    }
  },
  {
    "id": 199,
    "name": "Aloe Vera",
    "icon": "🌵",
    "category": "Medicinal",
    "growthDays": 120,
    "description": "Farmers widely cultivate Aloe Vera as a standard medicinal crop bringing steady economic returns. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Proper weed and pest management during the vegetative phase improves the final crop quality.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/AloeVera/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 155:75:75 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 155,
    "p_ratio_kg_per_hectare": 75,
    "k_ratio_kg_per_hectare": 75,
    "n_ratio_kg_per_acre": 62.73,
    "p_ratio_kg_per_acre": 30.35,
    "k_ratio_kg_per_acre": 30.35,
    "seed_rate_kg_per_hectare": 30,
    "seed_rate_kg_per_acre": 12.14,
    "avg_yield_kg_per_hectare": 3700,
    "avg_yield_kg_per_acre": 1497.39,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 155:75:75 kg per hectare."
    }
  },
  {
    "id": 200,
    "name": "Mint (Pudina)",
    "icon": "🍃",
    "category": "Medicinal",
    "growthDays": 120,
    "description": "Mint (Pudina) stands out as a prominent medicinal-type crop with widespread agricultural importance. It achieves optimal growth at temperatures around 20-30°C combined with Moderate of rainfall. The crop performs exceptionally well in Well-drained loamy soil.. To ensure a healthy yield, farmers must actively manage risks from diseases like Leaf Spot and Root Rot. Timely harvesting at the right maturity stage is crucial to achieving the best market prices.",
    "diseases": [
      "Leaf Spot",
      "Root Rot"
    ],
    "diseaseManagement": "Use appropriate fungicides and ensure good drainage.",
    "varieties": [
      "Local Selection 1",
      "Hybrid 1"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Moderate"
    },
    "irrigationDetails": "Regular irrigation required depending on soil moisture.",
    "avgPrice": 100,
    "image": "https://picsum.photos/seed/Mint(Pudina)/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy soil.",
    "watering": {
      "min": 400,
      "max": 600
    },
    "sunlight": "Full sun to partial shade",
    "fertilizer": "NPK 185:95:95 kg per hectare.",
    "pests": "Common pests include aphids and mites.",
    "harvest": "Harvest when mature.",
    "market": "High demand in local and export markets.",
    "plantingSeason": "June-July (Kharif) or Oct-Nov (Rabi)",
    "n_ratio_kg_per_hectare": 185,
    "p_ratio_kg_per_hectare": 95,
    "k_ratio_kg_per_hectare": 95,
    "n_ratio_kg_per_acre": 74.87,
    "p_ratio_kg_per_acre": 38.45,
    "k_ratio_kg_per_acre": 38.45,
    "seed_rate_kg_per_hectare": 43,
    "seed_rate_kg_per_acre": 17.4,
    "avg_yield_kg_per_hectare": 4600,
    "avg_yield_kg_per_acre": 1861.62,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [
        "n_ratio_kg_per_hectare",
        "p_ratio_kg_per_hectare",
        "k_ratio_kg_per_hectare"
      ],
      "fertilizer_parsed_from": "NPK 185:95:95 kg per hectare."
    }
  },
  {
    "id": 201,
    "name": "Asafoetida (Hing)",
    "icon": "🌱",
    "category": "Spice",
    "growthDays": 1500,
    "description": "Asafoetida (Hing) is a dried latex (gum oleoresin) exuded from the rhizome or tap root of several species of Ferula, perennial herbs growing 1 to 1.5 m (3.3 to 4.9 ft) tall. It is a crucial spice crop. It thrives in temperate climates with temperatures between 20-30°C and requires low to moderate rainfall. The crop prefers well-drained loamy to sandy loam soil. Proper irrigation is needed during establishment but it is drought tolerant once established. Farmers should watch for localized pests and root rot diseases. It is typically harvested after 4-5 years of growth.",
    "diseases": [
      "Root Rot",
      "Soft Rot"
    ],
    "diseaseManagement": "Ensure good drainage to prevent rot. Use fungicides if necessary.",
    "varieties": [
      "Local Selection",
      "Exotic Varieties"
    ],
    "climate": {
      "temperature": "20-30°C",
      "rainfall": "Low to Moderate"
    },
    "irrigationDetails": "Requires irrigation during initial establishment. Drought tolerant later.",
    "avgPrice": 3500,
    "image": "https://picsum.photos/seed/Asafoetida(Hing)/400/300",
    "interCrops": [],
    "soilType": "Well-drained loamy to sandy loam soil.",
    "watering": {
      "min": 300,
      "max": 500
    },
    "sunlight": "Full sun",
    "fertilizer": "NPK 90:50:50 kg per hectare.",
    "pests": "Aphids, Root borers",
    "harvest": "Harvested after 4-5 years (gum extraction).",
    "market": "High demand in medicinal and spice markets.",
    "plantingSeason": "Spring or Autumn",
    "n_ratio_kg_per_hectare": 90,
    "p_ratio_kg_per_hectare": 50,
    "k_ratio_kg_per_hectare": 50,
    "n_ratio_kg_per_acre": 36.42,
    "p_ratio_kg_per_acre": 20.23,
    "k_ratio_kg_per_acre": 20.23,
    "seed_rate_kg_per_hectare": 39,
    "seed_rate_kg_per_acre": 15.78,
    "avg_yield_kg_per_hectare": 3900,
    "avg_yield_kg_per_acre": 1578.33,
    "planting_density_per_acre": 0,
    "_meta": {
      "updated_fields": [],
      "fertilizer_parsed_from": "NPK 90:50:50 kg per hectare."
    }
  }
];
