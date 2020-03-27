/* istanbul ignore file */

const Schema = {
  leave_voluntarily : {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['leave_voluntarily.yes', 'leave_voluntarily.no']],
    },
  },
}

module.exports = {
  Schema,
}
