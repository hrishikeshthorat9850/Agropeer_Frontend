"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, animate, useSpring } from "framer-motion";

export default function PostMedia({ images, onZoomChange }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  // Default to Square (1:1) as per Instagram standard
  const [aspectRatio, setAspectRatio] = useState(1);

  // Notify parent of zoom state
  useEffect(() => {
    onZoomChange?.(isZoomed);
  }, [isZoomed, onZoomChange]);

  // Determine container width for drag constraints
  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
    // Update width on resize
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
    // 🔒 INSTAGRAM LOGIC:
    // The FIRST image dictates the aspect ratio for the ENTIRE carousel.
    // All subsequent images will be cropped to fit this ratio.
    if (index !== 0) return;

    // Instagram limits: Extended range for full visibility
    // Allow up to 9:20 (0.45) vertically and 2.5 horizontally
    const clampedRatio = Math.min(Math.max(ratio, 0.45), 2.5);

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
                containerAspectRatio={aspectRatio}
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

            {/* Counter (Instagram Style Pill) */}
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-medium text-white/90 z-20 pointer-events-none">
              {currentIndex + 1}/{images.length}
            </div>
          </>
        )}
      </div>

      {/* Pagination Dots (Instagram Style) */}
      {images.length > 1 && (
        <div className="flex justify-center mt-2 gap-1.5 min-h-[6px]">
          {images.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-1.5 h-1.5 bg-blue-500"
                  : "w-1.5 h-1.5 bg-gray-300 dark:bg-gray-600 scale-75"
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
  containerAspectRatio,
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageRatio, setImageRatio] = useState(null);

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

      const touch = e.touches[0];
      // Initialize pan if we just dropped from 2 fingers to 1 (not fully handled here for brevity, usually needs dedicated state)
      // OR simple pan continuation if architecture supports it.
      // For now, robust 2-finger pan is implemented above. 1-finger pan requires more complex state tracking (lastX/Y).
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

  // Detect metadata for fast layout
  useEffect(() => {
    if (media && media.width && media.height) {
      const r = media.width / media.height;
      setImageRatio(r);
      if (isActive) onRatioDetected?.(r);
    }
  }, [media, isActive, onRatioDetected]);

  // Determine sizing style based on ratio comparison
  // If Image is Taller than Container (imageRatio < containerRatio) -> Fit Width (w-full), let Height overflow
  // If Image is Wider than Container (imageRatio > containerRatio) -> Fit Height (h-full), let Width overflow
  // Default to object-cover like behavior if unknown

  const getMediaStyle = () => {
    if (!imageRatio || !containerAspectRatio)
      return { width: "100%", height: "100%", objectFit: "cover" };

    // Tolerance for float comparison
    if (Math.abs(imageRatio - containerAspectRatio) < 0.01) {
      return { width: "100%", height: "100%", objectFit: "cover" };
    }

    if (imageRatio < containerAspectRatio) {
      // Image is Taller than container -> Constrain Height to Fit (Contain)
      // This results in black bars on sides (letterboxing) instead of cropping top/bottom
      return {
        height: "100%",
        width: "auto",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "none", // Ensure it can size freely
      };
    } else {
      // Image is Wider than container -> Constrain Width to Fit (Contain)
      // This results in black bars on top/bottom instead of cropping sides
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
  // If we are using the detailed positioning, we shouldn't use fill=true on NextImage

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center relative bg-gray-50 dark:bg-zinc-900"
      // overflow-hidden on the wrapper ensures the cropping happens visually when not zoomed
      // BUT, we apply the scale transform to THIS wrapper.
      // Wait, if we scale THIS wrapper, the overflow limit scales with it.
      // To reveal outside content, THIS wrapper needs overflow-visible.
      // The PARENT of this component (in the customized map) has relative.
      // We need the 'crop' to be static.

      style={{ x, y, scale }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {/* 
          CORRECTION: 
          To support uncropping on zoom, the CLIP must happen on a PARENT that does NOT scale.
          The `motion.div` here scales. 
          So `overflow-hidden` should be on the SLIDER CONTAINER (PostMedia root).
          This component should effectively be `overflow-visible`.
       */}

      {/* Loading Skeleton / Pulse */}
      {!isLoaded && media?.type !== "video" && (
        <div className="absolute inset-0 z-0 bg-gray-200 dark:bg-zinc-800 animate-pulse" />
      )}

      {media?.type === "video" ? (
        <video
          src={media.url}
          className="max-w-none"
          style={mediaStyle}
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          playsInline
          onClick={(e) => e.stopPropagation()}
          onLoadedMetadata={(e) => {
            const { videoWidth, videoHeight } = e.target;
            if (videoWidth && videoHeight) {
              const r = videoWidth / videoHeight;
              setImageRatio(r);
              if (isActive && onRatioDetected) onRatioDetected(r);
            }
          }}
        />
      ) : (
        <div className="relative w-full h-full pointer-events-none flex items-center justify-center">
          {/* We use a standard img tag or Next Image with specific sizing to allow overflow */}
          {/* If we use Next Image without fill, we need width/height. */}
          {/* Since we want CSS controlled sizing (100% / auto), we can use fill={false} width={0} height={0} sizes="100vw" style={mediaStyle} */}

          <Image
            src={media.url || "/placeholder.png"}
            alt="Post media"
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="max-w-none"
            style={mediaStyle} // Applies the centering and auto-sizing
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
      )}
    </motion.div>
  );
}
