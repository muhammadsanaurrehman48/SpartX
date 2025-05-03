module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#3498db',
          secondary: '#2c3e50',
          accent: '#e74c3c',
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }