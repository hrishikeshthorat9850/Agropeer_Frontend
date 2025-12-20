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
      className={`fixed ${getClassFromPosition()} bg-blue-600 text-white shadow-xl 
        rounded-full w-14 h-14 flex items-center justify-center hover:bg-blue-700 
        transition z-[99999] active:scale-95`}
    >
      <FaRobot size={26} className="animate-tilt" />
    </button>
  );
}
