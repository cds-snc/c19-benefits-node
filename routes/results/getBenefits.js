/* istanbul ignore next */
const getBenefits = (data) => {
  var results = [];

  // 2a
  if (data.lost_job === 'lost-all-income') {
    if (data.no_income === 'lost-job-employer-closed') {
      results.push('ei_regular_cerb')
    }

    if (data.no_income === 'sick-or-quarantined') {
      results.push('ei_sickness_cerb')
    }

    if (['self-employed-closed', 'unpaid-leave-to-care', 'parental-recently-cant-return', 'ei-recently-claim-ended'].includes(data.no_income)) {
      results.push('cerb')
    }
  }

  // 2b
  if (data.lost_job === 'lost-some-income') {

    if (data.some_income === '1') {
      if (['3k-5k', '5k+'].includes(data.gross_income)) {
        if (data.days_stopped_working === '>14days'){
          results.push('cerb')
        } else {
          results.push('ei_workshare')
        }
      }
    }

    if (data.some_income === '2') {
      // retired/rrif
    }
    if (data.some_income === '3') {
      if (data.gross_income === '5k+' && data.days_stopped_working === '>14days'){
        results.push('cerb');
      }
      if (data.gross_income === '3k-5k') {
        results.push('ei_regular')
      }
    }
  }

  // 2c
  if (data.lost_job === 'lost-no-income') {
    // just the regular flow?
  }

  if (data.mortgage_payments === 'yes-mortgage') {
    results.push('mortgage_deferral')
  }

  if (data.mortgage_payments === 'yes-rent') {
    results.push('rent_help');
  }

  if (data.student_debt === 'yes') {
    results.push('student_loan')
  }

  if (['yes', 'unsure'].includes(data.gst)) {
    results.push('gst_credit')
  }

  if (['yes', 'unsure'].includes(data.ccb)) {
    results.push('ccb_payment')
  }

  if (data.rrif === 'yes') {
    results.push('rrif')
  }

  return results;
}

module.exports = {
    getBenefits,
}