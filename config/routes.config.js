// 1) add your route(s) here ⬇️
const routes = [
  { name: 'start', path: { en: '/start', fr: '/debut' } },
  { name: 'question-mortgage-payments', path: { en: '/mortgage-payments', fr: '/paiement-hypothecaire' } },
  { name: 'question-gst', path: { en: '/GST', fr: '/TPS' } },
  { name: 'question-ccb', path: { en: '/CCB', fr: '/ARC' } },
  { name: 'question-student-debt', path: { en: '/student-debt', fr: '/dette-des-etudiants' } },
]

const locales = ['en', 'fr']

// note: you can define and export a custom configRoutes function here
// see route.helpers.js which is where the default one is defined
// if configRoutes is defined here it will be used in pacle of the default

module.exports = {
  routes,
  locales,
}
