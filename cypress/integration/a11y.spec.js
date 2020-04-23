/* eslint-disable no-undef */
describe('Result Page Only tests', () => {
  it('should display an error when navigating directly to results page', () => {
    cy.visit('/en/results')
    cy.get('[data-cy=missed-questions]')
    cy.reportA11y()
  })

  it('should display GST Benefit no matter what', () => {
    cy.visit('/en/results')
    cy.get('#gst_credit')
  })
})

describe('Accessibility checks', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('EI Regular CERB, Mortgage, Student Loans, CCB', () => {
    cy.reportA11y()
    cy.get('[data-cy=start]').click()
    cy.get('#lost_joblost-all-income').click()
    cy.get('[data-cy=next]').click()
    cy.reportA11y()
    cy.get('#no_incomelost-job-employer-closed').click()
    cy.get('[data-cy=next]').click()
    cy.reportA11y()
    cy.get('#mortgage_paymentsyes-mortgage').click()
    cy.get('[data-cy=next]').click()
    cy.reportA11y()
    cy.get('#ccbyes').click()
    cy.get('[data-cy=next]').click()
    cy.reportA11y()
    cy.get('#student_debtyes').click()
    cy.get('[data-cy=next]').click()
    cy.reportA11y()
    cy.get('[data-cy=benefit-list]').children().should('have.length', '4')
    cy.get('#ei_regular_cerb')
    cy.get('#mortgage_deferral')
    cy.get('#student_loan')
    cy.get('#ccb_payment')
  })
})
