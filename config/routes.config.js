// 1) add your route(s) here ⬇️
const routes = [
  { name: 'start', path: { en: '/start', fr: '/debut' } },
  { name: 'question-lost-job-c19', path: { en: '/question/lost-job-c19',  fr: '/question/lost-job-c19'}},
  { name: 'question-why-stop-working', path: { en: '/question/why-stop-working',  fr: '/question/why-stop-working'}},
  { name: 'question-your-situation', path: { en: '/question/your-situation',  fr: '/question/your-situation'}},
  { name: 'question-applied-to-EI', path: { en: '/question/applied-to-EI',  fr: '/question/applied-to-EI'}},
  { name: 'personal', path: { en: '/personal', fr: '/personnel' } },
  { name: 'confirmation', path: '/confirmation' },
  { name: 'question-eligible-for-ei', path: { en: '/question/eligible-for-ei', fr: '/fr/question/eligible-for-ei' } },
  { name: 'question-sick-or-quarantine', path: { en: '/question/sick-or-quarantine', fr: '/fr/question/sick-or-quarantine' } },
  { name: 'question-leave-voluntarily', path: { en: '/question/leave-voluntarily', fr: '/fr/question/leave-voluntarily' } },
  { name: 'result-cerb', path: { en: '/result/cerb', fr: '/fr/result/cerb' } },
  { name: 'result-ei-regular', path: { en: '/result/ei-regular', fr: '/fr/result/ei-regular' } },
  { name: 'result-ei-sickness', path: { en: '/result/ei-sickness', fr: '/result/ei-sickness'}},
  { name: 'result-ccb-and-gst', path: { en: '/result/ccb-and-gst', fr: '/result/ccb-and-gst'}},
  { name: 'result-keep-receiving-ei', path: { en: '/result/keep-receiving-ei', fr: '/result/keep-receiving-ei'}},
  { name: 'result-waiting-to-hear-back-from-ei', path: { en: '/result/waiting-to-hear-back-from-ei', fr: '/result/waiting-to-hear-back-from-ei'}},
  { name: 'result-left-job-voluntarily', path: { en: '/result/left-job-voluntarily', fr: '/result/left-job-voluntarily'}},
]

const locales = ['en', 'fr']

// note: you can define and export a custom configRoutes function here
// see route.helpers.js which is where the default one is defined
// if configRoutes is defined here it will be used in pacle of the default

module.exports = {
  routes,
  locales,
}
