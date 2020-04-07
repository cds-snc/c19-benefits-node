const { routeUtils } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      res.render(name, routeUtils.getViewData(req, { lastPage: req.get('Referrer') }))
    })
    .post(route.applySchema(Schema), postSomeIncome)
}

const postSomeIncome = (req, res) => {

  if (['hours-reduced', 'employed-lost-a-job'].includes(req.body.some_income)) {
    return res.redirect(res.locals.routePath('question-gross-income'))
  }

  if (req.body.some_income === 'retired') {
    return res.redirect(res.locals.routePath('question-rrif'))
  }
  
}