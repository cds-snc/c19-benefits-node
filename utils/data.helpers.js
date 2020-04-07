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
  const lastPage = req.get('Referrer').includes(req.get('host')) ? req.get('Referrer') : null

  return {
    lastPage: lastPage,
  }
}

module.exports = {
  getViewData,
  getLastPage,
}
