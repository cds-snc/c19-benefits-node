const { routeUtils, getSessionData } = require('./../../utils')
const { Schema } = require('./schema.js')
const { getBenefits, getNoCerb } = require('./getBenefits');

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      const data = getSessionData(req)
      const benefits = getBenefits(data);

      res.render(name, routeUtils.getViewData(req, {
        benefits: ['ei_regular_cerb', 'rent_help', 'ccb_payment'],
        no_results: benefits.length === 0,
        no_cerb: getNoCerb(data),
      }))
    })
    .post(route.applySchema(Schema), route.doRedirect())
}
