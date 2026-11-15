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
        breathe: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-4px) scale(1.008)' },
        },
        talk: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-3px) rotate(-0.6deg)' },
          '75%': { transform: 'translateY(-1px) rotate(0.6deg)' },
        },
        wave: { '0%, 100%': { transform: 'scaleY(0.25)' }, '50%': { transform: 'scaleY(1)' } },
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        blink: 'blink 1s step-end infinite',
        breathe: 'breathe 5s ease-in-out infinite',
        talk: 'talk 0.9s ease-in-out infinite',
        wave: 'wave 0.9s ease-in-out infinite',
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
