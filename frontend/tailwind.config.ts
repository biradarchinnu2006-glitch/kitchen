import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#17140F",
          light: "#211C15",
          soft: "#2B241A",
        },
        cream: {
          DEFAULT: "#F4EEDF",
          dim: "#E7DCC4",
        },
        wood: {
          DEFAULT: "#6B4A30",
          dark: "#4A3220",
        },
        olive: {
          DEFAULT: "#56603A",
          dark: "#3E4529",
        },
        gold: {
          DEFAULT: "#C9A24B",
          bright: "#E0BB66",
          dim: "#8C7238",
        },
        saffron: {
          DEFAULT: "#D97D2B",
          dark: "#B3611C",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        grain: "url('/textures/grain.svg')",
      },
      keyframes: {
        rise: {
          "0%": { transform: "translateY(0) scaleX(1)", opacity: "0.55" },
          "50%": { transform: "translateY(-40px) scaleX(1.3)", opacity: "0.25" },
          "100%": { transform: "translateY(-90px) scaleX(0.8)", opacity: "0" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(var(--r)) rotate(0deg)" },
          "100%": {
            transform: "rotate(360deg) translateX(var(--r)) rotate(-360deg)",
          },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(201,162,75,0.08)" },
          "50%": { boxShadow: "0 0 40px rgba(201,162,75,0.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 3.2s ease-in-out infinite",
        orbit: "orbit 18s linear infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
        shimmer: "shimmer 1.5s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "slide-up": "slide-up 0.6s cubic-bezier(0.22,1,0.36,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
