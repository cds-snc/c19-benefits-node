// 1) add your route(s) here ⬇️
const routes = [
  { name: 'start', path: { en: '/start', fr: '/debut' } },
  { name: 'question-3', path: { en: '/question-3', fr: '/question-3' } },
  { name: 'question-4', path: { en: '/question-4', fr: '/question-4' } },
  { name: 'question-5', path: { en: '/question-5', fr: '/question-5' } },
  { name: 'question-6', path: { en: '/question-6', fr: '/question-6' } },
]

const locales = ['en', 'fr']

// note: you can define and export a custom configRoutes function here
// see route.helpers.js which is where the default one is defined
// if configRoutes is defined here it will be used in pacle of the default

module.exports = {
  routes,
  locales,
}
