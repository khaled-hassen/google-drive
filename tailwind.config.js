/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#2262C6",
        white: "#FEFEFE",
        dark: "#0F1215",
        black: "#282828",
        danger: "#C50718",
      },
      fontFamily: {
        karla: ["Karla", "sans-serif"],
      },
    },
  },
  plugins: [],
};
