module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      serif: ["Volkhov", "serif"],
    },
    extend: {
      colors: {
        bg: "#F5F6F7",
        primary: "#000",
        pastel: "#3C70AD",
        contrast: "#AD564E",
        "pastel-dark": "#262626",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        volkhov: ["Volkhov", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
