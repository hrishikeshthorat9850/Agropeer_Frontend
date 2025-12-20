"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";
import { supabase } from "@/lib/supabaseClient";
import { FaTimes, FaPlus } from "react-icons/fa";
import { useLogin } from "@/Context/logincontext";
import LocationPicker from "./LocationPicker";
import Image from "next/image";
import useGeolocation from "@/hooks/useGeolocation";
import { useLanguage } from "@/Context/languagecontext";
import useToast from "@/hooks/useToast";

function Toast({ message, show, onClose, color = "bg-red-700" }) {
  if (!show) return null;
  return (
    <div
      className={`fixed top-10 left-1/2 transform -translate-x-1/2 ${color} 
                  text-white px-6 py-3 rounded-lg shadow-lg z-[9999] flex items-center space-x-3 animate-fade-in`} >
      {message}
      <button className="ml-3 font-bold" onClick={onClose}>✕</button>
    </div>
  );
}

export default function SellForm({ category = "others", productData = null, onClose = null }) {
  const { t } = useLanguage();
  const { showToast: showToastUnified } = useToast();
  
  const CATEGORY_FIELDS = {
    seeds: [
      { name: "title", label: t("form_title"), type: "text", placeholder: t("ph_title") },
      { name: "quantity", label: `${t("form_quantity")} (kg)`, type: "number", placeholder: t("ph_quantity") },
      { name: "price", label: `${t("form_price")} (₹)`, type: "number", placeholder: t("ph_price") },
      { name: "brand", label: t("form_brand"), type: "text", placeholder: t("ph_brand") },
      { name: "description", label: t("form_description"), type: "textarea", placeholder: t("ph_description") },
    ],
    fertilizers: [
      { name: "title", label: t("form_title"), type: "text", placeholder: t("ph_title") },
      { name: "quantity", label: `${t("form_quantity")} (kg)`, type: "number", placeholder: t("ph_quantity") },
      { name: "price", label: `${t("form_price")} (₹)`, type: "number", placeholder: t("ph_price") },
      { name: "composition", label: t("form_composition"), type: "text", placeholder: t("ph_composition") },
      { name: "description", label: t("form_description"), type: "textarea", placeholder: t("ph_description") },
    ],
    pesticides: [
      { name: "title", label: t("form_title"), type: "text", placeholder: t("ph_title") },
      { name: "target", label: t("form_target"), type: "text", placeholder: t("ph_target") },
      { name: "quantity", label: `${t("form_quantity")} (L/kg)`, type: "number", placeholder: t("ph_quantity") },
      { name: "price", label: `${t("form_price")} (₹)`, type: "number", placeholder: t("ph_price") },
      { name: "description", label: t("form_description"), type: "textarea", placeholder: t("ph_description") },
    ],
    machinery: [
      { name: "title", label: t("form_title"), type: "text", placeholder: t("ph_title") },
      { name: "condition", label: t("form_condition"), type: "text", placeholder: t("ph_condition") },
      { name: "price", label: `${t("form_price")} (₹)`, type: "number", placeholder: t("ph_price") },
      { name: "year", label: t("form_year"), type: "number", placeholder: t("ph_year") },
      { name: "description", label: t("form_description"), type: "textarea", placeholder: t("ph_description") },
    ],
    livestock: [
      { name: "title", label: t("form_title"), type: "text", placeholder: t("ph_title") },
      { name: "animal_type", label: t("form_animal_type"), type: "text", placeholder: t("ph_animal_type") },
      { name: "age", label: t("form_age"), type: "text", placeholder: t("ph_age") },
      { name: "price", label: `${t("form_price")} (₹)`, type: "number", placeholder: t("ph_price") },
      { name: "description", label: t("form_description"), type: "textarea", placeholder: t("ph_description") },
    ],
    vegetables: [
      { name: "title", label: t("form_title"), type: "text", placeholder: t("ph_title") },
      { name: "quantity", label: `${t("form_quantity")} (kg)`, type: "number", placeholder: t("ph_quantity") },
      { name: "price", label: `${t("form_price")} (₹)`, type: "number", placeholder: t("ph_price") },
      { name: "description", label: t("form_description"), type: "textarea", placeholder: t("ph_description") },
    ],
    fruits: [
      { name: "title", label: t("form_title"), type: "text", placeholder: t("ph_title") },
      { name: "quantity", label: `${t("form_quantity")} (kg)`, type: "number", placeholder: t("ph_quantity") },
      { name: "price", label: `${t("form_price")} (₹)`, type: "number", placeholder: t("ph_price") },
      { name: "description", label: t("form_description"), type: "textarea", placeholder: t("ph_description") },
    ],
    oil: [
      { name: "title", label: t("form_title"), type: "text", placeholder: t("ph_title") },
      { name: "quantity", label: `${t("form_quantity")} (litres)`, type: "number", placeholder: t("ph_litres") },
      { name: "price", label: `${t("form_price")} (₹)`, type: "number", placeholder: t("ph_price") },
      { name: "description", label: t("form_description"), type: "textarea", placeholder: t("ph_description") },
    ],
    services: [
      { name: "title", label: t("form_service_title"), type: "text", placeholder: t("ph_service_title") },
      { name: "service_type", label: t("form_service_type"), type: "text", placeholder: t("ph_service_type") },
      { name: "price", label: t("form_price"), type: "number", placeholder: t("ph_price") },
      { name: "description", label: t("form_description"), type: "textarea", placeholder: t("ph_description") },
    ],
    others: [
      { name: "title", label: t("form_title"), type: "text", placeholder: t("ph_title") },
      { name: "description", label: t("form_description"), type: "textarea", placeholder: t("ph_description") },
      { name: "price", label: `${t("form_price")} (${t("optional")})`, type: "number", placeholder: t("ph_optional_price") },
    ],
  };

  const {position,error,loading} = useGeolocation();
  const router = useRouter();
  const fileInputRef = useRef(null);
  const fields = CATEGORY_FIELDS[category] || CATEGORY_FIELDS["others"];
  const {user} = useLogin();
  const [resetKey, setResetKey] = useState(0);
  const [form, setForm] = useState(
    fields.reduce((acc, f) => {
      acc[f.name] = productData?.[f.name] ?? "";
      return acc;
    }, {}) 
  );
  const [location, setLocation] = useState({
    district: productData?.location?.district || "",
    taluka: productData?.location?.taluka || "",
    village: productData?.location?.village || "",
    latitude: productData?.location?.latitude || null,
    longitude: productData?.location?.longitude || null,
  });
  const [photos, setPhotos] = useState(productData?.photos || []);
  const [previews, setPreviews] = useState(productData?.photos || []);
  const [selectedCount, setSelectedCount] = useState(previews.length);
  const [errors, setErrors] = useState({});
  const [lloading, setLLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", color: "bg-red-700" });

  useEffect(() => {
    if (loading) return;
    if (!position) return;

    setLocation(prev => ({
      ...prev,
      latitude: position.latitude,
      longitude: position.longitude,
    }));
  }, [position, loading]);

  
  useEffect(() => {
    if (productData) {
      const prefilled = fields.reduce((acc, f) => {
        acc[f.name] = productData[f.name] ?? "";
        return acc;
      }, {});
      if (productData.additional) {
        Object.entries(productData.additional).forEach(([key, value]) => {
          prefilled[key] = value;
        });
      }
      setForm(prefilled);
      if (productData.photos) {
        setPhotos(productData.photos);
        setPreviews(productData.photos);
        setSelectedCount(productData.photos.length);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    }
  }, [productData, category]);

  function showToast(msg, color = "bg-red-700") {
    // Also show unified toast
    const type = color.includes("blue") ? "success" : color.includes("red") ? "error" : "info";
    showToastUnified(type, msg);
    setToast({ show: true, message: msg, color });
    setTimeout(() => setToast({ show: false, message: "", color: "bg-red-700" }), 3000);
  }

  function onChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });

  async function onFileChange(e) {
    const pickedFiles = Array.from(e.target.files || []);
    if (!pickedFiles.length) return;
    if (photos.length + pickedFiles.length > 6) {
      showToast(t("toast_max_photos"));
      return;
    }
    try {
      setPreviewLoading(true);
      const compressedFiles = await Promise.all(
        pickedFiles.map((file) =>
          imageCompression(file, { maxSizeMB: 0.5, maxWidthOrHeight: 1280, useWebWorker: true })
        )
      );
      const combinedFiles = [...photos, ...compressedFiles];
      const newlyAddedDataUrls = await Promise.all(compressedFiles.map(fileToDataUrl));
      setPhotos(combinedFiles);
      setPreviews([...previews, ...newlyAddedDataUrls]);
      setSelectedCount([...previews, ...newlyAddedDataUrls].length);
      if (errors.photos) setErrors((prev) => ({ ...prev, photos: "" }));
      setPreviewLoading(false);
    } catch (err) {
      console.error(err);
      showToast(t("toast_image_error"));
      setPreviewLoading(false);
    }
  }

  function removePhoto(index) {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
    setPreviews(updatedPreviews);
    setSelectedCount(updatedPreviews.length);
    if (updatedPreviews.length === 0 && fileInputRef.current) fileInputRef.current.value = "";
  }

  function validateForm() {
    const newErrors = {};
    if (!form.title?.trim()) newErrors.title = t("form_required_title");
    if (!form.price?.toString()?.trim()) newErrors.price = t("form_required_price");
    const quantityField = fields.find((f) => f.name === "quantity");
    if (quantityField && (!form.quantity || !form.quantity.toString()?.trim()))
      newErrors.quantity = t("form_required_quantity");
    if (!form.description?.trim()) newErrors.description = t("form_required_description");
    if (previews.length === 0) newErrors.photos = t("form_required_photos");
    if (!location.district?.trim()) newErrors.location = { district: t("form_required_district") };
    if (!location.taluka?.trim()) newErrors.location = { ...newErrors.location, taluka: t("form_required_taluka") };
    if (!location.village?.trim()) newErrors.location = { ...newErrors.location, village: t("form_required_village") };
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function uploadPhotosToSupabase() {
    const total = photos.length;
    let completed = 0;
    const uploadTasks = photos.map(async (file, i) => {
      if (typeof file === "string") return file;
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${i}.${fileExt}`;
      const filePath = `product-photos/${fileName}`;
      const { error } = await supabase.storage.from("agri-photos").upload(filePath, file);
      if (error) throw new Error(error.message);
      const { data: publicData } = supabase.storage.from("agri-photos").getPublicUrl(filePath);
      completed++;
      setProgress(Math.round((completed / total) * 100));
      return publicData.publicUrl;
    });
    return await Promise.all(uploadTasks);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    setLLoading(true);
    setProgress(0);
    try {
      console.log("User id is :",user?.id);
      const uploadedUrls = await uploadPhotosToSupabase();
      const listingPayload = {
        user_id : user?.id,
        category: category || "others",
        title: form.title || "",
        quantity: form.quantity ? String(form.quantity) : null,
        price: String(form.price || ""),
        description: form.description || "",
        photos: uploadedUrls.length ? uploadedUrls : ["https://via.placeholder.com/150"],
        type: "Sell",
        location: location,
        additional: Object.fromEntries(
          Object.entries(form).filter(([key]) => !["title", "quantity", "price", "description"].includes(key))
        ),
      };
      if (productData && productData.id) {
        const { error } = await supabase.from("agri_products").update(listingPayload).eq("id", productData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("agri_products").insert([listingPayload]);
        if (error) throw error;
      }
      showToast("success", t("toast_submit_success"));
      if (onClose) onClose();
      router.push("/market");

      // ⬇⬇ RESET FORM AFTER SUCCESS
      setForm(
        fields.reduce((acc, f) => {
          acc[f.name] = "";
          return acc;
        }, {})
      );

      setLocation({
        district: "",
        taluka: "",
        village: "",
        latitude: null,
        longitude: null,
      });

      setPhotos([]);
      setPreviews([]);
      setSelectedCount(0);
      setResetKey(prev => prev + 1);

    if (fileInputRef.current) fileInputRef.current.value = "";

    } catch (err) {
      console.error("Submit error:", err);
      showToast("error", t("toast_submit_error"));
    } finally {
      setLLoading(false);
    }
  }

  function handleLocationChange(updated) {
    // Update location (1 time)
    setLocation(updated);

    // Clear only specific errors (do NOT rewrite whole location.error object)
    setErrors((prev) => ({
      ...prev,
      location: {
        district:
          updated.district?.trim() ? "" : prev.location?.district || "",
        taluka:
          updated.taluka?.trim() ? "" : prev.location?.taluka || "",
        village:
          updated.village?.trim() ? "" : prev.location?.village || "",
      },
    }));
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className={`space-y-6 p-4 sm:p-6 bg-white rounded-2xl shadow-lg dark:bg-[#1E1E1E] ${onClose ? "max-h-[80vh] overflow-y-auto" : ""}`}
      >
        {fields.map((f) => {
          const isRequired = ["title", "price", "quantity", "description"].includes(f.name);
          return (
            <div key={f.name} className="flex flex-col">
              <label className="block text-gray-800 font-semibold mb-2 dark:text-white">
                {f.label}
                {isRequired && <span className="text-red-600 ml-1">*</span>}
              </label>
              {f.type === "textarea" ? (
                <textarea
                  name={f.name}
                  value={form[f.name] || ""}
                  onChange={onChange}
                  placeholder={f.placeholder || ""}
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 text-farm-900 focus:ring-green-500 transition ${
                    errors[f.name] ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                  }`}
                  rows={4}
                />
              ) : (
                <input
                  name={f.name}
                  type={f.type}
                  value={form[f.name] || ""}
                  onChange={onChange}
                  onWheel={(e) => e.target.blur()}
                  placeholder={f.placeholder || ""}
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none text-farm-900 focus:ring-2 focus:ring-green-500 transition ${
                    errors[f.name] ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                  }`}
                />
              )}
              {errors[f.name] && <span className="text-red-500 text-sm mt-1">{errors[f.name]}</span>}
            </div>
          );
        })}

        {/* Location Picker */}
        <LocationPicker 
          key={resetKey}
          value={location} 
          onChange={handleLocationChange}
          errors={errors.location}
        />

        {/* Photo Upload */}
        <div className="flex flex-col">
          <label className="text-gray-800 font-semibold mb-2 dark:text-white">
            {t("photos_label")} <span className="text-red-600">*</span>
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={onFileChange}
            className={`w-full border rounded-lg px-2 py-2 focus:outline-none text-farm-900 focus:ring-2 focus:ring-green-500 ${
              errors.photos ? "border-red-500" : "border-gray-300"
            }`}
          />
          {selectedCount > 0 && <p className="text-gray-600 mt-1">{selectedCount} {t("photos_selected")}</p>}
          {errors.photos && <span className="text-red-500 text-sm mt-1">{errors.photos}</span>}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3 relative">
            {previewLoading && (
              <div className="absolute inset-0 flex justify-center items-center bg-white/70 z-10 rounded-lg">
                <div className="w-10 h-10 border-4 border-lime-500 border-t-green-500 rounded-full animate-spin"></div>
              </div>
            )}

            {previews.map((src, idx) => (
              <div key={idx} className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm group">
                <div className="relative w-full h-32">
                  <Image src={src} alt={`preview-${idx}`} fill className="object-cover" />
                </div>
                <button
                  type="button"
                  onClick={() => removePhoto(idx)}
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <FaTimes size={10} />
                </button>
              </div>
            ))}
          </div>

          {lloading && (
            <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
              <div className="bg-green-600 h-3 rounded-full transition-all duration-200" style={{ width: `${progress}%` }}></div>
              <p className="text-center mt-1 text-gray-700 font-medium">{progress}%</p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              {t("btn_cancel")}
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-xl shadow-lg transform transition-transform hover:scale-105"
          >
            {lloading ? `${t("uploading_label")} ${progress}%` : t("btn_submit")}
          </button>
        </div>
      </form>

      <Toast show={toast.show} message={toast.message} color={toast.color} onClose={() => setToast({ show: false, message: "", color: "bg-red-700" })} />
    </>
  );
}
