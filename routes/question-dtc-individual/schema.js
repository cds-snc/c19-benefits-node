/* istanbul ignore file */

const Schema = {
  dtc_individual: {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['yes', 'no']],
    },
  },
}

module.exports = {
  Schema,
}

