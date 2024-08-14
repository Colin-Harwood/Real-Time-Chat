/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#EEEEEE',
        'light-blue': '#508C9B',
        'dark-blue': '#134B70',
        'purple': '#201E43',
      },
    },
  },
  plugins: [],
}

