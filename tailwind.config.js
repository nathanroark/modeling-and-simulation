/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      ...colors,
      brown: {
        50: "#efebe9",
        100: "#d7ccc8",
        200: "#bcaaa4",
        300: "#a1887f",
        400: "#8d6e63",
        500: "#795548",
        600: "#6d4c41",
        700: "#5d4037",
        800: "#4e342e",
        900: "#3e2723",
      },
      brick: {
        50: "#fdeee9",
        100: "#fbd4c9",
        200: "#f8b1a0",
        300: "#f58d77",
        400: "#f26a4e",
        500: "#ef4725",
        600: "#a62c2c",
        700: "#8c2424",
        800: "#731d1d",
        900: "#591616",
      },
    },

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
