const { routeUtils } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      // do something to calculate which benefits to display
      const benefits = ['ccb_payment', 'ei_sickness'];
      
      res.render(name, routeUtils.getViewData(req, {
        benefits: benefits,
      }))
    })
    .post(route.applySchema(Schema), route.doRedirect())
}
