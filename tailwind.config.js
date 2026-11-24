// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,  // Center the container horizontally
        padding: '2rem',  // Add padding to the container
        screens: {
          sm: '100%', // Small screens full width
          md: '750px', // Medium screens at 750px width
          lg: '900px', // Large screens at 900px width
          xl: '1100px', // Extra large screens at 1100px width
        },
      },
      colors: {
        primary: '#D96B43',
        secondary: '#155724',
        accent: '#856404',
        purple: '#6f42c1',    // Dark Purple for icons
        green: '#00FF66',    // Dark Purple for icons
      },
      backgroundColor: {
        'custom-blue': '#e3f2fd',  // Light Blue
        'custom-green': '#00FF66', // Light Green
        'custom-yellow': '#fff3cd', // Light Yellow
        'custom-purple': '#f3e6f5', // Light Purple
      },
    },
  },
  plugins: [],
}
