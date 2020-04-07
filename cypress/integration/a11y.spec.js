describe('Accessilibity checks', () => { 
    beforeEach(() => { 
        cy.visit('/');
    })
    it('Check to first erro a11y', () => { 
        cy.reportA11y();
        cy.get('[data-cy=start]').click();
        cy.reportA11y();
        cy.get('[data-cy=next]').click(); 
        cy.reportA11y();
    });
});