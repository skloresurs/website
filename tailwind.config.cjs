/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      backgroundImage: {
        sky: "url('/images/background.jpg')",
      },
      keyframes: {
        fadeup: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeup: 'fadeup 1s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
