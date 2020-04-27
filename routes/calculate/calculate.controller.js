const { getBenefits } = require('./getBenefits');
const { getSessionData } = require('./../../utils')

module.exports = (app, route) => {

  route.draw(app)
    .get((req, res) => {
      const data = getSessionData(req)
      const benefits = getBenefits(data);


      route.doRedirect()
    });
}
