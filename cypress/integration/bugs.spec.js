    /* eslint-disable no-undef */
describe('Found Bugs', () => {
  describe('Issue #378 - Bug showing CERB twice when going back and forth', () => {
    beforeEach(() => {
      process.env.COOKIE_SECRET = 'found_bugs'
    })
    it('Check some-income lost-a-job to no-income', () => {
      cy.visit('/')
      cy.get('[data-cy=start]').click()
      cy.answerSelect('#province-select',"on")
      cy.answerRB('#lost_joblost-some-income')
      cy.answerRB('#some_incomeemployed-lost-a-job')
      cy.answerRB('#reduced_income1000_or_less')
      cy.answerRB('#cerbnot-receiving-cerb')
      cy.answerRB('#mortgage_paymentsno')
      cy.answerRB('#ccbno')
      cy.answerRB('#student_debtno')
      cy.answerRB('#plans_for_schoolno')
      cy.answerRB('#oasno')
      cy.answerRB('#dtcno')
      cy.get('[data-cy=cerb-benefit]')

      cy.visit('/en/lost-job')
      cy.answerRB('#lost_joblost-all-income')
      cy.answerRB('#no_incomelost-job')
      cy.answerRB('#cerbnot-receiving-cerb')
      cy.answerRB('#mortgage_paymentsno')
      cy.answerRB('#ccbno')
      cy.answerRB('#student_debtno')
      cy.answerRB('#plans_for_schoolno')
      cy.answerRB('#oasno')
      cy.answerRB('#dtcno')
      cy.get('[data-cy=eligible-benefit-list]').children().should('have.length', '1')
      cy.get('[data-cy=cerb-benefit]')
    })

    it('Check some-income retired to some-income quarantine', () => {
      cy.visit('/en/lost-job')
      cy.answerRB('#lost_joblost-some-income')
      cy.answerRB('#some_incomeretired')
      cy.answerRB('#gross_income4999_or_less')
      cy.answerRB('#rrifyes')
      cy.answerRB('#cerbnot-receiving-cerb')
      cy.answerRB('#mortgage_paymentsno')
      cy.answerRB('#ccbno')
      cy.answerRB('#student_debtno')
      cy.answerRB('#plans_for_schoolno')
      cy.answerRB('#oasno')
      cy.answerRB('#dtcno')
      cy.get('[data-cy=eligible-benefit-list]').children().should('have.length', '1')
      cy.get('[data-cy=rrif-benefit]')

      cy.visit('/en/your-situation/some-income')
      cy.answerRB('#some_incomequarantine')
      cy.answerRB('#cerbnot-receiving-cerb')
      cy.answerRB('#mortgage_paymentsno')
      cy.answerRB('#ccbno')
      cy.answerRB('#student_debtno')
      cy.answerRB('#plans_for_schoolno')
      cy.answerRB('#oasno')
      cy.answerRB('#dtcno')
      cy.get('[data-cy=eligible-benefit-list]').children().should('have.length', '1')
      cy.get('[data-cy=cerb-benefit]')
    })

    it('Check some-income retired to no-income', () => {
      cy.visit('/en/lost-job')
      cy.answerRB('#lost_joblost-some-income')
      cy.answerRB('#some_incomeretired')
      cy.answerRB('#gross_incomeover_5k')
      cy.answerRB('#rrifyes')
      cy.answerRB('#cerbnot-receiving-cerb')
      cy.answerRB('#mortgage_paymentsno')
      cy.answerRB('#ccbno')
      cy.answerRB('#student_debtno')
      cy.answerRB('#plans_for_schoolno')
      cy.answerRB('#oasno')
      cy.answerRB('#dtcno')
      cy.get('[data-cy=eligible-benefit-list]').children().should('have.length', '2')
      cy.get('[data-cy=rrif-benefit]')

      cy.visit('/en/lost-job')
      cy.answerRB('#lost_joblost-no-income')
      cy.answerRB('#unchanged_incomepaid-leave')
      cy.answerRB('#cerbnot-receiving-cerb')
      cy.answerRB('#mortgage_paymentsno')
      cy.answerRB('#ccbno')
      cy.answerRB('#student_debtno')
      cy.answerRB('#plans_for_schoolno')
      cy.answerRB('#oasno')
      cy.answerRB('#dtcno')
      cy.get('[data-cy=eligible-benefit-list]').should('not.exist')
    })
  })
})
