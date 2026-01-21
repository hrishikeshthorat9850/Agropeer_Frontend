"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, animate, useSpring } from "framer-motion";

export default function PostMedia({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  // Default to 4:5 (0.8) if loading, but will update dynamically
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

  const handleRatioDetected = (ratio) => {
    // Instagram limits: 4:5 (0.8) to 1.91:1
    // We clamp it to avoid layout breaking
    const clampedRatio = Math.min(Math.max(ratio, 0.8), 1.91);
    setAspectRatio(clampedRatio);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full select-none touch-pan-y" ref={containerRef}>
      {/* Media Window - Dynamic Aspect Ratio */}
      <div
        className="relative w-full bg-gray-100 dark:bg-zinc-900 overflow-hidden z-10 transition-all duration-300 ease-out"
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
              className="min-w-full h-full relative flex items-center justify-center"
              // Prevent native drag of images interfering with framer
              onDragStart={(e) => e.preventDefault()}
            >
              <ZoomableMedia
                media={img}
                isActive={i === currentIndex}
                onZoomChange={setIsZoomed}
                // Only detect ratio from the first image
                onRatioDetected={i === 0 ? handleRatioDetected : undefined}
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
function ZoomableMedia({ media, isActive, onZoomChange, onRatioDetected }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

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

      // Simple Panning while 2 fingers down (optional, keeping it simple for stability)
      // For precise panning we need to track midpoint delta.
      // Adding simplified midpoint tracking:
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
      // Implement 1-finger pan if needed, or rely on 2-finger pan
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

      // Re-enable slider after snap animation (approximated by slight delay or direct call)
      // For immediate response, we inform parent:
      onZoomChange(false);
    }
  };

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      style={{ x, y, scale }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {media?.type === "video" ? (
        <video
          src={media.url}
          className="w-full h-full object-cover"
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          // disableRemotePlayback // removing to allow better controls
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
            className="object-cover"
            priority={isActive}
            unoptimized={true} // Bypass Next.js optimization for raw speed
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoadingComplete={(result) => {
              if (
                onRatioDetected &&
                result.naturalWidth &&
                result.naturalHeight
              ) {
                onRatioDetected(result.naturalWidth / result.naturalHeight);
              }
            }}
          />
        </div>
      )}
    </motion.div>
  );
}
