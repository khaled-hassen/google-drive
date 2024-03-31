const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#2262C6",
        white: "#FEFEFE",
        darkerWhite: "#F0F2F8",
        lightGray: "#A1A5B0",
        dark: "#0F1215",
        black: "#282828",
        danger: "#C50718",
      },
      fontFamily: {
        karla: ["Karla", "sans-serif"],
      },
    },
    screens: {
      xs: "600px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
