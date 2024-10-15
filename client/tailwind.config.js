/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors:{

        bgLight:'#F0F5F7',
        textLight:'white',
        secondaryLight:'#162623',
        primaryLight:"#295255",
        buttonLight:"577877",

        bgDark:'#193940',
        textDark:'#F0F5F7',
        secondaryDark:'#BAC8D9',
        primaryDark:"#9BF272",
        buttonDark:"#7ABF5A",

      }

    },
  },
  plugins: [],
}