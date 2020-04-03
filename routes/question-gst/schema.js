/* istanbul ignore file */

const Schema = {
  gst: {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['yes', 'no', 'unsure']],
    },
  }, 
}

module.exports = {
  Schema,
}
