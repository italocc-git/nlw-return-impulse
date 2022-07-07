module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    screens: {
      sm: '320px',
      md: '600px',
      lg: '976px'
    },
    extend: {
      colors: {
        brand: {
          "300": "#996dff",
          "500": "#8257e5"
        }
      },
      borderRadius: {
        md: '4px'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')
  ],
}
