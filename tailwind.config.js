/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3ED715",
        primaryMedium: "#32ac11",
        // darkPrimary: "#191000",
        // lighterGray: "#E9E9E9",
        // lightGray: "#BFBFBF",
        customGray: "#5C5F62",
        error: "#EB5555",
      },
    },
  },
  plugins: [],
};
