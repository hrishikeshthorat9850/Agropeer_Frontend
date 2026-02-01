"use client";
import { useRef } from "react";
import { FaCloudUploadAlt, FaImage } from "react-icons/fa";

/**
 * ImageUploadBox - A premium, mobile-friendly file upload component
 *
 * @param {Function} onFileChange - Handler for file selection
 * @param {boolean} multiple - Allow multiple files
 * @param {string} label - Text to display (default: "Tap to upload photos")
 * @param {string} subLabel - Secondary text (default: "JPG, PNG supported")
 * @param {string} accept - File types (default: "image/*")
 * @param {boolean} error - Show error state
 * @param {ReactNode} icon - Custom icon
 */
export default function ImageUploadBox({
  onFileChange,
  multiple = false,
  label = "Tap to upload photos",
  subLabel = "JPG, PNG supported",
  accept = "image/*",
  error = false,
  icon = null, // Allow custom icon override
  className = "",
}) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      className={`
        relative w-full cursor-pointer
        border-2 border-dashed rounded-2xl
        flex flex-col items-center justify-center
        p-6 sm:p-8 transition-all duration-200
        group bg-gray-50 dark:bg-zinc-900/50
        hover:bg-gray-100 dark:hover:bg-zinc-800
        active:scale-[0.99]
        ${
          error
            ? "border-red-500 bg-red-50 dark:bg-red-900/10"
            : "border-gray-300 dark:border-zinc-700 hover:border-green-500 dark:hover:border-green-500"
        }
        ${className}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={onFileChange}
        className="hidden"
      />

      <div
        className={`
          mb-3 p-3 rounded-full 
          transition-colors duration-200
          ${
            error
              ? "bg-red-100 text-red-500 dark:bg-red-900/30"
              : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 group-hover:bg-green-200 dark:group-hover:bg-green-900/50"
          }
        `}
      >
        {icon || <FaCloudUploadAlt className="text-2xl sm:text-3xl" />}
      </div>

      <p
        className={`text-sm sm:text-base font-semibold text-center ${
          error ? "text-red-600" : "text-gray-700 dark:text-gray-200"
        }`}
      >
        {label}
      </p>

      {subLabel && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
          {subLabel}
        </p>
      )}
    </div>
  );
}
