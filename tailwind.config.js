/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          light: "#F3E5AB",
          DEFAULT: "#D4AF37",
          dark: "#B8860B",
        },
        maroon: {
          light: "#800D2D",
          DEFAULT: "#5B0E23",
          dark: "#3D0916",
        },
        ivory: "#FFFFF0",
        luxury: {
          bg: "#FFFFFF",
          text: "#1A1A1A",
          accent: "#C5A021",
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
        calisto: ['"Calisto MT"', "serif"],
        rockwell: ["Rockwell", "serif"],
      },
    },
  },
  plugins: [],
};
