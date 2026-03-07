import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-bricolage)", "sans-serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        // Brand base
        void: "#03050A",
        abyss: "#070B14",
        deep: "#0B1120",
        surface: "#101827",
        elevated: "#141E2E",
        overlay: "#1A2438",
        // Brand accents
        azure: {
          DEFAULT: "#2563EB",
          light: "#3B82F6",
          dim: "rgba(37,99,235,0.15)",
          glow: "rgba(37,99,235,0.4)",
        },
        violet: {
          DEFAULT: "#7C3AED",
          light: "#8B5CF6",
          dim: "rgba(124,58,237,0.15)",
          glow: "rgba(124,58,237,0.4)",
        },
        ice: {
          DEFAULT: "#06B6D4",
          light: "#22D3EE",
          dim: "rgba(6,182,212,0.12)",
          glow: "rgba(6,182,212,0.35)",
        },
        // Text
        "t-primary": "rgba(255,255,255,1)",
        "t-secondary": "rgba(255,255,255,0.65)",
        "t-muted": "rgba(255,255,255,0.35)",
        "t-faint": "rgba(255,255,255,0.12)",
        // Borders
        "b-subtle": "rgba(255,255,255,0.06)",
        "b-default": "rgba(255,255,255,0.10)",
        "b-strong": "rgba(255,255,255,0.18)",
      },
      fontSize: {
        "2xs": ["10px", { lineHeight: "1.4", letterSpacing: "0.08em" }],
        xs: ["12px", { lineHeight: "1.5", letterSpacing: "0.04em" }],
        sm: ["14px", { lineHeight: "1.6" }],
        base: ["16px", { lineHeight: "1.7" }],
        lg: ["18px", { lineHeight: "1.7" }],
        xl: ["20px", { lineHeight: "1.5" }],
        "2xl": ["24px", { lineHeight: "1.4" }],
        "3xl": ["30px", { lineHeight: "1.3" }],
        "4xl": ["36px", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "5xl": ["48px", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "6xl": ["60px", { lineHeight: "1.0", letterSpacing: "-0.035em" }],
        "7xl": ["72px", { lineHeight: "0.98", letterSpacing: "-0.04em" }],
        "8xl": ["88px", { lineHeight: "0.95", letterSpacing: "-0.045em" }],
        "9xl": ["108px", { lineHeight: "0.93", letterSpacing: "-0.05em" }],
      },
      spacing: {
        "section": "120px",
        "section-sm": "80px",
        "18": "72px",
        "22": "88px",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "scan": "scan 3s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "1" },
          "100%": { transform: "translateY(500%)", opacity: "0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glow-blue": "0 0 60px rgba(37,99,235,0.25), 0 0 120px rgba(37,99,235,0.1)",
        "glow-violet": "0 0 60px rgba(124,58,237,0.25), 0 0 120px rgba(124,58,237,0.1)",
        "glow-ice": "0 0 40px rgba(6,182,212,0.3)",
        "card": "0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset",
        "card-hover": "0 16px 48px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.08) inset",
      },
    },
  },
  plugins: [],
};
export default config;
