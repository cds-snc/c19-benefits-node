const { spreadParams } = require('./spread.params')
const { lastUpdated } = require('./last.updated')

const addNunjucksFilters = (env) => {
  spreadParams(env)
  lastUpdated(env)
}

module.exports = {
  addNunjucksFilters,
}
