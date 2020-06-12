const featureFlags = (req, res, next) => {

  req.locals.featureFlags = {
    enableDtc : process.env.FF_ENABLE_DTC || false,
  }

  next()
}

module.exports = {
  featureFlags,
}