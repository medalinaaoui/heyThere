/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backg: "#1C1C1C",
        textc: "#F6F6F6",
        accentc: "#FCC883",
        secondarybg: "#302A18",
        primary: "#007BFF",
        success: "#28A745",
        warning: "#FFC107",
        danger: "#DC3545",
        info: "#17A2B8",
        gray: "#6C757D",
        light: "#F8F9FA",
        dark: "#343A40",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        lora: ["lora", "serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
