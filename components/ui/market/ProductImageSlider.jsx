"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, animate, useSpring } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ProductImageSlider({ photos, onImageLoad }) {
  // Map simple string photos to object structure expected by logic
  const images = (photos || []).map((url) => ({ type: "image", url }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  // Default to 4:3 for products usually, but logic will adapt
  const [aspectRatio, setAspectRatio] = useState(4 / 3);
  const [imagesLoading, setImagesLoading] = useState(true);

  // Preload images logic from original ProductImageSlider
  useEffect(() => {
    if (photos?.length) {
      const promises = photos.map(
        (src) =>
          new Promise((resolve) => {
            const img = new window.Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve;
          }),
      );
      Promise.allSettled(promises).then(() => {
        setImagesLoading(false);
        onImageLoad?.();
      });
    } else {
      setImagesLoading(false);
    }
  }, [photos, onImageLoad]);

  // Determine container width for drag constraints
  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (containerRef.current) setWidth(containerRef.current.offsetWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync drag x with current index
  const x = useSpring(0, { stiffness: 300, damping: 30 });

  useEffect(() => {
    x.set(-currentIndex * width);
  }, [currentIndex, width, x]);

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = offset.x;

    if (swipe < -50 || velocity.x < -500) {
      if (currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    } else if (swipe > 50 || velocity.x > 500) {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const handleRatioDetected = (index, ratio) => {
    if (index !== 0) return;
    // Clamp ratio to avoid extremely tall images. standard product view is often square or slightly tall.
    // 0.75 allows for 4:3 portrait. 1.0 is square.
    const clampedRatio = Math.min(Math.max(ratio, 0.75), 1.5);
    setAspectRatio(clampedRatio);
  };

  const nextImage = () => {
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevImage = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  if (!images || images.length === 0) return null;

  return (
    <div
      className="w-full relative bg-white dark:bg-[#1E1E1E] shadow-sm select-none touch-pan-y"
      ref={containerRef}
    >
      {/* Container with dynamic aspect ratio but constrained max-height */}
      <div
        className={`relative w-full max-w-3xl mx-auto bg-gray-100 dark:bg-[#2C2C2C] transition-all duration-300 ease-out max-h-[55vh] ${
          isZoomed ? "overflow-visible z-50" : "overflow-hidden z-10"
        }`}
        style={{ aspectRatio: aspectRatio }}
      >
        {imagesLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-14 h-14 relative">
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-500 border-l-lime-400 animate-spin"></div>
              <div className="absolute inset-[4px] bg-gradient-to-br from-green-200 to-lime-100 rounded-full"></div>
            </div>
          </div>
        ) : (
          <motion.div
            className="flex h-full"
            drag={isZoomed ? false : "x"}
            dragElastic={0.2}
            dragMomentum={false}
            dragConstraints={{
              left: -Math.min(currentIndex + 1, images.length - 1) * width,
              right: -Math.max(currentIndex - 1, 0) * width,
            }}
            style={{ x }}
            onDragEnd={handleDragEnd}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className={`min-w-full h-full relative flex items-center justify-center ${
                  isZoomed && i !== currentIndex ? "opacity-0 invisible" : ""
                }`}
                onDragStart={(e) => e.preventDefault()}
              >
                <ZoomableMedia
                  media={img}
                  isActive={i === currentIndex}
                  preload={i === currentIndex || i === currentIndex + 1}
                  onZoomChange={setIsZoomed}
                  onRatioDetected={(ratio) => handleRatioDetected(i, ratio)}
                  containerAspectRatio={aspectRatio}
                />
              </div>
            ))}
          </motion.div>
        )}

        {/* Navigation Buttons (Desktop) */}
        {!imagesLoading && images.length > 1 && !isZoomed && (
          <>
            {currentIndex > 0 && (
              <button
                onClick={prevImage}
                className="hidden md:flex absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition z-30 backdrop-blur-sm"
                aria-label="Previous image"
              >
                <FaChevronLeft size={16} />
              </button>
            )}
            {currentIndex < images.length - 1 && (
              <button
                onClick={nextImage}
                className="hidden md:flex absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition z-30 backdrop-blur-sm"
                aria-label="Next image"
              >
                <FaChevronRight size={16} />
              </button>
            )}
            {/* Counter Pill */}
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-medium text-white/90 z-20 pointer-events-none">
              {currentIndex + 1}/{images.length}
            </div>
          </>
        )}
      </div>

      {/* Pagination Dots */}
      {!imagesLoading && images.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "bg-green-600 scale-125 shadow-lg w-4"
                  : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Separate Component for Zoom Logic (Ported from PostMedia)
function ZoomableMedia({
  media,
  isActive,
  preload,
  onZoomChange,
  onRatioDetected,
  containerAspectRatio,
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageRatio, setImageRatio] = useState(null);

  const isZooming = useRef(false);
  const initialTouchData = useRef(null);

  useEffect(() => {
    if (!isActive) {
      scale.set(1);
      x.set(0);
      y.set(0);
      onZoomChange(false);
    }
  }, [isActive, scale, x, y, onZoomChange]);

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      e.stopPropagation();
      isZooming.current = true;
      onZoomChange(true);

      const touch1 = e.touches[0];
      const touch2 = e.touches[1];

      const dist = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY,
      );

      const midX = (touch1.clientX + touch2.clientX) / 2;
      const midY = (touch1.clientY + touch2.clientY) / 2;

      initialTouchData.current = {
        dist,
        midX,
        midY,
        initialX: x.get(),
        initialY: y.get(),
        initialScale: scale.get(),
      };
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && initialTouchData.current) {
      e.preventDefault();
      e.stopPropagation();

      const touch1 = e.touches[0];
      const touch2 = e.touches[1];

      const dist = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY,
      );

      const { dist: initialDist, initialScale } = initialTouchData.current;
      const newScale = Math.max(1, initialScale * (dist / initialDist));

      scale.set(newScale);

      const midX = (touch1.clientX + touch2.clientX) / 2;
      const midY = (touch1.clientY + touch2.clientY) / 2;
      const deltaX = midX - initialTouchData.current.midX;
      const deltaY = midY - initialTouchData.current.midY;

      x.set(initialTouchData.current.initialX + deltaX);
      y.set(initialTouchData.current.initialY + deltaY);
    }
    // Pan Logic (One finger, if zoomed) - Basic implementation
    else if (e.touches.length === 1 && scale.get() > 1 && isZooming.current) {
      e.stopPropagation();
    }
  };

  const handleTouchEnd = (e) => {
    if (isZooming.current && e.touches.length < 2) {
      isZooming.current = false;
      initialTouchData.current = null;

      animate(scale, 1, { type: "spring", bounce: 0.2 });
      animate(x, 0, { type: "spring", bounce: 0.2 });
      animate(y, 0, { type: "spring", bounce: 0.2 });

      onZoomChange(false);
    }
  };

  const getMediaStyle = () => {
    if (!imageRatio || !containerAspectRatio)
      return { width: "100%", height: "100%", objectFit: "cover" };

    if (Math.abs(imageRatio - containerAspectRatio) < 0.01) {
      return { width: "100%", height: "100%", objectFit: "cover" };
    }

    if (imageRatio < containerAspectRatio) {
      return {
        height: "100%",
        width: "auto",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "none",
      };
    } else {
      return {
        width: "100%",
        height: "auto",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxHeight: "none",
      };
    }
  };

  const mediaStyle = getMediaStyle();

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center relative bg-gray-50 dark:bg-[#2C2C2C]"
      style={{ x, y, scale }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {!isLoaded && (
        <div className="absolute inset-0 z-0 bg-gray-200 dark:bg-zinc-800 animate-pulse" />
      )}

      <div className="relative w-full h-full pointer-events-none flex items-center justify-center">
        <Image
          src={media.url || "/placeholder.png"}
          alt="Product image"
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="max-w-none"
          style={mediaStyle}
          priority={preload}
          unoptimized={true}
          onLoad={(e) => {
            if (e.target.naturalWidth) {
              const r = e.target.naturalWidth / e.target.naturalHeight;
              setImageRatio(r);
              if (isActive && onRatioDetected) onRatioDetected(r);
            }
            setIsLoaded(true);
          }}
          onLoadingComplete={(result) => {
            if (result.naturalWidth) {
              const r = result.naturalWidth / result.naturalHeight;
              setImageRatio(r);
              if (isActive && onRatioDetected) onRatioDetected(r);
            }
            setIsLoaded(true);
          }}
        />
      </div>
    </motion.div>
  );
}
