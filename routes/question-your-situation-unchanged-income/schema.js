/* istanbul ignore file */

const Schema = {
  unchanged_income: {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['1', '2', '3']],
    },
  },
}

module.exports = {
  Schema,
}
