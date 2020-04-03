/* istanbul ignore file */

const Schema = {
  "days_stopped_working": {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['<14days', '>14days']],
    },
  }, 
}

module.exports = {
  Schema,
}
