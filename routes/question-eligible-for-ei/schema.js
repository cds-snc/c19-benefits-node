/* istanbul ignore file */

const Schema = {
  eligible_for_ei : {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['1', '2']],
    },
  },
}

module.exports = {
  Schema,
}
