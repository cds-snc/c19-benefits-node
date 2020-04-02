const { routeUtils } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      res.render(name, routeUtils.getViewData(req, {}))
    })
    .post(route.applySchema(Schema), postUnchangedIncome)
}

const postUnchangedIncome = (req, res) => {
  if (['1','2'].includes(req.body.unchanged_income)) {
    return res.redirect(res.locals.routePath('question-ccb'))
  }

  if(req.body.unchanged_income === '3') {
    return res.redirect(res.locals.routePath('question-rrif'))
  }
  
}