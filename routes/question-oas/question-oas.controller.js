const { routeUtils } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      res.render(name, routeUtils.getViewData(req, {
        siteUrl: req.protocol + '://' + req.get('host'),
        title:res.__("oas.title"),
      }))
    })
    .post(route.applySchema(Schema), route.doRedirect())
}
