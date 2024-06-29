/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: 'jit',

  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      screens: {
        "1000px":"1050px",
        "1100px":"1110px",
        "800px":"800px",
        "1300px":"1300px",
        "400px":"400px",
      },
      
      boxShadow: {
        custom: '5px 5px 5px 0px rgba(0, 0, 0, 0.8) ',
      },
      backgroundColor: {
        custom: '#666',
        customCard: '#444'
      },
      
    },
  },
  plugins: [],
};
