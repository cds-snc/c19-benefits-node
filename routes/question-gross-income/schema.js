/* istanbul ignore file */

const Schema = {
  gross_income: {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['under4999', '5k+']],
    },
  }, 
}

module.exports = {
  Schema,
}
