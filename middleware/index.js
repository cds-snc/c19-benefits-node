const domainRedirector = require('./domainRedirector')
const languageLink = require('./languageLinkHelper')
const session = require('./session')
const logger = require('./logger')
const errorHandler = require('./errorHandler')
const csrfToken = require('./csrfToken')
const assetPath = require('./assetPath')
const assetVersion = require('./assetVersion')
const featureFlags = require('./featureFlags')

module.exports = {
  ...domainRedirector,
  ...languageLink,
  ...session,
  ...logger,
  ...errorHandler,
  ...csrfToken,
  ...assetPath,
  ...assetVersion,
  ...featureFlags,
}
