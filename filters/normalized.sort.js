const normalizedSort = (env) => {
  env.addFilter('normalizedSort', (values, attribute, locale) => {
    return values.sort((a,b) => a[attribute].localeCompare(b[attribute],locale))
  })
}

module.exports = {
  normalizedSort,
}
