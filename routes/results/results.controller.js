const { routeUtils, getSessionData } = require('./../../utils')
const { Schema } = require('./schema.js')
const { getBenefits, getProvincialBenefits } = require('./getBenefits')
const _ = require('lodash')
const glob = require('glob')
const path = require('path')

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

      const benefitList = [];

      // Get a list of all the benefit cards (except provincial)
      const files = glob.sync("**/*.njk", {
        cwd: path.join(__dirname, '../../views/benefits'),
        ignore: 'province-*',
      })

      // Grab the benefit name portion of the filename
      files.forEach((file) => {
        const fileParts = file.split('-');
        benefitList.push(fileParts[0]);
      })

      // We just the unique items in the list
      const benefitsFullList = benefitList.filter(function (item, pos) {
        return benefitList.indexOf(item) === pos;
      })

      const benefits = getBenefits(data);
      const unavailableBenefits = benefitsFullList.filter((benefit) => !benefits.includes(benefit))

      const provincial = getProvincialBenefits(data);

      let title = res.__n('results_title', benefits.length);

      if (benefits.length === 0) {
        title = res.__('results_title_no_results');
      }

      res.render(name, routeUtils.getViewData(req, {
        benefits: benefits,
        unavailableBenefits: unavailableBenefits,
        provincial: provincial,
        no_results: benefits.length === 0,
        hideBackButton: true,
        title: title,
        data: data,
      }))
    })
    .post(route.applySchema(Schema), route.doRedirect())
}