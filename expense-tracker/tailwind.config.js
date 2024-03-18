/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./ui/**/*.{ts,tsx}",
    "./modules/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#DOC8FF",
        "primary-dark": "#1E1B2F",
        "primary-light": "#4B437B",
        "secondary-1": "#725df1",
        "secondary-2": "#807c9d",
        "secondary-3": "#8780AD",
        "secondary-4": "#ADA5DD",
        "secondary-white": "#d9d9d9",
      },
      screens: {
        xs: "480px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {},
      animation: {},
    },
  },
  plugins: [require("tailwindcss-animate")],
};
