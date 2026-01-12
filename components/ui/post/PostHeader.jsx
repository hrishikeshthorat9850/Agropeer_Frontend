"use client";
import { Avatar } from "@mui/material";
import { formatName } from "@/utils/formatName";
import { timeAgo } from "@/utils/timeConverter";
import { FaBookmark, FaEllipsisH, FaSeedling, FaLeaf, FaTractor, FaCloudSun } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLogin } from "@/Context/logincontext";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import OptionsPopup from "@/components/ui/menu/OptionsPopup";

export default function PostHeader({
  post,
  idx,
  isBookmarked,
  showOptions,
  onBookmarkClick,
  onOptionsClick,
  showToast,
  onPostUpdated,
  onDelete
}) {
  const agriculturalIcons = [FaSeedling, FaLeaf, FaTractor, FaCloudSun];
  const RandomIcon = agriculturalIcons[idx % agriculturalIcons.length];
  const { user } = useLogin();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onEdit = async () => {
    // Navigate to post detail page with edit query param
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set('id', post?.id);
    currentParams.set('edit', 'true');

    router.push(`/posts?${currentParams.toString()}`);
    onOptionsClick();
  };

  return (
    <div className="relative p-3 pb-2 bg-transparent dark:bg-transparent">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative cursor-pointer">
            <Avatar
              src={post?.userinfo?.profile_url || post?.userinfo?.avatar_url || undefined}
              alt={formatName(post?.userinfo)}
              onClick={() => router.push("/profile")}
              sx={{
                width: 48,
                height: 48,
                border: '2px solid #bbf7d0',
                boxShadow: '0 4px 14px rgba(34, 197, 94, 0.15)',
              }}
            />
            <div className="absolute -bottom-1 -right-1 bg-farm-500 text-white rounded-full p-1">
              <RandomIcon className="w-3 h-3" />
            </div>
          </div>
          <div>
            <h3 className="font-display font-bold text-gray-900 dark:text-gray-100 text-[0.95rem] cursor-pointer hover:underline"
              onClick={() => router.push("/profile")}
            >
              {post?.userinfo?.display_name ? (post?.userinfo?.display_name) : formatName(post?.userinfo)}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs">{timeAgo(post?.created_at)}</p>
          </div>
        </div>
        {user &&
          <div className="flex items-center gap-2">

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBookmarkClick}
              className={`p-2 rounded-full transition-colors ${isBookmarked
                  ? 'bg-sunset-100 text-sunset-600'
                  : 'text-farm-400 hover:bg-farm-50'
                }`}
            >
              <FaBookmark className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOptionsClick}
              className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
            >
              <FaEllipsisH className="w-4 h-4 dark:text-gray-300" />
            </motion.button>
            {showOptions ?
              <OptionsPopup
                post={post}
                open={showOptions}
                onClose={onOptionsClick}
                onEdit={onEdit}
                onDelete={onDelete}
                onReport={() => {
                  onOptionsClick();
                }}
              /> : null}
          </div>
        }
      </div>
    </div>
  );
}

