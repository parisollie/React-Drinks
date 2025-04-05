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
        //V-314 el back ground,paso 2.4 ponemos la imagen
        "header": "url('/bg.jpg')"
      }
    },
  },
  plugins: [],
}
