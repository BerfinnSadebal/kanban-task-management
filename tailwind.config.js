/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,tsx,jsx}",
    "./src/components/**/*.{js,ts,tsx,jsx}",
    "./src/app/**/*.{js,ts,tsx,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kanban-bg': '#F4F5F7',
        'kanban-column': '#EBECF0',
      }
    },
  },
  plugins: [],
}
