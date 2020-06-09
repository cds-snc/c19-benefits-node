const { spreadParams } = require('./spread.params')
const { lastUpdated } = require('./last.updated')
const { normalizedSort } = require('./normalized.sort')

const addNunjucksFilters = (env) => {
  spreadParams(env)
  lastUpdated(env)
  normalizedSort(env)
}

module.exports = {
  addNunjucksFilters,
}
