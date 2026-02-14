import { useState, useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import UserSidebar from "./UserProfileSidebar";
import { useBackPress } from "@/Context/BackHandlerContext";

export default function ProfileModal({ className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // ✅ Handle Android Back Press
  useBackPress(
    () => {
      if (isOpen) {
        setIsOpen(false);
        return true;
      }
      return false;
    },
    20,
    isOpen,
  );

  return (
    <div ref={ref} className="relative">
      <button
        aria-label="Open profile menu"
        onClick={() => setIsOpen((o) => !o)}
        className="rounded-full md:p-1 pt-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
      >
        {/* className override applied HERE */}
        <CgProfile className={`cursor-pointer ${className}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 z-[9999]">
          <UserSidebar onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}
