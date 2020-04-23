/* eslint-disable no-undef */
describe('Income Stopped', () => {})

describe('Some Income Stopped', () => {})

describe('Income not affected', () => {})

describe('Out of flow benefits', () => {
  function answerQuestion(val) {
    cy.get(val).click()
    cy.get('[data-cy=next]').click()
    cy.reportA11y()
  }

  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-cy=start]').click()
    answerQuestion('#lost_joblost-no-income')
    answerQuestion('#unchanged_incomewfh')
  })

  it('Mortgage Deferral', () => {
    answerQuestion('#mortgage_paymentsyes-mortgage')
    answerQuestion('#ccbno')
    answerQuestion('#student_debtno')
    cy.get('[data-cy=benefit-list]').children().should('have.length', '1')
    cy.get('#mortgage_deferral')
  })

  it('Rent Deferral', () => {
    answerQuestion('#mortgage_paymentsyes-rent')
    answerQuestion('#ccbno')
    answerQuestion('#student_debtno')
    cy.get('[data-cy=benefit-list]').children().should('have.length', '1')
    cy.get('#rent_help')
  })

  it('CCB Yes', () => {
    answerQuestion('#mortgage_paymentsno')
    answerQuestion('#ccbyes')
    answerQuestion('#student_debtno')
    cy.get('[data-cy=benefit-list]').children().should('have.length', '1')
    cy.get('#ccb_payment')
  })

  it('CCB Unsure', () => {
    answerQuestion('#mortgage_paymentsno')
    answerQuestion('#ccbunsure')
    answerQuestion('#student_debtno')
    cy.get('[data-cy=benefit-list]').children().should('have.length', '1')
    cy.get('#ccb_payment')
  })

  it('Student Debt', () => {
    answerQuestion('#mortgage_paymentsno')
    answerQuestion('#ccbno')
    answerQuestion('#student_debtyes')
    cy.get('[data-cy=benefit-list]').children().should('have.length', '1')
    cy.get('#student_loan')
  })
})
