const { simpleRoute } = require('../utils/route.helpers')
const winston = require('../config/winston.config');

const errorHandler = (appInsights) => (err, req, res, next) => {
  res.status(err.status || 500)

  // istanbul ignore next
  if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
    appInsights.trackException({ exception: err })
  }

  winston.error(JSON.stringify({
    'status': err.status,
    'message': err.message,
    'url': req.originalUrl,
    'method': req.method,
  }))

  res.locals.simpleRoute = (name, locale) => simpleRoute(name, locale)
  res.locals.hideBackButton = true

  res.render('500', {
    message: process.env.NODE_ENV !== 'production' ? err.message : false,
  })
}

module.exports = {
  errorHandler,
}