const { routeUtils } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      res.render(name, routeUtils.getViewData(req, {}))
    })
    .post(route.applySchema(Schema), (req, res) => {
      if (req.body.gross_income === '5k+') {
        return res.redirect(res.locals.routePath('question-days-stopped-working'))
      }

      return res.redirect(res.locals.routePath('question-mortgage-payments'))
    })
}
