/* istanbul ignore file */

const Schema = {
  leave_voluntarily : {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['1', '2']],
    },
  },
}

module.exports = {
  Schema,
}
