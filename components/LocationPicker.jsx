"use client";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { getAllStates, loadStateData } from "@/utils/locationData";
import { useLanguage } from "@/Context/languagecontext";

const DEFAULT_CENTER = { lat: 23.0225, lng: 72.5714 }; // Ahmedabad
const MAP_LIBRARIES = ["places"];

export default function LocationPicker({ value, onChange, errors }) {
  const { t } = useLanguage();
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [villages, setVillages] = useState([]);
  const [locationData, setLocationData] = useState({});
  const [lloading, setLLoading] = useState(false);

  const [selectedState, setSelectedState] = useState(value?.state || "");
  const [selectedDistrict, setSelectedDistrict] = useState(value?.district || "");
  const [selectedTaluka, setSelectedTaluka] = useState(value?.taluka || "");
  const [selectedVillage, setSelectedVillage] = useState(value?.village || "");
  const [mapCenter, setMapCenter] = useState(
    value?.latitude && value?.longitude
      ? { lat: value.latitude, lng: value.longitude }
      : DEFAULT_CENTER
  );
  const [showMap, setShowMap] = useState(false);
  const [mapMarker, setMapMarker] = useState(
    value?.latitude && value?.longitude
      ? { lat: value.latitude, lng: value.longitude }
      : null
  );
  const mapRef = useRef(null);
  const advancedMarkerRef = useRef(null);
  const pendingLocationRef = useRef(null);

  const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: mapsApiKey || "",
    libraries: MAP_LIBRARIES,
  });
  const isApiKeyMissing = !mapsApiKey;

  // Keep map center in sync with incoming form value (e.g., editing existing listing)
  useEffect(() => {
    if (value?.latitude && value?.longitude) {
      const nextPosition = { lat: value.latitude, lng: value.longitude };
      setMapMarker(nextPosition);
      setMapCenter(nextPosition);
    }
  }, [value?.latitude, value?.longitude]);

  useEffect(() => {
    const allStates = getAllStates();
    setStates(allStates);
  }, []);

  const normalize = useCallback((val) => (val || "").trim().toLowerCase(), []);
  const findMatch = useCallback(
    (list, target) => {
      if (!Array.isArray(list) || !target) return null;
      const normalizedTarget = normalize(target);
      return list.find((item) => normalize(item) === normalizedTarget) || null;
    },
    [normalize]
  );

  useEffect(() => {
    if (selectedState) {
      setLLoading(true);
      loadStateData(selectedState)
        .then((data) => {
          setLocationData(data);
          setDistricts(Object.keys(data).sort());
          setSelectedDistrict("");
          setSelectedTaluka("");
          setSelectedVillage("");
          setTalukas([]);
          setVillages([]);
        })
        .catch((error) => {
          console.error("Error loading state data:", error);
          setLocationData({});
          setDistricts([]);
        })
        .finally(() => {
          setLLoading(false);
        });
    } else {
      setLocationData({});
      setDistricts([]);
      setTalukas([]);
      setVillages([]);
    }
  }, [selectedState]);

  // Update talukas when district changes
  useEffect(() => {
    if (selectedState && selectedDistrict && locationData[selectedDistrict]) {
      setTalukas(Object.keys(locationData[selectedDistrict]).sort());
      setSelectedTaluka("");
      setSelectedVillage("");
      setVillages([]);
    } else {
      setTalukas([]);
      setVillages([]);
    }
  }, [selectedDistrict, selectedState, locationData]);

  // Update villages when taluka changes
  useEffect(() => {
    if (selectedState && selectedDistrict && selectedTaluka && locationData[selectedDistrict]?.[selectedTaluka]) {
      setVillages([...locationData[selectedDistrict][selectedTaluka]]);
      setSelectedVillage("");
    } else {
      setVillages([]);
    }
  }, [selectedTaluka, selectedDistrict, selectedState, locationData]);

  // Update parent form when location changes
  useEffect(() => {
    // Prevent firing when parent state resets location
    if (!selectedState && !selectedDistrict && !selectedTaluka && !selectedVillage && !mapMarker) return;

    onChange({
      state: selectedState,
      district: selectedDistrict,
      taluka: selectedTaluka,
      village: selectedVillage,
      latitude: mapMarker?.lat || null,
      longitude: mapMarker?.lng || null,
    });
  }, [selectedState, selectedDistrict, selectedTaluka, selectedVillage, mapMarker]);

  const applyPendingSelections = useCallback(() => {
    const pending = pendingLocationRef.current;
    if (!pending) return;

    if (pending.district && districts.length) {
      const match = findMatch(districts, pending.district);
      if (match) {
        setSelectedDistrict(match);
        pending.district = null;
      }
    }

    if (!pending.district && pending.taluka && talukas.length) {
      const match = findMatch(talukas, pending.taluka);
      if (match) {
        setSelectedTaluka(match);
        pending.taluka = null;
      }
    }

    if (!pending.district && !pending.taluka && pending.village && villages.length) {
      const match = findMatch(villages, pending.village);
      if (match) {
        setSelectedVillage(match);
        pending.village = null;
      }
    }

    if (!pending.district && !pending.taluka && !pending.village) {
      pendingLocationRef.current = null;
    }
  }, [districts, talukas, villages, findMatch]);

  useEffect(() => {
    applyPendingSelections();
  }, [districts, talukas, villages, applyPendingSelections]);

  const reverseGeocodeCoordinates = useCallback(
    async (lat, lng) => {
      if (!mapsApiKey) {
        console.warn("Google Maps API key not configured; cannot reverse geocode.");
        return;
      }

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${mapsApiKey}`
        );
        const data = await response.json();
        if (data.status !== "OK" || !data.results?.length) {
          console.warn("Reverse geocoding failed:", data.status);
          return;
        }

        const components = data.results[0].address_components || [];
        const getComponent = (type) =>
          components.find((part) => part.types.includes(type))?.long_name || null;

        const stateName = getComponent("administrative_area_level_1");
        const districtName = getComponent("administrative_area_level_2");
        const talukaName = getComponent("administrative_area_level_3") || districtName;
        const villageName =
          getComponent("locality") ||
          getComponent("sublocality_level_1") ||
          getComponent("administrative_area_level_4");

        if (stateName) {
          pendingLocationRef.current = {
            district: districtName,
            taluka: talukaName,
            village: villageName,
          };
          const stateMatch = findMatch(states, stateName);
          if (stateMatch) {
            setSelectedState(stateMatch);
          } else {
            console.warn("Matched coordinates to state not in list:", stateName);
            pendingLocationRef.current = null;
          }
        }

        applyPendingSelections();
      } catch (error) {
        console.error("Error reverse geocoding coordinates:", error);
        pendingLocationRef.current = null;
      }
    },
    [mapsApiKey, states, findMatch, applyPendingSelections]
  );

  const handleMapClick = useCallback((event) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();
    if (typeof lat === "number" && typeof lng === "number") {
      const nextPosition = { lat, lng };
      setMapMarker(nextPosition);
      setMapCenter(nextPosition);
      reverseGeocodeCoordinates(lat, lng);
    }
  }, [reverseGeocodeCoordinates]);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert(t("unable_load_map"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const nextPosition = { lat: latitude, lng: longitude };
        setMapMarker(nextPosition);
        setMapCenter(nextPosition);
        mapRef.current?.panTo(nextPosition);
        reverseGeocodeCoordinates(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert(t("unable_load_map"));
      }
    );
  };

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      zoomControl: true,
      gestureHandling: "greedy",
      styles: [
        {
          featureType: "poi",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
      ],
    }),
    []
  );

  const handleMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleMapUnmount = useCallback(() => {
    advancedMarkerRef.current?.setMap(null);
    advancedMarkerRef.current = null;
    mapRef.current = null;
  }, []);

  const ensureAdvancedMarker = useCallback(
    (position) => {
      if (!mapRef.current || !window.google?.maps?.marker?.AdvancedMarkerElement || !position) {
        return;
      }

      if (!advancedMarkerRef.current) {
        const marker = new window.google.maps.marker.AdvancedMarkerElement({
          map: mapRef.current,
          position,
          gmpDraggable: true,
        });

        marker.addListener("dragend", (event) => {
          const lat = event.latLng?.lat();
          const lng = event.latLng?.lng();
          if (typeof lat === "number" && typeof lng === "number") {
            setMapMarker({ lat, lng });
            reverseGeocodeCoordinates(lat, lng);
          }
        });

        advancedMarkerRef.current = marker;
      } else {
        advancedMarkerRef.current.position = position;
      }
    },
    [reverseGeocodeCoordinates]
  );

  useEffect(() => {
    if (mapMarker) {
      ensureAdvancedMarker(mapMarker);
    } else if (advancedMarkerRef.current) {
      advancedMarkerRef.current.setMap(null);
      advancedMarkerRef.current = null;
    }

    return () => {
      if (advancedMarkerRef.current && !mapMarker) {
        advancedMarkerRef.current.setMap(null);
        advancedMarkerRef.current = null;
      }
    };
  }, [mapMarker, ensureAdvancedMarker]);

  return (
    <div className="space-y-4">
      <label className="block text-gray-800 font-semibold mb-2 dark:text-white">
        {t("location_title")} <span className="text-red-600">*</span>
      </label>

      {/* State Dropdown */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">{t("state")}</label>
        <select
          value={selectedState}
          onChange={(e) => {
            pendingLocationRef.current = null;
            setSelectedState(e.target.value);
          }}
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none text-green-900 focus:ring-2 focus:ring-green-500 transition dark:text-white ${
            errors?.state ? "border-red-500 focus:ring-red-500" : "border-gray-300"
          }`}
        >
          <option value="">{t("select_state")}</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {errors?.state && <span className="text-red-500 text-sm mt-1">{errors.state}</span>}
      </div>

      {/* District Dropdown */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">{t("district")}</label>
        <select
          value={selectedDistrict}
          onChange={(e) => {
            pendingLocationRef.current = null;
            setSelectedDistrict(e.target.value);
          }}
          disabled={!selectedState || lloading}
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none text-farm-900 focus:ring-2 focus:ring-green-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed dark:text-white ${
            errors?.district ? "border-red-500 focus:ring-red-500" : "border-gray-300"
          }`}
        >
          <option value="">{lloading ? t("loading") : t("select_district")}</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
        {errors?.district && <span className="text-red-500 text-sm mt-1">{errors.district}</span>}
      </div>

      {/* Taluka Dropdown */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">{t("taluka")}</label>
        <select
          value={selectedTaluka}
          onChange={(e) => {
            pendingLocationRef.current = null;
            setSelectedTaluka(e.target.value);
          }}
          disabled={!selectedDistrict || lloading}
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none text-farm-900 focus:ring-2 focus:ring-green-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed dark:text-white ${
            errors?.taluka ? "border-red-500 focus:ring-red-500" : "border-gray-300"
          }`}
        >
          <option value="">{t("select_taluka")}</option>
          {talukas.map((taluka) => (
            <option key={taluka} value={taluka}>
              {taluka}
            </option>
          ))}
        </select>
        {errors?.taluka && <span className="text-red-500 text-sm mt-1">{errors.taluka}</span>}
      </div>

      {/* Village Dropdown */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">{t("village")}</label>
        <select
          value={selectedVillage}
          onChange={(e) => {
            pendingLocationRef.current = null;
            setSelectedVillage(e.target.value);
          }}
          disabled={!selectedTaluka || lloading}
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none text-farm-900 focus:ring-2 focus:ring-green-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed dark:text-white ${
            errors?.village ? "border-red-500 focus:ring-red-500" : "border-gray-300"
          }`}
        >
          <option value="">{t("select_village")}</option>
          {villages.map((village) => (
            <option key={village} value={village}>
              {village}
            </option>
          ))}
        </select>
        {errors?.village && <span className="text-red-500 text-sm mt-1">{errors.village}</span>}
      </div>

      {/* Map Picker Toggle */}
      {/* <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setShowMap(!showMap)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <FaMapMarkerAlt />
          {showMap ? t("hide_map") : t("choose_on_map")}
        </button>

        {showMap && (
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {t("use_my_location")}
          </button>
        )}
      </div> */}

      {/* Map Container */}
      {showMap && (
        <div className="border rounded-lg overflow-hidden relative z-0" style={{ height: "400px", width: "100%" }}>
          {isApiKeyMissing && (
            <div className="flex h-full w-full items-center justify-center bg-yellow-50 text-yellow-700 text-center px-4">
              {t("missing_api_key")}
            </div>
          )}

          {!isApiKeyMissing && !isLoaded && !loadError && (
            <div className="flex h-full w-full items-center justify-center bg-gray-50 text-gray-600">
              {t("loading_map")}
            </div>
          )}

          {!isApiKeyMissing && loadError && (
            <div className="flex h-full w-full items-center justify-center bg-red-50 text-red-600">
              {t("unable_load_map")}
            </div>
          )}

          {!isApiKeyMissing && isLoaded && !loadError && (
            <GoogleMap
              mapContainerStyle={{ height: "100%", width: "100%" }}
              center={mapCenter}
              zoom={13}
              options={mapOptions}
              onClick={handleMapClick}
              onLoad={handleMapLoad}
              onUnmount={handleMapUnmount}
            >
            </GoogleMap>
          )}

          {mapMarker && (
            <div className="p-2 bg-green-50 border-t">
              <p className="text-sm text-gray-700">
                {t("map_selected")} {mapMarker.lat.toFixed(6)}, {mapMarker.lng.toFixed(6)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
