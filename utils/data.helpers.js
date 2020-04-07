const { getSessionData } = require('./session.helpers')
const { getFlashMessage } = require('./flash.message.helpers')

const getViewData = (req, optionalParams = {}) => {
  const params = {
    data: { ...getSessionData(req) },
  }

  const errors = getFlashMessage(req)

  if (errors) {
    params.errors = errors
  }

  return { ...params, ...optionalParams }
}

const getLastPage = (req) => {
  const referrer = req.get('Referrer')
  const host = req.get('host')
  const lastPage = (referrer && referrer.includes(host)) ? referrer : null

  return {
    lastPage: lastPage,
  }
}

module.exports = {
  getViewData,
  getLastPage,
}
