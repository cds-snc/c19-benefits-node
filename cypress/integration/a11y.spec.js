describe('Accessibility checks', () => {
  beforeEach(() => {
    cy.visit('/')
  });
  it('Navigate to first error page', () => {
    cy.reportA11y()
    cy.get('[data-cy=start]').click()
    cy.reportA11y()
    cy.get('[data-cy=next]').click()
    cy.reportA11y()
  });
});
