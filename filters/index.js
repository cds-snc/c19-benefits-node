const { spreadParams } = require('./spread.params')
const { lastModified } = require('./last.modified')

const addNunjucksFilters = (env) => {
  spreadParams(env)
  lastModified(env)
}

module.exports = {
  addNunjucksFilters,
}
