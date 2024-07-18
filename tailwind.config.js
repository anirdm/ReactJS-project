/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
     extend: {
      colors: {
        'bright-white': '#f4f5f0',
        'flagstone': '#aba9a9',
        'blue-mana': '#5ec2f5',
      }
     },
  },
  plugins: [],
}

