/* eslint-disable no-undef */
describe('Html Validation', () => {

  it('should have valid english pages', () => {
    cy.visit('/en/start');
    cy.htmlvalidate();
    cy.visit('/en/lost-job');
    cy.htmlvalidate();
    cy.visit('/en/your-situation/no-income');
    cy.htmlvalidate();
    cy.visit('/en/your-situation/some-income');
    cy.htmlvalidate();
    cy.visit('/en/your-situation/unchanged-income');
    cy.htmlvalidate();
    cy.visit('/en/mortgage-payments');
    cy.htmlvalidate();
    cy.visit('/en/CCB');
    cy.htmlvalidate();
    cy.visit('/en/student-debt');
    cy.htmlvalidate();
    cy.visit('/en/plans-for-school');
    cy.htmlvalidate();
    cy.visit('/en/oas');
    cy.htmlvalidate();
    cy.visit('/en/RRIF');
    cy.htmlvalidate();
    cy.visit('/en/gross-income');
    cy.htmlvalidate();
    cy.visit('/en/reduced-income');
    cy.htmlvalidate();
    cy.visit('/en/thanks');
    cy.htmlvalidate();
    cy.visit('/en/error');
    cy.htmlvalidate();
  })

  // it('should validate provincial results', () => {
  //   ['/en/results','/fr/resultats'].forEach((langUrl) => {
  //     [
  //       'eyJwcm92aW5jZSI6ImFiIiwibG9zdF9qb2IiOiJsb3N0LW5vLWluY29tZSJ9', // ab
  //       'eyJwcm92aW5jZSI6ImJjIiwibG9zdF9qb2IiOiJsb3N0LW5vLWluY29tZSJ9', // bc
  //       'eyJwcm92aW5jZSI6Im1iIiwibG9zdF9qb2IiOiJsb3N0LW5vLWluY29tZSJ9', // mb
  //       'eyJwcm92aW5jZSI6Im5iIiwibG9zdF9qb2IiOiJsb3N0LW5vLWluY29tZSJ9', // nb
  //       'eyJwcm92aW5jZSI6Im5sIiwibG9zdF9qb2IiOiJsb3N0LW5vLWluY29tZSJ9', // nl
  //       'eyJwcm92aW5jZSI6Im5zIiwibG9zdF9qb2IiOiJsb3N0LW5vLWluY29tZSJ9', // ns
  //       'eyJwcm92aW5jZSI6Im50IiwibG9zdF9qb2IiOiJsb3N0LW5vLWluY29tZSJ9', // nt
  //       'eyJwcm92aW5jZSI6Im51IiwibG9zdF9qb2IiOiJsb3N0LW5vLWluY29tZSJ9', // nu
  //       'eyJwcm92aW5jZSI6Im9uIiwibG9zdF9qb2IiOiJsb3N0LW5vLWluY29tZSJ9', // on
  //       'eyJwcm92aW5jZSI6InBlIiwibG9zdF9qb2IiOiJsb3N0LW5vLWluY29tZSJ9', // pe
  //       'eyJwcm92aW5jZSI6InFjIiwibG9zdF9qb2IiOiJsb3N0LW5vLWluY29tZSJ9', // qc
  //       'eyJwcm92aW5jZSI6InNrIiwibG9zdF9qb2IiOiJsb3N0LW5vLWluY29tZSJ9', // sk
  //       'eyJwcm92aW5jZSI6Inl0IiwibG9zdF9qb2IiOiJsb3N0LW5vLWluY29tZSJ9', // yt
  //     ].forEach((queryString) => {
  //       cy.visit(`${langUrl}?=${queryString}`)
  //       cy.get('#unavailableBenefitsButton').click();
  //       cy.htmlvalidate();
  //     })

  //   })
  // })

  it('should have valid french pages', () => {
    cy.visit('/fr/debut');
    cy.htmlvalidate();
    cy.visit('/fr/province');
    cy.htmlvalidate();
    cy.visit('/fr/perte-emploi');
    cy.htmlvalidate();
    cy.visit('/fr/votre-situation/aucun-revenu');
    cy.htmlvalidate();
    cy.visit('/fr/votre-situation/revenu-partiel');
    cy.htmlvalidate();
    cy.visit('/fr/votre-situation/revenu-intact');
    cy.htmlvalidate();
    cy.visit('/fr/paiement-hypothecaire');
    cy.htmlvalidate();
    cy.visit('/fr/ARC');
    cy.htmlvalidate();
    cy.visit('/fr/poursuivre-vos-etudes');
    cy.htmlvalidate();
    cy.visit('/fr/sv');
    cy.htmlvalidate();
    cy.visit('/fr/FERR');
    cy.htmlvalidate();
    cy.visit('/fr/revenu-brut');
    cy.htmlvalidate();
    cy.visit('/fr/revenu-partiel');
    cy.htmlvalidate();
    cy.visit('/fr/merci');
    cy.htmlvalidate();
    cy.visit('/fr/erreur');
    cy.htmlvalidate();
  })

})