"use client";
import { useState, useEffect } from "react";

export default function PopupForm({ onSave }) {
  const [formData, setFormData] = useState(null); // ✅ initially null
  const [isLoaded, setIsLoaded] = useState(false);

  // ✅ Load saved data (runs only on client after mount)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("popupData");
      if (saved) {
        setFormData(JSON.parse(saved));
      } else {
        // default state
        setFormData({
          title: "",
          desc: "",
          buttonText: "",
          redirectUrl: "",
          bgImage: "",
          titleColor: "#ffffff",
          descColor: "#ffffff",
          buttonColor: "#f97316",
          textPosition: "top-left",
        });
      }
      setIsLoaded(true);
    }
  }, []);

  // ✅ Save data to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded && formData) {
      localStorage.setItem("popupData", JSON.stringify(formData));
    }
  }, [formData, isLoaded]);

  if (!isLoaded || !formData) return null; // prevents flicker or blank overwriting

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("popupData", JSON.stringify(formData));
    if (onSave) onSave(formData);
    alert("✅ Popup settings saved successfully!");
  };

  return (
    <div className="w-full flex justify-center px-4 py-10 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-3xl bg-white shadow-[0_4px_30px_rgba(0,0,0,0.1)] rounded-2xl border border-gray-200 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🎨 Popup Settings
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Background Image */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Background Image URL
            </label>
            <input
              type="text"
              value={formData.bgImage}
              onChange={(e) => handleChange("bgImage", e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-800"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter popup title"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-800"
            />
            <div className="flex items-center gap-3 mt-3">
              <span className="text-sm text-gray-600 font-medium">Title Color</span>
              <input
                type="color"
                value={formData.titleColor}
                onChange={(e) => handleChange("titleColor", e.target.value)}
                className="w-10 h-10 rounded-md cursor-pointer border border-gray-300 shadow-inner"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Description
            </label>
            <textarea
              value={formData.desc}
              onChange={(e) => handleChange("desc", e.target.value)}
              placeholder="Enter popup description..."
              rows={3}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-800 resize-none"
            />
            <div className="flex items-center gap-3 mt-3">
              <span className="text-sm text-gray-600 font-medium">Description Color</span>
              <input
                type="color"
                value={formData.descColor}
                onChange={(e) => handleChange("descColor", e.target.value)}
                className="w-10 h-10 rounded-md cursor-pointer border border-gray-300 shadow-inner"
              />
            </div>
          </div>

          {/* Button Text */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Button Text
            </label>
            <input
              type="text"
              value={formData.buttonText}
              onChange={(e) => handleChange("buttonText", e.target.value)}
              placeholder="Learn More"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-800"
            />
            <div className="flex items-center gap-3 mt-3">
              <span className="text-sm text-gray-600 font-medium">Button Color</span>
              <input
                type="color"
                value={formData.buttonColor}
                onChange={(e) => handleChange("buttonColor", e.target.value)}
                className="w-10 h-10 rounded-md cursor-pointer border border-gray-300 shadow-inner"
              />
            </div>
          </div>

          {/* Redirect URL */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Redirect URL
            </label>
            <input
              type="text"
              value={formData.redirectUrl}
              onChange={(e) => handleChange("redirectUrl", e.target.value)}
              placeholder="https://yourwebsite.com/page"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-800"
            />
          </div>

          {/* Text Position */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Text Position
            </label>
            <select
              value={formData.textPosition}
              onChange={(e) => handleChange("textPosition", e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-800 cursor-pointer"
            >
              <option value="top-left">Top Left</option>
              <option value="top-right">Top Right</option>
              <option value="center">Center</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-right">Bottom Right</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="pt-4 flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              Save Popup
            </button>

            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("popupData");
                setFormData({
                  title: "",
                  desc: "",
                  buttonText: "",
                  redirectUrl: "",
                  bgImage: "",
                  titleColor: "#ffffff",
                  descColor: "#ffffff",
                  buttonColor: "#f97316",
                  textPosition: "top-left",
                });
              }}
              className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-red-600 transition-all duration-300"
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
