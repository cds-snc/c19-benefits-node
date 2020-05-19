const { routeUtils, getSessionData } = require('./../../utils')
const { Schema } = require('./schema.js')
const { getBenefits } = require('./getBenefits')
const _ = require('lodash')

const getData = (req, res) => {
  /**
   * If there's querystring data use it,
   * otherwise get it from the session.
   */
  if (req.query === undefined || _.isEmpty(req.query)) {
    return getSessionData(req);
  }
  try {
    return JSON.parse(Buffer.from(req.query.q, 'base64').toString())
  } catch (err) {
    res.locals.log(`Thrown error: ${JSON.stringify(err)} Invalid QueryString ${JSON.stringify(req.query)}`)
    return {}
  }
}

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      const data = getData(req, res);
      const benefits = getBenefits(data);
      const provincial = data.province ? 'province-' + data.province : false;

      let title = res.__n('results_title', benefits.length);

      if (benefits.length === 0) {
        title = res.__('results_title_no_results');
      }

      res.render(name, routeUtils.getViewData(req, {
        benefits: benefits,
        provincial: provincial,
        no_results: benefits.length === 0,
        hideBackButton: true,
        title: title,
        data: data,
      }))
    })
    .post(route.applySchema(Schema), route.doRedirect())
}