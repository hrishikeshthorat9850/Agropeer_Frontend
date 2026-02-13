/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Modern Android Agricultural Palette
        farm: {
          50: "#fcfdf7", // Surface Light
          100: "#f0fdf4",
          200: "#dcfce7",
          300: "#86efac",
          400: "#4ade80",
          500: "#2e7d32", // Primary
          600: "#1b5e20", // OnPrimaryContainer / Darker
          700: "#14532d",
          800: "#052e16",
          900: "#022c1b",
          950: "#011c11",
        },
        earth: {
          50: "#fff8e1",
          100: "#ffecb3",
          200: "#ffe082",
          300: "#ffd54f",
          400: "#ffca28",
          500: "#ef6c00", // Secondary
          600: "#e65100", // Secondary Dark
          700: "#bf360c",
          800: "#3e2723",
          900: "#1c1917",
          950: "#0c0a09",
        },
        surface: {
          50: "#fcfdf6", // Main Surface Light
          100: "#e0e2db", // Surface Variant
          200: "#c3c7bd",
          300: "#a7ad9f",
          400: "#8c9384",
          500: "#72796c",
          600: "#5a6055",
          700: "#43483f",
          800: "#2d312a", // Main Surface Dark
          900: "#1a1c19", // Background Dark
          950: "#0d0e0d",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        grow: "grow 0.3s ease-out",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        grow: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        // Subtle contour/topography pattern (very low opacity
        // Nature Mesh Gradients
        "mesh-farm":
          "radial-gradient(at 0% 0%, hsla(134,65%,85%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(85,65%,85%,1) 0, transparent 50%), radial-gradient(at 100% 100%, hsla(134,65%,95%,1) 0, transparent 50%), radial-gradient(at 0% 100%, hsla(85,65%,90%,1) 0, transparent 50%)",
        "mesh-sky":
          "radial-gradient(at 0% 0%, hsla(199,89%,85%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(180,65%,85%,1) 0, transparent 50%)",
      },
      boxShadow: {
        farm: "0 2px 8px 0 rgba(46, 125, 50, 0.08)",
        earth: "0 2px 8px 0 rgba(239, 108, 0, 0.08)",
        "glow-farm": "0 0 15px rgba(46, 125, 50, 0.15)",
        "glow-earth": "0 0 15px rgba(239, 108, 0, 0.15)",
        "elevation-1": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "elevation-2":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "elevation-3":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
