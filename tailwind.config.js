/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage : {
        //Vid 314 el back ground
        "header" : "url('/bg.jpg')"
      }
    },
  },
  plugins: [],
}
