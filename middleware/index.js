const domainRedirector = require('./domainRedirector')
const languageLink = require('./languageLinkHelper')
const session = require('./session')
const logger = require('./logger')
const errorHandler = require('./errorHandler')
const csrfToken = require('./csrfToken')
const { setLocale } = require('./setLocale')
const { routeHelpers } = require('./route')

module.exports = {
  ...domainRedirector,
  ...languageLink,
  ...session,
  ...logger,
  ...errorHandler,
  ...csrfToken,
  ...setLocale,
  ...routeHelpers,
}
