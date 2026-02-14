"use client";
import { useState, useEffect, Suspense, Fragment } from "react";
import { useLanguage } from "@/Context/languagecontext";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Dialog, Transition } from "@headlessui/react";
import { usePageTransition } from "@/hooks/usePageTransition";
import { useBackPress } from "@/Context/BackHandlerContext";

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
  const { push } = usePageTransition();
  const { t } = useLanguage();

  useEffect(() => {
    if (open) {
      // Lock scroll
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.lockScrollY = scrollY;
    } else {
      // Unlock scroll
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

    // Cleanup (when component unmounts or isOpen changes)
    return () => {
      // Unlock scroll
      const scrollY = document.body.dataset.lockScrollY || "0";
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

  useBackPress(
    () => {
      if (open) {
        onClose();
        return true;
      }
      return false;
    },
    20,
    open,
  );

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [contentHTML, setContentHTML] = useState("");

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
    // ENHANCED: Use push() with smooth transition instead of router.push()
    push("/farmer-story");
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
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end md:items-center justify-center p-0 md:p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-full md:scale-95 md:translate-y-0"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-full md:scale-95 md:translate-y-0"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-t-[2rem] md:rounded-3xl bg-white dark:bg-[#1E1E1E] border-t md:border border-emerald-100 dark:border-[#333] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:shadow-[0_12px_45px_rgba(0,0,0,0.2)] text-left align-middle transition-all flex flex-col h-[85vh] md:h-auto md:max-h-[90vh]">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1E1E1E]">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold text-green-800 dark:text-green-500"
                  >
                    {story ? t("edit_story_title") : t("add_story")}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full text-farm-600 hover:text-farm-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:outline-none"
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-[#1E1E1E]">
                  <motion.div
                    className="flex flex-col gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div
                      variants={fieldVariants}
                      className="flex flex-col"
                    >
                      <label className="text-green-900 font-medium text-sm mb-1 dark:text-gray-200">
                        {t("author_name_label")}
                      </label>
                      <input
                        className="p-3 border rounded-xl shadow-sm focus:ring-2 text-green-700 focus:ring-green-400 dark:bg-[#2C2C2C] dark:border-[#444] dark:text-white outline-none"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                      />
                    </motion.div>

                    <motion.div
                      variants={fieldVariants}
                      className="flex flex-col"
                    >
                      <label className="text-green-900 font-medium text-sm mb-1 dark:text-gray-200">
                        {t("table_story_title")}
                      </label>
                      <input
                        className="p-3 border rounded-xl shadow-sm focus:ring-2 text-green-700 focus:ring-green-400 dark:bg-[#2C2C2C] dark:border-[#444] dark:text-white outline-none"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </motion.div>

                    <motion.div
                      variants={fieldVariants}
                      className="flex flex-col"
                    >
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
