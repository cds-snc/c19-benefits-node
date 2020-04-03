/* istanbul ignore file */

const Schema = {
  unchanged_income: {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['wfh', 'paid-leave', 'retired']],
    },
  },
}

module.exports = {
  Schema,
}
