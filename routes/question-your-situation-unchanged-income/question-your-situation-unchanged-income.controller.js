const { routeUtils } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      res.render(name, routeUtils.getViewData(req, {
        title: res.__('unchanged_income.title'),
      }))
    })
    .post(route.applySchema(Schema), postUnchangedIncome)
}

const postUnchangedIncome = (req, res) => {
  if (['wfh', 'paid-leave', 'student_2019_20'].includes(req.body.unchanged_income)) {
    return res.redirect(res.locals.routePath('question-mortgage-payments'))
  }

  if (req.body.unchanged_income === 'retired') {
    return res.redirect(res.locals.routePath('question-rrif'))
  }

}