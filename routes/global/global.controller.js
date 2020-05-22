const { simpleRoute } = require('../../utils/route.helpers')

module.exports = (app, table) => {
  app.get('/test-500', (req, res) => {
    throw new Error('something bad')
  })

  app.get('/clear', (req, res) => {
    req.session.formdata = null
    res.redirect(302, '/')
  })

  // fall-through 404
  app.use(function (req, res, next) {
    res.status(404)

    let message = false

    const routePath = req.path
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'production') {
      message = `❌ Forgot to add this route? \n\nAdd the following to config/routes.config.js: \n\nconst routes = [{ name: "${routePath}", path: "${routePath}" }]\n ...\n configRoutes(app){\n  require("../routes${routePath}${routePath}.controller")(app);\n}`
    }

    res.locals.simpleRoute = (name, locale) => simpleRoute(name, locale)
    res.locals.hideBackButton = true
    res.render('404', { message })
  })
}
