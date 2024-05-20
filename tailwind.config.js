const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      fontSize: {
        14: "14px",
      },
      backgroundColor: {
        "main-bg": "#FAFBFB",
        "main-dark-bg": "#20232A",
        "secondary-dark-bg": "#33373E",
        "light-gray": "#F7F7F7",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
      },
      borderWidth: {
        1: "1px",
      },
      borderColor: {
        color: "rgba(0, 0, 0, 0.1)",
      },
      width: {
        400: "400px",
        760: "760px",
        780: "780px",
        800: "800px",
        1000: "1000px",
        1200: "1200px",
        1400: "1400px",
      },
      height: {
        80: "80px",
      },
      minHeight: {
        590: "590px",
      },
      backgroundImage: {
        "hero-pattern": "url('https://i.ibb.co/MkvLDfb/Rectangle-4389.png')",
      },
      transitionProperty: {
        scrollbar:
          "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
      },
      transitionDuration: {
        0: "0ms",
        2000: "2000ms",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".custom-scrollbar::-webkit-scrollbar": {
          width: "8px",
          height: "2px",
        },
        ".custom-scrollbar::-webkit-scrollbar-track": {
          background: "#edf2f7",
          transition: "background-color 0.3s ease",
        },
        ".custom-scrollbar::-webkit-scrollbar-thumb": {
          background: "#6425FE",
          borderRadius: "10px",
          border: "3px solid #edf2f7",
          transition: "background-color 0.3s ease, border-color 0.3s ease",
        },
        ".custom-scrollbar::-webkit-scrollbar-thumb:hover": {
          background: "#2d3748",
          borderColor: "#e2e8f0",
        },
        ".custom-scrollbar": {
          "scrollbar-width": "thin",
          "scrollbar-color": "#6425FE #edf2f7",
        },
      });
    }),
  ],
};
