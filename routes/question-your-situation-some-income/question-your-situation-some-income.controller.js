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

  if (req.body.some_income === '3') {
    return res.redirect(res.locals.routePath('question-gross-income'))
  }

  return res.redirect(res.locals.routePath('question-mortgage-payments'))
  
}