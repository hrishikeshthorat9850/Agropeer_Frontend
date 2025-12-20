"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ProductImageSlider({ photos, onImageLoad }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoading, setImagesLoading] = useState(true);

  useEffect(() => {
    if (photos?.length) {
      const promises = photos.map(
        (src) =>
          new Promise((resolve) => {
            const img = new window.Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve;
          })
      );
      Promise.allSettled(promises).then(() => {
        setImagesLoading(false);
        onImageLoad?.();
      });
    }
  }, [photos, onImageLoad]);

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % photos.length);

  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 100 || velocity > 500) {
      prevImage();
    } else if (offset < -100 || velocity < -500) {
      nextImage();
    }
  };

  if (!photos || photos.length === 0) return null;

  return (
    <div className="relative w-full bg-white rounded-2xl shadow-xl p-4 md:p-6 dark:bg-[#272727]">
      <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
        {imagesLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-14 h-14 relative">
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-500 border-l-lime-400 animate-spin"></div>
              <div className="absolute inset-[4px] bg-gradient-to-br from-green-200 to-lime-100 rounded-full"></div>
            </div>
          </div>
        ) : (
          <motion.div
            key={currentIndex}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <Image
              src={photos[currentIndex]}
              alt={`Product Image ${currentIndex + 1}`}
              fill
              className="object-contain transition-transform duration-300 hover:scale-105 dark:bg-[#1E1E1E]"
              priority={currentIndex === 0}
            />
          </motion.div>
        )}

        {/* Navigation Buttons — Hidden on Mobile */}
        {!imagesLoading && photos.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="hidden md:flex absolute top-1/2 left-0 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition z-30 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <FaChevronLeft size={16} />
            </button>
            <button
              onClick={nextImage}
              className="hidden md:flex absolute top-1/2 right-0 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition z-30 backdrop-blur-sm"
              aria-label="Next image"
            >
              <FaChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* Pagination Dots */}
      {!imagesLoading && photos.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "bg-green-600 scale-125 shadow-lg"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
