/* istanbul ignore file */

const Schema = {
  gross_income: {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['under3k', '3k-5k', '5k+']],
    },
  }, 
}

module.exports = {
  Schema,
}
