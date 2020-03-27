// 1) add your route(s) here ⬇️
const routes = [
  { name: 'start', path: { en: '/start', fr: '/debut' } },
  { name: 'personal', path: { en: '/personal', fr: '/personnel' } },
  { name: 'confirmation', path: '/confirmation' },
  { name: 'question-eligible-for-ei', path: { en: '/question-eligible-for-ei', fr: '/fr/question-eligible-for-ei' } },
  { name: 'question-sick-or-quarantine', path: { en: '/question-sick-or-quarantine', fr: '/fr/question-sick-or-quarantine' } },
  { name: 'question-leave-voluntarily', path: { en: '/question-leave-voluntarily', fr: '/fr/question-leave-voluntarily' } },
  { name: 'result-cerb', path: { en: '/result-cerb', fr: '/fr/result-cerb' } },
  { name: 'result-ei-regular', path: { en: '/result-ei-regular', fr: '/fr/result-ei-regular' } },
]

const locales = ['en', 'fr']

// note: you can define and export a custom configRoutes function here
// see route.helpers.js which is where the default one is defined
// if configRoutes is defined here it will be used in pacle of the default

module.exports = {
  routes,
  locales,
}
