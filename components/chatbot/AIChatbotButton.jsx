"use client";
import { useState, useEffect, useRef } from "react";
import { FaRobot } from "react-icons/fa";

export default function AIChatbotButton({ open, setOpen }) {
  const buttonRef = useRef(null);

  // 🔥 Important: Hook must ALWAYS run
  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState("bottom-right");
  const [dragging, setDragging] = useState(false);

  // Detect mobile using effect (SAFE)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 🔥 SAFE: Conditional Rendering (UI only)
  if (isMobile) return null;

  const handleDragStart = () => setDragging(true);

  const handleDragEnd = (e) => {
    setDragging(false);
    snapToCorner(e.clientX, e.clientY);
  };

  const handleTouchStart = () => setDragging(true);

  const handleTouchEnd = (e) => {
    setDragging(false);
    const touch = e.changedTouches[0];
    snapToCorner(touch.clientX, touch.clientY);
  };

  const snapToCorner = (x, y) => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (x < w / 2 && y < h / 2) setPosition("top-left");
    else if (x > w / 2 && y < h / 2) setPosition("top-right");
    else if (x < w / 2 && y > h / 2) setPosition("bottom-left");
    else setPosition("bottom-right");
  };

  const getClassFromPosition = () => {
    switch (position) {
      case "top-left":
        return "top-6 left-6";
      case "top-right":
        return "top-6 right-6";
      case "bottom-left":
        return "bottom-6 left-6";
      default:
        return "bottom-6 right-6";
    }
  };

  return (
    <button
      ref={buttonRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => !dragging && setOpen(true)}
      className={`fixed ${getClassFromPosition()} 
        bg-gradient-to-br from-green-500 to-emerald-600 
        shadow-[0_4px_20px_rgba(34,197,94,0.4)]
        text-white
        rounded-2xl w-14 h-14 flex items-center justify-center 
        hover:scale-110 active:scale-90
        transition-all duration-300 z-[99999]`}
    >
      <FaRobot size={28} className="drop-shadow-sm" />
    </button >
  );
}
