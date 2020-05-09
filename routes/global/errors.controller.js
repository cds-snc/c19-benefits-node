const { simpleRoute } = require('../../utils/route.helpers')

module.exports = (app) => {
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

  app.use(function (err, req, res, next) {
    res.status(500)

    console.error(`☠️ Error => ${err.message}`)

    let message = false

    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'production') {
      message = `❌ ${err.message}`
    }

    res.locals.simpleRoute = (name, locale) => simpleRoute(name, locale)
    res.locals.hideBackButton = true
    res.render('500', { message })
  })
}
