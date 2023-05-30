/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/app/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        base: "#E1E1E6",
        purple: {
          300: "#8257E5",
          500: "#633BBC",
          600: "#645986",
          700: "#282843",
          900: "#1A1924",
        },
        green: {
          400: "#07847E",
          500: "#00B37E",
        },
      },
      screens: {
        xs: "320px",
      },
    },
  },
  plugins: [],
};
