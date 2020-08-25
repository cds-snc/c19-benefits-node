const { routeUtils, pruneSessionData } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      res.render(name, routeUtils.getViewData(req, {
        title: res.__('cerb.title'),
      }))
    })
    .post(route.applySchema(Schema), (req, res) => {
      if (req.body.cerb === 'receiving-cerb') {
        return res.redirect(res.locals.routePath('question-cerb-exhausted'))
      }

      pruneSessionData(req, ['cerb-exhausted'])
      return res.redirect(res.locals.routePath('question-mortgage-payments'))
    })
}