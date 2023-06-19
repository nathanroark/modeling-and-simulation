/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "spin-slow": "spin 4s linear infinite",
      },
      gridTemplateColumns: {
        20: "repeat(20, minmax(0, 1fr))",
        30: "repeat(30, minmax(0, 1fr))",
        36: "repeat(36, minmax(0, 1fr))",
        40: "repeat(40, minmax(0, 1fr))",
        50: "repeat(50, minmax(0, 1fr))",
        60: "repeat(60, minmax(0, 1fr))",
        70: "repeat(70, minmax(0, 1fr))",
        80: "repeat(80, minmax(0, 1fr))",
        90: "repeat(90, minmax(0, 1fr))",
        100: "repeat(100, minmax(0, 1fr))",
        110: "repeat(110, minmax(0, 1fr))",
        120: "repeat(120, minmax(0, 1fr))",

        // Complex site-specific column configuration
        footer: "200px minmax(900px, 1fr) 100px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
