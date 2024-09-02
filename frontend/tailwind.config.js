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
      boxShadow: {
        custom: '5px 5px 5px 0px rgba(0, 0, 0, 0.8) ',
      },
      backgroundColor: {
        custom: '#666',
        customCard: '#444'
      },
      
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities([
        {
          '.no-scrollbar': {
            '&::-webkit-scrollbar': { display: 'none' },
            '&::-moz-scrollbar': { display: 'none' },
          },
        },
      ]);
    },
  ],
};
