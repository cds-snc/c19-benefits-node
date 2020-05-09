const { setLocale } = require('../../middleware/setLocale');

module.exports = (app) => {
  // run setLocale middleware on all routes
  app.all('/:lang(en|fr)/*', setLocale);

  app.get('/test-500', (req, res) => {
    throw new Error('something bad')
  })

  app.get('/clear', (req, res) => {
    req.session = null
    res.redirect(302, '/')
  })
}
