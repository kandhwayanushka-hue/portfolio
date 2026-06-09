/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#050505',
        'bg-secondary': '#0f0f0f',
        'text-primary': '#fafafa',
        'text-secondary': '#737373',
        'accent': '#00d4ff',
        'accent-pink': '#ff2d55',
      },
      fontFamily: {
        'display': ['Clash Display', 'sans-serif'],
        'body': ['Satoshi', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}