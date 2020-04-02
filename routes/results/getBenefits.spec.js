const { getBenefits } = require('./getBenefits');

describe('Test the getBenefits calculator', () => {
  test('It checks ei simple path', () => {
    var expected = ['ei_regular_cerb', 'mortgage_deferral', 'gst_credit', 'ccb_payment', 'student_loan'];
   
    var result = getBenefits({
        'lost_job': '1',
        'no_income': '1',
        'mortgage_payments': '1',
        'gst': '1',
        'ccb': '1',
        'student_debt': '1',
    });

    expect(result).toEqual(expect.arrayContaining(expected))
  })

  test('It checks ei simple path wihtout student loan', () => {
    var expected = ['ei_regular_cerb', 'mortgage_deferral', 'gst_credit', 'ccb_payment'];
   
    var result = getBenefits({
        'lost_job': '1',
        'no_income': '1',
        'mortgage_payments': '1',
        'gst': '1',
        'ccb': '1',
        'student_debt': '2',
    });

    expect(result).toEqual(expect.arrayContaining(expected))
  })
})