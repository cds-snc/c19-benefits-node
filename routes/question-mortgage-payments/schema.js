/* istanbul ignore file */

const Schema = {
  mortgage_payments: {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['1', '2', '3']],
    },
  }, 
}

module.exports = {
  Schema,
}
