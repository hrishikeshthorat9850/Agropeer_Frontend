"use client";
import { useState } from "react";

const categories = [
  "Cattle",
  "Goat",
  "Machinery",
  "Crops",
  "Seeds",
  "Fertilizer",
  "Other",
];

export default function ProductSellAd() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="w-full max-w-lg mx-auto mb-8 p-6 bg-green-100 rounded-xl shadow flex flex-col gap-4 items-center">
      <h3 className="text-xl font-bold text-green-800 mb-2 text-center">Post a Product for Sale</h3>
      {!showForm ? (
        <button
          className="w-full bg-green-700 text-white py-3 rounded-full font-semibold shadow hover:bg-green-800 transition-colors text-lg"
          onClick={() => setShowForm(true)}
        >
          Post Your Ad
        </button>
      ) : (
        <form className="w-full flex flex-col gap-4 mt-2">
          <input
            type="text"
            placeholder="Product Title"
            className="w-full px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-900 placeholder-green-400 bg-white"
            disabled
          />
          <textarea
            placeholder="Description"
            className="w-full px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-900 placeholder-green-400 bg-white resize-none"
            rows={3}
            disabled
          />
          <select
            className="w-full px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-900 bg-white"
            disabled
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Price (₹)"
            className="w-full px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-900 placeholder-green-400 bg-white"
            disabled
          />
          <div className="flex flex-col items-center gap-2">
            <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-green-700 rounded-lg shadow tracking-wide uppercase border border-green-300 cursor-pointer hover:bg-green-50">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m5 8v-4a2 2 0 00-2-2H7a2 2 0 00-2 2v4m0 0a2 2 0 002 2h6a2 2 0 002-2z" />
              </svg>
              <span className="mt-2 text-base leading-normal">Upload Product Image</span>
              <input type="file" className="hidden" disabled />
            </label>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="w-full bg-green-700 text-white py-2 rounded-full font-semibold shadow hover:bg-green-800 transition-colors cursor-not-allowed"
              disabled
            >
              Post Ad (Coming Soon)
            </button>
            <button
              type="button"
              className="w-full bg-gray-200 text-green-800 py-2 rounded-full font-semibold shadow hover:bg-gray-300 transition-colors"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 