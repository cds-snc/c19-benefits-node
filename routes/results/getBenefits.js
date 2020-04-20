/* 
This method checks to see if an input object matches a pattern 
This pattern can have scalar values, or arrays as the item being matched
If it's a scalar we need an exact match, if it's an array we only care if the value 
matches one of the items in the output.
*/
function match(input, pattern, result) {
  const keys = Object.keys(pattern)

  const value = keys.reduce((previousIterationResult, key) => {
    const patternValueToMatch = pattern[key]
    const actualValue = input[key]

    // If the value is an array we only care if we match one item
    if (typeof patternValueToMatch === typeof []) {
      /* algorithm is as follows: 
        Logical OR the result of the current match against the previous
        Since all we care is if the value we are matching is equal to 
        one item in the patternValueToMatch array we are iterating through
      */
      return patternValueToMatch.reduce((p, c) => p || c === actualValue, false)
    }

    const matchResult = patternValueToMatch === actualValue
    return previousIterationResult && matchResult
  }, true)

  if (value === true) {
    return result
  }

  return undefined
}

const getBenefits = (data) => {
  var results = []

  results.push(
    match(
      data,
      {
        lost_job: 'lost-all-income',
        no_income: 'lost-job-employer-closed',
      },
      'ei_regular_cerb',
    ),
  )

  results.push(
    match(
      data,
      {
        lost_job: 'lost-all-income',
        no_income: 'sick-or-quarantined',
      },
      'ei_sickness_cerb',
    ),
  )

  results.push(
    match(
      data,
      {
        lost_job: 'lost-some-income',
        some_income: 'quarantine',
      },
      'ei_sickness_cerb',
    ),
  )

  results.push(
    match(
      data,
      {
        lost_job: 'lost-all-income',
        no_income: [
          'self-employed-closed',
          'unpaid-leave-to-care',
          'parental-recently-cant-return',
          'ei-recently-claim-ended',
        ],
      },
      'cerb',
    ),
  )

  results.push(
    match(
      data,
      {
        lost_job: 'lost-some-income',
        some_income: ['hours-reduced', 'selfemployed-some-income'],
        reduced_income: '1000_or_less',
      },
      'cerb',
    ),
  )

  results.push(match(data, { gross_income: '5k+' }, 'cerb'))

  results.push(
    match(
      data,
      {
        some_income: 'hours-reduced',
        reduced_income: '1001_or_more',
      },
      'ei_workshare',
    ),
  )

  results.push(
    match(data, { mortgage_payments: 'yes-mortgage' }, 'mortgage_deferral'),
  )
  results.push(match(data, { mortgage_payments: 'yes-rent' }, 'rent_help'))
  results.push(match(data, { student_debt: 'yes' }, 'student_loan'))
  results.push(match(data, { ccb: ['yes', 'unsure'] }, 'ccb_payment'))
  results.push(match(data, { rrif: 'yes' }, 'rrif'))

  return results.filter((v) => v !== undefined)
}


module.exports = {
  getBenefits,
}
