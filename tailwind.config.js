/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        royal: ["var(--font-playfair)", "serif"],
        body:  ["var(--font-jost)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
