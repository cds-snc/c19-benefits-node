// 1) add your route(s) here ⬇️
const routes = [
  { name: 'start', path: { en: '/start', fr: '/debut' } },
  { name: 'question-lost-job', path: { en: '/lost-job', fr: '/lost-job' } },
  { name: 'question-your-situation-no-income', path: { en: '/your-situation/no-income', fr: '/your-situation/no-income' } },
  { name: 'question-your-situation-some-income', path: { en: '/your-situation/some-income', fr: '/your-situation/some-income' } },
  { name: 'question-your-situation-unchanged-income', path: { en: '/your-situation/unchanged-income', fr: '/your-situation/unchanged-income' } },
]

const locales = ['en', 'fr']

// note: you can define and export a custom configRoutes function here
// see route.helpers.js which is where the default one is defined
// if configRoutes is defined here it will be used in pacle of the default

module.exports = {
  routes,
  locales,
}
