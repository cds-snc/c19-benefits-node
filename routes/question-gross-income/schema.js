/* istanbul ignore file */

const Schema = {
  gross_income: {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['1', '2', '3']],
    },
  }, 
}

module.exports = {
  Schema,
}
