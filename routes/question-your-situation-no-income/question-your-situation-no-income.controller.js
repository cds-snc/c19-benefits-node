const { routeUtils } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      res.render(name, routeUtils.getViewData(req, {}))
    })
    .post(route.applySchema(Schema), (req, res) => {
      if (['1','4','6'].includes(req.body.no_income)) {
        return res.redirect(res.locals.routePath('question-gross-income'))
      }

      return res.redirect(res.locals.routePath('question-mortgage-payments'))
    })
}
