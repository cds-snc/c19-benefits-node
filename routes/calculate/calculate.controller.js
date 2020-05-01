const { getSessionData } = require('./../../utils')
const { getBenefits } = require('./getBenefits');

module.exports = (app, route) => {
  route.draw(app)
    .get((req, res) => {
      const data = getSessionData(req)
      const benefits = getBenefits(data);

      // const benefitsParam = new URLSearchParams(benefits);

      console.log(benefits);


      return res.redirect(res.locals.routePath('results') + '?benefits=' + benefits);
    })
}
