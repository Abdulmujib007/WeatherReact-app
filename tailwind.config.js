/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        whitly:'#e9f4fe',
        whiter:'#f3f9ff'
      }
    },
    screens: {
      mobile:'320px',
      tablet:'690px',
      laptop:'860px',

    }
  },  
  plugins: [],
}

