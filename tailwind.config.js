/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./client/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@fortawesome/free-solid-svg-icons'),
    require('@fortawesome/free-brands-svg-icons'),
    require('@fortawesome/react-fontawesome')
  ],
}

