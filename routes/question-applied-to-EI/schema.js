/* istanbul ignore file */

const Schema = {
  applied_to_EI : {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['applied_to_EI.1', 'applied_to_EI.2', 'applied_to_EI.3']],
    },
  },
}


module.exports = {
  Schema,
}
