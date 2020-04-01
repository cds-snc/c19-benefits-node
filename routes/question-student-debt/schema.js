/* istanbul ignore file */

const Schema = {
  student_debt: {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['1', '2']],
    },
  }, 
}

module.exports = {
  Schema,
}
