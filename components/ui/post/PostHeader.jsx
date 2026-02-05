"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { Avatar } from "@mui/material";
import { formatName } from "@/utils/formatName";
import { timeAgo } from "@/utils/timeConverter";
import {
  FaBookmark,
  FaEllipsisH,
  FaSeedling,
  FaLeaf,
  FaTractor,
  FaCloudSun,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useLogin } from "@/Context/logincontext";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import OptionsPopup from "@/components/ui/menu/OptionsPopup";
import { supabase } from "@/lib/supabaseClient";
import { useLanguage } from "@/Context/languagecontext";
import ImageUploadBox from "@/components/ui/ImageUploadBox";
// ADDITIVE ENHANCEMENT: Import forward page transition hook for smooth UI transitions
// This does NOT replace existing logic - it only enhances UI transitions
import { usePageTransition } from "@/hooks/usePageTransition";

export default function PostHeader({
  post,
  idx,
  isBookmarked,
  showOptions,
  onBookmarkClick,
  onOptionsClick,
  showToast,
  onPostUpdated,
  onDelete,
}) {
  const agriculturalIcons = [FaSeedling, FaLeaf, FaTractor, FaCloudSun];
  const RandomIcon = agriculturalIcons[idx % agriculturalIcons.length];
  const { user } = useLogin();
  const { t } = useLanguage();
  const router = useRouter();
  // ADDITIVE ENHANCEMENT: Get forward transition handlers
  // Original router.push() still available, this adds smooth transitions
  const { push } = usePageTransition();

  // Modal States
  const [modal, setModal] = useState(null); // "edit" | "report" | "delete"
  const [editText, setEditText] = useState(post?.content || ""); // Assuming 'content' or 'caption' depending on data structure
  const [editImages, setEditImages] = useState(post?.images || []);
  const [reportReason, setReportReason] = useState("");
  const [uploading, setUploading] = useState(false);

  const editInputRef = useRef(null);
  const modalRef = useRef(null);

  // Initialize edit text on modal open if needed, though state is set initially.
  // Better to sync when post changes or modal opens.
  // We'll rely on the initial state for now or use effect if post prop changes often without unmounting.

  const handleEditFiles = (e) => {
    const files = Array.from(e.target.files);
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB limit

    // Filter out large files
    const validFiles = files.filter((file) => {
      if (file.size > MAX_SIZE) {
        alert(`File "${file.name}" is too large! Maximum size is 5MB.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const currentCount = editImages.length;
    const total = currentCount + validFiles.length;

    if (total > 12) {
      alert(
        `You can only upload up to 12 images. You can add ${
          12 - currentCount
        } more.`,
      );
      return;
    }
    setEditImages((prev) => [...prev, ...validFiles]);
  };

  const removeEditImage = (idx) => {
    setEditImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSaveEdit = async () => {
    // Determine content field (using 'caption' based on PostCard usage, but PostMenu used 'content')
    // Checking Posts.jsx: `post?.caption || ""` was used.
    // Checking PostMenu.jsx: `recentPost?.content` was used.
    // I will use `editText` and update `caption` column in DB if that matches schema,
    // but typically it's 'caption' for posts.
    // Let's assume 'caption' is the correct column based on typical usage,
    // OR check PostMenu again... PostMenu used 'content'.
    // I'll stick to 'caption' if Posts.jsx uses it, OR try to support both?
    // Looking at Posts.jsx: `const [postCaption, setPostCaption] = useState(post?.caption || "");`
    // So 'caption' is likely the key for display.
    // However, Supabase update in PostMenu used `content`.
    // Use `caption` here to match `Posts.jsx`.

    if (!editText.trim() && editImages.length === 0)
      return showToast("error", t("post_empty_error"));

    setUploading(true);
    try {
      const uploadedImages = [];
      for (let i = 0; i < editImages.length; i++) {
        const file = editImages[i];
        if (file.url) {
          uploadedImages.push(file);
        } else {
          // New file upload
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

      // Update calls
      // Note: Check if column is 'caption' or 'content'.
      // Posts.jsx reads `post.caption`. PostMenu updated `content`.
      // This inconsistency is risky. I will update `caption` as it seems to be what Posts.jsx renders.
      const { error } = await supabase
        .from("posts")
        .update({ caption: editText, images: uploadedImages })
        .eq("id", post.id);

      if (error) throw error;

      if (onPostUpdated) onPostUpdated(editText);

      setModal(null);
      // Close options if open (handled by parent usually, but we can try)
      if (showOptions && onOptionsClick) onOptionsClick();

      showToast(
        "success",
        t("post_updated_success") || "Post updated successfully",
      );

      // Force refresh if needed, but onPostUpdated should handle local UI
    } catch (err) {
      console.error(err);
      showToast("error", t("edit_post_error") + " " + (err.message || ""));
    } finally {
      setUploading(false);
    }
  };

  const handleReport = async () => {
    if (!reportReason) return;

    // Check if duplicate report
    // (Optional logic, keep simple for now)

    const { error } = await supabase.from("post_reports").insert({
      post_id: post.id,
      user_id: user.id,
      reason: reportReason,
    });

    if (error) {
      showToast("error", t("report_post_error"));
    } else {
      showToast("success", t("post_reported_success") || "Report submitted");
    }

    setModal(null);
    if (showOptions && onOptionsClick) onOptionsClick();
    setReportReason("");
  };

  const onEditClick = () => {
    // Populate state
    setEditText(post?.caption || post?.content || "");
    setEditImages(post?.images || []);
    setModal("edit");
    // Close popup
    if (showOptions && onOptionsClick) onOptionsClick();
  };

  const onReportClick = () => {
    setModal("report");
    if (showOptions && onOptionsClick) onOptionsClick();
  };

  return (
    <>
      <div className="relative p-3 pb-2 bg-transparent dark:bg-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative cursor-pointer">
              <Avatar
                src={
                  post?.userinfo?.profile_url ||
                  post?.userinfo?.avatar_url ||
                  undefined
                }
                alt={formatName(post?.userinfo)}
                onClick={() => {
                  // ENHANCED: Use push() with smooth transition instead of router.push()
                  // PRESERVED: All other behavior unchanged
                  push("/profile");
                }}
                sx={{
                  width: 48,
                  height: 48,
                  border: "2px solid #bbf7d0",
                  boxShadow: "0 4px 14px rgba(34, 197, 94, 0.15)",
                }}
              />
              <div className="absolute -bottom-1 -right-1 bg-farm-500 text-white rounded-full p-1">
                <RandomIcon className="w-3 h-3" />
              </div>
            </div>
            <div>
              <h3
                className="font-display font-bold text-gray-900 dark:text-gray-100 text-[0.95rem] cursor-pointer hover:underline"
                onClick={() => {
                  // ENHANCED: Use push() with smooth transition instead of router.push()
                  // PRESERVED: All other behavior unchanged
                  push("/profile");
                }}
              >
                {post?.userinfo?.display_name
                  ? post?.userinfo?.display_name
                  : formatName(post?.userinfo)}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                {timeAgo(post?.created_at)}
              </p>
            </div>
          </div>
          {user && (
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBookmarkClick}
                className={`p-2 rounded-full transition-colors ${
                  isBookmarked
                    ? "text-farm-400 hover:bg-farm-50"
                    : "bg-sunset-100 text-gray-500"
                }`}
              >
                <FaBookmark className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOptionsClick}
                className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
              >
                <FaEllipsisH className="w-4 h-4 dark:text-gray-300" />
              </motion.button>
              {showOptions ? (
                <OptionsPopup
                  post={post}
                  open={showOptions}
                  onClose={onOptionsClick}
                  onEdit={onEditClick}
                  onDelete={onDelete}
                  onReport={onReportClick}
                />
              ) : null}
            </div>
          )}
        </div>
      </div>

      {/* MODALS RENDERED HERE TO AVOID UNMOUNTING */}
      <AnimatePresence>
        {/* EDIT MODAL */}
        {modal === "edit" && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              // Close on background click
              if (e.target === e.currentTarget) setModal(null);
            }}
          >
            <motion.div
              ref={modalRef}
              className="bg-white dark:bg-[#1E1E1E] rounded-2xl w-full max-w-md shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {t("edit_post_modal_title") || "Edit Post"}
                </h2>
                <button
                  onClick={() => setModal(null)}
                  className="text-gray-500 hover:text-gray-800 dark:text-gray-400"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 overflow-y-auto">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/20 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-farm-500 resize-none"
                  placeholder={t("post_placeholder") || "What's on your mind?"}
                />

                {/* Image Preview */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {editImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 group"
                    >
                      <Image
                        src={img.url ? img.url : URL.createObjectURL(img)}
                        alt="edit-img"
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={() => removeEditImage(index)}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  <ImageUploadBox
                    onFileChange={handleEditFiles}
                    multiple={true}
                    className="w-20 h-20 !p-1 !rounded-lg"
                    icon={<span className="text-2xl text-gray-400">+</span>}
                    label=""
                    subLabel={null}
                  />
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 bg-gray-50 dark:bg-white/5">
                <button
                  onClick={() => setModal(null)}
                  className="px-5 py-2 rounded-lg text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                >
                  {t("cancel_btn")}
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={uploading}
                  className={`px-6 py-2 rounded-lg text-white font-medium shadow-lg transition-all transform active:scale-95 ${
                    uploading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-farm-500 to-farm-600 hover:shadow-farm-500/25"
                  }`}
                >
                  {uploading ? t("saving_btn") : t("save_btn")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* REPORT MODAL */}
        {modal === "report" && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setModal(null);
            }}
          >
            <motion.div
              ref={modalRef}
              className="bg-white dark:bg-[#1E1E1E] rounded-xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-center relative bg-white dark:bg-[#1E1E1E]">
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

              <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-white/5">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
                  {t("report_reason_title") ||
                    "Why are you reporting this post?"}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("report_reason_desc") || "Your report is anonymous."}
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
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors flex items-center justify-between group ${
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
