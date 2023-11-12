const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      // padding: "1.5rem",
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require("tailwind-container-break-out"),
    require("@tailwindcss/typography"),
  ],
};
