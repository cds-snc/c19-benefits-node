const { routeUtils, getSessionData } = require('./../../utils')
const { Schema } = require('./schema.js')
const { getBenefits } = require('./getBenefits');

const getData = (req) => {
  /**
   * If there's querystring data use it,
   * otherwise get it from the session.
   */
  if (req.query) {
    return req.query;
  }

  return getSessionData(req);
}

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      const data = getData(req);
      const benefits = getBenefits(data);
      let title = res.__n('results_title', benefits.length);

      if (benefits.length === 0) {
        title = res.__('results_title_no_results');
      }

      res.render(name, routeUtils.getViewData(req, {
        benefits: benefits,
        no_results: benefits.length === 0,
        hideBackButton: true,
        title: title,
        data: data,
      }))
    })
    .post(route.applySchema(Schema), route.doRedirect())
}