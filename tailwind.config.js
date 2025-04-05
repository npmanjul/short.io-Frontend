/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // or "media" for system preference
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
