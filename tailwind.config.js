/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'slate-100':'rgb(233,233,233)',
        'blue' : 'rgba(17, 117, 255, 1)'
      },
      boxShadow: {
        '2xl': '0px 4px 7px 1px #2c293f',
      },
      backgroundColor: {
        'custom-gray': 'rgb(233, 233, 233)',
      },

    },
  },
  plugins: [],
}