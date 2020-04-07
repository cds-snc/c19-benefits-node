const { getBenefits } = require('./getBenefits')

describe('Test the getBenefits calculator', () => {
  test('It checks ei regular + cerb path', () => {
    const result = getBenefits({
      lost_job: 'lost-all-income',
      no_income: 'lost-job-employer-closed',
    })

    expect(result).toContain('ei_regular_cerb')
  })

  test('It checks ei sickness + cerb path', () => {
    const result = getBenefits({
      lost_job: 'lost-all-income',
      no_income: 'sick-or-quarantined',
    })

    expect(result).toContain('ei_sickness_cerb')
  })

  test('It checks cerb-only path 1', () => {
    const options = [
      'self-employed-closed',
      'unpaid-leave-to-care',
      'parental-recently-cant-return',
      'ei-recently-claim-ended',
    ]

    options.forEach(income => {
      const result = getBenefits({
        lost_job: 'lost-all-income',
        no_income: income,
      })

      expect(result).toContain('cerb')
    })
  })

  test('It checks cerb-only path 2', () => {
    const result = getBenefits({
      lost_job: 'lost-some-income',
      some_income: 'employed-lost-a-job',
      gross_income: '5k+',
      days_stopped_working: '>14days',
    })

    expect(result).toContain('cerb')
  })

  test('It checks cerb-only path 3', () => {
    const options = ['3k-5k', '5k+']

    options.forEach(income => {
      const result = getBenefits({
        lost_job: 'lost-some-income',
        some_income: 'hours-reduced',
        gross_income: income,
        days_stopped_working: '>14days',
      })

      expect(result).toContain('cerb')
    })
  })

  test('It checks ei_workshare path ', () => {
    const options = ['3k-5k', '5k+']

    options.forEach(income => {
      const result = getBenefits({
        lost_job: 'lost-some-income',
        some_income: 'hours-reduced',
        gross_income: income,
        days_stopped_working: '<14days',
      })

      expect(result).toContain('ei_workshare')
    })
  })

  test('It checks the ei_regular addon', () => {
    const result = getBenefits({
      lost_job: 'lost-some-income',
      some_income: 'employed-lost-a-job',
      gross_income: '3k-5k',
    })

    expect(result).toContain('ei_regular')
  })

  test('It checks the mortgage addon', () => {
    const result = getBenefits({
      mortgage_payments: 'yes-mortgage',
    })

    expect(result).toContain('mortgage_deferral')
  })

  test('It checks the rent addon', () => {
    const result = getBenefits({
      mortgage_payments: 'yes-rent',
    })

    expect(result).toContain('rent_help')
  })

  test('It checks the ccb addon', () => {
    const options = ['yes', 'unsure']

    options.forEach(ccb => {
      const result = getBenefits({
        ccb: ccb,
      })

      expect(result).toContain('ccb_payment')
    })
  })

  test('It checks the gst addon', () => {
    const options = ['yes', 'unsure']

    options.forEach(gst => {
      const result = getBenefits({
        gst: gst,
      })

      expect(result).toContain('gst_credit')
    })
  })

  test('It checks the rrif addon', () => {
    const expected = ['rrif']

    const result = getBenefits({
      rrif: 'yes',
    })

    expect(result).toEqual(expect.arrayContaining(expected))
  })

  test('It checks the student debt addon', () => {
    const result = getBenefits({
      student_debt: 'yes',
    })

    expect(result).toContain('student_loan')
  })

  test('It should only pass if it matches everything in the pattern', () => {
    const result = getBenefits({
      lost_job: 'lost-some-income',
      some_income: 'employed-lost-a-job',
      gross_income: '5k+',
    })

    expect(result).toHaveLength(0)
  })
})
