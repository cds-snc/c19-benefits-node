const { getSessionData } = require('./session.helpers')
const { getFlashMessage } = require('./flash.message.helpers')

const getViewData = (req, optionalParams = {}) => {
  const params = {
    data: { ...getSessionData(req) },
    path: req.path,
  }

  const errors = getFlashMessage(req)

  if (errors) {
    params.errors = errors
  }

  return { ...params, ...optionalParams }
}

module.exports = {
  getViewData,
}
