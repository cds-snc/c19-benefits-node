const { routeUtils } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      res.render(name, routeUtils.getViewData(req, {
        siteUrl: req.protocol + '://' + req.get('host'),
        title:res.__('reduced_income.title'),
      }))
    })
    .post(route.applySchema(Schema), (req, res) => {
      return res.redirect(res.locals.routePath('question-mortgage-payments'))
    })
}
