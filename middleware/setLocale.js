const oneHour = 1000 * 60 * 60 * 1

const getLangFromUrl = (req) => {
  return req.params.lang || 'en';
}

const setLocale = (req, res, next) => {
  const locale = getLangFromUrl(req);
  req.setLocale(locale)

  res.cookie('lang', locale, {
    httpOnly: true,
    maxAge: oneHour,
    sameSite: 'strict',
  })

  next()
}

module.exports = {
  setLocale,
}