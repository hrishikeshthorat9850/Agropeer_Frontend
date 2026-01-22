"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, animate, useSpring } from "framer-motion";

export default function PostMedia({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  // Default to 4:5 (0.8), will update based on FIRST image only
  const [aspectRatio, setAspectRatio] = useState(4 / 5);

  // Determine container width for drag constraints
  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
  }, []);

  // Sync drag x with current index
  const x = useSpring(0, { stiffness: 300, damping: 30 });

  useEffect(() => {
    x.set(-currentIndex * width);
  }, [currentIndex, width, x]);

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = offset.x; // Distance dragged

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
    // ONLY set ratio for the first image
    if (index !== 0) return;

    // Instagram limits: 4:5 (0.8) to 1.91:1
    const clampedRatio = Math.min(Math.max(ratio, 0.8), 1.91);
    setAspectRatio(clampedRatio);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full select-none touch-pan-y" ref={containerRef}>
      {/* Media Window - Dynamic Aspect Ratio (Locked to First Item) */}
      <div
        className={`relative w-full bg-gray-100 dark:bg-zinc-900 transition-all duration-300 ease-out ${
          isZoomed ? "overflow-visible z-50" : "overflow-hidden z-10"
        }`}
        style={{ aspectRatio: aspectRatio }}
      >
        {/* Slider Track */}
        <motion.div
          className="flex h-full"
          drag={isZoomed ? false : "x"} // Disable slider drag if zoomed
          dragElastic={0.2}
          dragMomentum={false} // Disable momentum to prevent flying to the end
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
              // Prevent native drag of images interfering with framer
              onDragStart={(e) => e.preventDefault()}
            >
              <ZoomableMedia
                media={img}
                isActive={i === currentIndex}
                // Preload current AND next image for speed
                preload={i === currentIndex || i === currentIndex + 1}
                onZoomChange={setIsZoomed}
                // Detect ratio for first slide (others will be ignored by handler)
                onRatioDetected={(ratio) => handleRatioDetected(i, ratio)}
              />
            </div>
          ))}
        </motion.div>

        {/* Navigation Buttons (Hidden on mobile) */}
        {images.length > 1 && !isZoomed && (
          <>
            {currentIndex > 0 && (
              <button
                onClick={() => setCurrentIndex(currentIndex - 1)}
                className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/50 text-white p-1 hover:bg-black/70 transition"
              >
                ‹
              </button>
            )}
            {currentIndex < images.length - 1 && (
              <button
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/50 text-white p-1 hover:bg-black/70 transition"
              >
                ›
              </button>
            )}

            {/* Counter */}
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full text-xs font-medium text-white/90 z-20 pointer-events-none">
              {currentIndex + 1}/{images.length}
            </div>
          </>
        )}
      </div>

      {/* Pagination Dots */}
      {images.length > 1 && (
        <div className="flex justify-center mt-2 gap-1.5">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? "w-6 bg-green-600" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Separate Component for Zoom Logic
function ZoomableMedia({
  media,
  isActive,
  preload,
  onZoomChange,
  onRatioDetected,
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const [isLoaded, setIsLoaded] = useState(false);

  // Track zooming state locally to enable panning
  const isZooming = useRef(false);
  const initialTouchData = useRef(null);

  // Reset zoom when slide changes
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
      e.stopPropagation(); // Stop bubbling to slider
      isZooming.current = true;
      onZoomChange(true); // Disable slider

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
    // Zoom Logic
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

      // Simple Panning while 2 fingers down
      const midX = (touch1.clientX + touch2.clientX) / 2;
      const midY = (touch1.clientY + touch2.clientY) / 2;
      const deltaX = midX - initialTouchData.current.midX;
      const deltaY = midY - initialTouchData.current.midY;

      // Add delta to initial position
      x.set(initialTouchData.current.initialX + deltaX);
      y.set(initialTouchData.current.initialY + deltaY);
    }
    // Pan Logic (One finger, but only if zoomed)
    else if (e.touches.length === 1 && scale.get() > 1 && isZooming.current) {
      e.stopPropagation(); // Stop slider
    }
  };

  const handleTouchEnd = (e) => {
    if (isZooming.current && e.touches.length < 2) {
      isZooming.current = false;
      initialTouchData.current = null;

      // Snap back
      animate(scale, 1, { type: "spring", bounce: 0.2 });
      animate(x, 0, { type: "spring", bounce: 0.2 });
      animate(y, 0, { type: "spring", bounce: 0.2 });

      // Re-enable slider after snap animation
      onZoomChange(false);
    }
  };

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center relative bg-gray-50 dark:bg-zinc-900"
      style={{ x, y, scale }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {/* Loading Skeleton / Pulse */}
      {!isLoaded && media?.type !== "video" && (
        <div className="absolute inset-0 z-0 bg-gray-200 dark:bg-zinc-800 animate-pulse" />
      )}

      {media?.type === "video" ? (
        <video
          src={media.url}
          className="w-full h-full object-cover"
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          onClick={(e) => e.stopPropagation()}
          onLoadedMetadata={(e) => {
            if (onRatioDetected) {
              const { videoWidth, videoHeight } = e.target;
              if (videoWidth && videoHeight) {
                onRatioDetected(videoWidth / videoHeight);
              }
            }
          }}
        />
      ) : (
        <div className="relative w-full h-full pointer-events-none">
          <Image
            src={media.url || "/placeholder.png"}
            alt="Post media"
            fill
            className={`object-cover transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            priority={preload}
            unoptimized={true} // Bypass Next.js optimization for raw speed / static export
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={(e) => {
              // Determine ratio immediately on load if possible
              if (onRatioDetected && e.target.naturalWidth) {
                onRatioDetected(e.target.naturalWidth / e.target.naturalHeight);
              }
              setIsLoaded(true);
            }}
            onLoadingComplete={(result) => {
              if (
                onRatioDetected &&
                result.naturalWidth &&
                result.naturalHeight
              ) {
                onRatioDetected(result.naturalWidth / result.naturalHeight);
              }
              setIsLoaded(true);
            }}
          />
        </div>
      )}
    </motion.div>
  );
}
