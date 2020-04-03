/* istanbul ignore next */
function match(input, pattern, result) {
  const keys = Object.keys(pattern)

  const value = keys.reduce((prev, curr) => {
    if (typeof pattern[curr] === typeof []) {
      // If it's an array we only care if one matches.
      // algorithm is start with false, match current item against input and OR it against the previous item
      return pattern[curr].reduce((p, c) => p || c === input[curr], false)
    }

    if (pattern[curr] === input[curr]) {
      return prev && true
    }

    return false
  }, true)

  if (value === true) {
    return result
  }

  return undefined
}

const getBenefits = data => {
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
        some_income: 'employed-lost-a-job',
        gross_income: '5k+',
        days_stopped_working: '>14days',
      },
      'cerb',
    ),
  )

  results.push(
    match(
      data,
      {
        lost_job: 'lost-some-income',
        some_income: 'hours-reduced',
        gross_income: ['3k-5k', '5k+'],
        days_stopped_working: '>14days',
      },
      'cerb',
    ),
  )

  results.push(
    match(
      data,
      {
        lost_job: 'lost-some-income',
        some_income: 'hours-reduced',
        gross_income: ['3k-5k', '5k+'],
        days_stopped_working: '<14days',
      },
      'ei_workshare',
    ),
  )

  results.push(
    match(
      data,
      {
        lost_job: 'lost-some-income',
        some_income: 'employed-lost-a-job',
        gross_income: '3k-5k',
      },
      'ei_regular',
    ),
  )
  results.push(
    match(data, { mortgage_payments: 'yes-mortgage' }, 'mortgage_deferral'),
  )
  results.push(match(data, { mortgage_payments: 'yes-rent' }, 'rent_help'))
  results.push(match(data, { student_debt: 'yes' }, 'student_loan'))
  results.push(match(data, { gst: 'unsure' }, 'gst_credit'))
  results.push(match(data, { gst: 'yes' }, 'gst_credit'))
  results.push(match(data, { ccb: 'unsure' }, 'ccb_payment'))
  results.push(match(data, { ccb: 'yes' }, 'ccb_payment'))
  results.push(match(data, { rrif: 'yes' }, 'rrif'))

  return results.filter(v => v !== undefined)
}

module.exports = {
  getBenefits,
}
