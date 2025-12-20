"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import {
  FaUpload,
  FaTimes,
  FaBullhorn,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";

export default function AdCreate({ onAdCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "General",
    price: "",
    link: "",
    duration: 7,
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "info", text: "" });

  const showToast = (text, type = "info", ms = 3000) => {
    setToast({ show: true, type, text });
    setTimeout(() => setToast({ show: false, type: "info", text: "" }), ms);
  };

  function updateField(name, value) {
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleImagePick(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!/^image\//.test(file.type)) {
      showToast("Please pick an image file.", "error");
      return;
    }

    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.6,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      });
      setImageFile(compressed);
      setPreviewUrl(URL.createObjectURL(compressed));
    } catch (err) {
      console.error("compress error", err);
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      showToast("Image compression failed — using original image.", "error");
    }
  }

  function removeImage() {
    setImageFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  }

  // Upload image to Supabase
  async function uploadImageToSupabase(file) {
    const bucketName = "ads-photos";

    const { data: buckets } = await supabase.storage.listBuckets();
    if (!buckets.find((b) => b.name === bucketName)) {
      await supabase.storage.createBucket(bucketName, { public: true });
    }

    const filename = `images/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filename, file, { cacheControl: "3600", upsert: false });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(bucketName).getPublicUrl(filename);
    return data.publicUrl;
  }

  // ✅ Submit handler with auth check
  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim()) return showToast("Title is required.", "error");
    if (!form.description.trim())
      return showToast("Description is required.", "error");
    if (!imageFile) return showToast("Please upload an image.", "error");
    if (form.duration < 1)
      return showToast("Duration must be at least 1 day.", "error");

    setLoading(true);

    try {
      // Check auth
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        showToast("You must be logged in to create an ad.", "error");
        setLoading(false);
        return;
      }

      const imageUrl = await uploadImageToSupabase(imageFile);

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category || "General",
        price: form.price ? Number(form.price) : null,
        link: form.link?.trim() || null,
        image_url: imageUrl,
        duration: Number(form.duration),
        active: true,
        date: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("ads")
        .insert([payload])
        .select()
        .single();

      if (error) throw error;

      showToast("success", "Ad posted successfully! 📢");

      // Reset form
      setForm({
        title: "",
        description: "",
        category: "General",
        price: "",
        link: "",
        duration: 7,
      });
      removeImage();

      onAdCreated?.(data);
    } catch (err) {
      console.error("Ad create error full:", JSON.stringify(err, null, 2));
      showToast("error", "Error creating ad. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-green-100 p-6"
    >
      {toast.show && (
        <div
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-5 py-2 rounded-lg text-white font-semibold ${
            toast.type === "success"
              ? "bg-green-600"
              : toast.type === "error"
              ? "bg-red-600"
              : "bg-blue-600"
          }`}
        >
          {toast.text}
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <FaBullhorn className="text-green-700 text-2xl" />
        <h2 className="text-2xl font-bold text-gray-900">Create New Ad</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ad Title <span className="text-red-500">*</span>
          </label>
          <input
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-200 text-farm-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="e.g. 20% off on premium tractors"
            required
          />
        </div>

        {/* Category / Price / Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-200 text-farm-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
            >
              <option>General</option>
              <option>Seeds</option>
              <option>Fertilizers</option>
              <option>Machinery</option>
              <option>Services</option>
              <option>Pesticides</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price (₹)
            </label>
            <input
              type="number"
              min="0"
              value={form.price}
              onWheel={(e) => e.target.blur()}
              onChange={(e) => updateField("price", e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-200 text-farm-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration (days)
            </label>
            <input
              type="number"
              min="1"
              max="365"
              value={form.duration}
              onWheel={(e) => e.target.blur()}
              onChange={(e) => updateField("duration", e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-200 text-farm-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            rows={4}
            className="mt-2 w-full rounded-lg border border-gray-200 text-farm-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 resize-none"
            placeholder="Describe the offer, highlight benefits, deadlines, promo codes..."
            required
          />
        </div>

        {/* Link */}
        <div>
          <label className="block text-sm font-medium text-green-700">
            CTA Link (optional)
          </label>
          <input
            value={form.link}
            onChange={(e) => updateField("link", e.target.value)}
            className="mt-2 w-full rounded-lg border border-green-200 px-4 py-2 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400"
            placeholder="https://example.com/offer"
          />

          {form.link && (
            <p className="mt-2 text-sm">
              Preview:{" "}
              <a
                href={form.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800 font-medium underline underline-offset-2 transition"
              >
                {form.link}
              </a>
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ad Image <span className="text-red-500">*</span>
          </label>
          <div className="mt-3 flex items-start gap-4">
            <label
              htmlFor="ad-image"
              className="flex-none cursor-pointer inline-flex items-center gap-2 rounded-lg border border-dashed border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <FaUpload />
              <span>{imageFile ? "Change Image" : "Choose Image"}</span>
              <input
                id="ad-image"
                type="file"
                accept="image/*"
                onChange={handleImagePick}
                className="sr-only"
              />
            </label>

            <div className="flex-1">
              {previewUrl ? (
                <div className="relative w-full max-w-xs rounded-lg overflow-hidden border border-gray-200">
                  <div className="relative w-full h-40">
                    <Image
                      src={previewUrl}
                      alt="preview"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow hover:bg-white"
                    aria-label="Remove image"
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <div className="text-sm text-gray-500">
                  Recommended: 1200×800 (jpg/png). Max: 2MB.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-4 pt-3">
          <div className="text-sm text-gray-600">
            <strong className="text-gray-800">Preview:</strong>{" "}
            <span className="text-gray-600">
              {form.title ? form.title : "No title yet"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setForm({
                  title: "",
                  description: "",
                  category: "General",
                  price: "",
                  link: "",
                  duration: 7,
                });
                removeImage();
              }}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-semibold"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" /> Posting...
                </>
              ) : (
                <>
                  <FaCheckCircle /> Post Ad
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
