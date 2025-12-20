"use client";
import { motion } from "framer-motion";
import { FaSeedling } from "react-icons/fa";

export default function PlantLoader({ 
  size = "md", 
  text = "Loading...",
  variant = "default" // "default" | "blinking" | "pulsing"
}) {
  const sizeClasses = {
    sm: { 
      container: "h-8 w-8",
      icon: "text-xs",
      border: "border-2"
    },
    md: { 
      container: "h-12 w-12",
      icon: "text-sm",
      border: "border-[3px]"
    },
    lg: { 
      container: "h-20 w-20",
      icon: "text-lg",
      border: "border-4"
    },
    xl: { 
      container: "h-28 w-28",
      icon: "text-2xl",
      border: "border-4"
    }
  };

  const currentSize = sizeClasses[size];

  // Blinking animation variants
  const blinkingVariants = {
    animate: {
      opacity: [0.4, 1, 0.4],
    },
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Pulsing animation variants
  const pulsingVariants = {
    animate: {
      scale: [1, 1.1, 1],
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Default animation variants
  const defaultVariants = {
    animate: {
      scale: [1, 1.15, 1],
      rotate: [0, 8, -8, 0]
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const getAnimationVariants = () => {
    switch (variant) {
      case "blinking":
        return blinkingVariants;
      case "pulsing":
        return pulsingVariants;
      default:
        return defaultVariants;
    }
  };

  const animationProps = getAnimationVariants();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center"
    >
      <div className={`relative ${currentSize.container}`}>
        {/* Outer rotating circle - background */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-0 rounded-full ${currentSize.border} border-farm-200/40 ${currentSize.container}`}
        />
        
        {/* Middle rotating circle - progress indicator */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-0 rounded-full ${currentSize.border} border-transparent border-t-farm-400 border-r-farm-300 ${currentSize.container}`}
        />
        
        {/* Inner rotating circle - accent */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute inset-0 rounded-full ${currentSize.border} border-transparent border-t-farm-500 border-l-farm-400 ${currentSize.container}`}
        />
        
        {/* Plant icon with animation */}
        <motion.div
          {...animationProps}
          className="absolute inset-0 flex items-center justify-center"
        >
          <FaSeedling className={`text-farm-500 ${currentSize.icon}`} />
        </motion.div>

        {/* Glowing effect for blinking variant */}
        {variant === "blinking" && (
          <motion.div
            animate={{ 
              opacity: [0.15, 0.4, 0.15],
              scale: [1, 1.15, 1]
            }}
            transition={{ 
              duration: 1.2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 rounded-full bg-farm-400/30 blur-lg -z-10"
          />
        )}
      </div>
      
      {/* Loading text */}
      {text && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mt-5 text-farm-600 text-sm font-medium"
        >
          {text}
        </motion.span>
      )}
    </motion.div>
  );
}

