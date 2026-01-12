"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import RecentPost from "./ui/RecentPost";
import { formatName } from "@/utils/formatName";
import {
  FaImage,
  FaVideo,
  FaMapMarkerAlt,
  FaSmile,
  FaPaperPlane,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { useLogin } from "@/Context/logincontext";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import useToast from "@/hooks/useToast";
import { useLanguage } from "@/Context/languagecontext";

export default function PostCreation({ onSuccess }) {
  const { user } = useLogin();
  const { showToast } = useToast();
  const photoinputRef = useRef();
  const videoinputRef = useRef();
  const [isExpanded, setIsExpanded] = useState(false);
  const [postText, setPostText] = useState("");

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [recentPost, setRecentPost] = useState({});
  const { t } = useLanguage();

  const userRecentPost = async () => {
    // Optimized: select specific fields to reduce egress
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
      id,
      user_id,
      caption,
      images,
      created_at,
      updated_at,
      userinfo(id, firstName, lastName, display_name, profile_url, avatar_url),
      post_comments(id, comment, created_at, user_id, post_id),
      post_likes(id, user_id, post_id, created_at)
    `
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (!error) setRecentPost(data);
  };

  useEffect(() => {
    fetchPosts();
    userRecentPost();
  }, [user?.id]);

  const fetchPosts = async () => {
    // Optimized: select specific fields to reduce egress
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        id,
        user_id,
        caption,
        images,
        created_at,
        updated_at,
        userinfo(id, firstName, lastName, display_name, profile_url, avatar_url),
        post_comments(id, comment, created_at, user_id, post_id),
        post_likes(id, user_id, post_id, created_at)
      `
      )
      .order("created_at", { ascending: false })
      .limit(50); // Add limit to reduce egress

    if (!error) setPosts(data);
  };

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files || []).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith("video/") ? "video" : "image",
    }));

    const total = [...files, ...selected];
    if (total.length > 12) {
      setAlertMessage(t("upload_limit_error"));
      setShowAlert(true);
      showToast("error", t("upload_limit_error"));
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    setFiles(total);
    setPreviews(total);
  };
  const removeImage = (idx) => {
    setFiles((f) => f.filter((_, i) => i !== idx));
    setPreviews((p) => p.filter((_, i) => i !== idx));
  };

  const uploadAndCreatePost = async () => {
    if (!user) {
      showToast("error", t("login_required_post"));
      return;
    }
    if (!files.length && !postText.trim()) {
      showToast("error", t("add_image_text_error"));
      return;
    }

    setUploading(true);
    try {
      const uploadedFiles = [];
      for (let i = 0; i < files.length; i++) {
        const fileObj = files[i];
        const file = fileObj.file;
        const ext = file.name.split(".").pop();
        const fileName = `${user.id}/${Date.now()}_${i}_${uuidv4()}.${ext}`;

        const { data: uploadData, error: upError } = await supabase.storage
          .from("post_images")
          .upload(fileName, file, { cacheControl: "3600", upsert: false });

        if (upError) throw upError;

        const publicUrl = supabase.storage
          .from("post_images")
          .getPublicUrl(uploadData.path).data.publicUrl;
        uploadedFiles.push({
          url: publicUrl,
          path: uploadData.path,
          type: fileObj.type,
        });
      }
      const { data: inserted } = await supabase
        .from("posts")
        .insert([
          {
            user_id: user.id,
            caption: postText || null,
            images: uploadedFiles,
          },
        ])
        .select()
        .single();

      // Optimized: select specific fields to reduce egress
      const { data: newPostWithRelations } = await supabase
        .from("posts")
        .select(
          `
          id,
          user_id,
          caption,
          images,
          created_at,
          updated_at,
          userinfo(id, firstName, lastName, display_name, profile_url, avatar_url),
          post_comments(id, comment, created_at, user_id, post_id),
          post_likes(id, user_id, post_id, created_at)
        `
        )
        .eq("id", inserted.id)
        .single();

      const finalPost = newPostWithRelations || inserted;
      const prepared = {
        ...finalPost,
        images: finalPost.images || uploadedFiles,
        userinfo: finalPost.userinfo || {
          id: user.id,
          firstName: user.name || "You",
          lastName: "",
          profile_url: user.avatar || null,
        },
        post_comments: finalPost.post_comments || [],
        post_likes: finalPost.post_likes || [],
        created_at: finalPost.created_at || new Date().toISOString(),
      };

      setPosts((prev) => [prepared, ...prev]);
      setFiles([]);
      setPreviews([]);
      setPostText("");
      setCurrentIndex(0);
      setMenuOpen(false);
      setLiked(false);
      showToast("success", t("post_created_success_toast"));
      if (onSuccess) onSuccess(prepared);
    } catch (err) {
      console.error(err);
      showToast(
        "error",
        t("post_create_error_toast") +
        " " +
        (err.message || "Please try again.")
      );
    } finally {
      setUploading(false);
    }
  };

  // const handleLikeClick = async (postId) => {
  //   if (!user) return alert("Please login to like posts.");
  //   const { data: existing } = await supabase
  //     .from("post_likes")
  //     .select("*")
  //     .eq("post_id", postId)
  //     .eq("user_id", user.id)
  //     .maybeSingle();

  //   if (existing) {
  //     await supabase.from("post_likes").delete().eq("id", existing.id);
  //     setLiked(false);
  //     setPosts((prev) => ({
  //       ...prev,
  //       post_likes: prev.post_likes.filter((l) => l.user_id !== user.id),
  //     }));
  //   } else {
  //     await supabase.from("post_likes").insert([{ post_id: postId, user_id: user.id }]);
  //     setLiked(true);
  //     setPosts((prev) => ({
  //       ...prev,
  //       post_likes: [...(prev.post_likes || []), { user_id: user.id }],
  //     }));
  //   }
  // };

  const handleLikeClick = async (postId) => {
    if (!user) {
      showToast("error", t("login_required_toast"));
      return;
    }

    const post = posts.find((p) => p.id === postId);
    const hasLiked = post?.post_likes?.some((like) => like.user_id === user.id);

    // Optimistic UI update
    const updatedLikes = hasLiked
      ? post.post_likes.filter((l) => l.user_id !== user.id)
      : [...(post.post_likes || []), { user_id: user.id }];

    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === postId ? { ...p, post_likes: updatedLikes } : p
      )
    );

    try {
      if (hasLiked) {
        // Remove like
        const { error } = await supabase
          .from("post_likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);
        if (error) throw error;
      } else {
        // Add like (upsert avoids duplicates)
        const { error } = await supabase
          .from("post_likes")
          .upsert([{ post_id: postId, user_id: user.id }], {
            onConflict: "post_id,user_id",
          });
        if (error) throw error;
      }
    } catch (err) {
      console.error("Error updating like:", err);
      // Rollback UI
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p.id === postId ? post : p))
      );
    }
  };

  const toggleLike = async (postId) => {
    if (!user) {
      showToast("error", t("login_required_toast"));
      return;
    }
    const { data: existing } = await supabase
      .from("post_likes")
      .select("*")
      .eq("post_id", postId)
      .eq("user_id", user.id)
      .maybeSingle();
    if (existing)
      await supabase.from("post_likes").delete().eq("id", existing.id);
    else
      await supabase
        .from("post_likes")
        .insert([{ post_id: postId, user_id: user.id }]);
    const { data: updated } = await supabase
      .from("post_likes")
      .select("*")
      .eq("post_id", postId);
    setLiked(!existing);
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, post_likes: updated || [] } : p
      )
    );
  };

  const addComment = async (postId, text) => {
    if (!user || !text.trim()) return;

    try {
      const { data: inserted, error } = await supabase
        .from("post_comments")
        .insert([{ post_id: postId, user_id: user.id, comment: text }])
        .select()
        .single();

      if (error) throw error;

      // Update posts state
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? { ...p, post_comments: [...(p.post_comments || []), inserted] }
            : p
        )
      );

      // Update recentPost if needed
      if (recentPost.id === postId) {
        setRecentPost((prev) => ({
          ...prev,
          post_comments: [...(prev.post_comments || []), inserted],
        }));
      }

      setCommentText("");
      showToast("success", t("add_comment_success"));
    } catch (err) {
      console.error("Failed to add comment:", err);
      showToast(
        "error",
        t("add_comment_failed") + " " + (err.message || "Please try again.")
      );
    }
  };

  // const formatDate = (iso) => { try { return new Date(iso).toLocaleString(); } catch { return ""; } };
  // const previewImages = previews.map(i => i.preview);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto mb-6 sm:px-4 md:px-3"
    >
      <div className="relative">
        {/* Main Post Card */}
        <motion.div
          layout
          className="farm-card p-4 sm:p-6 relative overflow-hidden rounded-2xl bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-[#333]"
        >
          {/* Background Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-10 -right-10 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-farm-200/30 to-farm-300/30 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-5 -left-5 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-sunset-200/30 to-sunset-300/30 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-1/4 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-sky-200/30 to-sky-300/30 rounded-full animate-bounce"></div>
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 flex-wrap">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-farm-400 to-farm-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-base sm:text-lg">
                    U
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-[60%]">
                <h3 className="text-base sm:text-lg font-bold text-farm-900 dark:text-white leading-tight">
                  {t("share_story_title")}
                </h3>
                <p className="text-xs sm:text-sm text-farm-600 dark:text-gray-400">
                  {t("happening_on_farm_subtitle")}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 sm:p-2 rounded-full bg-farm-100 hover:bg-farm-200 transition-colors"
              >
                {isExpanded ? (
                  <FaTimes className="w-4 h-4 text-farm-600 dark:text-gray-300" />
                ) : (
                  <FaPlus className="w-4 h-4 text-farm-600 dark:text-gray-300" />
                )}
              </motion.button>
            </div>

            {/* Textarea Section */}
            <motion.div
              initial={false}
              animate={{ height: isExpanded ? "auto" : "55px" }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="relative">
                <textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder={t("post_placeholder")}
                  className="w-full p-3 sm:p-4 pr-10 rounded-2xl border-0 resize-none focus:outline-none text-farm-800 dark:text-white placeholder-farm-500 dark:placeholder-gray-500 transition-all duration-300 text-sm sm:text-base bg-gray-50 dark:bg-[#2C2C2C] dark:border-[#444]"
                  rows={isExpanded ? 4 : 1}
                  onFocus={() => setIsExpanded(true)}
                />
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <FaSmile className="w-4 h-4 sm:w-5 sm:h-5 text-farm-400" />
                </div>
              </div>

              {/* Expanded Options */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 space-y-4"
                  >
                    {/* Upload Buttons */}
                    <div className="flex flex-wrap gap-3 justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="p-2 sm:p-3 rounded-xl bg-sky-100 dark:bg-sky-900/30 hover:bg-sky-200 dark:hover:bg-sky-900/50"
                          onClick={() => photoinputRef.current?.click()}
                        >
                          <FaImage className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 dark:text-sky-400" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="p-2 sm:p-3 rounded-xl bg-sunset-100 dark:bg-orange-900/30 hover:bg-sunset-200 dark:hover:bg-orange-900/50"
                          onClick={() => videoinputRef.current?.click()}
                        >
                          <FaVideo className="w-4 h-4 sm:w-5 sm:h-5 text-sunset-600 dark:text-orange-400" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="p-2 sm:p-3 rounded-xl bg-farm-100 dark:bg-emerald-900/30 hover:bg-farm-200 dark:hover:bg-emerald-900/50"
                        >
                          <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5 text-farm-600 dark:text-emerald-400" />
                        </motion.button>
                        <input
                          ref={photoinputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleFiles}
                        />
                        <input
                          ref={videoinputRef}
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={handleFiles}
                        />
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={uploadAndCreatePost}
                          disabled={
                            (!postText.trim() && files.length === 0) ||
                            uploading
                          }
                          className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-farm-500 to-farm-600 text-white rounded-xl font-semibold shadow-lg text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {uploading ? (
                            t("posting_btn")
                          ) : (
                            <>
                              <FaPaperPlane /> {t("post_btn")}
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>

                    {/* Preview Images */}
                    {previews.length > 0 && (
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {previews.map((item, idx) => (
                          <div
                            key={idx}
                            className="relative rounded overflow-hidden group"
                          >
                            {item.type === "image" ? (
                              <div className="relative w-full h-28">
                                <Image
                                  src={item.preview}
                                  alt={`preview-${idx}`}
                                  fill
                                  className="object-cover rounded"
                                  unoptimized
                                />
                              </div>
                            ) : (
                              <video
                                src={item.preview}
                                controls
                                className="object-cover w-full h-28"
                              />
                            )}
                            <button
                              onClick={() => removeImage(idx)}
                              className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Collapsed State */}
            {!isExpanded && (
              <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
                <div className="flex items-center gap-2 sm:gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/30 hover:bg-sky-200 dark:hover:bg-sky-900/50 text-sky-700 dark:text-sky-300 text-sm sm:text-base font-medium"
                    onClick={() => photoinputRef.current.click()}
                  >
                    <FaImage className="w-4 h-4" /> {t("photo_btn")}
                  </motion.button>
                  <input
                    ref={photoinputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFiles}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-sunset-100 dark:bg-orange-900/30 hover:bg-sunset-200 dark:hover:bg-orange-900/50 text-sunset-700 dark:text-orange-300 text-sm sm:text-base font-medium"
                    onClick={() => videoinputRef.current.click()}
                  >
                    <FaVideo className="w-4 h-4" /> {t("video_btn")}
                  </motion.button>
                  <input
                    ref={videoinputRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFiles}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={uploadAndCreatePost}
                  disabled={
                    (!postText.trim() && files.length === 0) || uploading
                  }
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-farm-500 to-farm-600 text-white rounded-xl font-semibold shadow-lg text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {uploading ? (
                    t("posting_btn")
                  ) : (
                    <>
                      <FaPaperPlane /> {t("post_btn")}
                    </>
                  )}
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      {recentPost && recentPost.id && (
        <RecentPost
          post={recentPost}
          user={user}
          onLike={handleLikeClick}
          onAddComment={addComment}
          formatName={formatName}
        />
      )}
    </motion.section>
  );
}
