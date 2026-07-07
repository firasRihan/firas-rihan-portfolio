import type { Config } from "tailwindcss";

/**
 * ⚠️ COLORS ARE NOT DEFINED HERE.
 * Every color on the site comes from the CSS variables declared once in
 * `app/globals.css` (the "DESIGN TOKENS" block). Change them there and the
 * whole site — including glows, borders and the Three.js scenes — follows.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        hi: "rgb(var(--text-hi) / <alpha-value>)",
        body: "rgb(var(--text-body) / <alpha-value>)",
        mute: "rgb(var(--text-mute) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "glow-sm": "0 0 14px rgb(var(--accent) / 0.25)",
        glow: "0 0 28px rgb(var(--accent) / 0.35)",
        "glow-lg": "0 0 56px rgb(var(--accent) / 0.45)",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(1.35)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRev: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        pulseGlow: "pulseGlow 1.4s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        marqueeRev: "marqueeRev 46s linear infinite",
        blink: "blink 1.1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
