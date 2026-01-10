"use client";
import { useState } from "react";
import Image from "next/image";
import { FaBoxOpen, FaUpload, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/Context/languagecontext";

export default function PostSellAd({ refreshPosts }) {
  const [showForm, setShowForm] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const { t } = useLanguage();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePostAd = () => {
    // Current logic is to just alert coming soon, or could be implemented.
    // Based on original code it likely did nothing or showed an alert.
    alert(t("post_ad_coming_soon"));
    setShowForm(false);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      {!showForm ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <FaBoxOpen className="text-green-600 text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{t("post_ad_title")}</h3>
              <p className="text-xs text-gray-500">{t("post_ad_main_btn")}</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition"
          >
            {t("post_ad_main_btn")}
          </button>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="font-bold text-gray-700">{t("post_ad_title")}</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-red-500"
              >
                <FaTimes />
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder={t("product_title_placeholder")}
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="flex gap-2">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-1/2 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600"
                >
                  <option value="">{t("select_category")}</option>
                  <option value="seeds">Seeds</option>
                  <option value="fertilizers">Fertilizers</option>
                  <option value="equipment">Equipment</option>
                  <option value="produce">Produce</option>
                </select>
                <input
                  type="number"
                  placeholder={t("price_placeholder")}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-1/2 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <textarea
                placeholder={t("description_placeholder")}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={3}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 relative">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
                {image ? (
                  <div className="relative h-32 w-full">
                    <Image
                      src={URL.createObjectURL(image)}
                      alt="preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="text-gray-400">
                    <FaUpload className="mx-auto text-2xl mb-1" />
                    <span className="text-sm">{t("upload_product_image")}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-semibold"
                >
                  {t("cancel_btn")}
                </button>
                <button
                  onClick={handlePostAd}
                  className="flex-1 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold shadow"
                >
                  {t("post_ad_main_btn")}
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
