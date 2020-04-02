const { routeUtils, getSessionData } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      const data = getSessionData(req)
      console.log(data);
      const benefits = getBenefits(data);

      res.render(name, routeUtils.getViewData(req, {
        benefits: benefits,
      }))
    })
    .post(route.applySchema(Schema), route.doRedirect())
}

/* istanbul ignore next */
const getBenefits = (data) => {
  var results = [];

  // 2a
  if (data.lost_job === '1') {
    if (data.no_income === '1') {
      results.push('ei_regular_cerb')
    }

    if (data.no_income === '4') {
      results.push('ei_sickness_cerb')
    }

    if (['2', '3', '5'].includes(data.no_income)) {
      results.push('cerb')
    }

    if (data.no_income ==='6') {
      results.push('cerb')
    }
  }

  // 2b
  if (data.lost_job === '2') {
    if (data.some_income === '1') {
      if (['2', '3'].includes(data.gross_income)) {
        results.push('ei_workshare')
      }
    }

    if (data.some_income === '2') {
      // retired/rrif
    }

    if (data.some_income === '3') {
      // gross_income/days
    }
  }

  // 2c
  if (data.lost_job === '3') {
    // just the regular flow?
  }

  if (data.mortgage_payments === '1') {
    results.push('mortgage_deferral')
  }

  if (data.mortgage_payments === '2') {
    results.push('rent_help');
  }

  if (data.student_debt === '1') {
    results.push('student_loan')
  }

  if (data.gst === '1') {
    results.push('gst_credit')
  }

  if (data.ccb === '1') {
    results.push('ccb_payment')
  }

  if (data.rrif === '1') {
    results.push('rrif')
  }

  return results;
}
