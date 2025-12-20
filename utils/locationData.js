// Utility to load and process location data from AllState folder

// State file mapping - maps state names to file names
const STATE_FILES = {
  "ANDAMAN & NICOBAR ISLANDS": "ANDAMAN_and_NICOBAR_ISLANDS_extracted.json",
  "ANDHRA PRADESH": "ANDHRA_PRADESH_extracted.json",
  "ARUNACHAL PRADESH": "ARUNACHAL_PRADESH_extracted.json",
  "ASSAM": "ASSAM_extracted.json",
  "BIHAR": "BIHAR_extracted.json",
  "CHANDIGARH": "CHANDIGARH_extracted.json",
  "CHHATTISGARH": "CHHATTISGARH_extracted.json",
  "DADRA & NAGAR HAVELI": "DADRA_and_NAGAR_HAVELI_extracted.json",
  "DAMAN & DIU": "DAMAN_and_DIU_extracted.json",
  "GOA": "GOA_extracted.json",
  "GUJARAT": "GUJARAT_extracted.json",
  "HARYANA": "HARYANA_extracted.json",
  "HIMACHAL PRADESH": "HIMACHAL_PRADESH_extracted.json",
  "JAMMU & KASHMIR": "JAMMU_and_KASHMIR_extracted.json",
  "JHARKHAND": "JHARKHAND_extracted.json",
  "KARNATAKA": "KARNATAKA_extracted.json",
  "KERALA": "KERALA_extracted.json",
  "LAKSHADWEEP": "LAKSHADWEEP_extracted.json",
  "MADHYA PRADESH": "MADHYA_PRADESH_extracted.json",
  "MAHARASHTRA": "MAHARASHTRA_extracted.json",
  "MANIPUR": "MANIPUR_extracted.json",
  "MEGHALAYA": "MEGHALAYA_extracted.json",
  "MIZORAM": "MIZORAM_extracted.json",
  "NAGALAND": "NAGALAND_extracted.json",
  "NCT OF DELHI": "NCT_OF_DELHI_extracted.json",
  "ODISHA": "ODISHA_extracted.json",
  "PUDUCHERRY": "PUDUCHERRY_extracted.json",
  "PUNJAB": "PUNJAB_extracted.json",
  "RAJASTHAN": "RAJASTHAN_extracted.json",
  "SIKKIM": "SIKKIM_extracted.json",
  "TAMIL NADU": "TAMIL_NADU_extracted.json",
  "TRIPURA": "TRIPURA_extracted.json",
  "UTTAR PRADESH": "UTTAR_PRADESH_extracted.json",
  "UTTARAKHAND": "UTTARAKHAND_extracted.json",
  "WEST BENGAL": "WEST_BENGAL_extracted.json",
};

// Cache for loaded state data
const stateDataCache = {};

/**
 * Load and process state data from JSON file
 * @param {string} stateName - Name of the state
 * @returns {Promise<Object>} Processed location data structure
 */
export async function loadStateData(stateName) {
  // Check cache first
  if (stateDataCache[stateName]) {
    return stateDataCache[stateName];
  }

  const fileName = STATE_FILES[stateName];
  if (!fileName) {
    console.error(`State file not found for: ${stateName}`);
    return {};
  }

  try {
    // Fetch from API route
    const response = await fetch(`/api/location-data?state=${encodeURIComponent(stateName)}`);
    if (!response.ok) {
      throw new Error(`Failed to load ${stateName}`);
    }
    const processedData = await response.json();
    
    // Cache the processed data
    stateDataCache[stateName] = processedData;
    
    return processedData;
  } catch (error) {
    console.error(`Error loading state data for ${stateName}:`, error);
    return {};
  }
}

/**
 * Get list of all available states
 * @returns {string[]} Array of state names
 */
export function getAllStates() {
  return Object.keys(STATE_FILES).sort();
}

/**
 * Preload all state data (for better performance)
 * @returns {Promise<void>}
 */
export async function preloadAllStateData() {
  const states = getAllStates();
  await Promise.all(states.map((state) => loadStateData(state)));
}

