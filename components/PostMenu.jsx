import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrashAlt, FaFlag } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";
import { useLanguage } from "@/Context/languagecontext";

export default function PostMenu({
  recentPost,
  user,
  setRecentPost,
  menuOpen,
  setMenuOpen,
}) {
  const [modal, setModal] = useState(null);
  const [editText, setEditText] = useState(recentPost?.content || "");
  const [reportReason, setReportReason] = useState("");
  const [uploading, setUploading] = useState(false);
  const [editImages, setEditImages] = useState(recentPost?.images || []);
  const editInputRef = useRef();
  const menuRef = useRef(null);
  const modalRef = useRef(null);
  const { t } = useLanguage();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      // If a modal is open, do NOT close the menu (avoids unmounting the modal)
      if (modal) return;

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest(".ellipsis-btn")
      ) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen, setMenuOpen]);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutsideModal(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModal(null);
      }
    }

    if (modal) document.addEventListener("mousedown", handleClickOutsideModal);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideModal);
  }, [modal]);

  // Add selected files
  const handleEditFiles = (e) => {
    const files = Array.from(e.target.files);
    const currentCount = editImages.length;
    const total = currentCount + files.length;

    if (total > 12) {
      alert(
        `You can only upload up to 12 images. You can add ${
          12 - currentCount
        } more.`,
      );
      return;
    }
    setEditImages((prev) => [...prev, ...files]);
  };

  // Remove image at index
  const removeEditImage = (idx) => {
    setEditImages((prev) => prev.filter((_, i) => i !== idx));
  };

  // Edit post handler
  const handleEdit = async () => {
    if (!editText.trim() && editImages.length === 0)
      return alert(t("post_empty_error"));

    setUploading(true);
    try {
      const uploadedImages = [];
      for (let i = 0; i < editImages.length; i++) {
        const file = editImages[i];
        if (file.url) {
          uploadedImages.push(file);
        } else {
          const ext = file.name.split(".").pop();
          const fileName = `${user.id}/${Date.now()}_${i}.${ext}`;
          const { data, error: upError } = await supabase.storage
            .from("post_images")
            .upload(fileName, file, { cacheControl: "3600", upsert: false });
          if (upError) throw upError;
          const publicUrl = supabase.storage
            .from("post_images")
            .getPublicUrl(data.path).data.publicUrl;
          uploadedImages.push({ url: publicUrl, path: data.path });
        }
      }

      const { error } = await supabase
        .from("posts")
        .update({ content: editText, images: uploadedImages })
        .eq("id", recentPost.id);

      if (error) throw error;

      setRecentPost((prev) => ({
        ...prev,
        content: editText,
        images: uploadedImages,
      }));
      setModal(null);
      setMenuOpen(false);
    } catch (err) {
      console.error(err);
      alert(t("edit_post_error") + " " + (err.message || JSON.stringify(err)));
    } finally {
      setUploading(false);
    }
  };

  // Delete post handler
  const handleDelete = async () => {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", recentPost.id);
    if (error) return alert(t("delete_post_error"));
    setRecentPost(null);
    setModal(null);
    setMenuOpen(false);
    alert(t("post_deleted_success"));
  };

  // Report post handler
  const handleReport = async () => {
    if (!reportReason.trim()) return alert(t("report_reason_required"));
    const { error } = await supabase.from("post_reports").insert({
      post_id: recentPost.id,
      user_id: user.id,
      reason: reportReason,
    });
    if (error) return alert(t("report_post_error"));
    setModal(null);
    setMenuOpen(false);
    setReportReason("");
    alert(t("post_reported_success"));
  };

  return (
    <>
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute right-4 top-12 w-44 bg-white border rounded-xl shadow-lg z-30"
        >
          {recentPost.userinfo.id === user.id ? (
            <>
              <button
                onClick={() => setModal("edit")}
                className="w-full text-left px-3 py-2 hover:bg-farm-50 flex items-center gap-2 text-green-900"
              >
                <FaEdit /> {t("edit_menu")}
              </button>
              <button
                onClick={() => setModal("delete")}
                className="w-full text-left px-3 py-2 hover:bg-farm-50 flex items-center gap-2 text-red-600"
              >
                <FaTrashAlt /> {t("delete_menu")}
              </button>
            </>
          ) : (
            <button
              onClick={() => setModal("report")}
              className="w-full text-left px-3 py-2 hover:bg-farm-50 flex items-center gap-2 text-yellow-700"
            >
              <FaFlag /> {t("report_menu")}
            </button>
          )}
        </div>
      )}

      {/* MODALS */}
      <AnimatePresence>
        {modal === "edit" && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className="bg-white rounded-2xl p-6 w-11/12 max-w-md shadow-xl max-h-[80vh] overflow-y-auto mt-28"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-lg text-green-900 font-semibold mb-4">
                {t("edit_post_modal_title")}
              </h2>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full h-32 p-3 border border-green-400 text-green-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-farm-600"
              />

              {/* ✅ Image Preview Section (Next.js <Image> used here) */}
              <div className="flex flex-wrap gap-2 mt-3">
                {editImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-24 h-24 rounded overflow-hidden"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={img.url ? img.url : URL.createObjectURL(img)}
                        alt="edit-img"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <button
                      onClick={() => removeEditImage(idx)}
                      className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => editInputRef.current.click()}
                  className="w-24 h-24 flex flex-col items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-lime-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <span className="text-2xl mb-1">+</span>
                  <span className="text-sm">{t("add_img_btn")}</span>
                </button>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={editInputRef}
                  className="hidden"
                  onChange={handleEditFiles}
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setModal(null)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-white hover:bg-red-600 font-semibold text-sm sm:text-base"
                >
                  {t("cancel_btn")}
                </button>
                <button
                  onClick={handleEdit}
                  disabled={uploading}
                  className={`px-4 py-2 rounded-lg text-white ${
                    uploading
                      ? "bg-green-300 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {uploading ? t("saving_btn") : t("save_btn")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {modal === "delete" && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className="bg-white rounded-2xl p-6 w-11/12 max-w-sm shadow-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-lg text-red-500 font-semibold mb-4">
                {t("delete_post_modal_title")}
              </h2>
              <p className="text-gray-700 mb-4">
                {t("delete_confirmation_desc")}
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setModal(null)}
                  className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600"
                >
                  {t("cancel_btn")}
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                >
                  {t("delete_menu")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {modal === "report" && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className="bg-white dark:bg-[#1E1E1E] rounded-xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-center relative">
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  {t("report_menu")}
                </h2>
                <button
                  onClick={() => setModal(null)}
                  className="absolute right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
                  {t("report_reason_title") ||
                    "Why are you reporting this post?"}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("report_reason_desc") ||
                    "Your report is anonymous. If someone is in immediate danger, call the local emergency services - don't wait."}
                </p>
              </div>

              <div className="overflow-y-auto flex-1 p-2">
                {[
                  "It's spam",
                  "Nudity or sexual activity",
                  "Hate speech or symbols",
                  "Violence or dangerous organizations",
                  "Sale of illegal or regulated goods",
                  "Bullying or harassment",
                  "Intellectual property violation",
                  "Suicide or self-injury",
                  "Eating disorders",
                  "Scam or fraud",
                  "False information",
                ].map((reason) => (
                  <button
                    key={reason}
                    onClick={() => setReportReason(reason)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors flex items-center justify-between ${
                      reportReason === reason
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-semibold"
                        : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5"
                    }`}
                  >
                    {t(reason) || reason}
                    {reportReason === reason && (
                      <span className="text-blue-500 text-lg">✓</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={handleReport}
                  disabled={!reportReason}
                  className={`w-full py-3 rounded-full font-semibold text-sm transition-all ${
                    reportReason
                      ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed"
                  }`}
                >
                  {t("btn_submit_report") || "Submit Report"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
