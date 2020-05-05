const { getSessionData } = require('../../utils')

module.exports = (app, route) => {
  route.draw(app)
    .get((req, res) => {
      // serialize the data object and throw it up on url
      const data = getSessionData(req)
      const encoded = { results: Buffer.from(JSON.stringify(data)).toString('base64')};
      const benefitsParam = new URLSearchParams(encoded);


      // then redirect to results
      return res.redirect(res.locals.routePath('results') + '?' + benefitsParam);
    })
}
