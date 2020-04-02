const { routeUtils } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      res.render(name, routeUtils.getViewData(req, {}))
    })
    .post(route.applySchema(Schema), postSomeIncome)
}

const postSomeIncome = (req, res) => {

  if (['1', '3'].includes(req.body.some_income)) {
    return res.redirect(res.locals.routePath('question-gross-income'))
  }

  if (req.body.some_income === '2') {
    return res.redirect(res.locals.routePath('question-rrif'))
  }
  
}