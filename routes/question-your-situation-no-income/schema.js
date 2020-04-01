/* istanbul ignore file */

const Schema = {
  no_income: {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['1', '2', '3', '4', '5', '6']],
    },
  },
}

module.exports = {
  Schema,
}
