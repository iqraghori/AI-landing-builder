module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],

  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        gradient: 'gradient 6s ease infinite', // speed here
      },
      backgroundSize: {
        '200%': '200% 200%',
      },
    },
  },
}


