/* eslint-disable no-undef */
function testError(route, numberOfExpectedErrors) {
  const numErrors = numberOfExpectedErrors || 1
  cy.visit(`en${route}`)
  cy.get('[data-cy=next]').click()
  cy.get('[data-cy=errors]').children().should('have.length', numErrors)
  cy.reportA11y()
}

describe('Error Pages', () => {
  it('Lost Job', () => {
    testError('/lost-job')
  })

  it('No Income', () => {
    testError('/your-situation/no-income')
  })

  it('Some Income', () => {
    testError('/your-situation/some-income')
  })

  it('Unchanged Income', () => {
    testError('/your-situation/unchanged-income')
  })

  it('Mortgage Payments', () => {
    testError('/mortgage-payments')
  })

  it('CCB', () => {
    testError('/CCB')
  })

  it('Student Debt', () => {
    testError('/student-debt')
  })

  it('RRIF', () => {
    testError('/RRIF')
  })

  it('Gross Income', () => {
    testError('/gross-income')
  })

  it('Reduced Income', () => {
    testError('/reduced-income')
  })
})
