const { routeUtils } = require('./../../utils')
const { Schema } = require('./schema.js')
// const { getBenefits } = require('./getBenefits');

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      // const data = getSessionData(req)
      // const benefits = getBenefits(data);
      const benefits = ['ei_workshare', 'ei_sickness_cerb', 'ei_regular', 'ei_regular_cerb', 'cerb'];
      res.render(name, routeUtils.getViewData(req, {
        benefits: benefits,
      }))
    })
    .post(route.applySchema(Schema), route.doRedirect())
}
