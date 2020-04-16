const format = require('date-fns/format')
const isValid = require('date-fns/isValid')
const getDate = require('date-fns/getDate')
const { en, fr } = require('date-fns/locale')

const lastModified = (env) => {
  env.addFilter('lastmodified', _lastModified)
}

/**
 * Function used in a nunjucks filter.
 * Expects a date string and a locale string (defaults to "en").
 * Returns English dates like "April 16, 2020"
 * Returns French dates like "16 avril 2020"
 * EXCEPT for the first day of the month: "1er avril 2020"
 * If an invalid date is passed in, it will be returned unmodified
 *
 * @param {String} str a (date) string
 * @param {String} locale a locale string, ("en" or "fr")
 */
const _lastModified = (str, locale) => {
  const date = new Date(str)
  // return string unmodified if string passed in parseable as a Date
  if (!isValid(date)) return str

  if (locale === 'fr') {
    return getDate(date) === 1
      ? // for the first day of month, the formatting is slightly different
        format(date, 'do MMMM yyyy', { locale: fr })
      : format(date, 'd MMMM yyyy', { locale: fr })
  }

  return format(date, 'MMMM d, yyyy', { locale: en })
}

module.exports = {
  lastModified,
  _lastModified,
}
