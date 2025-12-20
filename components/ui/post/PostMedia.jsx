"use client";
import Image from "next/image";
import { useState, useRef } from "react";

export default function PostMedia({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  if (!images || images.length === 0) return null;

  // Handle swipe gesture
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) > 50) {
      if (distance > 0 && currentIndex < images.length - 1) {
        setCurrentIndex((prev) => prev + 1); // swipe left → next
      } else if (distance < 0 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1); // swipe right → previous
      }
    }
  };

  return (
    <div className="w-full">
      {/* Media Container */}
      <div
        className="relative w-full h-64 sm:h-72 md:h-80 bg-farm-50 overflow-hidden flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images[currentIndex]?.type === "video" ? (
          <video
            src={images[currentIndex].url}
            className="w-full h-full object-contain rounded-2xl"
            controls
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
          />
        ) : (
          <Image
            src={images[currentIndex].url || "/placeholder.png"}
            alt={`Post media ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            width={640}
            height={480}
          />
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

        {/* Navigation (Hidden on mobile) */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              disabled={currentIndex === 0}
              className={`hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-1 transition ${
                currentIndex === 0
                  ? "bg-black/10 text-white/30 cursor-not-allowed"
                  : "bg-black/50 text-white hover:bg-black/70 font-extrabold"
              }`}
            >
              ‹
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              disabled={currentIndex === images.length - 1}
              className={`hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 transition ${
                currentIndex === images.length - 1
                  ? "bg-black/10 text-white/30 cursor-not-allowed"
                  : "bg-black/50 text-white hover:bg-black/70 font-extrabold"
              }`}
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Dots BELOW the image */}
      {images.length > 1 && (
        <div className="flex justify-center mt-2 gap-1">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === currentIndex ? "bg-green-600 scale-110" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
