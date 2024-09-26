/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "error-input": "errorInput 0.6s ease-in-out",
        "favourite-heart": "favouriteHeart 0.3s ease-in-out",
      },
      keyframes: {
        errorInput: {
          "0%": { transform: "translate(-5px,0)" },
          "20%": { transform: "translate(5px,0)" },
          "40%": { transform: "translate(-5px,0)" },
          "60%": { transform: "translate(5px,0)" },
          "80%": { transform: "translate(-5px,0)" },
          "100%": { transform: "translate(5px,0)" },
        },
        favouriteHeart: {
          "0%": { transform: "scale(0.4)" },
          "20%": { transform: "scale(0.8)" },
          "40%": { transform: "scale(1)" },
          "60%": { transform: "scale(1.2)" },
          "80%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.9)" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
