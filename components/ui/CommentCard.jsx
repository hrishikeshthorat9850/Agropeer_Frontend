import { FaLeaf, FaRegHeart, FaEllipsisH } from "react-icons/fa";
import { timeAgo } from "@/utils/timeConverter";
import { formatName } from "@/utils/formatName";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function CommentCard({ comments = [], showAllComments, onLike, onReply, onEdit, onDelete, onReport }) {
  const [activeMenu, setActiveMenu] = useState(null); // track which comment menu is open

  const toggleMenu = (id) => {
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  return (
    <AnimatePresence>
      {comments
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, showAllComments ? comments.length : 2)
        .map((comment, idx) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-start gap-3 py-3 px-4 rounded-2xl hover:scale-[1.02] transition-all duration-300 group/comment relative"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)'
            }}
          >
            {/* User Avatar */}
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg group-hover/comment:scale-110 transition-transform duration-300"
                 style={{
                   background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
                   boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                 }}>
              <FaLeaf className="w-3 h-3 text-white" />
            </div>

            {/* Comment Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-slate-800 text-sm font-semibold">{formatName(comment.userinfo)}</span>
                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                <span className="text-slate-500 text-xs">{timeAgo(comment.created_at)}</span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{comment.comment}</p>

              {/* Comment Actions */}
              <div className="flex items-center gap-4 mt-1 text-xs text-farm-500">
                <button
                  className="flex items-center gap-1 hover:text-red-500 transition"
                  onClick={() => onLike(comment)}
                >
                  <FaRegHeart className="w-3 h-3" /> <span>Like</span>
                </button>

                <button
                  className="hover:text-farm-700 transition"
                  onClick={() => onReply(comment)}
                >
                  Reply
                </button>

                {/* Three-dot menu */}
                <div className="relative ml-auto">
                  <button
                    className="text-farm-400 hover:text-farm-700 transition"
                    onClick={() => toggleMenu(comment.id)}
                  >
                    <FaEllipsisH className="w-3 h-3" />
                  </button>

                  {/* Dropdown menu */}
                  <AnimatePresence>
                    {activeMenu === comment.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50 flex flex-col overflow-hidden"
                      >
                        <button
                          className="px-4 py-2 text-left hover:bg-gray-100 text-sm"
                          onClick={() => { onEdit(comment); setActiveMenu(null); }}
                        >
                          Edit
                        </button>
                        <button
                          className="px-4 py-2 text-left hover:bg-gray-100 text-sm"
                          onClick={() => { onDelete(comment); setActiveMenu(null); }}
                        >
                          Delete
                        </button>
                        <button
                          className="px-4 py-2 text-left hover:bg-gray-100 text-sm"
                          onClick={() => { onReport(comment); setActiveMenu(null); }}
                        >
                          Report
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
    </AnimatePresence>
  );
}
