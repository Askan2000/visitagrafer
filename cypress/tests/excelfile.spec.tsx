
describe('ExcelFileReader', () => {
    it('can read an uploaded Excel file', () => {
      cy.visit('/spi');
      cy.get('[data-cy=file-button]').selectFile('example.xlsx');
      cy.fixture('example.json').then((expectedRows) => {
        cy.get('@handleFileUpload').should('be.calledOnce').should('have.been.calledWith', expectedRows);
      });
    });
  });