const { logger } = require('../config/winston.config');

const errorHandler = (appInsights) => (err, req, res, next) => {
  // istanbul ignore next
  if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
    appInsights.trackException({ exception: err })
  }

  logger.error(JSON.stringify({
    'status': err.status,
    'message': err.message,
    'url': req.originalUrl,
    'method': req.method,
    'version': process.env.GITHUB_SHA,
  }))

  res.locals.err = err
  next(err)
}

module.exports = {
  errorHandler,
}
