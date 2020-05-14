/* istanbul ignore file */

const Schema = {
  oas: {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['yes', 'no', 'unsure']],
    },
  },
}

module.exports = {
  Schema,
}
