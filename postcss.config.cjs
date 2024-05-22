module.exports = ({ env }) => ({
  plugins: [
    require('tailwindcss')({
      config: './src/assets/css/tailwind.config.js'
    }),    
    require('autoprefixer')()
  ],
})