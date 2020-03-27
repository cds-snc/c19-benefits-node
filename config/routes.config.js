// 1) add your route(s) here ⬇️
const routes = [
  { name: 'start', path: { en: '/start', fr: '/debut' } },
  { name: 'question-lost-job-c19', path: { en: '/lost-job-c19',  fr: '/lost-job-c19'}},
  { name: 'question-why-stop-working', path: { en: '/why-stop-working',  fr: '/why-stop-working'}},
  { name: 'question-your-situation', path: { en: '/your-situation',  fr: '/your-situation'}},
  { name: 'question-applied-to-EI', path: { en: '/applied-to-EI',  fr: '/applied-to-EI'}},
  { name: 'personal', path: { en: '/personal', fr: '/personnel' } },
  { name: 'confirmation', path: '/confirmation' },
]

const locales = ['en', 'fr']

// note: you can define and export a custom configRoutes function here
// see route.helpers.js which is where the default one is defined
// if configRoutes is defined here it will be used in pacle of the default

module.exports = {
  routes,
  locales,
}
