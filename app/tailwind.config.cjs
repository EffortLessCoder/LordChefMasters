/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'Register': '250px',
      },
      height : {
        'Register' : '350px',
      },
    },
  },
  plugins: [],
}
