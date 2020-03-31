/* istanbul ignore file */

const Schema = {
  eligible_for_ei : {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['eligible_for_ei.yes', 'eligible_for_ei.no']],
    },
  },
}

module.exports = {
  Schema,
}
