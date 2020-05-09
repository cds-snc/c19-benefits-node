const { routes } = require('../config/routes.config')
const { getNextRouteURL } = require('../utils/router.helpers')
const i18n = require('i18n')

const routeHelpers = (req, res, next) => {
  res.locals.routePath = (nameOrObj) => {
    if (typeof nameOrObj === 'string') {
      nameOrObj = routes[nameOrObj]
    }
    return nameOrObj.path[i18n.getLocale()]
  }

  res.locals.nextRoute = (route) => {
    return getNextRouteURL(route, req);
  }

  next()
}

module.exports = {
  routeHelpers,
}
