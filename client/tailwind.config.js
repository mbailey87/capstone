// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Ensure this path matches your project structure
  ],
  theme: {
    extend: {
      colors: {
        purple: "#6B46C1",
        gold: "#d1a855"
      },
    },
  },
  plugins: [],
}
