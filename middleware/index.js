const domainRedirector = require('./domainRedirector')
const languageLink = require('./languageLinkHelper')
const session = require('./session')
const logger = require('./logger')
const errorHandler = require('./errorHandler')
const csrfToken = require('./csrfToken')

module.exports = {
  ...domainRedirector,
  ...languageLink,
  ...session,
  ...logger,
  ...errorHandler,
  ...csrfToken,
}
