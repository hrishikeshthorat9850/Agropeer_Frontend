"use client";
import { useState, useEffect, Suspense } from "react";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "@/components/LoadingSpinner";

// Lazy load RichTextEditor - heavy editor component, browser-only
const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 border rounded-xl flex items-center justify-center bg-gray-50">
      <LoadingSpinner />
    </div>
  ),
});

export default function StoryFormModal({ open, onClose, story }) {
  const router = useRouter();
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [contentHTML, setContentHTML] = useState("");

  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.lockScrollY = scrollY;
    } else {
      const scrollY = document.body.dataset.lockScrollY || 0;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      window.scrollTo(0, parseInt(scrollY));
      delete document.body.dataset.lockScrollY;
    }

    // Cleanup on unmount
    return () => {
      const scrollY = document.body.dataset.lockScrollY || 0;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      window.scrollTo(0, parseInt(scrollY));
      delete document.body.dataset.lockScrollY;
    };
  }, [open]);

  useEffect(() => {
    if (story) {
      setAuthor(story.author);
      setTitle(story.title);
      setContentHTML(story.contentHTML);
    } else {
      setAuthor("");
      setTitle("");
      setContentHTML("");
    }
  }, [story]);

  const handleSubmit = () => {
    if (!author || !title || !contentHTML) return alert("Please fill all fields!");
    const newStory = {
      id: story?.id || Date.now(),
      author,
      title,
      contentHTML,
      createdAt: story?.createdAt || new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem("farmer_stories") || "[]");
    const updatedStories = story
      ? existing.map((s) => (s.id === story.id ? newStory : s))
      : [newStory, ...existing];

    localStorage.setItem("farmer_stories", JSON.stringify(updatedStories));
    onClose();
    router.push("/farmer-story");
  };

  // Stagger container variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  // Field animation variants
  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 top-0 flex justify-center py-1 px-2 overflow-y-auto"
          style={{
            top: typeof window !== "undefined" && window.innerWidth < 768 ? "60px" : undefined,
            bottom: typeof window !== "undefined" && window.innerWidth < 768 ? "85px" : undefined,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 max-w-2xl w-full bg-white rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[90vh] dark:bg-[#272727]"
            initial={{ y: -50, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -50, scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-green-800">{story ? "Edit Story" : "Add Story"}</h2>
              <button onClick={onClose} className="p-2 rounded-full text-farm-600 hover:text-farm-900 hover:bg-gray-100">
                <FaTimes />
              </button>
            </div>

            <motion.div
              className="flex flex-col gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fieldVariants} className="flex flex-col">
                <label className="text-green-900 font-medium text-sm mb-1 dark:text-gray-200">Author Name</label>
                <input
                  className="p-3 border rounded-xl shadow-sm focus:ring-2 text-green-700 focus:ring-green-400"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </motion.div>

              <motion.div variants={fieldVariants} className="flex flex-col">
                <label className="text-green-900 font-medium text-sm mb-1 dark:text-gray-200">Story Title</label>
                <input
                  className="p-3 border rounded-xl shadow-sm focus:ring-2 text-green-700 focus:ring-green-400"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </motion.div>

              <motion.div variants={fieldVariants} className="flex flex-col">
                <label className="text-green-900 font-medium text-sm mb-1 dark:text-gray-200">Story Description</label>
                <Suspense
                  fallback={
                    <div className="w-full h-64 border rounded-xl flex items-center justify-center bg-gray-50">
                      <LoadingSpinner />
                    </div>
                  }
                >
                  <RichTextEditor
                    value={contentHTML}
                    onChange={setContentHTML}
                    placeholder="Write your story..."
                  />
                </Suspense>
              </motion.div>

              <motion.div variants={fieldVariants} className="flex gap-3 mt-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 rounded-xl text-black bg-gray-50 hover:bg-gray-100 border border-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-xl shadow-lg transform transition-transform hover:scale-105"
                >
                  {story ? "Update Story" : "Submit Story"}
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
