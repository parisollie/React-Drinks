/** @type {import('tailwindcss').Config} 
 * V-305,paso 1.0 Instalamos Tailwind
*/
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        //Vid 314 el back ground
        "header": "url('/bg.jpg')"
      }
    },
  },
  plugins: [],
}
