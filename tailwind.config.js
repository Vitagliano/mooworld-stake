/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#1f1e3e",
        purple: "#24142c",
        burple: "#454FBF",
      },
    },
  },
  plugins: [],
};
