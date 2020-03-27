/* istanbul ignore file */

const Schema = {
  why_stop_working : {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['why_stop_working.1', 'why_stop_working.2', 'why_stop_working.3', 'why_stop_working.4', 'why_stop_working.5', 'why_stop_working.6']],
    },
  },
}

module.exports = {
  Schema,
}
