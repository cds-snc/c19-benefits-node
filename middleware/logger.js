
function addLogger(req, res, next) {

  req.locals.log = (msg) => {
    const logObject = {}
    if (req.locals.session.id) {
      logObject.id = req.locals.session.id
    }

    if (msg) {
      logObject.msg = msg
    }
  }

  next()
}

module.exports = addLogger
