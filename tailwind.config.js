/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'eagles-gold': '#D4AF37',
        'eagles-black': '#1a1a1a',
        'eagles-blue': '#4A90E2',
      },
    },
  },
  plugins: [],
}
