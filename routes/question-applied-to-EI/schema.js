/* istanbul ignore file */

const Schema = {
  applied_to_EI : {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['You’re already receiving EI benefits.', 'You’ve applied for EI benefits, but haven’t heard back.', 'No.']],
    },
  },
}


module.exports = {
  Schema,
}
