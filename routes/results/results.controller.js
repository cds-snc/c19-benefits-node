const { routeUtils, getSessionData } = require('./../../utils')
const { Schema } = require('./schema.js')
const { getBenefits, getNoCerb } = require('./getBenefits');

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      const data = getSessionData(req)
      const benefits = getBenefits(data);
      let title = res.__n('results_title', benefits.length);

      if (getNoCerb(data)) {
        title = res.__('results_title_no_cerb');
      }

      if (benefits.length === 0) {
        title = res.__('results_title_no_results');
      }

      res.render(name, routeUtils.getViewData(req, {
        benefits: benefits,
        no_results: benefits.length === 0,
        no_cerb: getNoCerb(data),
        hideBackButton: true,
        title: title,
      }))
    })
    .post(route.applySchema(Schema), route.doRedirect())
}
