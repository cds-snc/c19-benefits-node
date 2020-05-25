const errorHandler = (appInsights) => (err, req, res, next) => {
  // istanbul ignore next
  if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
    appInsights.trackException({ exception: err })
  }

  res.locals.err = err
  next(err)
}

module.exports = {
  errorHandler,
}
