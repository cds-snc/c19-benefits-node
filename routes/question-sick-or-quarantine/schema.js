/* istanbul ignore file */

const Schema = {
  sick_or_quarantine : {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['1', '2']],
    },
  },
}

module.exports = {
  Schema,
}
