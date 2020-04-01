/* istanbul ignore file */

const Schema = {
  "days_stopped_working": {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['1', '2']],
    },
  }, 
}

module.exports = {
  Schema,
}
