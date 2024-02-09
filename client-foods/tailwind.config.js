/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "green":  "#ebb22f",
        "red": "#FF6868",
        "secondary": "#555",
        "primaryBG":  "#FCFCFC",
      },
      fontFamily: {
        "primary": [ "Inter", "sans-serif"]
      },
      // boxShadow: {
      //   'primary': 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      // }

    },
  },
  //chon theme light mac dinh
  daisyui: {
    themes: ["light"],
  },
  
  plugins: [require("daisyui")],
}

