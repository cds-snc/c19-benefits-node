const { route } = require('../routeHelper');

/* eslint-disable no-undef */
describe('Result Page Only tests', () => {
  ['en', 'fr'].forEach((lang) => {
    describe('Language: ' + lang, () => {
      it('should display an error when navigating directly to results page', () => {
        cy.visit(route('results', lang))
        cy.get('[data-cy=missed-questions]')
        cy.reportA11y()
      })

      it('should display GST Benefit no matter what', () => {
        cy.visit(route('results', lang))
        cy.get('#gst_credit')
        cy.reportA11y()
      })
    })
  })
})

describe('Paths and Benefits', () => {
  ['en', 'fr'].forEach((lang) => {
    describe('Language: ' + lang, () => {

      beforeEach(() => {
        cy.visit('/' + lang)
        cy.reportA11y()
        cy.get('[data-cy=start]').click()
      })

      it('EI Sickness CERB, Mortgage, Student Loans, CCB', () => {
        cy.answerQuestion('#lost_joblost-all-income')
        cy.answerQuestion('#no_incomesick-or-quarantined')
        cy.answerQuestion('#mortgage_paymentsyes-mortgage')
        cy.answerQuestion('#ccbyes')
        cy.answerQuestion('#student_debtyes')
        cy.answerQuestion('#plans_for_schoolno')
        cy.reportA11y()
        cy.get('[data-cy=benefit-list]').children().should('have.length', '4')
        cy.get('#ei_sickness_cerb')
        cy.get('#mortgage_deferral')
        cy.get('#student_loan')
        cy.get('#ccb_payment')
      })

      it('CERB', () => {
        cy.answerQuestion('#lost_joblost-all-income')
        cy.answerQuestion('#no_incomeself-employed-closed')
        cy.answerQuestion('#mortgage_paymentsno')
        cy.answerQuestion('#ccbno')
        cy.answerQuestion('#student_debtno')
        cy.answerQuestion('#plans_for_schoolno')
        cy.reportA11y()
        cy.get('[data-cy=benefit-list]').children().should('have.length', '1')
        cy.get('#cerb')
      })

      it('EI Regular Cerb', () => {
        cy.answerQuestion('#lost_joblost-some-income')
        cy.answerQuestion('#some_incomehours-reduced')
        cy.answerQuestion('#reduced_income1000_or_less')
        cy.answerQuestion('#mortgage_paymentsno')
        cy.answerQuestion('#ccbno')
        cy.answerQuestion('#student_debtno')
        cy.answerQuestion('#plans_for_schoolno')
        cy.reportA11y()
        cy.get('[data-cy=benefit-list]').children().should('have.length', '1')
        cy.get('#ei_regular_cerb')
      })

      it('RRIF', () => {
        cy.answerQuestion('#lost_joblost-some-income')
        cy.answerQuestion('#some_incomeretired')
        cy.answerQuestion('#gross_income4999_or_less')
        cy.answerQuestion('#rrifyes')
        cy.answerQuestion('#mortgage_paymentsno')
        cy.answerQuestion('#ccbno')
        cy.answerQuestion('#student_debtno')
        cy.answerQuestion('#plans_for_schoolno')
        cy.reportA11y()
        cy.get('[data-cy=benefit-list]').children().should('have.length', '1')
        cy.get('#rrif')
      })

      it('Rent Help', () => {
        cy.answerQuestion('#lost_joblost-no-income')
        cy.answerQuestion('#unchanged_incomewfh')
        cy.answerQuestion('#mortgage_paymentsyes-rent')
        cy.answerQuestion('#ccbno')
        cy.answerQuestion('#student_debtno')
        cy.answerQuestion('#plans_for_schoolno')
        cy.reportA11y()
        cy.get('[data-cy=benefit-list]').children().should('have.length', '1')
        cy.get('#rent_help')
      })
    })
  })
})
