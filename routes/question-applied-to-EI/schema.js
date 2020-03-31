/* istanbul ignore file */

const Schema = {
  applied_to_EI : {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['1', '2', '3']],
    },
  },
}


module.exports = {
  Schema,
}
