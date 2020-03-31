/* istanbul ignore file */

const Schema = {
  why_stop_working : {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['1', '2', '3', '4', '5', '6']],
    },
  },
}

module.exports = {
  Schema,
}
