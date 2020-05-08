const uuidv4 = require('uuid').v4

const session = (req, res, next) => {
  // set a unique user id per session
  if (!req.session.id) req.session.id = uuidv4()

  // add user session req.locals so that the logger has access to it
  req.locals = { session: req.session }

  next()
}

module.exports = {
  session,
}
