const { routeUtils } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      res.render(name, routeUtils.getViewData(req, {}))
    })
    .post(route.applySchema(Schema), postLostJob)
}

const postLostJob = (req, res) => {
  // validator should catch if it's not 1,2, or 3
  if (req.body.lost_job === '1') {
    return res.redirect(res.locals.routePath('question-your-situation-no-income'))
  }

  if (req.body.lost_job === '2') {
    return res.redirect(res.locals.routePath('question-your-situation-some-income'))
  }

  return res.redirect(res.locals.routePath('question-your-situation-unchanged-income'))

}
