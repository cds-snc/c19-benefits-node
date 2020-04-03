const { getBenefits } = require('./getBenefits');

describe('Test the getBenefits calculator', () => {
  test('It checks ei regular + cerb path', () => {
    const expected = ['ei_regular_cerb'];
   
    const result = getBenefits({
        'lost_job': '1',
        'no_income': '1',
    });

    expect(result).toEqual(expect.arrayContaining(expected))
  })

  test('It checks ei sickness + cerb path', () => {
    const expected = ['ei_sickness_cerb'];
   
    const result = getBenefits({
        'lost_job': '1',
        'no_income': '4',
    });

    expect(result).toEqual(expect.arrayContaining(expected))
  })

  test('It checks cerb-only path', () => {
    const expected = ['cerb'];
    const options = ['2', '3', '5', '6'];

    options.forEach(income => {
      const result = getBenefits({
        'lost_job': '1',
        'no_income': income,
      }); 

      expect(result).toEqual(expect.arrayContaining(expected))
    })
  })

  test('It checks the mortgage addon', () => {
    const expected = ['mortgage_deferral'];

    const result = getBenefits({
        'mortgage_payments': '1',
    });

    expect(result).toEqual(expect.arrayContaining(expected))
  })

  test('It checks the rent addon', () => {
    const expected = ['rent_help'];

    const result = getBenefits({
        'mortgage_payments': '2',
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
})