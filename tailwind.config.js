/** @type {import('tailwindcss').Config} */

const {fontFamily} = require('tailwindcss/defaultTheme')
module.exports = {
  darkMode:'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
     "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        mont:['var(--font-mont)', ...fontFamily.sans]
      },
      colors: {
        customRed:"#FF0000",
        ScarletRed:"#D81B60",

        customBlue:"#0000FF",

        dark: "#1b1b1b",
        light: "#f5f5f5",
        primary: "#062F2B", 
        primaryDark: "#020F0E", 
    },
    animation: {
      'spin-slow' : 'spin 8s linear infinite',
    },
    backgroundImage:{
      circularLight: 'repeating-radial-gradient(rgba(0,0,0,0.4) 2px, var(--light) 5px, var(--light) 90px);',
      circularDark: "repeating-radial-gradient(rgba(255,255,255,0.4) 2px, var(--dark) 5px, var(--dark) 90px);",

    }
    },
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "639px" },
      xs: { max: "479px" },
      xxs: { min: "639px" },

  },
  },
  plugins: [],
}

