const { getBenefits } = require('./getBenefits');

describe('Test the getBenefits calculator', () => {
  test('It checks ei regular + cerb path', () => {
    const expected = ['ei_regular_cerb'];
   
    const result = getBenefits({
        'lost_job': 'lost-all-income',
        'no_income': 'lost-job-employer-closed',
    });

    expect(result).toEqual(expect.arrayContaining(expected))
  })

  test('It checks ei sickness + cerb path', () => {
    const expected = ['ei_sickness_cerb'];
   
    const result = getBenefits({
        'lost_job': 'lost-all-income',
        'no_income': 'sick-or-quarantined',
    });

    expect(result).toEqual(expect.arrayContaining(expected))
  })

  test('It checks cerb-only path', () => {
    const expected = ['cerb'];
    const options = ['self-employed-closed', 'unpaid-leave-to-care', 'parental-recently-cant-return', 'ei-recently-claim-ended'];

    options.forEach(income => {
      const result = getBenefits({
        'lost_job': 'lost-all-income',
        'no_income': income,
      }); 

      expect(result).toEqual(expect.arrayContaining(expected))
    })
  })

  test('It checks the mortgage addon', () => {
    const expected = ['mortgage_deferral'];

    const result = getBenefits({
        'mortgage_payments': 'yes-mortgage',
    });

    expect(result).toEqual(expect.arrayContaining(expected))
  })

  test('It checks the rent addon', () => {
    const expected = ['rent_help'];

    const result = getBenefits({
        'mortgage_payments': 'yes-rent',
    });

    expect(result).toEqual(expect.arrayContaining(expected))
  })

  test('It checks the ccb addon', () => {
    const expected = ['ccb_payment'];
    const options = ['yes', 'unsure']

    options.forEach(ccb => {
      const result = getBenefits({
          'ccb': ccb,
      });

      expect(result).toEqual(expect.arrayContaining(expected))
    });
  })

  test('It checks the gst addon', () => {
    const expected = ['gst_credit'];
    const options = ['yes', 'unsure']

    options.forEach(gst => {
      const result = getBenefits({
          'gst': gst,
      });

      expect(result).toEqual(expect.arrayContaining(expected))
    });
  })

  test('It checks the rrif addon', () => {
    const expected = ['rrif'];

    const result = getBenefits({
        'rrif': 'yes',
    });

    expect(result).toEqual(expect.arrayContaining(expected))
  })

  test('It checks the student debt addon', () => {
    const expected = ['student_loan'];

    const result = getBenefits({
        'student_debt': 'yes',
    });

    expect(result).toEqual(expect.arrayContaining(expected))
  })
})