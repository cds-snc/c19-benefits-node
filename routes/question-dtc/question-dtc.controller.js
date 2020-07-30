const { routeUtils } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      res.render(name, routeUtils.getViewData(req, {
        title: res.__('dtc.title'),
      }))
    })
    .post(route.applySchema(Schema), (req, res) => {

      let path
      if (req.body.dtc === "yourself") {
        path = res.locals.routePath('question-dtc-individual')        
      } else if (req.body.dtc === "child") {
        path = res.locals.routePath('question-dtc-child')
      } else {
        path = res.locals.routePath('prepare')
      }

      return res.redirect(path)
    })
}
