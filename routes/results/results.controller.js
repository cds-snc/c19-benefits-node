const { routeUtils } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      /**
       * Do something to calculate what benefits user
       * is eligible for, then pass array into view.
       *
       * Possible benefits:
       * ccb_payment, cerb, ei_regular, ei_sickness, gst_credit, 
       * mortgage_deferral, rent_help, rrif, student_loan
       */
      const benefits = [
        'cerb', 
        'ei_sickness', 
        'gst_credit', 
        'ccb_payment',
        'ei_regular',
        'ei_workshare',
        'mortgage_deferral',
        'rent_help',
        'rrif',
        'student_loan' ];

      res.render(name, routeUtils.getViewData(req, {
        benefits: benefits,
      }))
    })
    .post(route.applySchema(Schema), route.doRedirect())
}
