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
        benefits: benefits,
        no_results: benefits.length === 0,
        no_cerb: getNoCerb(data),
        hideBackButton: true,
      }))
    })
    .post(route.applySchema(Schema), route.doRedirect())
}
