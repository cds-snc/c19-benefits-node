/* istanbul ignore file */

const Schema = {
  some_income: {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['hours-reduced', 'selfemployed-lost-a-job', 'employed-part-time', 'retired', 'quarantine']],
    },
  },
}

module.exports = {
  Schema,
}
