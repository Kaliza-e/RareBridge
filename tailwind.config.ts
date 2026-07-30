import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F5F4F0", // Ivory
        foreground: "#112250", // Navy
        primary: {
          DEFAULT: "#112250",
          light: "#3B507D",
        },
        sapphire: "#3B507D",
        champagne: "#E7E2CE",
        taupe: "#BEB7A7",
        ivory: "#F5F4F0",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        heading: ["var(--font-heading)", "Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        'card': '24px',
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(17, 34, 80, 0.08)',
        'premium-hover': '0 20px 40px -15px rgba(17, 34, 80, 0.15)',
      }
    },
  },
  plugins: [],
};
export default config;
