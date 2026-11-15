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
        dark: "#0a0a0a",
        light: "#f5f5f5",
        primary: "#062F2B",
        primaryDark: "#020F0E",
      },
      keyframes: {
        blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0' } },
        talk: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-1.5px) rotate(0.25deg)' },
        },
        wave: { '0%, 100%': { transform: 'scaleY(0.25)' }, '50%': { transform: 'scaleY(1)' } },
        shimmer: { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-200% 0' } },
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        blink: 'blink 1s step-end infinite',
        talk: 'talk 1.6s ease-in-out infinite',
        wave: 'wave 0.9s ease-in-out infinite',
        shimmer: 'shimmer 2.2s linear infinite',
      },
      backgroundImage:{
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
