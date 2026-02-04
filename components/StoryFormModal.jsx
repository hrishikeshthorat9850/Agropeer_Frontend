"use client";
import { useState, useEffect, Suspense } from "react";
import { useLanguage } from "@/Context/languagecontext";
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
  const { t } = useLanguage();
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
    if (!author || !title || !contentHTML)
      return alert(t("fill_all_fields_alert"));
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
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-[9999] p-1 pt-9 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full h-full flex flex-col overflow-hidden bg-white rounded-3xl shadow-[0_12px_45px_rgba(0,0,0,0.2)] border border-emerald-100 dark:bg-[#1E1E1E] dark:border-[#333]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1E1E1E]">
              <h2 className="text-xl font-bold text-green-800 dark:text-green-500">
                {story ? t("edit_story_title") : t("add_story")}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-farm-600 hover:text-farm-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                <FaTimes />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-[#1E1E1E]">
              <motion.div
                className="flex flex-col gap-4 max-w-3xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={fieldVariants} className="flex flex-col">
                  <label className="text-green-900 font-medium text-sm mb-1 dark:text-gray-200">
                    {t("author_name_label")}
                  </label>
                  <input
                    className="p-3 border rounded-xl shadow-sm focus:ring-2 text-green-700 focus:ring-green-400 dark:bg-[#2C2C2C] dark:border-[#444] dark:text-white"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </motion.div>

                <motion.div variants={fieldVariants} className="flex flex-col">
                  <label className="text-green-900 font-medium text-sm mb-1 dark:text-gray-200">
                    {t("table_story_title")}
                  </label>
                  <input
                    className="p-3 border rounded-xl shadow-sm focus:ring-2 text-green-700 focus:ring-green-400 dark:bg-[#2C2C2C] dark:border-[#444] dark:text-white"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </motion.div>

                <motion.div variants={fieldVariants} className="flex flex-col">
                  <label className="text-green-900 font-medium text-sm mb-1 dark:text-gray-200">
                    {t("story_desc_label")}
                  </label>
                  <Suspense
                    fallback={
                      <div className="w-full h-64 border rounded-xl flex items-center justify-center bg-gray-50 dark:bg-[#2C2C2C] dark:border-[#444]">
                        <LoadingSpinner />
                      </div>
                    }
                  >
                    <div className="bg-white rounded-xl overflow-hidden dark:bg-[#272727]">
                      <RichTextEditor
                        value={contentHTML}
                        onChange={setContentHTML}
                        placeholder={t("story_placeholder")}
                      />
                    </div>
                  </Suspense>
                </motion.div>

                <motion.div
                  variants={fieldVariants}
                  className="flex gap-3 mt-4 mb-4"
                >
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-3 rounded-xl text-black bg-white hover:bg-gray-50 border border-gray-200 dark:bg-[#2C2C2C] dark:text-white dark:border-[#444] dark:hover:bg-[#333]"
                  >
                    {t("btn_cancel")}
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-3 rounded-xl shadow-lg transform transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    {story ? t("update_story_btn") : t("submit_story_btn")}
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
