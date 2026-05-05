/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  "#FAF8F4",
          100: "#F4F1EB",
          200: "#EBE7DF",
          300: "#D9D3C8",
        },
        ink: {
          900: "#1F1B16",
          700: "#5C5650",
          500: "#8A8278",
          300: "#B8B0A4",
        },
        sage: {
          900: "#1A2622",
          700: "#243530",
          500: "#3D5A47",
          400: "#7A9270",
          300: "#B8C9BD",
          200: "#E2E8D6",
        },
        accent: {
          rejected:  "#A8908F",
          interview: "#C4A875",
          screening: "#9FB892",
          offer:     "#7A9270",
        },
      },
    },
  },
  plugins: [],
};
