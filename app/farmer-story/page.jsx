"use client";
import { useEffect, useState, Suspense } from "react";
import { FaEye, FaEdit, FaTrash, FaPlus, FaBookReader } from "react-icons/fa";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/LoadingSpinner";

// Lazy load StoryFormModal - only shown when user clicks "Add Story"
const StoryFormModal = dynamic(() => import("@/components/StoryFormModal"), {
  loading: () => null, // Modal handles its own loading state
});

function formatDateTime(ts) {
  const d = new Date(ts);
  const dd = String(d.getDate()).padStart(2,"0");
  const mm = String(d.getMonth()+1).padStart(2,"0");
  const yy = String(d.getFullYear()).slice(-2);
  const hh = String(d.getHours()).padStart(2,"0");
  const mi = String(d.getMinutes()).padStart(2,"0");
  const ss = String(d.getSeconds()).padStart(2,"0");
  return { date: `${dd}/${mm}/${yy}`, time: `${hh}:${mi}:${ss}` };
}

export default function FarmerStoryPage() {
  const [stories, setStories] = useState([]);
  const [view, setView] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editStory, setEditStory] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("farmer_stories");
    const arr = raw ? JSON.parse(raw) : [];
    setStories(arr);
  }, []);

  const openStory = (s) => setView(s);
  const closeView = () => setView(null);

  const openForm = (s=null) => {
    setEditStory(s);
    setShowForm(true);
  };
  const closeForm = () => {
    setEditStory(null);
    setShowForm(false);
    const raw = localStorage.getItem("farmer_stories");
    setStories(raw ? JSON.parse(raw) : []);
  };

  const handleDelete = (id) => {
    if(!confirm("Are you sure you want to delete this story?")) return;
    const updated = stories.filter(s => s.id !== id);
    localStorage.setItem("farmer_stories", JSON.stringify(updated));
    setStories(updated);
  };

  const truncate = (html, len=120) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || "";
    if (text.length <= len) return text;
    return text.slice(0, len).trim() + "...";
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <div className="flex items-center gap-2">
          <FaBookReader className="text-green-600 text-xl sm:text-2xl" />
          <h1 className="text-2xl sm:text-3xl font-bold text-green-800">Farmer Success Stories</h1>
        </div>
        <button
          onClick={() => openForm()}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white px-4 sm:px-5 py-2 rounded-xl shadow-lg transform transition-transform hover:scale-105 w-full sm:w-auto justify-center"
        >
          <FaPlus className="text-sm sm:text-base" /> Add Story
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl p-4 border shadow-2xl overflow-x-auto dark:bg-[#272727] dark:border-white/20">
        <table className="w-full table-auto border-collapse border border-gray-200 rounded-xl">
          <thead className="bg-green-50 rounded-t-xl">
            <tr className="text-left text-sm text-gray-600 border-b border-gray-200 dark:bg-[#0a0a0a]">
              <th className="py-3 px-2 w-12">#</th>
              <th className="py-3 px-2">Story Title</th>
              <th className="py-3 px-2">Description</th>
              <th className="py-3 px-2">Author</th>
              <th className="py-3 px-2 w-36">Action</th>
            </tr>
          </thead>
          <tbody>
            {stories.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500">No stories yet — add from Explore page.</td>
              </tr>
            )}
            {stories.map((s, idx) => (
              <tr
                key={s.id}
                className="border-b border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors dark:hover:bg-[#1E1E1E]"
              >
                <td className="py-3 px-2 align-middle">{idx+1}</td>
                <td className="py-3 px-2 font-medium">{s.title}</td>
                <td className="py-3 px-2 text-sm text-gray-700">{truncate(s.contentHTML, 120)}</td>
                <td className="py-3 px-2 text-sm text-gray-700">{s.author}</td>
                <td className="py-3 px-2 flex gap-2">
                  <button className="p-2 rounded-md hover:bg-green-100 transition transform hover:scale-110" onClick={() => openStory(s)}><FaEye className="text-yellow-700" /></button>
                  <button className="p-2 rounded-md hover:bg-yellow-100 transition transform hover:scale-110" onClick={() => openForm(s)}><FaEdit className="text-green-700" /></button>
                  <button className="p-2 rounded-md hover:bg-red-100 transition transform hover:scale-110" onClick={() => handleDelete(s.id)}><FaTrash className="text-red-700"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Story Modal */}
      {view && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeView} />

          {/* Modal */}
          <div className="relative z-10 max-w-3xl w-full bg-white rounded-2xl shadow-xl animate-slide-down max-h-[90vh] overflow-y-auto border border-green-100 dark:bg-[#272727] dark:border-gray-600">

            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b dark:border-gray-700">
              <div className="flex items-center gap-2">
                <FaBookReader className="text-green-700 text-2xl" />
                <h2 className="text-xl sm:text-2xl font-bold text-green-900">
                  {view.title}
                </h2>
              </div>

              {/* ✅ Date & Time inline */}
              <div className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                {(() => {
                  const fmt = formatDateTime(view.createdAt);
                  return `${fmt.date} | ${fmt.time}`;
                })()}
              </div>
            </div>

            {/* Content */}
            <div
              className="px-5 py-4 text-gray-700 prose max-w-none leading-relaxed"
              dangerouslySetInnerHTML={{ __html: view.contentHTML }}
            />

            {/* Footer */}
            <div className="flex justify-between items-center px-5 py-4 border-t bg-gray-50 rounded-b-2xl dark:bg-[#272727] dark:border-gray-700">
              <div className="text-sm font-medium text-gray-700">
                <span className="text-green-700 font-semibold">Author: </span>{view.author}
              </div>
              <button
                onClick={closeView}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition transform hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Story Form Modal */}
      {showForm && (
        <Suspense fallback={null}>
          <StoryFormModal open={showForm} onClose={closeForm} story={editStory} />
        </Suspense>
      )}

      <style jsx>{`
        @keyframes slide-down {
          0% { transform: translateY(-20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-down { animation: slide-down 0.3s ease-out; }
      `}</style>
    </div>
  );
}
