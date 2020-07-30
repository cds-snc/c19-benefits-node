/* istanbul ignore file */

const Schema = {
  dtc_child: {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['yes', 'no']],
    },
  },
}

module.exports = {
  Schema,
}

