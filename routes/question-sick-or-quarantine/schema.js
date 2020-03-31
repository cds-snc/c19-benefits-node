/* istanbul ignore file */

const Schema = {
  sick_or_quarantine : {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['sick_or_quarantine.yes', 'sick_or_quarantine.no']],
    },
  },
}

module.exports = {
  Schema,
}
