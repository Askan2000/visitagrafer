import round from '../../../../src/Components/Utils/DecimalHandler'

describe('round function', () => {
    it('should round a number to the specified precision', () => {
      cy.wrap(round(3.14159, 2)).should('eq', 3.14);
      cy.wrap(round(3.14159, 0)).should('eq', 3);
    });
  });