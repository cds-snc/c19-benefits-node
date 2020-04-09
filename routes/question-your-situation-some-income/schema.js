/* istanbul ignore file */

const Schema = {
  some_income: {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['hours-reduced', 'employed-lost-a-job', 'retired', 'quarantine']],
    },
  },
}

module.exports = {
  Schema,
}
