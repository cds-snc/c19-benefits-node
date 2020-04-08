const { routeUtils } = require('../../utils/index')

module.exports = (app, route) => {
  const name = route.name

  // redirect from "/" → "/start"
  app.get('/', (req, res) => res.redirect(route.path[req.locale]))
  app.get('/en', (req, res) => res.redirect(route.path.en))
  app.get('/fr', (req, res) => res.redirect(route.path.fr))

  route.draw(app).get(async (req, res) => {
    req.session = null;
    
    res.render(name, routeUtils.getViewData(req, { hideBackButton: true }))
  })
}
