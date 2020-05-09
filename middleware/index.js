const domainRedirector = require('./domainRedirector')
const session = require('./session')
const logger = require('./logger')
const errorHandler = require('./errorHandler')
const csrfToken = require('./csrfToken')
const { setLocale } = require('./setLocale')
const { routeHelpers } = require('./route')

module.exports = {
  ...domainRedirector,
  ...session,
  ...logger,
  ...errorHandler,
  ...csrfToken,
  ...setLocale,
  ...routeHelpers,
}
