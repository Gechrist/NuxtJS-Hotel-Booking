/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
  ],
  theme: {
    screens: {
      xs: '350px',
      sm: '370px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1800px',
    },
    extend: {
      fontFamily: {
        functional: ['Dosis', 'Arial'],
        presentational: ['Satisfy', 'Arial'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
