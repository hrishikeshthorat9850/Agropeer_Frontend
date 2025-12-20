"use client";
import { useState, useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import UserSidebar from "./UserProfileSidebar";

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

  return (
    <div ref={ref} className="relative">
      <button
        aria-label="Open profile menu"
        onClick={() => setIsOpen((o) => !o)}
        className="rounded-full md:p-1 pt-2 hover:bg-green-700/20 transition"
      >
        {/* className override applied HERE */}
        <CgProfile
          className={`text-2xl sm:text-xl md:text-3xl cursor-pointer ${className}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 z-[999]">
          <UserSidebar onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}
