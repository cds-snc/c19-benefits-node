/* istanbul ignore file */

const Schema = {
  some_income: {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [
        [
          'hours-reduced',
          'selfemployed-some-income',
          'employed-lost-a-job',
          'retired',
          'quarantine',
          'child-or-dependent-school-closed',
          'none-of-the-above',
        ],
      ],
    },
  },
}

module.exports = {
  Schema,
}
