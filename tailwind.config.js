const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    flowbite.content(),
    "./src/components/Footer.jsx",
    "./src/components/Navbar.jsx",
    "./src/components/ImageHome.jsx",
    "./src/components/FixedTabHome.jsx",
    "./src/components/FormLogin.jsx",
    "./src/components/FormRegister.jsx",
    "./src/components/CardHome.jsx",
    "./src/components/CardProfile.jsx"
  ],
  plugins: [
    flowbite.plugin(),
  ],
  theme: {
    extend: {
      colors: {
        lightblue: {
          100: '#ADD8E6'
        },
        cyan : {
          900 : '#164E63'
        },
      },
      fontFamily: {
        nunito: ['"Nunito"', 'serif'], // Tambahkan font baru
      },
    }
  }
};