const { getSessionData } = require('../../utils')
const { encryptQuerystring } = require('../../utils/url.helpers')

module.exports = (app, route) => {
  route.draw(app)
    .get((req, res) => {
      // serialize the data object and throw it up on url
      const data = getSessionData(req)
      const benefitsParam = new URLSearchParams(data);
      console.log(benefitsParam.toString());
      const encryptedParam = encryptQuerystring(benefitsParam.toString());

      // then redirect to results
      return res.redirect(res.locals.routePath('results') + '?data=' + encryptedParam);
    })
}
