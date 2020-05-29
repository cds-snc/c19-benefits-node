/* eslint-disable no-undef */
describe('Found Bugs', () => {
  describe('Issue #378 - Bug showing CERB twice when going back and forth', () => {
    it('Check some-income lost-a-job to no-income', () => {
      cy.visit('/')
      cy.get('[data-cy=start]').click()
      cy.answerQuestion('#provinceon')
      cy.answerQuestion('#lost_joblost-some-income')
      cy.answerQuestion('#some_incomeemployed-lost-a-job')
      cy.answerQuestion('#reduced_income1000_or_less')
      cy.answerQuestion('#mortgage_paymentsno')
      cy.answerQuestion('#ccbno')
      cy.answerQuestion('#student_debtno')
      cy.answerQuestion('#plans_for_schoolno')
      cy.answerQuestion('#oasno')
      cy.get('[data-cy=cerb-benefit]')

      cy.visit('/en/lost-job')
      cy.answerQuestion('#lost_joblost-all-income')
      cy.answerQuestion('#no_incomelost-job-employer-closed')
      cy.answerQuestion('#mortgage_paymentsno')
      cy.answerQuestion('#ccbno')
      cy.answerQuestion('#student_debtno')
      cy.answerQuestion('#plans_for_schoolno')
      cy.answerQuestion('#oasno')
      cy.get('[data-cy=eligible-benefit-list]').children().should('have.length', '1')
      cy.get('[data-cy=cerb-benefit]')
    })

    it('Check some-income retired to some-income quarantine', () => {
      cy.visit('/en/lost-job')
      cy.answerQuestion('#lost_joblost-some-income')
      cy.answerQuestion('#some_incomeretired')
      cy.answerQuestion('#gross_income4999_or_less')
      cy.answerQuestion('#rrifyes')
      cy.answerQuestion('#mortgage_paymentsno')
      cy.answerQuestion('#ccbno')
      cy.answerQuestion('#student_debtno')
      cy.answerQuestion('#plans_for_schoolno')
      cy.answerQuestion('#oasno')
      cy.get('[data-cy=eligible-benefit-list]').children().should('have.length', '1')
      cy.get('[data-cy=rrif-benefit]')

      cy.visit('/en/your-situation/some-income')
      cy.answerQuestion('#some_incomequarantine')
      cy.answerQuestion('#mortgage_paymentsno')
      cy.answerQuestion('#ccbno')
      cy.answerQuestion('#student_debtno')
      cy.answerQuestion('#plans_for_schoolno')
      cy.answerQuestion('#oasno')
      cy.get('[data-cy=eligible-benefit-list]').children().should('have.length', '1')
      cy.get('[data-cy=cerb-benefit]')
    })

    it('Check some-income retired to no-income', () => {
      cy.visit('/en/lost-job')
      cy.answerQuestion('#lost_joblost-some-income')
      cy.answerQuestion('#some_incomeretired')
      cy.answerQuestion('#gross_incomeover_5k')
      cy.answerQuestion('#rrifyes')
      cy.answerQuestion('#mortgage_paymentsno')
      cy.answerQuestion('#ccbno')
      cy.answerQuestion('#student_debtno')
      cy.answerQuestion('#plans_for_schoolno')
      cy.answerQuestion('#oasno')
      cy.get('[data-cy=eligible-benefit-list]').children().should('have.length', '2')
      cy.get('[data-cy=rrif-benefit]')

      cy.visit('/en/lost-job')
      cy.answerQuestion('#lost_joblost-no-income')
      cy.answerQuestion('#unchanged_incomepaid-leave')
      cy.answerQuestion('#mortgage_paymentsno')
      cy.answerQuestion('#ccbno')
      cy.answerQuestion('#student_debtno')
      cy.answerQuestion('#plans_for_schoolno')
      cy.answerQuestion('#oasno')
      cy.get('[data-cy=eligible-benefit-list]').should('not.exist')
    })
  })
})
