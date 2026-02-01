"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { Toast } from "@/components/ui/market";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";
import ImageUploadBox from "@/components/ui/ImageUploadBox";

export default function EditPostModal({
  isOpen,
  onOpenChange,
  post,
  onUpdated,
}) {
  const { t } = useLanguage();
  const [caption, setCaption] = useState(post?.caption || "");
  const [images, setImages] = useState(post?.images || []);
  const [newImages, setNewImages] = useState([]);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const MAX_IMAGES = 12;
  useEffect(() => {
    console.log("post is :", post);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setCaption(post?.caption || "");
      setImages(post?.images || []);
      setTimeout(() => textareaRef.current?.focus(), 80);
    }
  }, [isOpen, post]);

  const close = useCallback(() => onOpenChange?.(false), [onOpenChange]);

  const showToast = (message, type = "success", ms = 2200) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type }), ms);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    const total = images.length + newImages.length + files.length;
    if (total > MAX_IMAGES) {
      showToast(t("max_images_error", { max: MAX_IMAGES }), "error");
      return;
    }
    setNewImages((prev) => [...prev, ...files]);
  };

  const removeExistingImage = (imgToRemove) => {
    setImages((prev) => {
      // Handle both object format { url, path, type } and string format
      if (typeof imgToRemove === "string") {
        return prev.filter((img) => {
          if (typeof img === "string") return img !== imgToRemove;
          return img.url !== imgToRemove;
        });
      }
      // If it's an object, compare by url
      return prev.filter((img) => {
        if (typeof img === "string") return img !== imgToRemove.url;
        return img.url !== imgToRemove.url;
      });
    });
  };
  const removeNewImage = (index) =>
    setNewImages((prev) => prev.filter((_, i) => i !== index));

  const handleSave = async () => {
    if (!post?.id || saving) return;
    setSaving(true);
    try {
      let uploadedUrls = [];
      if (newImages.length > 0) {
        const uploads = await Promise.all(
          newImages.map(async (file) => {
            const fileName = `${Date.now()}_${file.name}`;
            const { data, error } = await supabase.storage
              .from("post-images")
              .upload(fileName, file);
            if (error) throw error;
            const { data: publicUrl } = supabase.storage
              .from("post-images")
              .getPublicUrl(fileName);
            return publicUrl.publicUrl;
          }),
        );
        uploadedUrls = uploads;
      }

      // Convert uploaded URLs to objects if images are stored as objects
      // Check if existing images are objects or strings
      const imagesAreObjects =
        images.length > 0 &&
        typeof images[0] === "object" &&
        images[0] !== null;
      const updatedImages = imagesAreObjects
        ? [...images, ...uploadedUrls.map((url) => ({ url, type: "image" }))]
        : [...images, ...uploadedUrls];

      const { error } = await supabase
        .from("posts")
        .update({ caption, images: updatedImages })
        .eq("id", post.id);
      if (error) throw error;
      showToast(t("post_updated_success"), "success");
      onUpdated?.({ caption, images: updatedImages });
      setTimeout(() => close(), 400);
    } catch (err) {
      console.error("Update error:", err);
      showToast(t("post_update_failed"), "error");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[20] flex items-center justify-center bg-black/70 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              className="relative w-full max-w-2xl mx-4 rounded-3xl bg-gradient-to-br from-white/95 to-gray-50/90 backdrop-blur-2xl border border-white/30 shadow-[0_8px_40px_rgba(0,0,0,0.15)] flex flex-col max-h-[64vh] overflow-hidden dark:bg-none dark:bg-[#272727]"
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-white/30 bg-white/70 backdrop-blur-md dark:bg-none dark:bg-[#0a0a0a]">
                <h3 className="text-lg font-semibold text-gray-800 tracking-tight">
                  {t("edit_post_title")}
                </h3>
                <button
                  onClick={close}
                  className="text-gray-500 hover:text-red-500 transition-all hover:scale-110 active:scale-95"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="overflow-y-auto px-6 py-5 space-y-6 custom-scrollbar">
                {/* Caption */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("caption_label")}
                  </label>
                  <textarea
                    ref={textareaRef}
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-gray-200 bg-white/90 focus:ring-2 focus:ring-green-400/60 focus:border-green-400/60 p-3 text-gray-800 placeholder:text-gray-400 outline-none transition-all shadow-inner"
                    placeholder={t("caption_placeholder")}
                  />
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("images_count_label")} (
                    {images.length + newImages.length}/{MAX_IMAGES})
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {images.map((img, i) => {
                      // Handle both object format { url, path, type } and string format
                      const imgUrl = typeof img === "string" ? img : img.url;
                      return (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          className="relative group rounded-xl overflow-hidden"
                        >
                          <div className="relative w-full h-28">
                            <Image
                              src={imgUrl}
                              alt="post"
                              fill
                              className="object-cover rounded-xl border border-gray-200 shadow-sm"
                              unoptimized
                            />
                          </div>
                          <button
                            onClick={() => removeExistingImage(img)}
                            className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600"
                          >
                            <FaTimes size={12} />
                          </button>
                        </motion.div>
                      );
                    })}
                    {newImages.map((file, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        className="relative group rounded-xl overflow-hidden"
                      >
                        <div className="relative w-full h-28">
                          <Image
                            src={URL.createObjectURL(file)}
                            alt="new"
                            fill
                            className="object-cover rounded-xl border border-gray-200 shadow-sm"
                            unoptimized
                          />
                        </div>
                        <button
                          onClick={() => removeNewImage(i)}
                          className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600"
                        >
                          <FaTimes size={12} />
                        </button>
                      </motion.div>
                    ))}

                    {images.length + newImages.length < MAX_IMAGES && (
                      <ImageUploadBox
                        onFileChange={handleImageChange}
                        multiple={true}
                        className="w-full h-28 !p-2 bg-white hover:bg-green-50 border-gray-300 hover:border-green-500"
                        icon={
                          <FaPlus size={22} className="mb-1 text-green-600" />
                        }
                        label={t("add_images_btn")}
                        subLabel={null}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 p-4 border-t border-white/30 bg-white/70 backdrop-blur-md dark:bg-none dark:bg-[#0a0a0a]">
                <button
                  onClick={close}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-black bg-gray-50 hover:bg-gray-100 border border-gray-200"
                >
                  {t("cancel_btn")}
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-xl shadow-lg transform transition-transform hover:scale-105 ${
                    saving ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {saving ? t("saving_btn") : t("save_changes_btn")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </>
  );
}
