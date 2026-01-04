"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSeedling,
  FaTint,
  FaBug,
  FaLeaf,
  FaSun,
  FaChartLine,
  FaSearch,
  FaFilter,
  FaBookmark,
  FaBookmark as FaBookmarkSolid,
  FaShare,
  FaAward,
  FaCalendarAlt,
  FaTractor,
  FaFlask,
  FaRecycle,
} from "react-icons/fa";
import { Capacitor } from "@capacitor/core";
import { shareContent } from "@/utils/shareHandler";

export default function FarmingTips() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [savedTips, setSavedTips] = useState(new Set());
  const [selectedTip, setSelectedTip] = useState(null);

  const tips = [
    // Soil Management
    {
      id: 1,
      title: "Soil Testing Before Planting",
      category: "soil",
      description: "Conduct regular soil tests to determine pH levels, nutrient content, and organic matter. This helps you apply the right fertilizers in correct quantities.",
      details: "Test your soil at least once a year, preferably before the planting season. Collect samples from multiple locations in your field and send them to a certified laboratory. Based on results, adjust pH with lime or sulfur and add specific nutrients as needed.",
      icon: <FaFlask className="w-6 h-6" />,
      color: "from-amber-400 to-amber-600",
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
      season: "all",
      difficulty: "beginner",
    },
    {
      id: 2,
      title: "Organic Matter Addition",
      category: "soil",
      description: "Add compost, farmyard manure, or green manure to improve soil structure, water retention, and nutrient availability.",
      details: "Apply 5-10 tons of well-decomposed organic matter per acre annually. Mix it into the top 6-8 inches of soil. Organic matter improves soil aeration, drainage, and provides slow-release nutrients to crops.",
      icon: <FaRecycle className="w-6 h-6" />,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      season: "all",
      difficulty: "beginner",
    },
    {
      id: 3,
      title: "Crop Rotation Strategy",
      category: "soil",
      description: "Rotate crops to prevent soil depletion, reduce pest and disease buildup, and maintain soil fertility.",
      details: "Follow a 3-4 year rotation cycle. For example: Legumes → Cereals → Oilseeds → Vegetables. Legumes fix nitrogen, cereals use it, and different crops break pest cycles.",
      icon: <FaRecycle className="w-6 h-6" />,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      season: "all",
      difficulty: "intermediate",
    },

    // Water Management
    {
      id: 4,
      title: "Drip Irrigation Efficiency",
      category: "water",
      description: "Use drip irrigation systems to save 30-50% water compared to traditional methods while improving crop yield.",
      details: "Drip irrigation delivers water directly to plant roots, reducing evaporation and runoff. Install systems with proper spacing (12-18 inches for vegetables, 24-36 inches for trees). Monitor soil moisture and adjust irrigation schedules based on weather conditions.",
      icon: <FaTint className="w-6 h-6" />,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      season: "all",
      difficulty: "intermediate",
    },
    {
      id: 5,
      title: "Early Morning Watering",
      category: "water",
      description: "Water your crops early in the morning (5-8 AM) to minimize water loss through evaporation and prevent fungal diseases.",
      details: "Morning watering allows plants to absorb water before the sun gets intense. Avoid evening watering as it can lead to prolonged leaf wetness, promoting fungal growth. Use sprinklers or drip systems for efficient water distribution.",
      icon: <FaSun className="w-6 h-6" />,
      color: "from-sky-400 to-sky-600",
      bgColor: "bg-sky-100",
      iconColor: "text-sky-600",
      season: "summer",
      difficulty: "beginner",
    },
    {
      id: 6,
      title: "Rainwater Harvesting",
      category: "water",
      description: "Collect and store rainwater during monsoon season for use during dry periods. This reduces dependency on groundwater.",
      details: "Install rainwater harvesting systems with storage tanks or ponds. Calculate storage capacity based on your farm area and average rainfall. Use collected water for irrigation during dry spells. Maintain storage systems to prevent contamination.",
      icon: <FaTint className="w-6 h-6" />,
      color: "from-cyan-400 to-cyan-600",
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
      season: "monsoon",
      difficulty: "advanced",
    },

    // Pest & Disease Control
    {
      id: 7,
      title: "Companion Planting",
      category: "pest",
      description: "Plant compatible crops together to naturally repel pests, attract beneficial insects, and improve overall crop health.",
      details: "Examples: Plant marigolds with tomatoes to repel nematodes, basil with peppers to deter aphids, and onions with carrots to confuse carrot flies. Companion planting reduces the need for chemical pesticides and promotes biodiversity.",
      icon: <FaLeaf className="w-6 h-6" />,
      color: "from-emerald-400 to-emerald-600",
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
      season: "all",
      difficulty: "beginner",
    },
    {
      id: 8,
      title: "Early Pest Detection",
      category: "pest",
      description: "Regularly inspect crops for early signs of pests and diseases. Early detection allows for timely intervention with minimal damage.",
      details: "Check plants weekly, especially during vulnerable growth stages. Look for discolored leaves, holes, webs, or unusual growth patterns. Use sticky traps for flying insects. Keep records of pest occurrences to predict future outbreaks.",
      icon: <FaBug className="w-6 h-6" />,
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
      season: "all",
      difficulty: "beginner",
    },
    {
      id: 9,
      title: "Organic Pest Control",
      category: "pest",
      description: "Use neem oil, garlic spray, or other organic solutions to control pests without harmful chemicals.",
      details: "Neem oil (2-3ml per liter) works against aphids, mites, and fungal diseases. Garlic spray (crush 10 cloves in 1 liter water, strain) repels many insects. Apply in the evening to avoid harming beneficial insects. Reapply after rain.",
      icon: <FaBug className="w-6 h-6" />,
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      season: "all",
      difficulty: "intermediate",
    },

    // Crop Management
    {
      id: 10,
      title: "Proper Spacing",
      category: "crop",
      description: "Maintain appropriate spacing between plants to ensure adequate sunlight, air circulation, and nutrient availability.",
      details: "Follow recommended spacing for each crop type. Overcrowding leads to competition for resources, increased disease risk, and reduced yields. Under-spacing wastes land. Refer to seed packets or agricultural extension services for specific spacing guidelines.",
      icon: <FaSeedling className="w-6 h-6" />,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      season: "planting",
      difficulty: "beginner",
    },
    {
      id: 11,
      title: "Timely Harvesting",
      category: "crop",
      description: "Harvest crops at the right maturity stage to maximize yield, quality, and market value.",
      details: "Each crop has an optimal harvest window. Harvest too early and you get lower yields; too late and quality deteriorates. Monitor crop development, check maturity indicators (color, size, firmness), and harvest during cool morning hours for better shelf life.",
      icon: <FaTractor className="w-6 h-6" />,
      color: "from-yellow-400 to-yellow-600",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      season: "harvest",
      difficulty: "intermediate",
    },
    {
      id: 12,
      title: "Seed Selection",
      category: "crop",
      description: "Choose high-quality, certified seeds adapted to your local climate and soil conditions for better yields.",
      details: "Select seeds from reputable suppliers. Look for disease-resistant varieties suitable for your region. Consider hybrid seeds for higher yields or heirloom varieties for better taste. Store seeds in cool, dry conditions to maintain viability.",
      icon: <FaSeedling className="w-6 h-6" />,
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      season: "planting",
      difficulty: "beginner",
    },

    // Fertilizer Management
    {
      id: 13,
      title: "Balanced Fertilization",
      category: "fertilizer",
      description: "Apply fertilizers based on soil test results and crop requirements. Use NPK (Nitrogen, Phosphorus, Potassium) in balanced ratios.",
      details: "Different crops need different nutrient ratios. Cereals need more nitrogen, root crops need more phosphorus, and fruits need more potassium. Apply fertilizers at the right time - nitrogen during active growth, phosphorus at planting, and potassium during flowering/fruiting stages.",
      icon: <FaFlask className="w-6 h-6" />,
      color: "from-pink-400 to-pink-600",
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
      season: "all",
      difficulty: "intermediate",
    },
    {
      id: 14,
      title: "Split Application",
      category: "fertilizer",
      description: "Divide fertilizer application into multiple doses rather than applying all at once for better nutrient uptake and reduced losses.",
      details: "Apply 30% at planting, 40% during active growth, and 30% during flowering/fruiting. This prevents nutrient leaching, reduces fertilizer costs, and improves crop response. Use slow-release fertilizers for better efficiency.",
      icon: <FaChartLine className="w-6 h-6" />,
      color: "from-indigo-400 to-indigo-600",
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
      season: "all",
      difficulty: "intermediate",
    },

    // Seasonal Tips
    {
      id: 15,
      title: "Monsoon Preparation",
      category: "seasonal",
      description: "Prepare your fields before monsoon: clear drainage channels, repair bunds, and have seeds and fertilizers ready.",
      details: "Before monsoon arrives, ensure proper field drainage to prevent waterlogging. Repair and strengthen field bunds. Stock up on seeds, fertilizers, and pesticides. Prepare nursery beds for transplanting. Plan crop calendar based on expected rainfall patterns.",
      icon: <FaCalendarAlt className="w-6 h-6" />,
      color: "from-cyan-400 to-cyan-600",
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
      season: "monsoon",
      difficulty: "beginner",
    },
    {
      id: 16,
      title: "Summer Crop Protection",
      category: "seasonal",
      description: "Protect crops from heat stress during summer with shade nets, mulching, and increased irrigation frequency.",
      details: "Use shade nets (30-50% shade) for sensitive crops. Apply organic mulch (straw, leaves) around plants to retain soil moisture and reduce temperature. Increase irrigation frequency but reduce duration. Water early morning and late evening. Monitor for heat stress symptoms.",
      icon: <FaSun className="w-6 h-6" />,
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      season: "summer",
      difficulty: "intermediate",
    },

    // Additional Soil Management Tips
    {
      id: 17,
      title: "Mulching Benefits",
      category: "soil",
      description: "Apply organic mulch around plants to conserve moisture, suppress weeds, and improve soil temperature regulation.",
      details: "Use straw, leaves, grass clippings, or compost as mulch. Apply 2-4 inches thick around plants, keeping it away from stems. Mulch reduces water evaporation by 25-50%, prevents weed growth, and gradually decomposes to enrich soil. Replenish mulch as it breaks down.",
      icon: <FaLeaf className="w-6 h-6" />,
      color: "from-amber-400 to-amber-600",
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
      season: "all",
      difficulty: "beginner",
    },
    {
      id: 18,
      title: "Deep Plowing Benefits",
      category: "soil",
      description: "Practice deep plowing once every 2-3 years to break hardpan, improve root penetration, and enhance water infiltration.",
      details: "Deep plowing (8-12 inches) breaks compacted soil layers, allowing roots to grow deeper. This improves water retention and nutrient access. However, avoid excessive plowing as it can damage soil structure. Combine with organic matter addition for best results.",
      icon: <FaTractor className="w-6 h-6" />,
      color: "from-amber-400 to-amber-600",
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
      season: "all",
      difficulty: "intermediate",
    },
    {
      id: 19,
      title: "pH Level Management",
      category: "soil",
      description: "Maintain optimal soil pH (6.0-7.5 for most crops) for better nutrient availability and crop growth.",
      details: "Most crops prefer slightly acidic to neutral soil. Add lime to raise pH (if too acidic) or sulfur to lower pH (if too alkaline). Apply amendments 2-3 months before planting. Test pH annually and adjust gradually. Different crops have different pH preferences.",
      icon: <FaFlask className="w-6 h-6" />,
      color: "from-amber-400 to-amber-600",
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
      season: "all",
      difficulty: "intermediate",
    },
    {
      id: 20,
      title: "Cover Crops",
      category: "soil",
      description: "Plant cover crops during off-seasons to prevent soil erosion, suppress weeds, and add organic matter.",
      details: "Legumes like clover, vetch, or beans fix nitrogen. Grasses like rye or oats add organic matter. Plant cover crops after main harvest and plow them under 2-3 weeks before next planting. This improves soil fertility and structure naturally.",
      icon: <FaSeedling className="w-6 h-6" />,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      season: "all",
      difficulty: "intermediate",
    },

    // Additional Water Management Tips
    {
      id: 21,
      title: "Soil Moisture Monitoring",
      category: "water",
      description: "Regularly check soil moisture levels to optimize irrigation timing and prevent over or under-watering.",
      details: "Use a soil moisture meter or simple finger test (soil should feel moist but not waterlogged). Check at root depth (6-12 inches). Water when top 2-3 inches are dry. Maintain consistent moisture, especially during flowering and fruiting stages.",
      icon: <FaTint className="w-6 h-6" />,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      season: "all",
      difficulty: "beginner",
    },
    {
      id: 22,
      title: "Furrow Irrigation",
      category: "water",
      description: "Use furrow irrigation for row crops to efficiently deliver water directly to plant roots while minimizing waste.",
      details: "Create small channels (furrows) between crop rows. Water flows through furrows, seeping into soil near roots. This method is 60-80% efficient. Ensure proper slope (0.1-0.5%) and level fields. Use surge irrigation for better water distribution.",
      icon: <FaTint className="w-6 h-6" />,
      color: "from-cyan-400 to-cyan-600",
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
      season: "all",
      difficulty: "intermediate",
    },
    {
      id: 23,
      title: "Water Conservation Techniques",
      category: "water",
      description: "Implement water-saving practices like bunding, contour farming, and terracing to maximize water retention.",
      details: "Build bunds (small earthen ridges) around fields to prevent runoff. Practice contour farming on slopes to slow water flow. Create terraces on steep slopes. These techniques can increase water retention by 30-40% and reduce soil erosion significantly.",
      icon: <FaTint className="w-6 h-6" />,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      season: "all",
      difficulty: "advanced",
    },

    // Additional Pest Control Tips
    {
      id: 24,
      title: "Biological Pest Control",
      category: "pest",
      description: "Introduce beneficial insects like ladybugs, lacewings, and predatory mites to naturally control pest populations.",
      details: "Beneficial insects prey on harmful pests without damaging crops. Release them early in the season when pest populations are low. Provide habitat with flowering plants. Avoid broad-spectrum pesticides that kill beneficial insects. This is a sustainable, long-term solution.",
      icon: <FaBug className="w-6 h-6" />,
      color: "from-emerald-400 to-emerald-600",
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
      season: "all",
      difficulty: "advanced",
    },
    {
      id: 25,
      title: "Crop Sanitation",
      category: "pest",
      description: "Remove and destroy infected plant parts, weeds, and crop residues to prevent pest and disease spread.",
      details: "Regularly remove diseased leaves, fruits, and stems. Clear weeds that harbor pests. After harvest, remove all crop residues or plow them deep. Burn or compost infected material away from fields. This breaks pest and disease cycles effectively.",
      icon: <FaBug className="w-6 h-6" />,
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
      season: "all",
      difficulty: "beginner",
    },
    {
      id: 26,
      title: "Trap Crops",
      category: "pest",
      description: "Plant trap crops around main crops to attract pests away from valuable plants, then destroy trap crops.",
      details: "Plant attractive crops like marigolds, sunflowers, or mustard around your main crop. Pests prefer these and gather there. Monitor trap crops regularly and remove/destroy them when pest populations build up. This protects your main crop naturally.",
      icon: <FaLeaf className="w-6 h-6" />,
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      season: "all",
      difficulty: "intermediate",
    },
    {
      id: 27,
      title: "Integrated Pest Management",
      category: "pest",
      description: "Combine multiple pest control methods (biological, cultural, mechanical, chemical) for effective, sustainable pest management.",
      details: "IPM uses pest monitoring, biological controls, cultural practices, and targeted pesticide use only when necessary. Set action thresholds - treat only when pest levels exceed economic damage levels. This reduces pesticide use by 50-70% while maintaining crop protection.",
      icon: <FaBug className="w-6 h-6" />,
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      season: "all",
      difficulty: "advanced",
    },

    // Additional Crop Management Tips
    {
      id: 28,
      title: "Intercropping Benefits",
      category: "crop",
      description: "Grow two or more crops together in the same field to maximize land use, reduce risks, and improve yields.",
      details: "Intercropping increases biodiversity and resource use efficiency. Examples: Maize with beans (beans fix nitrogen), tall crops with short crops (different light requirements). Choose compatible crops with different root depths and growth patterns. This can increase total yield by 20-30%.",
      icon: <FaSeedling className="w-6 h-6" />,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      season: "planting",
      difficulty: "intermediate",
    },
    {
      id: 29,
      title: "Pruning Techniques",
      category: "crop",
      description: "Proper pruning of fruit trees and vegetables improves air circulation, light penetration, and fruit quality.",
      details: "Prune during dormant season for trees. Remove dead, diseased, or crossing branches. For vegetables, remove lower leaves touching ground. Prune to maintain open canopy structure. This improves fruit size, reduces disease, and makes harvesting easier.",
      icon: <FaLeaf className="w-6 h-6" />,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      season: "all",
      difficulty: "intermediate",
    },
    {
      id: 30,
      title: "Staking and Support",
      category: "crop",
      description: "Provide proper support structures for climbing and tall crops to prevent lodging and improve yield quality.",
      details: "Use stakes, trellises, or cages for tomatoes, beans, cucumbers, and peppers. Install supports at planting time. Tie plants loosely with soft material. This keeps fruits off ground (reducing rot), improves air circulation, and makes harvesting easier. Increases yield by 15-25%.",
      icon: <FaSeedling className="w-6 h-6" />,
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      season: "planting",
      difficulty: "beginner",
    },
    {
      id: 31,
      title: "Thinning Practices",
      category: "crop",
      description: "Thin overcrowded seedlings to allow remaining plants to grow stronger and produce better yields.",
      details: "Remove weaker seedlings, leaving strongest ones at recommended spacing. Thin when plants have 2-3 true leaves. This reduces competition for nutrients, water, and light. Thinned plants grow larger and produce more. Use thinned seedlings as microgreens if edible.",
      icon: <FaSeedling className="w-6 h-6" />,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      season: "planting",
      difficulty: "beginner",
    },
    {
      id: 32,
      title: "Post-Harvest Handling",
      category: "crop",
      description: "Handle harvested crops carefully to maintain quality, reduce losses, and maximize market value.",
      details: "Harvest during cool hours. Handle produce gently to avoid bruising. Sort and grade immediately. Store in clean, ventilated areas. Maintain proper temperature and humidity. Use appropriate packaging. Good post-harvest handling can reduce losses by 20-30% and increase profits significantly.",
      icon: <FaTractor className="w-6 h-6" />,
      color: "from-yellow-400 to-yellow-600",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      season: "harvest",
      difficulty: "intermediate",
    },

    // Additional Fertilizer Tips
    {
      id: 33,
      title: "Foliar Feeding",
      category: "fertilizer",
      description: "Apply liquid fertilizers directly to leaves for quick nutrient absorption, especially during critical growth stages.",
      details: "Foliar feeding provides nutrients directly to plants, bypassing soil issues. Use during flowering, fruiting, or when plants show deficiency symptoms. Mix 1-2% solution and spray early morning or evening. This is supplementary to soil fertilization, not a replacement.",
      icon: <FaFlask className="w-6 h-6" />,
      color: "from-pink-400 to-pink-600",
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
      season: "all",
      difficulty: "intermediate",
    },
    {
      id: 34,
      title: "Vermicompost Application",
      category: "fertilizer",
      description: "Use vermicompost (worm compost) as a rich organic fertilizer that improves soil health and provides slow-release nutrients.",
      details: "Vermicompost contains beneficial microbes and nutrients in plant-available form. Apply 2-3 tons per acre. Mix into soil or use as top dressing. It improves soil structure, water retention, and provides NPK plus micronutrients. Much more effective than regular compost.",
      icon: <FaRecycle className="w-6 h-6" />,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      season: "all",
      difficulty: "intermediate",
    },
    {
      id: 35,
      title: "Micronutrient Management",
      category: "fertilizer",
      description: "Ensure adequate micronutrients (zinc, iron, boron, etc.) for healthy crop growth and higher yields.",
      details: "Micronutrients are needed in small amounts but are crucial. Deficiencies cause specific symptoms (yellowing, stunting, poor fruit set). Apply micronutrients through foliar sprays or soil application based on soil tests. Common deficiencies: zinc in rice, iron in alkaline soils, boron in fruits.",
      icon: <FaFlask className="w-6 h-6" />,
      color: "from-indigo-400 to-indigo-600",
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
      season: "all",
      difficulty: "advanced",
    },

    // Additional Seasonal Tips
    {
      id: 36,
      title: "Winter Crop Planning",
      category: "seasonal",
      description: "Plan and prepare for winter crops during late monsoon to ensure timely planting and good establishment.",
      details: "Select cold-tolerant varieties. Prepare seedbeds in advance. Ensure adequate irrigation facilities as winter is dry. Plant early to allow crops to establish before severe cold. Use row covers or tunnels for sensitive crops. Monitor for frost damage and protect accordingly.",
      icon: <FaCalendarAlt className="w-6 h-6" />,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      season: "winter",
      difficulty: "intermediate",
    },
    {
      id: 37,
      title: "Pre-Monsoon Preparation",
      category: "seasonal",
      description: "Prepare fields, repair structures, and stock supplies before monsoon to maximize the growing season.",
      details: "Clear and repair drainage channels. Strengthen field bunds and terraces. Stock seeds, fertilizers, and tools. Prepare nursery beds. Service farm equipment. Plan crop calendar based on expected rainfall. Early preparation ensures you can plant immediately when rains arrive.",
      icon: <FaCalendarAlt className="w-6 h-6" />,
      color: "from-cyan-400 to-cyan-600",
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
      season: "monsoon",
      difficulty: "beginner",
    },
    {
      id: 38,
      title: "Post-Monsoon Care",
      category: "seasonal",
      description: "Manage crops after monsoon ends by adjusting irrigation, controlling weeds, and preparing for next season.",
      details: "Gradually reduce irrigation as monsoon ends. Control weeds that flourished during rains. Apply fertilizers as crops enter critical growth stages. Monitor for diseases that thrive in high humidity. Plan for winter crops. Drain excess water from fields to prevent waterlogging.",
      icon: <FaCalendarAlt className="w-6 h-6" />,
      color: "from-cyan-400 to-cyan-600",
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
      season: "monsoon",
      difficulty: "intermediate",
    },

    // General Farming Tips
    {
      id: 39,
      title: "Record Keeping",
      category: "crop",
      description: "Maintain detailed records of planting dates, inputs, weather, yields, and costs to improve future decisions.",
      details: "Record everything: seed varieties, planting dates, fertilizer applications, weather conditions, pest occurrences, harvest dates, yields, and costs. Analyze records annually to identify what works best. This helps optimize practices, reduce costs, and increase profits over time.",
      icon: <FaChartLine className="w-6 h-6" />,
      color: "from-indigo-400 to-indigo-600",
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
      season: "all",
      difficulty: "beginner",
    },
    {
      id: 40,
      title: "Weed Management",
      category: "crop",
      description: "Control weeds early and regularly to prevent competition for nutrients, water, and sunlight.",
      details: "Weeds compete with crops and can reduce yields by 20-50%. Remove weeds when small (easier and more effective). Use mulching, hand weeding, or selective herbicides. Prevent weed seed production. Maintain weed-free fields especially during first 4-6 weeks after planting.",
      icon: <FaLeaf className="w-6 h-6" />,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      season: "all",
      difficulty: "beginner",
    },
    {
      id: 41,
      title: "Greenhouse Farming",
      category: "crop",
      description: "Use greenhouses or polyhouses to extend growing seasons, protect crops, and increase yields.",
      details: "Greenhouses provide controlled environment - temperature, humidity, and protection from pests/weather. Ideal for high-value crops, off-season production, and seedling raising. Requires investment but can increase yields 2-3 times and enable year-round production. Monitor ventilation and temperature carefully.",
      icon: <FaSun className="w-6 h-6" />,
      color: "from-sky-400 to-sky-600",
      bgColor: "bg-sky-100",
      iconColor: "text-sky-600",
      season: "all",
      difficulty: "advanced",
    },
    {
      id: 42,
      title: "Livestock Integration",
      category: "soil",
      description: "Integrate livestock with crop farming for manure production, weed control, and additional income.",
      details: "Grazing animals provide manure, control weeds, and generate income. Use rotational grazing to prevent overgrazing. Manure from livestock is excellent organic fertilizer. This integrated approach improves farm sustainability and profitability. Plan carefully to avoid crop damage.",
      icon: <FaTractor className="w-6 h-6" />,
      color: "from-amber-400 to-amber-600",
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
      season: "all",
      difficulty: "advanced",
    },
    {
      id: 43,
      title: "Seed Treatment",
      category: "crop",
      description: "Treat seeds before planting to protect against diseases, improve germination, and enhance early growth.",
      details: "Use fungicides, bio-fertilizers, or organic treatments. Seed treatment prevents seed-borne diseases and improves germination rate by 10-15%. Soak seeds in recommended solutions for specified time. Dry properly before planting. This small investment pays off with better crop establishment.",
      icon: <FaSeedling className="w-6 h-6" />,
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      season: "planting",
      difficulty: "intermediate",
    },
    {
      id: 44,
      title: "Disease Prevention",
      category: "pest",
      description: "Prevent crop diseases through proper spacing, good air circulation, and resistant varieties rather than treating after infection.",
      details: "Prevention is cheaper and more effective than treatment. Use disease-resistant varieties. Maintain proper spacing for air circulation. Avoid overhead watering that wets leaves. Remove and destroy infected plants immediately. Rotate crops to break disease cycles. Keep tools clean.",
      icon: <FaBug className="w-6 h-6" />,
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
      season: "all",
      difficulty: "beginner",
    },
    {
      id: 45,
      title: "Market Timing",
      category: "crop",
      description: "Time your harvest and sales to take advantage of market prices and demand fluctuations.",
      details: "Monitor market prices and trends. Harvest when prices are favorable. Store produce if prices are low (if storage facilities available). Sell during festivals or peak demand periods. Build relationships with buyers. Consider contract farming for price stability. Good timing can increase profits by 20-40%.",
      icon: <FaChartLine className="w-6 h-6" />,
      color: "from-yellow-400 to-yellow-600",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      season: "harvest",
      difficulty: "intermediate",
    },
  ];

  const categories = [
    { id: "all", name: "All Tips", icon: <FaAward className="w-4 h-4" /> },
    { id: "soil", name: "Soil Management", icon: <FaFlask className="w-4 h-4" /> },
    { id: "water", name: "Water Management", icon: <FaTint className="w-4 h-4" /> },
    { id: "pest", name: "Pest Control", icon: <FaBug className="w-4 h-4" /> },
    { id: "crop", name: "Crop Management", icon: <FaSeedling className="w-4 h-4" /> },
    { id: "fertilizer", name: "Fertilizer", icon: <FaFlask className="w-4 h-4" /> },
    { id: "seasonal", name: "Seasonal", icon: <FaCalendarAlt className="w-4 h-4" /> },
  ];

  const filteredTips = useMemo(() => {
    return tips.filter((tip) => {
      const matchesCategory = selectedCategory === "all" || tip.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.details.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleSave = (tipId) => {
    setSavedTips((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tipId)) {
        newSet.delete(tipId);
      } else {
        newSet.add(tipId);
      }
      return newSet;
    });
  };

  const handleShare = (tip) => {
    if (Capacitor.isNativePlatform()) {
      const result = shareContent({
        title: tip.title,
        text: tip.description,
        id : tip?.id,
        route : "farmin-tips"
      });
      
    if (result.platform === "native") {
      console.log("✔ Shared via native bottom sheet");
    }

    if (result.platform === "web") {
      console.log("🌍 Shared via browser share dialog");
    }

    if (result.platform === "copy") {
      showToast("info", "📋 Link copied to clipboard!");
    }

    if (!result.success) {
      return;
    }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${tip.title}\n\n${tip.description}\n\n${window.location.href}`);
      alert("Tip copied to clipboard!");
    }
  };

  return (
    <div className="min-h-[calc(100vh-122px)]">
      <div className="container mx-auto px-4 py-12 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-farm-500 to-farm-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FaAward className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-farm-900 mb-4 dark:text-white">
            Farming Tips & Best Practices
          </h1>
          <p className="text-farm-700 max-w-2xl mx-auto text-lg dark:text-gray-300">
            Expert agricultural advice to improve your farming practices, increase yields, and maximize profits
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-farm-200 mb-8 dark:bg-[#272727] dark:border-white/20"
        >
          {/* Search Section (Top) */}
          <div className="relative mb-4">
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-neutral-800 rounded-lg px-3 py-2 border border-gray-200 dark:border-neutral-700">
              <FaSearch className="text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search farming tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none flex-1 text-sm text-gray-700 dark:text-gray-200"
              />
            </div>
          </div>

          {/* Categories Section (Bottom) */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <FaFilter className="text-farm-600 flex-shrink-0" />

            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? "bg-gradient-to-r from-farm-500 to-farm-600 text-white shadow-lg"
                      : "bg-farm-100 text-farm-700 hover:bg-farm-200 dark:bg-[#363636] dark:text-gray-300 dark:hover:bg-[#404040]"
                  }`}
                >
                  {cat.icon}
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tips Grid */}
        {filteredTips.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl p-12 text-center shadow-lg border border-farm-200 dark:bg-[#272727] dark:border-white/20"
          >
            <FaSearch className="w-16 h-16 text-farm-300 mx-auto mb-4" />
            <p className="text-farm-600 text-lg dark:text-gray-400">
              No tips found matching your search. Try adjusting your filters.
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredTips.map((tip, index) => (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-farm-200 hover:shadow-xl transition-all cursor-pointer group dark:bg-[#272727] dark:border-white/20"
                  onClick={() => setSelectedTip(tip)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 ${tip.bgColor} rounded-xl flex items-center justify-center ${tip.iconColor}`}>
                      {tip.icon}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSave(tip.id);
                        }}
                        className="p-2 rounded-lg hover:bg-farm-100 transition dark:hover:bg-[#363636]"
                      >
                        {savedTips.has(tip.id) ? (
                          <FaBookmarkSolid className="w-5 h-5 text-yellow-500" />
                        ) : (
                          <FaBookmark className="w-5 h-5 text-farm-400" />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(tip);
                        }}
                        className="p-2 rounded-lg hover:bg-farm-100 transition dark:hover:bg-[#363636]"
                      >
                        <FaShare className="w-5 h-5 text-farm-400" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-farm-900 mb-3 dark:text-white group-hover:text-farm-600 transition">
                    {tip.title}
                  </h3>
                  <p className="text-farm-700 leading-relaxed mb-4 dark:text-gray-300">
                    {tip.description}
                  </p>

                  <div className="flex items-center gap-3 text-sm">
                    <span className={`px-3 py-1 rounded-full ${tip.bgColor} ${tip.iconColor} font-semibold`}>
                      {categories.find((c) => c.id === tip.category)?.name}
                    </span>
                    <span className="text-farm-500 dark:text-gray-400 capitalize">
                      {tip.difficulty}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Tip Detail Modal */}
        <AnimatePresence>
          {selectedTip && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedTip(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl dark:bg-[#272727]"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 ${selectedTip.bgColor} rounded-xl flex items-center justify-center ${selectedTip.iconColor}`}>
                    {selectedTip.icon}
                  </div>
                  <button
                    onClick={() => setSelectedTip(null)}
                    className="text-farm-400 hover:text-farm-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <h2 className="text-3xl font-bold text-farm-900 mb-4 dark:text-white">
                  {selectedTip.title}
                </h2>
                <p className="text-farm-700 text-lg mb-6 leading-relaxed dark:text-gray-300">
                  {selectedTip.description}
                </p>
                <div className="bg-farm-50 rounded-xl p-6 mb-6 dark:bg-[#1E1E1E]">
                  <h3 className="font-bold text-farm-900 mb-3 dark:text-white">Detailed Information:</h3>
                  <p className="text-farm-700 leading-relaxed dark:text-gray-300">
                    {selectedTip.details}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-farm-200 dark:border-white/20">
                  <button
                    onClick={() => toggleSave(selectedTip.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                      savedTips.has(selectedTip.id)
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30"
                        : "bg-farm-100 text-farm-700 hover:bg-farm-200 dark:bg-[#363636] dark:text-gray-300"
                    }`}
                  >
                    {savedTips.has(selectedTip.id) ? (
                      <>
                        <FaBookmarkSolid className="w-4 h-4" />
                        Saved
                      </>
                    ) : (
                      <>
                        <FaBookmark className="w-4 h-4" />
                        Save Tip
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleShare(selectedTip)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-farm-100 text-farm-700 hover:bg-farm-200 transition dark:bg-[#363636] dark:text-gray-300"
                  >
                    <FaShare className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
