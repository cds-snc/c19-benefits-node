/* istanbul ignore file */

const Schema = {
  no_income: {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['lost-job-employer-closed', 'self-employed-closed', 'unpaid-leave-to-care', 'sick-or-quarantined', 'parental-recently-cant-return', 'ei-recently-claim-ended']],
    },
  },
}

module.exports = {
  Schema,
}