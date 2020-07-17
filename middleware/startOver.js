const startOver = (req, res, next) => {
  // show or hide the start over button on the results page
  if (req.path === '/en/start' || req.path === '/fr/debut') {
    res.locals.showStartOver = false
  } else {
    res.locals.showStartOver = true
  }

  next()
}

module.exports = {
  startOver,
}