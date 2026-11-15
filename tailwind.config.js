/** @type {import('tailwindcss').Config} */

const {fontFamily} = require('tailwindcss/defaultTheme')
module.exports = {
  darkMode:'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily:{
        mont:['var(--font-mont)', ...fontFamily.sans],
        mono:['var(--font-mono)', ...fontFamily.mono],
      },
      colors: {
        dark: "#1b1b1b",
        light: "#f5f5f5",
        primary: "#062F2B",
        primaryDark: "#020F0E",
      },
      keyframes: {
        blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0' } },
        glow: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1) rotate(0deg)' },
          '50%': { opacity: '0.75', transform: 'scale(1.08) rotate(20deg)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        blink: 'blink 1s step-end infinite',
        glow: 'glow 9s ease-in-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
      },
      backgroundImage:{
        circularLight: 'repeating-radial-gradient(rgba(0,0,0,0.4) 2px, var(--light) 5px, var(--light) 90px);',
        circularDark: "repeating-radial-gradient(rgba(255,255,255,0.4) 2px, var(--dark) 5px, var(--dark) 90px);",
        'ai-gradient': 'linear-gradient(90deg, #7c3aed, #d946ef, #06b6d4)',
      }
    },
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "639px" },
      xs: { max: "479px" },
    },
  },
  plugins: [],
}
