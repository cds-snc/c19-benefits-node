const { routeUtils, getDomain } = require('../../utils/index')
const { getRoutePathDefinition } = require('../../utils/router.helpers')

module.exports = (app, route) => {
  app.get('/', (req, res) => {
    const domain = getDomain(req)

    // if on the French domain, redirect to the /fr start page
    // istanbul ignore next
    if (domain.includes(process.env.DOMAIN_FR)) {
      return res.redirect(`${domain}${route.path.fr}`)
    }

    res.redirect(route.path[req.locale])
  })

  app.get('/en', (req, res) => res.redirect(route.path.en))
  app.get('/fr', (req, res) => res.redirect(route.path.fr))

  app.get(getRoutePathDefinition(route), async (req, res) => {
    req.session = null

    res.render(route.name, routeUtils.getViewData(req, {
      route: route,
      hideBackButton: true,
      title: res.__('start.title'),
    }))
  })
}
