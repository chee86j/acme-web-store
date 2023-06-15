/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./static/**/*.{html,css}"],
  theme: {
    extend: {
      fontFamily: {
        "3d": ['"Bungee Shade"'],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#22d3ee",

          secondary: "#84cc16",

          accent: "#ff7000",

          neutral: "#D6D6D6",

          "base-100": "#1f2937",

          info: "#85d5e5",

          success: "#62dfc8",

          warning: "#c09f0c",

          error: "#e6381a",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
