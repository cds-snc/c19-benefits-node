/* istanbul ignore file */

const Schema = {
  gross_income: {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['4999_or_less', '5k+']],
    },
  }, 
}

module.exports = {
  Schema,
}
