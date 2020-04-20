const cssnano = require('cssnano')
const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: ['./routes/**/*.njk', './views/**/*.njk'],

  // Include any special characters you're using in this regular expression
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],

  // whitelist dynamic class names
  whitelist: [
    'banner--blue',
    'banner--blue__icon',
    'banner--red',
    'hide--desktop',
    'hide--mobile',
  ],
})

module.exports = {
  plugins: [
    require('@csstools/postcss-sass'),
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
    cssnano({
      preset: 'default',
    }),
  ],
}
