/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custom_bg: '#F6F7F9',
        custom_white: '#FFFFFF',
        custom_text: '#90A3BF',
        custom_title: '#1A202C',
        custom_primary: '#3563E9',
        custom_icons: '#596780',
        custom_tint: '#D6E4FD',
        custom_border: '#C4C4C4',
        custom_red: '#ED3F3F',
        custom_gray: '#90A3BF'
      }
    },
  },
  plugins: [],
}

